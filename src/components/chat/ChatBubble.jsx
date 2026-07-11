import React from "react";
import { Icon } from "../../icons";

export default function ChatBubble({ from, text, onSpeak, speaking }) {
  return (
    <div className={`bubble ${from}`}>
      {text}
      {from === "ai" && onSpeak && (
        <button className="bubble-speak" onClick={() => onSpeak(text)} aria-label="Read aloud">
          <span className={speaking ? "speak-wave active" : "speak-wave"}>{Icon.volume}</span>
        </button>
      )}
    </div>
  );
}
