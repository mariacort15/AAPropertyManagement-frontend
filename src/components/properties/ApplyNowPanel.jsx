import React, { useState } from 'react';
import { post } from '../../lib/api';
import './ApplyNowPanel.css';
import { apiRequest } from "../../api/apiClient";

export default function Apply() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest("/applications/", {
        method: "POST",
        body: JSON.stringify({
          property: property.id,
          tenant_name: form.name,
          tenant_email: form.email,
          message: form.message,
        }),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        alert("Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="apply-container">
      <h1>Apply Online</h1>
      <p>Fill out this quick form and our team will contact you soon.</p>

      <form onSubmit={handleSubmit} className="apply-form">
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email Address:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us which property you're interested in..."
          />
        </label>

        <button type="submit" className="submit-btn">SUBMIT APPLICATION</button>
      </form>

      {status && <p className="status-message">{status}</p>}
    </div>
  );
}