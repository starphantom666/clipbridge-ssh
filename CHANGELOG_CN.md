# 更新日志

所有重要的变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)，本项目遵循 [语义化版本](https://semver.org/spec/v2.0.0.html)。

**[English](CHANGELOG.md)**

---

## 关于本项目

本项目基于 [Claudeboard](https://github.com/dkodr/claudeboard)（由 [dkodr](https://github.com/dkodr) 开发）进行改进和扩展。

---

## [1.1.0] - 2026-04-15

### 新增功能

- **引号样式配置** - 支持无引号、单引号、双引号三种输出格式
- **路径斜杠配置** - 可选择使用正斜杠或反斜杠
- **模拟真实粘贴** - 支持 Bracketed Paste 协议，解决终端粘贴兼容性问题
- **清空剪贴板选项** - 上传后可自动清空剪贴板

### Bug 修复

- **通知屏蔽不生效** - 错误和警告通知现在正确遵循 `showNotification` 设置
- **进度弹窗干扰** - 进度指示器改为状态栏显示，不再弹出通知窗口

### 技术改进

- 所有通知类型（成功、错误、警告）统一检查 `getShowNotification()` 设置
- `ProgressLocation.Notification` 改为 `ProgressLocation.Window`，提升用户体验

---

## [1.0.1] - 2025-01-25 (来自 Claudeboard)

### Bug 修复

- **macOS 剪贴板检测** - 实现多策略剪贴板访问，解决 "No image found in clipboard" 错误
- **格式兼容性** - 支持多种图片格式（PNG、TIFF、JPEG），自动转换
- **AppleScript 集成** - 主要剪贴板访问方法，原生 macOS 格式处理
- **回退机制** - 增强 pbpaste 回退，支持 UTI（Uniform Type Identifier）

### 技术改进

- 多策略剪贴板服务架构（AppleScript → pbpaste 回退）
- 使用 macOS sips 命令自动转换 TIFF 到 PNG
- 完善的错误处理和静默回退
- 支持来自各种 macOS 应用程序的图片（Preview、浏览器、聊天应用、截图）

---

## [1.0.0] - 2025-01-24 (来自 Claudeboard)

### 新增功能

- 跨平台剪贴板图片上传（Windows、Linux、macOS）
- Remote-SSH 服务器集成
- 可配置键盘快捷键
- 自动图片清理，可配置保留期限
- 进度指示器和错误处理

---

## 版本历史

| 版本 | 来源 | 主要变更 |
|------|------|----------|
| 1.1.0 | 本项目 fork | 新增配置功能，修复通知问题 |
| 1.0.1 | Claudeboard | macOS 剪贴板增强 |
| 1.0.0 | Claudeboard | 初始版本 |

---

[1.1.0]: https://github.com/starphantom666/-remote-terminal-image-paste/releases/tag/v1.1.0
[1.0.1]: https://github.com/dkodr/claudeboard/releases/tag/v1.0.1
[1.0.0]: https://github.com/dkodr/claudeboard/releases/tag/v1.0.0