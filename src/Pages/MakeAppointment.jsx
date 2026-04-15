import { useState } from 'react';
import './appointment.css';
import { Droplet, MapPin, Clock, CheckCircle, ArrowLeft } from 'lucide-react';

export default function makeAppointment() {
  // State to track if the form was submitted
  const [submitted, setSubmitted] = useState(false);
  
  // State for form fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    bloodType: "Don't know",
    date: '',
    time: '09:00 AM'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // If the user submitted the form, show the success message
  if (submitted) {
    return (
      <div className="appointment-page">
        <style>{styles}</style>
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Appointment Scheduled!</h2>
          <p>We've reserved your slot at the <strong>Ayra Azezo center</strong>. See you there, {formData.fullName.split(' ')[0]}!</p>
          <button className="back-btn" onClick={() => setSubmitted(false)}>
            Schedule Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        <header className="page-header">
          <h1>Schedule your donation</h1>
          <p>Choose a convenient time to help save lives.</p>
        </header>

        <div className="main-content">
          {/* Information Section */}
          <aside className="info-sidebar">
            <div className="card">
              <h3 className="card-title"><MapPin size={18} className="icon-red" /> Primary Center</h3>
              <p className="center-name">Ayra Azezo Center</p>
              <p className="address">Gondar, Ethiopia<br />Near Azezo Airport Road</p>
              
              <div className="divider"></div>
              
              <h3 className="card-title"><Clock size={18} className="icon-blue" /> Hours</h3>
              <p className="hours">Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p className="hours">Sat: 9:00 AM - 1:00 PM</p>
            </div>

            <div className="tip-card">
              <h3>Pre-Donation Tip</h3>
              <p>Remember to drink plenty of water and have a light meal before your arrival.</p>
            </div>
          </aside>

          {/* Form Section */}
          <section className="form-section">
            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="John Doe" 
                    required 
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+251 9..." 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Blood Type (Optional)</label>
                <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
                  <option>Don't know</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input 
                    type="date" 
                    name="date"
                    required 
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time</label>
                  <select name="time" value={formData.time} onChange={handleChange}>
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Schedule Appointment <CheckCircle size={18} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

