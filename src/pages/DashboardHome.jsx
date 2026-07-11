import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import MoodPicker from "../components/mood/MoodPicker";
import { Icon } from "../icons";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { mockApi } from "../services/mockApi";

const QUOTES = [
  "You don't have to see the whole staircase, just take the first step.",
  "Rest is not a reward for finishing. It's a requirement for continuing.",
  "Feelings are visitors. Let them come and go.",
  "Progress, not perfection.",
  "You are allowed to be both a work in progress and worthy of love.",
  "Healing isn't linear, and that's okay.",
  "Small steps every day add up to big changes.",
  "Be gentle with yourself. You're doing the best you can.",
];

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / 86400000);
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHome() {
  const { user } = useAuth();
  const { pushToast } = useToast();
  const [mood, setMood] = useState(null);
  const [week, setWeek] = useState([0, 0, 0, 0, 0, 0, 0]);
  const quote = QUOTES[dayOfYear() % QUOTES.length];
  const firstName = user?.name?.split(" ")[0];

  useEffect(() => {
    mockApi.getMoodWeek(user.id).then((w) => {
      setWeek(w);
      const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
      if (w[todayIdx]) setMood(w[todayIdx]);
    });
  }, [user.id]);

  const logMood = async (val) => {
    setMood(val);
    const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const updated = await mockApi.logMood(user.id, todayIdx, val);
    setWeek(updated);
    pushToast("Mood logged for today.", "success");
  };

  return (
    <>
      <div className="page-head">
        <h2>{greeting()}, {firstName}.</h2>
        <p className="daily-quote">"{quote}"</p>
      </div>

      <div className="home-grid">
        <GlassCard glow className="home-card mood-check-card">
          <div className="hc-head"><span className="eyebrow">Daily Check-in</span><h3>How are you, right now?</h3></div>
          <MoodPicker selected={mood} onSelect={logMood} />
        </GlassCard>

        <GlassCard className="home-card continue-card">
          <div className="hc-head"><span className="eyebrow">Continue</span><h3>Pick up your conversation</h3></div>
          <p className="hc-sub">"...I think I've just been avoiding rest."</p>
          <Link to="/dashboard/companion"><Button variant="secondary">{Icon.chat} Continue Chatting</Button></Link>
        </GlassCard>

        <GlassCard className="home-card recent-card">
          <div className="hc-head"><span className="eyebrow">Recently Played</span><h3>Anxiety Reset</h3></div>
          <div className="mini-player">
            <div className="med-icon">{Icon.heart}</div>
            <div style={{ flex: 1 }}>
              <div className="progress-track"><div className="progress-fill" style={{ width: "42%" }} /></div>
              <span style={{ fontSize: ".72rem", color: "var(--ink-soft)" }}>5:02 of 12:00</span>
            </div>
            <Link to="/dashboard/meditation" className="icon-btn" aria-label="Resume Anxiety Reset meditation">{Icon.play}</Link>
          </div>
        </GlassCard>

        <GlassCard className="home-card sleep-card">
          <div className="hc-head"><span className="eyebrow">Sleep</span><h3>Wind down tonight</h3></div>
          <p className="hc-sub">A 25-minute rain-cabin soundscape, ready when you are.</p>
          <Link to="/dashboard/nature"><Button variant="secondary">{Icon.moon} Start Sleep Sounds</Button></Link>
        </GlassCard>
      </div>

      <div className="shortcut-row">
        <Link to="/dashboard/safe-space" className="shortcut-tile">
          <div className="med-icon">{Icon.lock}</div>
          <div><h4>Safe Space</h4><p>Your locked private area</p></div>
        </Link>
        <Link to="/dashboard/journal" className="shortcut-tile">
          <div className="med-icon">{Icon.book}</div>
          <div><h4>Journal</h4><p>Write it out today</p></div>
        </Link>
        <Link to="/dashboard/nature" className="shortcut-tile">
          <div className="med-icon">{Icon.wind}</div>
          <div><h4>Nature Library</h4><p>Real HD calming worlds</p></div>
        </Link>
        {!user.premium && (
          <Link to="/dashboard/premium" className="shortcut-tile shortcut-premium">
            <div className="med-icon">{Icon.crown}</div>
            <div><h4>Go Premium</h4><p>Unlock everything</p></div>
          </Link>
        )}
      </div>
    </>
  );
}
