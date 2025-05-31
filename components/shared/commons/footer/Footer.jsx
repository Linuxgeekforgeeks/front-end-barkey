"use client";

import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const ThemeToggle = () => {
  // Placeholder for theme toggle functionality
  return (
    <button className="theme-toggle">
      Toggle Theme
    </button>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="footer-section">
            <h3>About Hamos</h3>
            <p className="text-muted">
              Established in 2005, Hamos is Zanzibar's premier bakery, combining traditional island flavors with modern baking techniques.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="nav-list">
              <li><a href="/">Home</a></li>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/contact-us">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <address className="contact-info">
              <p>123 Beach Road</p>
              <p>Stone Town, Zanzibar</p>
              <p>Phone: +255 123 456 789</p>
              <p>Email: info@hamosbakery.com</p>
            </address>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-icon">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} strokeWidth={2} />
              </a>
              <a href="#" className="social-icon">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} strokeWidth={2} />
              </a>
              <a href="#" className="social-icon">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} strokeWidth={2} />
              </a>
            </div>
            <div className="theme-toggle-wrapper">
              <ThemeToggle />
              <span className="theme-toggle-text">Toggle Theme</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {currentYear} Hamos Bakery, Zanzibar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;