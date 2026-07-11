import React, { useRef, useState } from "react";
import { Icon } from "../../icons";

const SpeechRecognition = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

/**
 * Real voice input using the browser's SpeechRecognition API where available
 * (Chrome, Edge, Safari 14.1+). Falls back to a disabled state with a tooltip
 * on unsupported browsers rather than faking the interaction.
 */
export default function VoiceButton({ onResult, pushToast }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  if (!SpeechRecognition) {
    return (
      <button type="button" className="voice-btn disabled" title="Voice input isn't supported in this browser" disabled>
        {Icon.mic}
      </button>
    );
  }

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      pushToast?.("Couldn't hear that — check microphone permissions.", "error");
    };
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      onResult(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <button
      type="button"
      className={`voice-btn ${listening ? "listening" : ""}`}
      onClick={toggleListening}
      aria-label={listening ? "Stop recording" : "Speak your message"}
      title={listening ? "Listening… tap to stop" : "Tap to speak"}
    >
      {Icon.mic}
      {listening && <span className="voice-pulse" />}
    </button>
  );
}
