/**
 * Focus Time - Music Module
 * Handles YouTube audio playback via iframe API
 */

const MUSIC_TRACKS = [
  { id: 'brown-noise', name: 'Brown Noise', icon: '🌊', youtubeId: '0GDfOAuUvQ0' },
  { id: 'white-noise', name: 'White Noise', icon: '📻', youtubeId: 'yLOM8R6lbzg' },
  { id: 'pink-noise', name: 'Pink Noise', icon: '🌸', youtubeId: '1re-ioih-DY' },
  { id: 'memory-reboot', name: 'Memory Reboot', icon: '🎹', youtubeId: 'gE3AO47eyKs' },
  { id: 'interstellar', name: 'Interstellar', icon: '🚀', youtubeId: 'WHqbqzqeskw' },
  { id: 'oppenheimer', name: 'Oppenheimer', icon: '💥', youtubeId: 'LYigiwbaX_U' }
];

class MusicPlayer {
  constructor(containerId) {
    this.containerId = containerId;
    this.players = {};
    this.currentTrack = null;
    this.isPlaying = false;
    this.volume = 50;
    this.isReady = false;
    this.pendingPlay = null;
    this.onTrackChange = () => {};
    this.onPlayStateChange = () => {};
    this.onReady = () => {};
    this.initYouTubeAPI();
  }

  initYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this.createPlayers();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => this.createPlayers();
  }

  createPlayers() {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    
    let ready = 0;
    MUSIC_TRACKS.forEach(track => {
      const div = document.createElement('div');
      div.id = `player-${track.id}`;
      container.appendChild(div);
      
      this.players[track.id] = new YT.Player(div.id, {
        height: '1', width: '1', videoId: track.youtubeId,
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: track.youtubeId },
        events: {
          onReady: () => {
            this.players[track.id].setVolume(this.volume);
            if (++ready === MUSIC_TRACKS.length) {
              this.isReady = true;
              this.onReady();
              if (this.pendingPlay) { this.play(this.pendingPlay); this.pendingPlay = null; }
            }
          },
          onStateChange: (e) => { if (e.data === 0) { this.players[track.id].seekTo(0); this.players[track.id].playVideo(); } }
        }
      });
    });
  }

  play(trackId) {
    if (!this.isReady) { this.pendingPlay = trackId; return; }
    if (this.currentTrack && this.currentTrack !== trackId) this.stopCurrentTrack();
    if (this.players[trackId]) {
      this.players[trackId].playVideo();
      this.currentTrack = trackId;
      this.isPlaying = true;
      this.onTrackChange(MUSIC_TRACKS.find(t => t.id === trackId));
      this.onPlayStateChange(true);
    }
  }

  stopCurrentTrack() {
    if (this.currentTrack && this.players[this.currentTrack]) {
      this.players[this.currentTrack].pauseVideo();
      this.players[this.currentTrack].seekTo(0);
    }
  }

  stop() { this.stopCurrentTrack(); this.currentTrack = null; this.isPlaying = false; this.onPlayStateChange(false); }
  pause() { if (this.currentTrack) { this.players[this.currentTrack].pauseVideo(); this.isPlaying = false; this.onPlayStateChange(false); } }
  resume() { if (this.currentTrack) { this.players[this.currentTrack].playVideo(); this.isPlaying = true; this.onPlayStateChange(true); } }
  toggle() { this.isPlaying ? this.pause() : this.resume(); }
  
  setVolume(v) { this.volume = Math.max(0, Math.min(100, v)); Object.values(this.players).forEach(p => p.setVolume && p.setVolume(this.volume)); }
  getVolume() { return this.volume; }
  getTracks() { return MUSIC_TRACKS; }
  getCurrentTrack() { return MUSIC_TRACKS.find(t => t.id === this.currentTrack) || null; }
  isTrackPlaying(id) { return this.currentTrack === id && this.isPlaying; }
}

window.MusicPlayer = MusicPlayer;
window.MUSIC_TRACKS = MUSIC_TRACKS;
