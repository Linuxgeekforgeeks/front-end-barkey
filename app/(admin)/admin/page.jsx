"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useNewsletterStore } from "@/stores/newsletter.store";
import { sendNewsletter } from "@/services/newsletter.service";
import { userAuthStore } from "@/stores/auth.store";


export default function AdminDashboard() {
  const { token, isAuthenticated } = userAuthStore();
  const { subscribers } = useNewsletterStore();
  const [newsletter, setNewsletter] = useState({ subject: "", content: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/auth/login");
      return;
    }

    const fetchSubscribers = async () => {
      try {
        await getSubscribers(token);
      } catch (error) {
        setError("Failed to fetch subscribers");
      }
    };

    fetchSubscribers();
  }, [isAuthenticated, token, router]);

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await sendNewsletter(newsletter, token);
      setSuccess(response.message);
      setNewsletter({ subject: "", content: "" });
    } catch (error) {
      setError(error.response?.data?.error || "Failed to send newsletter");
    }
  };

  const handleChange = (e) => {
    setNewsletter({ ...newsletter, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <h3>Send Newsletter</h3>
      <form onSubmit={handleSendNewsletter}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" value={newsletter.subject} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" value={newsletter.content} onChange={handleChange} required rows="5" />
        </div>
        <button type="submit" className="btn">Send Newsletter</button>
      </form>

      <h3>Subscribers</h3>
      <div className="subscriber-list">
        {subscribers.map((subscriber) => (
          <div key={subscriber._id} className="subscriber-item">
            <p>{subscriber.name} - {subscriber.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}