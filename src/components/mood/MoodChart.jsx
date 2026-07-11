import React from "react";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MoodChart({ week }) {
  return (
    <div className="mood-chart">
      {week.map((v, i) => (
        <div key={i} className="mood-bar-wrap">
          <div className="mood-bar" style={{ height: `${v ? v * 18 + 10 : 3}%` }} />
          <span>{DAY_LABELS[i]}</span>
        </div>
      ))}
    </div>
  );
}
