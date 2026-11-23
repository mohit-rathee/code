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
          "products": {
            "type": "useState",
            "value": [
              {
                "id": 1,
                "name": "Wireless Headphones",
                "price": 199,
                "category": "electronics",
                "inStock": true,
                "rating": 4.5,
                "image": "🎧"
              },
              {
                "id": 2,
                "name": "Smart Watch",
                "price": 299,
                "category": "electronics",
                "inStock": false,
                "rating": 4.2,
                "image": "⌚"
              },
              {
                "id": 3,
                "name": "Laptop Stand",
                "price": 79,
                "category": "accessories",
                "inStock": true,
                "rating": 4.8,
                "image": "💻"
              },
              {
                "id": 4,
                "name": "Coffee Mug",
                "price": 25,
                "category": "home",
                "inStock": true,
                "rating": 4,
                "image": "☕"
              },
              {
                "id": 5,
                "name": "Desk Lamp",
                "price": 89,
                "category": "home",
                "inStock": true,
                "rating": 4.6,
                "image": "💡"
              },
              {
                "id": 6,
                "name": "Phone Case",
                "price": 35,
                "category": "accessories",
                "inStock": false,
                "rating": 4.3,
                "image": "📱"
              }
            ],
            "setter": "setProducts"
          },
          "selectedCategory": {
            "type": "useState",
            "value": "all",
            "setter": "setSelectedCategory"
          },
          "cart": {
            "type": "useState",
            "value": [],
            "setter": "setCart"
          },
          "showCart": {
            "type": "useState",
            "value": false,
            "setter": "setShowCart"
          },
          "loading": {
            "type": "useState",
            "value": false,
            "setter": "setLoading"
          },
          "sortBy": {
            "type": "useState",
            "value": "name",
            "setter": "setSortBy"
          },
          "showOnlyInStock": {
            "type": "useState",
            "value": false,
            "setter": "setShowOnlyInStock"
          },
          "searchTerm": {
            "type": "useState",
            "value": "",
            "setter": "setSearchTerm"
          },
          "addToCart": {
            "type": "basic",
            "value": "product => {\n  const existingItem = cart.find(item => item.id === product.id);\n  if (existingItem) {\n    setCart(cart.map(item => item.id === product.id ? {\n      ...item,\n      quantity: item.quantity + 1\n    } : item));\n  } else {\n    setCart([...cart, {\n      ...product,\n      quantity: 1\n    }]);\n  }\n}"
          },
          "removeFromCart": {
            "type": "basic",
            "value": "productId => {\n  setCart(cart.filter(item => item.id !== productId));\n}"
          },
          "isInCart": {
            "type": "basic",
            "value": "productId => {\n  return cart.some(item => item.id === productId);\n}"
          },
          "getCartItemQuantity": {
            "type": "basic",
            "value": "productId => {\n  const item = cart.find(item => item.id === productId);\n  return item ? item.quantity : 0;\n}"
          },
          "getFilteredProducts": {
            "type": "basic",
            "value": "() => {\n  let filtered = products;\n\n  // Filter by search term\n  if (searchTerm.trim()) {\n    filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));\n  }\n\n  // Filter by category\n  if (selectedCategory !== 'all') {\n    filtered = filtered.filter(product => product.category === selectedCategory);\n  }\n\n  // Filter by stock status\n  if (showOnlyInStock) {\n    filtered = filtered.filter(product => product.inStock);\n  }\n\n  // Sort products\n  filtered.sort((a, b) => {\n    switch (sortBy) {\n      case 'price':\n        return a.price - b.price;\n      case 'rating':\n        return b.rating - a.rating;\n      case 'name':\n      default:\n        return a.name.localeCompare(b.name);\n    }\n  });\n  return filtered;\n}"
          },
          "getTotalPrice": {
            "type": "basic",
            "value": "() => {\n  return cart.reduce((total, item) => total + item.price * item.quantity, 0);\n}"
          },
          "getCartItemCount": {
            "type": "basic",
            "value": "() => {\n  return cart.reduce((total, item) => total + item.quantity, 0);\n}"
          },
          "clearCart": {
            "type": "basic",
            "value": "() => {\n  setCart([]);\n}"
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
          "value": "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "header": {
      "id": "header",
      "type": "panel",
      "componentType": "header",
      "containerIds": [
        "header-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "nav": {
      "id": "nav",
      "type": "panel",
      "componentType": "nav",
      "containerIds": [
        "nav-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
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
          "value": "text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "🛍️ ShopHub"
        }
      ]
    },
    "cart-button": {
      "id": "cart-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "relative px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => setShowCart(!showCart)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`🛒 Cart (${getCartItemCount()})`"
        }
      ]
    },
    "main-content": {
      "id": "main-content",
      "type": "panel",
      "componentType": "main",
      "containerIds": [
        "main-content-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto px-4 py-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "filters-section": {
      "id": "filters-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": [
        "filters-section-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-8 p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "filters-title": {
      "id": "filters-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-semibold mb-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Filter & Sort Products"
        }
      ]
    },
    "filters-grid": {
      "id": "filters-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "filters-grid-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "search-filter": {
      "id": "search-filter",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "search-filter-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "w-full"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "search-label": {
      "id": "search-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "block text-sm font-medium text-gray-300 mb-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Search Products"
        }
      ]
    },
    "search-input": {
      "id": "search-input",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "text"
        },
        "placeholder": {
          "type": "static",
          "value": "Search by name or category..."
        },
        "className": {
          "type": "static",
          "value": "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
        },
        "value": {
          "type": "variable",
          "reference": "searchTerm"
        },
        "onChange": {
          "type": "variable",
          "reference": "e => setSearchTerm(e.target.value)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "filters-row": {
      "id": "filters-row",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "filters-row-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "grid md:grid-cols-3 gap-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "category-filter": {
      "id": "category-filter",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "category-filter-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "category-label": {
      "id": "category-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "block text-sm font-medium text-gray-300"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Category"
        }
      ]
    },
    "category-select": {
      "id": "category-select",
      "type": "panel",
      "componentType": "select",
      "containerIds": [
        "category-select-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none"
        },
        "value": {
          "type": "variable",
          "reference": "selectedCategory"
        },
        "onChange": {
          "type": "variable",
          "reference": "e => setSelectedCategory(e.target.value)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "category-option-all": {
      "id": "category-option-all",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "all"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "All Categories"
        }
      ]
    },
    "category-option-electronics": {
      "id": "category-option-electronics",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "electronics"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Electronics"
        }
      ]
    },
    "category-option-accessories": {
      "id": "category-option-accessories",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "accessories"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Accessories"
        }
      ]
    },
    "category-option-home": {
      "id": "category-option-home",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "home"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Home"
        }
      ]
    },
    "sort-filter": {
      "id": "sort-filter",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "sort-filter-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "sort-label": {
      "id": "sort-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "block text-sm font-medium text-gray-300"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Sort By"
        }
      ]
    },
    "sort-select": {
      "id": "sort-select",
      "type": "panel",
      "componentType": "select",
      "containerIds": [
        "sort-select-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none"
        },
        "value": {
          "type": "variable",
          "reference": "sortBy"
        },
        "onChange": {
          "type": "variable",
          "reference": "e => setSortBy(e.target.value)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "sort-option-name": {
      "id": "sort-option-name",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "name"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Name"
        }
      ]
    },
    "sort-option-price": {
      "id": "sort-option-price",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "price"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Price"
        }
      ]
    },
    "sort-option-rating": {
      "id": "sort-option-rating",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "rating"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Rating"
        }
      ]
    },
    "stock-filter": {
      "id": "stock-filter",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "stock-filter-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex items-center gap-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stock-checkbox": {
      "id": "stock-checkbox",
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
          "value": "w-4 h-4 text-purple-600 bg-transparent border-gray-300 rounded focus:ring-purple-500"
        },
        "checked": {
          "type": "variable",
          "reference": "showOnlyInStock"
        },
        "onChange": {
          "type": "variable",
          "reference": "e => setShowOnlyInStock(e.target.checked)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": []
    },
    "stock-label": {
      "id": "stock-label",
      "type": "item",
      "componentType": "label",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-gray-300"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "In Stock Only"
        }
      ]
    },
    "loading-spinner": {
      "id": "loading-spinner",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "flex justify-center items-center py-12"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "🔄 Loading products..."
        }
      ]
    },
    "dynamic-1": {
      "id": "dynamic-1",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "loading",
        "trueTemplateId": "loading-spinner",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "products-grid-wrapper": {
      "id": "products-grid-wrapper",
      "type": "panel",
      "componentType": "section",
      "containerIds": [
        "products-grid-wrapper-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "products-header": {
      "id": "products-header",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold mb-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`Products (${getFilteredProducts().length})`"
        }
      ]
    },
    "empty-message": {
      "id": "empty-message",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center py-12 text-gray-400"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "No products found matching your criteria. 😔"
        }
      ]
    },
    "dynamic-3": {
      "id": "dynamic-3",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "getFilteredProducts().length === 0",
        "trueTemplateId": "empty-message",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "products-list": {
      "id": "products-list",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "products-list-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "product-card-template": {
      "id": "product-card-template",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "product-card-template-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
        },
        "key": {
          "type": "variable",
          "reference": "product.id"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "product-image": {
      "id": "product-image",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-6xl text-center mb-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "product.image"
        }
      ]
    },
    "product-info": {
      "id": "product-info",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "product-info-container-1"
      ],
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
    "product-name": {
      "id": "product-name",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-semibold"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "product.name"
        }
      ]
    },
    "product-price": {
      "id": "product-price",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-green-400"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`$${product.price}`"
        }
      ]
    },
    "product-rating": {
      "id": "product-rating",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "flex items-center gap-1"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`⭐ ${product.rating}/5`"
        }
      ]
    },
    "in-stock-badge": {
      "id": "in-stock-badge",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "inline-block px-3 py-1 bg-green-600 text-white text-sm rounded-full"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "✅ In Stock"
        }
      ]
    },
    "out-of-stock-badge": {
      "id": "out-of-stock-badge",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "inline-block px-3 py-1 bg-red-600 text-white text-sm rounded-full"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "❌ Out of Stock"
        }
      ]
    },
    "dynamic-6": {
      "id": "dynamic-6",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "product.inStock",
        "trueTemplateId": "in-stock-badge",
        "falseTemplateId": "out-of-stock-badge"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "add-to-cart-button": {
      "id": "add-to-cart-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "variable",
          "reference": "product.inStock ? 'w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors' : 'w-full mt-4 px-4 py-2 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed'"
        },
        "disabled": {
          "type": "variable",
          "reference": "!product.inStock"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => addToCart(product)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "!product.inStock ? '❌ Unavailable' : getCartItemQuantity(product.id) > 0 ? `🛒 Add to Cart (${getCartItemQuantity(product.id)})` : '🛒 Add to Cart'"
        }
      ]
    },
    "dynamic-5": {
      "id": "dynamic-5",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "map",
        "dataSource": "getFilteredProducts()",
        "itemVariable": "product",
        "indexVariable": "index",
        "templateId": "product-card-template"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dynamic-4": {
      "id": "dynamic-4",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "getFilteredProducts().length > 0",
        "trueTemplateId": "products-list",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dynamic-2": {
      "id": "dynamic-2",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "!loading",
        "trueTemplateId": "products-grid-wrapper",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cart-modal": {
      "id": "cart-modal",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "cart-modal-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => setShowCart(false)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cart-content": {
      "id": "cart-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "cart-content-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "bg-gray-900 rounded-xl p-6 max-w-md w-full max-h-96 overflow-y-auto"
        },
        "onClick": {
          "type": "variable",
          "reference": "e => e.stopPropagation()"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cart-header": {
      "id": "cart-header",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "cart-header-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex justify-between items-center mb-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cart-title": {
      "id": "cart-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Shopping Cart"
        }
      ]
    },
    "cart-close": {
      "id": "cart-close",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-gray-400 hover:text-white"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => setShowCart(false)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "✕"
        }
      ]
    },
    "empty-cart-message": {
      "id": "empty-cart-message",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-center text-gray-400 py-8"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Your cart is empty 🛒"
        }
      ]
    },
    "dynamic-8": {
      "id": "dynamic-8",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "cart.length === 0",
        "trueTemplateId": "empty-cart-message",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cart-items-list": {
      "id": "cart-items-list",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "cart-items-list-container-1"
      ],
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
    "cart-item-template": {
      "id": "cart-item-template",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "cart-item-template-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex items-center justify-between p-3 bg-white/5 rounded-lg"
        },
        "key": {
          "type": "variable",
          "reference": "item.id"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cart-item-info": {
      "id": "cart-item-info",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "cart-item-info-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex items-center gap-3"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cart-item-image": {
      "id": "cart-item-image",
      "type": "item",
      "componentType": "span",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "item.image"
        }
      ]
    },
    "cart-item-details": {
      "id": "cart-item-details",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "cart-item-details-container-1"
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
    "cart-item-name": {
      "id": "cart-item-name",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "font-medium"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "item.name"
        }
      ]
    },
    "cart-item-price": {
      "id": "cart-item-price",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-gray-400"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`$${item.price} × ${item.quantity}`"
        }
      ]
    },
    "cart-item-remove": {
      "id": "cart-item-remove",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-red-400 hover:text-red-300"
        },
        "onClick": {
          "type": "variable",
          "reference": "() => removeFromCart(item.id)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "🗑️"
        }
      ]
    },
    "dynamic-10": {
      "id": "dynamic-10",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "map",
        "dataSource": "cart",
        "itemVariable": "item",
        "indexVariable": "index",
        "templateId": "cart-item-template"
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dynamic-9": {
      "id": "dynamic-9",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "cart.length > 0",
        "trueTemplateId": "cart-items-list",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cart-footer-content": {
      "id": "cart-footer-content",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "cart-footer-content-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "mt-4 pt-4 border-t border-white/20"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "cart-total": {
      "id": "cart-total",
      "type": "item",
      "componentType": "div",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-xl font-bold mb-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "variable",
          "reference": "`Total: $${getTotalPrice()}`"
        }
      ]
    },
    "cart-actions": {
      "id": "cart-actions",
      "type": "panel",
      "componentType": "div",
      "containerIds": [
        "cart-actions-container-1"
      ],
      "props": {
        "className": {
          "type": "static",
          "value": "flex gap-2"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "clear-cart-button": {
      "id": "clear-cart-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        },
        "onClick": {
          "type": "variable",
          "reference": "clearCart"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Clear Cart"
        }
      ]
    },
    "checkout-button": {
      "id": "checkout-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      },
      "children": [
        {
          "type": "static",
          "value": "Checkout"
        }
      ]
    },
    "dynamic-11": {
      "id": "dynamic-11",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "cart.length > 0",
        "trueTemplateId": "cart-footer-content",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "dynamic-7": {
      "id": "dynamic-7",
      "type": "dynamic-operation",
      "componentType": "div",
      "isNested": false,
      "operation": {
        "type": "conditional",
        "condition": "showCart",
        "trueTemplateId": "cart-modal",
        "falseTemplateId": null
      },
      "props": {},
      "containerIds": [],
      "state": {
        "variables": {},
        "functions": {}
      }
    }
  },
  "containers": {
    "root-container": [
      "root-panel"
    ],
    "root-panel-container-1": [
      "header",
      "main-content",
      "dynamic-7"
    ],
    "header-container-1": [
      "nav"
    ],
    "nav-container-1": [
      "logo",
      "cart-button"
    ],
    "main-content-container-1": [
      "filters-section",
      "dynamic-1",
      "dynamic-2"
    ],
    "filters-section-container-1": [
      "filters-title",
      "filters-grid"
    ],
    "filters-grid-container-1": [
      "search-filter",
      "filters-row"
    ],
    "search-filter-container-1": [
      "search-label",
      "search-input"
    ],
    "filters-row-container-1": [
      "category-filter",
      "sort-filter",
      "stock-filter"
    ],
    "category-filter-container-1": [
      "category-label",
      "category-select"
    ],
    "category-select-container-1": [
      "category-option-all",
      "category-option-electronics",
      "category-option-accessories",
      "category-option-home"
    ],
    "sort-filter-container-1": [
      "sort-label",
      "sort-select"
    ],
    "sort-select-container-1": [
      "sort-option-name",
      "sort-option-price",
      "sort-option-rating"
    ],
    "stock-filter-container-1": [
      "stock-checkbox",
      "stock-label"
    ],
    "products-grid-wrapper-container-1": [
      "products-header",
      "dynamic-3",
      "dynamic-4"
    ],
    "products-list-container-1": [
      "dynamic-5"
    ],
    "product-card-template-container-1": [
      "product-image",
      "product-info",
      "dynamic-6",
      "add-to-cart-button"
    ],
    "product-info-container-1": [
      "product-name",
      "product-price",
      "product-rating"
    ],
    "cart-modal-container-1": [
      "cart-content"
    ],
    "cart-content-container-1": [
      "cart-header",
      "dynamic-8",
      "dynamic-9",
      "dynamic-11"
    ],
    "cart-header-container-1": [
      "cart-title",
      "cart-close"
    ],
    "cart-items-list-container-1": [
      "dynamic-10"
    ],
    "cart-item-template-container-1": [
      "cart-item-info",
      "cart-item-remove"
    ],
    "cart-item-info-container-1": [
      "cart-item-image",
      "cart-item-details"
    ],
    "cart-item-details-container-1": [
      "cart-item-name",
      "cart-item-price"
    ],
    "cart-footer-content-container-1": [
      "cart-total",
      "cart-actions"
    ],
    "cart-actions-container-1": [
      "clear-cart-button",
      "checkout-button"
    ]
  }
}