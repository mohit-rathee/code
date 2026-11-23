"use client";

import React, { useState, useEffect } from 'react';

export default function AppComponent() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY);
  window.addEventListener('scroll', updateScrollY);
  return () => window.removeEventListener('scroll', updateScrollY);
  }, []);


  return (    <div
      className="min-h-screen bg-gray-900 text-white overflow-x-hidden"
      data-component-id="root-panel">
      <section
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden"
        style={{
  transform: `translateY(${scrollY * 0.5}px)`
}}
        data-component-id="hero-section">
        <div
          className="absolute inset-0 opacity-20"
          style={{
  transform: `rotate(${scrollY * 0.1}deg) scale(${1 + scrollY * 0.0005})`
}}
          data-component-id="hero-background" />
        <div
          className="relative z-10 text-center max-w-6xl mx-auto px-4"
          style={{
  transform: `translateY(${scrollY * -0.3}px)`,
  opacity: Math.max(0, 1 - scrollY * 0.002)
}}
          data-component-id="hero-content">
          <h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse"
            data-component-id="hero-title">
            Innovation Unleashed
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed"
            data-component-id="hero-subtitle">
            Transforming ideas into extraordinary digital experiences through cutting-edge technology and creative excellence.
          </p>
          <button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            data-component-id="hero-cta">
            Explore Our Work
          </button>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative"
        style={{
  transform: `translateX(${Math.sin(scrollY * 0.005) * 20}px)`
}}
        data-component-id="about-section">
        <div
          className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center"
          data-component-id="about-content">
          <div
            className="space-y-6"
            style={{
  transform: `translateY(${Math.max(0, (scrollY - 800) * -0.5)}px)`,
  opacity: Math.min(1, Math.max(0, (scrollY - 600) * 0.002))
}}
            data-component-id="about-text">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              data-component-id="about-title">
              About Our Vision
            </h2>
            <p
              className="text-lg text-gray-300 leading-relaxed mb-6"
              data-component-id="about-description">
              We are passionate creators who believe in the power of technology to transform businesses and lives. Our team combines technical expertise with creative vision to deliver solutions that don't just meet expectations—they exceed them.
            </p>
          </div>
          <div
            className="grid grid-cols-3 gap-6 mt-8"
            data-component-id="about-stats">
            <div
              className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
              style={{
  transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.05})`
}}
              data-component-id="stat-1">
              <div
                className="text-2xl font-bold text-emerald-400"
                data-component-id="stat-1-number">
                500+
              </div>
              <div
                className="text-sm text-gray-300"
                data-component-id="stat-1-label">
                Projects
              </div>
            </div>
            <div
              className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
              style={{
  transform: `scale(${1 + Math.sin(scrollY * 0.01 + 1) * 0.05})`
}}
              data-component-id="stat-2">
              <div
                className="text-2xl font-bold text-emerald-400"
                data-component-id="stat-2-number">
                10+
              </div>
              <div
                className="text-sm text-gray-300"
                data-component-id="stat-2-label">
                Years
              </div>
            </div>
            <div
              className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
              style={{
  transform: `scale(${1 + Math.sin(scrollY * 0.01 + 2) * 0.05})`
}}
              data-component-id="stat-3">
              <div
                className="text-2xl font-bold text-emerald-400"
                data-component-id="stat-3-number">
                99%
              </div>
              <div
                className="text-sm text-gray-300"
                data-component-id="stat-3-label">
                Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative"
        data-component-id="services-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent"
          style={{
  transform: `translateY(${Math.max(0, (scrollY - 1200) * -0.3)}px)`
}}
          data-component-id="services-title">
          Our Services
        </h2>
        <div
          className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8"
          data-component-id="services-grid">
          <div
            className="p-8 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.max(0, (scrollY - 1400) * -0.5)}px) rotateY(${scrollY * 0.05}deg)`
}}
            data-component-id="service-1">
            <h3
              className="text-2xl font-bold mb-4 text-rose-400"
              data-component-id="service-1-title">
              Web Development
            </h3>
            <p
              className="text-gray-300 leading-relaxed"
              data-component-id="service-1-description">
              Creating responsive, fast, and beautiful websites that deliver exceptional user experiences across all devices and platforms.
            </p>
          </div>
          <div
            className="p-8 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.max(0, (scrollY - 1500) * -0.5)}px) rotateY(${scrollY * 0.05}deg)`
}}
            data-component-id="service-2">
            <h3
              className="text-2xl font-bold mb-4 text-rose-400"
              data-component-id="service-2-title">
              Mobile Apps
            </h3>
            <p
              className="text-gray-300 leading-relaxed"
              data-component-id="service-2-description">
              Developing native and cross-platform mobile applications that engage users and drive business growth.
            </p>
          </div>
          <div
            className="p-8 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.max(0, (scrollY - 1600) * -0.5)}px) rotateY(${scrollY * 0.05}deg)`
}}
            data-component-id="service-3">
            <h3
              className="text-2xl font-bold mb-4 text-rose-400"
              data-component-id="service-3-title">
              UI/UX Design
            </h3>
            <p
              className="text-gray-300 leading-relaxed"
              data-component-id="service-3-description">
              Crafting intuitive and visually stunning user interfaces that provide seamless user experiences and drive engagement.
            </p>
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative"
        data-component-id="portfolio-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
          style={{
  transform: `translateX(${Math.sin(scrollY * 0.003) * 50}px)`
}}
          data-component-id="portfolio-title">
          Our Portfolio
        </h2>
        <div
          className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-component-id="portfolio-grid">
          <div
            className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.sin(scrollY * 0.005) * 20}px)`
}}
            data-component-id="portfolio-item-1">
            <div
              className="p-6 h-64 flex flex-col justify-center"
              data-component-id="portfolio-item-1-content" />
          </div>
          <div
            className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.sin(scrollY * 0.005 + 1) * 20}px)`
}}
            data-component-id="portfolio-item-2">
            <div
              className="p-6 h-64 flex flex-col justify-center"
              data-component-id="portfolio-item-2-content">
              <h3
                className="text-xl font-bold mb-2 text-amber-400"
                data-component-id="portfolio-item-2-title">
                Mobile Banking App
              </h3>
              <p
                className="text-gray-300 text-sm"
                data-component-id="portfolio-item-2-description">
                Secure and intuitive mobile banking application with advanced security features.
              </p>
            </div>
          </div>
          <div
            className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.sin(scrollY * 0.005 + 2) * 20}px)`
}}
            data-component-id="portfolio-item-3">
            <div
              className="p-6 h-64 flex flex-col justify-center"
              data-component-id="portfolio-item-3-content">
              <h3
                className="text-xl font-bold mb-2 text-amber-400"
                data-component-id="portfolio-item-3-title">
                Corporate Website
              </h3>
              <p
                className="text-gray-300 text-sm"
                data-component-id="portfolio-item-3-description">
                Professional corporate website with modern design and enhanced functionality.
              </p>
            </div>
          </div>
          <div
            className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.sin(scrollY * 0.005 + 3) * 20}px)`
}}
            data-component-id="portfolio-item-4">
            <div
              className="p-6 h-64 flex flex-col justify-center"
              data-component-id="portfolio-item-4-content">
              <h3
                className="text-xl font-bold mb-2 text-amber-400"
                data-component-id="portfolio-item-4-title">
                SaaS Dashboard
              </h3>
              <p
                className="text-gray-300 text-sm"
                data-component-id="portfolio-item-4-description">
                Comprehensive analytics dashboard with real-time data visualization and reporting.
              </p>
            </div>
          </div>
          <div
            className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.sin(scrollY * 0.005 + 4) * 20}px)`
}}
            data-component-id="portfolio-item-5">
            <div
              className="p-6 h-64 flex flex-col justify-center"
              data-component-id="portfolio-item-5-content">
              <h3
                className="text-xl font-bold mb-2 text-amber-400"
                data-component-id="portfolio-item-5-title">
                Social Media Platform
              </h3>
              <p
                className="text-gray-300 text-sm"
                data-component-id="portfolio-item-5-description">
                Innovative social networking platform with advanced community features and engagement tools.
              </p>
            </div>
          </div>
          <div
            className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.sin(scrollY * 0.005 + 5) * 20}px)`
}}
            data-component-id="portfolio-item-6">
            <div
              className="p-6 h-64 flex flex-col justify-center"
              data-component-id="portfolio-item-6-content">
              <h3
                className="text-xl font-bold mb-2 text-amber-400"
                data-component-id="portfolio-item-6-title">
                Learning Management System
              </h3>
              <p
                className="text-gray-300 text-sm"
                data-component-id="portfolio-item-6-description">
                Comprehensive educational platform with interactive courses and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 relative"
        data-component-id="team-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-400 to-gray-400 bg-clip-text text-transparent"
          style={{
  transform: `translateY(${Math.max(0, (scrollY - 2800) * -0.3)}px)`
}}
          data-component-id="team-title">
          Meet Our Team
        </h2>
        <div
          className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          data-component-id="team-grid">
          <div
            className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.max(0, (scrollY - 3000) * -0.4)}px) rotateX(${scrollY * 0.05}deg)`
}}
            data-component-id="team-member-1">
            <div
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
              data-component-id="team-member-1-avatar">
              JS
            </div>
            <h3
              className="text-xl font-bold mb-2 text-slate-300"
              data-component-id="team-member-1-name">
              John Smith
            </h3>
            <p
              className="text-slate-400 text-sm"
              data-component-id="team-member-1-role">
              Lead Developer
            </p>
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 relative"
        data-component-id="testimonials-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
          style={{
  transform: `scale(${1 + Math.sin(scrollY * 0.008) * 0.1})`
}}
          data-component-id="testimonials-title">
          Client Testimonials
        </h2>
        <div
          className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-component-id="testimonials-grid">
          <div
            className="p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            style={{
  transform: `translateX(${Math.sin(scrollY * 0.006) * 30}px)`
}}
            data-component-id="testimonial-1">
            <p
              className="text-gray-300 italic mb-4"
              data-component-id="testimonial-1-quote">
              "Outstanding work! The team delivered beyond our expectations with incredible attention to detail and innovative solutions."
            </p>
            <p
              className="text-green-400 font-semibold"
              data-component-id="testimonial-1-author">
              - Sarah Johnson, CEO TechCorp
            </p>
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 relative"
        data-component-id="process-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          style={{
  transform: `translateY(${Math.sin(scrollY * 0.004) * 40}px)`
}}
          data-component-id="process-title">
          Our Process
        </h2>
        <div
          className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8"
          data-component-id="process-steps">
          <div
            className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            style={{
  transform: `translateY(${Math.max(0, (scrollY - 4500) * -0.3)}px)`
}}
            data-component-id="process-step-1">
            <div
              className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold"
              data-component-id="process-step-1-number">
              1
            </div>
            <h3
              className="text-xl font-bold mb-2 text-violet-300"
              data-component-id="process-step-1-title">
              Discovery
            </h3>
            <p
              className="text-gray-300 text-sm"
              data-component-id="process-step-1-description">
              We understand your needs and goals through detailed consultation and research.
            </p>
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative"
        data-component-id="skills-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          style={{
  transform: `rotateX(${Math.sin(scrollY * 0.005) * 10}deg)`
}}
          data-component-id="skills-title">
          Our Skills
        </h2>
        <div
          className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-component-id="skills-grid">
          <div
            className="p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            style={{
  transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.05})`
}}
            data-component-id="skill-1">
            <h3
              className="text-xl font-bold mb-4 text-blue-400"
              data-component-id="skill-1-name">
              React & Next.js
            </h3>
            <div
              className="w-full bg-gray-700 rounded-full h-2 mb-2"
              data-component-id="skill-1-bar" />
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 relative"
        data-component-id="achievements-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent"
          style={{
  transform: `translateX(${Math.cos(scrollY * 0.004) * 60}px)`
}}
          data-component-id="achievements-title">
          Our Achievements
        </h2>
        <div
          className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          data-component-id="achievements-grid">
          <div
            className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            style={{
  transform: `rotateY(${Math.sin(scrollY * 0.008) * 15}deg)`
}}
            data-component-id="achievement-1">
            <div
              className="text-4xl mb-4"
              data-component-id="achievement-1-icon">
              🏆
            </div>
            <h3
              className="text-xl font-bold mb-2 text-yellow-400"
              data-component-id="achievement-1-title">
              Best Agency 2024
            </h3>
            <p
              className="text-gray-300 text-sm"
              data-component-id="achievement-1-description">
              Recognized for outstanding digital innovation and client satisfaction.
            </p>
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 relative"
        data-component-id="blog-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          style={{
  transform: `translateY(${Math.sin(scrollY * 0.003) * 50}px)`
}}
          data-component-id="blog-title">
          Latest Blog Posts
        </h2>
        <div
          className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8"
          data-component-id="blog-grid">
          <article
            className="p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            style={{
  transform: `translateY(${Math.cos(scrollY * 0.007) * 25}px)`
}}
            data-component-id="blog-post-1">
            <time
              className="text-cyan-400 text-sm mb-2 block"
              data-component-id="blog-post-1-date">
              January 15, 2024
            </time>
            <h3
              className="text-xl font-bold mb-4 text-white"
              data-component-id="blog-post-1-title">
              The Future of Web Development
            </h3>
            <p
              className="text-gray-300 text-sm line-clamp-3"
              data-component-id="blog-post-1-excerpt">
              Exploring the latest trends and technologies shaping the future of web development, from AI integration to progressive web apps.
            </p>
          </article>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 relative"
        data-component-id="faq-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-400 to-slate-400 bg-clip-text text-transparent"
          style={{
  transform: `rotateZ(${Math.sin(scrollY * 0.006) * 2}deg)`
}}
          data-component-id="faq-title">
          Frequently Asked Questions
        </h2>
        <div
          className="max-w-4xl mx-auto px-4 space-y-6"
          data-component-id="faq-list">
          <div
            className="p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            style={{
  transform: `translateX(${Math.sin(scrollY * 0.007) * 20}px)`
}}
            data-component-id="faq-item-1">
            <h3
              className="text-xl font-bold mb-4 text-gray-300"
              data-component-id="faq-item-1-question">
              How long does a typical project take?
            </h3>
            <p
              className="text-gray-400 leading-relaxed"
              data-component-id="faq-item-1-answer">
              Project timelines vary depending on complexity and scope. A typical website takes 4-8 weeks, while more complex applications may take 3-6 months. We provide detailed timelines during the planning phase.
            </p>
          </div>
        </div>
      </section>
      <section
        className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative"
        data-component-id="contact-section">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          style={{
  transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.1})`
}}
          data-component-id="contact-title">
          Get In Touch
        </h2>
        <div
          className="max-w-4xl mx-auto px-4 text-center"
          data-component-id="contact-content">
          <p
            className="text-xl text-gray-300 mb-8 leading-relaxed"
            data-component-id="contact-description">
            Ready to transform your ideas into reality? Let's discuss how we can help bring your vision to life with innovative solutions tailored to your needs.
          </p>
          <button
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            style={{
  transform: `translateY(${Math.sin(scrollY * 0.008) * 10}px)`
}}
            data-component-id="contact-cta">
            Start Your Project
          </button>
        </div>
      </section>
      <footer
        className="py-12 bg-gray-900 text-center border-t border-gray-800"
        data-component-id="footer">
        <p
          className="text-gray-400"
          data-component-id="footer-text">
          © 2024 Innovation Unleashed. All rights reserved.
        </p>
      </footer>
    </div>
  );
}