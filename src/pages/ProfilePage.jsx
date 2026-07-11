import React, { useState } from "react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { Field, TextInput } from "../components/ui/Input";
import Avatar from "../components/ui/Avatar";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { mockApi } from "../services/mockApi";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { pushToast } = useToast();
  const [name, setName] = useState(user.name);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setErrors({ name: "Name can't be empty." }); return; }
    setErrors({});
    setSaving(true);
    const updated = await mockApi.updateProfile(user.id, { name: name.trim() });
    updateUser(updated);
    setSaving(false);
    pushToast("Profile updated.", "success");
  };

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Profile</span>
        <h2>Your account.</h2>
      </div>
      <GlassCard glow style={{ padding: 32, maxWidth: 520 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 26 }}>
          <Avatar name={name} size={64} color={user.avatarColor} />
          <div>
            <p style={{ fontWeight: 600 }}>{user.email}</p>
            <span style={{ fontSize: ".78rem", color: "var(--ink-soft)" }}>
              {user.provider === "google" ? "Signed in with Google" : "Email account"} · {user.verified ? "Verified" : "Unverified"}
              {user.premium ? " · Premium ✨" : " · Free plan"}
            </span>
          </div>
        </div>
        <form onSubmit={save}>
          <Field label="Full name" error={errors.name}>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email">
            <TextInput value={user.email} disabled />
          </Field>
          <Button type="submit" loading={saving}>Save Changes</Button>
        </form>
      </GlassCard>
    </>
  );
}
