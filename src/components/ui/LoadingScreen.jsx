import React from "react";

export function LoadingScreen({ label = "Preparing your space…" }) {
  return (
    <div className="loading-screen">
      <div className="loading-orb">
        <div className="ring r1" />
        <div className="ring r2" />
        <div className="orb-core" />
      </div>
      <p>{label}</p>
    </div>
  );
}

export function InlineLoader({ size = 22 }) {
  return <span className="spinner" style={{ width: size, height: size, borderWidth: 2 }} />;
}
