/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

let globalSoundEnabled = false; // Starts off/opt-in to comply with browser autoplay and user convenience

export function useSound() {
  const [isEnabled, setIsEnabled] = useState(globalSoundEnabled);

  const toggleSound = () => {
    globalSoundEnabled = !globalSoundEnabled;
    setIsEnabled(globalSoundEnabled);
    if (globalSoundEnabled) {
      // Play a quick chime to confirm and initialize
      playLuxuryChime();
    }
  };

  const playLuxuryChime = () => {
    if (!globalSoundEnabled) return;

    try {
      // Create Web Audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      
      // Main crystalline chime (high sine wave)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();

      // Metallic sparkling over-tone (higher triangle wave)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1600, audioCtx.currentTime); // Fundamental 1600Hz
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(3200, audioCtx.currentTime); // Crystalline harmonic

      // Gain controls
      const now = audioCtx.currentTime;
      
      // Crystalline tone envelope (very fast attack, smooth exponential decay)
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.04, now + 0.005); // Very soft volume
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      // Sparkle "tink" envelope (instant attack, super-fast decay)
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.015, now + 0.002);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      // Connect nodes
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);

      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      // Play & stop
      osc1.start(now);
      osc1.stop(now + 0.8);

      osc2.start(now);
      osc2.stop(now + 0.15);
    } catch (e) {
      // Gracefully catch browser constraints or audio errors
      console.warn('Audio Context interaction prevented or unsupported:', e);
    }
  };

  const playGlowChime = () => {
    if (!globalSoundEnabled) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gainSetting = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2400, audioCtx.currentTime + 0.25); // Sliding pitch upwards

      const now = audioCtx.currentTime;
      gainSetting.gain.setValueAtTime(0, now);
      gainSetting.gain.linearRampToValueAtTime(0.02, now + 0.01);
      gainSetting.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(gainSetting);
      gainSetting.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      // Ignored
    }
  };

  return {
    isSoundEnabled: isEnabled,
    toggleSound,
    playLuxuryChime,
    playGlowChime
  };
}
