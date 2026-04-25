import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./News.css";

const ARTICLES = [
  {
    id: "n-001",
    category: "Press Release",
    region: "Ethiopia",
    title: "Gonder Blood Bank Surpasses 50,000 Annual Donations Milestone",
    excerpt:
      "A coordinated nationwide campaign and renewed donor engagement have driven record-breaking participation across the Amhara region.",
    body: `In an official statement issued from its headquarters in Gondar, the Gonder Blood Bank confirmed that annual voluntary donations have, for the first time in its history, surpassed the 50,000 mark. Officials credited a combination of community outreach, mobile collection units, and the institution's recently digitised appointment platform.\n\nThe milestone places the institution among the leading regional blood services in East Africa and reaffirms its commitment to the World Health Organization's goal of 100% voluntary, non-remunerated donation by 2030.`,
    author: "Editorial Desk",
    date: "2025-04-18",
    readTime: 4,
    featured: true,
    tag: "Milestone",
  },
  {
    id: "n-002",
    category: "Health Advisory",
    region: "Global",
    title: "WHO Reaffirms Importance of Voluntary, Non-Remunerated Donation",
    excerpt:
      "New global guidance highlights donor safety, traceability, and equitable access as cornerstones of modern transfusion services.",
    body: `The World Health Organization has reissued its long-standing position that voluntary, unpaid blood donation remains the safest and most sustainable foundation for any national blood system. The updated framework places renewed emphasis on traceability, haemovigilance, and equitable distribution.`,
    author: "International Affairs",
    date: "2025-04-12",
    readTime: 5,
    featured: false,
    tag: "Policy",
  },
  {
    id: "n-003",
    category: "Community",
    region: "Amhara Region",
    title: "University Partnership Launches Student Donor Ambassador Program",
    excerpt:
      "A formal agreement with the University of Gondar establishes a structured volunteer pipeline and on-campus collection days.",
    body: `Under a memorandum of understanding signed this week, the University of Gondar and the Gonder Blood Bank will jointly operate a student ambassador programme. Selected ambassadors will receive accredited training in donor recruitment, public health communication, and event coordination.`,
    author: "Community Relations",
    date: "2025-04-05",
    readTime: 3,
    featured: false,
    tag: "Partnership",
  },
  {
    id: "n-004",
    category: "Operations",
    region: "Ethiopia",
    title: "New Cold-Chain Facility Inaugurated to Strengthen Regional Supply",
    excerpt:
      "A purpose-built storage and processing centre will extend the institution's reach to remote health facilities across the region.",
    body: `The new facility, constructed to international Good Manufacturing Practice standards, expands processing capacity by an estimated 40 percent. Equipped with redundant cold-chain systems and continuous environmental monitoring, it will serve as the principal hub for plasma fractionation and component therapy.`,
    author: "Operations Bureau",
    date: "2025-03-28",
    readTime: 6,
    featured: true,
    tag: "Infrastructure",
  },
  {
    id: "n-005",
    category: "Research",
    region: "Global",
    title: "Peer-Reviewed Study Examines Iron Recovery in Frequent Donors",
    excerpt:
      "Findings published in a leading transfusion journal inform updated nutritional guidance for repeat donors.",
    body: `Researchers analysed longitudinal data from more than 12,000 donors across three continents. The study concluded that targeted iron supplementation, combined with extended inter-donation intervals for at-risk groups, materially reduces deferral rates without compromising supply.`,
    author: "Research Division",
    date: "2025-03-21",
    readTime: 7,
    featured: false,
    tag: "Science",
  },
  {
    id: "n-006",
    category: "Press Release",
    region: "Ethiopia",
    title: "Emergency Reserves Restored Following Coordinated Appeal",
    excerpt:
      "Donor turnout exceeded projections within 72 hours, restoring critical inventory levels for O− and B− blood groups.",
    body: `Following a public appeal issued on Monday, donor centres reported turnout exceeding initial projections by 38 percent. Inventory levels for the most clinically demanded groups have been fully restored, and elective procedures dependent on transfusion support have resumed without interruption.`,
    author: "Editorial Desk",
    date: "2025-03-14",
    readTime: 3,
    featured: false,
    tag: "Update",
  },
  {
    id: "n-007",
    category: "Community",
    region: "Africa",
    title: "Regional Blood Services Convene for Annual Coordination Forum",
    excerpt:
      "Delegations from twelve nations meet in Addis Ababa to align on shared standards, training, and emergency response.",
    body: `The forum, hosted in collaboration with the African Society for Blood Transfusion, focused on cross-border collaboration during humanitarian emergencies. Delegates endorsed a shared framework for mutual assistance and information exchange.`,
    author: "International Affairs",
    date: "2025-03-02",
    readTime: 5,
    featured: false,
    tag: "Forum",
  },
  {
    id: "n-008",
    category: "Operations",
    region: "Amhara Region",
    title: "Mobile Collection Units Expand Schedule to Rural Districts",
    excerpt:
      "An additional six districts have been added to the rotating mobile clinic schedule beginning next month.",
    body: `The expansion, supported by a grant from a consortium of public-health donors, brings safe and accredited donation services within reach of an estimated 280,000 additional residents.`,
    author: "Operations Bureau",
    date: "2025-02-22",
    readTime: 4,
    featured: false,
    tag: "Outreach",
  },
];

const CATEGORIES = ["All", "Press Release", "Health Advisory", "Community", "Operations", "Research"];
const REGIONS = ["All Regions", "Ethiopia", "Amhara Region", "Africa", "Global"];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}

export default function News() {
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All Regions");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [openId, setOpenId] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gbb_news_bookmarks") || "[]");
    } catch {
      return [];
    }
  });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    localStorage.setItem("gbb_news_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const filtered = useMemo(() => {
    let list = ARTICLES.filter((a) => {
      const okCat = category === "All" || a.category === category;
      const okReg = region === "All Regions" || a.region === region;
      const q = query.trim().toLowerCase();
      const okQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q);
      return okCat && okReg && okQ;
    });
    list.sort((a, b) =>
      sort === "newest"
        ? new Date(b.date) - new Date(a.date)
        : sort === "oldest"
        ? new Date(a.date) - new Date(b.date)
        : a.readTime - b.readTime,
    );
    return list;
  }, [category, region, query, sort]);

  const featured = ARTICLES.find((a) => a.featured) || ARTICLES[0];
  const headlines = ARTICLES.slice(0, 5);

  const toggleBookmark = (id) =>
    setBookmarks((b) => (b.includes(id) ? b.filter((x) => x !== id) : [...b, id]));

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div className="gbb-news">
      
      

      {/* Masthead */}
      <section className="nx-masthead">
        <div className="nx-masthead-inner">
          <div className="nx-masthead-meta">
            <span className="nx-eyebrow">The Newsroom</span>
            <span className="nx-divider" />
            <span>{formatDate(new Date().toISOString())}</span>
            <span className="nx-divider" />
            <span>Volume XII · Edition 04</span>
          </div>
          <h1 className="nx-masthead-title">Official News, Notices &amp; Announcements</h1>
          <p className="nx-masthead-sub">
            Authoritative reporting on transfusion medicine, public-health initiatives, and the
            institutional work of the Gonder Blood Bank — published in accordance with editorial
            standards aligned with the World Health Organization and the International Federation
            of Red Cross and Red Crescent Societies.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="nx-featured">
        <div className="nx-featured-inner">
          <article className="nx-featured-card">
            <div className="nx-featured-tag">
              <span className="nx-pill">{featured.category}</span>
              <span className="nx-pill nx-pill-ghost">{featured.region}</span>
              <span className="nx-pill nx-pill-gold">Featured</span>
            </div>
            <h2 className="nx-featured-title">{featured.title}</h2>
            <p className="nx-featured-excerpt">{featured.excerpt}</p>
            <div className="nx-featured-meta">
              <span>By {featured.author}</span>
              <span>·</span>
              <span>{formatDate(featured.date)}</span>
              <span>·</span>
              <span>{featured.readTime} min read</span>
            </div>
            <div className="nx-featured-actions">
              <button className="nx-btn nx-btn-primary" onClick={() => setOpenId(featured.id)}>
                Read full report →
              </button>
              <button
                className="nx-btn nx-btn-ghost"
                onClick={() => toggleBookmark(featured.id)}
              >
                {bookmarks.includes(featured.id) ? "★ Saved" : "☆ Save story"}
              </button>
            </div>
          </article>
          <aside className="nx-headlines">
            <div className="nx-headlines-head">
              <span className="nx-headlines-eyebrow">Top Headlines</span>
              <span className="nx-headlines-count">{headlines.length} stories</span>
            </div>
            <ol className="nx-headlines-list">
              {headlines.map((h, i) => (
                <li key={h.id} onClick={() => setOpenId(h.id)}>
                  <span className="nx-headlines-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="nx-headlines-title">{h.title}</div>
                    <div className="nx-headlines-meta">
                      {h.category} · {formatDate(h.date)}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      {/* Filter bar */}
      <section className="nx-toolbar">
        <div className="nx-toolbar-inner">
          <div className="nx-search">
            <span aria-hidden>🔎</span>
            <input
              type="search"
              placeholder="Search news, advisories, announcements…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="nx-filters">
            <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Region">
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="short">Shortest read</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid + Sidebar */}
      <section className="nx-main">
        <div className="nx-main-inner">
          <div className="nx-grid">
            {filtered.length === 0 && (
              <div className="nx-empty">
                <h3>No results match your filters</h3>
                <p>Try a broader search term or reset the category and region filters.</p>
              </div>
            )}
            {filtered.map((a) => (
              <article key={a.id} className="nx-card">
                <div className="nx-card-tag">
                  <span className="nx-pill">{a.category}</span>
                  <span className="nx-pill nx-pill-ghost">{a.region}</span>
                </div>
                <h3 className="nx-card-title">{a.title}</h3>
                <p className="nx-card-excerpt">{a.excerpt}</p>
                <div className="nx-card-meta">
                  <span>{formatDate(a.date)}</span>
                  <span>·</span>
                  <span>{a.readTime} min</span>
                  <span>·</span>
                  <span>{a.author}</span>
                </div>
                <div className="nx-card-actions">
                  <button className="nx-link" onClick={() => setOpenId(a.id)}>
                    Continue reading →
                  </button>
                  <button
                    className="nx-icon-btn"
                    onClick={() => toggleBookmark(a.id)}
                    aria-label="Save"
                  >
                    {bookmarks.includes(a.id) ? "★" : "☆"}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="nx-side">
            <div className="nx-side-card nx-side-alert">
              <div className="nx-side-eyebrow">Urgent Notice</div>
              <h4>O− Reserves Below Threshold</h4>
              <p>
                Eligible donors of universal red-cell type are kindly requested to schedule an
                appointment at the earliest convenience.
              </p>
              <Link to="/appointment" className="nx-btn nx-btn-primary nx-btn-sm">
                Schedule Donation
              </Link>
            </div>

            <div className="nx-side-card">
              <div className="nx-side-eyebrow">Newsletter</div>
              <h4>Weekly Press Digest</h4>
              <p>Receive our curated digest of advisories, milestones, and policy updates.</p>
              <form onSubmit={handleSubscribe} className="nx-sub">
                <input
                  type="email"
                  placeholder="your.email@institution.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="nx-btn nx-btn-primary nx-btn-sm">
                  Subscribe
                </button>
              </form>
              {subscribed && <div className="nx-sub-ok">✓ Subscription confirmed.</div>}
            </div>

            <div className="nx-side-card">
              <div className="nx-side-eyebrow">Bookmarked</div>
              <h4>Your Saved Stories</h4>
              {bookmarks.length === 0 ? (
                <p className="nx-muted">You have not saved any stories yet.</p>
              ) : (
                <ul className="nx-side-list">
                  {ARTICLES.filter((a) => bookmarks.includes(a.id)).map((a) => (
                    <li key={a.id}>
                      <button onClick={() => setOpenId(a.id)}>{a.title}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="nx-side-card nx-side-press">
              <div className="nx-side-eyebrow">Press Office</div>
              <h4>Media Enquiries</h4>
              <p>For accreditation, interviews, or official statements:</p>
              <ul className="nx-press-list">
                <li>📧 press@gonderbloodbank.org</li>
                <li>📞 +251 (0) 58 111 0000</li>
                <li>🕐 Mon–Fri, 09:00–17:00 EAT</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>


      {/* Article modal */}
      {openId && (() => {
        const a = ARTICLES.find((x) => x.id === openId);
        if (!a) return null;
        return (
          <div className="nx-modal" onClick={() => setOpenId(null)}>
            <div className="nx-modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="nx-modal-close" onClick={() => setOpenId(null)} aria-label="Close">×</button>
              <div className="nx-card-tag">
                <span className="nx-pill">{a.category}</span>
                <span className="nx-pill nx-pill-ghost">{a.region}</span>
                <span className="nx-pill nx-pill-gold">{a.tag}</span>
              </div>
              <h2 className="nx-modal-title">{a.title}</h2>
              <div className="nx-modal-meta">
                <span>By {a.author}</span> · <span>{formatDate(a.date)}</span> ·{" "}
                <span>{a.readTime} min read</span>
              </div>
              <p className="nx-modal-lede">{a.excerpt}</p>
              {a.body.split("\n\n").map((p, i) => (
                <p key={i} className="nx-modal-body">{p}</p>
              ))}
              <div className="nx-modal-foot">
                <button
                  className="nx-btn nx-btn-ghost"
                  onClick={() => toggleBookmark(a.id)}
                >
                  {bookmarks.includes(a.id) ? "★ Saved" : "☆ Save story"}
                </button>
                <Link to="/appointment" className="nx-btn nx-btn-primary">
                  Book an Appointment
                </Link>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}