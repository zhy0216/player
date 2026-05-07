import React from "react";
import { Cover } from "./Cover.jsx";
import { Ic } from "./Icons.jsx";
import { TRACKS, fmt } from "../data/tracks.js";

export function Queue({ open, currentId, playing, onSelect, onClose }) {
  if (!open) return <div />;
  const curIdx = TRACKS.findIndex((t) => t.id === currentId);
  const upNext = TRACKS.slice(curIdx + 1).concat(TRACKS.slice(0, curIdx));
  return (
    <div
      className="fade-in"
      style={{
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.4)",
        color: "white",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "20px 20px 12px", display: "flex", alignItems: "center" }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            Up next
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>
            {upNext.length} tracks queued
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            marginLeft: "auto",
            width: 28,
            height: 28,
            display: "grid",
            placeItems: "center",
            background: "transparent",
            border: 0,
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
          }}
        >
          {Ic.x(14)}
        </button>
      </div>
      <div
        className="scroll"
        style={{ flex: 1, overflow: "auto", padding: "0 8px 16px" }}
      >
        {upNext.map((t, i) => (
          <div
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              display: "grid",
              gridTemplateColumns: "20px 36px 1fr auto",
              gap: 10,
              alignItems: "center",
              padding: "8px 12px",
              cursor: "pointer",
              borderRadius: 4,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Cover track={t} size={36} radius={2} />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {t.title}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>
                {t.artist}
              </div>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {fmt(t.duration)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
