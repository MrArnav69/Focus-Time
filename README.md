# Focus Time

Focus Time is a minimalist productivity application designed to facilitate deep work through visual progress tracking and ambient audio integration. The application features a dynamic visual representation of time remaining and provides tools for managing work-rest cycles.

## Core Features

- **Visual Progress Tracking**: A dynamic coffee cup illustration that serves as a progress indicator, visualising the depletion of time during focus sessions.
- **Configurable Timer**: Support for standard presets (30, 60, 120, 180 minutes) and custom duration inputs.
- **Session Management**: Automated workflows for transitioning between focus blocks and rest periods.
- **Ambient Audio Integration**: Integrated support for six audio profiles, including various noise spectrums (Brown, White, Pink) and curated cinematic soundtracks.
- **Curated Content**: A rotation of over 75 productivity and focus-oriented quotations.
- **Interface Support**: Native Dark and Light modes with system-level preference detection.
- **Accessibility**: Comprehensive keyboard navigation and shortcuts for all core functions.
- **Audio Notifications**: High-fidelity notification tones for session completion using the Web Audio API.

## Installation and Setup

Focus Time utilizes the YouTube IFrame API for audio playback, which requires the application to be served via the HTTP/HTTPS protocol.

### Prerequisites

- Node.js (for serving the application via npm or npx)
- A modern web browser (Chrome, Firefox, or Safari)

### Quick Start

#### macOS

Execute `start-focus-time.command` from the project root. This script initializes the local server and opens the application in the default browser.

#### Windows

Execute `start-focus-time.bat` from the project root. This script initializes the local server and opens the application in the default browser.

#### Manual Execution

1. Navigate to the project directory in your terminal.
2. Execute `npm start` or `npx serve . -p 3000`.
3. Access the application at `http://localhost:3000`.

## Keyboard Shortcuts

| Shortcut | Action                |
| -------- | --------------------- |
| `Space`  | Play / Pause          |
| `R`      | Reset Timer           |
| `M`      | Toggle Audio Panel    |
| `T`      | Toggle Theme          |
| `1-6`    | Audio Track Selection |
| `Esc`    | Close Active Modals   |

## Technical Architecture

The application is built using standard web technologies (HTML5, CSS3, ES6 JavaScript) with no external framework dependencies to ensure high performance and low overhead.

### Project Structure

```text
Focus-Time/
├── index.html                   # Main application entry point
├── start-focus-time.command     # macOS initialization script
├── start-focus-time.bat         # Windows initialization script
├── package.json                 # Project metadata and dependencies
├── css/
│   └── styles.css              # Core design system and layout
├── js/
│   ├── app.js                  # Application orchestration
│   ├── timer.js                # Core timing logic
│   ├── music.js                # YouTube API integration
│   ├── quotes.js               # Content management
│   └── sounds.js               # Web Audio API implementation
└── assets/
    └── coffee-cup.svg          # Visual assets
```

## License

This project is licensed under the MIT License.
