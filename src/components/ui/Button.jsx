import React from "react";

export default function Button({ children, variant = "primary", loading, glow, className = "", ...props }) {
  return (
    <button
      className={`lb-btn lb-btn-${variant} ${glow ? "lb-btn-glow" : ""} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="spinner" /> : children}
    </button>
  );
}
