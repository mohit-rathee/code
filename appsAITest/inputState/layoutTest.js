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
          "value": "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "animated-bg": {
      "id": "animated-bg",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 animate-pulse"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "navbar": {
      "id": "navbar",
      "type": "panel",
      "componentType": "nav",
      "containerIds": ["navbar-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 py-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "nav-content": {
      "id": "nav-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["nav-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-7xl mx-auto flex items-center justify-between"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "logo": {
      "id": "logo",
      "type": "item",
      "componentType": "h1",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        }
      },
      "state": {
        "variables": {
          "logoText": {
            "type": "static",
            "value": "✨ ModernUI"
          }
        },
        "functions": {}
      }
    },
    "nav-links": {
      "id": "nav-links",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["nav-links-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "hidden md:flex space-x-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "nav-link-1": {
      "id": "nav-link-1",
      "type": "item",
      "componentType": "a",
      "containerIds": [],
      "props": {
        "href": {
          "type": "static",
          "value": "#home"
        },
        "className": {
          "type": "static",
          "value": "text-white/90 hover:text-white transition-colors duration-200 hover:scale-105 transform"
        }
      },
      "state": {
        "variables": {
          "linkText": {
            "type": "static",
            "value": "Home"
          }
        },
        "functions": {}
      }
    },
    "nav-link-2": {
      "id": "nav-link-2",
      "type": "item",
      "componentType": "a",
      "containerIds": [],
      "props": {
        "href": {
          "type": "static",
          "value": "#features"
        },
        "className": {
          "type": "static",
          "value": "text-white/90 hover:text-white transition-colors duration-200 hover:scale-105 transform"
        }
      },
      "state": {
        "variables": {
          "linkText": {
            "type": "static",
            "value": "Features"
          }
        },
        "functions": {}
      }
    },
    "nav-link-3": {
      "id": "nav-link-3",
      "type": "item",
      "componentType": "a",
      "containerIds": [],
      "props": {
        "href": {
          "type": "static",
          "value": "#contact"
        },
        "className": {
          "type": "static",
          "value": "text-white/90 hover:text-white transition-colors duration-200 hover:scale-105 transform"
        }
      },
      "state": {
        "variables": {
          "linkText": {
            "type": "static",
            "value": "Contact"
          }
        },
        "functions": {}
      }
    },
    "cta-button": {
      "id": "cta-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
        }
      },
      "state": {
        "variables": {
          "buttonText": {
            "type": "static",
            "value": "Get Started"
          }
        },
        "functions": {}
      }
    },
    "hero-section": {
      "id": "hero-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["hero-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "relative z-10 max-w-7xl mx-auto px-6 py-20 text-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "hero-title": {
      "id": "hero-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse"
        }
      },
      "state": {
        "variables": {
          "title": {
            "type": "static",
            "value": "Build Beautiful Apps"
          }
        },
        "functions": {}
      }
    },
    "hero-subtitle": {
      "id": "hero-subtitle",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        }
      },
      "state": {
        "variables": {
          "subtitle": {
            "type": "static",
            "value": "Create stunning user interfaces with our next-generation design system. Fast, flexible, and absolutely gorgeous."
          }
        },
        "functions": {}
      }
    },
    "hero-buttons": {
      "id": "hero-buttons",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["hero-buttons-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "primary-button": {
      "id": "primary-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
        }
      },
      "state": {
        "variables": {
          "buttonText": {
            "type": "static",
            "value": "🚀 Start Building"
          }
        },
        "functions": {}
      }
    },
    "secondary-button": {
      "id": "secondary-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
        }
      },
      "state": {
        "variables": {
          "buttonText": {
            "type": "static",
            "value": "📖 Learn More"
          }
        },
        "functions": {}
      }
    },
    "features-grid": {
      "id": "features-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["features-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "feature-card-1": {
      "id": "feature-card-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["feature-card-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform hover:shadow-2xl"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "feature-1-icon": {
      "id": "feature-1-icon",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-6xl mb-6 text-center"
        }
      },
      "state": {
        "variables": {
          "icon": {
            "type": "static",
            "value": "⚡"
          }
        },
        "functions": {}
      }
    },
    "feature-1-title": {
      "id": "feature-1-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-white mb-4 text-center"
        }
      },
      "state": {
        "variables": {
          "title": {
            "type": "static",
            "value": "Lightning Fast"
          }
        },
        "functions": {}
      }
    },
    "feature-1-description": {
      "id": "feature-1-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-white/70 text-center leading-relaxed"
        }
      },
      "state": {
        "variables": {
          "description": {
            "type": "static",
            "value": "Blazing fast performance with optimized rendering and minimal bundle size."
          }
        },
        "functions": {}
      }
    },
    "feature-card-2": {
      "id": "feature-card-2",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["feature-card-2-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform hover:shadow-2xl"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "feature-2-icon": {
      "id": "feature-2-icon",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-6xl mb-6 text-center"
        }
      },
      "state": {
        "variables": {
          "icon": {
            "type": "static",
            "value": "🎨"
          }
        },
        "functions": {}
      }
    },
    "feature-2-title": {
      "id": "feature-2-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-white mb-4 text-center"
        }
      },
      "state": {
        "variables": {
          "title": {
            "type": "static",
            "value": "Beautiful Design"
          }
        },
        "functions": {}
      }
    },
    "feature-2-description": {
      "id": "feature-2-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-white/70 text-center leading-relaxed"
        }
      },
      "state": {
        "variables": {
          "description": {
            "type": "static",
            "value": "Stunning visual components with modern design patterns and smooth animations."
          }
        },
        "functions": {}
      }
    },
    "feature-card-3": {
      "id": "feature-card-3",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["feature-card-3-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform hover:shadow-2xl"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "feature-3-icon": {
      "id": "feature-3-icon",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-6xl mb-6 text-center"
        }
      },
      "state": {
        "variables": {
          "icon": {
            "type": "static",
            "value": "🛠️"
          }
        },
        "functions": {}
      }
    },
    "feature-3-title": {
      "id": "feature-3-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-white mb-4 text-center"
        }
      },
      "state": {
        "variables": {
          "title": {
            "type": "static",
            "value": "Developer Friendly"
          }
        },
        "functions": {}
      }
    },
    "feature-3-description": {
      "id": "feature-3-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-white/70 text-center leading-relaxed"
        }
      },
      "state": {
        "variables": {
          "description": {
            "type": "static",
            "value": "Intuitive API with TypeScript support and excellent developer experience."
          }
        },
        "functions": {}
      }
    }
  },
  "containers": {
    "root-container-1": [
      "animated-bg",
      "navbar",
      "hero-section"
    ],
    "navbar-container-1": [
      "nav-content"
    ],
    "nav-content-container-1": [
      "logo",
      "nav-links",
      "cta-button"
    ],
    "nav-links-container-1": [
      "nav-link-1",
      "nav-link-2",
      "nav-link-3"
    ],
    "hero-container-1": [
      "hero-title",
      "hero-subtitle",
      "hero-buttons",
      "features-grid"
    ],
    "hero-buttons-container-1": [
      "primary-button",
      "secondary-button"
    ],
    "features-grid-container-1": [
      "feature-card-1",
      "feature-card-2",
      "feature-card-3"
    ],
    "feature-card-1-container-1": [
      "feature-1-icon",
      "feature-1-title",
      "feature-1-description"
    ],
    "feature-card-2-container-1": [
      "feature-2-icon",
      "feature-2-title",
      "feature-2-description"
    ],
    "feature-card-3-container-1": [
      "feature-3-icon",
      "feature-3-title",
      "feature-3-description"
    ]
  }
}
