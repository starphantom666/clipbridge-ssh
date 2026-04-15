# Changelog

All notable changes to this extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-04-15

### Added

- **File size limit** - `maxFileSizeMb` config to block uploads exceeding size limit (default: 20MB)
- **Insert template** - `insertTemplate` config with `{path}`, `{quotedPath}`, `{workspaceRelativePath}`, `{fileName}` tokens
- **Count-based cleanup** - `maxFiles` config to keep only newest N images (default: 30)
- **File name template** - `fileNameTemplate` config with `{timestamp}`, `{date}`, `{time}`, `{random}` tokens

---

## [1.0.2] - 2026-04-15

### Changed

- **Default notification setting** - `showNotification` now defaults to `false` for cleaner experience

---

## [1.0.1] - 2026-04-15

### Fixed

- **Path output missing directory** - `getPath()` now correctly returns full path including `.remote_terminal_images/` directory

---

## [1.0.0] - 2026-04-15

### Added

- **Cross-platform clipboard image upload** - Windows, Linux, macOS support
- **Remote-SSH integration** - Upload images to remote servers seamlessly
- **Quote style configuration** - None, single quotes, or double quotes for output path
- **Path slash configuration** - Forward slashes or backward slashes
- **Simulated real paste** - Bracketed Paste protocol for terminal compatibility
- **Clear clipboard option** - Auto-clear clipboard after upload
- **Notification control** - Suppressible notification popups
- **Configurable keybinding** - Multiple shortcut options (Ctrl+Alt+V, Ctrl+Shift+V, Alt+V, Ctrl+V, F12)
- **Auto cleanup** - Configurable retention period (0-365 days, 0=never delete)
- **Dual context support** - Works in both editor and terminal

### Fixed

- **Notification suppression** - All notifications correctly respect `showNotification` setting
- **Progress indicator** - Status bar display, no popup interruptions
- **retentionDays=0 validation** - Correctly supports "never delete" option

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-15 | Initial release of this fork |

---

[1.0.0]: https://github.com/starphantom666/clipbridge-ssh/releases/tag/v1.0.0