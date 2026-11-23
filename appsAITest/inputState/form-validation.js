export const state = {
  items: {
    "root-panel": {
      id: "root-panel",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4"
        }
      },
      containerIds: ["root-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "form-wrapper": {
      id: "form-wrapper",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "max-w-lg mx-auto"
        }
      },
      containerIds: ["form-wrapper-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "form-card": {
      id: "form-card",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm bg-opacity-95"
        }
      },
      containerIds: ["form-card-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "form-header": {
      id: "form-header",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center"
        }
      },
      containerIds: ["form-header-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "form-title": {
      id: "form-title",
      type: "item",
      componentType: "h2",
      props: {
        className: {
          type: "static",
          value: "text-3xl font-bold text-white mb-2"
        },
        children: {
          type: "static",
          value: "Create Account"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "form-subtitle": {
      id: "form-subtitle",
      type: "item",
      componentType: "p",
      props: {
        className: {
          type: "static",
          value: "text-blue-100 text-sm"
        },
        children: {
          type: "static",
          value: "Join us today and get started in minutes"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "form-container": {
      id: "form-container",
      type: "item",
      componentType: "form",
      props: {
        className: {
          type: "static",
          value: "p-8"
        },
        onSubmit: {
          type: "function",
          reference: "handleSubmit"
        }
      },
      containerIds: ["form-fields-container"],
      state: {
        variables: {
          formData: {
            type: "useState",
            value: {
              name: "",
              email: "",
              phone: "",
              dob: "",
              password: ""
            },
            setter: "setFormData"
          },
          errors: {
            type: "useState",
            value: {},
            setter: "setErrors"
          },
          isSubmitting: {
            type: "useState",
            value: false,
            setter: "setIsSubmitting"
          }
        },
        functions: {
          validateField: {
            type: "function",
            body: `(fieldName, value) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      
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
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
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
          const phoneRegex = /^(\\+[1-9]\\d{0,3})?[0-9]{6,14}$/;
          
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
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
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
          } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(value)) {
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
  }`
          },
          handleInputChange: {
            type: "function",
            body: `(e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Filter out non-phone characters for phone field
      const filteredValue = value.replace(/[^+0-9\\s\\-()]/g, '');
      setFormData(prev => ({ ...prev, [name]: filteredValue }));
    } else {
      // For all other fields, allow normal input
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }`
          },
          handleSubmit: {
            type: "function",
            body: `(e) => {
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
  }`
          }
        }
      }
    },
    "error-box": {
      id: "error-box",
      type: "dynamic-operation",
      operation: {
        type: "conditional",
        condition: "Object.keys(errors).length > 0",
        trueTemplateId: "error-display",
        falseTemplateId: null
      }
    },
    "error-display": {
      id: "error-display",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 mb-6 shadow-sm"
        }
      },
      containerIds: ["error-list-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "error-title": {
      id: "error-title",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "flex items-center mb-3"
        }
      },
      containerIds: ["error-title-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "error-icon": {
      id: "error-icon",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "w-5 h-5 bg-red-400 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold"
        },
        children: {
          type: "static",
          value: "!"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "error-heading": {
      id: "error-heading",
      type: "item",
      componentType: "h3",
      props: {
        className: {
          type: "static",
          value: "text-red-800 font-semibold text-sm"
        },
        children: {
          type: "static",
          value: "Please fix the following errors:"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "error-list": {
      id: "error-list",
      type: "item",
      componentType: "ul",
      props: {
        className: {
          type: "static",
          value: "space-y-1"
        }
      },
      containerIds: ["error-items-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "error-mapping": {
      id: "error-mapping",
      type: "dynamic-operation",
      operation: {
        type: "map",
        dataSource: "Object.entries(errors)",
        itemVariable: "errorEntry",
        indexVariable: "index",
        templateId: "error-item-template"
      }
    },
    "error-item-template": {
      id: "error-item-template",
      type: "item",
      componentType: "li",
      props: {
        key: {
          type: "variable",
          reference: "errorEntry[0]"
        },
        className: {
          type: "static",
          value: "text-red-700 text-sm flex items-center"
        }
      },
      containerIds: ["error-item-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "error-bullet": {
      id: "error-bullet",
      type: "item",
      componentType: "span",
      props: {
        className: {
          type: "static",
          value: "w-1.5 h-1.5 bg-red-400 rounded-full mr-2 mt-1.5 flex-shrink-0"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "error-text": {
      id: "error-text",
      type: "item",
      componentType: "span",
      props: {
        children: {
          type: "variable",
          reference: "errorEntry[1]"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "form-grid": {
      id: "form-grid",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "space-y-6"
        }
      },
      containerIds: ["form-grid-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "name-field": {
      id: "name-field",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "group"
        }
      },
      containerIds: ["name-field-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "name-label": {
      id: "name-label",
      type: "item",
      componentType: "label",
      props: {
        htmlFor: {
          type: "static",
          value: "name"
        },
        className: {
          type: "static",
          value: "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        },
        children: {
          type: "static",
          value: "Full Name *"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "name-input": {
      id: "name-input",
      type: "item",
      componentType: "input",
      props: {
        type: {
          type: "static",
          value: "text"
        },
        id: {
          type: "static",
          value: "name"
        },
        name: {
          type: "static",
          value: "name"
        },
        value: {
          type: "variable",
          reference: "formData.name"
        },
        onChange: {
          type: "function",
          reference: "handleInputChange"
        },
        className: {
          type: "variable",
          reference: "errors.name ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        },
        placeholder: {
          type: "static",
          value: "Enter your full name"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "email-field": {
      id: "email-field",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "group"
        }
      },
      containerIds: ["email-field-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "email-label": {
      id: "email-label",
      type: "item",
      componentType: "label",
      props: {
        htmlFor: {
          type: "static",
          value: "email"
        },
        className: {
          type: "static",
          value: "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        },
        children: {
          type: "static",
          value: "Email Address *"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "email-input": {
      id: "email-input",
      type: "item",
      componentType: "input",
      props: {
        type: {
          type: "static",
          value: "email"
        },
        id: {
          type: "static",
          value: "email"
        },
        name: {
          type: "static",
          value: "email"
        },
        value: {
          type: "variable",
          reference: "formData.email"
        },
        onChange: {
          type: "function",
          reference: "handleInputChange"
        },
        className: {
          type: "variable",
          reference: "errors.email ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        },
        placeholder: {
          type: "static",
          value: "Enter your email address"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "phone-field": {
      id: "phone-field",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "group"
        }
      },
      containerIds: ["phone-field-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "phone-label": {
      id: "phone-label",
      type: "item",
      componentType: "label",
      props: {
        htmlFor: {
          type: "static",
          value: "phone"
        },
        className: {
          type: "static",
          value: "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        },
        children: {
          type: "static",
          value: "Phone Number *"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "phone-input": {
      id: "phone-input",
      type: "item",
      componentType: "input",
      props: {
        type: {
          type: "static",
          value: "tel"
        },
        id: {
          type: "static",
          value: "phone"
        },
        name: {
          type: "static",
          value: "phone"
        },
        value: {
          type: "variable",
          reference: "formData.phone"
        },
        onChange: {
          type: "function",
          reference: "handleInputChange"
        },
        className: {
          type: "variable",
          reference: "errors.phone ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        },
        placeholder: {
          type: "static",
          value: "Enter your phone number"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "dob-field": {
      id: "dob-field",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "group"
        }
      },
      containerIds: ["dob-field-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "dob-label": {
      id: "dob-label",
      type: "item",
      componentType: "label",
      props: {
        htmlFor: {
          type: "static",
          value: "dob"
        },
        className: {
          type: "static",
          value: "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        },
        children: {
          type: "static",
          value: "Date of Birth *"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "dob-input": {
      id: "dob-input",
      type: "item",
      componentType: "input",
      props: {
        type: {
          type: "static",
          value: "date"
        },
        id: {
          type: "static",
          value: "dob"
        },
        name: {
          type: "static",
          value: "dob"
        },
        value: {
          type: "variable",
          reference: "formData.dob"
        },
        onChange: {
          type: "function",
          reference: "handleInputChange"
        },
        className: {
          type: "variable",
          reference: "errors.dob ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "password-field": {
      id: "password-field",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "group"
        }
      },
      containerIds: ["password-field-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "password-label": {
      id: "password-label",
      type: "item",
      componentType: "label",
      props: {
        htmlFor: {
          type: "static",
          value: "password"
        },
        className: {
          type: "static",
          value: "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        },
        children: {
          type: "static",
          value: "Password *"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "password-input": {
      id: "password-input",
      type: "item",
      componentType: "input",
      props: {
        type: {
          type: "static",
          value: "password"
        },
        id: {
          type: "static",
          value: "password"
        },
        name: {
          type: "static",
          value: "password"
        },
        value: {
          type: "variable",
          reference: "formData.password"
        },
        onChange: {
          type: "function",
          reference: "handleInputChange"
        },
        className: {
          type: "variable",
          reference: "errors.password ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        },
        placeholder: {
          type: "static",
          value: "Create a strong password"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "submit-section": {
      id: "submit-section",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "pt-4"
        }
      },
      containerIds: ["submit-section-container"],
      state: {
        variables: {},
        functions: {}
      }
    },
    "submit-button": {
      id: "submit-button",
      type: "item",
      componentType: "button",
      props: {
        type: {
          type: "static",
          value: "submit"
        },
        disabled: {
          type: "variable",
          reference: "isSubmitting"
        },
        className: {
          type: "variable",
          reference: "isSubmitting ? 'w-full bg-gray-300 text-gray-500 py-4 px-6 rounded-xl cursor-not-allowed transition-all duration-200 font-semibold text-lg' : 'w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-semibold text-lg shadow-lg hover:shadow-xl'"
        },
        children: {
          type: "variable",
          reference: "isSubmitting ? '⏳ Creating Account...' : '🚀 Create Account'"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    },
    "form-footer": {
      id: "form-footer",
      type: "item",
      componentType: "div",
      props: {
        className: {
          type: "static",
          value: "mt-6 text-center text-sm text-gray-600"
        },
        children: {
          type: "static",
          value: "Already have an account? Sign in"
        }
      },
      containerIds: [],
      state: {
        variables: {},
        functions: {}
      }
    }
  },
  containers: {
    "root-container": ["form-wrapper"],
    "form-wrapper-container": ["form-card"],
    "form-card-container": ["form-header", "form-container"],
    "form-header-container": ["form-title", "form-subtitle"],
    "form-fields-container": [
      "error-box",
      "form-grid",
      "submit-section",
      "form-footer"
    ],
    "form-grid-container": [
      "name-field",
      "email-field",
      "phone-field",
      "dob-field",
      "password-field"
    ],
    "error-list-container": ["error-title", "error-list"],
    "error-title-container": ["error-icon", "error-heading"],
    "error-items-container": ["error-mapping"],
    "error-item-container": ["error-bullet", "error-text"],
    "name-field-container": ["name-label", "name-input"],
    "email-field-container": ["email-label", "email-input"],
    "phone-field-container": ["phone-label", "phone-input"],
    "dob-field-container": ["dob-label", "dob-input"],
    "password-field-container": ["password-label", "password-input"],
    "submit-section-container": ["submit-button"]
  }
};
