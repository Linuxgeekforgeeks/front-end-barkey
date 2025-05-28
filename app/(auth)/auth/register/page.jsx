"use client";
import "./page.css"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/services/auth.service";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "client",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  const router = useRouter();

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          newErrors[name] = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (value.length < 2) {
          newErrors[name] = `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors[name] = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors[name] = 'Please enter a valid email address';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!value) {
          newErrors[name] = 'Phone number is required';
        } else if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
          newErrors[name] = 'Please enter a valid phone number';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors[name] = 'Password is required';
        } else if (value.length < 8) {
          newErrors[name] = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors[name] = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        } else {
          delete newErrors[name];
        }
        
        // Update password strength
        if (value.length === 0) {
          setPasswordStrength('');
        } else if (value.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          setPasswordStrength('weak');
        } else if (value.length < 12 || !/(?=.*[!@#$%^&*])/.test(value)) {
          setPasswordStrength('medium');
        } else {
          setPasswordStrength('strong');
        }
        break;
        
      case 'confirmPassword':
        if (!value) {
          newErrors[name] = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors[name] = 'Passwords do not match';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'dateOfBirth':
        if (!value) {
          newErrors[name] = 'Date of birth is required';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18) {
            newErrors[name] = 'You must be at least 18 years old';
          } else {
            delete newErrors[name];
          }
        }
        break;
        
      case 'address':
      case 'city':
      case 'zipCode':
        if (!value.trim()) {
          newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'agreeToTerms':
        if (!value) {
          newErrors[name] = 'You must agree to the terms and conditions';
        } else {
          delete newErrors[name];
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData({ ...formData, [name]: fieldValue });
    
    // Validate field on change
    if (fieldValue !== '' || name === 'agreeToTerms') {
      validateField(name, fieldValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });
    
    // Check if there are any errors
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      setShowSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
      
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.error || "Registration failed. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldClass = (fieldName) => {
    if (errors[fieldName]) return 'form-group error';
    if (formData[fieldName] && !errors[fieldName]) return 'form-group success';
    return 'form-group';
  };

  if (showSuccess) {
    return (
      <div className="register-container">
        <div className="register-success">
          <h2>Registration Successful!</h2>
          <p>Your account has been created successfully. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <h2 className="register-heading">Create Account</h2>
      
      {errors.submit && <div className="register-error">{errors.submit}</div>}
      
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-row">
          <div className={getFieldClass('firstName')}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <div className="field-error">{errors.firstName}</div>}
          </div>
          
          <div className={getFieldClass('lastName')}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <div className="field-error">{errors.lastName}</div>}
          </div>
        </div>

        <div className={getFieldClass('email')}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>

        <div className="form-row">
          <div className={getFieldClass('phone')}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              required
            />
            {errors.phone && <div className="field-error">{errors.phone}</div>}
          </div>
          
          <div className={getFieldClass('dateOfBirth')}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            {errors.dateOfBirth && <div className="field-error">{errors.dateOfBirth}</div>}
          </div>
        </div>

        {/* Role Selection */}
        <div className="form-group">
          <label>Account Type</label>
          <div className="role-group">
            <div className="role-option">
              <input
                type="radio"
                id="client"
                name="role"
                value="client"
                checked={formData.role === 'client'}
                onChange={handleChange}
              />
              <label htmlFor="client">Client</label>
            </div>
            <div className="role-option">
              <input
                type="radio"
                id="staff"
                name="role"
                value="staff"
                checked={formData.role === 'staff'}
                onChange={handleChange}
              />
              <label htmlFor="staff">Staff</label>
            </div>
            <div className="role-option">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                checked={formData.role === 'admin'}
                onChange={handleChange}
              />
              <label htmlFor="admin">Admin</label>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className={getFieldClass('address')}>
          <label htmlFor="address">Street Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <div className="field-error">{errors.address}</div>}
        </div>

        <div className="form-row">
          <div className={getFieldClass('city')}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errors.city && <div className="field-error">{errors.city}</div>}
          </div>
          
          <div className={getFieldClass('state')}>
            <label htmlFor="state">State/Province</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            {errors.state && <div className="field-error">{errors.state}</div>}
          </div>
        </div>

        <div className={getFieldClass('zipCode')}>
          <label htmlFor="zipCode">ZIP/Postal Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="12345"
            required
          />
          {errors.zipCode && <div className="field-error">{errors.zipCode}</div>}
        </div>

        {/* Password Fields */}
        <div className={getFieldClass('password')}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formData.password && (
            <div className="password-strength">
              <div className={`password-strength-bar ${passwordStrength}`}></div>
            </div>
          )}
          <div className="password-hint">
            Password must be at least 8 characters with uppercase, lowercase, and number
          </div>
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>

        <div className={getFieldClass('confirmPassword')}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
        </div>

        {/* Terms and Conditions */}
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeToTerms">
            I agree to the <Link href="/auth/terms">Terms of Service</Link> and{' '}
            <Link href="/privacy">Privacy Policy</Link>
          </label>
        </div>
        {errors.agreeToTerms && <div className="field-error">{errors.agreeToTerms}</div>}

        <button
          type="submit"
          className={`btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? '' : 'Create Account'}
        </button>
      </form>

      <p className="register-link">
        Already have an account? <Link href="/auth/login">Sign in here</Link>
      </p>
    </div>
  );
}