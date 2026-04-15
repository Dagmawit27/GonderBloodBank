import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './donate-pages.css';

export default function ManageDonations() {
  const [donations] = useState([
    { id: 1, date: '2024-03-15', center: 'Addis Ababa Blood Bank', type: 'Whole Blood', status: 'Completed' },
    { id: 2, date: '2024-06-20', center: 'Gondar University Hospital', type: 'Platelets', status: 'Completed' },
    { id: 3, date: '2024-09-10', center: 'Addis Ababa Blood Bank', type: 'Whole Blood', status: 'Upcoming' },
  ]);

  const username = sessionStorage.getItem('username') || 'Donor';

  return (
    <div className="donate-page">
      <div className="donate-hero red-hero">
        <h1>My Donations</h1>
        <p>Welcome back, <strong>{username}</strong>. Here's your donation history.</p>
      </div>

      <div className="donate-container">
        <div className="stats-row">
          <div className="stat-card"><span>{donations.filter(d=>d.status==='Completed').length}</span><small>Total Donations</small></div>
          <div className="stat-card"><span>3</span><small>Lives Impacted</small></div>
          <div className="stat-card"><span>{donations.filter(d=>d.status==='Upcoming').length}</span><small>Upcoming</small></div>
        </div>

        <div className="section-card">
          <h2>Donation History</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Date</th><th>Center</th><th>Type</th><th>Status</th></tr>
              </thead>
              <tbody>
                {donations.map(d => (
                  <tr key={d.id}>
                    <td>{d.date}</td>
                    <td>{d.center}</td>
                    <td>{d.type}</td>
                    <td><span className={`badge ${d.status.toLowerCase()}`}>{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="action-row">
          <Link to="/make-appointment" className="cta-btn">Schedule New Donation</Link>
          <Link to="/manage-appointment" className="cta-btn outline">Manage Appointments</Link>
        </div>
      </div>
    </div>
  );
}
