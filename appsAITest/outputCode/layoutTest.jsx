import React from 'react';

export default function LayoutPage() {
  
  return (    <div
      style={{"width":"100%","height":"100%"}}
      data-component-id="root">
      <div
        className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
        data-component-id="root-panel">
        <div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 animate-pulse"
          data-component-id="animated-bg" />
        <nav
          className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 py-4"
          data-component-id="navbar">
          <div
            className="max-w-7xl mx-auto flex items-center justify-between"
            data-component-id="nav-content">
            <h1
              className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              data-component-id="logo">
              ✨ ModernUI
            </h1>
            <div
              className="hidden md:flex space-x-8"
              data-component-id="nav-links">
              <a
                href="#home"
                className="text-white/90 hover:text-white transition-colors duration-200 hover:scale-105 transform"
                data-component-id="nav-link-1">
                Home
              </a>
              <a
                href="#features"
                className="text-white/90 hover:text-white transition-colors duration-200 hover:scale-105 transform"
                data-component-id="nav-link-2">
                Features
              </a>
              <a
                href="#contact"
                className="text-white/90 hover:text-white transition-colors duration-200 hover:scale-105 transform"
                data-component-id="nav-link-3">
                Contact
              </a>
            </div>
            <button
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              data-component-id="cta-button">
              Get Started
            </button>
          </div>
        </nav>
        <section
          className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center"
          data-component-id="hero-section">
          <h2
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse"
            data-component-id="hero-title">
            Build Beautiful Apps
          </h2>
          <p
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            data-component-id="hero-subtitle">
            Create stunning user interfaces with our next-generation design system. Fast, flexible, and absolutely gorgeous.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            data-component-id="hero-buttons">
            <button
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
              data-component-id="primary-button">
              🚀 Start Building
            </button>
            <button
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
              data-component-id="secondary-button">
              📖 Learn More
            </button>
          </div>
          <div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            data-component-id="features-grid">
            <div
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform hover:shadow-2xl"
              data-component-id="feature-card-1">
              <div
                className="text-6xl mb-6 text-center"
                data-component-id="feature-1-icon">
                ⚡
              </div>
              <h3
                className="text-2xl font-bold text-white mb-4 text-center"
                data-component-id="feature-1-title">
                Lightning Fast
              </h3>
              <p
                className="text-white/70 text-center leading-relaxed"
                data-component-id="feature-1-description">
                Blazing fast performance with optimized rendering and minimal bundle size.
              </p>
            </div>
            <div
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform hover:shadow-2xl"
              data-component-id="feature-card-2">
              <div
                className="text-6xl mb-6 text-center"
                data-component-id="feature-2-icon">
                🎨
              </div>
              <h3
                className="text-2xl font-bold text-white mb-4 text-center"
                data-component-id="feature-2-title">
                Beautiful Design
              </h3>
              <p
                className="text-white/70 text-center leading-relaxed"
                data-component-id="feature-2-description">
                Stunning visual components with modern design patterns and smooth animations.
              </p>
            </div>
            <div
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform hover:shadow-2xl"
              data-component-id="feature-card-3">
              <div
                className="text-6xl mb-6 text-center"
                data-component-id="feature-3-icon">
                🛠️
              </div>
              <h3
                className="text-2xl font-bold text-white mb-4 text-center"
                data-component-id="feature-3-title">
                Developer Friendly
              </h3>
              <p
                className="text-white/70 text-center leading-relaxed"
                data-component-id="feature-3-description">
                Intuitive API with TypeScript support and excellent developer experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
