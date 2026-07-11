import React, { useState } from "react";
import { Link } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import AuroraBackground from "../components/layout/AuroraBackground";
import { Icon } from "../icons";

function useReveal() {
  // simple intersection-observer based reveal, self-contained per section
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

export default function LandingPage() {
  return (
    <>
      <section className="hero">
        <AuroraBackground variant="hero" />
        <video autoPlay muted loop playsInline id="hero-video" onError={(e) => (e.target.style.display = "none")}>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-woods-32858-large.mp4" type="video/mp4" />
        </video>
        <div className="hero-grid">
          <div>
            <span className="eyebrow">AI-Powered Mental Wellness</span>
            <h1>Your safe space<br />for <em>healing.</em></h1>
            <p>Lumora listens without judgment, remembers what matters to you, and gently helps you understand your own mind — one conversation, one breath at a time.</p>
            <div className="btn-group">
              <Link to="/signup"><Button glow>Start Healing — Free</Button></Link>
              <a href="#companion"><Button variant="secondary">See how it works</Button></a>
            </div>
          </div>
          <Reveal className="hero-visual">
            <div className="ring r1" /><div className="ring r2" />
            <div className="orb-large" />
            <div className="breath-label"><span className="breath-orb" style={{ width: 8, height: 8 }} />Breathe in… breathe out</div>
          </Reveal>
        </div>
      </section>

      <section className="companion" id="companion">
        <div className="wrap companion-grid">
          <Reveal>
            <span className="eyebrow">AI Emotional Companion</span>
            <h2>Someone to talk to,<br />at 2am or 2pm.</h2>
            <p className="lead">Lumora's companion is trained to hold space, not fix you. It asks before it advises, and it remembers your patterns so every conversation builds on the last.</p>
            <ul className="feature-list">
              <li><span className="dot" />Understands tone and context, not just keywords</li>
              <li><span className="dot" />Recognises signs of distress and responds with care</li>
              <li><span className="dot" />Available by text or voice, any hour of the day</li>
              <li><span className="dot" />Private by default — never sold or shared</li>
            </ul>
          </Reveal>
          <Reveal>
            <GlassCard glow className="chat-mock">
              <div className="bubble ai">I noticed you mentioned work has felt heavier this week. Want to talk about what's making it feel that way?</div>
              <div className="bubble user">Yeah… I think I've just been avoiding rest.</div>
              <div className="bubble ai">That takes honesty to notice. What would twenty minutes of real rest look like today?</div>
              <div className="typing-dots"><span /><span /><span /></div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="safespace">
        <div className="wrap safespace-grid">
          <Reveal>
            <GlassCard glow className="lock-mock">
              <div className="lock-icon">{Icon.lock}</div>
              <div className="pin-display">{[1,1,1,0].map((f,i)=><div key={i} className={`pin-dot ${f?"filled":""}`}/>)}</div>
              <div className="biometric-row">
                <div className="b-icon">{Icon.fingerprint}</div>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal>
            <span className="eyebrow">Safe Space</span>
            <h2>A locked room, just for you.</h2>
            <p className="lead">Your journal, mood history, and hardest conversations live behind a second lock — PIN, password, fingerprint, or Face ID where supported.</p>
            <ul className="feature-list">
              <li><span className="dot" />Separate lock from your main account login</li>
              <li><span className="dot" />End-to-end encrypted entries</li>
              <li><span className="dot" />Auto-locks after a few idle minutes</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="meditation">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Guided Meditation &amp; Nature</span>
            <h2>Step into a quieter place.</h2>
            <p>Real HD nature footage paired with guided breathing — no illustrations, no fake loops.</p>
          </Reveal>
          <div className="universe-grid">
            {["Waterfall","Forest","Himalayan Peaks","Rain Cabin","Ocean Beach","Snow Valley","Night Sky","Temple Garden"].map((name,i)=>(
              <Reveal key={name}><div className="universe-card">
                <div className="universe-info"><h4>{name}</h4><p>{10+i*2} min</p></div>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="premium">
        <div className="wrap">
          <Reveal className="section-head center"><span className="eyebrow">Premium</span><h2>Go deeper, whenever you're ready.</h2></Reveal>
          <div className="plans-grid">
            <Reveal><GlassCard style={{padding:32}}>
              <h3>Free</h3><div className="plan-price">$0</div>
              <ul className="plan-list"><li>{Icon.check} 5 AI conversations / day</li><li>{Icon.check} Basic mood tracker</li><li>{Icon.check} 3 meditations / week</li></ul>
              <Link to="/signup"><Button variant="secondary" style={{width:"100%"}}>Start Free</Button></Link>
            </GlassCard></Reveal>
            <Reveal><GlassCard glow style={{padding:32, border:"1px solid var(--lavender-deep)"}}>
              <span className="plan-badge">Most Loved</span>
              <h3>Premium</h3><div className="plan-price">$12<span>/mo</span></div>
              <ul className="plan-list"><li>{Icon.check} Unlimited AI companion</li><li>{Icon.check} Full meditation library</li><li>{Icon.check} Advanced mood analytics</li><li>{Icon.check} Counselor discounts</li></ul>
              <Link to="/signup"><Button glow style={{width:"100%"}}>Go Premium</Button></Link>
            </GlassCard></Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap crisis-note-wrap">
          <GlassCard className="crisis-note">
            <strong>If you're in crisis or thinking about harming yourself,</strong> please contact your local emergency number or a crisis helpline right away. Lumora's AI companion is not equipped to handle emergencies.
          </GlassCard>
        </div>
      </section>
    </>
  );
}
