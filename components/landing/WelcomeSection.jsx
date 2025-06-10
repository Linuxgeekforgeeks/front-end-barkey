import React, { useState, useEffect, useRef } from 'react';
import './WelcomeSection.css';
import { useModalStore } from '@/stores/modal.store';

const WelcomeSection = () => {
  const { openVideoModal } = useModalStore();
  const title = "Welcome to Hamos Barkey";
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const typingTimeoutRef = useRef(null);
  const cursorTimeoutRef = useRef(null);

  // Typing animation effect with infinite repeat
  useEffect(() => {
    if (!typingComplete) {
      if (currentIndex < title.length) {
        // Type the next character
        typingTimeoutRef.current = setTimeout(() => {
          setDisplayedTitle(prev => prev + title[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 150);
      } else {
        // Typing is complete, wait before resetting
        typingTimeoutRef.current = setTimeout(() => {
          setTypingComplete(true);
          setShowCursor(false); // Hide cursor
          // Reset after a pause
          setTimeout(() => {
            setDisplayedTitle('');
            setCurrentIndex(0);
            setTypingComplete(false);
            setShowCursor(true); // Show cursor again
          }, 1000); // 1-second pause before restarting
        }, 3000); // 3-second pause after typing completes
      }
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentIndex, title.length, typingComplete]);

  // Cursor blinking effect
  useEffect(() => {
    let interval;
    if (showCursor) {
      interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
    };
  }, [showCursor]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
    };
  }, []);

  return (
    <div>
      <section id="welcome" className="welcome-section">
        <div className="content-container">
          <h1 className="welcome-title">
            {displayedTitle}
            <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>
          </h1>
          <p className="welcome-subtitle">
            Discover the taste of Zanzibar with our artisan breads, crafted with passion and tradition since 2016. Experience the warmth of freshly baked goodness every day.
          </p>
          
          <div className="watchdemo">
            <button onClick={() => openVideoModal()} className="demo-button">
              <span className="button-text">Watch Demo</span>
              <span className="button-icon">▶</span>
            </button>
          </div>
        </div>
      </section>

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
            <a href="/products" className="cta-button">
              <span>Order Now</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomeSection;