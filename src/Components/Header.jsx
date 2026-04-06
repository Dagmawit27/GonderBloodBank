import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/blood-logo.png';
import {Menu, X} from 'lucide-react';
import './header.css'

export default function Header(){
  const [isOpen, setIsOpen] = useState(false);
  const [isDMenu, setDMenu] = useState(false);
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
          <div className='donate-menu'>
            <div onClick={(e)=>{setDMenu(!isDMenu)}}>
              <button className='d-button'>Donate Blood</button>
            </div>  
            <div>
              <button className='lang-btn'>Lang</button>  
            </div>         
          </div>
          <div className="navMenu">            
            <button  onClick={()=>{setIsOpen(!isOpen)}}>{isOpen ? <X size={30} /> : <Menu size={30} />}</button>
          </div>
        </div>        
      </div>
      {isDMenu && 
      <div className="dm-dropdown">
        <div className="col-dm">
          <Link to={'/take'}>Manage My Donations</Link>
          <Link to={'/take'}>Schedule an Appointment</Link>
          <Link to={'/take'}>Manage Existing Appointment</Link>
        </div>
        <div className="col-dm">
          <Link to={'/take'}>How to Donate</Link>
          <Link to={'/take'}>Eligibility Requirements</Link>
          <Link to={'/take'}>Types of Blood Donations</Link>
          <Link to={'/take'}>Learn About Blood</Link>
          <Link to={'/take'}>How Blood Donations Help</Link>
          <Link to={'/take'}>Comment Concerns</Link>
        </div>
        <div className="col-dm">
          <Link to={'/take'}>Blood Donation Process</Link>
          <Link to={'/take'}>Donation Process Overview</Link>
          <Link to={'/take'}>What to do Before, During and After</Link>
          <Link to={'/take'}>What Happens to Donated Blood</Link>
          <Link to={'/take'}>Iron and Blood Donation</Link>
        </div>
      </div>
      }
    </>
  );
}