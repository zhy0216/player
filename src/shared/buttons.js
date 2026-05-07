// Shared inline-style button factories.

export const pillBtn = (kind) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 16px",
  fontSize: 13,
  fontWeight: 500,
  borderRadius: 999,
  cursor: "pointer",
  fontFamily: "var(--font-sans)",
  border: "1px solid rgba(255,255,255,0.18)",
  background: kind === "active" ? "var(--cerulean-600)" : "rgba(255,255,255,0.04)",
  color: "white",
  transition: "background-color 150ms ease, border-color 150ms ease",
});

export const iconBtn = () => ({
  width: 32,
  height: 32,
  display: "grid",
  placeItems: "center",
  background: "transparent",
  border: 0,
  color: "rgba(255,255,255,0.85)",
  cursor: "pointer",
  borderRadius: 6,
});

export const kbdSt = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  padding: "1px 5px",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 3,
  color: "rgba(255,255,255,0.7)",
};
