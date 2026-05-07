import React, { useEffect, useState } from "react";
import { usePlayer } from "./player/usePlayer.js";
import { TopBar } from "./components/TopBar.jsx";
import { NowPlaying } from "./components/NowPlaying.jsx";
import { AlbumDetail } from "./components/AlbumDetail.jsx";
import { Queue } from "./components/Queue.jsx";
import { PlaybackBar } from "./components/PlaybackBar.jsx";
import { SearchOverlay } from "./components/SearchOverlay.jsx";
import { LyricsOverlay } from "./components/LyricsOverlay.jsx";
import { MiniBar } from "./components/MiniBar.jsx";

export default function App() {
  const {
    state,
    track,
    toggle,
    next,
    prev,
    seek,
    select,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();
  const [view, setView] = useState("now");
  const [albumName, setAlbumName] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [mini, setMini] = useState(false);
  const [liked, setLiked] = useState(new Set([1, 4]));

  const toggleLike = (id) => {
    setLiked((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      } else if (e.code === "ArrowRight" && (e.metaKey || e.ctrlKey)) next();
      else if (e.code === "ArrowLeft" && (e.metaKey || e.ctrlKey)) prev();
      else if (e.key === "/") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "l") setLyricsOpen((o) => !o);
      else if (e.key === "q") setQueueOpen((o) => !o);
      else if (e.key === "Escape") {
        setSearchOpen(false);
        setLyricsOpen(false);
        setQueueOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, next, prev]);

  const h = track.hue;

  if (mini) return <MiniBar onMaximize={() => setMini(false)} />;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        color: "white",
        overflow: "hidden",
        background: "var(--zinc-950)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 25% 25%, oklch(0.40 0.18 ${h}) 0%, oklch(0.20 0.10 ${h + 15}) 35%, var(--zinc-950) 75%)`,
          transition: "background 1400ms cubic-bezier(.4,0,.2,1)",
        }}
      />

      <TopBar
        view={view}
        onHome={() => {
          setView("now");
          setAlbumName(null);
        }}
        onSearch={() => setSearchOpen(true)}
        onMini={() => setMini(true)}
      />

      <div
        style={{
          position: "relative",
          height: "100%",
          paddingTop: 64,
          display: "grid",
          gridTemplateColumns: queueOpen ? "1fr 340px" : "1fr 0px",
          transition: "grid-template-columns 320ms cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div style={{ position: "relative", overflow: "auto" }} className="scroll">
          {view === "now" && (
            <NowPlaying
              key={"now-" + track.id}
              track={track}
              state={state}
              liked={liked.has(track.id)}
              onLike={() => toggleLike(track.id)}
              onShowAlbum={() => {
                setAlbumName(track.album);
                setView("album");
              }}
              onShowLyrics={() => setLyricsOpen(true)}
            />
          )}
          {view === "album" && albumName && (
            <AlbumDetail
              key={"album-" + albumName}
              albumName={albumName}
              currentId={state.trackId}
              playing={state.playing}
              liked={liked}
              onSelect={select}
              onLike={toggleLike}
              onBack={() => {
                setView("now");
                setAlbumName(null);
              }}
              onShowAlbum={(name) => {
                setAlbumName(name);
                setView("album");
              }}
            />
          )}
        </div>

        <Queue
          open={queueOpen}
          currentId={state.trackId}
          playing={state.playing}
          onSelect={select}
          onClose={() => setQueueOpen(false)}
        />
      </div>

      <PlaybackBar
        track={track}
        state={state}
        onToggle={toggle}
        onNext={next}
        onPrev={prev}
        onSeek={seek}
        onVolume={setVolume}
        onShuffle={toggleShuffle}
        onRepeat={toggleRepeat}
        liked={liked.has(track.id)}
        onLike={() => toggleLike(track.id)}
        onLyrics={() => setLyricsOpen(true)}
        onQueue={() => setQueueOpen((o) => !o)}
        queueOpen={queueOpen}
      />

      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          onSelect={(id) => {
            select(id);
            setSearchOpen(false);
          }}
          liked={liked}
        />
      )}
      {lyricsOpen && (
        <LyricsOverlay
          track={track}
          position={state.position}
          onSeek={seek}
          onClose={() => setLyricsOpen(false)}
        />
      )}
    </div>
  );
}
