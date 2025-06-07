"use client";
import "./Header.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Home,
  Image,
  Users,
  HelpCircle,
  Info,
  Mail,
  List,
} from "lucide-react";

const navItems = [
  { id: "welcome", label: "Welcome", icon: <Home size={18} /> },
  { id: "services", label: "Services", icon: <List size={18} /> },
  { id: "gallery-hero", label: "Gallery", icon: <Image size={18} /> },
  { id: "testimonials", label: "Testimonials", icon: <Users size={18} /> },
  { id: "newsletter", label: "NewsLetter", icon: <Mail size={18} /> },
  { id: "faqs", label: "FAQs", icon: <HelpCircle size={18} /> },
];

const LandingHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Debounce scroll handler
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Handle scroll with debouncing
  const handleScroll = useCallback(
    debounce(() => {
      setIsScrolled(window.scrollY > 50);
    }, 100),
    []
  );

  // Handle click outside to close dropdown
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleScroll, handleClickOutside]);

  // Handle smooth scrolling for dropdown items
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsDropdownOpen(false);
    }
  };

  // Handle keyboard accessibility for dropdown items
  const handleKeyDown = (e, sectionId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <header
      className={`landing-header ${isScrolled ? "landing-header-scrolled" : ""}`}
      role="banner"
    >
      <div className="landing-header-container">
        <button
          className="landing-header-logo"
          onClick={() => scrollToSection('welcome')}
          aria-label="Go to welcome section"
        >
          <h2>Hamos Barkey</h2>
        </button>

        <nav
          className="landing-header-nav"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="landing-header-nav-links">
            <div className="landing-header-dropdown" ref={dropdownRef}>
              <button
                className="landing-header-dropdown-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-controls="dropdown-menu"
                aria-haspopup="true"
              >
                Home
                <ChevronDown
                  size={18}
                  className={`landing-header-dropdown-icon ${
                    isDropdownOpen ? "open" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div
                  className="landing-header-dropdown-content"
                  id="dropdown-menu"
                  role="menu"
                >
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, item.id)}
                      role="menuitem"
                      tabIndex={0}
                      className="landing-header-dropdown-item"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about-us"
              className="landing-header-nav-link"
            >
              <Info size={18} />
              <span>About Us</span>
            </Link>

            <Link
              href="/contact-us"
              className="landing-header-nav-link"
            >
              <Mail size={18} />
              <span>Contact Us</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default LandingHeader;