import './contact.css';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const offices = [
  { city: 'Gondar Blood Bank (Main)', address: 'University of Gondar Campus, Gondar, Amhara Region', phone: '+251 58 111 2345', hours: 'Mon–Sun: 8 AM – 5 PM' },
  { city: 'Gondar Town Branch', address: 'Piazza Area, Gondar City', phone: '+251 58 111 3456', hours: 'Mon–Sat: 8 AM – 4 PM' },
  { city: 'University of Gondar Hospital', address: 'UoG Referral Hospital, Gondar', phone: '+251 58 114 1234', hours: 'Mon–Fri: 8 AM – 5 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-text">
          <h1>Contact Us</h1>
          <p>Reach out to Gondar Blood Bank — we're here to help.</p>
        </div>
      </section>

      {/* Main grid */}
      <section className="contact-main">

        {/* Left — info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p className="ci-sub">
            Have a question about blood donation, donor eligibility, or our services in Gondar?
            Our team is ready to assist you.
          </p>

          <div className="ci-cards">
            <div className="ci-card">
              <div className="ci-icon"><MapPin size={22} /></div>
              <div>
                <h4>Address</h4>
                <p>University of Gondar Campus</p>
                <p>Gondar, Amhara Region, Ethiopia</p>
              </div>
            </div>
            <div className="ci-card">
              <div className="ci-icon"><Phone size={22} /></div>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+251581112345">+251 58 111 2345</a></p>
                <p><a href="tel:+251581113456">+251 58 111 3456</a></p>
              </div>
            </div>
            <div className="ci-card">
              <div className="ci-icon"><Mail size={22} /></div>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:info@gondarbloodbank.gov.et">info@gondarbloodbank.gov.et</a></p>
                <p><a href="mailto:donate@gondarbloodbank.gov.et">donate@gondarbloodbank.gov.et</a></p>
              </div>
            </div>
            <div className="ci-card">
              <div className="ci-icon"><Clock size={22} /></div>
              <div>
                <h4>Working Hours</h4>
                <p>Monday – Sunday</p>
                <p>8:00 AM – 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Branches */}
          <div className="ci-offices">
            <h3>Our Locations</h3>
            {offices.map((o, i) => (
              <div className="office-row" key={i}>
                <div className="office-dot" />
                <div>
                  <strong>{o.city}</strong>
                  <span>{o.address}</span>
                  <span>{o.phone} &nbsp;·&nbsp; {o.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success">
              <CheckCircle size={52} className="success-icon" />
              <h3>Message Sent!</h3>
              <p>Thank you for contacting Gondar Blood Bank. Our team will get back to you within 24 hours.</p>
              <button className="cf-btn" onClick={() => setSubmitted(false)}>Send Another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send a Message</h2>
              <p className="form-sub">Fill in the form and we'll respond as soon as possible.</p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" placeholder="Your full name"
                    value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com"
                    value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject" value={form.subject} onChange={handleChange} required>
                  <option value="">Select a subject</option>
                  <option value="donation">Blood Donation Inquiry</option>
                  <option value="eligibility">Donor Eligibility</option>
                  <option value="centers">Donation Centers in Gondar</option>
                  <option value="partnership">Partnership / Volunteering</option>
                  <option value="emergency">Emergency Blood Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5}
                  placeholder="Write your message here..."
                  value={form.message} onChange={handleChange} required />
              </div>

              <button type="submit" className="cf-btn">
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Map placeholder */}
      <section className="contact-map">
        <div className="map-placeholder">
          <MapPin size={40} className="map-pin-icon" />
          <p>University of Gondar Campus, Gondar, Ethiopia</p>
          <span>Gondar Blood Bank — Main Office</span>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-cta">
        <h2>Ready to Save a Life?</h2>
        <p>Visit Gondar Blood Bank today and make a difference in your community.</p>
        <button className="cta-donate">Donate Blood Now</button>
      </section>
    </>
  );
}
