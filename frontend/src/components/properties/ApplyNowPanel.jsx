import React, { useState } from "react";
import { post } from "../../lib/api";
import "./Apply.css";

export default function Apply() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await post(`${process.env.REACT_APP_API_URL}/contact/`, formData);
      setStatus("Your application has been submitted!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("Error sending application. Please try again.");
      console.error(error);
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