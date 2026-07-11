import React, { useState, useEffect } from "react";
import GlassCard from "../components/ui/GlassCard";
import { EmptyState } from "../components/ui/EmptyState";
import { Icon } from "../icons";
import { mockApi } from "../services/mockApi";

const TYPE_ICON = { mood: Icon.mood, community: Icon.heart, counselor: Icon.users, system: Icon.bell };

export default function NotificationsPage() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getNotifications().then((n) => { setItems(n); setLoading(false); });
  }, []);

  const markAllRead = () => setItems((its) => its.map((i) => ({ ...i, read: true })));

  return (
    <>
      <div className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <div>
          <span className="eyebrow">Notifications</span>
          <h2>Stay in the loop.</h2>
        </div>
        {items?.some((i) => !i.read) && (
          <button className="lb-btn lb-btn-ghost" onClick={markAllRead}>Mark all as read</button>
        )}
      </div>

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1, 2, 3].map((i) => <div key={i} className="skeleton-row" />)}
        </div>
      )}

      {!loading && items && items.length === 0 && (
        <EmptyState icon={Icon.bell} title="You're all caught up" description="Nothing new right now." />
      )}

      {!loading && items && items.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((n) => (
            <GlassCard key={n.id} className={`notif-row ${!n.read ? "unread" : ""}`}>
              <div className="med-icon">{TYPE_ICON[n.type] || Icon.bell}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: ".92rem", fontWeight: 600 }}>{n.title}</h4>
                <p style={{ fontSize: ".82rem", color: "var(--ink-soft)", marginTop: 2 }}>{n.body}</p>
              </div>
              <span style={{ fontSize: ".72rem", color: "var(--ink-soft)", whiteSpace: "nowrap" }}>{n.time}</span>
            </GlassCard>
          ))}
        </div>
      )}
    </>
  );
}
