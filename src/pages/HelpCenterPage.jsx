import React, { useState } from "react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { Field, TextInput, TextArea } from "../components/ui/Input";
import { Icon } from "../icons";
import { useToast } from "../context/ToastContext";

const FAQS = [
  { q: "Is Lumora a replacement for therapy?", a: "No. The AI companion is designed to support you between sessions and on ordinary hard days. For diagnosis, crisis care, or ongoing treatment, our licensed human counselors — or your own local provider — are the right path." },
  { q: "Who can read my journal or chats?", a: "Only you. Safe Space content is encrypted and locked behind a separate PIN, password, or biometric check. Lumora never sells or shares personal content with advertisers." },
  { q: "Can I cancel Premium anytime?", a: "Yes, in one tap from Settings. You'll keep Premium access until the end of your current billing period." },
  { q: "Are the counselors licensed?", a: "Every counselor on Lumora is independently verified and licensed in their region before they can appear in search or take bookings." },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <GlassCard className={`faq-item ${open ? "open" : ""}`}>
      <button type="button" className="faq-q" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {q}<span className="faq-icon" aria-hidden="true" />
      </button>
      <div className="faq-a" role="region">{a}</div>
    </GlassCard>
  );
}

export default function HelpCenterPage() {
  const { pushToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name) errs.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Enter a message.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
    pushToast("Message sent — we'll reply within a few hours.", "success");
  };

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Help Center</span>
        <h2>Good to know.</h2>
      </div>
      <div className="faq-list" style={{ marginBottom: 50 }}>
        {FAQS.map((f) => <FaqItem key={f.q} {...f} />)}
      </div>

      <div className="page-head"><h3 style={{ fontSize: "1.2rem" }}>Still need help?</h3></div>
      <GlassCard style={{ padding: 28, maxWidth: 520 }}>
        {sent ? (
          <div className="state-block" style={{ padding: "20px 0" }}>
            <div className="state-icon">{Icon.check}</div>
            <h3>Message sent</h3>
            <p>Our team will reply to {form.email} within a few hours.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <Field label="Name" error={errors.name}><TextInput value={form.name} onChange={set("name")} /></Field>
            <Field label="Email" error={errors.email}><TextInput type="email" value={form.email} onChange={set("email")} /></Field>
            <Field label="Message" error={errors.message}><TextArea rows={4} value={form.message} onChange={set("message")} /></Field>
            <Button type="submit" loading={sending}>Send Message</Button>
          </form>
        )}
      </GlassCard>
    </>
  );
}
