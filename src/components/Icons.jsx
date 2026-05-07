import React from "react";

const I = ({ d, fill, size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {d}
  </svg>
);

export const Ic = {
  play: (s) => <I size={s} fill d={<polygon points="6 4 20 12 6 20 6 4" />} />,
  pause: (s) => (
    <I
      size={s}
      fill
      d={
        <>
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </>
      }
    />
  ),
  prev: (s) => (
    <I
      size={s}
      fill
      d={
        <>
          <polygon points="19 4 9 12 19 20 19 4" />
          <line x1="5" y1="4" x2="5" y2="20" />
        </>
      }
    />
  ),
  next: (s) => (
    <I
      size={s}
      fill
      d={
        <>
          <polygon points="5 4 15 12 5 20 5 4" />
          <line x1="19" y1="4" x2="19" y2="20" />
        </>
      }
    />
  ),
  shuffle: (s) => (
    <I
      size={s}
      d={
        <>
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="4" y1="4" x2="9" y2="9" />
        </>
      }
    />
  ),
  repeat: (s) => (
    <I
      size={s}
      d={
        <>
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </>
      }
    />
  ),
  search: (s) => (
    <I
      size={s}
      d={
        <>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </>
      }
    />
  ),
  volume: (s) => (
    <I
      size={s}
      d={
        <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </>
      }
    />
  ),
  list: (s) => (
    <I
      size={s}
      d={
        <>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </>
      }
    />
  ),
  heart: (s) => (
    <I
      size={s}
      d={
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      }
    />
  ),
  heartFill: (s) => (
    <I
      size={s}
      fill
      d={
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      }
    />
  ),
  x: (s) => (
    <I
      size={s}
      d={
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
        </>
      }
    />
  ),
  mic: (s) => (
    <I
      size={s}
      d={
        <>
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </>
      }
    />
  ),
  disc: (s) => (
    <I
      size={s}
      d={
        <>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
        </>
      }
    />
  ),
  minimize: (s) => (
    <I
      size={s}
      d={
        <>
          <polyline points="4 14 10 14 10 20" />
          <polyline points="20 10 14 10 14 4" />
          <line x1="14" y1="10" x2="21" y2="3" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </>
      }
    />
  ),
  maximize: (s) => (
    <I
      size={s}
      d={
        <>
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </>
      }
    />
  ),
  arrowLeft: (s) => (
    <I
      size={s}
      d={
        <>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </>
      }
    />
  ),
  more: (s) => (
    <I
      size={s}
      fill
      d={
        <>
          <circle cx="5" cy="12" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="19" cy="12" r="1.5" />
        </>
      }
    />
  ),
};
