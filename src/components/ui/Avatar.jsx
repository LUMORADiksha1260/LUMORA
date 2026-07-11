import React from "react";

export default function Avatar({ name, size = 40, color }) {
  const initials = name
    ? name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: color ? `linear-gradient(160deg, ${color}, var(--accent))` : undefined,
      }}
    >
      {initials}
    </div>
  );
}
