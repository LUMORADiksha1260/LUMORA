import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Wraps route content so every navigation gets a soft fade + rise instead of
 * an abrupt swap. Keyed on pathname so React remounts (and re-triggers the
 * CSS animation) on every route change.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
}
