"use client";

import React, { useState, useMemo, useCallback } from 'react';

export default function AppComponent() {
  const [products, setProducts] = useState([{ "id": 1, "name": "Gaming Laptop", "price": 1299, "category": "electronics", "rating": 4.5, "sales": 150 }, { "id": 2, "name": "Wireless Mouse", "price": 79, "category": "electronics", "rating": 4.2, "sales": 890 }, { "id": 3, "name": "Mechanical Keyboard", "price": 189, "category": "electronics", "rating": 4.7, "sales": 456 }, { "id": 4, "name": "Coffee Maker", "price": 299, "category": "appliances", "rating": 4.1, "sales": 234 }, { "id": 5, "name": "Desk Chair", "price": 399, "category": "furniture", "rating": 4.3, "sales": 123 }, { "id": 6, "name": "Standing Desk", "price": 599, "category": "furniture", "rating": 4.6, "sales": 89 }, { "id": 7, "name": "Air Fryer", "price": 149, "category": "appliances", "rating": 4.4, "sales": 567 }, { "id": 8, "name": "Smartphone", "price": 899, "category": "electronics", "rating": 4.8, "sales": 1200 }]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [rerenderCount, setRerenderCount] = useState(0);
  const filteredProducts = useMemo(() => (() => {
    console.log('🧮 Computing filtered products...');
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  })(), [products, searchTerm, selectedCategory, minPrice, maxPrice]);
  const sortedProducts = useMemo(() => (() => {
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
  })(), [filteredProducts, sortBy]);
  const productStats = useMemo(() => (() => {
    console.log('📈 Computing product stats...');
    const filtered = filteredProducts;
    if (filtered.length === 0) return {
      avgPrice: 0,
      totalValue: 0,
      topCategory: 'none'
    };
    const avgPrice = filtered.reduce((sum, p) => sum + p.price, 0) / filtered.length;

    // Inline expensive calculation
    console.log('🔥 Running expensive calculation...');
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.random();
    }
    const totalValue = filtered.reduce((acc, product) => {
      return acc + product.price * product.sales * product.rating;
    }, 0);
    const categoryCount = filtered.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const topCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b, 'none');
    return {
      avgPrice,
      totalValue,
      topCategory,
      count: filtered.length
    };
  })(), [filteredProducts]);
  const handleSearch = useCallback(value => {
    console.log('🔍 Search handler called');
    setSearchTerm(value);
  }, []);
  const handleCategoryChange = useCallback(category => {
    console.log('📂 Category handler called');
    setSelectedCategory(category);
  }, []);
  const handleAddProduct = useCallback(() => {
    console.log('➕ Add product handler called');
    const newProduct = {
      id: Date.now(),
      name: `New Product ${products.length + 1}`,
      price: Math.floor(Math.random() * 500) + 50,
      category: ['electronics', 'appliances', 'furniture'][Math.floor(Math.random() * 3)],
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      sales: Math.floor(Math.random() * 1000) + 10
    };
    setProducts([...products, newProduct]);
  }, [products]);
  const handlePriceChange = useCallback((type, value) => {
    console.log(`💰 Price ${type} handler called`);
    if (type === 'min') {
      setMinPrice(parseInt(value));
    } else {
      setMaxPrice(parseInt(value));
    }
  }, []);
  const triggerRerender = useCallback(() => {
    console.log('🔄 Trigger rerender');
    setRerenderCount(prev => prev + 1);
  }, []);
  const expensiveCalculation = products => {
    // Simulate expensive calculation
    console.log('🔥 Running expensive calculation...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return products.reduce((acc, product) => {
      return acc + product.price * product.sales * product.rating;
    }, 0);
  }


  return (<div
    style={{ "width": "100%", "height": "100%" }}
    data-component-id="root">
    <div
      style={{
        "width": "100%",
        "height": "100%"
      }}
      data-component-id="panel-1">
      <div
        className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-8"
        data-component-id="root-panel">
        <div
          className="max-w-6xl mx-auto bg-white/10 rounded-xl p-8 backdrop-blur-sm"
          data-component-id="main-container">
          <h1
            className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            data-component-id="title">
            useCallback & useMemo Performance Demo
          </h1>
          <div
            className="mb-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg"
            data-component-id="performance-info">
            <h3
              className="text-lg font-semibold mb-2 text-blue-300"
              data-component-id="performance-title">
              📊 Performance Monitor
            </h3>
            <p
              className="text-sm text-blue-200"
              data-component-id="performance-text">
              Open DevTools Console to see when expensive calculations and function calls happen. Notice how useMemo prevents unnecessary recalculations and useCallback prevents unnecessary child re-renders.
            </p>
          </div>
          <section
            className="mb-8 p-6 bg-white/5 rounded-lg border border-white/10"
            data-component-id="controls-section">
            <h2
              className="text-2xl font-bold mb-4"
              data-component-id="controls-title">
              🎛️ Controls (useCallback Examples)
            </h2>
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
              data-component-id="controls-grid">
              <div
                className="space-y-2"
                data-component-id="search-control">
                <label
                  className="block text-sm font-medium text-gray-300"
                  data-component-id="search-label">
                  🔍 Search Products
                </label>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  value={searchTerm}
                  onChange={e => handleSearch(e.target.value)}
                  data-component-id="search-input" />
              </div>
              <div
                className="space-y-2"
                data-component-id="category-control">
                <label
                  className="block text-sm font-medium text-gray-300"
                  data-component-id="category-label">
                  📂 Category
                </label>
                <select
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
                  value={selectedCategory}
                  onChange={e => handleCategoryChange(e.target.value)}
                  data-component-id="category-select">
                  <option
                    value="all"
                    className="bg-gray-800 text-white"
                    data-component-id="category-option-all">
                    All Categories
                  </option>
                  <option
                    value="electronics"
                    className="bg-gray-800 text-white"
                    data-component-id="category-option-electronics">
                    Electronics
                  </option>
                  <option
                    value="appliances"
                    className="bg-gray-800 text-white"
                    data-component-id="category-option-appliances">
                    Appliances
                  </option>
                  <option
                    value="furniture"
                    className="bg-gray-800 text-white"
                    data-component-id="category-option-furniture">
                    Furniture
                  </option>
                </select>
              </div>
              <div
                className="space-y-2"
                data-component-id="sort-control">
                <label
                  className="block text-sm font-medium text-gray-300"
                  data-component-id="sort-label">
                  📊 Sort By
                </label>
                <select
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  data-component-id="sort-select">
                  <option
                    value="name"
                    className="bg-gray-800 text-white"
                    data-component-id="sort-option-name">
                    Name
                  </option>
                  <option
                    value="price"
                    className="bg-gray-800 text-white"
                    data-component-id="sort-option-price">
                    Price
                  </option>
                  <option
                    value="rating"
                    className="bg-gray-800 text-white"
                    data-component-id="sort-option-rating">
                    Rating
                  </option>
                  <option
                    value="sales"
                    className="bg-gray-800 text-white"
                    data-component-id="sort-option-sales">
                    Sales
                  </option>
                </select>
              </div>
              <div
                className="space-y-2"
                data-component-id="price-controls">
                <label
                  className="block text-sm font-medium text-gray-300"
                  data-component-id="price-label">
                  💰 Price Range
                </label>
                <div
                  className="flex gap-2"
                  data-component-id="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 text-sm focus:border-green-400 focus:outline-none"
                    value={minPrice}
                    onChange={e => handlePriceChange('min', e.target.value)}
                    data-component-id="min-price-input" />
                  <input
                    type="number"
                    placeholder="Max"
                    className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 text-sm focus:border-green-400 focus:outline-none"
                    value={maxPrice}
                    onChange={e => handlePriceChange('max', e.target.value)}
                    data-component-id="max-price-input" />
                </div>
              </div>
            </div>
            <div
              className="flex gap-4"
              data-component-id="action-buttons">
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                onClick={handleAddProduct}
                data-component-id="add-product-button">
                ➕ Add Product
              </button>
              <button
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                onClick={triggerRerender}
                data-component-id="rerender-button">
                {`🔄 Force Rerender (${rerenderCount})`}
              </button>
            </div>
          </section>
          <section
            className="mb-8 p-6 bg-white/5 rounded-lg border border-white/10"
            data-component-id="stats-section">
            <h2
              className="text-2xl font-bold mb-4"
              data-component-id="stats-title">
              📈 Statistics (useMemo Examples)
            </h2>
            <div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
              data-component-id="stats-grid">
              <div
                className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30"
                data-component-id="stat-count">
                <p
                  className="text-sm text-blue-300"
                  data-component-id="stat-count-label">
                  Filtered Products
                </p>
                <p
                  className="text-2xl font-bold text-blue-200"
                  data-component-id="stat-count-value">
                  {productStats.count}
                </p>
              </div>
              <div
                className="p-4 bg-green-500/20 rounded-lg border border-green-400/30"
                data-component-id="stat-avg-price">
                <p
                  className="text-sm text-green-300"
                  data-component-id="stat-avg-price-label">
                  Average Price
                </p>
                <p
                  className="text-2xl font-bold text-green-200"
                  data-component-id="stat-avg-price-value">
                  {`$${Math.round(productStats.avgPrice)}`}
                </p>
              </div>
              <div
                className="p-4 bg-purple-500/20 rounded-lg border border-purple-400/30"
                data-component-id="stat-total-value">
                <p
                  className="text-sm text-purple-300"
                  data-component-id="stat-total-value-label">
                  Total Market Value
                </p>
                <p
                  className="text-2xl font-bold text-purple-200"
                  data-component-id="stat-total-value-value">
                  {`$${Math.round(productStats.totalValue).toLocaleString()}`}
                </p>
              </div>
              <div
                className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-400/30"
                data-component-id="stat-top-category">
                <p
                  className="text-sm text-yellow-300"
                  data-component-id="stat-top-category-label">
                  Top Category
                </p>
                <p
                  className="text-lg font-bold text-yellow-200 capitalize"
                  data-component-id="stat-top-category-value">
                  {productStats.topCategory}
                </p>
              </div>
            </div>
          </section>
          <section
            className="p-6 bg-white/5 rounded-lg border border-white/10"
            data-component-id="products-section">
            <h2
              className="text-2xl font-bold mb-4"
              data-component-id="products-title">
              {`🛍️ Products (${sortedProducts.length})`}
            </h2>
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              data-component-id="products-grid">
              {sortedProducts.map((product, index) => (
                <div
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  key={product.id}
                  data-component-id="product-card-template">
                  <h3
                    className="font-semibold mb-2 text-white"
                    data-component-id="product-name">
                    {product.name}
                  </h3>
                  <div
                    className="space-y-1 text-sm text-gray-300"
                    data-component-id="product-details">
                    <p
                      className="font-bold text-green-400"
                      data-component-id="product-price">
                      {`$${product.price}`}
                    </p>
                    <p
                      className="capitalize"
                      data-component-id="product-category">
                      {`📂 ${product.category}`}
                    </p>
                    <p
                      data-component-id="product-rating">
                      {`⭐ ${product.rating}/5`}
                    </p>
                    <p
                      data-component-id="product-sales">
                      {`📊 ${product.sales} sold`}
                    </p>
                  </div>
                </div>
              ))}              </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  );
}
