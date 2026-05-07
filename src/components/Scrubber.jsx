import React, { useRef, useState } from "react";
import { fmt } from "../data/tracks.js";

export function Scrubber({
  value,
  max,
  onSeek,
  fg = "white",
  bg = "rgba(255,255,255,0.16)",
  height = 3,
}) {
  const ref = useRef();
  const [hover, setHover] = useState(false);
  const [hx, setHx] = useState(0);
  const onClick = (e) => {
    const r = ref.current.getBoundingClientRect();
    onSeek(((e.clientX - r.left) / r.width) * max);
  };
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setHx(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
  };
  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        height: 16,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "100%",
          height: hover ? height + 1 : height,
          background: bg,
          borderRadius: height,
          position: "relative",
          transition: "height 120ms ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${(value / max) * 100}%`,
            background: fg,
            borderRadius: height,
            transition: "width 100ms linear",
          }}
        />
        {hover && (
          <div
            style={{
              position: "absolute",
              top: -22,
              left: `${hx * 100}%`,
              transform: "translateX(-50%)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "rgba(255,255,255,0.85)",
              background: "rgba(0,0,0,0.6)",
              padding: "2px 6px",
              borderRadius: 3,
              pointerEvents: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              whiteSpace: "nowrap",
            }}
          >
            {fmt(hx * max)}
          </div>
        )}
      </div>
    </div>
  );
}
