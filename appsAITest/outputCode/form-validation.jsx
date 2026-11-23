"use client";

import React, { useState } from 'react';

export default function AppComponent() {
  const [formData, setFormData] = useState({"name":"","email":"","phone":"","dob":"","password":""});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateField = (fieldName, value) => {
  setErrors(prevErrors => {
    const newErrors = {
      ...prevErrors
    };
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value.trim())) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        const cleaned = value.replace(/[^+0-9]/g, '');
        const phoneRegex = /^(\+[1-9]\d{0,3})?[0-9]{6,14}$/;
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (cleaned.length < 6) {
          newErrors.phone = 'Phone number must be at least 6 digits';
        } else if (cleaned.length > 18) {
          newErrors.phone = 'Phone number is too long';
        } else if (!phoneRegex.test(cleaned)) {
          newErrors.phone = 'Please enter a valid phone number (digits only)';
        } else if (cleaned.includes('+') && !cleaned.startsWith('+')) {
          newErrors.phone = 'Country code (+) must be at the beginning';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'dob':
        if (!value) {
          newErrors.dob = 'Date of birth is required';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
            age--;
          }
          if (isNaN(birthDate.getTime())) {
            newErrors.dob = 'Please enter a valid date';
          } else if (birthDate > today) {
            newErrors.dob = 'Date of birth cannot be in the future';
          } else if (age < 13) {
            newErrors.dob = 'You must be at least 13 years old';
          } else if (age > 120) {
            newErrors.dob = 'Please enter a valid date of birth';
          } else {
            delete newErrors.dob;
          }
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and number';
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }
    return newErrors;
  });
}
  const handleInputChange = e => {
  const {
    name,
    value
  } = e.target;
  if (name === 'phone') {
    // Filter out non-phone characters for phone field
    const filteredValue = value.replace(/[^+0-9\s\-()]/g, '');
    setFormData(prev => ({
      ...prev,
      [name]: filteredValue
    }));
  } else {
    // For all other fields, allow normal input
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
}
  const handleSubmit = e => {
  e.preventDefault();
  setIsSubmitting(true);

  // Clear any existing errors first
  setErrors({});

  // Validate all fields
  Object.keys(formData).forEach(field => {
    validateField(field, formData[field]);
  });

  // Wait for all validations to complete, then check errors
  setTimeout(() => {
    setErrors(currentErrors => {
      const hasErrors = Object.keys(currentErrors).length > 0;
      if (!hasErrors) {
        // Form is valid - simulate API call
        setTimeout(() => {
          alert('🎉 Account created successfully! Welcome aboard!');
          setIsSubmitting(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            dob: "",
            password: ""
          });
          setErrors({});
        }, 1500);
      } else {
        // Form has errors - stop submission
        setIsSubmitting(false);
      }
      return currentErrors;
    });
  }, 50);
}


  return (    <div
      style={{"width":"100%","height":"100%"}}
      data-component-id="root">
      <div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4"
        data-component-id="root-panel">
        <div
          className="max-w-lg mx-auto"
          data-component-id="form-wrapper">
          <div
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm bg-opacity-95"
            data-component-id="form-card">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center"
              data-component-id="form-header">
              <h2
                className="text-3xl font-bold text-white mb-2"
                data-component-id="form-title">
                Create Account
              </h2>
              <p
                className="text-blue-100 text-sm"
                data-component-id="form-subtitle">
                Join us today and get started in minutes
              </p>
            </div>
            <form
              className="p-8"
              onSubmit={handleSubmit}
              data-component-id="form-container">
              {Object.keys(errors).length > 0 && (
                <div
                  className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 mb-6 shadow-sm"
                  data-component-id="error-display">
                  <div
                    className="flex items-center mb-3"
                    data-component-id="error-title">
                    <div
                      className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold"
                      data-component-id="error-icon">
                      !
                    </div>
                    <h3
                      className="text-red-800 font-semibold text-sm"
                      data-component-id="error-heading">
                      Please fix the following errors:
                    </h3>
                  </div>
                  <ul
                    className="space-y-1"
                    data-component-id="error-list">
                    {Object.entries(errors).map((errorEntry, index) => (
                      <li
                        key={errorEntry[0]}
                        className="text-red-700 text-sm flex items-center"
                        data-component-id="error-item-template">
                        <span
                          className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 mt-1.5 flex-shrink-0"
                          data-component-id="error-bullet" />
                        <span
                          data-component-id="error-text">
                          {errorEntry[1]}
                        </span>
                      </li>
                    ))}                  </ul>
                </div>
              )}              <div
                className="space-y-6"
                data-component-id="form-grid">
                <div
                  className="group"
                  data-component-id="name-field">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
                    data-component-id="name-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'}
                    placeholder="Enter your full name"
                    data-component-id="name-input" />
                </div>
                <div
                  className="group"
                  data-component-id="email-field">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
                    data-component-id="email-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'}
                    placeholder="Enter your email address"
                    data-component-id="email-input" />
                </div>
                <div
                  className="group"
                  data-component-id="phone-field">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
                    data-component-id="phone-label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'}
                    placeholder="Enter your phone number"
                    data-component-id="phone-input" />
                </div>
                <div
                  className="group"
                  data-component-id="dob-field">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
                    data-component-id="dob-label">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={errors.dob ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'}
                    data-component-id="dob-input" />
                </div>
                <div
                  className="group"
                  data-component-id="password-field">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
                    data-component-id="password-label">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'}
                    placeholder="Create a strong password"
                    data-component-id="password-input" />
                </div>
              </div>
              <div
                className="pt-4"
                data-component-id="submit-section">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={isSubmitting ? 'w-full bg-gray-300 text-gray-500 py-4 px-6 rounded-xl cursor-not-allowed transition-all duration-200 font-semibold text-lg' : 'w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-semibold text-lg shadow-lg hover:shadow-xl'}
                  data-component-id="submit-button">
                  {isSubmitting ? '⏳ Creating Account...' : '🚀 Create Account'}
                </button>
              </div>
              <div
                className="mt-6 text-center text-sm text-gray-600"
                data-component-id="form-footer">
                Already have an account? Sign in
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
