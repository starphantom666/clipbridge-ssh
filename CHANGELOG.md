# Changelog

All notable changes to this extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**[中文版本](CHANGELOG_CN.md)**

---

## About This Project

This project is an improved version based on [Claudeboard](https://github.com/dkodr/claudeboard), developed by [dkodr](https://github.com/dkodr).

---

## [1.1.0] - 2026-04-15

### Added

- **Quote style configuration** - Support for none, single quotes, or double quotes output format
- **Path slash configuration** - Option to use forward slashes or backward slashes
- **Simulated real paste** - Bracketed Paste protocol support for terminal compatibility
- **Clear clipboard option** - Auto-clear clipboard after upload

### Fixed

- **Notification suppression not working** - Error and warning notifications now correctly respect `showNotification` setting
- **Progress popup interruption** - Progress indicator moved to status bar, no popup notifications

### Technical Improvements

- All notification types (success, error, warning) now check `getShowNotification()` setting
- Changed `ProgressLocation.Notification` to `ProgressLocation.Window` for better UX

---

## [1.0.1] - 2025-01-25 (from Claudeboard)

### Fixed

- **macOS clipboard detection** - Implemented multi-strategy clipboard access to resolve "No image found in clipboard" errors
- **Format compatibility** - Support for multiple image formats (PNG, TIFF, JPEG) with automatic conversion
- **AppleScript integration** - Primary clipboard access method with native macOS format handling
- **Fallback mechanisms** - Enhanced pbpaste fallback with UTI (Uniform Type Identifier) support

### Technical Improvements

- Multi-strategy clipboard service architecture (AppleScript → pbpaste fallback)
- Automatic TIFF to PNG conversion using macOS sips command
- Comprehensive error handling with silent fallbacks
- Support for images from various macOS applications (Preview, browsers, chat apps, screenshots)

---

## [1.0.0] - 2025-01-24 (from Claudeboard)

### Added

- Cross-platform clipboard image upload (Windows, Linux, macOS)
- Remote-SSH server integration
- Configurable keyboard shortcuts
- Automatic image cleanup with configurable retention period
- Progress indicators and error handling

---

## Version History

| Version | Source | Major Changes |
|---------|--------|---------------|
| 1.1.0 | This fork | New configuration features, notification fixes |
| 1.0.1 | Claudeboard | macOS clipboard enhancements |
| 1.0.0 | Claudeboard | Initial release |

---

[1.1.0]: https://github.com/starphantom666/-remote-terminal-image-paste/releases/tag/v1.1.0
[1.0.1]: https://github.com/dkodr/claudeboard/releases/tag/v1.0.1
[1.0.0]: https://github.com/dkodr/claudeboard/releases/tag/v1.0.0