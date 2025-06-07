import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Hamos Barkey's freshly baked bread and pastries brought the taste of Zanzibar to life! Their dedication to traditional flavors with a modern twist is simply irresistible.",
      author: "Amina Hassan",
      title: "Local Foodie",
      initials: "AH",
      rating: "★★★★★",
    },
    {
      quote: "The cakes from Hamos Barkey are a masterpiece! Perfect for celebrations, with flavors that reflect Zanzibar’s rich heritage. Highly recommend!",
      author: "James Morrison",
      title: "Event Planner",
      initials: "JM",
      rating: "★★★★★",
    },
    {
      quote: "Hamos Barkey’s service and quality are unmatched. Their warm hospitality and delicious treats made my visit to Zanzibar unforgettable.",
      author: "Zara Ali",
      title: "Tourist from UAE",
      initials: "ZA",
      rating: "★★★★★",
    },
  ];

  return (
    <div id='testimonial' className="design-section">
      <h2 className="design-title">What Our Customers Say</h2>
      <div className="design3">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-glass3" key={index}>
            <div className="inner-content">
              <div className="quote-mark">"</div>
              <div className="testimonial-text">{testimonial.quote}</div>
              <div className="author-container">
                <div className="profile-image">{testimonial.initials}</div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.title}</p>
                  <div className="rating-stars">{testimonial.rating}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;