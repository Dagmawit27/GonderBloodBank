import { Link } from 'react-router-dom';
import './donate-pages.css';

const eligible = [
  'Age between 18 and 65 years',
  'Weight at least 50 kg (110 lbs)',
  'Hemoglobin level ≥ 12.5 g/dL',
  'No fever or active infection',
  'No donation in the last 56 days (whole blood)',
  'Good general health on the day of donation',
];

const notEligible = [
  'Currently pregnant or recently gave birth (6 months)',
  'Had a tattoo or piercing in the last 6 months',
  'Tested positive for HIV, Hepatitis B or C',
  'Taking blood thinners or certain antibiotics',
  'Recent surgery or major illness',
  'History of certain cancers or blood disorders',
];

export default function Eligibility() {
  return (
    <div className="donate-page">
      <div className="donate-hero red-hero">
        <h1>Eligibility Requirements</h1>
        <p>Find out if you're ready to donate and help save lives today.</p>
      </div>

      <div className="donate-container">
        <div className="two-col">
          <div className="section-card green-card">
            <h2>✅ You Can Donate If...</h2>
            <ul className="check-list">
              {eligible.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="section-card red-card">
            <h2>❌ Temporary Deferrals</h2>
            <ul className="check-list">
              {notEligible.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="info-box">
          <h3>Not sure?</h3>
          <p>Our staff at the donation center will conduct a brief health screening before every donation. When in doubt, come in and we'll help you determine your eligibility.</p>
        </div>

        <div className="action-row">
          <Link to="/make-appointment" className="cta-btn">Schedule Appointment</Link>
        </div>
      </div>
    </div>
  );
}
