import React from "react";

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

export const Icon = {
  logoOrb: (
    <span className="breath-orb" />
  ),
  google: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.66z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.87-3.01c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.29 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.28a12 12 0 0 0 0 10.8z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.6l4.01 3.1C6.23 6.86 8.88 4.75 12 4.75z" />
    </svg>
  ),
  eye: (open) => (
    <svg viewBox="0 0 24 24" width="17" height="17" {...base}>
      {open ? (<><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></>) : (<><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" /><path d="M1 1l22 22" /></>)}
    </svg>
  ),
  check: <svg viewBox="0 0 24 24" width="15" height="15" {...base} strokeWidth={2.2}><path d="M20 6 9 17l-5-5" /></svg>,
  sun: <svg viewBox="0 0 24 24" width="17" height="17" {...base}><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" /></svg>,
  moon: <svg viewBox="0 0 24 24" width="17" height="17" {...base}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>,
  chat: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  lock: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>,
  mood: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>,
  book: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  heart: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>,
  leaf: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M11 20A7 7 0 0 1 4 13a10 10 0 0 1 13-9.5A10 10 0 0 1 11 20z" /><path d="M4 13c4-1 8-2 11-6" /></svg>,
  wind: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M9.5 4.5a2.5 2.5 0 1 1 2 4H2M12.9 19.5a2.5 2.5 0 1 0 2-4H2M17 8a3 3 0 1 1 2.5 4.7H2" /></svg>,
  star: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z" /></svg>,
  gear: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z" /></svg>,
  crown: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="m2 8 5 4 5-9 5 9 5-4-2 12H4z" /></svg>,
  logout: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>,
  fingerprint: <svg viewBox="0 0 24 24" width="22" height="22" {...base} strokeWidth={1.5}><path d="M12 3a9 9 0 0 0-9 9c0 2 .6 3.7 1.7 5.2M12 3a9 9 0 0 1 9 9c0 2-.6 3.7-1.7 5.2M8 21c1-3 1-6 1-9a3 3 0 0 1 6 0c0 3 0 6 1 9M9 21c.6-2 .8-4 .8-6M15 21c-.6-2-.8-4-.8-6" /></svg>,
  play: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>,
  pause: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>,
  menu: <svg viewBox="0 0 24 24" width="20" height="20" {...base} strokeWidth={1.8}><path d="M3 6h18M3 12h18M3 18h18" /></svg>,
  x: <svg viewBox="0 0 24 24" width="18" height="18" {...base} strokeWidth={1.8}><path d="M18 6 6 18M6 6l12 12" /></svg>,
  send: <svg viewBox="0 0 24 24" width="18" height="18" {...base} strokeWidth={2}><path d="m3 3 18 9-18 9V3z" /></svg>,
  mic: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" /></svg>,
  volume: <svg viewBox="0 0 24 24" width="16" height="16" {...base}><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /></svg>,
  bell: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>,
  users: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  video: <svg viewBox="0 0 24 24" width="15" height="15" {...base}><rect x="3" y="6" width="14" height="12" rx="2" /><path d="M21 8l-4 3 4 3z" /></svg>,
  phone: <svg viewBox="0 0 24 24" width="15" height="15" {...base}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.1z" /></svg>,
  help: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1-1.5 1.9v.3" /><path d="M12 17h.01" /></svg>,
  shield: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5z" /></svg>,
  doc: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>,
  home: <svg viewBox="0 0 24 24" width="18" height="18" {...base}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>,
  arrowRight: <svg viewBox="0 0 24 24" width="16" height="16" {...base} strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg>,
  sparkle: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l1.8 5.7L19.5 9l-5.7 1.8L12 16.5l-1.8-5.7L4.5 9l5.7-1.3z" /></svg>,
  alert: <svg viewBox="0 0 24 24" width="30" height="30" {...base}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>,
  inbox: <svg viewBox="0 0 24 24" width="30" height="30" {...base}><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>,
};
