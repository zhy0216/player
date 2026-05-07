// Single shared playback store. Vanilla pub/sub so multiple components stay in sync.

import { TRACKS } from "../data/tracks.js";

function createPlayerStore() {
  let state = {
    trackId: 1,
    playing: false,
    position: 0,
    volume: 0.72,
    shuffle: false,
    repeat: false,
    queue: TRACKS.map((t) => t.id),
  };
  const listeners = new Set();
  const get = () => state;
  const set = (patch) => {
    state = { ...state, ...patch };
    listeners.forEach((fn) => fn(state));
  };
  const sub = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };

  let last = performance.now();
  setInterval(() => {
    const now = performance.now();
    const dt = (now - last) / 1000;
    last = now;
    if (state.playing) {
      const cur = TRACKS.find((t) => t.id === state.trackId);
      if (!cur) return;
      const pos = state.position + dt;
      if (pos >= cur.duration) {
        const i = state.queue.indexOf(state.trackId);
        const nextId = state.queue[(i + 1) % state.queue.length];
        set({ trackId: nextId, position: 0 });
      } else {
        set({ position: pos });
      }
    }
  }, 250);

  return { get, set, sub };
}

export const PlayerStore = createPlayerStore();
