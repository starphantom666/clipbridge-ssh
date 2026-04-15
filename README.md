# Remote Terminal Image Paste

> An improved version based on [Claudeboard](https://github.com/dkodr/claudeboard)

Upload clipboard images to remote servers via Remote-SSH and get shareable file paths. Designed for seamless remote development workflows.

**[中文文档](README_CN.md)**

---

## 📜 Original Source

This project is forked from [Claudeboard](https://github.com/dkodr/claudeboard), developed by [dkodr](https://github.com/dkodr).

Improvements made in this version:
- ✅ Fixed notification suppression not working
- ✅ Progress indicator moved to status bar (no popup interruptions)
- ✅ Added quote style configuration (none/single/double)
- ✅ Added path slash style configuration (forward/backward)
- ✅ Added simulated real paste mode (Bracketed Paste support)
- ✅ Added clear clipboard after upload option

---

## ✨ Features

### Core Features
- 🖼️ **One-click clipboard upload** - Press `Ctrl+Alt+V` to upload
- 🌍 **Cross-platform support** - Windows, Linux, macOS
- 🔗 **Smart path insertion** - Automatically paste file paths in editor or terminal
- 🌐 **Remote-SSH integration** - Seamless connection to remote servers
- 🔐 **Secure design** - Uses existing SSH connections, no extra authentication

### Configurable Features
- 🧹 **Auto cleanup** - Set retention days (0-365, 0=never delete)
- ⌨️ **Custom keybinding** - Multiple shortcut options
- 📝 **Quote style** - None, single quotes, or double quotes
- 🔀 **Path slashes** - Forward slashes (`/`) or backward slashes (`\`)
- 📋 **Simulated paste** - Bracketed Paste mode for terminal compatibility
- 🧽 **Clear clipboard** - Auto-clear clipboard after upload
- 🔕 **Notification control** - Can suppress all notification popups

---

## 🚀 Quick Start

### Prerequisites
1. Install VS Code Remote-SSH extension
2. Connect to a remote server
3. Open a workspace folder on the remote server

### Usage
1. **Copy an image to clipboard** (screenshot, file copy, web image, etc.)
2. **Press `Ctrl+Alt+V` in VS Code**
3. **Image uploads automatically**, path is pasted at cursor position
4. **Done!** Image is accessible via the inserted path

---

## 🌐 Upload Location

### Remote Server
- **Location**: `.remote_terminal_images/` in workspace root
- **Auto cleanup**: Images older than retention days are automatically deleted
- **Git ignored**: Automatically creates `.gitignore` to exclude images
- **Return path**: Full file path, e.g., `/workspace/.remote_terminal_images/image_1234567890.png`

---

## ⚙️ Configuration

Search for "imageUploader" in `File > Preferences > Settings`:

| Setting | Description | Default |
|---------|-------------|---------|
| `keybinding` | Keyboard shortcut | `ctrl+alt+v` |
| `retentionDays` | Image retention days (0=never delete) | `30` |
| `clearClipboardAfterUpload` | Clear clipboard after upload | `false` |
| `quoteStyle` | Quote style (none/single/double) | `none` |
| `useForwardSlashes` | Use forward slashes | `true` |
| `simulateRealPaste` | Simulate real paste mode | `false` |
| `showNotification` | Show notifications | `true` |

### Keybinding Options
- `Ctrl+Alt+V` - Default
- `Ctrl+Shift+V`
- `Alt+V`
- `Ctrl+V` (may conflict with normal paste)
- `F12`

### Quote Style
- `none` - No quotes: `/path/to/image.png`
- `single` - Single quotes: `'/path/to/image.png'`
- `double` - Double quotes: `"/path/to/image.png"`

### Simulated Real Paste
Enables Bracketed Paste protocol to solve paste issues in certain terminals (e.g., zsh with bracketed-paste-magic).

---

## 📋 Requirements

- **VS Code** 1.74.0 or higher
- **Remote-SSH extension**
- **Active remote connection**
- **Workspace folder on remote server**

### Platform Support

| Platform | Clipboard Support | Dependencies |
|----------|-------------------|--------------|
| Windows | ✅ PowerShell | No extra installation |
| macOS | ✅ pbpaste + AppleScript | No extra installation |
| Linux (X11) | ✅ xclip | Install `xclip` |
| Linux (Wayland) | ✅ wl-clipboard | Install `wl-clipboard` |

Linux dependencies:
```bash
# X11
sudo apt install xclip

# Wayland
sudo apt install wl-clipboard
```

---

## 🎨 Supported Formats

| Platform | Supported Formats |
|----------|-------------------|
| Windows | PNG only |
| Linux | PNG only |
| macOS | PNG, TIFF, JPEG (auto-converts to PNG) |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Function | Context |
|----------|----------|---------|
| `Ctrl+Alt+V` | Upload clipboard image | Editor & Terminal |
| `Ctrl+V` | Normal paste (unaffected) | Editor & Terminal |

---

## 📦 Installation

### From VSIX File
1. Download the `.vsix` file
2. Press `Ctrl+Shift+P` in VS Code
3. Type "Extensions: Install from VSIX"
4. Select the downloaded file

### Build Locally
```bash
npm install
npm run package
code --install-extension *.vsix
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "No remote connection detected" | Connect via Remote-SSH extension |
| "No workspace folder available" | Open folder on remote server |
| Image not detected | Ensure image is copied to clipboard |
| PowerShell error | Check PowerShell availability and ExecutionPolicy |
| Upload timeout | Check Remote-SSH connection stability |
| Paste error | Ensure cursor is in editor or terminal |
| File permission error | Check write permissions in workspace directory |
| Notifications still showing | Set `showNotification: false` |

---

## 📁 File Structure

```
workspace/
├── .remote_terminal_images/
│   ├── .gitignore          # Auto-created
│   ├── image_1234567890.png
│   └── image_1234567891.png
└── your-project-files/
```

---

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/starphantom666/-remote-terminal-image-paste.git

# Install dependencies
npm install

# Compile
npm run compile

# Watch mode
npm run watch

# Package
npm run package
```

### Architecture
- **TypeScript** strict mode
- **Service architecture**: ClipboardService, FileManagerService, ProgressService, ConfigurationService
- **Cross-platform abstractions**: Platform-specific clipboard implementations
- **Result<T,E> pattern**: Type-safe error handling
- **RAII pattern**: Automatic resource cleanup

---

## 📄 License

MIT License

---

## 🔗 Links

- **Original Project**: [Claudeboard](https://github.com/dkodr/claudeboard) by [dkodr](https://github.com/dkodr)
- **This Project**: [Remote Terminal Image Paste](https://github.com/starphantom666/-remote-terminal-image-paste)
- **Remote-SSH Extension**: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

---

**Improved version based on Claudeboard, optimized for general remote development workflows**