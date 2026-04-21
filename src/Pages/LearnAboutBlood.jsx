import { useEffect, useState } from "react";
import "./Learn.css";
import "./Process.css";
import { HashLink } from "react-router-hash-link";

const sections = [
  { id: "how-to-donate", label: "How to Donate" },
  { id: "eligibility", label: "Eligibility" },
  { id: "types-of-donations", label: "Types of Donations" },
  { id: "about-blood", label: "About Blood" },
  { id: "impact", label: "How It Helps" },
  { id: "comments", label: "Comments & Concerns" },
];

const steps = [
  {
    n: "01",
    title: "Register",
    desc: "Create a donor profile online or at the center. Bring a valid ID on the day of donation.",
  },
  {
    n: "02",
    title: "Health Screening",
    desc: "A quick mini-physical: blood pressure, pulse, temperature, and hemoglobin level.",
  },
  {
    n: "03",
    title: "The Donation",
    desc: "The actual donation takes only 8–10 minutes. You'll be seated comfortably the whole time.",
  },
  {
    n: "04",
    title: "Rest & Refresh",
    desc: "Enjoy snacks and juice for 15 minutes. Then go back to your day knowing you saved lives.",
  },
];

const eligibility = {
  yes: [
    "Aged 17–65 years",
    "Weigh at least 50 kg (110 lbs)",
    "Feeling well and healthy",
    "Hemoglobin ≥ 12.5 g/dL",
    "Not donated whole blood in last 56 days",
  ],
  no: [
    "Active infection, cold, or fever",
    "Pregnant or recently gave birth",
    "Recent tattoo or piercing (< 6 months)",
    "Certain chronic conditions or medications",
    "Travel to malaria-endemic areas recently",
  ],
};

const donationTypes = [
  {
    icon: "🩸",
    name: "Whole Blood",
    time: "8–10 min",
    freq: "Every 56 days",
    desc: "The most common donation. One pint can be separated into red cells, plasma, and platelets.",
  },
  {
    icon: "🟡",
    name: "Plasma",
    time: "45 min",
    freq: "Every 28 days",
    desc: "Plasma is used for trauma patients, burn victims, and people with clotting disorders.",
  },
  {
    icon: "🟣",
    name: "Platelets",
    time: "2 hours",
    freq: "Every 7 days",
    desc: "Critical for cancer patients, organ transplant recipients, and surgery support.",
  },
  {
    icon: "🔴",
    name: "Double Red Cells",
    time: "30 min",
    freq: "Every 112 days",
    desc: "Two units of red cells in one visit. Especially needed for trauma and surgery.",
  },
];

const bloodTypes = [
  { type: "O−", tag: "Universal Donor", note: "Can give red cells to anyone", color: "#e11d2e" },
  { type: "O+", tag: "Most Common", note: "~38% of population", color: "#ef4444" },
  { type: "A+", tag: "Common", note: "~34% of population", color: "#f97316" },
  { type: "A−", tag: "Rare", note: "~6% of population", color: "#fb923c" },
  { type: "B+", tag: "Uncommon", note: "~9% of population", color: "#8b5cf6" },
  { type: "B−", tag: "Rare", note: "~2% of population", color: "#a78bfa" },
  { type: "AB+", tag: "Universal Plasma", note: "~3% of population", color: "#3b82f6" },
  { type: "AB−", tag: "Rarest", note: "~1% of population", color: "#0b1b2b" },
];

const impact = [
  { num: "1", label: "Donation", desc: "from one healthy donor" },
  { num: "3", label: "Lives Saved", desc: "red cells, plasma & platelets" },
  { num: "≈10 min", label: "Of Your Time", desc: "to make it happen" },
];

const helps = [
  { icon: "🚑", title: "Trauma & Accidents", desc: "Car-accident victims may need up to 100 units of blood." },
  { icon: "🎗️", title: "Cancer Patients", desc: "Many require platelet transfusions during treatment." },
  { icon: "🤰", title: "Childbirth", desc: "Mothers facing complications often need urgent transfusions." },
  { icon: "🩺", title: "Surgery", desc: "Major operations rely on a steady supply of safe blood." },
];

export default function LearnAboutBlood() {
  const [active, setActive] = useState("how-to-donate");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      {
        rootMargin: "-50% 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);



  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="lrn-page pr-page">
     

      {/* HERO */}
      <section className="pr-hero">
        <div className="pr-container pr-hero-inner">
          <div className="badge fade-in">
            <span className="dot"></span>
            <span className="badge-text">LEARN</span>
          </div>
          <h1 className="pr-h1">
            Everything you need to know about <span className="pr-accent">donating blood</span>
          </h1>
          <p className="pr-lead">
            From the donation process to eligibility, blood types, and the lives you'll change —
            here's the full picture in one place.
          </p>
          <div className="pr-hero-actions">
            <a href="#how-to-donate" className="pr-btn pr-btn-primary">Start Reading</a>
            <a href="#impact" className="pr-btn pr-btn-ghost">See the Impact →</a>
          </div>
        </div>
      </section>

      {/* SECTION TABS */}

      
      <div className="pr-tabs-wrap">
        <div className="pr-container">
          <div className="pr-tabs">
            {sections.map((s) => (
              <HashLink
                key={s.id}
                smooth
                to={`/learn-about-blood#${s.id}`}
                className={`pr-tab ${active === s.id ? "active" : ""}`}
                onClick={() => setActive(s.id)}
              >
                {s.label}
              </HashLink>
            ))}
          </div>
        </div>
      </div>

      {/* 1. HOW TO DONATE */}
      <section id="how-to-donate" className="pr-section">
        <div className="pr-container">
          <div className="pr-sec-head">
            <span className="pr-kicker">Step 01</span>
            <h2 className="pr-h2">How to Donate</h2>
            <p className="pr-sec-sub">
              The whole visit takes about an hour. The donation itself? Less than 10 minutes.
            </p>
          </div>

          <ol className="lrn-steps">
            {steps.map((s) => (
              <li key={s.n} className="lrn-step">
                <div className="lrn-step-num">{s.n}</div>
                <h3 className="lrn-step-title">{s.title}</h3>
                <p className="lrn-step-desc">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2. ELIGIBILITY */}
      <section id="eligibility" className="lrn-section lrn-section-alt">
        <div className="lrn-container">
          <div className="lrn-sec-head">
            <span className="lrn-kicker">Step 02</span>
            <h2 className="lrn-h2">Eligibility Requirements</h2>
            <p className="lrn-sec-sub">
              Most healthy adults can donate. Here's a quick check before your visit.
            </p>
          </div>

          <div className="lrn-elig">
            <div className="lrn-elig-card lrn-elig-yes">
              <div className="lrn-elig-head">
                <span className="lrn-check">✓</span>
                <h3>You can likely donate if…</h3>
              </div>
              <ul>
                {eligibility.yes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="lrn-elig-card lrn-elig-no">
              <div className="lrn-elig-head">
                <span className="lrn-cross">✕</span>
                <h3>Please wait if you…</h3>
              </div>
              <ul>
                {eligibility.no.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TYPES */}
      <section id="types-of-donations" className="lrn-section">
        <div className="lrn-container">
          <div className="lrn-sec-head">
            <span className="lrn-kicker">Step 03</span>
            <h2 className="lrn-h2">Types of Blood Donations</h2>
            <p className="lrn-sec-sub">
              Different patients need different parts of your blood. Choose what fits you.
            </p>
          </div>

          <div className="lrn-types">
            {donationTypes.map((t) => (
              <article key={t.name} className="lrn-type-card">
                <div className="lrn-type-icon">{t.icon}</div>
                <h3 className="lrn-type-name">{t.name}</h3>
                <p className="lrn-type-desc">{t.desc}</p>
                <div className="lrn-type-meta">
                  <div>
                    <span className="lrn-meta-label">Time</span>
                    <span className="lrn-meta-val">{t.time}</span>
                  </div>
                  <div>
                    <span className="lrn-meta-label">Frequency</span>
                    <span className="lrn-meta-val">{t.freq}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT BLOOD */}
      <section id="about-blood" className="lrn-section lrn-section-alt">
        <div className="lrn-container">
          <div className="lrn-sec-head">
            <span className="lrn-kicker">Step 04</span>
            <h2 className="lrn-h2">Learn About Blood</h2>
            <p className="lrn-sec-sub">
              There are 8 main blood types. Knowing yours helps the right patient at the right time.
            </p>
          </div>

          <div className="lrn-blood-grid">
            {bloodTypes.map((b) => (
              <div
                key={b.type}
                className="lrn-blood-card"
                style={{ "--bt-color": b.color }}
              >
                <div className="lrn-blood-type">{b.type}</div>
                <div className="lrn-blood-tag">{b.tag}</div>
                <div className="lrn-blood-note">{b.note}</div>
              </div>
            ))}
          </div>

          <div className="lrn-facts">
            <div className="lrn-fact">
              <strong>5 liters</strong>
              <span>average blood in an adult body</span>
            </div>
            <div className="lrn-fact">
              <strong>120 days</strong>
              <span>lifespan of a red blood cell</span>
            </div>
            <div className="lrn-fact">
              <strong>4 components</strong>
              <span>red cells, plasma, platelets, white cells</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IMPACT */}
      <section id="impact" className="lrn-section">
        <div className="lrn-container">
          <div className="lrn-sec-head">
            <span className="lrn-kicker">Step 05</span>
            <h2 className="lrn-h2">How Blood Donations Help</h2>
            <p className="lrn-sec-sub">
              Every donation has a direct, measurable impact on real people in your community.
            </p>
          </div>

          <div className="lrn-impact-row">
            {impact.map((i) => (
              <div key={i.label} className="lrn-impact">
                <div className="lrn-impact-num">{i.num}</div>
                <div className="lrn-impact-label">{i.label}</div>
                <div className="lrn-impact-desc">{i.desc}</div>
              </div>
            ))}
          </div>

          <div className="lrn-helps">
            {helps.map((h) => (
              <div key={h.title} className="lrn-help">
                <div className="lrn-help-icon">{h.icon}</div>
                <div>
                  <h4>{h.title}</h4>
                  <p>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. Comments & Concerns */}
      <section id="comments" className="lrn-section">
        <div className="lrn-container">
          <div className="lrn-sec-head">
            <span className="lrn-kicker">Step 06</span>
            <h2 className="lrn-h2">Comments & Concerns</h2>
            <p className="lrn-sec-sub">
              Have a question or concern? We're here to help.
            </p>
          </div>
          <div className="section-card" style={{marginTop:'2rem'}}>
            <h2>Send Us a Message</h2>
            {sent ? (
              <div className="success-msg">
                ✅ Thank you! We'll get back to you within 1–2 business days.
              </div>
            ) : (
              <form className="concern-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field-group">
                    <label>Full Name</label>
                    <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="field-group">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="field-group">
                  <label>Subject</label>
                  <input name="subject" placeholder="What is this about?" value={form.subject} onChange={handleChange} />
                </div>
                <div className="field-group">
                  <label>Message</label>
                  <textarea name="message" rows={5} placeholder="Describe your concern..." value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="cta-btn">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lrn-section">
        <div className="lrn-container">
          <div className="lrn-cta">
            <div>
              <h2 className="lrn-cta-title">Ready to make a difference?</h2>
              <p className="lrn-cta-sub">
                Now that you know the process, take the next step and book your donation.
              </p>
            </div>
            <a href="#" className="lrn-btn lrn-btn-white">Donate Now</a>
          </div>
        </div>
      </section>

    </div>
  );
}