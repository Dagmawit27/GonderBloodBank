import { Link } from 'react-router-dom';
import './donate-pages.css';

const impacts = [
  { icon: '🏥', title: 'Trauma & Surgery', desc: 'Accident victims and surgical patients often need large amounts of blood quickly to survive.' },
  { icon: '👶', title: 'Newborns', desc: 'Premature babies and those with blood disorders depend on transfusions to survive their first days.' },
  { icon: '🎗️', title: 'Cancer Patients', desc: 'Chemotherapy destroys blood cells. Cancer patients may need transfusions every few days.' },
  { icon: '🧬', title: 'Sickle Cell Disease', desc: 'Patients with sickle cell disease require regular transfusions throughout their lives.' },
  { icon: '🔥', title: 'Burn Victims', desc: 'Severe burns require plasma transfusions to replace lost fluids and proteins.' },
  { icon: '🤰', title: 'Maternal Health', desc: 'Complications during childbirth are a leading cause of maternal death — blood saves mothers.' },
];

export default function HowDonationsHelp() {
  return (
    <div className="donate-page">
      <div className="donate-hero red-hero">
        <h1>How Blood Donations Help</h1>
        <p>Your single donation can save up to 3 lives. Here's who you're helping.</p>
      </div>

      <div className="donate-container">
        <div className="facts-grid">
          {impacts.map((item, i) => (
            <div className="fact-card" key={i}>
              <div className="fact-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="impact-banner">
          <div className="impact-stat"><span>4.5M</span><small>People need blood transfusions each year</small></div>
          <div className="impact-stat"><span>3</span><small>Lives saved per donation</small></div>
          <div className="impact-stat"><span>38%</span><small>Of population is eligible to donate</small></div>
        </div>

        <div className="action-row">
          <Link to="/make-appointment" className="cta-btn">Donate Today</Link>
        </div>
      </div>
    </div>
  );
}
