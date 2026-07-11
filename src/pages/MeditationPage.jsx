import React, { useState, useRef, useEffect } from "react";
import GlassCard from "../components/ui/GlassCard";
import { Icon } from "../icons";

const MEDITATIONS = [
  { title: "Morning Calm", dur: "10 min", icon: Icon.leaf },
  { title: "Anxiety Reset", dur: "12 min", icon: Icon.heart },
  { title: "Deep Focus", dur: "20 min", icon: Icon.star },
  { title: "Sleep Wind-down", dur: "25 min", icon: Icon.moon },
  { title: "Box Breathing", dur: "5 min", icon: Icon.wind },
  { title: "Body Scan", dur: "15 min", icon: Icon.leaf },
  { title: "Loving Kindness", dur: "14 min", icon: Icon.heart },
  { title: "Grounding", dur: "8 min", icon: Icon.star },
];

export default function MeditationPage() {
  const [playing, setPlaying] = useState(null);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const play = (m) => {
    clearInterval(intervalRef.current);
    setPlaying(m);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(intervalRef.current); return 100; }
        return p + 1.2;
      });
    }, 300);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Guided Meditation</span>
        <h2>Choose your next few minutes.</h2>
      </div>
      <div className="grid-4">
        {MEDITATIONS.map((m) => (
          <GlassCard key={m.title} className="med-card" onClick={() => play(m)}>
            <div className="med-icon">{m.icon}</div>
            <h4>{m.title}</h4>
            <span className="dur">{m.dur}</span>
            <div className="med-play">{playing?.title === m.title && progress < 100 ? Icon.pause : Icon.play}</div>
          </GlassCard>
        ))}
      </div>
      {playing && (
        <GlassCard glow className="player-bar">
          <div className="med-icon">{playing.icon}</div>
          <div style={{ minWidth: 110 }}>
            <b style={{ fontSize: ".88rem" }}>{playing.title}</b>
            <div style={{ fontSize: ".72rem", color: "var(--ink-soft)" }}>{playing.dur}</div>
          </div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <button className="icon-btn" onClick={() => play(playing)} aria-label={progress < 100 ? "Pause" : "Replay"}>{Icon.play}</button>
        </GlassCard>
      )}
    </>
  );
}
