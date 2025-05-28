"use client";
import { useState } from "react";
import Link from "next/link";
import { subscribe } from "@/services/subscribe.service";
import "./page.css";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    if (!validateEmail(email)) {
      setStatus({ message: "Please enter a valid email address", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await subscribe(email, isPremium);
      setStatus({ message: "Subscribed successfully!", type: "success" });
      setEmail("");
      setIsPremium(false);
    } catch (error) {
      setStatus({ message: error.message || "Subscription failed", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="subscribe-container">
      <div className="subscribe-header">
        <h1 className="subscribe-title">Subscribe to Our Newsletter</h1>
        <p className="subscribe-subtitle">Hamos Bakery</p>
      </div>

      <div className="subscribe-content">
        <p className="subscribe-description">
          Stay updated with our latest offers, new products, and baking tips. Join our community today!
        </p>

        <form className="subscribe-form" onSubmit={handleSubmit}>
          <div className="subscribe-field">
            <label htmlFor="email" className="subscribe-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="subscribe-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="subscribe-field subscribe-checkbox">
            <input
              type="checkbox"
              id="premium"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              disabled={isSubmitting}
            />
            <label htmlFor="premium" className="subscribe-checkbox-label">
              Premium Subscription (via ClickPesa)
            </label>
          </div>

          {status.message && (
            <p className={`subscribe-status subscribe-status-${status.type}`}>
              {status.message}
            </p>
          )}

          <button
            type="submit"
            className="subscribe-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        <div className="subscribe-footer">
          <p>
            By subscribing, you agree to our{" "}
            <Link href="/auth/terms">Terms of Service</Link> and{" "}
            <Link href="/auth/privacy">Privacy Policy</Link>.
          </p>
          <p className="subscribe-back">
            <Link href="/">Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}