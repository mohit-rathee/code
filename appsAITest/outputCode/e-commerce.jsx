"use client";

import React, { useState } from 'react';

export default function AppComponent() {
  const [products, setProducts] = useState([{"id":1,"name":"Wireless Headphones","price":199,"category":"electronics","inStock":true,"rating":4.5,"image":"🎧"},{"id":2,"name":"Smart Watch","price":299,"category":"electronics","inStock":false,"rating":4.2,"image":"⌚"},{"id":3,"name":"Laptop Stand","price":79,"category":"accessories","inStock":true,"rating":4.8,"image":"💻"},{"id":4,"name":"Coffee Mug","price":25,"category":"home","inStock":true,"rating":4,"image":"☕"},{"id":5,"name":"Desk Lamp","price":89,"category":"home","inStock":true,"rating":4.6,"image":"💡"},{"id":6,"name":"Phone Case","price":35,"category":"accessories","inStock":false,"rating":4.3,"image":"📱"}]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const addToCart = product => {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    setCart(cart.map(item => item.id === product.id ? {
      ...item,
      quantity: item.quantity + 1
    } : item));
  } else {
    setCart([...cart, {
      ...product,
      quantity: 1
    }]);
  }
}
  const removeFromCart = productId => {
  setCart(cart.filter(item => item.id !== productId));
}
  const isInCart = productId => {
  return cart.some(item => item.id === productId);
}
  const getCartItemQuantity = productId => {
  const item = cart.find(item => item.id === productId);
  return item ? item.quantity : 0;
}
  const getFilteredProducts = () => {
  let filtered = products;

  // Filter by search term
  if (searchTerm.trim()) {
    filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  // Filter by category
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }

  // Filter by stock status
  if (showOnlyInStock) {
    filtered = filtered.filter(product => product.inStock);
  }

  // Sort products
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });
  return filtered;
}
  const getTotalPrice = () => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
  const getCartItemCount = () => {
  return cart.reduce((total, item) => total + item.quantity, 0);
}
  const clearCart = () => {
  setCart([]);
}


  return (    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
      data-component-id="root-panel">
      <header
        className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50"
        data-component-id="header">
        <nav
          className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
          data-component-id="nav">
          <h1
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            data-component-id="logo">
            🛍️ ShopHub
          </h1>
          <button
            className="relative px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2"
            onClick={() => setShowCart(!showCart)}
            data-component-id="cart-button">
            {`🛒 Cart (${getCartItemCount()})`}
          </button>
        </nav>
      </header>
      <main
        className="max-w-6xl mx-auto px-4 py-8"
        data-component-id="main-content">
        <section
          className="mb-8 p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
          data-component-id="filters-section">
          <h2
            className="text-xl font-semibold mb-4"
            data-component-id="filters-title">
            Filter & Sort Products
          </h2>
          <div
            className="space-y-4"
            data-component-id="filters-grid">
            <div
              className="w-full"
              data-component-id="search-filter">
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                data-component-id="search-label">
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by name or category..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                data-component-id="search-input" />
            </div>
            <div
              className="grid md:grid-cols-3 gap-4"
              data-component-id="filters-row">
              <div
                className="space-y-2"
                data-component-id="category-filter">
                <label
                  className="block text-sm font-medium text-gray-300"
                  data-component-id="category-label">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
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
                    value="accessories"
                    className="bg-gray-800 text-white"
                    data-component-id="category-option-accessories">
                    Accessories
                  </option>
                  <option
                    value="home"
                    className="bg-gray-800 text-white"
                    data-component-id="category-option-home">
                    Home
                  </option>
                </select>
              </div>
              <div
                className="space-y-2"
                data-component-id="sort-filter">
                <label
                  className="block text-sm font-medium text-gray-300"
                  data-component-id="sort-label">
                  Sort By
                </label>
                <select
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none"
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
                </select>
              </div>
              <div
                className="flex items-center gap-2"
                data-component-id="stock-filter">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 bg-transparent border-gray-300 rounded focus:ring-purple-500"
                  checked={showOnlyInStock}
                  onChange={e => setShowOnlyInStock(e.target.checked)}
                  data-component-id="stock-checkbox" />
                <label
                  className="text-sm text-gray-300"
                  data-component-id="stock-label">
                  In Stock Only
                </label>
              </div>
            </div>
          </div>
        </section>
        {loading && (
          <div
            className="flex justify-center items-center py-12"
            data-component-id="loading-spinner">
            🔄 Loading products...
          </div>
        )}        {!loading && (
          <section
            className="mb-8"
            data-component-id="products-grid-wrapper">
            <h2
              className="text-2xl font-bold mb-6"
              data-component-id="products-header">
              {`Products (${getFilteredProducts().length})`}
            </h2>
            {getFilteredProducts().length === 0 && (
              <div
                className="text-center py-12 text-gray-400"
                data-component-id="empty-message">
                No products found matching your criteria. 😔
              </div>
            )}            {getFilteredProducts().length > 0 && (
              <div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-component-id="products-list">
                {getFilteredProducts().map((product, index) => (
                  <div
                    className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
                    key={product.id}
                    data-component-id="product-card-template">
                    <div
                      className="text-6xl text-center mb-4"
                      data-component-id="product-image">
                      {product.image}
                    </div>
                    <div
                      className="space-y-3"
                      data-component-id="product-info">
                      <h3
                        className="text-xl font-semibold"
                        data-component-id="product-name">
                        {product.name}
                      </h3>
                      <p
                        className="text-2xl font-bold text-green-400"
                        data-component-id="product-price">
                        {`$${product.price}`}
                      </p>
                      <div
                        className="flex items-center gap-1"
                        data-component-id="product-rating">
                        {`⭐ ${product.rating}/5`}
                      </div>
                    </div>
                    {
                      product.inStock ? (
                      <span
                        className="inline-block px-3 py-1 bg-green-600 text-white text-sm rounded-full"
                        data-component-id="in-stock-badge">
                        ✅ In Stock
                      </span>
                      ) : (
                      <span
                        className="inline-block px-3 py-1 bg-red-600 text-white text-sm rounded-full"
                        data-component-id="out-of-stock-badge">
                        ❌ Out of Stock
                      </span>
                      )
                    }                    <button
                      className={product.inStock ? 'w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors' : 'w-full mt-4 px-4 py-2 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed'}
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                      data-component-id="add-to-cart-button">
                      {!product.inStock ? '❌ Unavailable' : getCartItemQuantity(product.id) > 0 ? `🛒 Add to Cart (${getCartItemQuantity(product.id)})` : '🛒 Add to Cart'}
                    </button>
                  </div>
                ))}              </div>
            )}          </section>
        )}      </main>
      {showCart && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCart(false)}
          data-component-id="cart-modal">
          <div
            className="bg-gray-900 rounded-xl p-6 max-w-md w-full max-h-96 overflow-y-auto"
            onClick={e => e.stopPropagation()}
            data-component-id="cart-content">
            <div
              className="flex justify-between items-center mb-4"
              data-component-id="cart-header">
              <h2
                className="text-xl font-bold"
                data-component-id="cart-title">
                Shopping Cart
              </h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowCart(false)}
                data-component-id="cart-close">
                ✕
              </button>
            </div>
            {cart.length === 0 && (
              <p
                className="text-center text-gray-400 py-8"
                data-component-id="empty-cart-message">
                Your cart is empty 🛒
              </p>
            )}            {cart.length > 0 && (
              <div
                className="space-y-3"
                data-component-id="cart-items-list">
                {cart.map((item, index) => (
                  <div
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    key={item.id}
                    data-component-id="cart-item-template">
                    <div
                      className="flex items-center gap-3"
                      data-component-id="cart-item-info">
                      <span
                        className="text-2xl"
                        data-component-id="cart-item-image">
                        {item.image}
                      </span>
                      <div
                        className="space-y-1"
                        data-component-id="cart-item-details">
                        <p
                          className="font-medium"
                          data-component-id="cart-item-name">
                          {item.name}
                        </p>
                        <p
                          className="text-sm text-gray-400"
                          data-component-id="cart-item-price">
                          {`$${item.price} × ${item.quantity}`}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => removeFromCart(item.id)}
                      data-component-id="cart-item-remove">
                      🗑️
                    </button>
                  </div>
                ))}              </div>
            )}            {cart.length > 0 && (
              <div
                className="mt-4 pt-4 border-t border-white/20"
                data-component-id="cart-footer-content">
                <div
                  className="text-xl font-bold mb-4"
                  data-component-id="cart-total">
                  {`Total: $${getTotalPrice()}`}
                </div>
                <div
                  className="flex gap-2"
                  data-component-id="cart-actions">
                  <button
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    onClick={clearCart}
                    data-component-id="clear-cart-button">
                    Clear Cart
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    data-component-id="checkout-button">
                    Checkout
                  </button>
                </div>
              </div>
            )}          </div>
        </div>
      )}    </div>
  );
}