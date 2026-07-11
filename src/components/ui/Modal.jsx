import React, { useEffect, useRef } from "react";
import { Icon } from "../../icons";

export default function Modal({ open, onClose, children, title }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-card modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <div className="modal-head">
          <h3 id="modal-title">{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close dialog">{Icon.x}</button>
        </div>
        {children}
      </div>
    </div>
  );
}
