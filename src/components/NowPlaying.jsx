import React from "react";
import { Cover } from "./Cover.jsx";
import { Ic } from "./Icons.jsx";
import { fmt } from "../data/tracks.js";
import { pillBtn } from "../shared/buttons.js";

export function NowPlaying({ track, state, liked, onLike, onShowAlbum, onShowLyrics }) {
  return (
    <div
      className="fade-in"
      style={{
        minHeight: "calc(100vh - 64px - 96px)",
        padding: "60px 64px 40px",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) 360px",
        gap: 64,
        alignItems: "center",
      }}
    >
      <div className="fade-up" style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            marginBottom: 18,
          }}
        >
          Track {String(track.id).padStart(2, "0")} · From the album ·{" "}
          <span
            onClick={onShowAlbum}
            style={{
              color: "var(--cerulean-200)",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            {track.album}
          </span>
        </div>
        <h1
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: "clamp(64px, 10vw, 140px)",
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
            textWrap: "balance",
          }}
        >
          {track.title}
        </h1>
        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 18,
            color: "rgba(255,255,255,0.78)",
          }}
        >
          <span style={{ fontWeight: 500 }}>{track.artist}</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {track.bpm} bpm · {track.key} · {fmt(track.duration)}
          </span>
        </div>
        <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={onShowLyrics} style={pillBtn("ghost")}>
            {Ic.mic(14)} Show lyrics
          </button>
          <button onClick={onShowAlbum} style={pillBtn("ghost")}>
            {Ic.disc(14)} View album
          </button>
          <button onClick={onLike} style={pillBtn(liked ? "active" : "ghost")}>
            {liked ? Ic.heartFill(14) : Ic.heart(14)} {liked ? "Liked" : "Like"}
          </button>
        </div>
      </div>

      <div
        className="fade-up"
        style={{ display: "grid", placeItems: "end", alignSelf: "center" }}
      >
        <div style={{ position: "relative" }}>
          <Cover track={track} size={360} radius={2} />
          <div
            style={{
              position: "absolute",
              left: -1,
              right: -1,
              bottom: -1,
              height: 1,
              background: "rgba(255,255,255,0.15)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
