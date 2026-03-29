import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Droplets, Heart } from 'lucide-react';
import './footer.css';
import logo from '../assets/blood-logo.png';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* top donate strip */}
      <div className="footer-strip">
        <div className="fs-left">
          <Heart size={20} className="fs-heart" />
          <span>Every 2 seconds someone needs blood. Your donation saves lives.</span>
        </div>
        <button className="fs-btn">Donate Now</button>
      </div>

      <div className="footer-body">
        {/* brand */}
        <div className="footer-brand">
          <div className="fb-logo">
            <img src={logo} alt="EBTBS Logo" />
            <span>EBTBS</span>
          </div>
          <p>
            Ethiopian Blood and Tissue Bank Service — providing safe, adequate, and
            quality-assured blood products to all in need since 1969.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"  className="social-icon"><Facebook  size={17} /></a>
            <a href="#" aria-label="Instagram" className="social-icon"><Instagram size={17} /></a>
            <a href="#" aria-label="Twitter"   className="social-icon"><Twitter   size={17} /></a>
            <a href="#" aria-label="YouTube"   className="social-icon"><Youtube   size={17} /></a>
          </div>
        </div>

        {/* quick links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/blog">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* services */}
        <div className="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li><a href="#">Blood Banking</a></li>
            <li><a href="#">Eye Banking</a></li>
            <li><a href="#">Stem Cell Banking</a></li>
            <li><a href="#">Tissue Banking</a></li>
            <li><a href="#">Donor Registration</a></li>
          </ul>
        </div>

        {/* contact */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <MapPin size={15} />
              <span>Addis Ababa, Ethiopia</span>
            </li>
            <li>
              <Phone size={15} />
              <a href="tel:+251111234567">+251 11 123 4567</a>
            </li>
            <li>
              <Mail size={15} />
              <a href="mailto:info@ebtbs.gov.et">info@ebtbs.gov.et</a>
            </li>
          </ul>
          <div className="footer-hours">
            <Droplets size={14} className="hours-icon" />
            <span>Donation Centers open 7 days a week, 8 AM – 5 PM</span>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="footer-bottom">
        <p>© {year} Ethiopian Blood and Tissue Bank Service. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
