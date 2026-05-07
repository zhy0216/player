// Track + album catalog and lyric timing.

export const TRACKS = [
  { id: 1,  title: "Pale Blue Drift",      artist: "Cerulean",        album: "Atomic Number 13",  duration: 214, hue: 220, bpm: 92,  key: "C#m" },
  { id: 2,  title: "Accessibility Tree",   artist: "al.do",           album: "Headless",          duration: 187, hue: 200, bpm: 124, key: "Am" },
  { id: 3,  title: "Flaky // Stable",      artist: "Test Runner",     album: "CI Sessions",       duration: 256, hue: 260, bpm: 88,  key: "F"  },
  { id: 4,  title: "Zinc 950",             artist: "Cerulean",        album: "Atomic Number 13",  duration: 198, hue: 240, bpm: 102, key: "Dm" },
  { id: 5,  title: "Reasoning Model",      artist: "Anthropic Hours", album: "Slow Tokens",       duration: 232, hue: 280, bpm: 76,  key: "G"  },
  { id: 6,  title: "Hairline / 1px",       artist: "Starlight",       album: "Docs",              duration: 168, hue: 210, bpm: 140, key: "Em" },
  { id: 7,  title: "Sentence Case",        artist: "Voice & Tone",    album: "Style Guide",       duration: 203, hue: 190, bpm: 96,  key: "A"  },
  { id: 8,  title: "Em Dash — Cadence",    artist: "Voice & Tone",    album: "Style Guide",       duration: 245, hue: 205, bpm: 110, key: "Bm" },
  { id: 9,  title: "Selenium Twilight",    artist: "Test Runner",     album: "CI Sessions",       duration: 290, hue: 230, bpm: 70,  key: "Cm" },
  { id: 10, title: "Headless Chrome",      artist: "al.check",        album: "Headless",          duration: 178, hue: 215, bpm: 128, key: "D"  },
  { id: 11, title: "Cold Cerulean",        artist: "Cerulean",        album: "Atomic Number 13",  duration: 221, hue: 245, bpm: 84,  key: "F#m" },
  { id: 12, title: "Element 13",           artist: "Cerulean",        album: "Atomic Number 13",  duration: 264, hue: 225, bpm: 100, key: "Em" },
];

export const ALBUMS = [
  { name: "Atomic Number 13", artist: "Cerulean",        year: 2025, tracks: [1,4,11,12] },
  { name: "Headless",         artist: "al.do",           year: 2024, tracks: [2,10] },
  { name: "CI Sessions",      artist: "Test Runner",     year: 2024, tracks: [3,9] },
  { name: "Slow Tokens",      artist: "Anthropic Hours", year: 2025, tracks: [5] },
  { name: "Docs",             artist: "Starlight",       year: 2023, tracks: [6] },
  { name: "Style Guide",      artist: "Voice & Tone",    year: 2025, tracks: [7,8] },
];

const LYRICS = {
  1: [
    [0,   ""], [4, "wake up in zinc nine fifty"], [10, "everything is hairlines"],
    [16, "a single accent, a single hue"], [22, "and we drift — pale blue"],
    [30, ""], [34, "no gradient mesh, no glow"], [40, "no exclamation point"],
    [46, "just a flat surface and the work"], [52, "and we drift — pale blue"],
    [60, ""], [70, "the docs and the marketing"], [76, "speak with the same voice"],
    [82, "engineer to engineer"], [88, "and we drift — pale blue"],
    [100, ""], [110, "—"], [120, "and we drift —"], [128, "pale blue"],
    [140, ""], [160, ""], [180, "and we drift"], [200, "pale blue"],
  ],
  2: [
    [0, ""], [3, "al dot do, al dot check"],
    [9, "the accessibility tree knows where you are"],
    [15, "no pixels, just structure"], [21, "no waiting, just nodes"],
    [30, ""], [36, "click the button labelled 'sign in'"],
    [42, "type your password — it's the right one"],
    [48, "assert the headline reads correctly"],
    [54, "go to sleep, the suite is green"],
    [70, ""], [90, "no pixels — just structure"],
    [110, "no waiting — just nodes"], [130, ""], [160, "the suite is green"],
  ],
  3: [
    [0, ""], [6, "tuesday flaky, wednesday stable"],
    [14, "thursday flaky, friday stable"],
    [22, "the test didn't change"], [28, "the network did"],
    [40, ""], [50, "we mark it skip, we mark it pass"],
    [58, "we file the ticket, we close the ticket"],
    [70, "we ship anyway"], [80, ""], [110, "tuesday flaky"],
    [130, "wednesday stable"], [160, ""], [200, "we ship anyway"],
  ],
};

export function getLyrics(id) {
  return LYRICS[id] || [
    [0, ""], [10, "instrumental"], [40, ""], [80, "—"], [120, ""], [160, "instrumental"],
  ];
}

export const fmt = (s) => {
  s = Math.max(0, Math.floor(s));
  const m = Math.floor(s / 60);
  const r = String(s % 60).padStart(2, "0");
  return `${m}:${r}`;
};
