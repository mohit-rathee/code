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
          "products": {
            "type": "useState",
            "value": [
              { "id": 1, "name": "Gaming Laptop", "price": 1299, "category": "electronics", "rating": 4.5, "sales": 150 },
              { "id": 2, "name": "Wireless Mouse", "price": 79, "category": "electronics", "rating": 4.2, "sales": 890 },
              { "id": 3, "name": "Mechanical Keyboard", "price": 189, "category": "electronics", "rating": 4.7, "sales": 456 },
              { "id": 4, "name": "Coffee Maker", "price": 299, "category": "appliances", "rating": 4.1, "sales": 234 },
              { "id": 5, "name": "Desk Chair", "price": 399, "category": "furniture", "rating": 4.3, "sales": 123 },
              { "id": 6, "name": "Standing Desk", "price": 599, "category": "furniture", "rating": 4.6, "sales": 89 },
              { "id": 7, "name": "Air Fryer", "price": 149, "category": "appliances", "rating": 4.4, "sales": 567 },
              { "id": 8, "name": "Smartphone", "price": 899, "category": "electronics", "rating": 4.8, "sales": 1200 }
            ],
            "setter": "setProducts"
          },
          "searchTerm": {
            "type": "useState",
            "value": "",
            "setter": "setSearchTerm"
          },
          "selectedCategory": {
            "type": "useState",
            "value": "all",
            "setter": "setSelectedCategory"
          },
          "sortBy": {
            "type": "useState",
            "value": "name",
            "setter": "setSortBy"
          },
          "minPrice": {
            "type": "useState",
            "value": 0,
            "setter": "setMinPrice"
          },
          "maxPrice": {
            "type": "useState",
            "value": 2000,
            "setter": "setMaxPrice"
          },
          "rerenderCount": {
            "type": "useState",
            "value": 0,
            "setter": "setRerenderCount"
          },
          "filteredProducts": {
            "type": "useMemo",
            "value": `()=>(() => {
              console.log('🧮 Computing filtered products...');
              return products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
                const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
                return matchesSearch && matchesCategory && matchesPrice;
              });
            })()`,
            "dependencies": ["products", "searchTerm", "selectedCategory", "minPrice", "maxPrice"]
          },
          "sortedProducts": {
            "type": "useMemo",
            "value": `()=>(() => {
              console.log('📊 Sorting products...');
              const filtered = [...filteredProducts];
              return filtered.sort((a, b) => {
                switch (sortBy) {
                  case 'price':
                    return a.price - b.price;
                  case 'rating':
                    return b.rating - a.rating;
                  case 'sales':
                    return b.sales - a.sales;
                  case 'name':
                  default:
                    return a.name.localeCompare(b.name);
                }
              });
            })()`,
            "dependencies": ["filteredProducts", "sortBy"]
          },
          "productStats": {
            "type": "useMemo", 
            "value": `()=>(() => {
              console.log('📈 Computing product stats...');
              const filtered = filteredProducts;
              if (filtered.length === 0) return { avgPrice: 0, totalValue: 0, topCategory: 'none' };
              
              const avgPrice = filtered.reduce((sum, p) => sum + p.price, 0) / filtered.length;
              
              // Inline expensive calculation
              console.log('🔥 Running expensive calculation...');
              let result = 0;
              for (let i = 0; i < 100000; i++) {
                result += Math.random();
              }
              const totalValue = filtered.reduce((acc, product) => {
                return acc + (product.price * product.sales * product.rating);
              }, 0);
              
              const categoryCount = filtered.reduce((acc, p) => {
                acc[p.category] = (acc[p.category] || 0) + 1;
                return acc;
              }, {});
              
              const topCategory = Object.keys(categoryCount).reduce((a, b) => 
                categoryCount[a] > categoryCount[b] ? a : b, 'none'
              );
              
              return { avgPrice, totalValue, topCategory, count: filtered.length };
            })()`,
            "dependencies": ["filteredProducts"]
          },
          "handleSearch": {
            "type": "useCallback",
            "value": `(value) => {
              console.log('🔍 Search handler called');
              setSearchTerm(value);
            }`,
            "dependencies": []
          },
          "handleCategoryChange": {
            "type": "useCallback",
            "value": `(category) => {
              console.log('📂 Category handler called');
              setSelectedCategory(category);
            }`,
            "dependencies": []
          },
          "handleAddProduct": {
            "type": "useCallback",
            "value": `() => {
              console.log('➕ Add product handler called');
              const newProduct = {
                id: Date.now(),
                name: \`New Product \${products.length + 1}\`,
                price: Math.floor(Math.random() * 500) + 50,
                category: ['electronics', 'appliances', 'furniture'][Math.floor(Math.random() * 3)],
                rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
                sales: Math.floor(Math.random() * 1000) + 10
              };
              setProducts([...products, newProduct]);
            }`,
            "dependencies": ["products"]
          },
          "handlePriceChange": {
            "type": "useCallback",
            "value": `(type, value) => {
              console.log(\`💰 Price \${type} handler called\`);
              if (type === 'min') {
                setMinPrice(parseInt(value));
              } else {
                setMaxPrice(parseInt(value));
              }
            }`,
            "dependencies": []
          },
          "triggerRerender": {
            "type": "useCallback",
            "value": `() => {
              console.log('🔄 Trigger rerender');
              setRerenderCount(prev => prev + 1);
            }`,
            "dependencies": []
          }
        },
        "functions": {
          "expensiveCalculation": {
            "type": "function",
            "body": `(products) => {
              // Simulate expensive calculation
              console.log('🔥 Running expensive calculation...');
              let result = 0;
              for (let i = 0; i < 1000000; i++) {
                result += Math.random();
              }
              
              return products.reduce((acc, product) => {
                return acc + (product.price * product.sales * product.rating);
              }, 0);
            }`
          }
        }
      }
    },
    "main-container": {
      "id": "main-container",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["main-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "max-w-6xl mx-auto bg-white/10 rounded-xl p-8 backdrop-blur-sm"
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
          "value": "useCallback & useMemo Performance Demo"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "performance-info": {
      "id": "performance-info",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["performance-info-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "performance-title": {
      "id": "performance-title",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg font-semibold mb-2 text-blue-300"
        },
        "children": {
          "type": "static",
          "value": "📊 Performance Monitor"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "performance-text": {
      "id": "performance-text",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-blue-200"
        },
        "children": {
          "type": "static",
          "value": "Open DevTools Console to see when expensive calculations and function calls happen. Notice how useMemo prevents unnecessary recalculations and useCallback prevents unnecessary child re-renders."
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "controls-section": {
      "id": "controls-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["controls-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-8 p-6 bg-white/5 rounded-lg border border-white/10"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "controls-title": {
      "id": "controls-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold mb-4"
        },
        "children": {
          "type": "static",
          "value": "🎛️ Controls (useCallback Examples)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "controls-grid": {
      "id": "controls-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["controls-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "search-control": {
      "id": "search-control",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["search-control-container-1"],
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
    "search-label": {
      "id": "search-label",
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
          "value": "🔍 Search Products"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
          "value": "Search products..."
        },
        "className": {
          "type": "static",
          "value": "w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
        },
        "value": {
          "type": "variable",
          "reference": "searchTerm"
        },
        "onChange": {
          "type": "function",
          "reference": "(e) => handleSearch(e.target.value)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "category-control": {
      "id": "category-control",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["category-control-container-1"],
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
        },
        "children": {
          "type": "static",
          "value": "📂 Category"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "category-select": {
      "id": "category-select",
      "type": "panel",
      "componentType": "select",
      "containerIds": ["category-select-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
        },
        "value": {
          "type": "variable",
          "reference": "selectedCategory"
        },
        "onChange": {
          "type": "function",
          "reference": "(e) => handleCategoryChange(e.target.value)"
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
        },
        "children": {
          "type": "static",
          "value": "All Categories"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "static",
          "value": "Electronics"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "category-option-appliances": {
      "id": "category-option-appliances",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "appliances"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Appliances"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "category-option-furniture": {
      "id": "category-option-furniture",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "furniture"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Furniture"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "sort-control": {
      "id": "sort-control",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["sort-control-container-1"],
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
        },
        "children": {
          "type": "static",
          "value": "📊 Sort By"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "sort-select": {
      "id": "sort-select",
      "type": "panel",
      "componentType": "select",
      "containerIds": ["sort-select-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
        },
        "value": {
          "type": "variable",
          "reference": "sortBy"
        },
        "onChange": {
          "type": "function",
          "reference": "(e) => setSortBy(e.target.value)"
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
        },
        "children": {
          "type": "static",
          "value": "Name"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "static",
          "value": "Price"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
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
        },
        "children": {
          "type": "static",
          "value": "Rating"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "sort-option-sales": {
      "id": "sort-option-sales",
      "type": "item",
      "componentType": "option",
      "containerIds": [],
      "props": {
        "value": {
          "type": "static",
          "value": "sales"
        },
        "className": {
          "type": "static",
          "value": "bg-gray-800 text-white"
        },
        "children": {
          "type": "static",
          "value": "Sales"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "price-controls": {
      "id": "price-controls",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["price-controls-container-1"],
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
    "price-label": {
      "id": "price-label",
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
          "value": "💰 Price Range"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "price-inputs": {
      "id": "price-inputs",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["price-inputs-container-1"],
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
    "min-price-input": {
      "id": "min-price-input",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "number"
        },
        "placeholder": {
          "type": "static",
          "value": "Min"
        },
        "className": {
          "type": "static",
          "value": "flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 text-sm focus:border-green-400 focus:outline-none"
        },
        "value": {
          "type": "variable",
          "reference": "minPrice"
        },
        "onChange": {
          "type": "function",
          "reference": "(e) => handlePriceChange('min', e.target.value)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "max-price-input": {
      "id": "max-price-input",
      "type": "item",
      "componentType": "input",
      "containerIds": [],
      "props": {
        "type": {
          "type": "static",
          "value": "number"
        },
        "placeholder": {
          "type": "static",
          "value": "Max"
        },
        "className": {
          "type": "static",
          "value": "flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 text-sm focus:border-green-400 focus:outline-none"
        },
        "value": {
          "type": "variable",
          "reference": "maxPrice"
        },
        "onChange": {
          "type": "function",
          "reference": "(e) => handlePriceChange('max', e.target.value)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "action-buttons": {
      "id": "action-buttons",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["action-buttons-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "flex gap-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "add-product-button": {
      "id": "add-product-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        },
        "onClick": {
          "type": "function",
          "reference": "handleAddProduct"
        },
        "children": {
          "type": "static",
          "value": "➕ Add Product"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "rerender-button": {
      "id": "rerender-button",
      "type": "item",
      "componentType": "button",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
        },
        "onClick": {
          "type": "function",
          "reference": "triggerRerender"
        },
        "children": {
          "type": "variable",
          "reference": "`🔄 Force Rerender (${rerenderCount})`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stats-section": {
      "id": "stats-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["stats-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "mb-8 p-6 bg-white/5 rounded-lg border border-white/10"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stats-title": {
      "id": "stats-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold mb-4"
        },
        "children": {
          "type": "static",
          "value": "📈 Statistics (useMemo Examples)"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stats-grid": {
      "id": "stats-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["stats-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-count": {
      "id": "stat-count",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["stat-count-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-4 bg-blue-500/20 rounded-lg border border-blue-400/30"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-count-label": {
      "id": "stat-count-label",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-blue-300"
        },
        "children": {
          "type": "static",
          "value": "Filtered Products"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-count-value": {
      "id": "stat-count-value",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-blue-200"
        },
        "children": {
          "type": "variable",
          "reference": "productStats.count"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-avg-price": {
      "id": "stat-avg-price",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["stat-avg-price-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-4 bg-green-500/20 rounded-lg border border-green-400/30"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-avg-price-label": {
      "id": "stat-avg-price-label",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-green-300"
        },
        "children": {
          "type": "static",
          "value": "Average Price"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-avg-price-value": {
      "id": "stat-avg-price-value",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-green-200"
        },
        "children": {
          "type": "variable",
          "reference": "`$${Math.round(productStats.avgPrice)}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-total-value": {
      "id": "stat-total-value",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["stat-total-value-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-4 bg-purple-500/20 rounded-lg border border-purple-400/30"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-total-value-label": {
      "id": "stat-total-value-label",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-purple-300"
        },
        "children": {
          "type": "static",
          "value": "Total Market Value"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-total-value-value": {
      "id": "stat-total-value-value",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold text-purple-200"
        },
        "children": {
          "type": "variable",
          "reference": "`$${Math.round(productStats.totalValue).toLocaleString()}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-top-category": {
      "id": "stat-top-category",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["stat-top-category-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-4 bg-yellow-500/20 rounded-lg border border-yellow-400/30"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-top-category-label": {
      "id": "stat-top-category-label",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-sm text-yellow-300"
        },
        "children": {
          "type": "static",
          "value": "Top Category"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "stat-top-category-value": {
      "id": "stat-top-category-value",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-lg font-bold text-yellow-200 capitalize"
        },
        "children": {
          "type": "variable",
          "reference": "productStats.topCategory"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "products-section": {
      "id": "products-section",
      "type": "panel",
      "componentType": "section",
      "containerIds": ["products-container-1"],
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
    "products-title": {
      "id": "products-title",
      "type": "item",
      "componentType": "h2",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "text-2xl font-bold mb-4"
        },
        "children": {
          "type": "variable",
          "reference": "`🛍️ Products (${sortedProducts.length})`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "products-grid": {
      "id": "products-grid",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["products-grid-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "products-map": {
      "id": "products-map",
      "type": "dynamic-operation",
      "operation": {
        "type": "map",
        "dataSource": "sortedProducts",
        "itemVariable": "product",
        "indexVariable": "index",
        "templateId": "product-card-template"
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
      "containerIds": ["product-card-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
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
    "product-name": {
      "id": "product-name",
      "type": "item",
      "componentType": "h3",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "font-semibold mb-2 text-white"
        },
        "children": {
          "type": "variable",
          "reference": "product.name"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "product-details": {
      "id": "product-details",
      "type": "panel",
      "componentType": "div",
      "containerIds": ["product-details-container-1"],
      "props": {
        "className": {
          "type": "static",
          "value": "space-y-1 text-sm text-gray-300"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "product-price": {
      "id": "product-price",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "font-bold text-green-400"
        },
        "children": {
          "type": "variable",
          "reference": "`$${product.price}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "product-category": {
      "id": "product-category",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "className": {
          "type": "static",
          "value": "capitalize"
        },
        "children": {
          "type": "variable",
          "reference": "`📂 ${product.category}`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "product-rating": {
      "id": "product-rating",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "children": {
          "type": "variable",
          "reference": "`⭐ ${product.rating}/5`"
        }
      },
      "state": {
        "variables": {},
        "functions": {}
      }
    },
    "product-sales": {
      "id": "product-sales",
      "type": "item",
      "componentType": "p",
      "containerIds": [],
      "props": {
        "children": {
          "type": "variable",
          "reference": "`📊 ${product.sales} sold`"
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
      "main-container"
    ],
    "main-container-1": [
      "title",
      "performance-info",
      "controls-section",
      "stats-section",
      "products-section"
    ],
    "performance-info-container-1": [
      "performance-title",
      "performance-text"
    ],
    "controls-container-1": [
      "controls-title",
      "controls-grid",
      "action-buttons"
    ],
    "controls-grid-container-1": [
      "search-control",
      "category-control",
      "sort-control",
      "price-controls"
    ],
    "search-control-container-1": [
      "search-label",
      "search-input"
    ],
    "category-control-container-1": [
      "category-label",
      "category-select"
    ],
    "category-select-container-1": [
      "category-option-all",
      "category-option-electronics",
      "category-option-appliances",
      "category-option-furniture"
    ],
    "sort-control-container-1": [
      "sort-label",
      "sort-select"
    ],
    "sort-select-container-1": [
      "sort-option-name",
      "sort-option-price",
      "sort-option-rating",
      "sort-option-sales"
    ],
    "price-controls-container-1": [
      "price-label",
      "price-inputs"
    ],
    "price-inputs-container-1": [
      "min-price-input",
      "max-price-input"
    ],
    "action-buttons-container-1": [
      "add-product-button",
      "rerender-button"
    ],
    "stats-container-1": [
      "stats-title",
      "stats-grid"
    ],
    "stats-grid-container-1": [
      "stat-count",
      "stat-avg-price",
      "stat-total-value",
      "stat-top-category"
    ],
    "stat-count-container-1": [
      "stat-count-label",
      "stat-count-value"
    ],
    "stat-avg-price-container-1": [
      "stat-avg-price-label",
      "stat-avg-price-value"
    ],
    "stat-total-value-container-1": [
      "stat-total-value-label",
      "stat-total-value-value"
    ],
    "stat-top-category-container-1": [
      "stat-top-category-label",
      "stat-top-category-value"
    ],
    "products-container-1": [
      "products-title",
      "products-grid"
    ],
    "products-grid-container-1": [
      "products-map"
    ],
    "product-card-container-1": [
      "product-name",
      "product-details"
    ],
    "product-details-container-1": [
      "product-price",
      "product-category",
      "product-rating",
      "product-sales"
    ]
  }
};
