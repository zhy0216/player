import React from "react";

export function Cover({ track, size, radius = 0 }) {
  if (!track) return null;
  const h = track.hue;
  const sym = track.title.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, oklch(0.42 0.16 ${h}) 0%, oklch(0.18 0.10 ${h + 20}) 100%)`,
        borderRadius: radius,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 40%),
             linear-gradient(115deg, transparent 49%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.08) 51%, transparent 52%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontWeight: 800,
          color: "rgba(255,255,255,0.95)",
          fontSize: size * 0.34,
          letterSpacing: "-0.05em",
          lineHeight: 1,
        }}
      >
        {sym}
      </div>
      <div
        style={{
          position: "absolute",
          left: size * 0.08,
          bottom: size * 0.08,
          fontFamily: "var(--font-mono)",
          fontSize: Math.max(9, size * 0.09),
          color: "rgba(255,255,255,0.7)",
          fontWeight: 600,
        }}
      >
        {String(track.id).padStart(2, "0")}
      </div>
    </div>
  );
}
