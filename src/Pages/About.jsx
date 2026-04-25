import './about.css';
import './style.css';
import { useState } from 'react';
import { Target, Eye, Star, History, ChevronRight } from 'lucide-react';
import pic from '../assets/gonder.jpg';
import d1 from '../assets/d1.jpg';
import d2 from '../assets/d2.jpg';
import d3 from '../assets/d3.jpg';

const tabs = ['History', 'Mission', 'Vision', 'Values'];

const tabContent = {
  History: {
    icon: History,
    title: 'Our History',
    body: [
      'Blood Bank service in Ethiopia was established in 1969 GC by the Ethiopian Red Cross Society at Addis Ababa. The service was delivered through 12 regional blood banks covering 52% of hospitals in the country.',
      'In April 2012, the Federal Ministry of Health completed a transition to bring the Blood Bank Service under the mainstream healthcare delivery system, managing 25 functional blood banks — one Central Blood Bank in Addis Ababa and 24 in regions.',
      'By 2023, additional collection centers brought the total to fifty. The Ethiopian Blood and Tissue Bank Service (EBTBS) was re-established as an autonomous entity under Regulation No. 528/2023, expanding into blood banking, eye banking, stem cell and tissue banking.',
    ],
  },
  Mission: {
    icon: Target,
    title: 'Our Mission',
    body: [
      'To provide safe, adequate, and quality-assured blood products and tissue services to all in need, while promoting proper clinical use.',
      'We are committed to maintaining the highest standards of safety and quality in every unit of blood collected, tested, processed, and distributed.',
    ],
  },
  Vision: {
    icon: Eye,
    title: 'Our Vision',
    body: [
      'To be the Center of Excellence for Blood and Tissue Service in Africa.',
      'We strive to build a self-sufficient national blood supply system that meets 100% of the country\'s needs through voluntary, non-remunerated blood donation.',
    ],
  },
  Values: {
    icon: Star,
    title: 'Our Values',
    body: [
      'Volunteerism — We believe in the power of voluntary, unpaid blood donation as the foundation of a safe blood supply.',
      'Humanity — We treat every donor, patient, and staff member with dignity and compassion.',
      'Confidentiality — We protect the privacy of all donors and patients.',
      'Ethics — We uphold the highest ethical standards in all our operations.',
      'Integrity — We are transparent, honest, and accountable in everything we do.',
      'Professionalism — We deliver services with expertise, dedication, and continuous improvement.',
    ],
  },
};

const team = [
  { name: 'Dr. Almaz Tadesse', role: 'Director General', img: pic },
  { name: 'Dr. Selam Girma', role: 'Medical Director', img: d1 },
  { name: 'Nurse Hiwot Bekele', role: 'Head of Operations', img: d2 },
  { name: 'Tigist Alemu', role: 'Community Outreach Lead', img: d3 },
];

const milestones = [
  { year: '1969', text: 'Blood Bank service established by Ethiopian Red Cross Society' },
  { year: '2012', text: 'Transition to Federal Ministry of Health management' },
  { year: '2014', text: 'Established as independent autonomous federal institution' },
  { year: '2023', text: 'Re-established under Regulation No. 528/2023 with expanded mandate' },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('History');
  const Content = tabContent[activeTab];
  const Icon = Content.icon;

  return (
    <div className='s-home'>
      {/* Hero */}
      <section className="s-hero">
        <div className="s-container s-hero-inner">
          <div className="badge fade-in">
            <span className="dot"></span>
            <span className="badge-text">About Gondar Blood Bank</span>
          </div>

          <h1 className="s-h1 fade-in">
            Pure intentions. <br/>
            Strong clinical care. <br/>
            <em>Saving lives.</em>
          </h1>

          <p className="s-lead fade-in delay-1">
            Gondar Blood Bank helps our community bridge the gap between medical need and life-saving supply with precision, safety, and unwavering commitment. We are a specialized medical team dedicated to supporting local hospitals.
          </p>

          <div className="s-hero-actions fade-in delay-2">
            <a href="#" className="s-btn s-btn-primary">Donate Blood</a>
            <a href="#services" className="s-btn s-btn-ghost">View Impact →</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="about-intro">
        <div className="intro-text">
          <span className="intro-tag">Who We Are</span>
          <h2>Ethiopia's National Blood and Tissue Bank Service</h2>
          <p>
            The Ethiopian Blood and Tissue Bank Service (EBTBS) is the national authority responsible
            for collecting, testing, processing, and distributing safe blood and blood products across Ethiopia.
            With over 50 collection centers nationwide, we are committed to ensuring every patient has access
            to safe blood when they need it most.
          </p>
        </div>
        <div className="intro-image">
          <img src={pic} alt="blood donation" />
        </div>
      </section>

      {/* Tabs */}
      <section className="about-tabs-section">
        <div className="tab-buttons">
          {tabs.map((t) => (
            <button
              key={t}
              className={`tab-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="tab-content">
          <div className="tc-icon"><Icon size={36} /></div>
          <h2>{Content.title}</h2>
          <div className="tc-body">
            {Content.body.map((para, i) => (
              <p key={i}><ChevronRight size={16} className="tc-bullet" />{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <h2 className="about-section-title">Our Journey</h2>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div className={`tl-item ${i % 2 === 0 ? 'left' : 'right'}`} key={i}>
              <div className="tl-card">
                <span className="tl-year">{m.year}</span>
                <p>{m.text}</p>
              </div>
              <div className="tl-dot" />
            </div>
          ))}
          <div className="tl-line" />
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <h2 className="about-section-title">Our Leadership</h2>
        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={i}>
              <div className="tc-avatar">
                <img src={member.img} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="s-section">
        <div className="s-container">
          <div className="s-cta">
            <div>
              <h2 className="s-cta-title">Join Our Mission</h2>
              <p className="s-cta-sub">
                Every donation saves up to three lives. Be part of the change.
              </p>
            </div>
            <a href="#" className="s-btn s-btn-white">Donate Blood Today</a>
          </div>
        </div>
      </section>
    </div>
  );
}
