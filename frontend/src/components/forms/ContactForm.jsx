import React, { useState } from "react";
import "./ContactForm.css";
import { api } from "../../lib/api";
import { post } from "../../lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("contact/", form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      alert("There was a problem sending your message.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contact Us</h2>

      {success && (
        <div className="alert alert-success">Your message has been sent! We will get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div className="alert alert-danger">Something went wrong. Please try again later.
        </div>
      )}

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="subject">Subject</label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        rows="4"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="success">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="error">Something went wrong. Please try again.</p>
      )}
    </form>
  );
};