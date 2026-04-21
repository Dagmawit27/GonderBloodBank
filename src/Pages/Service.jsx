import { useState } from "react";
import "./service.css";

const services = [
  {
    icon: "🩸",
    title: "Blood Donation Drives",
    desc: "Organized community drives across Gondar to maintain a steady, life-saving blood supply.",
  },
  {
    icon: "🔬",
    title: "Blood Testing & Screening",
    desc: "Rigorous lab screening for every donation to ensure safe, transfusion-ready blood.",
  },
  {
    icon: "🚑",
    title: "Emergency Blood Supply",
    desc: "24/7 emergency dispatch to hospitals and clinics whenever critical units are needed.",
  },
  {
    icon: "🚐",
    title: "Mobile Donation Units",
    desc: "On-site collection vans bringing donation services to schools, offices, and communities.",
  },
  {
    icon: "🧾",
    title: "Donor Registration & Tracking",
    desc: "Simple registration with a personal donor profile to track history and eligibility.",
  },
  {
    icon: "📚",
    title: "Awareness & Education",
    desc: "Workshops and campaigns that teach the value of donation and a healthy donor lifestyle.",
  },
];

const highlights = [
  { label: "Safe", value: "100%" },
  { label: "Certified", value: "MoH" },
  { label: "Response", value: "24/7" },
  { label: "Volunteers", value: "500+" },
];

export default function Service() {
 
  return (
    <div className="gbb-page">
      {/* HERO */}
      <section className="pr-hero">
        <div className="lrn-hero-glow" aria-hidden="true" />
        <div className="pr-container pr-hero-inner">
          <div className="badge fade-in">
            <span className="dot"></span>
            <span className="badge-text">OUR SERVICES</span>
          </div>
          <h1 className="pr-h1">
            Services that keep <span className="pr-accent">Gondar's</span> hospitals supplied
          </h1>
          <p className="pr-lead">
            From scheduled donation drives to round-the-clock emergency dispatch, we
            connect generous donors with the patients who need them most — safely,
            quickly, and with care.
          </p>
          <div className="pr-hero-actions">
            <a href="#" className="pr-btn pr-btn-primary">Donate Blood</a>
            <a href="#services" className="pr-btn pr-btn-ghost">Learn More →</a>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="services" className="gbb-section">
        <div className="gbb-container">
          <div className="gbb-section-head">
            <h2 className="gbb-h2">What we offer</h2>
            <p className="gbb-section-sub">
              Six core services that power blood supply across the Gondar region.
            </p>
          </div>

          <div className="gbb-grid">
            {services.map((s) => (
              <article key={s.title} className="gbb-card">
                <div className="gbb-card-icon">{s.icon}</div>
                <h3 className="gbb-card-title">{s.title}</h3>
                <p className="gbb-card-desc">{s.desc}</p>
                <a href="#" className="gbb-card-link">Learn more →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="gbb-strip">
        <div className="gbb-container gbb-strip-inner">
          {highlights.map((h) => (
            <div key={h.label} className="gbb-stat">
              <div className="gbb-stat-value">{h.value}</div>
              <div className="gbb-stat-label">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="gbb-section">
        <div className="gbb-container">
          <div className="gbb-cta">
            <div>
              <h2 className="gbb-cta-title">Ready to save a life?</h2>
              <p className="gbb-cta-sub">
                One donation can save up to three lives. Book your appointment today.
              </p>
            </div>
            <a href="#" className="gbb-btn gbb-btn-white">Donate Now</a>
          </div>
        </div>
      </section>

    </div>
  );
}