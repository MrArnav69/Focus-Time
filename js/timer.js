/**
 * Focus Time - Timer Module
 * Handles countdown logic, progress tracking, and session management
 */

class Timer {
  constructor(options = {}) {
    this.duration = 0; // Total duration in seconds
    this.remaining = 0; // Remaining time in seconds
    this.isRunning = false;
    this.isPaused = false;
    this.intervalId = null;
    this.mode = 'idle'; // 'idle', 'focus', 'rest'
    
    // Callbacks
    this.onTick = options.onTick || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.onStart = options.onStart || (() => {});
    this.onPause = options.onPause || (() => {});
    this.onReset = options.onReset || (() => {});
    this.onModeChange = options.onModeChange || (() => {});
  }

  /**
   * Start the timer with specified duration
   * @param {number} minutes - Duration in minutes
   * @param {string} mode - 'focus' or 'rest'
   */
  start(minutes, mode = 'focus') {
    if (this.isRunning && !this.isPaused) return;
    
    if (!this.isPaused) {
      this.duration = minutes * 60;
      this.remaining = this.duration;
      this.mode = mode;
      this.onModeChange(this.mode);
    }
    
    this.isRunning = true;
    this.isPaused = false;
    
    this.onStart({
      duration: this.duration,
      remaining: this.remaining,
      mode: this.mode
    });
    
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  /**
   * Internal tick function - called every second
   */
  tick() {
    if (!this.isRunning || this.isPaused) return;
    
    this.remaining--;
    
    const progress = this.getProgress();
    const timeData = this.getFormattedTime();
    
    this.onTick({
      remaining: this.remaining,
      duration: this.duration,
      progress: progress,
      formatted: timeData,
      mode: this.mode
    });
    
    if (this.remaining <= 0) {
      this.complete();
    }
  }

  /**
   * Pause the timer
   */
  pause() {
    if (!this.isRunning || this.isPaused) return;
    
    this.isPaused = true;
    clearInterval(this.intervalId);
    this.intervalId = null;
    
    this.onPause({
      remaining: this.remaining,
      mode: this.mode
    });
  }

  /**
   * Resume the timer
   */
  resume() {
    if (!this.isPaused) return;
    this.start(this.remaining / 60, this.mode);
  }

  /**
   * Toggle between pause and resume
   */
  toggle() {
    if (this.isPaused) {
      this.resume();
    } else if (this.isRunning) {
      this.pause();
    }
  }

  /**
   * Reset the timer
   */
  reset() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isRunning = false;
    this.isPaused = false;
    this.remaining = 0;
    this.duration = 0;
    this.mode = 'idle';
    
    this.onReset();
    this.onModeChange(this.mode);
  }

  /**
   * Handle timer completion
   */
  complete() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isRunning = false;
    this.isPaused = false;
    this.remaining = 0;
    
    const completedMode = this.mode;
    
    this.onComplete({
      mode: completedMode,
      duration: this.duration
    });
  }

  /**
   * Get progress as a percentage (0-100)
   * @returns {number}
   */
  getProgress() {
    if (this.duration === 0) return 0;
    return ((this.duration - this.remaining) / this.duration) * 100;
  }

  /**
   * Get remaining progress as a percentage (100-0)
   * For use with coffee cup fill level
   * @returns {number}
   */
  getRemainingProgress() {
    if (this.duration === 0) return 100;
    return (this.remaining / this.duration) * 100;
  }

  /**
   * Get formatted time object
   * @returns {Object}
   */
  getFormattedTime() {
    const hours = Math.floor(this.remaining / 3600);
    const minutes = Math.floor((this.remaining % 3600) / 60);
    const seconds = this.remaining % 60;
    
    return {
      hours,
      minutes,
      seconds,
      display: this.formatDisplay(hours, minutes, seconds),
      shortDisplay: this.formatShortDisplay(hours, minutes, seconds)
    };
  }

  /**
   * Format time for display (HH:MM:SS or MM:SS)
   * @param {number} hours
   * @param {number} minutes
   * @param {number} seconds
   * @returns {string}
   */
  formatDisplay(hours, minutes, seconds) {
    const pad = (n) => n.toString().padStart(2, '0');
    
    if (hours > 0) {
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  /**
   * Format short display for menubar/title
   * @param {number} hours
   * @param {number} minutes
   * @param {number} seconds
   * @returns {string}
   */
  formatShortDisplay(hours, minutes, seconds) {
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  /**
   * Check if timer is in focus mode
   * @returns {boolean}
   */
  isFocusMode() {
    return this.mode === 'focus';
  }

  /**
   * Check if timer is in rest mode
   * @returns {boolean}
   */
  isRestMode() {
    return this.mode === 'rest';
  }

  /**
   * Check if timer is idle
   * @returns {boolean}
   */
  isIdle() {
    return this.mode === 'idle';
  }

  /**
   * Get current state
   * @returns {Object}
   */
  getState() {
    return {
      isRunning: this.isRunning,
      isPaused: this.isPaused,
      mode: this.mode,
      duration: this.duration,
      remaining: this.remaining,
      progress: this.getProgress(),
      remainingProgress: this.getRemainingProgress(),
      formatted: this.getFormattedTime()
    };
  }
}

// Export for use in other modules
window.Timer = Timer;
