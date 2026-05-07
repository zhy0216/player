import React from "react";
import { Cover } from "./Cover.jsx";
import { Scrubber } from "./Scrubber.jsx";
import { Ic } from "./Icons.jsx";
import { fmt } from "../data/tracks.js";
import { iconBtn } from "../shared/buttons.js";

export function PlaybackBar({
  track,
  state,
  onToggle,
  onNext,
  onPrev,
  onSeek,
  onVolume,
  onShuffle,
  onRepeat,
  liked,
  onLike,
  onLyrics,
  onQueue,
  queueOpen,
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 96,
        zIndex: 5,
        background: "rgba(0,0,0,0.55)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "grid",
        gridTemplateColumns: "300px 1fr 300px",
        alignItems: "center",
        padding: "0 28px",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
        <Cover track={track} size={56} radius={2} />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "white",
            }}
          >
            {track.title}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {track.artist} — {track.album}
          </div>
        </div>
        <button
          onClick={onLike}
          style={{
            background: "transparent",
            border: 0,
            padding: 6,
            cursor: "pointer",
            flexShrink: 0,
            color: liked ? "var(--cerulean-300)" : "rgba(255,255,255,0.55)",
          }}
        >
          {liked ? Ic.heartFill(15) : Ic.heart(15)}
        </button>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 14,
          }}
        >
          <button
            onClick={onShuffle}
            style={{
              ...iconBtn(),
              color: state.shuffle
                ? "var(--cerulean-300)"
                : "rgba(255,255,255,0.65)",
            }}
          >
            {Ic.shuffle(15)}
          </button>
          <button onClick={onPrev} style={iconBtn()}>
            {Ic.prev(18)}
          </button>
          <button
            onClick={onToggle}
            style={{
              width: 44,
              height: 44,
              display: "grid",
              placeItems: "center",
              background: "white",
              color: "var(--zinc-950)",
              borderRadius: "50%",
              border: 0,
              cursor: "pointer",
            }}
          >
            {state.playing ? Ic.pause(18) : Ic.play(18)}
          </button>
          <button onClick={onNext} style={iconBtn()}>
            {Ic.next(18)}
          </button>
          <button
            onClick={onRepeat}
            style={{
              ...iconBtn(),
              color: state.repeat
                ? "var(--cerulean-300)"
                : "rgba(255,255,255,0.65)",
            }}
          >
            {Ic.repeat(15)}
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 10,
            alignItems: "center",
            marginTop: 4,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>{fmt(state.position)}</span>
          <Scrubber
            value={state.position}
            max={track.duration}
            onSeek={onSeek}
            fg="white"
            bg="rgba(255,255,255,0.16)"
            height={3}
          />
          <span>{fmt(track.duration)}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 4,
        }}
      >
        <button
          onClick={onLyrics}
          title="Lyrics (L)"
          style={{ ...iconBtn(), color: "rgba(255,255,255,0.65)" }}
        >
          {Ic.mic(16)}
        </button>
        <button
          onClick={onQueue}
          title="Queue (Q)"
          style={{
            ...iconBtn(),
            color: queueOpen
              ? "var(--cerulean-300)"
              : "rgba(255,255,255,0.65)",
          }}
        >
          {Ic.list(16)}
        </button>
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}
        >
          <span style={{ color: "rgba(255,255,255,0.55)" }}>{Ic.volume(14)}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.volume}
            onChange={(e) => onVolume(parseFloat(e.target.value))}
            style={{ width: 90, accentColor: "var(--cerulean-400)" }}
          />
        </div>
      </div>
    </div>
  );
}
