import React, { useState, useRef, useEffect } from "react";
import GlassCard from "../components/ui/GlassCard";
import { TextInput } from "../components/ui/Input";
import ChatBubble from "../components/chat/ChatBubble";
import TypingIndicator from "../components/chat/TypingIndicator";
import VoiceButton from "../components/chat/VoiceButton";
import { useSpeechOutput } from "../components/chat/useSpeechOutput";
import { Icon } from "../icons";
import { useToast } from "../context/ToastContext";

function replyFor(text) {
  const t = text.toLowerCase();
  if (/(tired|exhaust|burn ?out|drained)/.test(t)) return "That sounds heavy to carry. What's one small thing that would make tonight feel more restful?";
  if (/(anx|worry|nervous|panic)/.test(t)) return "Anxiety can be so loud. Let's slow down for a second — what does it feel like in your body right now?";
  if (/(sad|down|low|depress)/.test(t)) return "I'm glad you told me. You don't have to explain it perfectly — just being honest here is enough for now.";
  if (/(happy|good|great|excited)/.test(t)) return "I love hearing that. What made today feel that way?";
  if (/(angry|frustrat|mad)/.test(t)) return "That frustration makes sense. What do you think is underneath it?";
  if (/(lonely|alone|isolat)/.test(t)) return "Loneliness is hard to sit with. I'm here right now — what's on your mind?";
  return "Thank you for sharing that with me. Can you tell me a little more about how that's been sitting with you?";
}

export default function AICompanionPage() {
  const { pushToast } = useToast();
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi, I'm glad you're here. How are you feeling right now?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const { speak, speakingText, supported: voiceSupported } = useSpeechOutput();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    // TODO: replace this block with a real call to your LLM backend, e.g.:
    // const reply = await fetch('/api/companion/reply', { method: 'POST', body: JSON.stringify({ text }) });
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "ai", text: replyFor(text) }]);
    }, 1000 + Math.random() * 500);
  };

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">AI Emotional Companion</span>
        <h2>Talk it through.</h2>
        <p>A private, judgment-free space to think out loud.{voiceSupported ? " Speak or type — whichever feels easier." : ""}</p>
      </div>
      <GlassCard glow className="chat-shell">
        <div className="chat-scroll" ref={scrollRef} aria-live="polite" aria-label="Conversation with Lumora AI companion">
          {messages.map((m, i) => (
            <ChatBubble key={i} from={m.from} text={m.text} onSpeak={m.from === "ai" ? speak : null} speaking={speakingText === m.text} />
          ))}
          {typing && <TypingIndicator />}
        </div>
        <form className="chat-input-row" onSubmit={send}>
          <VoiceButton onResult={(t) => setInput(t)} pushToast={pushToast} />
          <TextInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="Share what's on your mind…" aria-label="Message to Lumora AI companion" />
          <button type="submit" className="send-round" aria-label="Send">{Icon.send}</button>
        </form>
      </GlassCard>
    </>
  );
}
