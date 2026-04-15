import * as vscode from 'vscode';
import { Disposable } from './clipboard';

export interface FileManagerService {
    createImageFile(imageData: Buffer, format: string, fileNameTemplate?: string): Promise<ImageFile>;
    cleanupOldImages(retentionDays: number, maxFiles?: number): Promise<void>;
    ensureDirectoryExists(): Promise<void>;
}

export interface ImageFile extends Disposable {
    getUri(): vscode.Uri;
    getPath(): string;
    exists(): Promise<boolean>;
}

class ManagedImageFile implements ImageFile {
    constructor(
        private readonly uri: vscode.Uri,
        private readonly shouldCleanup: boolean = false
    ) {}

    getUri(): vscode.Uri {
        return this.uri;
    }

    getPath(): string {
        // Use fsPath for local files, path for remote files
        // fsPath provides platform-specific path with full directory structure
        const path = this.uri.fsPath || this.uri.path;
        return path;
    }

    async exists(): Promise<boolean> {
        try {
            await vscode.workspace.fs.stat(this.uri);
            return true;
        } catch {
            return false;
        }
    }

    dispose(): void {
        if (this.shouldCleanup) {
            // Best effort cleanup - don't await or throw
            Promise.resolve(vscode.workspace.fs.delete(this.uri)).catch(() => {
                // Ignore cleanup errors
            });
        }
    }
}

export class WorkspaceFileManager implements FileManagerService {
    private readonly imageDirPath = '.clipbridge-images';
    private readonly gitignoreContent = '*\n';

    private cachedWorkspaceFolder: vscode.WorkspaceFolder | null = null;
    private cachedImagesDir: vscode.Uri | null = null;

    async createImageFile(imageData: Buffer, format: string, fileNameTemplate?: string): Promise<ImageFile> {
        await this.ensureDirectoryExists();
        
        const imagesDir = await this.getImagesDirectory();
        const fileName = this.generateFileName(format, fileNameTemplate);
        const imageUri = vscode.Uri.joinPath(imagesDir, fileName);
        
        await vscode.workspace.fs.writeFile(imageUri, imageData);
        
        return new ManagedImageFile(imageUri);
    }

    async cleanupOldImages(retentionDays: number, maxFiles?: number): Promise<void> {
        // If retentionDays is 0 and maxFiles is 0, never delete images
        if (retentionDays === 0 && (maxFiles === 0 || maxFiles === undefined)) {
            return;
        }

        try {
            const imagesDir = await this.getImagesDirectory();
            const files = await vscode.workspace.fs.readDirectory(imagesDir);
            
            // Filter to only image files (not .gitignore)
            const imageFiles = files
                .filter(([fileName, fileType]) => 
                    fileType === vscode.FileType.File && 
                    fileName !== '.gitignore'
                )
                .map(([fileName]) => ({
                    fileName,
                    timestamp: this.extractTimestamp(fileName)
                }))
                .filter(file => file.timestamp > 0);

            // Delete by age (retentionDays)
            if (retentionDays > 0) {
                const cutoffTime = Date.now() - (retentionDays * 24 * 60 * 60 * 1000);
                const oldFiles = imageFiles.filter(file => file.timestamp < cutoffTime);
                await this.deleteFiles(imagesDir, oldFiles.map(f => f.fileName));
            }

            // Delete by count (maxFiles) - keep newest N files
            if (maxFiles && maxFiles > 0) {
                const remainingFiles = imageFiles
                    .filter(file => retentionDays === 0 || file.timestamp >= Date.now() - (retentionDays * 24 * 60 * 60 * 1000))
                    .sort((a, b) => b.timestamp - a.timestamp); // Sort newest first
                
                if (remainingFiles.length > maxFiles) {
                    const filesToDelete = remainingFiles.slice(maxFiles).map(f => f.fileName);
                    await this.deleteFiles(imagesDir, filesToDelete);
                }
            }
        } catch (error) {
            // Don't fail the upload if cleanup fails
            console.warn('Error during image cleanup:', error);
        }
    }

    async ensureDirectoryExists(): Promise<void> {
        const imagesDir = await this.getImagesDirectory();
        
        try {
            await vscode.workspace.fs.createDirectory(imagesDir);
        } catch {
            // Directory might already exist, ignore error
        }

        await this.ensureGitignoreExists(imagesDir);
    }

    private async getWorkspaceFolder(): Promise<vscode.WorkspaceFolder> {
        if (!this.cachedWorkspaceFolder) {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                throw new Error('No workspace folder available. Please open a folder in VS Code.');
            }
            this.cachedWorkspaceFolder = workspaceFolder;
        }
        return this.cachedWorkspaceFolder;
    }

    private async getImagesDirectory(): Promise<vscode.Uri> {
        if (!this.cachedImagesDir) {
            const workspaceFolder = await this.getWorkspaceFolder();
            this.cachedImagesDir = vscode.Uri.joinPath(workspaceFolder.uri, ...this.imageDirPath.split('/'));
        }
        return this.cachedImagesDir;
    }

    private generateFileName(format: string, template?: string): string {
        const now = new Date();
        const timestamp = Date.now();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const randomStr = Math.random().toString(36).substring(2, 8);
        
        if (!template) {
            return `image_${timestamp}.${format}`;
        }
        
        return template
            .replace('{timestamp}', String(timestamp))
            .replace('{date}', dateStr)
            .replace('{time}', timeStr)
            .replace('{random}', randomStr);
    }

    private extractTimestamp(fileName: string): number {
        const match = fileName.match(/(\d{13,})/);
        return match ? parseInt(match[1], 10) : 0;
    }

    private async deleteFiles(imagesDir: vscode.Uri, fileNames: string[]): Promise<void> {
        const deletePromises = fileNames.map(fileName => {
            const filePath = vscode.Uri.joinPath(imagesDir, fileName);
            return Promise.resolve(vscode.workspace.fs.delete(filePath)).catch(() => {});
        });
        await Promise.allSettled(deletePromises);
    }

    private isOldImageFile(fileName: string, cutoffTime: number): boolean {
        const match = fileName.match(/^image_(\d+)\./);
        if (!match) {
            return false;
        }

        const fileTimestamp = parseInt(match[1], 10);
        return fileTimestamp < cutoffTime;
    }

    private async ensureGitignoreExists(imagesDir: vscode.Uri): Promise<void> {
        const gitignorePath = vscode.Uri.joinPath(imagesDir, '.gitignore');
        
        try {
            await vscode.workspace.fs.stat(gitignorePath);
        } catch {
            // .gitignore doesn't exist, create it
            const gitignoreData = new TextEncoder().encode(this.gitignoreContent);
            await vscode.workspace.fs.writeFile(gitignorePath, gitignoreData);
        }
    }
}

export function createFileManager(): FileManagerService {
    return new WorkspaceFileManager();
}