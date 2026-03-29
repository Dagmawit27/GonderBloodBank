import './faq.css';
import { useState, useMemo } from 'react';
import {
  ChevronDown, Droplets, Heart, Shield, Clock, Users,
  Search, ChevronsDownUp, ChevronsUpDown, X,
} from 'lucide-react';

const categories = [
  {
    label: 'Eligibility',
    icon: Users,
    color: '#2980b9',
    items: [
      { q: 'Who can donate blood?', a: 'Generally, anyone aged 18–65 who weighs at least 50 kg and is in good health can donate. You must not have donated whole blood in the last 56 days. Our staff will conduct a brief health screening before each donation.' },
      { q: 'Can I donate if I have a cold or flu?', a: 'No. You should be in good health on the day of donation. If you have a cold, flu, or any active infection, please wait until you have fully recovered before donating.' },
      { q: 'Can pregnant women donate blood?', a: 'No. Pregnant women are not eligible to donate blood. You should wait at least 6 months after giving birth before donating.' },
      { q: 'Is there a weight requirement for blood donation?', a: 'Yes. Donors must weigh at least 50 kg (110 lbs). This ensures the donation is safe for the donor and that the volume collected is sufficient for patient use.' },
    ],
  },
  {
    label: 'The Process',
    icon: Heart,
    color: '#c0392b',
    items: [
      { q: 'How long does the donation process take?', a: 'The actual blood draw takes only 8–10 minutes. Including registration, health screening, and post-donation rest, plan for about 45–60 minutes total.' },
      { q: 'Does donating blood hurt?', a: 'You may feel a brief pinch when the needle is inserted, but the donation itself is generally painless. Most donors describe it as a minor discomfort that passes quickly.' },
      { q: 'How much blood is taken during a donation?', a: 'A standard whole blood donation is approximately 450 ml (about one pint), which is roughly 8–10% of the average adult\'s blood volume. Your body replenishes this within a few weeks.' },
      { q: 'What happens to my blood after donation?', a: 'Your blood is tested, processed, and separated into components — red cells, platelets, and plasma. Each component can help a different patient, meaning one donation can save up to three lives.' },
    ],
  },
  {
    label: 'Safety',
    icon: Shield,
    color: '#27ae60',
    items: [
      { q: 'Is blood donation safe?', a: 'Yes. All equipment used is sterile and single-use. You cannot contract any disease by donating blood. Our trained medical staff at Gondar Blood Bank follow strict safety protocols throughout the process.' },
      { q: 'Will I feel weak after donating?', a: 'Most donors feel fine immediately after donating. Some may feel slightly lightheaded. We recommend resting for 10–15 minutes, drinking fluids, and having a light snack before leaving.' },
      { q: 'What are the permanent reasons I cannot donate?', a: 'Certain conditions such as a previous positive test for HIV, Hepatitis B, or Hepatitis C may permanently disqualify a donor. Our health screening team will assess your eligibility confidentially.' },
    ],
  },
  {
    label: 'Preparation & Recovery',
    icon: Clock,
    color: '#e67e22',
    items: [
      { q: 'What should I do before donating?', a: 'Drink plenty of water, eat a healthy low-fat meal, get a good night\'s sleep, and avoid alcohol for 24 hours before donating. Wear comfortable clothing with sleeves that roll up easily.' },
      { q: 'How often can I donate blood?', a: 'Whole blood donors must wait at least 56 days (8 weeks) between donations. Platelet donors can donate more frequently — up to 24 times per year.' },
      { q: 'What should I eat after donating?', a: 'Eat iron-rich foods such as red meat, beans, spinach, and fortified cereals to help replenish iron levels. Drink extra fluids for the next 24–48 hours and avoid strenuous physical activity on the day of donation.' },
      { q: 'Why is iron important for blood donors?', a: 'Iron is essential for producing hemoglobin, the protein in red blood cells that carries oxygen. Each donation depletes some iron, so maintaining adequate iron levels through diet helps ensure you remain eligible to donate regularly.' },
    ],
  },
];

const allItems = categories.flatMap((cat, ci) =>
  cat.items.map((item, ii) => ({ ...item, catIdx: ci, itemIdx: ii, catLabel: cat.label, catColor: cat.color }))
);

function highlight(text, query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="faq-highlight">{p}</mark>
      : p
  );
}

export default function FAQ() {
  const [openItem, setOpenItem]     = useState({});
  const [activeTab, setActiveTab]   = useState('All');
  const [search, setSearch]         = useState('');
  const [allExpanded, setAllExpanded] = useState(false);

  const key = (ci, ii) => `${ci}-${ii}`;
  const isOpen = (ci, ii) => !!openItem[key(ci, ii)];

  const toggle = (ci, ii) =>
    setOpenItem(prev => ({ ...prev, [key(ci, ii)]: !prev[key(ci, ii)] }));

  /* filtered results */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allItems.filter(item => {
      const matchTab = activeTab === 'All' || item.catLabel === activeTab;
      const matchSearch = !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [search, activeTab]);

  /* group filtered back by category for rendering */
  const grouped = useMemo(() =>
    categories.map((cat, ci) => ({
      ...cat,
      ci,
      visible: filtered.filter(f => f.catIdx === ci),
    })).filter(g => g.visible.length > 0),
  [filtered]);

  const expandAll = () => {
    const next = {};
    filtered.forEach(f => { next[key(f.catIdx, f.itemIdx)] = true; });
    setOpenItem(next);
    setAllExpanded(true);
  };

  const collapseAll = () => { setOpenItem({}); setAllExpanded(false); };

  const clearSearch = () => setSearch('');

  return (
    <>
      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-hero-text">
          <Droplets size={40} className="faq-hero-icon" />
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about blood donation at Gondar Blood Bank</p>
        </div>
      </section>

      {/* Stats strip */}
      <div className="faq-stats-strip">
        <div className="fss-item"><strong>56 days</strong><span>between whole blood donations</span></div>
        <div className="fss-divider" />
        <div className="fss-item"><strong>8–10 min</strong><span>actual donation time</span></div>
        <div className="fss-divider" />
        <div className="fss-item"><strong>3 lives</strong><span>saved per donation</span></div>
        <div className="fss-divider" />
        <div className="fss-item"><strong>50 kg</strong><span>minimum donor weight</span></div>
      </div>

      {/* Controls */}
      <div className="faq-controls">
        {/* Search */}
        <div className="faq-search-wrap">
          <Search size={16} className="faq-search-icon" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="faq-search-input"
          />
          {search && (
            <button className="faq-clear-btn" onClick={clearSearch} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="faq-tabs">
          {['All', ...categories.map(c => c.label)].map(tab => (
            <button
              key={tab}
              className={`faq-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className="faq-tab-count">
                {tab === 'All'
                  ? allItems.length
                  : categories.find(c => c.label === tab)?.items.length}
              </span>
            </button>
          ))}
        </div>

        {/* Expand / Collapse all */}
        <div className="faq-bulk-btns">
          <button className="faq-bulk-btn" onClick={expandAll}>
            <ChevronsUpDown size={15} /> Expand All
          </button>
          <button className="faq-bulk-btn" onClick={collapseAll}>
            <ChevronsDownUp size={15} /> Collapse All
          </button>
        </div>
      </div>

      {/* Results count */}
      {search && (
        <div className="faq-result-count">
          {filtered.length === 0
            ? 'No questions found.'
            : `${filtered.length} question${filtered.length > 1 ? 's' : ''} found for "${search}"`}
        </div>
      )}

      {/* FAQ body */}
      <section className="faq-body">
        {grouped.length === 0 ? (
          <div className="faq-empty">
            <Search size={40} className="faq-empty-icon" />
            <h3>No results found</h3>
            <p>Try a different keyword or browse all categories.</p>
            <button className="faq-reset-btn" onClick={() => { clearSearch(); setActiveTab('All'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          grouped.map(cat => {
            const Icon = cat.icon;
            return (
              <div className="faq-category" key={cat.ci}>
                <div className="faq-cat-header" style={{ borderLeft: `4px solid ${cat.color}` }}>
                  <div className="faq-cat-icon" style={{ background: `${cat.color}18`, color: cat.color }}>
                    <Icon size={22} />
                  </div>
                  <h2>{cat.label}</h2>
                  <span className="faq-cat-count">{cat.visible.length}</span>
                </div>

                <div className="faq-list">
                  {cat.visible.map(item => {
                    const open = isOpen(item.catIdx, item.itemIdx);
                    return (
                      <div className={`faq-item ${open ? 'open' : ''}`} key={item.itemIdx}>
                        <button
                          className="faq-q"
                          onClick={() => toggle(item.catIdx, item.itemIdx)}
                        >
                          <span>{highlight(item.q, search.trim())}</span>
                          <ChevronDown
                            size={20}
                            className={`faq-chevron ${open ? 'rotated' : ''}`}
                          />
                        </button>
                        <div className="faq-a">
                          <p>{highlight(item.a, search.trim())}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Still have questions */}
      <section className="faq-contact-strip">
        <div className="fcs-text">
          <h2>Still have questions?</h2>
          <p>Our team at Gondar Blood Bank is happy to help. Call us or send a message.</p>
        </div>
        <div className="fcs-actions">
          <a href="tel:+251581112345" className="fcs-btn outline">+251 58 111 2345</a>
          <a href="/contact" className="fcs-btn solid">Contact Us</a>
        </div>
      </section>

      {/* CTA */}
      <section className="faq-cta">
        <h2>Ready to Donate?</h2>
        <p>Visit Gondar Blood Bank today and help save lives in your community.</p>
        <button className="faq-cta-btn">Donate Blood Now</button>
      </section>
    </>
  );
}
