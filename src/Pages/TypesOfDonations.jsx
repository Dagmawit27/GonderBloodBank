import { Link } from 'react-router-dom';
import './donate-pages.css';

const types = [
  {
    icon: '🩸',
    title: 'Whole Blood',
    freq: 'Every 56 days',
    time: '~1 hour',
    desc: 'The most common type. A pint of whole blood is collected and later separated into components.',
  },
  {
    icon: '🟡',
    title: 'Platelets',
    freq: 'Every 7 days (up to 24x/year)',
    time: '~2.5 hours',
    desc: 'Platelets help blood clot and are critical for cancer patients and those undergoing surgery.',
  },
  {
    icon: '🟠',
    title: 'Plasma',
    freq: 'Every 28 days',
    time: '~1.5 hours',
    desc: 'The liquid part of blood, used to treat burns, shock, and clotting disorders.',
  },
  {
    icon: '🔴',
    title: 'Double Red Cells',
    freq: 'Every 112 days',
    time: '~1.5 hours',
    desc: 'Two units of red cells are collected using an apheresis machine, maximizing each donation.',
  },
];

export default function TypesOfDonations() {
  return (
    <div className="donate-page">
      <div className="donate-hero red-hero">
        <h1>Types of Blood Donations</h1>
        <p>Different patients need different blood components. Find the donation type that's right for you.</p>
      </div>

      <div className="donate-container">
        <div className="types-grid">
          {types.map((t, i) => (
            <div className="type-card" key={i}>
              <div className="type-icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <div className="type-meta">
                <span>🔁 {t.freq}</span>
                <span>⏱ {t.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="action-row">
          <Link to="/make-appointment" className="cta-btn">Donate Now</Link>
          <Link to="/eligibility" className="cta-btn outline">Check Eligibility</Link>
        </div>
      </div>
    </div>
  );
}
