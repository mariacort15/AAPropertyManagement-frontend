import React, { useState } from "react";
import axios from "axios";
import "./Apply.css";

const Apply = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    property_interested: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/applications/", formData);
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <section className="apply-success">
        <h2>✅ Application Submitted</h2>
        <p>Thank you! Our team will review your application soon.</p>
        <a href="/properties" className="back-btn">
          ← Back to Homes for Rent
        </a>
      </section>
    );
  }

  return (
    <section className="apply-page">
      <div className="apply-container">
        <h1 className="apply-title">Rental Application</h1>
        <p className="apply-intro">
          Please fill out the form below to apply for one of our available
          properties. A member of our team will contact you shortly.
        </p>

        <form onSubmit={handleSubmit} className="apply-form">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Property Interested In</label>
          <input
            type="text"
            name="property_interested"
            placeholder="e.g. 500 Olive St, Bakersfield"
            value={formData.property_interested}
            onChange={handleChange}
          />

          <label>Additional Message</label>
          <textarea
            name="message"
            rows="4"
            placeholder="Tell us a little about yourself..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="submit-btn">
            Submit Application
          </button>

          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Apply;