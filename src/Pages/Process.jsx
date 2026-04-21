import { useEffect, useState } from "react";
import "./Process.css";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "overview", label: "Process Overview" },
  { id: "before-during-after", label: "Before, During & After" },
  { id: "what-happens", label: "What Happens to Donated Blood" },
  { id: "iron", label: "Iron & Blood Donation" },
];

const overview = [
  { num: "Step 01", title: "Registration", time: "≈ 10 min" },
  { num: "Step 02", title: "Health History", time: "≈ 15 min" },
  { num: "Step 03", title: "Mini-Physical", time: "≈ 5 min" },
  { num: "Step 04", title: "Donation", time: "≈ 8–10 min" },
  { num: "Step 05", title: "Refreshment", time: "≈ 15 min" },
];

const bda = {
  before: {
    title: "Before Your Donation",
    tag: "Preparation",
    intro:
      "Proper preparation in the 24 hours before your appointment ensures a safe, comfortable experience and a high-quality donation.",
    items: [
      "Maintain a balanced, iron-rich diet in the days leading up to donation.",
      "Drink an additional 500 ml of water in the hours before your appointment.",
      "Avoid fatty foods and alcohol for 24 hours prior to donating.",
      "Get a full night of restful sleep (7–8 hours recommended).",
      "Bring a valid government-issued photo identification document.",
      "Wear clothing with sleeves that can be comfortably rolled above the elbow.",
    ],
  },
  during: {
    title: "During Your Donation",
    tag: "Procedure",
    intro:
      "The donation itself is performed by trained medical professionals using sterile, single-use equipment in a controlled clinical environment.",
    items: [
      "You will be seated in a reclining chair for optimal blood flow and comfort.",
      "The phlebotomist will cleanse the inner-elbow area with antiseptic solution.",
      "A sterile, single-use needle is inserted to begin the collection process.",
      "Approximately 470 ml of whole blood is collected over 8 to 10 minutes.",
      "Your vital signs are monitored continuously throughout the procedure.",
      "Inform staff immediately if you feel light-headed, nauseated, or unwell.",
    ],
  },
  after: {
    title: "After Your Donation",
    tag: "Recovery",
    intro:
      "Brief post-donation rest and a few simple precautions over the next 24 hours allow your body to recover quickly and fully.",
    items: [
      "Remain seated in the refreshment area for at least 15 minutes.",
      "Consume the provided fluids and a light snack before leaving the centre.",
      "Keep the bandage in place for a minimum of four hours.",
      "Avoid heavy lifting or strenuous physical activity for the remainder of the day.",
      "Increase your fluid intake by approximately one litre over the next 24 hours.",
      "Contact the donation centre if you experience prolonged dizziness or bruising.",
    ],
  },
};

const flow = [
  {
    n: "Phase 01",
    title: "Collection",
    desc: "Whole blood is collected into a sterile, anticoagulant-treated bag and labelled with a unique donor identifier.",
  },
  {
    n: "Phase 02",
    title: "Testing",
    desc: "Each unit undergoes mandatory screening for infectious diseases and blood-type confirmation in an accredited laboratory.",
  },
  {
    n: "Phase 03",
    title: "Separation",
    desc: "Units are centrifuged and separated into red cells, plasma, and platelets so each component can serve a specific patient need.",
  },
  {
    n: "Phase 04",
    title: "Distribution",
    desc: "Approved components are stored at controlled temperatures and dispatched to hospitals based on real-time clinical demand.",
  },
];

const components = [
  {
    name: "Red Blood Cells",
    sub: "Erythrocytes",
    storage: "Refrigerated at 1–6 °C",
    shelfLife: "Up to 42 days",
    use: "Trauma, surgery, anaemia, and chronic blood disorders.",
  },
  {
    name: "Plasma",
    sub: "Liquid Component",
    storage: "Frozen at −18 °C or below",
    shelfLife: "Up to 1 year",
    use: "Burn treatment, clotting disorders, and shock management.",
  },
  {
    name: "Platelets",
    sub: "Thrombocytes",
    storage: "Room temperature, agitated",
    shelfLife: "5 days only",
    use: "Cancer therapy, transplants, and major surgical support.",
  },
];

const ironRich = [
  { food: "Lean Beef (100 g)", value: "2.7 mg" },
  { food: "Lentils, cooked (1 cup)", value: "6.6 mg" },
  { food: "Spinach, cooked (1 cup)", value: "6.4 mg" },
  { food: "Tofu, firm (½ cup)", value: "3.4 mg" },
  { food: "Chickpeas (1 cup)", value: "4.7 mg" },
  { food: "Pumpkin seeds (28 g)", value: "2.5 mg" },
];

const ironTips = [
  {
    icon: "C",
    title: "Pair with Vitamin C",
    desc: "Citrus fruits, peppers, and strawberries significantly enhance iron absorption from plant sources.",
  },
  {
    icon: "✕",
    title: "Avoid Inhibitors at Mealtime",
    desc: "Coffee, tea, and high-calcium foods reduce absorption when consumed alongside iron-rich meals.",
  },
  {
    icon: "Fe",
    title: "Consider a Supplement",
    desc: "Frequent donors may benefit from low-dose iron supplementation. Consult a physician before starting.",
  },
];

export default function Process() {
  const [active, setActive] = useState("introduction");
  const [bdaTab, setBdaTab] = useState("before");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const current = bda[bdaTab];

  return (
    <div className="pr-page">
     
      {/* HERO */}
      <section className="pr-hero">
        <div className="lrn-hero-glow" aria-hidden="true" />
        <div className="pr-container pr-hero-inner">
          <div className="badge fade-in">
            <span className="dot"></span>
            <span className="badge-text">The Donation Process</span>
          </div>
          <h1 className="pr-h1">
            A clinical journey from donor to <em>patient</em>.
          </h1>
          <p className="pr-lead">
            An evidence-based overview of every stage of blood donation — prepared to international
            transfusion standards and designed to inform first-time and returning donors alike.
          </p>
          <div className="pr-hero-actions">
            <a href="#overview" className="pr-btn pr-btn-primary">Read the Process</a>
            <a href="#iron" className="pr-btn pr-btn-ghost">Donor Health Guidance</a>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="pr-tabs-wrap">
        <div className="pr-container">
          <div className="pr-tabs">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`pr-tab ${active === s.id ? "active" : ""}`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 1. INTRODUCTION */}
      <section id="introduction" className="pr-section">
        <div className="pr-container">
          <div className="pr-sec-head">
            <div className="pr-divider" />
            <span className="pr-kicker">Section I</span>
            <h2 className="pr-h2">The Blood Donation Process</h2>
            <p className="pr-sec-sub">
              An introduction to voluntary, non-remunerated blood donation and its role in modern
              healthcare systems.
            </p>
          </div>

          <div className="pr-intro-grid">
            <div className="pr-intro-text">
              <p>
                Blood donation is a regulated medical procedure in which a healthy individual
                voluntarily provides whole blood, or specific blood components, for therapeutic use
                in patients. Each donation is governed by international standards established by the
                World Health Organization and national transfusion authorities to safeguard both
                donors and recipients.
              </p>
              <p>
                The complete process — from registration through post-donation recovery — is
                designed around three guiding principles: <strong>donor safety</strong>,{" "}
                <strong>recipient safety</strong>, and the <strong>efficient use</strong> of every
                unit collected. Modern donation centres separate each unit into multiple components,
                enabling a single contribution to support up to three patients.
              </p>
              <p>
                The sections that follow detail each stage of the process, your role before and
                after donation, what happens to your contribution within our facilities, and how to
                maintain healthy iron levels as a regular donor.
              </p>
            </div>
            <div>
              <blockquote className="pr-quote">
                Blood transfusion saves lives and improves health, but many patients requiring
                transfusion do not have timely access to safe blood.
                <span className="pr-quote-attr">— World Health Organization</span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW */}
      <section id="overview" className="pr-section pr-section-alt">
        <div className="pr-container">
          <div className="pr-sec-head">
            <div className="pr-divider" />
            <span className="pr-kicker">Section II</span>
            <h2 className="pr-h2">Donation Process Overview</h2>
            <p className="pr-sec-sub">
              The complete visit lasts approximately one hour. The donation itself takes less than
              ten minutes.
            </p>
          </div>

          <div className="pr-overview">
            {overview.map((o) => (
              <div key={o.num} className="pr-ov-step">
                <div className="pr-ov-num">{o.num}</div>
                <div className="pr-ov-title">{o.title}</div>
                <div className="pr-ov-time">{o.time}</div>
              </div>
            ))}
          </div>

          <p className="pr-ov-meta">
            <strong>Total appointment duration:</strong> approximately 50–60 minutes &nbsp;·&nbsp;
            <strong>Volume collected:</strong> 470 ml of whole blood
          </p>
        </div>
      </section>

      {/* 3. BEFORE / DURING / AFTER */}
      <section id="before-during-after" className="pr-section">
        <div className="pr-container">
          <div className="pr-sec-head">
            <div className="pr-divider" />
            <span className="pr-kicker">Section III</span>
            <h2 className="pr-h2">Before, During & After</h2>
            <p className="pr-sec-sub">
              Guidance for every phase of your donation visit, based on international best practice
              for donor care.
            </p>
          </div>

          <div className="pr-bda-tabs">
            {["before", "during", "after"].map((k) => (
              <button
                key={k}
                className={`pr-bda-tab ${bdaTab === k ? "active" : ""}`}
                onClick={() => setBdaTab(k)}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="pr-bda-panel">
            <div className="pr-bda-side">
              <span className="pr-bda-tag">{current.tag}</span>
              <h3>{current.title}</h3>
              <p>{current.intro}</p>
            </div>
            <ul className="pr-bda-list">
              {current.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. WHAT HAPPENS */}
      <section id="what-happens" className="pr-section pr-section-alt">
        <div className="pr-container">
          <div className="pr-sec-head">
            <div className="pr-divider" />
            <span className="pr-kicker">Section IV</span>
            <h2 className="pr-h2">What Happens to Donated Blood</h2>
            <p className="pr-sec-sub">
              From collection to clinical use, every unit follows a documented chain of custody
              spanning testing, processing, and distribution.
            </p>
          </div>

          <div className="pr-flow">
            {flow.map((f) => (
              <div key={f.n} className="pr-flow-card">
                <div className="pr-flow-num">{f.n}</div>
                <h3 className="pr-flow-title">{f.title}</h3>
                <p className="pr-flow-desc">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="pr-components">
            <div className="pr-comp-head">Component Storage & Clinical Application</div>
            {components.map((c) => (
              <div key={c.name} className="pr-comp-row">
                <div className="pr-comp-name">
                  {c.name}
                  <span>{c.sub}</span>
                </div>
                <div className="pr-comp-cell">
                  <strong>Storage</strong>
                  {c.storage}
                  <br />
                  <strong style={{ marginTop: 8 }}>Shelf Life</strong>
                  {c.shelfLife}
                </div>
                <div className="pr-comp-cell">
                  <strong>Clinical Use</strong>
                  {c.use}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IRON */}
      <section id="iron" className="pr-section">
        <div className="pr-container">
          <div className="pr-sec-head">
            <div className="pr-divider" />
            <span className="pr-kicker">Section V</span>
            <h2 className="pr-h2">Iron & Blood Donation</h2>
            <p className="pr-sec-sub">
              Maintaining adequate iron stores is essential for the long-term health of regular
              donors and for the quality of every contribution.
            </p>
          </div>

          <div className="pr-iron-grid">
            <div className="pr-iron-text">
              <h3>Why Iron Matters</h3>
              <p>
                Iron is a critical mineral that enables red blood cells to transport oxygen
                throughout the body. Each whole-blood donation removes approximately 200–250
                milligrams of iron, which the body must replenish through diet or supplementation
                before subsequent donations.
              </p>
              <p>
                International transfusion guidelines recommend a minimum 56-day interval between
                whole-blood donations to allow for full haemoglobin recovery. Donors with low iron
                stores may be temporarily deferred to protect their long-term health.
              </p>
              <div className="pr-iron-stat">
                <strong>200–250 mg</strong>
                <span>Average iron lost per whole-blood donation</span>
              </div>
            </div>

            <div className="pr-iron-foods">
              <h4>Recommended Iron-Rich Foods</h4>
              <ul className="pr-food-list">
                {ironRich.map((f) => (
                  <li key={f.food}>
                    {f.food} <span>{f.value}</span>
                  </li>
                ))}
              </ul>
              <h4>Adult Daily Requirement</h4>
              <p style={{ margin: 0, color: "var(--pr-muted)", fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: 14 }}>
                <strong style={{ color: "var(--pr-ink)" }}>Men:</strong> 8 mg/day &nbsp;·&nbsp;
                <strong style={{ color: "var(--pr-ink)" }}>Women (19–50):</strong> 18 mg/day
              </p>
            </div>
          </div>

          <div className="pr-tips">
            {ironTips.map((t) => (
              <div key={t.title} className="pr-tip">
                <div className="pr-tip-icon">{t.icon}</div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pr-section">
        <div className="pr-container">
          <div className="pr-cta">
            <div>
              <h2 className="pr-cta-title">Become a regular donor.</h2>
              <p className="pr-cta-sub">
                Schedule your next appointment and join an international community committed to
                voluntary, life-saving donation.
              </p>
            </div>
            <div className="pr-cta-actions">
              <a href="#" className="pr-btn pr-btn-white">Book Appointment</a>
              <a href="/learn" className="pr-btn pr-btn-outline" style={{ borderColor: "#fff", color: "#fff" }}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pr-footer">
        <div className="pr-container">
          <div className="pr-footer-inner">
            <div>
              <div className="pr-brand">
                <span className="pr-drop" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 2s7 8.5 7 13a7 7 0 1 1-14 0c0-4.5 7-13 7-13z" fill="currentColor" />
                  </svg>
                </span>
                <span className="pr-brand-text">
                  Gondar <span className="pr-brand-sub">Blood Bank</span>
                </span>
              </div>
              <p className="pr-foot-tag">
                Committed to safe, voluntary, non-remunerated blood donation in line with WHO
                transfusion standards.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <a href="/service">Services</a>
              <a href="/learn">Learn</a>
              <a href="/process">The Process</a>
            </div>
            <div>
              <h4>Resources</h4>
              <a href="#">Donor Eligibility</a>
              <a href="#">Frequently Asked Questions</a>
              <a href="#">Clinical Standards</a>
            </div>
            <div>
              <h4>Contact</h4>
              <a href="#">Gondar, Ethiopia</a>
              <a href="#">+251 000 000 000</a>
              <a href="#">info@gondarbloodbank.org</a>
            </div>
          </div>
          <div className="pr-foot-bottom">
            © {new Date().getFullYear()} Gondar Blood Bank. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}