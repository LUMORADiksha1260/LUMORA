import React from "react";

export function Field({ label, error, children }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}

export function TextInput({ error, right, ...props }) {
  return (
    <div className="input-wrap">
      <input className={`lb-input ${error ? "input-error" : ""}`} {...props} />
      {right && <div className="input-right">{right}</div>}
    </div>
  );
}

export function TextArea(props) {
  return <textarea className="lb-input" {...props} />;
}
