import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../icons";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";

export default function DashboardTopbar({ onMenuClick }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="db-topbar">
      <button className="icon-btn" onClick={onMenuClick} aria-label="Open menu">{Icon.menu}</button>
      <div className="sidebar-logo" style={{ padding: 0 }}>{Icon.logoOrb}<span>Lumora</span></div>
      <button className="icon-btn" onClick={() => navigate("/dashboard/profile")} aria-label="Profile" style={{ background: "transparent" }}>
        <Avatar name={user?.name} size={32} color={user?.avatarColor} />
      </button>
    </div>
  );
}
