# Installation Screenshots Guide

This directory contains screenshots for the MongoDB installation guide. Place the following screenshots in the `public/screenshots/` directory:

## Windows Screenshots

### MongoDB Compass
- `compass-download-page.png` - MongoDB Compass download page showing Windows download options
- `compass-version-selection.png` - MongoDB Compass version selection page highlighting Windows 64-bit installer
- `compass-installer-wizard.png` - MongoDB Compass installation wizard welcome screen
- `compass-first-launch.png` - MongoDB Compass welcome screen after first launch

### MongoDB Shell
- `mongodb-community-download.png` - MongoDB Community Server download page with Windows option selected
- `mongodb-server-installation.png` - MongoDB Server installation wizard showing Complete installation option
- `windows-path-environment.png` - Windows Environment Variables dialog showing PATH configuration
- `mongosh-version-output.png` - Command Prompt showing mongosh version output confirming successful installation

## macOS Screenshots

### MongoDB Compass
- `compass-macos-download.png` - MongoDB Compass download page with macOS option selected
- `macos-dmg-install.png` - macOS DMG installer window showing drag-to-Applications installation
- `macos-applications-folder.png` - macOS Applications folder showing MongoDB Compass icon

### MongoDB Shell
- `macos-homebrew-install.png` - Terminal showing Homebrew MongoDB installation commands and output
- `macos-mongodb-service-start.png` - Terminal showing MongoDB service start command and success message
- `macos-mongosh-install.png` - Terminal showing mongosh installation via Homebrew
- `macos-mongosh-connect.png` - Terminal showing successful mongosh connection to MongoDB

## Linux Screenshots

### MongoDB Compass
- `compass-linux-download.png` - MongoDB Compass download page showing Linux package options
- `linux-package-install.png` - Terminal showing MongoDB Compass package installation on Linux
- `linux-compass-launch.png` - Linux desktop showing MongoDB Compass in applications menu

### MongoDB Shell
- `linux-gpg-key-import.png` - Terminal showing GPG key import command and OK response
- `linux-repo-add.png` - Terminal showing MongoDB repository addition to sources list
- `linux-mongodb-install.png` - Terminal showing MongoDB package installation progress
- `linux-service-start.png` - Terminal showing MongoDB service start and enable commands

## Image Requirements

- **Format**: PNG or JPG
- **Size**: Recommended 1200x800 pixels or similar 3:2 aspect ratio
- **Quality**: High resolution for clarity
- **Content**: Clear, legible text and UI elements
- **Annotations**: Add red arrows or highlights to important buttons/areas

## Fallback Behavior

If a screenshot is missing, the component will automatically show a placeholder with:
- 📷 Camera icon
- Description of what the screenshot should show
- File path for reference

## Taking Screenshots

### Windows
- Use Snipping Tool or Print Screen
- Crop to show relevant application windows
- Save as PNG for best quality

### macOS
- Use ⌘+Shift+4 for selective screenshots
- Use ⌘+Shift+3 for full screen
- Screenshots save to Desktop by default

### Linux
- Use Gnome Screenshot or similar tools
- Most distributions include screenshot utilities
- GIMP or other image editors for annotations

## Directory Structure

```
public/
└── screenshots/
    ├── compass-download-page.png
    ├── compass-version-selection.png
    ├── compass-installer-wizard.png
    ├── compass-first-launch.png
    ├── mongodb-community-download.png
    ├── mongodb-server-installation.png
    ├── windows-path-environment.png
    ├── mongosh-version-output.png
    ├── compass-macos-download.png
    ├── macos-dmg-install.png
    ├── macos-applications-folder.png
    ├── macos-homebrew-install.png
    ├── macos-mongodb-service-start.png
    ├── macos-mongosh-install.png
    ├── macos-mongosh-connect.png
    ├── compass-linux-download.png
    ├── linux-package-install.png
    ├── linux-compass-launch.png
    ├── linux-gpg-key-import.png
    ├── linux-repo-add.png
    ├── linux-mongodb-install.png
    └── linux-service-start.png
```

## Notes

- Screenshots will automatically display when files are present
- Missing screenshots show helpful placeholders
- All screenshots should be clear and professionally cropped
- Consider adding subtle borders or shadows for better presentation
