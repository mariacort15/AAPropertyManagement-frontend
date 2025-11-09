import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Column */}
        <div className="footer-column company">
          <h3>AA Property Advisors, Inc.</h3>
          <p>AA Property Management</p>
          <p>License #02220868</p>
        </div>

        {/* Middle Columns */}
        <div className="footer-column">
          <h4>OWNERS</h4>
          <ul>
            <li><a href="#">Owner Resources</a></li>
            <li><a href="#">Owner FAQs</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Owner Portal</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>TENANTS</h4>
          <ul>
            <li><a href="#">Tenant Resources</a></li>
            <li><a href="#">Tenant FAQs</a></li>
            <li><a href="#">Maintenance</a></li>
            <li><a href="#">Tenant Portal</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-column contact">
          <h4>CONTACT</h4>
          <p>5060 California Ave Ste 610<br/>Bakersfield, CA 93309</p>
          <p>(661) 847-9396</p>
          <p><a href="mailto:info@aapropertymanagement.com">
            info@aamancepropertymanagement.com
          </a></p>
        </div>

        {/* Social Column */}
        <div className="footer-column social">
          <h4>SOCIAL</h4>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Facebook">📘</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AA Property Management. All rights reserved.</p>
      </div>
    </footer>
  );
}