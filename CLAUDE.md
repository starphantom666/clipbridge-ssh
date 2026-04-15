# Remote Terminal Image Paste - VS Code Extension

> An improved version based on [Claudeboard](https://github.com/dkodr/claudeboard)

## Project Overview

Upload clipboard images to remote servers via Remote-SSH and get shareable file paths. Designed for general remote development workflows.

## Original Source

This project is forked from [Claudeboard](https://github.com/dkodr/claudeboard), original author [dkodr](https://github.com/dkodr).

Improvements:
- Fixed notification suppression not working
- Progress indicator moved to status bar
- Added quote style, path slash, and simulated paste configuration

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Framework**: VS Code Extension API
- **Dependencies**: @types/vscode, @types/node, typescript
- **Build**: TypeScript compiler
- **Package**: vsce (Visual Studio Code Extension)
- **Architecture**: Service architecture + Dependency injection

## Development Commands

### Build & Development
```bash
npm run compile      # Compile TypeScript
npm run watch        # Watch mode auto-compile
npm run clean        # Clean build output
```

### Package & Install
```bash
npm run package                    # Create VSIX package
npm run install-package           # Install generated VSIX
code --install-extension *.vsix   # Install method
```

## Configuration Options

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `keybinding` | string | `ctrl+alt+v` | Keyboard shortcut |
| `retentionDays` | number | `30` | Retention days (0-365) |
| `clearClipboardAfterUpload` | boolean | `false` | Clear clipboard after upload |
| `quoteStyle` | string | `none` | Quote style (none/single/double) |
| `useForwardSlashes` | boolean | `true` | Use forward slashes |
| `simulateRealPaste` | boolean | `false` | Simulate real paste |
| `showNotification` | boolean | `true` | Show notifications |

## Commands

- `imageUploader.uploadFromClipboard.editor` - Upload in editor
- `imageUploader.uploadFromClipboard.terminal` - Upload in terminal

## Extension Requirements

- VS Code version: ^1.74.0
- Extension type: UI (runs in main process)
- Activation: On startup

## Architecture

### Service Layer
- **ClipboardService** - Cross-platform clipboard access
- **FileManagerService** - File management and cleanup
- **ProgressService** - Progress indicator (status bar)
- **ConfigurationService** - Configuration management

### Design Patterns
- **Result<T,E>** - Type-safe error handling
- **RAII** - Automatic resource cleanup
- **Command Pattern** - Decoupled business logic
- **Dependency Injection** - Service injection

## Main Features

- Cross-platform clipboard support (Windows/Linux/macOS)
- Multi-strategy macOS clipboard access (AppleScript + pbpaste)
- Multiple format support (PNG/TIFF/JPEG auto conversion)
- Remote-SSH seamless integration
- Configurable keybinding and cleanup policy
- Editor and terminal dual context support
- Status bar progress indicator (no popup)
- Notifications fully suppressible
- Quote and slash style configurable
- Bracketed Paste support

## Notes

- No automated testing configured
- Manual workflow preferred
- Personal project based on Claudeboard improvements
- Optimized for general remote development workflows