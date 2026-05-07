# 沉浸播放器 (Immersive Player)

A React + Vite project — an immersive full-screen music player UI with surfaces for Now Playing, Lyrics, Album detail, Search, Mini mode, and a Queue drawer.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  main.jsx                  # entry — mounts <App />
  App.jsx                   # root <ImmersiveApp />
  index.css                 # base styles + keyframes
  styles/
    colors_and_type.css     # Immersive Player design system tokens
  data/
    tracks.js               # TRACKS, ALBUMS, getLyrics, fmt
  player/
    store.js                # shared playback store (vanilla)
    usePlayer.js            # React hook
  components/
    Icons.jsx
    Cover.jsx
    Scrubber.jsx
    PlayingBars.jsx
    TopBar.jsx
    NowPlaying.jsx
    AlbumDetail.jsx
    LyricsOverlay.jsx
    SearchOverlay.jsx
    Queue.jsx
    PlaybackBar.jsx
    MiniBar.jsx
  shared/
    buttons.js              # pillBtn, iconBtn, kbdSt
```

## Keyboard shortcuts

- `Space` — play / pause
- `⌘/Ctrl + →` — next track
- `⌘/Ctrl + ←` — previous track
- `/` or `⌘/Ctrl + K` — search
- `L` — toggle lyrics
- `Q` — toggle queue
- `Esc` — close any overlay
