import { Link, NavLink } from 'react-router-dom';
import PortalLinks from '../sections/PortalLinks.jsx';

export default function Header(){
  return (
    <header aria-label="Site Header">
      <div className="container row between center">
        <Link to="/" className="logo" aria-label="AA Property Management Home">
          AA Property Management
        </Link>
        <nav aria-label="Primary">
          <ul className="nav">
            <li><NavLink to="/rentals">Homes for Rent</NavLink></li>
            <li><NavLink to="/owners">Owners</NavLink></li>
            <li><NavLink to="/tenants">Tenants</NavLink></li>
            <li><NavLink to="/pricing">Pricing</NavLink></li>
            <li><NavLink to="/testimonials">Testimonials</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
        <PortalLinks compact />
      </div>
    </header>
  );
}