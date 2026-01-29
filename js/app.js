/**
 * Focus Time - Main Application
 * Orchestrates all modules and handles UI interactions
 */

class FocusTimeApp {
  constructor() {
    this.timer = null;
    this.quotes = null;
    this.music = null;
    this.sounds = null;
    this.quoteInterval = null;
    this.originalTitle = document.title;
    
    this.init();
  }

  init() {
    // Initialize modules
    this.sounds = new SoundEffects();
    this.quotes = new QuotesManager();
    this.music = new MusicPlayer('youtube-players');
    
    this.timer = new Timer({
      onTick: (data) => this.handleTick(data),
      onComplete: (data) => this.handleComplete(data),
      onStart: (data) => this.handleStart(data),
      onPause: (data) => this.handlePause(data),
      onReset: () => this.handleReset(),
      onModeChange: (mode) => this.handleModeChange(mode)
    });

    this.music.onTrackChange = (track) => this.updateNowPlaying(track);
    this.music.onPlayStateChange = (playing) => this.updateMusicButtons();

    this.initTheme();
    this.bindEvents();
    this.showQuote();
    this.startQuoteRotation();
    this.updateUI();
  }

  // Theme Management
  initTheme() {
    const saved = localStorage.getItem('focustime-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('focustime-theme', next);
    this.sounds.playClick();
  }

  // Event Binding
  bindEvents() {
    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggleTheme());

    // Time selection buttons
    document.querySelectorAll('.time-btn[data-minutes]').forEach(btn => {
      btn.addEventListener('click', () => {
        const minutes = parseInt(btn.dataset.minutes);
        this.startFocus(minutes);
        this.sounds.playClick();
      });
    });

    // Custom time button
    document.getElementById('custom-time-btn')?.addEventListener('click', () => {
      this.showModal('custom-time-modal');
    });

    // Control buttons
    document.getElementById('start-btn')?.addEventListener('click', () => this.handleStartBtn());
    document.getElementById('pause-btn')?.addEventListener('click', () => this.timer.toggle());
    document.getElementById('reset-btn')?.addEventListener('click', () => this.timer.reset());

    // Music panel toggle
    document.getElementById('music-toggle')?.addEventListener('click', () => this.toggleMusicPanel());

    // Music buttons
    document.querySelectorAll('.music-btn[data-track]').forEach(btn => {
      btn.addEventListener('click', () => {
        const trackId = btn.dataset.track;
        if (this.music.isTrackPlaying(trackId)) {
          this.music.stop();
        } else {
          this.music.play(trackId);
        }
        this.sounds.playClick();
      });
    });

    // Volume slider
    document.getElementById('volume-slider')?.addEventListener('input', (e) => {
      this.music.setVolume(parseInt(e.target.value));
    });

    // Modal events
    document.getElementById('modal-cancel')?.addEventListener('click', () => this.hideModal('custom-time-modal'));
    document.getElementById('modal-confirm')?.addEventListener('click', () => this.handleCustomTime());
    
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.hideModal(overlay.id);
      });
    });

    // Rest time buttons (in complete overlay)
    document.querySelectorAll('.rest-btn[data-minutes]').forEach(btn => {
      btn.addEventListener('click', () => {
        const minutes = parseInt(btn.dataset.minutes);
        if (minutes === 0) {
          this.endSession();
        } else {
          this.startRest(minutes);
        }
        this.sounds.playClick();
      });
    });

    // Focus time buttons (after rest)
    document.querySelectorAll('.focus-btn[data-minutes]').forEach(btn => {
      btn.addEventListener('click', () => {
        const minutes = parseInt(btn.dataset.minutes);
        if (minutes === 0) {
          this.endSession();
        } else {
          this.startFocus(minutes);
        }
        this.sounds.playClick();
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Custom time modal inputs - auto focus
    document.getElementById('custom-hours')?.addEventListener('focus', (e) => e.target.select());
    document.getElementById('custom-minutes')?.addEventListener('focus', (e) => e.target.select());
  }

  handleKeyboard(e) {
    // Don't trigger if typing in input
    if (e.target.tagName === 'INPUT') return;

    switch(e.code) {
      case 'Space':
        e.preventDefault();
        if (this.timer.isRunning || this.timer.isPaused) this.timer.toggle();
        break;
      case 'KeyR':
        if (!e.metaKey && !e.ctrlKey) this.timer.reset();
        break;
      case 'KeyM':
        this.toggleMusicPanel();
        break;
      case 'KeyT':
        this.toggleTheme();
        break;
      case 'Escape':
        document.querySelectorAll('.modal-overlay.visible').forEach(m => this.hideModal(m.id));
        break;
      case 'Digit1': case 'Digit2': case 'Digit3':
      case 'Digit4': case 'Digit5': case 'Digit6':
        const idx = parseInt(e.code.replace('Digit', '')) - 1;
        const tracks = this.music.getTracks();
        if (tracks[idx]) this.music.play(tracks[idx].id);
        break;
    }
  }

  // Timer Actions
  startFocus(minutes) {
    this.hideAllOverlays();
    this.timer.start(minutes, 'focus');
  }

  startRest(minutes) {
    this.hideAllOverlays();
    this.timer.start(minutes, 'rest');
  }

  endSession() {
    this.hideAllOverlays();
    this.timer.reset();
    this.music.stop();
  }

  handleStartBtn() {
    // Default to 25 minutes if no time selected
    if (!this.timer.isRunning && !this.timer.isPaused) {
      this.startFocus(25);
    }
  }

  // Timer Callbacks
  handleTick(data) {
    this.updateTimerDisplay(data.formatted.display);
    this.updateProgress(data.progress);
    this.updateCoffeeCup(data.remainingProgress);
    document.title = `${data.formatted.display} - Focus Time`;
  }

  handleStart(data) {
    this.updateUI();
    this.showTimerView();
  }

  handlePause(data) {
    this.updateUI();
    document.getElementById('pause-btn').textContent = this.timer.isPaused ? '▶ Resume' : '⏸ Pause';
  }

  handleReset() {
    this.updateUI();
    this.showSelectionView();
    this.resetCoffeeCup();
    document.title = this.originalTitle;
  }

  handleComplete(data) {
    this.sounds.playBeep();
    document.title = this.originalTitle;
    
    if (data.mode === 'focus') {
      this.showRestOptions();
    } else {
      this.showFocusOptions();
    }
  }

  handleModeChange(mode) {
    document.body.dataset.mode = mode;
    this.updateModeLabel(mode);
  }

  handleCustomTime() {
    const hours = parseInt(document.getElementById('custom-hours').value) || 0;
    const minutes = parseInt(document.getElementById('custom-minutes').value) || 0;
    const total = (hours * 60) + minutes;
    
    if (total > 0) {
      this.hideModal('custom-time-modal');
      const overlay = document.querySelector('.complete-overlay.visible');
      if (overlay) {
        // Custom time from rest/focus options
        if (overlay.dataset.nextMode === 'rest') {
          this.startRest(total);
        } else {
          this.startFocus(total);
        }
      } else {
        this.startFocus(total);
      }
    }
    
    // Reset inputs
    document.getElementById('custom-hours').value = '';
    document.getElementById('custom-minutes').value = '';
  }

  // UI Updates
  updateUI() {
    const state = this.timer.getState();
    
    // Show/hide controls
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const timeSelection = document.querySelector('.time-selection');
    const controls = document.querySelector('.controls');

    if (state.isRunning || state.isPaused) {
      startBtn?.classList.add('hidden');
      pauseBtn?.classList.remove('hidden');
      resetBtn?.classList.remove('hidden');
      timeSelection?.classList.add('hidden');
      controls?.classList.remove('hidden');
      pauseBtn.textContent = state.isPaused ? '▶ Resume' : '⏸ Pause';
    } else {
      startBtn?.classList.remove('hidden');
      pauseBtn?.classList.add('hidden');
      resetBtn?.classList.add('hidden');
      timeSelection?.classList.remove('hidden');
    }
  }

  updateTimerDisplay(time) {
    const display = document.getElementById('timer-display');
    if (display) display.textContent = time;
  }

  updateProgress(percent) {
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = `${percent}%`;
  }

  updateModeLabel(mode) {
    const label = document.getElementById('timer-label');
    if (!label) return;
    
    switch(mode) {
      case 'focus': label.textContent = 'Focus Session'; break;
      case 'rest': label.textContent = 'Rest Time'; break;
      default: label.textContent = 'Select Duration';
    }
  }

  updateCoffeeCup(fillPercent) {
    const coffee = document.getElementById('coffee-liquid');
    const steam = document.querySelector('.steam-container');
    
    // Safeguard against NaN or invalid values
    if (isNaN(fillPercent) || fillPercent === null || fillPercent === undefined) {
      fillPercent = 100;
    }
    fillPercent = Math.max(0, Math.min(100, fillPercent));
    
    if (coffee) {
      // Animate coffee level (0-100%)
      const minY = 45;  // Full cup position
      const maxY = 130; // Empty cup position
      const y = minY + ((100 - fillPercent) / 100) * (maxY - minY);
      coffee.setAttribute('y', y.toFixed(2));
      coffee.setAttribute('height', Math.max(0, 130 - y).toFixed(2));
    }
    
    if (steam) {
      if (fillPercent > 50) {
        steam.classList.remove('steam-low', 'steam-off');
      } else if (fillPercent > 10) {
        steam.classList.add('steam-low');
        steam.classList.remove('steam-off');
      } else {
        steam.classList.add('steam-off');
      }
    }
  }

  resetCoffeeCup() {
    this.updateCoffeeCup(100);
    const steam = document.querySelector('.steam-container');
    steam?.classList.remove('steam-low', 'steam-off');
  }

  // View Management
  showTimerView() {
    document.querySelector('.time-selection')?.classList.add('hidden');
    document.getElementById('timer-display')?.parentElement?.classList.remove('hidden');
    document.getElementById('progress-container')?.classList.remove('hidden');
  }

  showSelectionView() {
    document.querySelector('.time-selection')?.classList.remove('hidden');
    document.getElementById('timer-display').textContent = '00:00';
    document.getElementById('progress-fill').style.width = '0%';
  }

  showRestOptions() {
    const overlay = document.getElementById('rest-overlay');
    if (overlay) {
      overlay.classList.add('visible');
      overlay.dataset.nextMode = 'rest';
    }
  }

  showFocusOptions() {
    const overlay = document.getElementById('focus-overlay');
    if (overlay) {
      overlay.classList.add('visible');
      overlay.dataset.nextMode = 'focus';
    }
  }

  hideAllOverlays() {
    document.querySelectorAll('.complete-overlay').forEach(o => o.classList.remove('visible'));
  }

  // Modal Management
  showModal(id) {
    document.getElementById(id)?.classList.add('visible');
  }

  hideModal(id) {
    document.getElementById(id)?.classList.remove('visible');
  }

  // Music Panel
  toggleMusicPanel() {
    const toggle = document.getElementById('music-toggle');
    const options = document.getElementById('music-options');
    toggle?.classList.toggle('active');
    options?.classList.toggle('visible');
  }

  updateMusicButtons() {
    document.querySelectorAll('.music-btn[data-track]').forEach(btn => {
      const trackId = btn.dataset.track;
      btn.classList.toggle('active', this.music.isTrackPlaying(trackId));
    });
  }

  updateNowPlaying(track) {
    const container = document.getElementById('now-playing');
    const title = document.getElementById('now-playing-title');
    
    if (track) {
      container?.classList.remove('hidden');
      if (title) title.textContent = `${track.icon} ${track.name}`;
    } else {
      container?.classList.add('hidden');
    }
    
    this.updateMusicButtons();
  }

  // Quotes
  showQuote() {
    const quote = this.quotes.getNextQuote();
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    
    if (!textEl || !authorEl) return;
    
    // Fade out
    textEl.classList.add('quote-fade-out');
    authorEl.classList.add('quote-fade-out');
    
    setTimeout(() => {
      textEl.textContent = `"${quote.text}"`;
      authorEl.textContent = `— ${quote.author}`;
      
      // Fade in
      textEl.classList.remove('quote-fade-out');
      authorEl.classList.remove('quote-fade-out');
    }, 500);
  }

  startQuoteRotation() {
    this.quoteInterval = setInterval(() => this.showQuote(), 60000);
  }

  stopQuoteRotation() {
    if (this.quoteInterval) {
      clearInterval(this.quoteInterval);
      this.quoteInterval = null;
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new FocusTimeApp();
});
