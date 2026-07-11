import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

export default function PublicLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <PageTransition>
        <main id="main-content"><Outlet /></main>
      </PageTransition>
      <Footer />
    </>
  );
}
