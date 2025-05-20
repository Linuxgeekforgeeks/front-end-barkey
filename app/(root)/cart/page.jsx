import React from 'react';

function CartPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart</h1>
      <p style={styles.message}>There are no items in your cart</p>
      <a href="/products" style={styles.button}>Browse Products</a>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    backgroundColor: '#f9fafb',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3a8a', // Primary color (blue)
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.125rem',
    color: '#4b5563', // Gray-600
    marginBottom: '1.5rem',
  },
  button: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#d97706', // Amber-600
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
};

export default CartPage;