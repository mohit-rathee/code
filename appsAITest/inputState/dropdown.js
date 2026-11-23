export const state = {
  "items": {
    "root-panel": {
      "id": "root-panel",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["root-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-8"
        }
      },
      "state": {
        "variables": {
          "selectedColor": {
            "type": "useState",
            "value": "blue",
            "setter": "setSelectedColor"
          },
          "selectedSize": {
            "type": "useState",
            "value": "medium",
            "setter": "setSelectedSize"
          },
          "isToggled": {
            "type": "useState",
            "value": false,
            "setter": "setIsToggled"
          }
        },
        "functions": {}
      }
    },
    "test-container": {
      "id": "test-container",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["test-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-4xl mx-auto bg-white/10 rounded-xl p-8 backdrop-blur-sm"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "title": {
      "id": "title",
      "type": "item",
      "componentType": "h1",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        },
        "children": {
          "type": "static",
          "value": "Dropdown Test"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dropdowns-grid": {
      "id": "dropdowns-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["dropdowns-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "grid md:grid-cols-3 gap-6 mb-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "color-dropdown-section": {
      "id": "color-dropdown-section",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["color-dropdown-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-3"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "color-label": {
      "id": "color-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "block text-sm font-medium text-gray-300"
        },
        "children": {
          "type": "static",
          "value": "Choose Color"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "color-select": {
      "id": "color-select",
      "type": "panel",
      "componentType": "select",
      "containerIds": ["color-select-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
        },
        "value": {
          "type": "variable",
          "reference": "selectedColor"
        },
        "onChange": {
          "type": "variable",
          "reference": "(e) => setSelectedColor(e.target.value)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "color-option-blue": {
      "id": "color-option-blue",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "blue"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Blue"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "color-option-red": {
      "id": "color-option-red",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "red"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Red"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "color-option-green": {
      "id": "color-option-green",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "green"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Green"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "color-option-purple": {
      "id": "color-option-purple",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "purple"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Purple"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "size-dropdown-section": {
      "id": "size-dropdown-section",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["size-dropdown-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-3"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "size-label": {
      "id": "size-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "block text-sm font-medium text-gray-300"
        },
        "children": {
          "type": "static",
          "value": "Choose Size"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "size-select": {
      "id": "size-select",
      "type": "panel",
      "componentType": "select",
      "containerIds": ["size-select-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
        },
        "value": {
          "type": "variable",
          "reference": "selectedSize"
        },
        "onChange": {
          "type": "variable",
          "reference": "(e) => setSelectedSize(e.target.value)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "size-option-small": {
      "id": "size-option-small",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "small"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Small"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "size-option-medium": {
      "id": "size-option-medium",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "medium"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Medium"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "size-option-large": {
      "id": "size-option-large",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "large"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Large"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "size-option-xlarge": {
      "id": "size-option-xlarge",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "xlarge"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "X-Large"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "toggle-section": {
      "id": "toggle-section",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["toggle-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-3"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "toggle-label": {
      "id": "toggle-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "block text-sm font-medium text-gray-300"
        },
        "children": {
          "type": "static",
          "value": "Enable Feature"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "toggle-checkbox": {
      "id": "toggle-checkbox",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "checkbox"
        },
        "className": {
          "type": "static",
          "value": "w-6 h-6 text-purple-600 bg-transparent border-gray-300 rounded focus:ring-purple-500"
        },
        "checked": {
          "type": "variable",
          "reference": "isToggled"
        },
        "onChange": {
          "type": "variable",
          "reference": "(e) => setIsToggled(e.target.checked)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "results-section": {
      "id": "results-section",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["results-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 bg-white/5 rounded-lg border border-white/10"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "results-title": {
      "id": "results-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-semibold mb-4"
        },
        "children": {
          "type": "static",
          "value": "Current Selections:"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "color-result": {
      "id": "color-result",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 mb-2"
        },
        "children": {
          "type": "variable",
          "reference": "`Color: ${selectedColor}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "size-result": {
      "id": "size-result",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 mb-2"
        },
        "children": {
          "type": "variable",
          "reference": "`Size: ${selectedSize}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "toggle-result": {
      "id": "toggle-result",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300"
        },
        "children": {
          "type": "variable",
          "reference": "`Feature Enabled: ${isToggled ? 'Yes' : 'No'}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "demo-box": {
      "id": "demo-box",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "`mt-6 w-32 h-32 mx-auto rounded-lg transition-all duration-300 ${selectedColor === 'blue' ? 'bg-blue-500' : selectedColor === 'red' ? 'bg-red-500' : selectedColor === 'green' ? 'bg-green-500' : 'bg-purple-500'} ${selectedSize === 'small' ? 'scale-75' : selectedSize === 'medium' ? 'scale-100' : selectedSize === 'large' ? 'scale-125' : 'scale-150'} ${isToggled ? 'shadow-lg shadow-current animate-pulse' : ''}`"
        },
        "children": {
          "type": "variable",
          "reference": "`${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} ${selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    }
  },
  "containers": {
    "root-container-1": [
      "test-container"
    ],
    "test-container-1": [
      "title",
      "dropdowns-grid",
      "results-section"
    ],
    "dropdowns-grid-container-1": [
      "color-dropdown-section",
      "size-dropdown-section",
      "toggle-section"
    ],
    "color-dropdown-container-1": [
      "color-label",
      "color-select"
    ],
    "color-select-container-1": [
      "color-option-blue",
      "color-option-red",
      "color-option-green",
      "color-option-purple"
    ],
    "size-dropdown-container-1": [
      "size-label",
      "size-select"
    ],
    "size-select-container-1": [
      "size-option-small",
      "size-option-medium",
      "size-option-large",
      "size-option-xlarge"
    ],
    "toggle-container-1": [
      "toggle-label",
      "toggle-checkbox"
    ],
    "results-container-1": [
      "results-title",
      "color-result",
      "size-result",
      "toggle-result",
      "demo-box"
    ]
  }
};
