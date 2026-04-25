import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";
import logo from '../assets/blood-logo.png';
import { Menu, X, ChevronDown, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import './header.css';

const donateGroups = [
  {
    heading: 'Service',
    links: [
      { label: 'Our Service',       to: '/service' },
      { label: 'About Us',    to: '/about' },
      { label: 'Contact',    to: '/contact'}
    ],
  },
  {
    heading: 'My Donations',
    links: [
      { label: 'Schedule an Appointment',    to: '/make-appointment#appointment-form' },
      { label: 'Manage Existing Appointment',to: '/make-appointment#manage-appointment' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'How to Donate',           to: '/learn-about-blood#how-to-donate' },
      { label: 'Eligibility Requirements',to: '/learn-about-blood#eligibility' },
      { label: 'Types of Blood Donations',to: '/learn-about-blood#types-of-donations' },
      { label: 'Learn About Blood',       to: '/learn-about-blood#about-blood' },
      { label: 'How Blood Donations Help',to: '/learn-about-blood#impact' },
      { label: 'Comment Concerns',        to: '/learn-about-blood#comments' },
    ],
  },
  {
    heading: 'The Process',
    links: [
      { label: 'Blood Donation Process',       to: '/process#introduction' },
      { label: 'Donation Process Overview',    to: '/process#overview' }, 
      { label: 'Before, During and After',     to: '/process#before-during-after' },
      { label: 'What Happens to Donated Blood',to: '/process#what-happens' },
      { label: 'Iron and Blood Donation',      to: '/process#iron' },
    ],
  },
  {
    heading: 'News',
    links: [
      { label: 'Update News',       to: '/news' },
      { label: 'Blog',    to: '/blog' },
    ],
  },
];


export default function Header() {
  const [isOpen, setIsOpen]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser]           = useState(null);
  const location  = useLocation();
  const navigate  = useNavigate();
  const profileRef = useRef(null);

  const pages = [
    { name: 'Service',     to: '/service' },
    { name: 'About Us', to: '/about' },
    { name: 'Contact',  to: '/contact' },
  ];

  // Sync user from sessionStorage on every route change
  useEffect(() => {
    const username = sessionStorage.getItem('username');
    const email    = sessionStorage.getItem('email');
    setUser(username ? { username, email } : null);
    setIsOpen(false);
    setMobileOpen(null);
    setProfileOpen(false);
  }, [location.pathname]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    setProfileOpen(false);
    navigate('/');
  };

  const toggleMobileGroup = (i) =>
    setMobileOpen(mobileOpen === i ? null : i);

  // Avatar initials
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : '';

  return (
    <div className='header '>
     {/* Top utility bar */}
      <div className="h-topbar">
        <div className="h-topbar-inner">
          <div>
            📞 24/7 Emergency Hotline: <a href="tel:+251000000000">+251 (0) 58 111 0000</a>
            &nbsp;·&nbsp; ✉ <a href="mailto:contact@gonderbloodbank.org">contact@gonderbloodbank.org</a>
          </div>
          <div className="h-topbar-langs">
            <span className="active">EN</span>
            <span>አማ</span>
            <span>FR</span>
          </div>
        </div>
      </div>
      <div className="navbar">
        <div className="logo-wrap">
          <div className="logo">
            <Link to="/"><img src={logo} alt="Blood Logo" /></Link>
          </div>
          <div className='logo-text'>
            <span >Gondar</span>
            <p>Blood Bank Service</p>
          </div>
        </div>
        

        {/* Desktop nav */}
        <nav className="list">
          <ul>
            {donateGroups.map((group, i) => (
              <li className="nav-dropdown-item" key={`dg-${i}`}>
                <span className= "nav-dropdown-trigger" >
                  {group.heading} <ChevronDown size={13} className="chevron" />
                </span>
                <div className="nav-dropdown-panel">
                  {group.links.map((link, j) => (
                    <HashLink smooth to={link.to} key={j} >{link.label}</HashLink>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* Auth area */}
          {user ? (
            <div className="profile-wrap" ref={profileRef}>
              <button
                className="avatar-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
              >
                <span className="avatar">{initials}</span>
                <span className="avatar-name">{user.username}</span>
                <ChevronDown size={14} className={`chevron ${profileOpen ? 'open' : ''}`} />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <span className="avatar lg">{initials}</span>
                    <div>
                      <strong>{user.username}</strong>
                      <small>{user.email}</small>
                    </div>
                  </div>
                  <div className="profile-divider" />
                  <Link to="/profile" className="profile-link" onClick={() => setProfileOpen(false)}>
                    <LayoutDashboard size={15} /> My Dashboard
                  </Link>
                  <Link to="/settings" className="profile-link" onClick={() => setProfileOpen(false)}>
                    <Settings size={15} /> Settings
                  </Link>
                  <div className="profile-divider" />
                  <button className="profile-logout" onClick={handleLogout}>
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </nav>

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
          {pages.map((item, i) => (
            <Link to={item.to} key={i} onClick={() => setIsOpen(false)}>
              <li className={location.pathname === item.to ? 'active' : ''}>
                {item.name}
              </li>
            </Link>
          ))}
        </ul>

        <div className="mobile-donate-groups">
          {donateGroups.map((group, i) => (
            <div className="mobile-group" key={i}>
              <button
                className="mobile-group-toggle"
                onClick={() => toggleMobileGroup(i)}
              >
                {group.heading}
                <ChevronDown size={15} className={`chevron ${mobileOpen === i ? 'open' : ''}`} />
              </button>
              {mobileOpen === i && (
                <div className="mobile-group-links">
                  {group.links.map((link, j) => (
                    <HashLink
                      smooth
                      to={link.to}
                      key={j}
                      onClick={() => { setIsOpen(false); setMobileOpen(null); }}
                    >
                      {link.label}
                    </HashLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile auth */}
        {user ? (
          <div className="mobile-profile">
            <div className="mobile-profile-info">
              <span className="avatar">{initials}</span>
              <div>
                <strong>{user.username}</strong>
                <small>{user.email}</small>
              </div>
            </div>
            <Link to="/profile"  className="mobile-profile-link" onClick={() => setIsOpen(false)}>
              <LayoutDashboard size={15} /> My Dashboard
            </Link>
            <Link to="/settings" className="mobile-profile-link" onClick={() => setIsOpen(false)}>
              <Settings size={15} /> Settings
            </Link>
            <button className="mobile-logout" onClick={handleLogout}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="mobile-login-btn" onClick={() => setIsOpen(false)}>
            <User size={15} /> Login
          </Link>
        )}
      </div>
    </div>
  );
}
