"use client";
import "./Navbar.css"
import React, { useState, useEffect } from "react";
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
  X,
} from "lucide-react";
import Link from "next/link";
import "./Navbar.css";
import { useCartStore } from "@/stores/cart.store";
import userAuthStore from "@/stores/auth.store";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, user, logout } = userAuthStore();

  const { cartItems } = useCartStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleHomeDropdown = () => setIsHomeDropdownOpen(!isHomeDropdownOpen);
  const closeHomeDropdown = () => setIsHomeDropdownOpen(false);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <CakeSlice className="navbar-logo-icon" />
            <div className="navbar-logo-text">
              <span className="navbar-logo-primary">Hamos</span>
              <span className="navbar-logo-secondary">Bakery</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-desktop">
            {/* Home Dropdown */}
            <div className="navbar-dropdown">
              <button
                className="navbar-dropdown-trigger"
                onClick={toggleHomeDropdown}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    closeHomeDropdown();
                  }
                }}
                aria-expanded={isHomeDropdownOpen}
                aria-label="Home menu"
              >
                <Home className="navbar-icon" />
                <span>Home</span>
                <ChevronDown
                  className={`navbar-icon ${
                    isHomeDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isHomeDropdownOpen && (
                <div className="navbar-dropdown-content">
                  <Link href="/#products" className="navbar-dropdown-item">
                    Products
                  </Link>
                  <Link href="/#newsletter" className="navbar-dropdown-item">
                    Newsletter
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about-us" className="navbar-link">
              About
            </Link>
            <Link href="/contact-us
            
            
            
            
            
            
            " className="navbar-link">
              <Phone className="navbar-icon" />
              <span>Contact</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="navbar-link">
                  <LayoutDashboard className="navbar-icon" />
                  <span>Dashboard</span>
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin" className="navbar-link">
                    Admin
                  </Link>
                )}
                <button className="navbar-button" onClick={handleLogout}>
                  <LogOut className="navbar-icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="navbar-link">
                  <LogIn className="navbar-icon" />
                  <span>Login</span>
                </Link>
                <Link href="/auth/register" className="navbar-link">
                  <User className="navbar-icon" />
                  <span>Register</span>
                </Link>
              </>
            )}

            <Link href="/cart" className="navbar-cart-link">
              <ShoppingCart className="navbar-cart-icon" />
              {cartItemCount > 0 && (
                <span className="navbar-cart-badge">{cartItemCount}</span>
              )}
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="navbar-mobile">
            <Link href="/cart" className="navbar-cart-link">
              <ShoppingCart className="navbar-cart-icon" />
              {cartItemCount > 0 && (
                <span className="navbar-cart-badge">{cartItemCount}</span>
              )}
            </Link>
            <button
              className="navbar-menu-button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="navbar-icon-large" />
              ) : (
                <Menu className="navbar-icon-large" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            <Link href="/#products" className="navbar-mobile-link" onClick={toggleMenu}>
              Products
            </Link>
            <Link href="/#newsletter" className="navbar-mobile-link" onClick={toggleMenu}>
              Newsletter
            </Link>
            <div className="navbar-divider"></div>
            <Link href="/about" className="navbar-mobile-link" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/contact" className="navbar-mobile-link" onClick={toggleMenu}>
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <div className="navbar-divider"></div>
                <Link
                  href="/dashboard"
                  className="navbar-mobile-link"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="navbar-mobile-link"
                    onClick={toggleMenu}
                  >
                    Admin
                  </Link>
                )}
                <button
                  className="navbar-mobile-button"
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
                <div className="navbar-divider"></div>
                <Link
                  href="/auth/login"
                  className="navbar-mobile-link"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="navbar-mobile-link"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};