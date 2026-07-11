import React from "react";

export const MOODS = [
  { emoji: "😔", label: "Awful", value: 1 },
  { emoji: "😕", label: "Low", value: 2 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😄", label: "Great", value: 5 },
];

export default function MoodPicker({ selected, onSelect }) {
  return (
    <div className="mood-picker">
      {MOODS.map((m) => (
        <button
          type="button"
          key={m.value}
          className={`mood-opt ${selected === m.value ? "selected" : ""}`}
          onClick={() => onSelect(m.value)}
          aria-pressed={selected === m.value}
          aria-label={m.label}
        >
          <span className="mood-emoji" aria-hidden="true">{m.emoji}</span>
          <span className="label">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
