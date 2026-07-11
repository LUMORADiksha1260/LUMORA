import React, { useState, useEffect } from "react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { TextArea } from "../components/ui/Input";
import { JournalEntry, GratitudeEntry } from "../components/journal/JournalEntry";
import GratitudeRow from "../components/journal/GratitudeRow";
import { EmptyState } from "../components/ui/EmptyState";
import { Icon } from "../icons";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { mockApi } from "../services/mockApi";

function DailyTab({ userId, pushToast }) {
  const [draft, setDraft] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getJournalEntries(userId, "daily").then((e) => { setEntries(e); setLoading(false); });
  }, [userId]);

  const save = async () => {
    if (!draft.trim()) return;
    const entry = await mockApi.saveJournalEntry(userId, "daily", draft.trim());
    setEntries([entry, ...entries]);
    setDraft("");
    pushToast("Journal entry saved.", "success");
  };

  return (
    <>
      <GlassCard glow style={{ padding: 26, marginBottom: 24 }}>
        <TextArea rows={5} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="What's on your mind today?" />
        <Button style={{ marginTop: 14 }} onClick={save}>Save Entry</Button>
      </GlassCard>
      {loading ? null : entries.length ? (
        entries.map((e) => <JournalEntry key={e.id} date={e.date} text={e.text} />)
      ) : (
        <EmptyState icon={Icon.book} title="No entries yet" description="Your first entry is just a few words away." />
      )}
    </>
  );
}

function GratitudeTab({ userId, pushToast }) {
  const [items, setItems] = useState(["", "", ""]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getGratitudeEntries(userId).then((e) => { setEntries(e); setLoading(false); });
  }, [userId]);

  const setItem = (i, val) => setItems((it) => it.map((x, idx) => (idx === i ? val : x)));

  const save = async () => {
    const filtered = items.filter((i) => i.trim());
    if (!filtered.length) return;
    const entry = await mockApi.saveGratitudeEntry(userId, filtered);
    setEntries([entry, ...entries]);
    setItems(["", "", ""]);
    pushToast("Gratitude saved.", "success");
  };

  return (
    <>
      <GlassCard glow style={{ padding: 26, marginBottom: 24 }}>
        {items.map((val, i) => <GratitudeRow key={i} index={i} value={val} onChange={(v) => setItem(i, v)} />)}
        <Button style={{ marginTop: 8 }} onClick={save}>Save Today's Gratitude</Button>
      </GlassCard>
      {loading ? null : entries.length ? (
        entries.map((e) => <GratitudeEntry key={e.id} date={e.date} items={e.items} />)
      ) : (
        <EmptyState icon={Icon.heart} title="No gratitude logged yet" description="Three small things is all it takes." />
      )}
    </>
  );
}

export default function JournalPage() {
  const { user } = useAuth();
  const { pushToast } = useToast();
  const [tab, setTab] = useState("daily");

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Journal</span>
        <h2>Write it out.</h2>
        <p>Private and encrypted — this page is only ever for you.</p>
      </div>
      <div className="lock-tabs" role="tablist" aria-label="Journal type" style={{ marginBottom: 24 }}>
        <button role="tab" aria-selected={tab === "daily"} className={tab === "daily" ? "active" : ""} onClick={() => setTab("daily")}>Daily Journal</button>
        <button role="tab" aria-selected={tab === "gratitude"} className={tab === "gratitude" ? "active" : ""} onClick={() => setTab("gratitude")}>Gratitude Journal</button>
      </div>
      {tab === "daily" ? <DailyTab userId={user.id} pushToast={pushToast} /> : <GratitudeTab userId={user.id} pushToast={pushToast} />}
    </>
  );
}
