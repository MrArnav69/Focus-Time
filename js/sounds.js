/**
 * Focus Time - Sound Effects Module
 * Uses Web Audio API for notification sounds
 */

class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.isEnabled = true;
    this.volume = 0.5;
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  ensureContext() {
    if (!this.audioContext) this.init();
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  playBeep() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.audioContext) return;

    const playTone = (freq, start, duration) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      const now = this.audioContext.currentTime + start;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.3, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      osc.start(now);
      osc.stop(now + duration);
    };

    // Double beep pattern
    playTone(880, 0, 0.15);
    playTone(880, 0.2, 0.15);
    playTone(1100, 0.5, 0.2);
  }

  playClick() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    
    osc.frequency.value = 600;
    osc.type = 'sine';
    
    const now = this.audioContext.currentTime;
    gain.gain.setValueAtTime(this.volume * 0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    osc.start(now);
    osc.stop(now + 0.05);
  }

  setVolume(v) { this.volume = Math.max(0, Math.min(1, v)); }
  enable() { this.isEnabled = true; }
  disable() { this.isEnabled = false; }
  toggle() { this.isEnabled = !this.isEnabled; return this.isEnabled; }
}

window.SoundEffects = SoundEffects;
