"use client";
import "./page.css";
import Link from "next/link";

export default function TermsOfServicePage() {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1 className="terms-title">Terms of Service</h1>
        <p className="terms-subtitle">Hamos Bakery</p>
        <p className="terms-updated">Last updated: {lastUpdated}</p>
      </div>

      <div className="terms-content">
        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using Hamos Bakery’s services, including our website, newsletter, and ordering platform, you agree to these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </div>

        <div className="terms-section">
          <h2>2. User Accounts</h2>
          <p>
            To place orders or subscribe to our newsletter, you must create an account. You agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information.</li>
            <li>Keep your account details and password secure.</li>
            <li>Notify us immediately of any unauthorized account use.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. User Responsibilities</h2>
          <p>
            You agree to use our services responsibly and not to:
          </p>
          <ul>
            <li>Violate any laws or regulations.</li>
            <li>Send spam or unauthorized communications.</li>
            <li>Attempt to access our systems without permission.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>4. Privacy</h2>
          <p>
            We value your privacy. Our <Link href="/auth/privacy">Privacy Policy</Link> explains how we collect, use, and protect your personal information. By using our services, you agree to this policy.
          </p>
        </div>

        <div className="terms-section">
          <h2>5. Payments</h2>
          <p>
            Orders and subscriptions may require payment via ClickPesa or other methods. You agree to:
          </p>
          <ul>
            <li>Pay all fees as specified during checkout.</li>
            <li>Non-refunded payments unless required by law.</li>
            <li>Accept potential price changes with prior notice.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>6. Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these terms. You may also close your account at any time by contacting us.
          </p>
        </div>

        <div className="terms-footer">
          <p>
            For questions, contact us at <a href="mailto:support@hamosbakery.com">support@hamosbakery.com</a>.
          </p>
          <p className="terms-back">
            <Link href="/auth/register">Back to Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}