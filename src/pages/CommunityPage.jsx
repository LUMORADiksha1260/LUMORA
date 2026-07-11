import React from "react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { COMMUNITY_GROUPS } from "../services/mockApi";
import { useToast } from "../context/ToastContext";

export default function CommunityPage() {
  const { pushToast } = useToast();
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Community</span>
        <h2>Healing feels lighter shared.</h2>
        <p>Anonymous, moderated spaces to be honest — no names, no profiles to perform for.</p>
      </div>
      <div className="community-grid">
        <div className="group-list">
          {COMMUNITY_GROUPS.map((g) => (
            <GlassCard key={g.id} className="group-card">
              <h4>{g.name}</h4>
              <p className="group-meta">{g.members.toLocaleString()} members · Moderated daily</p>
              <Button variant="secondary" onClick={() => pushToast(`Joined ${g.name}.`, "success")}>Join Group</Button>
            </GlassCard>
          ))}
        </div>
        <GlassCard glow className="challenge-card">
          <div>
            <span className="eyebrow">This Month's Challenge</span>
            <h3 style={{ fontSize: "1.3rem", marginTop: 6 }}>7 Days of Gratitude</h3>
            <p style={{ color: "var(--ink-soft)", fontSize: ".88rem", marginTop: 10 }}>Write one honest thank-you note to yourself, every day this week.</p>
          </div>
          <div>
            <div className="progress-track"><div className="progress-fill" style={{ width: "68%" }} /></div>
            <p style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>12,480 people healing together</p>
            <Button style={{ marginTop: 14, width: "100%" }} onClick={() => pushToast("Joined the challenge!", "success")}>Join Challenge</Button>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
