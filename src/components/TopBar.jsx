import React from "react";
import { Ic } from "./Icons.jsx";

export function TopBar({ view, onHome, onSearch, onMini }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        onClick={onHome}
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            background: "var(--cerulean-700)",
            color: "white",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "-0.05em",
            borderRadius: 4,
          }}
        >
          Al
        </div>
        <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.005em" }}>
          Cerulean
        </span>
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginLeft: 8,
          }}
        >
          / {view === "album" ? "album" : "now playing"}
        </span>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
        <button
          onClick={onSearch}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.7)",
            padding: "7px 12px",
            borderRadius: 6,
            fontSize: 13,
            cursor: "pointer",
            minWidth: 220,
          }}
        >
          {Ic.search(14)}
          <span>Search tracks, albums, artists</span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              padding: "1px 6px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 3,
            }}
          >
            ⌘K
          </span>
        </button>
        <button
          onClick={onMini}
          title="Mini mode"
          style={{
            width: 36,
            height: 36,
            display: "grid",
            placeItems: "center",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.65)",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {Ic.minimize(14)}
        </button>
      </div>
    </div>
  );
}
