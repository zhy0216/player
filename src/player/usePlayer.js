import { useEffect, useState } from "react";
import { TRACKS } from "../data/tracks.js";
import { PlayerStore } from "./store.js";

export function usePlayer() {
  const [s, setS] = useState(PlayerStore.get());
  useEffect(() => PlayerStore.sub(setS), []);
  const cur = TRACKS.find((t) => t.id === s.trackId);
  return {
    state: s,
    track: cur,
    play: () => PlayerStore.set({ playing: true }),
    pause: () => PlayerStore.set({ playing: false }),
    toggle: () => PlayerStore.set({ playing: !PlayerStore.get().playing }),
    seek: (sec) =>
      PlayerStore.set({ position: Math.max(0, Math.min(cur.duration, sec)) }),
    select: (id) => PlayerStore.set({ trackId: id, position: 0, playing: true }),
    next: () => {
      const st = PlayerStore.get();
      const i = st.queue.indexOf(st.trackId);
      const nid = st.queue[(i + 1) % st.queue.length];
      PlayerStore.set({ trackId: nid, position: 0 });
    },
    prev: () => {
      const st = PlayerStore.get();
      const i = st.queue.indexOf(st.trackId);
      const nid = st.queue[(i - 1 + st.queue.length) % st.queue.length];
      PlayerStore.set({ trackId: nid, position: 0 });
    },
    setVolume: (v) => PlayerStore.set({ volume: v }),
    toggleShuffle: () =>
      PlayerStore.set({ shuffle: !PlayerStore.get().shuffle }),
    toggleRepeat: () =>
      PlayerStore.set({ repeat: !PlayerStore.get().repeat }),
  };
}
