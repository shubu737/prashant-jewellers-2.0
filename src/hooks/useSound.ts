/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

let globalSoundEnabled = false;
// Reuse a single AudioContext across all calls to avoid hitting browser limits
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioContextClass();
    }
    // Resume context if suspended (browser autoplay policy)
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch (e) {
    return null;
  }
}

export function useSound() {
  const [isEnabled, setIsEnabled] = useState(globalSoundEnabled);

  const toggleSound = () => {
    globalSoundEnabled = !globalSoundEnabled;
    setIsEnabled(globalSoundEnabled);
    if (globalSoundEnabled) {
      playLuxuryChime();
    }
  };

  const playLuxuryChime = () => {
    if (!globalSoundEnabled) return;
    try {
      const audioCtx = getAudioContext();
      if (!audioCtx) return;

      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1600, audioCtx.currentTime);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(3200, audioCtx.currentTime);

      const now = audioCtx.currentTime;

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.04, now + 0.005);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.015, now + 0.002);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 0.8);
      osc2.start(now);
      osc2.stop(now + 0.15);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  };

  const playGlowChime = () => {
    if (!globalSoundEnabled) return;
    try {
      const audioCtx = getAudioContext();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2400, audioCtx.currentTime + 0.25);

      const now = audioCtx.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.02, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

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
