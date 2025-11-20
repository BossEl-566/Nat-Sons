import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import natlogo from '../assets/Original-logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main Navigation */}
      <nav className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo Section - Improved */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center bg-white rounded-lg p-1 shadow-md">
                <img 
                  src={natlogo} 
                  alt="Nat & Sons Pharmacy Logo" 
                  className="h-12 w-auto object-contain" 
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-blue-600">Nat & Sons</h1>
                <p className="text-gray-500 text-sm">Pharmacy & Healthcare</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search healthcare products, vitamins, supplements..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              onClick={handleMenuClick}
            >
              {isMenuOpen ? (
                // Close icon (X)
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Bottom Navigation - Desktop with Link */}
          <div className="hidden lg:flex justify-center space-x-8 mt-4 border-t border-gray-100 pt-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Home</Link>
            <Link to="/healthcare-products" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Healthcare Products</Link>
            <Link to="/vitamins" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Vitamins & Supplements</Link>
            <Link to="/personal-care" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Personal Care</Link>
            <Link to="/medical-equipment" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Medical Equipment</Link>
            <Link to="/health-articles" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Health Articles</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">About Us</Link>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="py-2">
                <Link 
                  to="/" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                  onClick={handleMenuItemClick}
                >
                  Home
                </Link>
                <Link 
                  to="/healthcare-products" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                  onClick={handleMenuItemClick}
                >
                  Healthcare Products
                </Link>
                <Link 
                  to="/vitamins" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                  onClick={handleMenuItemClick}
                >
                  Vitamins & Supplements
                </Link>
                <Link 
                  to="/personal-care" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                  onClick={handleMenuItemClick}
                >
                  Personal Care
                </Link>
                <Link 
                  to="/medical-equipment" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                  onClick={handleMenuItemClick}
                >
                  Medical Equipment
                </Link>
                <Link 
                  to="/health-articles" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                  onClick={handleMenuItemClick}
                >
                  Health Articles
                </Link>
                <Link 
                  to="/about" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                  onClick={handleMenuItemClick}
                >
                  About Us
                </Link>
                <Link 
                  to="/store-locator" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                  onClick={handleMenuItemClick}
                >
                  Store Locator
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                  onClick={handleMenuItemClick}
                >
                  Contact Us
                </Link>
                <Link 
                  to="/health-tips" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={handleMenuItemClick}
                >
                  Health Tips
                </Link>
              </div>
              
              {/* Mobile Search */}
              <div className="p-4 border-t border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}