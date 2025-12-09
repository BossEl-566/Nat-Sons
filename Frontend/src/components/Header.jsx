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
      <nav className="bg-white">
        <div className="container mx-auto px-4">
          {/* Top Row - Logo, Search, Mobile Menu */}
          <div className="flex items-center justify-between py-3">
            {/* Logo - More Compact */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <div className="flex items-center justify-center bg-white rounded p-1 shadow-sm">
                <img 
                  src={natlogo} 
                  alt="Nat & Sons Pharmacy Logo" 
                  className="h-8 w-auto object-contain" 
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-blue-600 leading-tight">Nat & Sons</h1>
                <p className="text-gray-500 text-xs">Pharmacy & Healthcare</p>
              </div>
            </Link>

            {/* Search Bar - More Compact */}
            <div className="flex-1 max-w-md mx-4 hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              onClick={handleMenuClick}
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Bottom Navigation - More Compact */}
          <div className="hidden lg:flex justify-center space-x-6 border-t border-gray-100 pt-2 pb-2">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium py-1 transition-colors text-sm">Home</Link>
            <Link to="/healthcare-products" className="text-gray-700 hover:text-blue-600 font-medium py-1 transition-colors text-sm">Healthcare</Link>
            <Link to="/vitamins" className="text-gray-700 hover:text-blue-600 font-medium py-1 transition-colors text-sm">Vitamins</Link>
            <Link to="/personal-care" className="text-gray-700 hover:text-blue-600 font-medium py-1 transition-colors text-sm">Personal Care</Link>
            <Link to="/medical-equipment" className="text-gray-700 hover:text-blue-600 font-medium py-1 transition-colors text-sm">Equipment</Link>
            <Link to="/health-articles" className="text-gray-700 hover:text-blue-600 font-medium py-1 transition-colors text-sm">Articles</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium py-1 transition-colors text-sm">About</Link>
          </div>

          {/* Mobile Menu - Complete with all links */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white border border-gray-200 rounded-lg shadow-lg mb-2">
              <div className="py-1">
                <Link 
                  to="/" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 text-sm"
                  onClick={handleMenuItemClick}
                >
                  Home
                </Link>
                <Link 
                  to="/healthcare-products" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 text-sm"
                  onClick={handleMenuItemClick}
                >
                  Healthcare Products
                </Link>
                <Link 
                  to="/vitamins" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 text-sm"
                  onClick={handleMenuItemClick}
                >
                  Vitamins & Supplements
                </Link>
                <Link 
                  to="/personal-care" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 text-sm"
                  onClick={handleMenuItemClick}
                >
                  Personal Care
                </Link>
                <Link 
                  to="/medical-equipment" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 text-sm"
                  onClick={handleMenuItemClick}
                >
                  Medical Equipment
                </Link>
                <Link 
                  to="/health-articles" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 text-sm"
                  onClick={handleMenuItemClick}
                >
                  Health Articles
                </Link>
                <Link 
                  to="/about" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 text-sm"
                  onClick={handleMenuItemClick}
                >
                  About Us
                </Link>
                <Link 
                  to="/store-locator" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 text-sm"
                  onClick={handleMenuItemClick}
                >
                  Store Locator
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 text-sm"
                  onClick={handleMenuItemClick}
                >
                  Contact Us
                </Link>
                <Link 
                  to="/health-tips" 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm"
                  onClick={handleMenuItemClick}
                >
                  Health Tips
                </Link>
              </div>
              
              {/* Mobile Search */}
              <div className="p-3 border-t border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-3 py-2 pl-9 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
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