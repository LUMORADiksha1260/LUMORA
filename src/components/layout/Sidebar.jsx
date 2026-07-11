import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../../icons";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";

export const NAV_ITEMS = [
  { to: "/dashboard", label: "Home", icon: Icon.home, end: true },
  { to: "/dashboard/companion", label: "AI Companion", icon: Icon.chat },
  { to: "/dashboard/safe-space", label: "Safe Space", icon: Icon.lock },
  { to: "/dashboard/mood", label: "Mood Tracker", icon: Icon.mood },
  { to: "/dashboard/journal", label: "Journal", icon: Icon.book },
  { to: "/dashboard/meditation", label: "Meditation", icon: Icon.leaf },
  { to: "/dashboard/nature", label: "Nature Library", icon: Icon.wind },
  { to: "/dashboard/counselors", label: "Counselors", icon: Icon.users },
  { to: "/dashboard/community", label: "Community", icon: Icon.heart },
  { to: "/dashboard/premium", label: "Premium", icon: Icon.crown },
];

function SidebarLinks({ onNavigate }) {
  const { user } = useAuth();
  return (
    <>
      <div className="sidebar-logo">{Icon.logoOrb}<span>Lumora</span></div>
      <nav className="nav-scroll" aria-label="Dashboard navigation">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            onClick={onNavigate}
          >
            {item.icon}{item.label}
          </NavLink>
        ))}
        <div className="nav-divider" />
        <NavLink to="/dashboard/settings" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onNavigate}>{Icon.gear}Settings</NavLink>
        <NavLink to="/dashboard/notifications" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onNavigate}>{Icon.bell}Notifications</NavLink>
        <NavLink to="/dashboard/help" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} onClick={onNavigate}>{Icon.help}Help Center</NavLink>
      </nav>
      <NavLink to="/dashboard/profile" className="sidebar-user" onClick={onNavigate}>
        <Avatar name={user?.name} color={user?.avatarColor} />
        <div className="info">
          <p>{user?.name}{user?.premium && " ✨"}</p>
          <span>{user?.email}</span>
        </div>
      </NavLink>
    </>
  );
}

export default function Sidebar() {
  return <aside className="sidebar" aria-label="Dashboard sidebar"><SidebarLinks /></aside>;
}

export function MobileDrawer({ open, onClose }) {
  return (
    <div className={`mobile-drawer ${open ? "open" : ""}`}>
      <div className="scrim" onClick={onClose} />
      <div className="panel">
        <div className="sidebar" style={{ height: "100%" }}>
          <SidebarLinks onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
