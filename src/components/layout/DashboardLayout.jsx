import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar, { MobileDrawer } from "./Sidebar";
import DashboardTopbar from "./DashboardTopbar";
import BottomNav from "./BottomNav";
import AuroraBackground from "./AuroraBackground";
import PageTransition from "./PageTransition";

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="db-shell">
      <a href="#dashboard-main" className="skip-link">Skip to content</a>
      <AuroraBackground variant="subtle" />
      <DashboardTopbar onMenuClick={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Sidebar />
      <main className="db-main" id="dashboard-main">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <BottomNav />
    </div>
  );
}
