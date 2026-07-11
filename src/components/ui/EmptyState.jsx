import React from "react";
import { Icon } from "../../icons";
import Button from "./Button";

export function EmptyState({ icon = Icon.inbox, title, description, actionLabel, onAction }) {
  return (
    <div className="state-block">
      <div className="state-icon">{icon}</div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {actionLabel && <Button onClick={onAction} style={{ marginTop: 18 }}>{actionLabel}</Button>}
    </div>
  );
}

export function ErrorState({ title = "Something didn't load", description = "Please try again in a moment.", onRetry }) {
  return (
    <div className="state-block state-block-error">
      <div className="state-icon state-icon-error">{Icon.alert}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {onRetry && <Button variant="secondary" onClick={onRetry} style={{ marginTop: 18 }}>Try Again</Button>}
    </div>
  );
}
