import React from "react";
import GlassCard from "../ui/GlassCard";

export function JournalEntry({ date, text }) {
  return (
    <GlassCard className="entry-item">
      <div className="meta"><span>{date}</span></div>
      <p>{text}</p>
    </GlassCard>
  );
}

export function GratitudeEntry({ date, items }) {
  return (
    <GlassCard className="entry-item">
      <div className="meta"><span>{date}</span></div>
      {items.map((it, i) => <p key={i} style={{ marginBottom: 4 }}>• {it}</p>)}
    </GlassCard>
  );
}
