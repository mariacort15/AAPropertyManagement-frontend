import React from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <section
      className="hero-banner text-center text-white d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage:
          'url(\'https://images.unsplash.com/photo-1570129477492-45c003edd2be\')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
      }}
    >
      <div className="overlay p-3 rounded">
        <h1 className="display-5 fw-bold">Welcome to AA Property Management</h1>
        <p className="lead">Reliable. Professional. Local expertise you can trust.</p>

        <div className="d-flex gap-3 mt-3 justify-content-center">
          <button
            className="btn btn-light"
            onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
          >
            View Rentals
          </button>

          <Link to="/apply" className="btn btn-success">
            Apply Online
          </Link>
        </div>
      </div>
    </section>
  );
}