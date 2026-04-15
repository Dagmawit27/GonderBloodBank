import { useState } from 'react';
import { Link } from 'react-router-dom';
import './donate-pages.css';

export default function ManageAppointment() {
  const [appointments] = useState([
    { id: 1, date: '2024-09-10', time: '10:00 AM', center: 'Addis Ababa Blood Bank', type: 'Whole Blood', status: 'Confirmed' },
    { id: 2, date: '2024-10-05', time: '02:30 PM', center: 'Gondar University Hospital', type: 'Platelets', status: 'Pending' },
  ]);

  return (
    <div className="donate-page">
      <div className="donate-hero red-hero">
        <h1>Manage Appointments</h1>
        <p>View, reschedule, or cancel your existing donation appointments.</p>
      </div>

      <div className="donate-container">
        {appointments.length === 0 ? (
          <div className="empty-state">
            <span>📅</span>
            <p>No appointments found.</p>
            <Link to="/make-appointment" className="cta-btn">Schedule One Now</Link>
          </div>
        ) : (
          <div className="appt-list">
            {appointments.map(a => (
              <div className="appt-card" key={a.id}>
                <div className="appt-date">
                  <strong>{a.date}</strong>
                  <small>{a.time}</small>
                </div>
                <div className="appt-details">
                  <p>{a.center}</p>
                  <small>{a.type}</small>
                </div>
                <span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span>
                <div className="appt-actions">
                  <button className="appt-btn">Reschedule</button>
                  <button className="appt-btn danger">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="action-row" style={{marginTop:'2rem'}}>
          <Link to="/make-appointment" className="cta-btn">+ New Appointment</Link>
        </div>
      </div>
    </div>
  );
}
