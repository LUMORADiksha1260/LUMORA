import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const LINKS = [
  { to: "/#companion", label: "AI Companion" },
  { to: "/#safespace", label: "Safe Space" },
  { to: "/#meditation", label: "Meditation" },
  { to: "/#premium", label: "Premium" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`public-nav ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="logo">{Icon.logoOrb}<span>Lumora</span></Link>
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.label} href={l.to}>{l.label}</a>
        ))}
      </div>
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === "dark" ? Icon.sun : Icon.moon}
        </button>
        {user ? (
          <button className="nav-cta" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        ) : (
          <button className="nav-cta" onClick={() => navigate("/login")}>Start Healing</button>
        )}
      </div>
    </nav>
  );
}
