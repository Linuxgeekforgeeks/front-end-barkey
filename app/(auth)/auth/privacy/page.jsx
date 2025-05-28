"use client";
import "./privacy.page.css";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-subtitle">Hamos Bakery</p>
        <p className="privacy-updated">Last updated: {lastUpdated}</p>
      </div>

      <div className="privacy-content">
        <div className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            At Hamos Bakery, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, place orders, or subscribe to our newsletter.
          </p>
        </div>

        <div className="privacy-section">
          <h2>2. Information We Collect</h2>
          <p>
            We collect information you provide when you:
          </p>
          <ul>
            <li>Create an account (e.g., name, email, password).</li>
            <li>Place an order (e.g., address, phone number).</li>
            <li>Subscribe to our newsletter (e.g., email).</li>
            <li>Contact us (e.g., inquiries via email).</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul>
            <li>Process and deliver your orders.</li>
            <li>Send newsletter updates (if subscribed).</li>
            <li>Improve our services and website.</li>
            <li>Respond to your inquiries.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>4. Sharing Your Information</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li>Payment processors like ClickPesa to complete transactions.</li>
            <li>Trusted service providers (e.g., email services for newsletters).</li>
            <li>Legal authorities if required by law.</li>
          </ul>
          <p>
            We do not sell your personal information.
          </p>
        </div>

        <div className="privacy-section">
          <h2>5. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access or update your personal information.</li>
            <li>Unsubscribe from our newsletter at any time.</li>
            <li>Request deletion of your account.</li>
            <li>Contact us with privacy concerns.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>6. Data Security</h2>
          <p>
            We use reasonable measures to protect your information, but no system is completely secure. Please keep your account credentials safe.
          </p>
        </div>

        <div className="privacy-footer">
          <p>
            For questions, contact us at <a href="mailto:support@hamosbakery.com">support@hamosbakery.com</a>.
          </p>
          <p className="privacy-back">
            <Link href="/auth/register">Back to Register</Link> | <Link href="/auth/terms">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
}