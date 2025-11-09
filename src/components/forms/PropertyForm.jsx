import React, { useState } from 'react';
import './PropertyForm.css';

const PropertyForm = () => {
  const [title, setTitle] = useState('');
  const [rent, setRent] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`New property added: ${title}, Rent: $${rent}`);
    setTitle('');
    setRent('');
    setAddress('');
  };

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h2>Add a New Property</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Property Title" required />
      <input value={rent} onChange={(e) => setRent(e.target.value)} placeholder="Monthly Rent" type="number" required />
      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
      <button type="submit">Add Property</button>
    </form>
  );
};

export default PropertyForm;