"use client"
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Menu,
  Home, 
  User, 
  LogIn, 
  Phone, 
  ShoppingCart, 
  LogOut,
  LayoutDashboard,
  CakeSlice,
  X
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleHomeDropdown = () => setIsHomeDropdownOpen(!isHomeDropdownOpen);
  const closeHomeDropdown = () => setIsHomeDropdownOpen(false);

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav style={{
      ...styles.nav,
      ...(scrolled ? styles.navScrolled : styles.navTransparent),
    }}>
      <div style={styles.container}>
        <div style={styles.navContent}>
          {/* Logo */}
          <a href="/" style={styles.logo}>
            <CakeSlice style={styles.logoIcon} />
            <div style={styles.logoText}>
              <span style={styles.logoPrimary}>Hamos</span>
              <span style={styles.logoSecondary}>Bakery</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div style={styles.desktopNav}>
            {/* Home Dropdown */}
            <div style={styles.dropdown}>
              <button
                style={styles.dropdownTrigger}
                onClick={toggleHomeDropdown}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    closeHomeDropdown();
                  }
                }}
                aria-expanded={isHomeDropdownOpen}
              >
                <Home style={styles.icon} />
                <span>Home</span>
                <ChevronDown style={{
                  ...styles.icon,
                  transform: isHomeDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }} />
              </button>
              {isHomeDropdownOpen && (
                <div style={styles.dropdownContent}>
                  <a href="#hero" style={styles.dropdownItem}>Hero</a>
                  <a href="#howItWorks" style={styles.dropdownItem}>How It Works</a>
                  <a href="#testimonials" style={styles.dropdownItem}>Testimonials</a>
                  <a href="#faq" style={styles.dropdownItem}>FAQ</a>
                  <a href="#newsletter" style={styles.dropdownItem}>Newsletter</a>
                </div>
              )}
            </div>

            <a href="/about-us" style={styles.navLink}>About</a>
            <a href="/contact-us" style={styles.navLink}>
              <Phone style={styles.icon} />
              <span>Contact</span>
            </a>

            {isAuthenticated ? (
              <>
                <a href="/dashboard" style={styles.navLink}>
                  <LayoutDashboard style={styles.icon} />
                  <span>Dashboard</span>
                </a>
                {user?.role === 'admin' && (
                  <a href="/admin" style={styles.navLink}>Admin</a>
                )}
                <button style={styles.navButton} onClick={handleLogout}>
                  <LogOut style={styles.icon} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <a href="/signup" style={styles.navLink}>
                <User style={styles.icon} />
                <span>Sign Up</span>
              </a>
            )}

            <a href="/cart" style={styles.cartLink}>
              <ShoppingCart style={styles.cartIcon} />
              {cartItemCount > 0 && (
                <span style={styles.cartBadge}>{cartItemCount}</span>
              )}
            </a>
          </div>

          {/* Mobile menu button */}
          <div style={styles.mobileNav}>
            <a href="/cart" style={styles.cartLink}>
              <ShoppingCart style={styles.cartIcon} />
              {cartItemCount > 0 && (
                <span style={styles.cartBadge}>{cartItemCount}</span>
              )}
            </a>
            <button
              style={styles.menuButton}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X style={styles.iconLarge} />
              ) : (
                <Menu style={styles.iconLarge} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={styles.mobileMenu}>
            <a href="#hero" style={styles.mobileLink} onClick={toggleMenu}>Home</a>
            <a href="#howItWorks" style={styles.mobileLink} onClick={toggleMenu}>How It Works</a>
            <a href="#testimonials" style={styles.mobileLink} onClick={toggleMenu}>Testimonials</a>
            <a href="#faq" style={styles.mobileLink} onClick={toggleMenu}>FAQ</a>
            <a href="#newsletter" style={styles.mobileLink} onClick={toggleMenu}>Newsletter</a>
            <div style={styles.divider}></div>
            <a href="/about-us" style={styles.mobileLink} onClick={toggleMenu}>About</a>
            <a href="/contact-us" style={styles.mobileLink} onClick={toggleMenu}>Contact</a>
            {isAuthenticated ? (
              <>
                <div style={styles.divider}></div>
                <a href="/dashboard" style={styles.mobileLink} onClick={toggleMenu}>Dashboard</a>
                {user?.role === 'admin' && (
                  <a href="/admin" style={styles.mobileLink} onClick={toggleMenu}>Admin</a>
                )}
                <button
                  style={styles.mobileButton}
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div style={styles.divider}></div>
                <a href="/signup" style={styles.mobileLink} onClick={toggleMenu}>Sign Up</a>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 50,
    transition: 'all 0.3s ease',
  },
  navTransparent: {
    backgroundColor: 'transparent',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  navScrolled: {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '2rem',
    height: '2rem',
    color: '#d97706', // Amber-600
  },
  logoText: {
    display: 'flex',
    alignItems: 'baseline',
  },
  logoPrimary: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#d97706', // Amber-600
  },
  logoSecondary: {
    fontSize: '1.25rem',
    fontWeight: '500',
    color: '#374151', // Gray-700
    marginLeft: '0.25rem',
  },
  desktopNav: {
    display: 'none',
    alignItems: 'center',
    gap: '2rem',
    '@media (min-width: 768px)': {
      display: 'flex',
    },
  },
  dropdown: {
    position: 'relative',
  },
  dropdownTrigger: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151', // Gray-700
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  dropdownContent: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '100%',
    marginTop: '0.5rem',
    padding: '0.5rem 0',
    width: '12rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb', // Gray-100
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.2s ease-in',
  },
  dropdownItem: {
    display: 'block',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    color: '#374151', // Gray-700
    textDecoration: 'none',
    transition: 'all 0.15s ease',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151', // Gray-700
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151', // Gray-700
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  cartLink: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  cartIcon: {
    width: '1.25rem',
    height: '1.25rem',
    color: '#374151', // Gray-700
  },
  cartBadge: {
    position: 'absolute',
    top: '-0.5rem',
    right: '-0.5rem',
    backgroundColor: '#d97706', // Amber-600
    color: '#ffffff',
    borderRadius: '50%',
    width: '1.25rem',
    height: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  mobileNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  menuButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#374151', // Gray-700
    transition: 'color 0.2s ease',
  },
  icon: {
    width: '1rem',
    height: '1rem',
  },
  iconLarge: {
    width: '1.5rem',
    height: '1.5rem',
  },
  mobileMenu: {
    marginTop: '1rem',
    padding: '0.5rem 0',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb', // Gray-100
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'slideDown 0.2s ease-in',
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  mobileLink: {
    display: 'block',
    padding: '0.5rem 1rem',
    color: '#374151', // Gray-700
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'all 0.15s ease',
  },
  mobileButton: {
    display: 'block',
    padding: '0.5rem 1rem',
    background: 'none',
    border: 'none',
    color: '#374151', // Gray-700
    textAlign: 'left',
    width: '100%',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  divider: {
    borderTop: '1px solid #e5e7eb', // Gray-100
    margin: '0.5rem 0',
  },
};

export default Navbar;