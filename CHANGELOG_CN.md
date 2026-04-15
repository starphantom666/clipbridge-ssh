# 更新日志

所有重要的变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)，本项目遵循 [语义化版本](https://semver.org/spec/v2.0.0.html)。

**[English](CHANGELOG.md)**

---

## [1.1.0] - 2026-04-15

### 新增功能

- **文件大小限制** - `maxFileSizeMb` 配置，超过限制阻止上传（默认：20MB）
- **插入模板** - `insertTemplate` 配置，支持 `{path}`、`{quotedPath}`、`{workspaceRelativePath}`、`{fileName}` 模板
- **按数量清理** - `maxFiles` 配置，只保留最新 N 张图片（默认：30）
- **文件名模板** - `fileNameTemplate` 配置，支持 `{timestamp}`、`{date}`、`{time}`、`{random}` 模板

---

## [1.0.2] - 2026-04-15

### 变更

- **默认通知设置** - `showNotification` 默认改为 `false`，提供更清爽的体验

---

## [1.0.1] - 2026-04-15

### Bug 修复

- **路径缺少目录名** - `getPath()` 现正确返回完整路径，包含 `.remote_terminal_images/` 目录

---

## [1.0.0] - 2026-04-15

### 新增功能

- **跨平台剪贴板图片上传** - 支持 Windows、Linux、macOS
- **Remote-SSH 集成** - 无缝上传图片到远程服务器
- **引号样式配置** - 无引号、单引号、双引号
- **路径斜杠配置** - 正斜杠或反斜杠
- **模拟真实粘贴** - Bracketed Paste 协议，终端兼容
- **清空剪贴板选项** - 上传后自动清空剪贴板
- **通知控制** - 可屏蔽所有通知弹窗
- **快捷键自定义** - 多种快捷键可选（Ctrl+Alt+V、Ctrl+Shift+V、Alt+V、Ctrl+V、F12）
- **自动清理** - 可配置保留天数（0-365，0=永不删除）
- **双场景支持** - 编辑器与终端

### Bug 修复

- **通知屏蔽** - 所有通知正确遵循 `showNotification` 设置
- **进度指示器** - 状态栏显示，不弹窗
- **retentionDays=0 验证** - 正确支持"永不删除"选项

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-04-15 | 初始版本 |

---

[1.0.0]: https://github.com/starphantom666/clipbridge-ssh/releases/tag/v1.0.0