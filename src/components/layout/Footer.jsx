import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">{Icon.logoOrb}<span>Lumora</span></div>
            <p>An AI-powered mental wellness platform — your safe space for healing.</p>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <a href="/#companion">AI Companion</a>
            <a href="/#safespace">Safe Space</a>
            <a href="/#meditation">Meditation</a>
            <a href="/#premium">Premium</a>
          </div>
          <div className="footer-col">
            <h5>Support</h5>
            <Link to="/help">Help Center</Link>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Lumora. All rights reserved.</span>
          <span>Not a substitute for emergency or crisis care.</span>
        </div>
      </div>
    </footer>
  );
}
