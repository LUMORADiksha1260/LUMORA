import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { Field, TextInput } from "../components/ui/Input";
import { Icon } from "../icons";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import AuroraBackground from "../components/layout/AuroraBackground";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name) errs.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (form.password.length < 6) errs.password = "At least 6 characters.";
    if (form.confirm !== form.password) errs.confirm = "Passwords don't match.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const { code } = await signUp(form);
      pushToast("Account created — verify your email to continue.", "success");
      navigate("/verify-email", { state: { email: form.email, devCode: code } });
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <AuroraBackground variant="auth" />
      <GlassCard glow className="auth-card">
        <div className="auth-logo">{Icon.logoOrb}<span>Lumora</span></div>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Free to start. No credit card needed.</p>

        <form onSubmit={submit}>
          <Field label="Full name" error={errors.name}>
            <TextInput value={form.name} onChange={set("name")} placeholder="Your name" />
          </Field>
          <Field label="Email" error={errors.email}>
            <TextInput type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
          </Field>
          <Field label="Password" error={errors.password}>
            <TextInput
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={set("password")}
              placeholder="At least 6 characters"
              right={<span onClick={() => setShowPw((s) => !s)}>{Icon.eye(showPw)}</span>}
            />
          </Field>
          <Field label="Confirm password" error={errors.confirm}>
            <TextInput type={showPw ? "text" : "password"} value={form.confirm} onChange={set("confirm")} placeholder="Repeat password" />
          </Field>
          {errors.form && <div className="field-error" style={{ marginBottom: 14 }}>{errors.form}</div>}
          <Button type="submit" style={{ width: "100%" }} loading={loading} glow>Create Account</Button>
        </form>

        <p className="auth-foot" style={{ marginTop: 22 }}>Already have an account? <Link to="/login">Log in</Link></p>
      </GlassCard>
    </div>
  );
}
