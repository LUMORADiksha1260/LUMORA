import React, { useState } from "react";
import { Link } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { Field, TextInput } from "../components/ui/Input";
import { Icon } from "../icons";
import { mockApi } from "../services/mockApi";
import { useToast } from "../context/ToastContext";
import AuroraBackground from "../components/layout/AuroraBackground";

export default function ForgotPasswordPage() {
  const { pushToast } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const res = await mockApi.forgotPassword(email);
    setSent(true);
    pushToast(res.message, "success");
    setLoading(false);
  };

  return (
    <div className="auth-shell">
      <AuroraBackground variant="auth" />
      <GlassCard glow className="auth-card">
        <div className="auth-logo">{Icon.logoOrb}<span>Lumora</span></div>
        {!sent ? (
          <>
            <h1 className="auth-title">Reset your password</h1>
            <p className="auth-sub">We'll send a reset link to your email.</p>
            <form onSubmit={submit}>
              <Field label="Email">
                <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </Field>
              <Button type="submit" style={{ width: "100%" }} loading={loading} glow>Send Reset Link</Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="auth-title">Check your email</h1>
            <p className="auth-sub">If an account exists for <b>{email}</b>, a reset link is on its way.</p>
          </>
        )}
        <p className="auth-foot">Remembered it? <Link to="/login">Back to login</Link></p>
      </GlassCard>
    </div>
  );
}
