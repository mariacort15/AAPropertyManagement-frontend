import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// If you enabled SimpleJWT blacklist, keep this; otherwise delete the next line.
import api from '../lib/api';

export default function LogoutButton({
  confirm = true,
  className = 'btn btn-outline-danger btn-sm ms-2',
  children = 'Logout',
}) {
  const { logout, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    if (!user) return;
    if (confirm && !window.confirm('Log out now?')) return;

    setLoading(true);
    try {
      // OPTIONAL: invalidate refresh token server-side if you added the blacklist app + route
      const refresh = localStorage.getItem('refresh');
      if (refresh) {
        try { await api.post('/token/blacklist/', { refresh }); } catch { /* ignore */ }
      }

      logout(); // clears tokens + user in your AuthContext
      navigate('/login', { replace: true, state: { from: location.pathname } });
    } finally {
      setLoading(false);
    }
  };

  // hide the button if not logged in
  if (!user) return null;

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={className}
      disabled={loading}
      aria-label="Log out"
      title="Log out"
    >
      {loading ? 'Logging out…' : children}
    </button>
  );
}