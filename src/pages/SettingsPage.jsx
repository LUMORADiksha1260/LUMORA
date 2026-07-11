import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { Icon } from "../icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";

export default function SettingsPage() {
  const { logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const [notif, setNotif] = useState({ daily: true, community: false, counselor: true });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => { logOut(); navigate("/login"); pushToast("Logged out.", "default"); };

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Settings</span>
        <h2>Preferences.</h2>
      </div>

      <GlassCard style={{ padding: 28, marginBottom: 22 }}>
        <h3 style={{ fontSize: "1.05rem", marginBottom: 6 }}>Appearance</h3>
        <div className="settings-row">
          <div><h4>Dark mode</h4><p>Switch between light and dark themes.</p></div>
          <button
            className={`toggle ${theme === "dark" ? "on" : ""}`}
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Dark mode"
          />
        </div>
      </GlassCard>

      <GlassCard style={{ padding: 28, marginBottom: 22 }}>
        <h3 style={{ fontSize: "1.05rem", marginBottom: 6 }}>Notifications</h3>
        {[
          ["daily", "Daily check-in reminder", "A gentle nudge to log your mood."],
          ["community", "Community activity", "Replies in groups you've joined."],
          ["counselor", "Counselor messages", "Updates about bookings and sessions."],
        ].map(([key, title, desc]) => (
          <div className="settings-row" key={key}>
            <div><h4>{title}</h4><p>{desc}</p></div>
            <button
              className={`toggle ${notif[key] ? "on" : ""}`}
              onClick={() => setNotif((n) => ({ ...n, [key]: !n[key] }))}
              role="switch"
              aria-checked={notif[key]}
              aria-label={title}
            />
          </div>
        ))}
      </GlassCard>

      <GlassCard style={{ padding: 28 }}>
        <h3 style={{ fontSize: "1.05rem", marginBottom: 6 }}>Account</h3>
        <div className="settings-row">
          <div><h4>Log out</h4><p>You can log back in anytime.</p></div>
          <Button variant="secondary" onClick={handleLogout}>{Icon.logout} Log Out</Button>
        </div>
        <div className="settings-row">
          <div><h4>Delete account</h4><p>Permanently remove your data.</p></div>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete</Button>
        </div>
      </GlassCard>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Delete your account?">
        <p style={{ color: "var(--ink-soft)", fontSize: ".9rem", lineHeight: 1.6, marginBottom: 20 }}>
          This is a demo action — no real account will be deleted. In production this would permanently erase your journal, mood history, and Safe Space content.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="secondary" style={{ flex: 1 }} onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="danger" style={{ flex: 1 }} onClick={() => { setConfirmOpen(false); pushToast("Demo: account deletion simulated.", "success"); }}>Confirm</Button>
        </div>
      </Modal>
    </>
  );
}
