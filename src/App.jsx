import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

const blue = "#2176AE88";
const yellow = "#FFD25A88";
const red = "#eb4a5a88";
//const red = "#ef2b3f88";
const green = "#619B8A88";
const upArrow = "./public/arrow-big-up.png"
const downArrow = "./public/arrow-big-down.png"
const downArrowImg = document.getElementById("downArrow");

/* ---------- sample data ---------- */
const SAMPLE_SONGS = [
  {
    id: "banana",
    title: "Banana",
    artist: "Stony Pony",
    genre: "Jazz",
    audioUrl: "/audio/Banana by Stony Pony.wav",
    albumArt: "./audio/banana.jpg",
    regions: [
      { id: "intro", label: "Intro", start: 0, end: 12.4, color: "rgba(96,165,250,0.25)" },
      { id: "theme", label: "Theme", start: 12.4, end: 52.0, color: "rgba(34,197,94,0.25)" },
      { id: "solo1", label: "Solo 1", start: 52.0, end: 130.5, color: "rgba(245,158,11,0.25)" },
    ],
  },
  {
    id: "check-it-out",
    title: "check it out",
    artist: "phoebemonster",
    genre: "Pop",
    audioUrl: "/audio/check it out by phoebemonster.wav",
    albumArt: "./audio/hit different by phoebemonster.jpg",
    regions: [
      { label: "S1", start: 8.4, end: 16.3, color: blue, size: "large" },
      { label: "UP", start: 16.3, end: 24.5, color: blue, size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: yellow, size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: green, size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: green, size: "small" },
      { label: "A1", start: 48.5, end: 72.5, color: red, size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: blue, size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: blue, size: "small" },
      { label: "B2", start: 100.5, end: 114.5, color: yellow, size: "large" },
      { label: "↓", start: 114.5, end: 115.6, color: green, size: "small" },
      { label: "W", start: 115.6, end: 116.6, color: green, size: "small" },
      { label: "A2", start: 116.5, end: 150, color: red, size: "large" }
    ],
  },
  {
    id: "go-outside",
    title: "Go Outside",
    artist: "Spin",
    genre: "Pop",
    audioUrl: "/audio/Go Outside by Spin.wav",
    albumArt: "./audio/go outside cover.jpg",
    regions: [
      { label: "S1", start: 8.4, end: 16.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 16.3, end: 24.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A1", start: 48.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B2", start: 100.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 114.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 115.6, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A2", start: 116.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" }
    ],
  },
  {
    id: "on-the-moon",
    title: "On The Moon",
    artist: "Spin",
    genre: "Dance",
    genre2: ["Beats", "Electronic", "Pop", "Rock"],
    audioUrl: "/audio/On The Moon by Spin.wav",
    albumArt: "./audio/go outside cover.jpg",
    regions: [
      { label: "S1", start: 8.4, end: 16.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 16.3, end: 24.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A1", start: 48.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B2", start: 100.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 114.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 115.6, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A2", start: 116.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" }
    ],
  },
  {
    id: "jet-set-static",
    title: "Jet Set Static",
    artist: "Spin",
    genre: "Pop",
    audioUrl: "/audio/Jet Set Static by Spin.wav",
    albumArt: "./audio/go outside cover.jpg",
    regions: [
      { label: "S1", start: 8.4, end: 16.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 16.3, end: 24.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A1", start: 48.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B2", start: 100.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 114.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 115.6, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A2", start: 116.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" }
    ],
  },
  {
    id: "tleilax",
    title: "Tleilax",
    artist: "Graham Barton",
    genre: "Beats",
    audioUrl: "/audio/Tleilax by Graham Barton.wav",
    albumArt: "./audio/tleilax cover.jpg",
    regions: [
      { label: "S1", start: 8.4, end: 16.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 16.3, end: 24.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B1", start: 24.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 38.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 39.5, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A1", start: 48.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" },
      { label: "S2", start: 84.4, end: 92.3, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↑", start: 92.3, end: 100.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "B2", start: 100.5, end: 38.5, color: "rgba(96,165,250,0.25)", size: "large" },
      { label: "↓", start: 114.5, end: 39.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "W", start: 115.6, end: 40.5, color: "rgba(96,165,250,0.25)", size: "small" },
      { label: "A2", start: 116.5, end: 72.5, color: "rgba(34,197,94,0.25)", size: "large" }
    ],
  }
];

/* ---------- utils ---------- */
function formatTime(t) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function makeSolid(c) {
  if (typeof c === "string" && c.endsWith("0.25)")) return c.replace("0.25)", "1)");
  if (typeof c === "string" && c.startsWith("rgba(")) {
    const p = c.slice(5, -1).split(",").map(s => s.trim());
    if (p.length === 4) return `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
  }
  return c;
}

/* ---------- waveform (WaveSurfer) ---------- */
function WaveSurferWaveform({ audioRef, regions, height = 200, follow = false, onReady }) {
  // keep stable refs OUTSIDE effects
  const containerRef = useRef(null);
  const wsRef = useRef(null);
  const roRef = useRef(null);
  const displayDurationRef = useRef(null);
  const seekRafRef = useRef(null);

  // keep latest onReady without retriggering the effect
  const onReadyRef = useRef(onReady);
  useEffect(() => { onReadyRef.current = onReady; }, [onReady]);

  useEffect(() => {
    if (!containerRef.current || !audioRef?.current) return;

    const audio = audioRef.current;

    const setup = async () => {
      const { default: WaveSurfer } = await import("wavesurfer.js");
      const { default: RegionsPlugin } = await import("wavesurfer.js/dist/plugins/regions.esm.js");

      try {
        // Destroy any old instance first
        wsRef.current?.destroy();
      } catch { }

      const ws = WaveSurfer.create({
        container: containerRef.current,
        height,
        media: audio,
        mediaControls: false,
        waveColor: "#5e5e5e",
        progressColor: "#a1a1a1",
        cursorColor: "#ffffff",
        barWidth: 2,
        barRadius: 2,
        barGap: 1,
        interact: true,
        fillParent: true,
      });

      wsRef.current = ws;
      const regionsPlugin = ws.registerPlugin(RegionsPlugin.create({ dragSelection: false }));

      // Add your regions
      (regions || []).forEach((r) => {
        regionsPlugin.addRegion({
          id: r.id,
          start: r.start,
          end: r.end,
          color: r.color || "rgba(16,185,129,0.25)",
          drag: false,
          resize: false,
        });
      });

      ws.on("ready", () => {
        console.log("✅ WaveSurfer ready!");
        if (onReady) onReady();
      });
    };

    // 🧠 Only run setup after <audio> metadata is ready
    if (audio.readyState >= 1) {
      setup();
    } else {
      audio.addEventListener("loadedmetadata", setup, { once: true });
    }

    // 🧹 Cleanup
    return () => {
      try { wsRef.current?.destroy(); } catch { }
      wsRef.current = null;
    };
  }, [audioRef, regions, height, follow]);


  return <div ref={containerRef} className="wave" />;
}


/* ---------- player ---------- */
function TransportButtons({ audioRef }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <button className="btn" onClick={() => (audioRef.current?.paused ? audioRef.current?.play() : audioRef.current?.pause())}>Play/Pause</button>
      <button className="btn" onClick={() => (audioRef.current.currentTime = Math.max(0, (audioRef.current?.currentTime || 0) - 5))}>−5s</button>
      <button className="btn" onClick={() => (audioRef.current.currentTime = Math.min(audioRef.current?.duration || Infinity, (audioRef.current?.currentTime || 0) + 5))}>+5s</button>
    </div>
  );
}

function Player({ song, onBack, onReady }) {
  const audioRef = useRef(null);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  // NEW: overlay state
  const [waveReady, setWaveReady] = useState(false);

  // Reset overlay on song change (and optionally warm any album art)
  useEffect(() => {
    setWaveReady(false);
  }, [song?.id]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        if (audioRef.current?.paused) audioRef.current.play();
        else audioRef.current?.pause();
      } else if (e.key.toLowerCase() === "j") {
        audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
      } else if (e.key.toLowerCase() === "k") {
        audioRef.current.currentTime = Math.min(
          dur || audioRef.current.duration || Infinity,
          audioRef.current.currentTime + 5
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dur]);

  // 🆕 ADD THIS EFFECT BELOW
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.pause();
      a.muted = false;
      a.volume = 1.0;
      a.playbackRate = 1.0;
      a.currentTime = 0;
      a.load(); // force reload of new source
    } catch { }
  }, [song?.audioUrl]); // runs whenever the song changes

  return (
    <section className="player">
      <div className="player-bar">
        <button className="btn" onClick={onBack}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{song.title}</h2>
        <div style={{ color: "rgba(255,255,255,.7)" }}>{song.artist}</div>
        <span className="pill" style={{ marginLeft: "auto" }}>{song.genre}</span>
      </div>

      {/* Make the card a positioning context for the overlay */}
      <div className="player-card" style={{ position: "relative" }}>
        {/* Loading overlay (covers card until waveform is ready) */}

        <audio
          ref={audioRef}
          src={song.audioUrl}
          crossOrigin="anonymous"  // 🆕 add this
          preload="auto"
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration || 0)}
          controls
          style={{ width: "100%" }}

        />

        <WaveSurferWaveform
          audioRef={audioRef}
          regions={song.regions}
          follow={false}
          onReady={() => {
            if (onReady) onReady();   // ✅ triggers App.handleReady
          }}
        />




        <div className="time-transport">
          <div>{formatTime(time)} / {formatTime(dur)}</div>
          <TransportButtons audioRef={audioRef} />
        </div>
      </div>

      {
        song.regions?.length > 0 && (
          <div className="region-grid">
            {song.regions.map((r, idx) => (
              <button
                key={r.id ?? `${song.id}-r-${idx}`}       // fixes the "each child needs a key" warning
                className={`region ${r.size || ""}`}
                onClick={async () => {
                  const a = audioRef.current;
                  if (!a) return;
                  try {
                    a.currentTime = r.start;              // seek to region start
                    await a.play();                       // then play
                  } catch (err) {
                    console.error("Region play() failed:", err);
                  }
                }}
              >
                <div className="name" style={{ color: r.color.replace("88", "") }}>
                  {r.label}
                  {console.log(r.color)}
                </div>
              </button>
            ))}
          </div>
        )
      }

      <div className="tip">Tip: Press Space to play/pause, J/K to seek ±5s</div>

    </section >
  );
}

/* ---------- browser ---------- */
function Browser({ songs, onSelect }) {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const genres = useMemo(() => ["All", ...Array.from(new Set(songs.map(s => s.genre)))], [songs]);

  const filtered = useMemo(() => {
    const qLower = q.toLowerCase();
    return songs.filter(s => {
      const matchesQ = !qLower || `${s.title} ${s.artist}`.toLowerCase().includes(qLower);
      const matchesG = genre === "All" || s.genre === genre;
      return matchesQ && matchesG;
    });
  }, [q, genre, songs]);

  return (
    <>
      <div className="controls">
        {/* <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search songs or artists" /> */}
        <select className="select" value={genre} onChange={(e) => setGenre(e.target.value)}>
          {genres.map(g => <option key={g}>{g}</option>)}
        </select>
      </div>

      <section className="browser">
        <div className="grid">
          {filtered.map(s => (
            <button key={s.id} className="card" onClick={() => onSelect(s)}>
              <div className="card-img-container">
                <img src={s.albumArt} alt="" height={"100px"} width={"100px"} style={{ borderRadius: "8px" }} />
              </div>
              <div style={{ display: "grid", minWidth: 0, flex: 1, textAlign: "left" }}>
                <h4 className="title-sm">{s.title}</h4>
                <p>{s.artist}</p>
                {/*                 <p style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}><em>{s.genre}</em></p>
 */}              </div>
              {/*               <audio src={s.audioUrl} preload="none" controls style={{ maxWidth: 190 }} />
 */}            </button>
          ))}
        </div>
      </section>

    </>
  );
}

function LoadingScreen({ song }) {
  return (
    <div className="loading-screen">
      <div className="loading-card">
        {song.albumArt && <img src={song.albumArt} alt={song.title} />}
        <div>
          <h2>{song.title}</h2>
          <p>{song.artist}</p>
          <p style={{ opacity: 0.6 }}>Building waveform…</p>
        </div>
      </div>
    </div>
  );
}


/* ---------- app ---------- */
export default function App() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (song) => {
    setLoading(true);
    setSelected(song);
  };


  const handleReady = () => {
    // Give React a short frame to mount the Player before hiding loading
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="app">
      <div className="page">
        <header className="header">
          <h1 className="title">Hero Contour</h1>
          <div className="subtitle">Sync Beast</div>
        </header>

        {!selected && <Browser songs={SAMPLE_SONGS} onSelect={handleSelect} />}

        {selected && (
          <>
            <Player song={selected} onBack={() => setSelected(null)} onReady={handleReady} />
            {loading && <LoadingScreen song={selected} />}
          </>
        )}

      </div>
    </div>
  );
}
