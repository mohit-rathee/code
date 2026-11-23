export const state = {
  "items": {
    "root": {
      "id": "root",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "root-container"
      ],
      "props": {
        "style": {
          "type": "static",
          "value": {
            "width": "100%",
            "height": "100%"
          }
        }
      },
      "imports": [
        {
          "source": "react",
          "specifiers": [
            {
              "name": "useState",
              "isTypeOnly": false
            }
          ],
          "defaultImport": "React"
        }
      ],
      "state": {
        "variables": {
          "formData": {
            "type": "useState",
            "value": {
              "name": "",
              "email": "",
              "phone": "",
              "dob": "",
              "password": ""
            },
            "setter": "setFormData"
          },
          "errors": {
            "type": "useState",
            "value": {},
            "setter": "setErrors"
          },
          "isSubmitting": {
            "type": "useState",
            "value": false,
            "setter": "setIsSubmitting"
          },
          "validateField": {
            "type": "basic",
            "value": "(fieldName, value) => {\n  setErrors(prevErrors => {\n    const newErrors = {\n      ...prevErrors\n    };\n    switch (fieldName) {\n      case 'name':\n        if (!value.trim()) {\n          newErrors.name = 'Name is required';\n        } else if (value.trim().length < 2) {\n          newErrors.name = 'Name must be at least 2 characters';\n        } else {\n          delete newErrors.name;\n        }\n        break;\n      case 'email':\n        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\n        if (!value.trim()) {\n          newErrors.email = 'Email is required';\n        } else if (!emailRegex.test(value.trim())) {\n          newErrors.email = 'Please enter a valid email address';\n        } else {\n          delete newErrors.email;\n        }\n        break;\n      case 'phone':\n        const cleaned = value.replace(/[^+0-9]/g, '');\n        const phoneRegex = /^(\\+[1-9]\\d{0,3})?[0-9]{6,14}$/;\n        if (!value.trim()) {\n          newErrors.phone = 'Phone number is required';\n        } else if (cleaned.length < 6) {\n          newErrors.phone = 'Phone number must be at least 6 digits';\n        } else if (cleaned.length > 18) {\n          newErrors.phone = 'Phone number is too long';\n        } else if (!phoneRegex.test(cleaned)) {\n          newErrors.phone = 'Please enter a valid phone number (digits only)';\n        } else if (cleaned.includes('+') && !cleaned.startsWith('+')) {\n          newErrors.phone = 'Country code (+) must be at the beginning';\n        } else {\n          delete newErrors.phone;\n        }\n        break;\n      case 'dob':\n        if (!value) {\n          newErrors.dob = 'Date of birth is required';\n        } else {\n          const birthDate = new Date(value);\n          const today = new Date();\n          let age = today.getFullYear() - birthDate.getFullYear();\n          const monthDiff = today.getMonth() - birthDate.getMonth();\n          if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {\n            age--;\n          }\n          if (isNaN(birthDate.getTime())) {\n            newErrors.dob = 'Please enter a valid date';\n          } else if (birthDate > today) {\n            newErrors.dob = 'Date of birth cannot be in the future';\n          } else if (age < 13) {\n            newErrors.dob = 'You must be at least 13 years old';\n          } else if (age > 120) {\n            newErrors.dob = 'Please enter a valid date of birth';\n          } else {\n            delete newErrors.dob;\n          }\n        }\n        break;\n      case 'password':\n        if (!value) {\n          newErrors.password = 'Password is required';\n        } else if (value.length < 8) {\n          newErrors.password = 'Password must be at least 8 characters';\n        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(value)) {\n          newErrors.password = 'Password must contain uppercase, lowercase, and number';\n        } else {\n          delete newErrors.password;\n        }\n        break;\n      default:\n        break;\n    }\n    return newErrors;\n  });\n}"
          },
          "handleInputChange": {
            "type": "basic",
            "value": "e => {\n  const {\n    name,\n    value\n  } = e.target;\n  if (name === 'phone') {\n    // Filter out non-phone characters for phone field\n    const filteredValue = value.replace(/[^+0-9\\s\\-()]/g, '');\n    setFormData(prev => ({\n      ...prev,\n      [name]: filteredValue\n    }));\n  } else {\n    // For all other fields, allow normal input\n    setFormData(prev => ({\n      ...prev,\n      [name]: value\n    }));\n  }\n}"
          },
          "handleSubmit": {
            "type": "basic",
            "value": "e => {\n  e.preventDefault();\n  setIsSubmitting(true);\n\n  // Clear any existing errors first\n  setErrors({});\n\n  // Validate all fields\n  Object.keys(formData).forEach(field => {\n    validateField(field, formData[field]);\n  });\n\n  // Wait for all validations to complete, then check errors\n  setTimeout(() => {\n    setErrors(currentErrors => {\n      const hasErrors = Object.keys(currentErrors).length > 0;\n      if (!hasErrors) {\n        // Form is valid - simulate API call\n        setTimeout(() => {\n          alert('🎉 Account created successfully! Welcome aboard!');\n          setIsSubmitting(false);\n          setFormData({\n            name: \"\",\n            email: \"\",\n            phone: \"\",\n            dob: \"\",\n            password: \"\"\n          });\n          setErrors({});\n        }, 1500);\n      } else {\n        // Form has errors - stop submission\n        setIsSubmitting(false);\n      }\n      return currentErrors;\n    });\n  }, 50);\n}"
          }
        },
        "functions": {}
      }
    },
    "root-panel": {
      "id": "root-panel",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "root-panel-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "form-wrapper": {
      "id": "form-wrapper",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "form-wrapper-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-lg mx-auto"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "form-card": {
      "id": "form-card",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "form-card-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm bg-opacity-95"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "form-header": {
      "id": "form-header",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "form-header-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "form-title": {
      "id": "form-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-3xl font-bold text-white mb-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Create Account"
        }
      ]
    },
    "form-subtitle": {
      "id": "form-subtitle",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-blue-100 text-sm"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Join us today and get started in minutes"
        }
      ]
    },
    "form-container": {
      "id": "form-container",
      "type": "panel",
      "componentType": "form",
      "containerIds": [
        "form-container-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "p-8"
        },
        "onSubmit": {
          "type": "variable",
          "reference": "handleSubmit"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "error-display": {
      "id": "error-display",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "error-display-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 mb-6 shadow-sm"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "error-title": {
      "id": "error-title",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "error-title-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex items-center mb-3"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "error-icon": {
      "id": "error-icon",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "w-5 h-5 bg-red-400 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "!"
        }
      ]
    },
    "error-heading": {
      "id": "error-heading",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-red-800 font-semibold text-sm"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Please fix the following errors:"
        }
      ]
    },
    "error-list": {
      "id": "error-list",
      "type": "panel",
      "componentType": "ul",
      "containerIds": [
        "error-list-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-1"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "error-item-template": {
      "id": "error-item-template",
      "type": "panel",
      "componentType": "li",
      "containerIds": [
        "error-item-template-container-1"
      ],
      "props": {
        "key": {
          "type": "variable",
          "reference": "errorEntry[0]"
        },
        "className": {
          "type": "static",
          "value": "text-red-700 text-sm flex items-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "error-bullet": {
      "id": "error-bullet",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "w-1.5 h-1.5 bg-red-400 rounded-full mr-2 mt-1.5 flex-shrink-0"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "error-text": {
      "id": "error-text",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {},
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "errorEntry[1]"
        }
      ]
    },
    "dynamic-2": {
      "id": "dynamic-2",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "map",
        "dataSource": "Object.entries(errors)",
        "itemVariable": "errorEntry",
        "indexVariable": "index",
        "templateId": "error-item-template"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dynamic-1": {
      "id": "dynamic-1",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "Object.keys(errors).length > 0",
        "trueTemplateId": "error-display",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "form-grid": {
      "id": "form-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "form-grid-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "name-field": {
      "id": "name-field",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "name-field-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "group"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "name-label": {
      "id": "name-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "htmlFor": {
          "type": "static",
          "value": "name"
        },
        "className": {
          "type": "static",
          "value": "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Full Name *"
        }
      ]
    },
    "name-input": {
      "id": "name-input",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "text"
        },
        "id": {
          "type": "static",
          "value": "name"
        },
        "name": {
          "type": "static",
          "value": "name"
        },
        "value": {
          "type": "variable",
          "reference": "formData.name"
        },
        "onChange": {
          "type": "variable",
          "reference": "handleInputChange"
        },
        "className": {
          "type": "variable",
          "reference": "errors.name ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        },
        "placeholder": {
          "type": "static",
          "value": "Enter your full name"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "email-field": {
      "id": "email-field",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "email-field-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "group"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "email-label": {
      "id": "email-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "htmlFor": {
          "type": "static",
          "value": "email"
        },
        "className": {
          "type": "static",
          "value": "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Email Address *"
        }
      ]
    },
    "email-input": {
      "id": "email-input",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "email"
        },
        "id": {
          "type": "static",
          "value": "email"
        },
        "name": {
          "type": "static",
          "value": "email"
        },
        "value": {
          "type": "variable",
          "reference": "formData.email"
        },
        "onChange": {
          "type": "variable",
          "reference": "handleInputChange"
        },
        "className": {
          "type": "variable",
          "reference": "errors.email ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        },
        "placeholder": {
          "type": "static",
          "value": "Enter your email address"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "phone-field": {
      "id": "phone-field",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "phone-field-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "group"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "phone-label": {
      "id": "phone-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "htmlFor": {
          "type": "static",
          "value": "phone"
        },
        "className": {
          "type": "static",
          "value": "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Phone Number *"
        }
      ]
    },
    "phone-input": {
      "id": "phone-input",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "tel"
        },
        "id": {
          "type": "static",
          "value": "phone"
        },
        "name": {
          "type": "static",
          "value": "phone"
        },
        "value": {
          "type": "variable",
          "reference": "formData.phone"
        },
        "onChange": {
          "type": "variable",
          "reference": "handleInputChange"
        },
        "className": {
          "type": "variable",
          "reference": "errors.phone ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        },
        "placeholder": {
          "type": "static",
          "value": "Enter your phone number"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "dob-field": {
      "id": "dob-field",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "dob-field-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "group"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dob-label": {
      "id": "dob-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "htmlFor": {
          "type": "static",
          "value": "dob"
        },
        "className": {
          "type": "static",
          "value": "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Date of Birth *"
        }
      ]
    },
    "dob-input": {
      "id": "dob-input",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "date"
        },
        "id": {
          "type": "static",
          "value": "dob"
        },
        "name": {
          "type": "static",
          "value": "dob"
        },
        "value": {
          "type": "variable",
          "reference": "formData.dob"
        },
        "onChange": {
          "type": "variable",
          "reference": "handleInputChange"
        },
        "className": {
          "type": "variable",
          "reference": "errors.dob ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "password-field": {
      "id": "password-field",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "password-field-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "group"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "password-label": {
      "id": "password-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "htmlFor": {
          "type": "static",
          "value": "password"
        },
        "className": {
          "type": "static",
          "value": "block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Password *"
        }
      ]
    },
    "password-input": {
      "id": "password-input",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "password"
        },
        "id": {
          "type": "static",
          "value": "password"
        },
        "name": {
          "type": "static",
          "value": "password"
        },
        "value": {
          "type": "variable",
          "reference": "formData.password"
        },
        "onChange": {
          "type": "variable",
          "reference": "handleInputChange"
        },
        "className": {
          "type": "variable",
          "reference": "errors.password ? 'w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200 bg-red-50 placeholder-gray-500 text-black' : 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 hover:border-gray-300 placeholder-gray-500 text-black'"
        },
        "placeholder": {
          "type": "static",
          "value": "Create a strong password"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "submit-section": {
      "id": "submit-section",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "submit-section-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "pt-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "submit-button": {
      "id": "submit-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "submit"
        },
        "disabled": {
          "type": "variable",
          "reference": "isSubmitting"
        },
        "className": {
          "type": "variable",
          "reference": "isSubmitting ? 'w-full bg-gray-300 text-gray-500 py-4 px-6 rounded-xl cursor-not-allowed transition-all duration-200 font-semibold text-lg' : 'w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-semibold text-lg shadow-lg hover:shadow-xl'"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "isSubmitting ? '⏳ Creating Account...' : '🚀 Create Account'"
        }
      ]
    },
    "form-footer": {
      "id": "form-footer",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "mt-6 text-center text-sm text-gray-600"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Already have an account? Sign in"
        }
      ]
    }
  },
  "containers": {
    "root-container": [
      "root-panel"
    ],
    "root-panel-container-1": [
      "form-wrapper"
    ],
    "form-wrapper-container-1": [
      "form-card"
    ],
    "form-card-container-1": [
      "form-header",
      "form-container"
    ],
    "form-header-container-1": [
      "form-title",
      "form-subtitle"
    ],
    "form-container-container-1": [
      "dynamic-1",
      "form-grid",
      "submit-section",
      "form-footer"
    ],
    "error-display-container-1": [
      "error-title",
      "error-list"
    ],
    "error-title-container-1": [
      "error-icon",
      "error-heading"
    ],
    "error-list-container-1": [
      "dynamic-2"
    ],
    "error-item-template-container-1": [
      "error-bullet",
      "error-text"
    ],
    "form-grid-container-1": [
      "name-field",
      "email-field",
      "phone-field",
      "dob-field",
      "password-field"
    ],
    "name-field-container-1": [
      "name-label",
      "name-input"
    ],
    "email-field-container-1": [
      "email-label",
      "email-input"
    ],
    "phone-field-container-1": [
      "phone-label",
      "phone-input"
    ],
    "dob-field-container-1": [
      "dob-label",
      "dob-input"
    ],
    "password-field-container-1": [
      "password-label",
      "password-input"
    ],
    "submit-section-container-1": [
      "submit-button"
    ]
  }
}