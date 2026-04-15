import './donate-pages.css';

const facts = [
  { icon: '🩸', title: 'Blood Types', desc: 'There are 8 main blood types: A+, A−, B+, B−, AB+, AB−, O+, O−. Type O− is the universal donor.' },
  { icon: '💧', title: 'Blood Composition', desc: 'Blood is made of red cells, white cells, platelets, and plasma — each serving a vital function.' },
  { icon: '🔄', title: 'Blood Regeneration', desc: 'Your body replaces donated plasma within 24 hours and red blood cells within 4–6 weeks.' },
  { icon: '📊', title: 'Blood Supply', desc: 'Every 2 seconds someone in the world needs blood. One donation can save up to 3 lives.' },
  { icon: '🧬', title: 'Rare Blood Types', desc: 'AB− is the rarest blood type, found in less than 1% of the population.' },
  { icon: '❤️', title: 'Why It Matters', desc: 'Blood cannot be manufactured — it can only come from generous donors like you.' },
];

export default function LearnAboutBlood() {
  return (
    <div className="donate-page">
      <div className="donate-hero red-hero">
        <h1>Learn About Blood</h1>
        <p>Understanding blood helps you appreciate the incredible impact of every donation.</p>
      </div>

      <div className="donate-container">
        <div className="facts-grid">
          {facts.map((f, i) => (
            <div className="fact-card" key={i}>
              <div className="fact-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="info-box">
          <h3>Blood Type Compatibility</h3>
          <div className="compat-table">
            <table>
              <thead><tr><th>Blood Type</th><th>Can Donate To</th><th>Can Receive From</th></tr></thead>
              <tbody>
                <tr><td>O−</td><td>All types</td><td>O−</td></tr>
                <tr><td>O+</td><td>O+, A+, B+, AB+</td><td>O+, O−</td></tr>
                <tr><td>A−</td><td>A−, A+, AB−, AB+</td><td>A−, O−</td></tr>
                <tr><td>A+</td><td>A+, AB+</td><td>A+, A−, O+, O−</td></tr>
                <tr><td>B−</td><td>B−, B+, AB−, AB+</td><td>B−, O−</td></tr>
                <tr><td>B+</td><td>B+, AB+</td><td>B+, B−, O+, O−</td></tr>
                <tr><td>AB−</td><td>AB−, AB+</td><td>A−, B−, AB−, O−</td></tr>
                <tr><td>AB+</td><td>AB+</td><td>All types</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
