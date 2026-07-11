import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../../icons";

const ITEMS = [
  { to: "/dashboard", label: "Home", icon: Icon.home, end: true },
  { to: "/dashboard/companion", label: "Chat", icon: Icon.chat },
  { to: "/dashboard/mood", label: "Mood", icon: Icon.mood },
  { to: "/dashboard/journal", label: "Journal", icon: Icon.book },
  { to: "/dashboard/settings", label: "You", icon: Icon.gear },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `bn-item ${isActive ? "active" : ""}`}>
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
