import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import AuroraBackground from "../components/layout/AuroraBackground";
import { Icon } from "../icons";

export default function NotFoundPage() {
  return (
    <div className="auth-shell">
      <AuroraBackground variant="auth" />
      <div className="state-block" style={{ position: "relative", zIndex: 1 }}>
        <div className="state-icon">{Icon.leaf}</div>
        <h3>This page wandered off</h3>
        <p>Even Lumora loses the trail sometimes. Let's get you back.</p>
        <Link to="/"><Button style={{ marginTop: 18 }}>Return Home</Button></Link>
      </div>
    </div>
  );
}
