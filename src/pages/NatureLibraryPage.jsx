import React, { useState } from "react";
import GlassCard from "../components/ui/GlassCard";
import { Icon } from "../icons";

const WORLDS = [
  { name: "Waterfall", dur: "18 min", video: "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-the-forest-2213-large.mp4" },
  { name: "Forest", dur: "22 min", video: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-woods-32858-large.mp4" },
  { name: "Himalayan Peaks", dur: "15 min" },
  { name: "Rain Cabin", dur: "30 min" },
  { name: "Ocean Beach", dur: "20 min" },
  { name: "Snow Valley", dur: "16 min" },
  { name: "Night Sky", dur: "25 min" },
  { name: "Temple Garden", dur: "14 min" },
];

const SOUNDS = [
  { name: "Rain", icon: Icon.wind },
  { name: "Ocean Waves", icon: Icon.wind },
  { name: "Forest", icon: Icon.leaf },
  { name: "Night Crickets", icon: Icon.moon },
  { name: "Mountain Wind", icon: Icon.wind },
  { name: "Temple Bells", icon: Icon.star },
];

function WorldCard({ world }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="universe-card" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {hover && world.video && (
        <video autoPlay muted loop playsInline onError={(e) => (e.target.style.display = "none")}>
          <source src={world.video} type="video/mp4" />
        </video>
      )}
      <button className="sound-toggle" aria-label="Toggle sound">{Icon.volume}</button>
      <div className="universe-info"><h4>{world.name}</h4><p>{world.dur} · Guided</p></div>
    </div>
  );
}

export default function NatureLibraryPage() {
  const [active, setActive] = useState({});
  const toggle = (name) => setActive((a) => ({ ...a, [name]: a[name] ? 0 : 60 }));
  const setVol = (name, v) => setActive((a) => ({ ...a, [name]: v }));

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Nature Library</span>
        <h2>Step into a quieter place.</h2>
        <p>Real HD footage and ambient sound, ready whenever you need to slow down.</p>
      </div>
      <div className="grid-4" style={{ marginBottom: 50 }}>
        {WORLDS.map((w) => <WorldCard key={w.name} world={w} />)}
      </div>

      <div className="page-head">
        <span className="eyebrow">Sound Mixer</span>
        <h2 style={{ fontSize: "1.4rem" }}>Layer your own calm.</h2>
      </div>
      <div className="grid-2">
        {SOUNDS.map((s) => (
          <GlassCard key={s.name} className={`sound-card ${active[s.name] ? "active" : ""}`} onClick={() => toggle(s.name)}>
            <div className="med-icon">{s.icon}</div>
            <h4 style={{ fontSize: ".95rem" }}>{s.name}</h4>
            {active[s.name] > 0 && (
              <input type="range" className="vol-slider" min="0" max="100" value={active[s.name]}
                aria-label={`${s.name} volume`}
                onClick={(e) => e.stopPropagation()} onChange={(e) => setVol(s.name, Number(e.target.value))} />
            )}
          </GlassCard>
        ))}
      </div>
    </>
  );
}
