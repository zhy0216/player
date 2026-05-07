import React from "react";
import { Cover } from "./Cover.jsx";
import { PlayingBars } from "./PlayingBars.jsx";
import { Ic } from "./Icons.jsx";
import { ALBUMS, TRACKS, fmt } from "../data/tracks.js";
import { pillBtn } from "../shared/buttons.js";

export function AlbumDetail({
  albumName,
  currentId,
  playing,
  liked,
  onSelect,
  onLike,
  onBack,
  onShowAlbum,
}) {
  const album = ALBUMS.find((a) => a.name === albumName);
  if (!album) return null;
  const tracks = album.tracks.map((id) => TRACKS.find((t) => t.id === id));
  const totalDur = tracks.reduce((s, t) => s + t.duration, 0);
  const lead = tracks[0];

  return (
    <div
      className="fade-in"
      style={{
        minHeight: "calc(100vh - 64px - 96px)",
        padding: "32px 64px 60px",
      }}
    >
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "transparent",
          border: 0,
          color: "rgba(255,255,255,0.65)",
          cursor: "pointer",
          fontSize: 13,
          padding: "8px 0",
          marginBottom: 12,
        }}
      >
        {Ic.arrowLeft(14)} Back
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 40,
          alignItems: "end",
          marginBottom: 40,
        }}
      >
        <Cover track={lead} size={280} radius={2} />
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: 10,
            }}
          >
            Album · {album.year}
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(48px, 6vw, 88px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
            }}
          >
            {album.name}
          </h1>
          <div
            style={{
              marginTop: 16,
              fontSize: 17,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <span style={{ fontWeight: 500 }}>{album.artist}</span>
            <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 10px" }}>·</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
              {tracks.length} tracks · {fmt(totalDur)}
            </span>
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
            <button
              onClick={() => onSelect(tracks[0].id)}
              style={{
                ...pillBtn("active"),
                padding: "12px 22px",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {Ic.play(14)} Play album
            </button>
            <button
              onClick={() =>
                onSelect(tracks[Math.floor(Math.random() * tracks.length)].id)
              }
              style={pillBtn("ghost")}
            >
              {Ic.shuffle(14)} Shuffle
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
        {tracks.map((t, i) => {
          const active = t.id === currentId;
          return (
            <div
              key={t.id}
              onClick={() => onSelect(t.id)}
              style={{
                display: "grid",
                gridTemplateColumns: "32px 1fr 200px 36px 60px",
                gap: 20,
                alignItems: "center",
                padding: "14px 8px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                color: active ? "white" : "rgba(255,255,255,0.85)",
                background: active ? "rgba(2,120,255,0.08)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: active ? "var(--cerulean-300)" : "rgba(255,255,255,0.45)",
                  textAlign: "right",
                }}
              >
                {active && playing ? <PlayingBars /> : String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: active ? "var(--cerulean-200)" : "white",
                  }}
                >
                  {t.title}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                  {t.artist}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {t.bpm} bpm · {t.key}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(t.id);
                }}
                style={{
                  background: "transparent",
                  border: 0,
                  padding: 4,
                  cursor: "pointer",
                  color: liked.has(t.id)
                    ? "var(--cerulean-300)"
                    : "rgba(255,255,255,0.4)",
                }}
              >
                {liked.has(t.id) ? Ic.heartFill(15) : Ic.heart(15)}
              </button>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  textAlign: "right",
                }}
              >
                {fmt(t.duration)}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 56 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            marginBottom: 16,
          }}
        >
          More by {album.artist}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 20,
          }}
        >
          {ALBUMS.filter(
            (a) => a.artist === album.artist && a.name !== album.name
          ).map((a) => {
            const lt = TRACKS.find((t) => t.id === a.tracks[0]);
            return (
              <div
                key={a.name}
                onClick={() => onShowAlbum(a.name)}
                style={{ cursor: "pointer" }}
              >
                <Cover track={lt} size={180} radius={2} />
                <div style={{ marginTop: 10, fontSize: 14, fontWeight: 500 }}>
                  {a.name}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                  {a.year} · {a.tracks.length} tracks
                </div>
              </div>
            );
          })}
          {ALBUMS.filter(
            (a) => a.artist === album.artist && a.name !== album.name
          ).length === 0 && (
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
              This is their only album in the library.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
