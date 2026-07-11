import React, { useState, useEffect } from "react";
import { Icon } from "../../icons";
import Button from "../ui/Button";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    if (isStandalone) return;

    const onBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    const onInstalled = () => { setVisible(false); setDeferredPrompt(null); };
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!visible || dismissed || !deferredPrompt) return null;

  const install = async () => {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  return (
    <div className="install-banner glass-card" role="dialog" aria-label="Install Lumora">
      <div className="breath-orb" />
      <div className="install-copy">
        <h4>Install Lumora</h4>
        <p>Add it to your home screen for a faster, full-screen experience.</p>
      </div>
      <div className="install-actions">
        <Button onClick={install}>Install</Button>
        <button className="icon-btn" aria-label="Dismiss install prompt" onClick={() => setDismissed(true)}>{Icon.x}</button>
      </div>
    </div>
  );
}
