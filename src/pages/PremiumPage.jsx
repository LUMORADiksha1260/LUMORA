import React, { useState } from "react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { Icon } from "../icons";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { mockApi } from "../services/mockApi";

export default function PremiumPage() {
  const { user, updateUser } = useAuth();
  const { pushToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [payMethod, setPayMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const confirmPay = async () => {
    setProcessing(true);
    const updated = await mockApi.upgradeToPremium(user.id);
    updateUser(updated);
    setProcessing(false);
    setModalOpen(false);
    pushToast("Welcome to Premium ✨", "success");
  };

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Premium</span>
        <h2>{user.premium ? "You're on Premium." : "Go deeper, whenever you're ready."}</h2>
      </div>
      <div className="grid-2">
        <GlassCard style={{ padding: 32 }}>
          <h3 style={{ fontSize: "1.1rem" }}>Free</h3>
          <div className="plan-price">$0</div>
          <ul className="plan-list">
            <li>{Icon.check} 5 AI conversations / day</li>
            <li>{Icon.check} Basic mood tracker</li>
            <li>{Icon.check} 3 meditations / week</li>
          </ul>
        </GlassCard>
        <GlassCard glow style={{ padding: 32, border: "1px solid var(--lavender-deep)" }}>
          <span className="plan-badge">Most Loved</span>
          <h3 style={{ fontSize: "1.1rem" }}>Premium</h3>
          <div className="plan-price">$12<span style={{ fontSize: "1rem", color: "var(--ink-soft)" }}> / mo</span></div>
          <ul className="plan-list">
            <li>{Icon.check} Unlimited AI companion</li>
            <li>{Icon.check} Unlimited journal &amp; gratitude log</li>
            <li>{Icon.check} Full meditation &amp; nature library</li>
            <li>{Icon.check} Advanced mood analytics</li>
            <li>{Icon.check} Counselor session discounts</li>
          </ul>
          {user.premium ? (
            <Button variant="secondary" disabled style={{ width: "100%" }}>{Icon.crown} Active Plan</Button>
          ) : (
            <Button glow style={{ width: "100%" }} onClick={() => setModalOpen(true)}>Upgrade to Premium</Button>
          )}
        </GlassCard>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Choose payment method">
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {["card", "upi", "googlepay", "razorpay", "stripe"].map((m) => (
            <button key={m} onClick={() => setPayMethod(m)} className="pay-method-row"
              style={{ border: `1px solid ${payMethod === m ? "var(--lavender-deep)" : "var(--border)"}`, background: payMethod === m ? "var(--lavender)" : "transparent" }}>
              <span style={{ textTransform: "capitalize" }}>{m === "upi" ? "UPI" : m === "googlepay" ? "Google Pay" : m}</span>
            </button>
          ))}
        </div>
        <Button style={{ width: "100%" }} onClick={confirmPay} loading={processing}>Confirm Mock Payment — $12.00</Button>
        <p style={{ fontSize: ".72rem", color: "var(--ink-soft)", textAlign: "center", marginTop: 12 }}>Demo only — no real charge is made.</p>
      </Modal>
    </>
  );
}
