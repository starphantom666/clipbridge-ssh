# Remote Terminal Image Paste

> 基于 [Claudeboard](https://github.com/dkodr/claudeboard) 的改进版本

通过 Remote-SSH 将剪贴板图片上传到远程服务器，并获取可共享的文件路径。专为通用远程开发工作流设计。

**[English](README.md)**

---

## 📜 原始来源

本项目 fork 自 [Claudeboard](https://github.com/dkodr/claudeboard)，由 [dkodr](https://github.com/dkodr) 开发。

改进内容：
- ✅ 修复通知屏蔽不生效问题
- ✅ 进度指示器改为状态栏显示（不弹窗）
- ✅ 新增引号样式配置（无引号/单引号/双引号）
- ✅ 新增路径斜杠配置（正斜杠/反斜杠）
- ✅ 新增模拟真实粘贴模式（Bracketed Paste）
- ✅ 新增上传后清空剪贴板选项

---

## ✨ 功能特性

### 核心功能
- 🖼️ **一键上传剪贴板图片** - 按 `Ctrl+Alt+V` 即可上传
- 🌍 **跨平台支持** - Windows、Linux、macOS
- 🔗 **智能路径插入** - 自动在编辑器或终端粘贴文件路径
- 🌐 **Remote-SSH 集成** - 无缝对接远程服务器
- 🔐 **安全设计** - 使用现有 SSH 连接，无需额外认证

### 可配置功能
- 🧹 **自动清理** - 可设置图片保留天数（0-365，0=永不清理）
- ⌨️ **快捷键自定义** - 多种快捷键方案可选
- 📝 **引号样式** - 无引号、单引号、双引号
- 🔀 **路径斜杠** - 正斜杠（`/`）或反斜杠（`\`）
- 📋 **模拟粘贴** - Bracketed Paste 模式，解决终端粘贴问题
- 🧽 **清空剪贴板** - 上传后自动清空剪贴板
- 🔕 **通知控制** - 可完全屏蔽所有通知弹窗

---

## 🚀 快速开始

### 前置条件
1. 安装 VS Code Remote-SSH 扩展
2. 连接到远程服务器
3. 在远程服务器上打开工作区文件夹

### 使用步骤
1. **复制图片到剪贴板**（截图、文件复制、网页图片等）
2. **在 VS Code 中按 `Ctrl+Alt+V`**
3. **图片自动上传**，路径自动粘贴到光标位置
4. **完成！** 图片可通过路径直接访问

---

## 🌐 上传位置

### 远程服务器
- **存放位置**：工作区根目录下的 `.remote_terminal_images/`
- **自动清理**：超过设定天数的图片自动删除
- **Git 忽略**：自动创建 `.gitignore`，排除图片提交
- **返回路径**：完整文件路径，如 `/workspace/.remote_terminal_images/image_1234567890.png`

---

## ⚙️ 配置选项

在 `文件 > 首选项 > 设置` 中搜索 "imageUploader"：

| 设置项 | 说明 | 默认值 |
|--------|------|--------|
| `keybinding` | 快捷键选择 | `ctrl+alt+v` |
| `retentionDays` | 图片保留天数（0=永不删除） | `30` |
| `clearClipboardAfterUpload` | 上传后清空剪贴板 | `false` |
| `quoteStyle` | 引号样式（none/single/double） | `none` |
| `useForwardSlashes` | 使用正斜杠 | `true` |
| `simulateRealPaste` | 模拟真实粘贴模式 | `false` |
| `showNotification` | 显示通知 | `true` |

### 快捷键选项
- `Ctrl+Alt+V` - 默认
- `Ctrl+Shift+V`
- `Alt+V`
- `Ctrl+V`（可能与正常粘贴冲突）
- `F12`

### 引号样式
- `none` - 无引号：`/path/to/image.png`
- `single` - 单引号：`'/path/to/image.png'`
- `double` - 双引号：`"/path/to/image.png"`

### 模拟真实粘贴
启用 Bracketed Paste 协议，解决某些终端（如 zsh with bracketed-paste-magic）的粘贴问题。

---

## 📋 系统要求

- **VS Code** 1.74.0 或更高版本
- **Remote-SSH 扩展**
- **已激活的远程连接**
- **远程服务器上的工作区文件夹**

### 平台支持

| 平台 | 剪贴板支持 | 依赖 |
|------|------------|------|
| Windows | ✅ PowerShell | 无需额外安装 |
| macOS | ✅ pbpaste + AppleScript | 无需额外安装 |
| Linux (X11) | ✅ xclip | 需安装 `xclip` |
| Linux (Wayland) | ✅ wl-clipboard | 需安装 `wl-clipboard` |

Linux 安装依赖：
```bash
# X11
sudo apt install xclip

# Wayland
sudo apt install wl-clipboard
```

---

## 🎨 支持格式

| 平台 | 支持格式 |
|------|----------|
| Windows | 仅 PNG |
| Linux | 仅 PNG |
| macOS | PNG、TIFF、JPEG（自动转换为 PNG） |

---

## ⌨️ 快捷键

| 快捷键 | 功能 | 适用场景 |
|--------|------|----------|
| `Ctrl+Alt+V` | 上传剪贴板图片 | 编辑器 & 终端 |
| `Ctrl+V` | 正常粘贴（不受影响） | 编辑器 & 终端 |

---

## 📦 安装

### 从 VSIX 文件安装
1. 下载 `.vsix` 文件
2. 在 VS Code 中按 `Ctrl+Shift+P`
3. 输入 "Extensions: Install from VSIX"
4. 选择下载的文件

### 本地打包
```bash
npm install
npm run package
code --install-extension *.vsix
```

---

## 🐛 问题排查

| 问题 | 解决方案 |
|------|----------|
| "No remote connection detected" | 使用 Remote-SSH 连接远程服务器 |
| "No workspace folder available" | 在远程服务器上打开文件夹 |
| 图片未检测到 | 确保图片已复制到剪贴板（不是仅选中） |
| PowerShell 错误 | 检查 PowerShell 可用性和 ExecutionPolicy |
| 上传超时 | 检查 Remote-SSH 连接稳定性 |
| 粘贴错误 | 确保光标在编辑器或终端中 |
| 文件权限错误 | 检查工作区目录写权限 |
| 通知仍显示 | 设置 `showNotification: false` |

---

## 📁 文件结构

```
workspace/
├── .remote_terminal_images/
│   ├── .gitignore          # 自动创建
│   ├── image_1234567890.png
│   └── image_1234567891.png
└── your-project-files/
```

---

## 🛠️ 开发

```bash
# 克隆仓库
git clone https://github.com/starphantom666/-remote-terminal-image-paste.git

# 安装依赖
npm install

# 编译
npm run compile

# 监听模式
npm run watch

# 打包
npm run package
```

### 架构
- **TypeScript** 严格模式
- **服务架构**：ClipboardService、FileManagerService、ProgressService、ConfigurationService
- **跨平台抽象**：平台特定的剪贴板实现
- **Result<T,E> 模式**：类型安全的错误处理
- **RAII 模式**：自动资源清理

---

## 📄 许可证

MIT License

---

## 🔗 相关链接

- **原始项目**：[Claudeboard](https://github.com/dkodr/claudeboard) by [dkodr](https://github.com/dkodr)
- **本项目**：[Remote Terminal Image Paste](https://github.com/starphantom666/-remote-terminal-image-paste)
- **Remote-SSH 扩展**：[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

---

**基于 Claudeboard 改进，为通用远程开发工作流优化**