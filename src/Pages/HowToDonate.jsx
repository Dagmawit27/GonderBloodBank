import { Link } from 'react-router-dom';
import './donate-pages.css';

const steps = [
  { icon: '📋', title: 'Check Eligibility', desc: 'Make sure you meet the basic requirements: age 18–65, weight ≥ 50 kg, and good health.' },
  { icon: '📅', title: 'Schedule Appointment', desc: 'Book a convenient time at your nearest donation center online or by phone.' },
  { icon: '🥤', title: 'Prepare', desc: 'Drink plenty of water, eat a healthy meal, and get a good night\'s sleep before donating.' },
  { icon: '🩸', title: 'Donate', desc: 'The actual blood draw takes only 8–10 minutes. The whole visit is about an hour.' },
  { icon: '🍪', title: 'Recover', desc: 'Enjoy refreshments, rest for 15 minutes, and resume normal activities the same day.' },
];

export default function HowToDonate() {
  return (
    <div className="donate-page">
      <div className="donate-hero red-hero">
        <h1>How to Donate Blood</h1>
        <p>Donating blood is simple, safe, and saves lives. Here's everything you need to know.</p>
      </div>

      <div className="donate-container">
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-icon">{s.icon}</div>
              <div className="step-num">Step {i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="info-box">
          <h3>What to bring</h3>
          <ul>
            <li>Valid photo ID</li>
            <li>List of any medications you're taking</li>
            <li>Comfortable clothing with sleeves that roll up easily</li>
          </ul>
        </div>

        <div className="action-row">
          <Link to="/make-appointment" className="cta-btn">Schedule Your Donation</Link>
          <Link to="/eligibility" className="cta-btn outline">Check Eligibility</Link>
        </div>
      </div>
    </div>
  );
}
