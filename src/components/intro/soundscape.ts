"use client";

type SoundscapeHandle = {
  cleanup: () => void;
  context: AudioContext;
  fadeOutTimer: number | null;
  master: GainNode;
};

declare global {
  interface Window {
    __portraiSoundscape?: SoundscapeHandle;
  }
}

const SOUND_DURATION_MS = 26000;

function createNoiseBuffer(context: AudioContext) {
  const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const data = buffer.getChannelData(0);

  let last = 0;
  for (let index = 0; index < data.length; index += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.06 * white) / 1.06;
    data[index] = last * 0.42;
  }

  return buffer;
}

export async function startIntroSoundscape() {
  if (typeof window === "undefined") return;

  const existing = window.__portraiSoundscape;
  if (existing) {
    if (existing.fadeOutTimer !== null) {
      window.clearTimeout(existing.fadeOutTimer);
      existing.fadeOutTimer = null;
    }

    if (existing.context.state === "suspended") {
      await existing.context.resume();
    }

    existing.master.gain.cancelScheduledValues(existing.context.currentTime);
    existing.master.gain.setValueAtTime(
      existing.master.gain.value,
      existing.context.currentTime,
    );
    existing.master.gain.linearRampToValueAtTime(
      0.045,
      existing.context.currentTime + 1.2,
    );
    return;
  }

  const AudioContextCtor =
    window.AudioContext ||
    // @ts-expect-error Safari fallback.
    window.webkitAudioContext;

  if (!AudioContextCtor) return;

  const context = new AudioContextCtor();
  const master = context.createGain();
  master.gain.value = 0.0001;
  master.connect(context.destination);

  const lowpass = context.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 1200;
  lowpass.Q.value = 0.8;
  lowpass.connect(master);

  const drone = context.createOscillator();
  drone.type = "triangle";
  drone.frequency.value = 55;

  const droneGain = context.createGain();
  droneGain.gain.value = 0.018;
  drone.connect(droneGain);
  droneGain.connect(lowpass);

  const overtone = context.createOscillator();
  overtone.type = "sine";
  overtone.frequency.value = 82.41;

  const overtoneGain = context.createGain();
  overtoneGain.gain.value = 0.012;
  overtone.connect(overtoneGain);
  overtoneGain.connect(lowpass);

  const shimmer = context.createOscillator();
  shimmer.type = "sine";
  shimmer.frequency.value = 164.82;

  const shimmerGain = context.createGain();
  shimmerGain.gain.value = 0.004;
  shimmer.connect(shimmerGain);
  shimmerGain.connect(lowpass);

  const motion = context.createOscillator();
  motion.type = "sine";
  motion.frequency.value = 0.085;

  const motionDepth = context.createGain();
  motionDepth.gain.value = 16;
  motion.connect(motionDepth);
  motionDepth.connect(overtone.detune);

  const filterMotion = context.createOscillator();
  filterMotion.type = "triangle";
  filterMotion.frequency.value = 0.05;

  const filterDepth = context.createGain();
  filterDepth.gain.value = 240;
  filterMotion.connect(filterDepth);
  filterDepth.connect(lowpass.frequency);

  const noiseSource = context.createBufferSource();
  noiseSource.buffer = createNoiseBuffer(context);
  noiseSource.loop = true;

  const noiseFilter = context.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 480;
  noiseFilter.Q.value = 0.7;

  const noiseGain = context.createGain();
  noiseGain.gain.value = 0.006;
  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(master);

  drone.start();
  overtone.start();
  shimmer.start();
  motion.start();
  filterMotion.start();
  noiseSource.start();

  master.gain.linearRampToValueAtTime(0.045, context.currentTime + 2.6);

  const cleanup = () => {
    drone.stop();
    overtone.stop();
    shimmer.stop();
    motion.stop();
    filterMotion.stop();
    noiseSource.stop();
    master.disconnect();
    lowpass.disconnect();
    droneGain.disconnect();
    overtoneGain.disconnect();
    shimmerGain.disconnect();
    motionDepth.disconnect();
    filterDepth.disconnect();
    noiseFilter.disconnect();
    noiseGain.disconnect();
    void context.close();
    if (window.__portraiSoundscape?.context === context) {
      delete window.__portraiSoundscape;
    }
  };

  const handle: SoundscapeHandle = {
    cleanup,
    context,
    fadeOutTimer: null,
    master,
  };

  window.__portraiSoundscape = handle;

  handle.fadeOutTimer = window.setTimeout(() => {
    stopIntroSoundscape();
  }, SOUND_DURATION_MS);
}

export function stopIntroSoundscape() {
  if (typeof window === "undefined") return;

  const existing = window.__portraiSoundscape;
  if (!existing) return;

  if (existing.fadeOutTimer !== null) {
    window.clearTimeout(existing.fadeOutTimer);
    existing.fadeOutTimer = null;
  }

  existing.master.gain.cancelScheduledValues(existing.context.currentTime);
  existing.master.gain.setValueAtTime(
    existing.master.gain.value,
    existing.context.currentTime,
  );
  existing.master.gain.linearRampToValueAtTime(
    0.0001,
    existing.context.currentTime + 0.9,
  );

  window.setTimeout(() => {
    existing.cleanup();
  }, 1000);
}
