import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { Field, TextInput } from "../components/ui/Input";
import { Icon } from "../icons";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import AuroraBackground from "../components/layout/AuroraBackground";

export default function LoginPage() {
  const { logIn, googleLogin } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("demo@lumora.app");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!email) errs.email = "Enter your email.";
    if (!password) errs.password = "Enter your password.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const user = await logIn(email, password);
      pushToast(`Welcome back, ${user.name.split(" ")[0]}.`, "success");
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "UNVERIFIED") {
        pushToast("Please verify your email first.", "error");
        navigate("/verify-email", { state: { email: err.email } });
      } else {
        setErrors({ form: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setGoogleLoading(true);
    try {
      const user = await googleLogin();
      pushToast(`Signed in as ${user.name}.`, "success");
      navigate("/dashboard");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <AuroraBackground variant="auth" />
      <GlassCard glow className="auth-card">
        <div className="auth-logo">{Icon.logoOrb}<span>Lumora</span></div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Your safe space missed you.</p>

        <form onSubmit={submit}>
          <Field label="Email" error={errors.email}>
            <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </Field>
          <Field label="Password" error={errors.password}>
            <TextInput
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              right={<span onClick={() => setShowPw((s) => !s)}>{Icon.eye(showPw)}</span>}
            />
          </Field>
          {errors.form && <div className="field-error" style={{ marginBottom: 14 }}>{errors.form}</div>}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18, marginTop: -6 }}>
            <Link className="auth-foot" style={{ marginTop: 0 }} to="/forgot-password">Forgot password?</Link>
          </div>
          <Button type="submit" style={{ width: "100%" }} loading={loading} glow>Log In</Button>
        </form>

        <div className="auth-divider">or continue with</div>
        <Button variant="secondary" style={{ width: "100%" }} onClick={google} loading={googleLoading}>
          {Icon.google} Continue with Google
        </Button>

        <div className="demo-hint">Demo login — email <b>demo@lumora.app</b>, password <b>password123</b>.</div>

        <p className="auth-foot">New to Lumora? <Link to="/signup">Create an account</Link></p>
      </GlassCard>
    </div>
  );
}
