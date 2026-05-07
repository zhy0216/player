import React from "react";
import { Cover } from "./Cover.jsx";
import { Scrubber } from "./Scrubber.jsx";
import { Ic } from "./Icons.jsx";
import { fmt } from "../data/tracks.js";
import { usePlayer } from "../player/usePlayer.js";
import { iconBtn } from "../shared/buttons.js";

export function MiniBar({ onMaximize }) {
  const { state, track, toggle, next, prev, seek } = usePlayer();
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "start center",
        background: "transparent",
        color: "white",
        padding: 24,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 380,
          background: "var(--zinc-900)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            height: 4,
            background: `linear-gradient(90deg, oklch(0.55 0.18 ${track.hue}), oklch(0.35 0.16 ${track.hue + 20}))`,
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "72px 1fr auto",
            gap: 12,
            padding: 12,
            alignItems: "center",
          }}
        >
          <Cover track={track} size={72} radius={2} />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {track.title}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {track.artist}
            </div>
            <div
              style={{
                marginTop: 8,
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "rgba(255,255,255,0.55)",
                alignItems: "center",
              }}
            >
              <span>{fmt(state.position)}</span>
              <Scrubber
                value={state.position}
                max={track.duration}
                onSeek={seek}
                fg="white"
                bg="rgba(255,255,255,0.14)"
                height={2}
              />
              <span>{fmt(track.duration)}</span>
            </div>
          </div>
          <button
            onClick={onMaximize}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 24,
              height: 24,
              display: "grid",
              placeItems: "center",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {Ic.maximize(11)}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            padding: "0 12px 14px",
          }}
        >
          <button onClick={prev} style={iconBtn()}>
            {Ic.prev(15)}
          </button>
          <button
            onClick={toggle}
            style={{
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              background: "white",
              color: "var(--zinc-950)",
              borderRadius: "50%",
              border: 0,
              cursor: "pointer",
            }}
          >
            {state.playing ? Ic.pause(15) : Ic.play(15)}
          </button>
          <button onClick={next} style={iconBtn()}>
            {Ic.next(15)}
          </button>
        </div>
      </div>
    </div>
  );
}
