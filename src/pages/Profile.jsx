import React, { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('users/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading your profile...</p>;
  }

  if (!user) {
    return <p className="text-center mt-5 text-danger">Unable to load user info.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome back, {user.first_name || user.username} 👋</h2>
      <hr />
      <div className="card p-3 mt-3 shadow-sm">
        <h5>Your Profile Details</h5>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
        <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => alert('Feature coming soon!')}
        >
          Edit Profile
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => alert('Feature coming soon!')}
        >
          View My Rentals
        </button>
      </div>
    </div>
  );
}