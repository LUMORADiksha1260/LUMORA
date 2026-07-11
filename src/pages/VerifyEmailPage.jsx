import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { Icon } from "../icons";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { mockApi } from "../services/mockApi";
import AuroraBackground from "../components/layout/AuroraBackground";

export default function VerifyEmailPage() {
  const { state } = useLocation();
  const email = state?.email;
  const { verifyEmail } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [currentCode, setCurrentCode] = useState(state?.devCode);
  const refs = useRef([]);

  useEffect(() => {
    if (!email) navigate("/signup", { replace: true });
  }, [email, navigate]);

  if (!email) return null;

  const setDigit = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };
  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const submit = async (e) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) { setError("Enter all 6 digits."); return; }
    setLoading(true);
    try {
      await verifyEmail(email, code);
      pushToast("Email verified — welcome to Lumora.", "success");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setResending(true);
    const res = await mockApi.resendCode(email);
    setCurrentCode(res.code);
    pushToast("New code sent.", "success");
    setResending(false);
  };

  return (
    <div className="auth-shell">
      <AuroraBackground variant="auth" />
      <GlassCard glow className="auth-card">
        <div className="auth-logo">{Icon.logoOrb}<span>Lumora</span></div>
        <h1 className="auth-title">Verify your email</h1>
        <p className="auth-sub">Enter the 6-digit code sent to <b>{email}</b>.</p>
        <form onSubmit={submit}>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "22px 0" }}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (refs.current[i] = el)}
                className="lb-input otp-input"
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                maxLength={1}
                inputMode="numeric"
              />
            ))}
          </div>
          {error && <div className="field-error" style={{ textAlign: "center", marginBottom: 14 }}>{error}</div>}
          <Button type="submit" style={{ width: "100%" }} loading={loading} glow>Verify Email</Button>
        </form>
        <p className="auth-foot">Didn't get it? <button type="button" className="link-btn" onClick={resend} disabled={resending}>{resending ? "Resending…" : "Resend code"}</button></p>
        {currentCode && <div className="demo-hint">Demo mode — no real email is sent. Your code is <b>{currentCode}</b>.</div>}
      </GlassCard>
    </div>
  );
}
