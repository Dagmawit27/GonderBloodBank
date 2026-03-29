import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/blood-logo.png';
import {Menu, X} from 'lucide-react';
import './header.css'

export default function Header(){
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const page = [{
    name: 'Home', to: '/'
  }, {
    name: 'About Us', to: '/about'
  }, {
    name: 'News', to: '/news'
  }, {
    name: 'Blog', to: '/blog'
  },{
    name: 'Contact', to: '/contact'
  }, {
    name: 'FAQ', to: '/faq'
  }]
  return(
    <>
      <div className="navbar">
        <div className="logo">
          <img src= {logo} alt="Blood Logo" />
        </div>
        <div className="list">
          <ul>
            {page.map((items, index)=>(
              <Link to={items.to}  key={index}>
                <li className={`${location.pathname === items.to ? 'active' : ''}`}>{items.name}</li>
              </Link>
            ))}
          </ul>
          <div className="navMenu">
            <button  onClick={()=>{setIsOpen(!isOpen)}}>{isOpen ? <X size={30} /> : <Menu size={30} />}</button>
          </div>
        </div>        
      </div>
    </>
  );
}