import './home.css';
import './style.css';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightCircle, ArrowLeftCircle, ArrowRight,
  CalendarDays, ChevronDown, Heart, Droplets, Users, Activity,
} from 'lucide-react';
import blood from '../assets/blood.png';
import news1 from '../assets/news1.jpeg';
import news2 from '../assets/news2.jpg';
import news3 from '../assets/news3.jpg';
import d1 from '../assets/d1.jpg';
import d2 from '../assets/d2.jpg';
import d3 from '../assets/d3.jpg'; 
import d4 from '../assets/d4.webp';

import "./style.css"

/* ── animated counter hook ── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const numeric = parseInt(target.replace(/,/g, ''), 10);
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count.toLocaleString();
}

/* ── intersection observer hook ── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── stat card ── */
function StatCard({ icon: Icon, num, label, inView }) {
  const value = useCounter(num, 1800, inView);
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={32} /></div>
      <h2 className="stat-num">{value}+</h2>
      <p className="stat-label">{label}</p>
    </div>
  );
}

const stats = [
  { icon: Droplets, num: '300000', label: 'Blood Donors' },
  { icon: Heart,    num: '201000', label: 'Lives Saved' },
  { icon: Users,    num: '540000', label: 'Active Volunteers' },
  { icon: Activity, num: '50000',  label: 'Units Collected' },
];

const images = [
  { src: d1, alt: 'donor' }, { src: d2, alt: 'donor' },
  { src: d3, alt: 'donor' }, { src: d4, alt: 'donor' },
];

const news = [
  { title: 'ከደም ልገሳ እስከ የዓይን ብሌን ቃል፤ በ11 ክፍለ ከተሞች የሕይወት ማዳን ንቅናቄ', date: 'Jan 1, 2025', desc: 'የኢትዮጵያ ደም እና ሕብረ ህዋስ ባንክ አገልግሎት በመጪው የበዓል ወቅት የደም እጥረት እንዳይከሰት በአዲስ አበባ ከተማ በሚገኙ 11 ክፍለ ከተሞች የደም ማሰ', img: news1 },
  { title: 'ከደም ልገሳ እስከ የዓይን ብሌን ቃል፤ በ11 ክፍለ ከተሞች የሕይወት ማዳን ንቅናቄ', date: 'Jan 1, 2025', desc: 'የኢትዮጵያ ደም እና ሕብረ ህዋስ ባንክ አገልግሎት በመጪው የበዓል ወቅት የደም እጥረት እንዳይከሰት በአዲስ አበባ ከተማ በሚገኙ 11 ክፍለ ከተሞች የደም ማሰ', img: news2 },
  { title: 'ከደም ልገሳ እስከ የዓይን ብሌን ቃል፤ በ11 ክፍለ ከተሞች የሕይወት ማዳን ንቅናቄ', date: 'Jan 1, 2025', desc: 'የኢትዮጵያ ደም እና ሕብረ ህዋስ ባንክ አገልግሎት በመጪው የበዓል ወቅት የደም እጥረት እንዳይከሰት በአዲስ አበባ ከተማ በሚገኙ 11 ክፍለ ከተሞች የደም ማሰ', img: news3 },
];

const faqs = [
  { q: 'በአጠቃላይ ህዝብ ዘንድ በብዛት የሚገኘው የደም ዓይነት የትኛው ነው?', a: 'O+ ከሁሉ በስፋት የሚገኝ ሲሆን በግምት 37% የሚሆነውን ህዝብ ይወክላል። ሆኖም O- ለቀይ የደም ህዋሳት "ሁለንተናዊ ለጋሽ" በመሆን ለድንገተኛ ጊዜ ወሳኝ ነው።' },
  { q: 'ደም ከለገሱ በኋላ የጠፋውን ፈሳሽ መጠን ሰውነት ለመሙላት ምን ያህል ጊዜ ይፈጅበታል?', a: 'የደም ፈሳሽ ክፍል (ፕላዝማ) ከአንድ እስከ ሁለት ቀናት ውስጥ ይሞላል። ቀይ የደም ህዋሳት ግን ከ4–8 ሳምንታት ይፈጃሉ።' },
  { q: 'ደም ልገሳ እንዳይፈቀድለት የሚያደርግ ቋሚ ምክንያት የትኛው ነው?', a: 'ሄፓታይተስ ሲ በደም ሊተላለፍ የሚችል የቫይረስ ኢንፌክሽን በመሆኑ፣ ቀደም ሲል አዎንታዊ መመርመር ዘላቂ የልገሳ እገዳ ያስከትላል።' },
  { q: 'ብረት ለደም ለጋሾች ለምን አስፈላጊ ነው?', a: 'ብረት ሄሞግሎቢን ለመፍጠር አስፈላጊ ነው። ሄሞግሎቢን ኦክስጅንን የሚሸከም ፕሮቲን ሲሆን ብረትን ይዟል።' },
  { q: 'አንድ ጊዜ ሙሉ ደም መለገስ በግምት ስንት ሰዎችን ሊረዳ ይችላል?', a: 'አንድ ልገሳ ወደ ቀይ የደም ህዋሳት፣ ፕሌትሌት እና ፕላዝማ ሊከፋፈል ስለሚችል፣ እስከ ሶስት የተለያዩ ሕመምተኞች ላይ ሊውል ይችላል።' },
];

export default function Home() {
  const trackRef = useRef();
  const [openIndex, setOpenIndex] = useState(null);
  const [statsRef, statsInView] = useInView(0.3);

  return (
    <div className='s-home'>
      {/* ── HERO ──
      <section className="pr-hero">
        <div className='pr-container pr-hero-inner'>
          <span className="hero-tag"><Droplets size={16} /> Save a Life Today</span>
          <h1 className='home-h1'>Donate Blood Save Lives <span className="pr-accent">Be a Hero</span></h1>
          <p className="pr-lead">Your contribution provides the vital lifeline Gondar's hospitals depend on every single day. Join a network of thousands ensuring safety and availability when it matters most.</p>
          <div className="pr-hero-actions">
            <a href="/make-appointment"  className="pr-btn pr-btn-primary">Donate Blood</a>
            <a href="/about" className="pr-btn pr-btn-ghost">Learn More <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll down</span>
          <div className="scroll-line" />
        </div>
      </section> */}

       {/* Hero */}
      <section className="s-hero">
        <div className="s-container s-hero-inner">
            <div className="badge fade-in">
              <span className="dot"></span>
              <span className="badge-text">Urgent need · O− and AB+ donors</span>
            </div>
            <h1 className='s-h1'>
              Every drop is a <em>promise</em> — <br />
              the gift of life, given with care.
            </h1>
            <p className="s-lead">
              Gonder Blood Bank is committed to providing safe, sufficient, and timely blood
              supply to hospitals across Ethiopia. Our work is guided by international standards
              and powered by voluntary donors who choose, every day, to save a life.
            </p>
            <div className="s-hero-actions">
              <Link to="/service" className="s-btn s-btn-primary">Become a Donor</Link>
              <Link to="/process" className="s-btn s-btn-ghost">Learn the Process</Link>
            </div>
           
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <StatCard key={i} icon={s.icon} num={s.num} label={s.label} inView={statsInView} />
          ))}
        </div>
      </section>

      {/* ── DONOR SLIDER ── */}
      <section className="slider-section">
        <div className="slider">
          <h2 className="section-title">Our Blood Donors</h2>

          <div className="slider-wrapper">

            <div className="slider-track" ref={trackRef}>
              {[...images, ...images].map((item, index) => (
                <img
                  src={item.src}
                  alt={item.alt}
                  key={index}
                  className="slide-image"
                />
              ))}
            </div>

          </div>
        </div>
      </section>


       {/* Highlights / other pages */}
      <section className="s-section">
        <div className="s-sec-head">
          <div className="badge fade-in">
            <span className="dot"></span>
            <span className="badge-text">Explore</span>
          </div>
          <h2 className="ss-h2">What we do, and how you can take part</h2>
          <p className="s-sec-sub">
            From donor recruitment to laboratory screening and hospital distribution,
            our work spans the entire safe-blood value chain. Discover how each part
            of our mission supports patients across the region.
          </p>
        </div>

        <div className="gbb-highlights">
          <Link to="/service" className="gbb-card">
            <div className="gbb-card-icon">✚</div>
            <h3>Our Services</h3>
            <p>
              Donation drives, mobile units, screening laboratories, and 24/7 emergency
              supply for partner hospitals across the region.
            </p>
            <span className="gbb-card-link">Explore services</span>
          </Link>

          <Link to="/learn" className="gbb-card">
            <div className="gbb-card-icon">◎</div>
            <h3>Learn About Donation</h3>
            <p>
              Eligibility, blood types, and the science of donation — clear, accurate
              information to help you prepare with confidence.
            </p>
            <span className="gbb-card-link">Start learning</span>
          </Link>

          <Link to="/process" className="gbb-card">
            <div className="gbb-card-icon">❖</div>
            <h3>The Donation Process</h3>
            <p>
              A step-by-step guide to what happens before, during, and after your visit,
              and how your donation is tested and delivered.
            </p>
            <span className="gbb-card-link">View the process</span>
          </Link>

          <Link to="/blog" className="gbb-card">
            <div className="gbb-card-icon">✎</div>
            <h3>Community Journal</h3>
            <p>
              Stories from donors, recipients, and partner clinicians — a public
              record of the lives shaped by voluntary giving.
            </p>
            <span className="gbb-card-link">Read the journal</span>
          </Link>

          <Link to="/service" className="gbb-card">
            <div className="gbb-card-icon">⚑</div>
            <h3>Host a Drive</h3>
            <p>
              Universities, employers, and faith communities can partner with us
              to host on-site donation events — fully equipped and supervised.
            </p>
            <span className="gbb-card-link">Become a partner</span>
          </Link>

          <Link to="/learn" className="gbb-card">
            <div className="gbb-card-icon">♥</div>
            <h3>Why It Matters</h3>
            <p>
              A single donation can save up to three lives. Learn how your
              contribution supports trauma care, surgery, and maternal health.
            </p>
            <span className="gbb-card-link">See the impact</span>
          </Link>
        </div>
      </section>

      {/* About / Mission */}
      <section className="gbb-about-wrap">
        <div className="gbb-about">
          <div>
            <div className="badge fade-in">
              <span className="dot"></span>
              <span className="badge-text">About Us</span>
            </div>
            <h2>A trusted institution for safe blood, built on transparency and care.</h2>
            <p>
              Founded in service to the public health system of Gondar and the wider
              Amhara region, our blood bank operates under strict regulatory oversight
              and is committed to international best practices in collection, testing,
              processing, and distribution.
            </p>
            <p>
              We believe that a strong, voluntary donor community is the foundation
              of a resilient health system. Our work is guided by dignity, equity,
              and the simple conviction that no patient should be turned away for
              lack of blood.
            </p>
            <Link to="/service" className="s-btn s-btn-primary" style={{ marginTop: 14 }}>
              Get involved
            </Link>
          </div>
          <div className="gbb-pillars">
            <div className="gbb-pillar">
              <strong>Safety First</strong>
              <span>All donations screened against WHO-recommended panel.</span>
            </div>
            <div className="gbb-pillar">
              <strong>Voluntary Donors</strong>
              <span>100% of our supply comes from non-remunerated donors.</span>
            </div>
            <div className="gbb-pillar">
              <strong>Equitable Access</strong>
              <span>Distribution prioritised by clinical need, not status.</span>
            </div>
            <div className="gbb-pillar">
              <strong>Transparent Reporting</strong>
              <span>Annual public reports on collection and impact.</span>
            </div>
          </div>
        </div>
      </section>



      
      {/* ── ABOUT STRIP ── */}
      <section className="about-strip">
        <div className="strip-text">
          <h2>Blood Donation</h2>
          <p>Discover the vital role blood donation plays in saving lives and supporting healthcare. Learn who can donate, the process involved, and how your contribution makes a difference.</p>
          <button className="donate-btn strip-btn">Donate Now</button>
        </div>
        <div className="strip-image">
          <img src={blood} alt="blood donation" />
        </div>
      </section>


      {/* ── NEWS ── */}
      <section className="home-news-section">
        <div className="section-header">
          <h2 className="section-title">Latest News</h2>
          <Link to="/news" className="view-all-link">View All <ArrowRight size={15} /></Link>
        </div>
        <div className="home-news-grid">
          {news.map((item, i) => (
            <div className="home-news-card" key={i}>
              <div className="hnc-image">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="hnc-body">
                <span className="hnc-date"><CalendarDays size={13} /> {item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Link className="hnc-link">Read more <ArrowRight size={14} /></Link>
              </div>
            </div>
          ))}
        </div>
        <Link to="/news">
          <button className="see-all-btn">See All News <ArrowRight size={16} /></button>
        </Link>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <h2 className="section-title centered">Blood Donation FAQs</h2>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={i}>
              <button className="faq-header" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{item.q}</span>
                <ChevronDown size={22} className={`faq-arrow ${openIndex === i ? 'rotated' : ''}`} />
              </button>
              <div className="faq-body">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="s-section">
        <div className="s-container">
          <div className="s-cta">
            <div>
              <h2 className="s-cta-title">Become a regular donor.</h2>
              <p className="s-cta-sub">
                Schedule your next appointment and join an international community committed to
                voluntary, life-saving donation.
              </p>
            </div>
            <div className="s-cta-actions">
              <a href="#" className="s-btn s-btn-white">Book Appointment</a>
              <a href="/learn" className="s-btn s-btn-outline" style={{ borderColor: "#fff", color: "#fff" }}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
