import React from "react";
import GlassCard from "../components/ui/GlassCard";

const SECTIONS = [
  { h: "What we collect", p: "Account details (name, email), content you create (journal entries, mood logs, chat messages), and basic usage data to keep the app working smoothly." },
  { h: "How Safe Space content is handled", p: "Entries inside Safe Space are encrypted and are never used to train AI models or shown to other users, employees, or advertisers." },
  { h: "What we never do", p: "We never sell personal data to third parties, and we never share journal or chat content with advertisers." },
  { h: "Your controls", p: "You can export or delete your data at any time from Settings. Deleting your account removes your journal, mood history, and Safe Space content permanently." },
  { h: "Human counselors", p: "If you book a session, relevant context you choose to share is visible only to that counselor, under their own professional confidentiality obligations." },
];

export default function PrivacyPage() {
  return (
    <section className="legal-page">
      <div className="wrap">
        <span className="eyebrow">Legal</span>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated July 2026 — this is a demo policy for a prototype product.</p>
        {SECTIONS.map((s) => (
          <GlassCard key={s.h} className="legal-block">
            <h3>{s.h}</h3>
            <p>{s.p}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
