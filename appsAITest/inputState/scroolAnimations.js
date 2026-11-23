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
          "value": "min-h-screen bg-gray-900 text-white overflow-x-hidden"
        }
      },
      "state": {
        "variables": {
          "scrollY": {
            "type": "useState",
            "value": 0,
            "setter": "setScrollY"
          }
        },
        "functions": {
          "handleScroll": {
            "type": "effect",
            "body": `() => {
              const updateScrollY = () => setScrollY(window.scrollY);
              window.addEventListener('scroll', updateScrollY);
              return () => window.removeEventListener('scroll', updateScrollY);
            }`,
            "dependencies": []
          }
        }
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
          "value": "relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${scrollY * 0.5}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "hero-background": {
      "id": "hero-background",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "absolute inset-0 opacity-20"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `rotate(${scrollY * 0.1}deg) scale(${1 + scrollY * 0.0005})` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "hero-content": {
      "id": "hero-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["hero-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "relative z-10 text-center max-w-6xl mx-auto px-4"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${scrollY * -0.3}px)`, opacity: Math.max(0, 1 - scrollY * 0.002) }"
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
      "componentType": "h1",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse"
        },
        "children": {
          "type": "static",
          "value": "Innovation Unleashed"
        }
      },
      "state": {
        "variables": {},
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
          "value": "text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed"
        },
        "children": {
          "type": "static",
          "value": "Transforming ideas into extraordinary digital experiences through cutting-edge technology and creative excellence."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "hero-cta": {
      "id": "hero-cta",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
        },
        "children": {
          "type": "static",
          "value": "Explore Our Work"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "about-section": {
      "id": "about-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["about-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateX(${Math.sin(scrollY * 0.005) * 20}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "about-content": {
      "id": "about-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["about-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "about-text": {
      "id": "about-text",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["about-text-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-6"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.max(0, (scrollY - 800) * -0.5)}px)`, opacity: Math.min(1, Math.max(0, (scrollY - 600) * 0.002)) }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "about-title": {
      "id": "about-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        },
        "children": {
          "type": "static",
          "value": "About Our Vision"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "about-description": {
      "id": "about-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg text-gray-300 leading-relaxed mb-6"
        },
        "children": {
          "type": "static",
          "value": "We are passionate creators who believe in the power of technology to transform businesses and lives. Our team combines technical expertise with creative vision to deliver solutions that don't just meet expectations—they exceed them."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "about-stats": {
      "id": "about-stats",
      "type": "panel",
      "containerIds": ["about-stats-container-1"],
      "componentType": "div",
      "props": {
        "className": {
          "type": "static",
          "value": "grid grid-cols-3 gap-6 mt-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-1": {
      "id": "stat-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["stat-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.05})` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-1-number": {
      "id": "stat-1-number",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-emerald-400"
        },
        "children": {
          "type": "static",
          "value": "500+"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-1-label": {
      "id": "stat-1-label",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-gray-300"
        },
        "children": {
          "type": "static",
          "value": "Projects"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-2": {
      "id": "stat-2",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["stat-2-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `scale(${1 + Math.sin(scrollY * 0.01 + 1) * 0.05})` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-2-number": {
      "id": "stat-2-number",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-emerald-400"
        },
        "children": {
          "type": "static",
          "value": "10+"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-2-label": {
      "id": "stat-2-label",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-gray-300"
        },
        "children": {
          "type": "static",
          "value": "Years"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-3": {
      "id": "stat-3",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["stat-3-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `scale(${1 + Math.sin(scrollY * 0.01 + 2) * 0.05})` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-3-number": {
      "id": "stat-3-number",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-emerald-400"
        },
        "children": {
          "type": "static",
          "value": "99%"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-3-label": {
      "id": "stat-3-label",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-gray-300"
        },
        "children": {
          "type": "static",
          "value": "Satisfaction"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "services-section": {
      "id": "services-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["services-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "services-title": {
      "id": "services-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.max(0, (scrollY - 1200) * -0.3)}px)` }"
        },
        "children": {
          "type": "static",
          "value": "Our Services"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "services-grid": {
      "id": "services-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["services-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "service-1": {
      "id": "service-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["service-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-8 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.max(0, (scrollY - 1400) * -0.5)}px) rotateY(${scrollY * 0.05}deg)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "service-1-title": {
      "id": "service-1-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold mb-4 text-rose-400"
        },
        "children": {
          "type": "static",
          "value": "Web Development"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "service-1-description": {
      "id": "service-1-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 leading-relaxed"
        },
        "children": {
          "type": "static",
          "value": "Creating responsive, fast, and beautiful websites that deliver exceptional user experiences across all devices and platforms."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "service-2": {
      "id": "service-2",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["service-2-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-8 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.max(0, (scrollY - 1500) * -0.5)}px) rotateY(${scrollY * 0.05}deg)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "service-2-title": {
      "id": "service-2-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold mb-4 text-rose-400"
        },
        "children": {
          "type": "static",
          "value": "Mobile Apps"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "service-2-description": {
      "id": "service-2-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 leading-relaxed"
        },
        "children": {
          "type": "static",
          "value": "Developing native and cross-platform mobile applications that engage users and drive business growth."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "service-3": {
      "id": "service-3",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["service-3-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-8 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.max(0, (scrollY - 1600) * -0.5)}px) rotateY(${scrollY * 0.05}deg)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "service-3-title": {
      "id": "service-3-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold mb-4 text-rose-400"
        },
        "children": {
          "type": "static",
          "value": "UI/UX Design"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "service-3-description": {
      "id": "service-3-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 leading-relaxed"
        },
        "children": {
          "type": "static",
          "value": "Crafting intuitive and visually stunning user interfaces that provide seamless user experiences and drive engagement."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-section": {
      "id": "portfolio-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["portfolio-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-title": {
      "id": "portfolio-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateX(${Math.sin(scrollY * 0.003) * 50}px)` }"
        },
        "children": {
          "type": "static",
          "value": "Our Portfolio"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-grid": {
      "id": "portfolio-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-1": {
      "id": "portfolio-item-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.sin(scrollY * 0.005) * 20}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-1-content": {
      "id": "portfolio-item-1-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-1-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 h-64 flex flex-col justify-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-1-title": {
      "id": "portfolio-item-1-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-2 text-amber-400"
        },
        "children": {
          "type": "static",
          "value": "E-Commerce Platform"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-1-description": {
      "id": "portfolio-item-1-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 text-sm"
        },
        "children": {
          "type": "static",
          "value": "Modern e-commerce solution with advanced features and seamless user experience."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-2": {
      "id": "portfolio-item-2",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-2-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.sin(scrollY * 0.005 + 1) * 20}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-2-content": {
      "id": "portfolio-item-2-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-2-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 h-64 flex flex-col justify-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-2-title": {
      "id": "portfolio-item-2-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-2 text-amber-400"
        },
        "children": {
          "type": "static",
          "value": "Mobile Banking App"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-2-description": {
      "id": "portfolio-item-2-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 text-sm"
        },
        "children": {
          "type": "static",
          "value": "Secure and intuitive mobile banking application with advanced security features."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-3": {
      "id": "portfolio-item-3",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-3-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.sin(scrollY * 0.005 + 2) * 20}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-3-content": {
      "id": "portfolio-item-3-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-3-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 h-64 flex flex-col justify-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-3-title": {
      "id": "portfolio-item-3-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-2 text-amber-400"
        },
        "children": {
          "type": "static",
          "value": "Corporate Website"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-3-description": {
      "id": "portfolio-item-3-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 text-sm"
        },
        "children": {
          "type": "static",
          "value": "Professional corporate website with modern design and enhanced functionality."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-4": {
      "id": "portfolio-item-4",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-4-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.sin(scrollY * 0.005 + 3) * 20}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-4-content": {
      "id": "portfolio-item-4-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-4-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 h-64 flex flex-col justify-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-4-title": {
      "id": "portfolio-item-4-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-2 text-amber-400"
        },
        "children": {
          "type": "static",
          "value": "SaaS Dashboard"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-4-description": {
      "id": "portfolio-item-4-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 text-sm"
        },
        "children": {
          "type": "static",
          "value": "Comprehensive analytics dashboard with real-time data visualization and reporting."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-5": {
      "id": "portfolio-item-5",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-5-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.sin(scrollY * 0.005 + 4) * 20}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-5-content": {
      "id": "portfolio-item-5-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-5-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 h-64 flex flex-col justify-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-5-title": {
      "id": "portfolio-item-5-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-2 text-amber-400"
        },
        "children": {
          "type": "static",
          "value": "Social Media Platform"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-5-description": {
      "id": "portfolio-item-5-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 text-sm"
        },
        "children": {
          "type": "static",
          "value": "Innovative social networking platform with advanced community features and engagement tools."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-6": {
      "id": "portfolio-item-6",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-6-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.sin(scrollY * 0.005 + 5) * 20}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-6-content": {
      "id": "portfolio-item-6-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["portfolio-item-6-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 h-64 flex flex-col justify-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-6-title": {
      "id": "portfolio-item-6-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-2 text-amber-400"
        },
        "children": {
          "type": "static",
          "value": "Learning Management System"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "portfolio-item-6-description": {
      "id": "portfolio-item-6-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 text-sm"
        },
        "children": {
          "type": "static",
          "value": "Comprehensive educational platform with interactive courses and progress tracking."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "team-section": {
      "id": "team-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["team-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "team-title": {
      "id": "team-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-400 to-gray-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.max(0, (scrollY - 2800) * -0.3)}px)` }"
        },
        "children": {
          "type": "static",
          "value": "Meet Our Team"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "team-grid": {
      "id": "team-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["team-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "team-member-1": {
      "id": "team-member-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["team-member-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.max(0, (scrollY - 3000) * -0.4)}px) rotateX(${scrollY * 0.05}deg)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "team-member-1-avatar": {
      "id": "team-member-1-avatar",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
        },
        "children": {
          "type": "static",
          "value": "JS"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "team-member-1-name": {
      "id": "team-member-1-name",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-2 text-slate-300"
        },
        "children": {
          "type": "static",
          "value": "John Smith"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "team-member-1-role": {
      "id": "team-member-1-role",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-slate-400 text-sm"
        },
        "children": {
          "type": "static",
          "value": "Lead Developer"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "testimonials-section": {
      "id": "testimonials-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["testimonials-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "testimonials-title": {
      "id": "testimonials-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `scale(${1 + Math.sin(scrollY * 0.008) * 0.1})` }"
        },
        "children": {
          "type": "static",
          "value": "Client Testimonials"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "testimonials-grid": {
      "id": "testimonials-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["testimonials-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "testimonial-1": {
      "id": "testimonial-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["testimonial-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateX(${Math.sin(scrollY * 0.006) * 30}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "testimonial-1-quote": {
      "id": "testimonial-1-quote",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 italic mb-4"
        },
        "children": {
          "type": "static",
          "value": "\"Outstanding work! The team delivered beyond our expectations with incredible attention to detail and innovative solutions.\""
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "testimonial-1-author": {
      "id": "testimonial-1-author",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-green-400 font-semibold"
        },
        "children": {
          "type": "static",
          "value": "- Sarah Johnson, CEO TechCorp"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "process-section": {
      "id": "process-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["process-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "process-title": {
      "id": "process-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.sin(scrollY * 0.004) * 40}px)` }"
        },
        "children": {
          "type": "static",
          "value": "Our Process"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "process-steps": {
      "id": "process-steps",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["process-steps-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "process-step-1": {
      "id": "process-step-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["process-step-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.max(0, (scrollY - 4500) * -0.3)}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "process-step-1-number": {
      "id": "process-step-1-number",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold"
        },
        "children": {
          "type": "static",
          "value": "1"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "process-step-1-title": {
      "id": "process-step-1-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-2 text-violet-300"
        },
        "children": {
          "type": "static",
          "value": "Discovery"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "process-step-1-description": {
      "id": "process-step-1-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 text-sm"
        },
        "children": {
          "type": "static",
          "value": "We understand your needs and goals through detailed consultation and research."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "skills-section": {
      "id": "skills-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["skills-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "skills-title": {
      "id": "skills-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `rotateX(${Math.sin(scrollY * 0.005) * 10}deg)` }"
        },
        "children": {
          "type": "static",
          "value": "Our Skills"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "skills-grid": {
      "id": "skills-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["skills-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "skill-1": {
      "id": "skill-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["skill-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.05})` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "skill-1-name": {
      "id": "skill-1-name",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-4 text-blue-400"
        },
        "children": {
          "type": "static",
          "value": "React & Next.js"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "skill-1-bar": {
      "id": "skill-1-bar",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "w-full bg-gray-700 rounded-full h-2 mb-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "achievements-section": {
      "id": "achievements-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["achievements-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "achievements-title": {
      "id": "achievements-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateX(${Math.cos(scrollY * 0.004) * 60}px)` }"
        },
        "children": {
          "type": "static",
          "value": "Our Achievements"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "achievements-grid": {
      "id": "achievements-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["achievements-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "achievement-1": {
      "id": "achievement-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["achievement-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `rotateY(${Math.sin(scrollY * 0.008) * 15}deg)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "achievement-1-icon": {
      "id": "achievement-1-icon",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl mb-4"
        },
        "children": {
          "type": "static",
          "value": "🏆"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "achievement-1-title": {
      "id": "achievement-1-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-2 text-yellow-400"
        },
        "children": {
          "type": "static",
          "value": "Best Agency 2024"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "achievement-1-description": {
      "id": "achievement-1-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 text-sm"
        },
        "children": {
          "type": "static",
          "value": "Recognized for outstanding digital innovation and client satisfaction."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "blog-section": {
      "id": "blog-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["blog-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "blog-title": {
      "id": "blog-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.sin(scrollY * 0.003) * 50}px)` }"
        },
        "children": {
          "type": "static",
          "value": "Latest Blog Posts"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "blog-grid": {
      "id": "blog-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["blog-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "blog-post-1": {
      "id": "blog-post-1",
      "type": "panel",
      "componentType": "article",
      "containerIds": ["blog-post-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.cos(scrollY * 0.007) * 25}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "blog-post-1-date": {
      "id": "blog-post-1-date",
      "type": "item",
      "componentType": "time",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-cyan-400 text-sm mb-2 block"
        },
        "children": {
          "type": "static",
          "value": "January 15, 2024"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "blog-post-1-title": {
      "id": "blog-post-1-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-4 text-white"
        },
        "children": {
          "type": "static",
          "value": "The Future of Web Development"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "blog-post-1-excerpt": {
      "id": "blog-post-1-excerpt",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-300 text-sm line-clamp-3"
        },
        "children": {
          "type": "static",
          "value": "Exploring the latest trends and technologies shaping the future of web development, from AI integration to progressive web apps."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "faq-section": {
      "id": "faq-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["faq-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "faq-title": {
      "id": "faq-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-400 to-slate-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `rotateZ(${Math.sin(scrollY * 0.006) * 2}deg)` }"
        },
        "children": {
          "type": "static",
          "value": "Frequently Asked Questions"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "faq-list": {
      "id": "faq-list",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["faq-list-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-4xl mx-auto px-4 space-y-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "faq-item-1": {
      "id": "faq-item-1",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["faq-item-1-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateX(${Math.sin(scrollY * 0.007) * 20}px)` }"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "faq-item-1-question": {
      "id": "faq-item-1-question",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-4 text-gray-300"
        },
        "children": {
          "type": "static",
          "value": "How long does a typical project take?"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "faq-item-1-answer": {
      "id": "faq-item-1-answer",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-400 leading-relaxed"
        },
        "children": {
          "type": "static",
          "value": "Project timelines vary depending on complexity and scope. A typical website takes 4-8 weeks, while more complex applications may take 3-6 months. We provide detailed timelines during the planning phase."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "contact-section": {
      "id": "contact-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["contact-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "contact-title": {
      "id": "contact-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.1})` }"
        },
        "children": {
          "type": "static",
          "value": "Get In Touch"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "contact-content": {
      "id": "contact-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["contact-content-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-4xl mx-auto px-4 text-center"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "contact-description": {
      "id": "contact-description",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl text-gray-300 mb-8 leading-relaxed"
        },
        "children": {
          "type": "static",
          "value": "Ready to transform your ideas into reality? Let's discuss how we can help bring your vision to life with innovative solutions tailored to your needs."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "contact-cta": {
      "id": "contact-cta",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
        },
        "style": {
          "type": "variable",
          "reference": "{ transform: `translateY(${Math.sin(scrollY * 0.008) * 10}px)` }"
        },
        "children": {
          "type": "static",
          "value": "Start Your Project"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "footer": {
      "id": "footer",
      "type": "panel",
      "componentType": "footer",
      "containerIds": ["footer-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "py-12 bg-gray-900 text-center border-t border-gray-800"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "footer-text": {
      "id": "footer-text",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-400"
        },
        "children": {
          "type": "static",
          "value": "© 2024 Innovation Unleashed. All rights reserved."
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
      "hero-section",
      "about-section",
      "services-section",
      "portfolio-section",
      "team-section",
      "testimonials-section",
      "process-section",
      "skills-section",
      "achievements-section",
      "blog-section",
      "faq-section",
      "contact-section",
      "footer"
    ],
    "hero-container-1": [
      "hero-background",
      "hero-content"
    ],
    "hero-content-container-1": [
      "hero-title",
      "hero-subtitle",
      "hero-cta"
    ],
    "about-container-1": [
      "about-content"
    ],
    "about-content-container-1": [
      "about-text",
      "about-stats"
    ],
    "about-text-container-1": [
      "about-title",
      "about-description"
    ],
    "about-stats-container-1": [
      "stat-1",
      "stat-2",
      "stat-3"
    ],
    "stat-1-container-1": [
      "stat-1-number",
      "stat-1-label"
    ],
    "stat-2-container-1": [
      "stat-2-number",
      "stat-2-label"
    ],
    "stat-3-container-1": [
      "stat-3-number",
      "stat-3-label"
    ],
    "services-container-1": [
      "services-title",
      "services-grid"
    ],
    "services-grid-container-1": [
      "service-1",
      "service-2",
      "service-3"
    ],
    "service-1-container-1": [
      "service-1-title",
      "service-1-description"
    ],
    "service-2-container-1": [
      "service-2-title",
      "service-2-description"
    ],
    "service-3-container-1": [
      "service-3-title",
      "service-3-description"
    ],
    "portfolio-container-1": [
      "portfolio-title",
      "portfolio-grid"
    ],
    "portfolio-grid-container-1": [
      "portfolio-item-1",
      "portfolio-item-2",
      "portfolio-item-3",
      "portfolio-item-4",
      "portfolio-item-5",
      "portfolio-item-6"
    ],
    "portfolio-item-1-container-1": [
      "portfolio-item-1-content"
    ],
    "portfolio-item-2-container-1": [
      "portfolio-item-2-content"
    ],
    "portfolio-item-2-content-container-1": [
      "portfolio-item-2-title",
      "portfolio-item-2-description"
    ],
    "portfolio-item-3-container-1": [
      "portfolio-item-3-content"
    ],
    "portfolio-item-3-content-container-1": [
      "portfolio-item-3-title",
      "portfolio-item-3-description"
    ],
    "portfolio-item-4-container-1": [
      "portfolio-item-4-content"
    ],
    "portfolio-item-4-content-container-1": [
      "portfolio-item-4-title",
      "portfolio-item-4-description"
    ],
    "portfolio-item-5-container-1": [
      "portfolio-item-5-content"
    ],
    "portfolio-item-5-content-container-1": [
      "portfolio-item-5-title",
      "portfolio-item-5-description"
    ],
    "portfolio-item-6-container-1": [
      "portfolio-item-6-content"
    ],
    "portfolio-item-6-content-container-1": [
      "portfolio-item-6-title",
      "portfolio-item-6-description"
    ],
    "team-container-1": [
      "team-title",
      "team-grid"
    ],
    "team-grid-container-1": [
      "team-member-1"
    ],
    "team-member-1-container-1": [
      "team-member-1-avatar",
      "team-member-1-name",
      "team-member-1-role"
    ],
    "testimonials-container-1": [
      "testimonials-title",
      "testimonials-grid"
    ],
    "testimonials-grid-container-1": [
      "testimonial-1"
    ],
    "testimonial-1-container-1": [
      "testimonial-1-quote",
      "testimonial-1-author"
    ],
    "process-container-1": [
      "process-title",
      "process-steps"
    ],
    "process-steps-container-1": [
      "process-step-1"
    ],
    "process-step-1-container-1": [
      "process-step-1-number",
      "process-step-1-title",
      "process-step-1-description"
    ],
    "skills-container-1": [
      "skills-title",
      "skills-grid"
    ],
    "skills-grid-container-1": [
      "skill-1"
    ],
    "skill-1-container-1": [
      "skill-1-name",
      "skill-1-bar"
    ],
    "achievements-container-1": [
      "achievements-title",
      "achievements-grid"
    ],
    "achievements-grid-container-1": [
      "achievement-1"
    ],
    "achievement-1-container-1": [
      "achievement-1-icon",
      "achievement-1-title",
      "achievement-1-description"
    ],
    "blog-container-1": [
      "blog-title",
      "blog-grid"
    ],
    "blog-grid-container-1": [
      "blog-post-1"
    ],
    "blog-post-1-container-1": [
      "blog-post-1-date",
      "blog-post-1-title",
      "blog-post-1-excerpt"
    ],
    "faq-container-1": [
      "faq-title",
      "faq-list"
    ],
    "faq-list-container-1": [
      "faq-item-1"
    ],
    "faq-item-1-container-1": [
      "faq-item-1-question",
      "faq-item-1-answer"
    ],
    "contact-container-1": [
      "contact-title",
      "contact-content"
    ],
    "contact-content-container-1": [
      "contact-description",
      "contact-cta"
    ],
    "footer-container-1": [
      "footer-text"
    ]
  }
};
