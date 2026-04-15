import { useState } from 'react';
import './donate-pages.css';

const faqs = [
  { q: 'Does donating blood hurt?', a: 'You may feel a brief pinch when the needle is inserted, but most donors report little to no discomfort during the donation.' },
  { q: 'How long does it take?', a: 'The whole process takes about 1 hour, including registration, health screening, donation (8–10 min), and refreshments.' },
  { q: 'How often can I donate?', a: 'Whole blood: every 56 days. Platelets: every 7 days. Plasma: every 28 days.' },
  { q: 'Will I feel weak after donating?', a: 'Most donors feel fine. Drink extra fluids and avoid strenuous activity for the rest of the day.' },
  { q: 'Is my blood tested?', a: 'Yes. Every donation is tested for blood type and screened for infectious diseases before use.' },
];

export default function CommentConcerns() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="donate-page">
      <div className="donate-hero red-hero">
        <h1>Comments & Concerns</h1>
        <p>Have a question or concern? We're here to help.</p>
      </div>

      <div className="donate-container">
        {/* FAQ */}
        <div className="section-card">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details className="faq-item" key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="section-card" style={{marginTop:'2rem'}}>
          <h2>Send Us a Message</h2>
          {sent ? (
            <div className="success-msg">
              ✅ Thank you! We'll get back to you within 1–2 business days.
            </div>
          ) : (
            <form className="concern-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field-group">
                  <label>Full Name</label>
                  <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="field-group">
                  <label>Email</label>
                  <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="field-group">
                <label>Subject</label>
                <input name="subject" placeholder="What is this about?" value={form.subject} onChange={handleChange} />
              </div>
              <div className="field-group">
                <label>Message</label>
                <textarea name="message" rows={5} placeholder="Describe your concern..." value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="cta-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
