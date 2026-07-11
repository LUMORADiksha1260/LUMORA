import { useState, useCallback, useEffect } from "react";

/**
 * Reads text aloud using the browser's built-in SpeechSynthesis API.
 * No backend or external TTS service required.
 */
export function useSpeechOutput() {
  const [speakingText, setSpeakingText] = useState(null);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    return () => { if (supported) window.speechSynthesis.cancel(); };
  }, [supported]);

  const speak = useCallback((text) => {
    if (!supported) return;
    if (speakingText === text) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.98;
    utterance.pitch = 1.02;
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);
    setSpeakingText(text);
    window.speechSynthesis.speak(utterance);
  }, [supported, speakingText]);

  return { speak, speakingText, supported };
}
