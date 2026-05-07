import React, { useEffect, useRef, useState } from "react";
import { Cover } from "./Cover.jsx";
import { Ic } from "./Icons.jsx";
import { ALBUMS, TRACKS, fmt } from "../data/tracks.js";
import { kbdSt } from "../shared/buttons.js";

function SearchSection({ title, children }) {
  return (
    <div style={{ padding: "8px 0" }}>
      <div
        style={{
          padding: "6px 20px",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.45)",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function SearchTrackRow({ t, onSelect, liked }) {
  return (
    <div
      onClick={() => onSelect(t.id)}
      style={{
        display: "grid",
        gridTemplateColumns: "36px 1fr 140px 50px",
        gap: 14,
        alignItems: "center",
        padding: "8px 20px",
        cursor: "pointer",
        color: "white",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <Cover track={t} size={36} radius={2} />
      <div>
        <div style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          {t.title}
          {liked && (
            <span style={{ color: "var(--cerulean-300)" }}>{Ic.heartFill(11)}</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
          {t.artist} — {t.album}
        </div>
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        {t.bpm} bpm · {t.key}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "rgba(255,255,255,0.5)",
          textAlign: "right",
        }}
      >
        {fmt(t.duration)}
      </span>
    </div>
  );
}

export function SearchOverlay({ onClose, onSelect, liked }) {
  const [q, setQ] = useState("");
  const ref = useRef();
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const ql = q.toLowerCase().trim();
  const matchedTracks = ql
    ? TRACKS.filter(
        (t) =>
          t.title.toLowerCase().includes(ql) ||
          t.artist.toLowerCase().includes(ql) ||
          t.album.toLowerCase().includes(ql)
      )
    : [];
  const matchedAlbums = ql
    ? ALBUMS.filter(
        (a) =>
          a.name.toLowerCase().includes(ql) ||
          a.artist.toLowerCase().includes(ql)
      )
    : [];
  const matchedArtists = ql
    ? [
        ...new Set(
          TRACKS.filter((t) => t.artist.toLowerCase().includes(ql)).map(
            (t) => t.artist
          )
        ),
      ]
    : [];

  const recent = TRACKS.slice(0, 4);

  return (
    <div
      className="fade-in"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(8, 8, 10, 0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "12vh",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 90vw)",
          background: "var(--zinc-900)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.5)" }}>{Ic.search(18)}</span>
          <input
            ref={ref}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tracks, albums, artists — sentence case, no exclamation points"
            style={{
              flex: 1,
              background: "transparent",
              border: 0,
              outline: "none",
              color: "white",
              fontSize: 16,
              fontFamily: "var(--font-sans)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              padding: "2px 8px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 4,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            esc
          </span>
        </div>

        <div
          className="scroll"
          style={{ maxHeight: "60vh", overflow: "auto", padding: "8px 0" }}
        >
          {!ql && (
            <SearchSection title="Recent">
              {recent.map((t) => (
                <SearchTrackRow
                  key={t.id}
                  t={t}
                  onSelect={onSelect}
                  liked={liked.has(t.id)}
                />
              ))}
            </SearchSection>
          )}
          {ql &&
            matchedTracks.length === 0 &&
            matchedAlbums.length === 0 &&
            matchedArtists.length === 0 && (
              <div
                style={{
                  padding: "40px 20px",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                No matches for <em style={{ color: "white" }}>"{q}"</em> — try a
                different query.
              </div>
            )}
          {matchedArtists.length > 0 && (
            <SearchSection title={`Artists · ${matchedArtists.length}`}>
              {matchedArtists.map((a) => (
                <div
                  key={a}
                  style={{
                    padding: "10px 20px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.5)", marginRight: 10 }}>
                    artist
                  </span>
                  {a}
                </div>
              ))}
            </SearchSection>
          )}
          {matchedAlbums.length > 0 && (
            <SearchSection title={`Albums · ${matchedAlbums.length}`}>
              {matchedAlbums.map((a) => {
                const lt = TRACKS.find((t) => t.id === a.tracks[0]);
                return (
                  <div
                    key={a.name}
                    onClick={() => onSelect(a.tracks[0])}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px 1fr auto",
                      gap: 14,
                      alignItems: "center",
                      padding: "8px 20px",
                      cursor: "pointer",
                    }}
                  >
                    <Cover track={lt} size={44} radius={3} />
                    <div>
                      <div style={{ fontSize: 14, color: "white" }}>{a.name}</div>
                      <div
                        style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}
                      >
                        {a.artist} · {a.year}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {a.tracks.length} tracks
                    </span>
                  </div>
                );
              })}
            </SearchSection>
          )}
          {matchedTracks.length > 0 && (
            <SearchSection title={`Tracks · ${matchedTracks.length}`}>
              {matchedTracks.map((t) => (
                <SearchTrackRow
                  key={t.id}
                  t={t}
                  onSelect={onSelect}
                  liked={liked.has(t.id)}
                />
              ))}
            </SearchSection>
          )}
        </div>

        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
            display: "flex",
            gap: 18,
          }}
        >
          <span>
            <kbd style={kbdSt}>↵</kbd> open
          </span>
          <span>
            <kbd style={kbdSt}>esc</kbd> close
          </span>
          <span style={{ marginLeft: "auto" }}>
            powered by al.do("find {q || "something"}")
          </span>
        </div>
      </div>
    </div>
  );
}
