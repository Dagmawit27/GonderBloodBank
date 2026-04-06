import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/blood-logo.png';
import { Menu, X, ChevronDown } from 'lucide-react';
import './header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDMenu, setDMenu] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const pages = [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: '/about' },
    { name: 'News', to: '/news' },
    { name: 'Blog', to: '/blog' },
    { name: 'Contact', to: '/contact' },
  ];

  const donateLinks = [
    {
      heading: 'My Donations',
      links: [
        { label: 'Manage My Donations', to: '/take' },
        { label: 'Schedule an Appointment', to: '/take' },
        { label: 'Manage Existing Appointment', to: '/take' },
      ],
    },
    {
      heading: 'Learn',
      links: [
        { label: 'How to Donate', to: '/take' },
        { label: 'Eligibility Requirements', to: '/take' },
        { label: 'Types of Blood Donations', to: '/take' },
        { label: 'Learn About Blood', to: '/take' },
        { label: 'How Blood Donations Help', to: '/take' },
        { label: 'Comment Concerns', to: '/take' },
      ],
    },
    {
      heading: 'The Process',
      links: [
        { label: 'Blood Donation Process', to: '/take' },
        { label: 'Donation Process Overview', to: '/take' },
        { label: 'Before, During and After', to: '/take' },
        { label: 'What Happens to Donated Blood', to: '/take' },
        { label: 'Iron and Blood Donation', to: '/take' },
      ],
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDMenu(false);
  }, [location.pathname]);

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Blood Logo" /></Link>
        </div>

        {/* Desktop nav */}
        <div className="list">
          <ul>
            {pages.map((item, index) => (
              <Link to={item.to} key={index}>
                <li className={location.pathname === item.to ? 'active' : ''}>
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>

          <div className="donate-menu">
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                className="d-button"
                onClick={() => setDMenu(!isDMenu)}
                aria-expanded={isDMenu}
                aria-haspopup="true"
              >
                Donate Blood <ChevronDown size={16} className={`chevron ${isDMenu ? 'open' : ''}`} />
              </button>

              {/* Donate dropdown — desktop */}
              {isDMenu && (
                <div className="dm-dropdown">
                  {donateLinks.map((col, i) => (
                    <div className="col-dm" key={i}>
                      <span className="col-heading">{col.heading}</span>
                      {col.links.map((link, j) => (
                        <Link to={link.to} key={j} onClick={() => setDMenu(false)}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="lang-btn">Lang</button>
          </div>
        </div>

        {/* Hamburger */}
        <div className="navMenu">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isOpen ? 'mobile-open' : ''}`}>
        <ul>
          {pages.map((item, index) => (
            <Link to={item.to} key={index} onClick={() => setIsOpen(false)}>
              <li className={location.pathname === item.to ? 'active' : ''}>
                {item.name}
              </li>
            </Link>
          ))}
        </ul>

        <div className="mobile-donate-section">
          <button
            className="mobile-donate-toggle"
            onClick={() => setDMenu(!isDMenu)}
          >
            Donate Blood <ChevronDown size={16} className={`chevron ${isDMenu ? 'open' : ''}`} />
          </button>

          {isDMenu && (
            <div className="mobile-donate-links">
              {donateLinks.map((col, i) => (
                <div key={i}>
                  <span className="col-heading">{col.heading}</span>
                  {col.links.map((link, j) => (
                    <Link to={link.to} key={j} onClick={() => { setIsOpen(false); setDMenu(false); }}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="lang-btn mobile-lang">Lang</button>
      </div>
    </>
  );
}
