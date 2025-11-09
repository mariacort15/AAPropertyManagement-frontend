import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Owners from './pages/Owners';
import Tenants from './pages/Tenants';
import Pricing from './pages/Pricing';
import Testimonials from './pages/TestimonialsPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import React from 'react';
import Login from './pages/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LogoutButton from './components/LogoutButton';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <header style={{
          backgroundColor: '#00796b',
          color: 'white',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>AA Property Management</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/properties">Properties</Link> | <Link to="/contact">Contact</Link>

          {!isAuthenticated && (
            <a href="/login" className="text-white mx-2">
              Login
            </a>
          )}
          {isAuthenticated && (
            <>
            <a link to="/profile" className="text-white mx-2">
            </a><LogoutButton />
            </>
          )}
        </nav>
      </header>

      <main className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>

      <footer>
        <p>&copy; 2025 AA Property Management</p>
      </footer>
    </>
  );
}

export default App;