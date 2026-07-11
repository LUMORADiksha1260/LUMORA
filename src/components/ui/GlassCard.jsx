import React from "react";

export default function GlassCard({ children, className = "", floating, glow, ...props }) {
  return (
    <div
      className={`glass-card ${floating ? "glass-card-floating" : ""} ${glow ? "glass-card-glow" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
