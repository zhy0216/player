import React from "react";

export function PlayingBars({ color = "var(--cerulean-300)" }) {
  return (
    <div style={{ display: "inline-flex", gap: 2, alignItems: "flex-end", height: 14 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 2,
            background: color,
            borderRadius: 1,
            animation: `eqbar 900ms ${i * 150}ms infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
