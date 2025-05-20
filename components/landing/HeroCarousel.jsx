"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import './HeroCarousel.css';

const carouselItems = [
  {
    id: 1,
    title: 'Freshly Baked Every Morning',
    description: 'Experience the taste of authentic Zanzibar breads and pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1526&auto=format&fit=crop',
    cta: 'Order Now',
    link: '/products', // Added link for the products page
  },
  {
    id: 2,
    title: 'Special Occasion Cakes',
    description: 'Celebrate your special moments with our custom-designed cakes',
    image: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545?q=80&w=1740&auto=format&fit=crop',
    cta: 'View Collection',
  },
  {
    id: 3,
    title: 'Traditional Zanzibar Flavors',
    description: 'Taste the unique spice-infused pastries of Zanzibar',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1472&auto=format&fit=crop',
    cta: 'Explore Flavors',
  },
];

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="carousel-container" id="hero">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`carousel-slide ${index === activeIndex ? 'active' : 'inactive'}`}
        >
          <div 
            className="carousel-background"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="carousel-overlay" />
          </div>
          
          <div className="carousel-content">
            <h1 className="carousel-title">{item.title}</h1>
            <p className="carousel-description">{item.description}</p>
            {item.link ? (
              <a href={item.link} className="carousel-cta">{item.cta}</a>
            ) : (
              <button className="carousel-cta">{item.cta}</button>
            )}
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="carousel-nav-button carousel-nav-button-left"
        aria-label="Previous slide"
      >
        <ChevronLeft className="carousel-icon" />
      </button>
      
      <button
        onClick={nextSlide}
        className="carousel-nav-button carousel-nav-button-right"
        aria-label="Next slide"
      >
        <ChevronRight className="carousel-icon" />
      </button>
      
      <div className="carousel-dots">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button
        onClick={togglePlayPause}
        className="carousel-play-pause"
        aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
      >
        {isPlaying ? (
          <Pause className="carousel-icon" />
        ) : (
          <Play className="carousel-icon" />
        )}
      </button>
    </div>
  );
};

export default HeroCarousel;