import React, { useEffect, useMemo, useRef } from "react";
import { Cover } from "./Cover.jsx";
import { Ic } from "./Icons.jsx";
import { getLyrics } from "../data/tracks.js";

export function LyricsOverlay({ track, position, onSeek, onClose }) {
  const lyrics = useMemo(() => getLyrics(track.id), [track.id]);
  const activeIdx = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < lyrics.length; i++) if (lyrics[i][0] <= position) idx = i;
    return idx;
  }, [position, lyrics]);

  const containerRef = useRef();
  useEffect(() => {
    const el = containerRef.current?.querySelector(`[data-lyric-idx="${activeIdx}"]`);
    if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [activeIdx]);

  return (
    <div
      className="fade-in"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: `radial-gradient(ellipse at 50% 30%, oklch(0.30 0.16 ${track.hue}) 0%, var(--zinc-950) 70%)`,
        backdropFilter: "blur(0px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          color: "white",
          zIndex: 2,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
            }}
          >
            Lyrics
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>
            {track.title}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            {track.artist}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            marginLeft: "auto",
            width: 36,
            height: 36,
            display: "grid",
            placeItems: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "white",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {Ic.x(16)}
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 60,
          transform: "translateY(-50%)",
          opacity: 0.18,
          pointerEvents: "none",
        }}
      >
        <Cover track={track} size={320} radius={2} />
      </div>

      <div
        ref={containerRef}
        className="scroll"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "auto",
          padding: "28vh 10vw 28vh 38vw",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {lyrics.map(([t, line], i) => {
          const active = i === activeIdx;
          const past = i < activeIdx;
          if (!line) return <div key={i} data-lyric-idx={i} style={{ height: 8 }} />;
          return (
            <div
              key={i}
              data-lyric-idx={i}
              onClick={() => onSeek(t)}
              style={{
                fontSize: active ? 44 : 32,
                fontWeight: active ? 700 : 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                cursor: "pointer",
                color: active
                  ? "white"
                  : past
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.25)",
                transition:
                  "color 220ms ease, font-size 220ms ease, font-weight 220ms ease",
                textWrap: "balance",
                maxWidth: "60ch",
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}
