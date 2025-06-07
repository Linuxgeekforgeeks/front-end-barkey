"use client"; // 👈 Add this at the very top

import React from 'react';
import './WelcomeSection.css';
import { ArrowRight } from 'lucide-react';

const WelcomeSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="welcome" className="welcome-section">
        <div className="background-gradient"></div>
        <div className="content-container">
          <h1 className="welcome-title">Welcome to Hamos Barkey</h1>
          <p className="welcome-subtitle">
            Discover the taste of Zanzibar with our artisan breads, crafted with passion and tradition since 1985. Experience the warmth of freshly baked goodness every day.
          </p>
          <button
            onClick={() => scrollToSection('services')}
            className="cta-button group"
            aria-label="Explore our services"
          >
            Explore Our Services
            <ArrowRight className="arrow-icon" size={20} />
          </button>
        </div>
        <div className="bottom-gradient"></div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              At Hamos Barkey, we craft Zanzibar's finest bread using authentic ingredients and modern baking techniques
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🍞</div>
              <h3 className="service-title">Daily Fresh Bread</h3>
              <p className="service-description">
                We bake fresh bread every morning. From classic loaves to specialty varieties, each one is crafted with love and years of expertise.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🥖</div>
              <h3 className="service-title">Custom Orders</h3>
              <p className="service-description">
                We prepare special bread for events, weddings, and celebrations. Your custom order will be ready exactly when you need it.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚚</div>
              <h3 className="service-title">Home Delivery</h3>
              <p className="service-description">
                We deliver fresh bread to your doorstep throughout Stone Town and surrounding areas. Order today, receive fresh tomorrow morning.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">👨‍🍳</div>
              <h3 className="service-title">Baking Classes</h3>
              <p className="service-description">
                Learn how to make delicious bread at home. We teach both international and traditional baking techniques for the whole family.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🏪</div>
              <h3 className="service-title">Wholesale Supply</h3>
              <p className="service-description">
                We supply bread to hotels, cafeterias, and other businesses. Great prices and premium quality for all retail partners.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🌟</div>
              <h3 className="service-title">Healthy Options</h3>
              <p className="service-description">
                Specialty health breads designed for people with specific needs - low sugar, gluten-free, and plant-based options for your wellness.
              </p>
            </div>
          </div>

          <div className="cta-section">
            <h3 className="cta-title">Ready to taste Zanzibar's finest bread?</h3>
            <a href="#contact" className="cta-button">
              Order Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default WelcomeSection;