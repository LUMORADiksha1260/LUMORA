import React from "react";

/**
 * Soft, slow-moving aurora blobs used behind the landing page and dashboard.
 * Pure CSS animation — no video weight, works in light and dark mode.
 */
export default function AuroraBackground({ variant = "default" }) {
  return (
    <div className={`aurora-bg aurora-${variant}`} aria-hidden="true">
      <div className="aurora-blob b1" />
      <div className="aurora-blob b2" />
      <div className="aurora-blob b3" />
      <div className="aurora-grain" />
    </div>
  );
}
