"use client"
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, description, variant = 'default') => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'destructive');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsSubscribed(true);
      showToast('Subscription Successful!', 'Thank you for subscribing to our newsletter.');
      setIsLoading(false);
    }, 1000);
  };

  const reset = () => {
    setIsSubscribed(false);
    setEmail('');
  };

  return (
    <section id="newsletter" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.title}>Stay Updated with Hamos Bakery</h2>
          <p style={styles.description}>
            Subscribe to our newsletter for special offers, new product announcements, and baking tips.
          </p>

          {isSubscribed ? (
            <div style={styles.subscribedContainer}>
              <h3 style={styles.subscribedTitle}>Thank You for Subscribing!</h3>
              <p style={styles.subscribedText}>Your email {email} has been added to our newsletter.</p>
              <button
                style={styles.resetButton}
                onClick={reset}
              >
                Subscribe Another Email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.button,
                  ...(isLoading ? styles.buttonDisabled : {}),
                }}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {toast && (
            <div style={{
              ...styles.toast,
              ...(toast.variant === 'destructive' ? styles.toastDestructive : styles.toastDefault),
            }}>
              <h4 style={styles.toastTitle}>{toast.title}</h4>
              <p style={styles.toastDescription}>{toast.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '4rem 0',
    backgroundColor: '#1e3a8a', // Primary color (blue)
    color: '#ffffff', // Primary foreground (white)
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  content: {
    maxWidth: '48rem',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.125rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontSize: '1rem',
    width: '100%',
    maxWidth: '20rem',
    outline: 'none',
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    backgroundColor: '#ffffff',
    color: '#1e3a8a',
    fontSize: '1rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    cursor: 'not-allowed',
  },
  subscribedContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    animation: 'fadeIn 0.5s ease-in',
  },
  subscribedTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  subscribedText: {
    marginBottom: '1rem',
  },
  resetButton: {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    border: '1px solid #ffffff',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  toast: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    padding: '1rem',
    borderRadius: '0.375rem',
    maxWidth: '20rem',
    zIndex: 1000,
    animation: 'fadeIn 0.5s ease-in',
  },
  toastDefault: {
    backgroundColor: '#10b981',
    color: '#ffffff',
  },
  toastDestructive: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
  },
  toastTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  toastDescription: {
    fontSize: '0.875rem',
  },
};

export default Newsletter;