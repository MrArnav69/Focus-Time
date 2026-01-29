# Focus Time ☕

A beautiful, aesthetic focus timer web app with a coffee cup that drains as time passes, ambient music integration, and inspirational quotes.

![Focus Time](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

- ☕ **Coffee Cup Animation** - Beautiful SVG cup that drains as your timer progresses
- ⏱️ **Focus Timer** - Preset options (30min, 1hr, 2hr, 3hr) + custom duration
- 😴 **Rest Timer** - Smart break options after each focus session
- 🎵 **Ambient Music** - 6 YouTube tracks including:
  - Brown Noise, White Noise, Pink Noise
  - Interstellar (Hans Zimmer)
  - Oppenheimer (Ludwig Göransson)
  - Memory Reboot
- 💬 **Inspirational Quotes** - 75+ curated quotes rotating every 60 seconds
- 🌙 **Theme Toggle** - Dark/Light mode with smooth transitions
- ⌨️ **Keyboard Shortcuts** - Full keyboard control
- 🔊 **Sound Effects** - Pleasant completion notifications

## Quick Start

### Option 1: Double-click launcher

- **macOS:** Double-click `start-focus-time.command` in Finder.
- **Windows:** Double-click `start-focus-time.bat` in File Explorer.

It will start the server and open your browser automatically.

### Option 2: Command line

```bash
cd /Users/mrarnav69/Documents/Focus-Time
npm start
```

Then open http://localhost:3000

### Option 3: Using npx

```bash
cd /Users/mrarnav69/Documents/Focus-Time
npx serve . -p 3000
```

## Keyboard Shortcuts

| Key     | Action                   |
| ------- | ------------------------ |
| `Space` | Start/Pause timer        |
| `R`     | Reset timer              |
| `M`     | Toggle music panel       |
| `T`     | Toggle theme             |
| `1-6`   | Quick select music track |
| `Esc`   | Close modals             |

## Why a Local Server?

The YouTube IFrame API (used for ambient music) requires the app to run on `http://` or `https://` protocol. Opening the HTML file directly (`file://`) won't allow music playback due to browser security restrictions.

## Project Structure

```
Focus-Time/
├── index.html                 # Main app
├── start-focus-time.command   # macOS launcher
├── start-focus-time.bat       # Windows launcher
├── package.json               # npm scripts
├── css/
│   └── styles.css            # Design system
├── js/
│   ├── app.js                # Main logic
│   ├── timer.js              # Timer functionality
│   ├── music.js              # YouTube integration
│   ├── quotes.js             # Quote rotation
│   └── sounds.js             # Sound effects
└── assets/
    └── coffee-cup.svg        # Cup graphic
```

## License

MIT License - feel free to use and modify!

---

Made with ❤️ for focused productivity
