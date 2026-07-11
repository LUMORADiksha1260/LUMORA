import React, { useState } from "react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { Icon } from "../icons";
import { COUNSELORS, mockApi } from "../services/mockApi";
import { useToast } from "../context/ToastContext";

export default function CounselorsPage() {
  const { pushToast } = useToast();
  const [booking, setBooking] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const confirmBooking = async () => {
    setConfirming(true);
    await mockApi.bookCounselor(booking.id);
    setConfirming(false);
    pushToast(`Session requested with ${booking.name}.`, "success");
    setBooking(null);
  };

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Human Counselors</span>
        <h2>When you're ready for a person, not just an AI.</h2>
        <p>Licensed therapists and counselors, available by video, audio, or chat.</p>
      </div>
      <div className="counselor-grid">
        {COUNSELORS.map((c) => (
          <GlassCard key={c.id} className="counselor-card">
            <div className="counselor-avatar"><img src={c.photo} alt={c.name} /></div>
            <h4>{c.name}</h4>
            <div className="counselor-role">{c.role}</div>
            <div className="stars">★★★★★ <span style={{ color: "var(--ink-soft)", fontSize: ".78rem" }}>{c.rating} ({c.reviews})</span></div>
            <div className="modality-row">
              <div className="m-icon">{Icon.video}</div>
              <div className="m-icon">{Icon.phone}</div>
              <div className="m-icon">{Icon.chat}</div>
            </div>
            <Button onClick={() => setBooking(c)}>Book a Session</Button>
          </GlassCard>
        ))}
      </div>

      <Modal open={!!booking} onClose={() => setBooking(null)} title={`Book with ${booking?.name || ""}`}>
        <p style={{ color: "var(--ink-soft)", fontSize: ".9rem", lineHeight: 1.6, marginBottom: 20 }}>
          Requesting a session sends {booking?.name} your availability. They'll confirm a time within a day.
        </p>
        <Button style={{ width: "100%" }} onClick={confirmBooking} loading={confirming}>Request Session</Button>
      </Modal>
    </>
  );
}
