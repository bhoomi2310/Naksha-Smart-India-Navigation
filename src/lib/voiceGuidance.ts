// Indian Voice Guidance Engine using Web Speech API

class VoiceGuidanceEngine {
  private isMuted: boolean = false;
  private voice: SpeechSynthesisVoice | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Priority: en-IN (Indian English), hi-IN (Hindi), en-GB, en-US
        const indianVoice = voices.find(v => v.lang === 'en-IN' || v.lang.toLowerCase().includes('in')) ||
                            voices.find(v => v.lang.startsWith('en')) ||
                            voices[0];
        if (indianVoice) {
          this.voice = indianVoice;
        }
        this.isInitialized = true;
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public speak(text: string, priority: boolean = false) {
    if (this.isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      if (priority) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.voice) {
        utterance.voice = this.voice;
      }
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 0.95;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const voiceGuidance = new VoiceGuidanceEngine();
