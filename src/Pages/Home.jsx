import './home.css';
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
    <>
      {/* ── HERO ── */}
      <section id="home-first">
        <div className='home-container'>
          <span className="hero-tag"><Droplets size={16} /> Save a Life Today</span>
          <h1>Donate Blood<br />Save Lives<br />Be a Hero</h1>
          <p className="hero-sub">Every 2 seconds someone needs blood. Your donation can change everything.</p>
          <div className="hero-btns">
            <button className="donate-btn">Donate Blood</button>
            <Link to="/about" className="learn-btn">Learn More <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll down</span>
          <div className="scroll-line" />
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

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <h2>Ready to Save a Life?</h2>
        <p>Join thousands of heroes who donate blood every day.</p>
        <button className="cta-donate-btn">Donate Blood Now</button>
      </section>
    </>
  );
}
