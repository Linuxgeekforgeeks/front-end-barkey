"use client"
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  LayoutDashboard,
  CakeSlice,
  Sparkles,
  Phone,
} from "lucide-react";
import "./navbar.css";

export default function CreativeBakeryNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (sectionName) => setOpenDropdown(openDropdown === sectionName ? null : sectionName);
  const closeDropdown = () => setOpenDropdown(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationSections = [
    {
      name: "Home",
      href: "#home",
      subsections: [
        { name: "Welcome", href: "#welcome" },
        { name: "Our Specials", href: "#specials" },
        { name: "Reviews", href: "#reviews" },
      ],
    },
    {
      name: "Shop",
      href: "#shop",
      subsections: [
        { name: "Cakes", href: "#cakes" },
        { name: "Pastries", href: "#pastries" },
        { name: "Breads", href: "#breads" },
        { name: "Custom Orders", href: "#custom" },
      ],
    },
    {
      name: "About",
      href: "#about",
      subsections: [
        { name: "Our Story", href: "#story" },
        { name: "Our Team", href: "#team" },
        { name: "Awards", href: "#awards" },
      ],
    },
    {
      name: "Contact",
      href: "#contact",
      subsections: [
        { name: "Get In Touch", href: "#get-in-touch" },
        { name: "Visit Us", href: "#visit" },
        { name: "Contact Form", href: "#contact-form" },
      ],
    },
  ];

  const additionalItems = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "Events", href: "#events" },
    { name: "Blog", href: "#blog" },
    { name: "Recipes", href: "#recipes" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <div className="page-container">
      <div className="scroll-spacer"></div>
      
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="logo-container">
              <div className="logo-wrapper">
                <div className="logo-pulse"></div>
                <div className="logo-icon">
                  <CakeSlice className="logo-cake" />
                  <Sparkles className="logo-sparkle" />
                </div>
              </div>
              <div className="logo-text">
                <span className="logo-title">Hamos</span>
                <span className="logo-subtitle">BAKERY ✨</span>
              </div>
            </div>

            <div className="desktop-nav">
              {navigationSections.map((section) => (
                <div key={section.name} className="dropdown">
                  <button
                    className={`dropdown-button ${openDropdown === section.name ? "dropdown-button-active" : ""}`}
                    onClick={() => toggleDropdown(section.name)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) {
                        closeDropdown();
                      }
                    }}
                  >
                    <span>{section.name}</span>
                    <ChevronDown className={`dropdown-chevron ${openDropdown === section.name ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === section.name && (
                    <div className="dropdown-menu">
                      {section.subsections.map((subsection, index) => (
                        <a
                          key={subsection.name}
                          href={subsection.href}
                          className="dropdown-item"
                          onClick={() => scrollToSection(subsection.href)}
                        >
                          {subsection.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="dropdown">
                <button
                  className={`dropdown-button ${openDropdown === "More" ? "dropdown-button-active" : ""}`}
                  onClick={() => toggleDropdown("More")}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      closeDropdown();
                    }}
                  }
                >
                  <span>More</span>
                  <ChevronDown className={`dropdown-chevron ${openDropdown === "More" ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === "More" && (
                  <div className="dropdown-menu">
                    {additionalItems.map((item, index) => (
                      <div key={item.name}>
                        <a
                          href={item.href}
                          className="dropdown-item"
                          onClick={() => scrollToSection(item.href)}
                        >
                          {item.name}
                        </a>
                        {index === 2 && <div className="dropdown-separator"></div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <>
                  <a href="/dashboard" className="nav-link">
                    <LayoutDashboard className="nav-icon" />
                    <span>Dashboard</span>
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="nav-button-logout"
                  >
                    <LogOut className="nav-icon" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="nav-link">
                    <LogIn className="nav-icon" />
                    <span>Login</span>
                  </a>
                  <a href="/register" className="nav-button-register">
                    <User className="nav-icon" />
                    <span>Register</span>
                  </a>
                </>
              )}

              <a href="/cart" className="cart-container">
                <div className="cart-icon">
                  <ShoppingCart className="cart-icon-inner" />
                </div>
                {cartItemCount > 0 && (
                  <div className="cart-count">
                    {cartItemCount}
                  </div>
                )}
              </a>
            </div>

            <div className="mobile-nav">
              <a href="/cart" className="mobile-cart">
                <div className="cart-icon">
                  <ShoppingCart className="cart-icon-inner" />
                </div>
                {cartItemCount > 0 && (
                  <div className="cart-count-mobile">
                    {cartItemCount}
                  </div>
                )}
              </a>
              
              <button
                onClick={toggleMenu}
                className="mobile-menu-button"
              >
                {isMenuOpen ? (
                  <X className="mobile-menu-icon" />
                ) : (
                  <Menu className="mobile-menu-icon" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-content">
                {navigationSections.map((section) => (
                  <div key={section.name} className="mobile-menu-section">
                    <div className="mobile-menu-section-title">{section.name}</div>
                    {section.subsections.map((subsection) => (
                      <a
                        key={subsection.name}
                        href={subsection.href}
                        className="mobile-menu-item"
                        onClick={() => scrollToSection(subsection.href)}
                      >
                        {subsection.name}
                      </a>
                    ))}
                  </div>
                ))}

                <div className="mobile-menu-section">
                  <div className="mobile-menu-section-title">More</div>
                  {additionalItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="mobile-menu-item"
                      onClick={() => scrollToSection(item.href)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                {isAuthenticated ? (
                  <>
                    <div className="mobile-menu-divider"></div>
                    <a href="/dashboard" className="mobile-menu-item">
                      <LayoutDashboard className="nav-icon" />
                      <span>Dashboard</span>
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="mobile-menu-item-logout"
                    >
                      <LogOut className="nav-icon" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mobile-menu-divider"></div>
                    <a href="/login" className="mobile-menu-item">
                      <LogIn className="nav-icon" />
                      <span>Login</span>
                    </a>
                    <a href="/register" className="mobile-menu-item-register">
                      <User className="nav-icon" />
                      <span>Register</span>
                    </a>
                  </>
                )}

                <button className="mobile-get-started-button">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}