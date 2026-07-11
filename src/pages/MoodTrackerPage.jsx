import React, { useState, useEffect } from "react";
import GlassCard from "../components/ui/GlassCard";
import MoodPicker from "../components/mood/MoodPicker";
import MoodChart from "../components/mood/MoodChart";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { mockApi } from "../services/mockApi";

export default function MoodTrackerPage() {
  const { user } = useAuth();
  const { pushToast } = useToast();
  const [week, setWeek] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [mood, setMood] = useState(null);
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  useEffect(() => {
    mockApi.getMoodWeek(user.id).then((w) => { setWeek(w); if (w[todayIdx]) setMood(w[todayIdx]); });
  }, [user.id]);

  const log = async (val) => {
    setMood(val);
    const updated = await mockApi.logMood(user.id, todayIdx, val);
    setWeek(updated);
    pushToast("Mood logged for today.", "success");
  };

  const streak = week.filter((v) => v > 0).length;

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Mood Tracker</span>
        <h2>How are you, really?</h2>
        <p>One tap a day builds a picture over time.</p>
      </div>
      <GlassCard glow style={{ padding: 28, marginBottom: 22 }}>
        <h3 style={{ fontSize: "1.05rem" }}>Today</h3>
        <MoodPicker selected={mood} onSelect={log} />
      </GlassCard>
      <GlassCard style={{ padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "1.05rem" }}>This week</h3>
          <span style={{ fontSize: ".8rem", color: "var(--ink-soft)" }}>{streak}/7 days logged</span>
        </div>
        <MoodChart week={week} />
      </GlassCard>
    </>
  );
}
