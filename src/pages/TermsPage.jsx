import React from "react";
import GlassCard from "../components/ui/GlassCard";

const SECTIONS = [
  { h: "Not a medical device", p: "Lumora's AI companion offers emotional support and self-reflection tools. It does not diagnose, treat, or replace licensed medical or mental health care." },
  { h: "Emergencies", p: "Lumora is not equipped to respond to emergencies. If you are in crisis, contact your local emergency number or a crisis helpline immediately." },
  { h: "Subscriptions", p: "Premium plans renew automatically until cancelled. You can cancel anytime from Settings; access continues until the end of the current billing period." },
  { h: "Counselor sessions", p: "Sessions booked through Lumora are provided by independently licensed professionals. Lumora facilitates booking and payment but is not the treating provider." },
  { h: "Acceptable use", p: "Community spaces are moderated. Harassment, hate speech, or sharing others' private information will result in removal from the platform." },
];

export default function TermsPage() {
  return (
    <section className="legal-page">
      <div className="wrap">
        <span className="eyebrow">Legal</span>
        <h1>Terms of Service</h1>
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
