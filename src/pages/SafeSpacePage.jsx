import React, { useState } from "react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { Field, TextInput } from "../components/ui/Input";
import { Icon } from "../icons";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { mockApi } from "../services/mockApi";

export default function SafeSpacePage() {
  const { user, updateUser } = useAuth();
  const { pushToast } = useToast();
  const [unlocked, setUnlocked] = useState(false);
  const [mode, setMode] = useState(user.pin ? "pin" : "password");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [notes, setNotes] = useState("");
  const settingPin = !user.pin;

  const pressPin = (d) => {
    setError("");
    const next = (pin + d).slice(0, 4);
    setPin(next);
    if (next.length === 4) {
      if (settingPin) {
        setTimeout(async () => {
          const updated = await mockApi.setPin(user.id, next);
          updateUser(updated);
          pushToast("Safe Space PIN created.", "success");
          setUnlocked(true);
        }, 200);
      } else if (next === user.pin) {
        setTimeout(() => setUnlocked(true), 150);
      } else {
        setTimeout(() => { setError("Incorrect PIN."); setPin(""); }, 250);
      }
    }
  };

  const checkPassword = () => {
    if (password === user.password || user.provider === "google") setUnlocked(true);
    else setError("Incorrect password.");
  };

  const scan = () => {
    setScanning(true);
    setTimeout(() => { setScanning(false); setUnlocked(true); }, 1500);
  };

  if (unlocked) {
    return (
      <>
        <div className="page-head">
          <span className="eyebrow">Safe Space</span>
          <h2>Just for you.</h2>
          <p>Encrypted, locked behind your PIN — write whatever is true right now.</p>
        </div>
        <GlassCard glow style={{ padding: 28 }}>
          <textarea className="lb-input" rows={8} value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder="Write freely. This entry is only visible to you." />
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Button onClick={() => pushToast("Entry saved to Safe Space.", "success")}>Save Entry</Button>
            <Button variant="secondary" onClick={() => { setUnlocked(false); setPin(""); setPassword(""); }}>
              {Icon.lock} Lock Safe Space
            </Button>
          </div>
        </GlassCard>
      </>
    );
  }

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Safe Space</span>
        <h2>Locked, for your privacy.</h2>
      </div>
      <GlassCard glow>
        <div className="lock-screen">
          <div className="lock-tabs" role="tablist" aria-label="Unlock method">
            <button role="tab" aria-selected={mode === "pin"} className={mode === "pin" ? "active" : ""} onClick={() => { setMode("pin"); setError(""); }}>PIN</button>
            <button role="tab" aria-selected={mode === "password"} className={mode === "password" ? "active" : ""} onClick={() => { setMode("password"); setError(""); }}>Password</button>
            <button role="tab" aria-selected={mode === "bio"} className={mode === "bio" ? "active" : ""} onClick={() => { setMode("bio"); setError(""); }}>Biometric</button>
          </div>

          {mode === "pin" && (
            <>
              <p className="lock-help">{settingPin ? "Create a 4-digit PIN for your Safe Space" : "Enter your 4-digit PIN"}</p>
              <div className="pin-display">{[0, 1, 2, 3].map((i) => <div key={i} className={`pin-dot ${pin[i] ? "filled" : ""}`} />)}</div>
              {error && <div className="field-error" style={{ marginBottom: 10 }}>{error}</div>}
              <div className="pin-pad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <button key={n} className="pin-key" onClick={() => pressPin(String(n))} aria-label={`Digit ${n}`}>{n}</button>
                ))}
                <div aria-hidden="true" />
                <button className="pin-key" onClick={() => pressPin("0")} aria-label="Digit 0">0</button>
                <button className="pin-key" onClick={() => setPin(pin.slice(0, -1))} aria-label="Backspace">⌫</button>
              </div>
              {!settingPin && <div className="demo-hint" style={{ marginTop: 20 }}>Demo PIN: <b>{user.pin}</b></div>}
            </>
          )}

          {mode === "password" && (
            <div style={{ width: "100%", maxWidth: 280 }}>
              <Field label="Account password" error={error}>
                <TextInput type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} />
              </Field>
              <Button style={{ width: "100%" }} onClick={checkPassword}>Unlock</Button>
            </div>
          )}

          {mode === "bio" && (
            <>
              <div className={`bio-circle ${scanning ? "scanning" : ""}`}>{Icon.fingerprint}</div>
              <p className="lock-help">{scanning ? "Scanning…" : "Use your fingerprint or Face ID where supported"}</p>
              <Button onClick={scan} loading={scanning}>Scan to Unlock</Button>
            </>
          )}
        </div>
      </GlassCard>
    </>
  );
}
