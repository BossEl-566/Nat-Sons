import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import natlogo from '../assets/Original-logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  // Helper function to check if a path is active
  const isActive = (path) => {
    // For exact home page match
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    // For other paths, check if current path starts with the link path
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  // Navigation links configuration
  const navLinks = [
    { path: '/', label: 'Home', exact: true },
    { path: '/healthcare-products', label: 'Healthcare' },
    { path: '/vitamins', label: 'Vitamins' },
    { path: '/personal-care', label: 'Personal Care' },
    { path: '/medical-equipment', label: 'Equipment' },
    { path: '/health-articles', label: 'Articles' },
    { path: '/about', label: 'About' },
  ];

  // Mobile navigation links configuration
  const mobileNavLinks = [
    { path: '/', label: 'Home' },
    { path: '/healthcare-products', label: 'Healthcare Products' },
    { path: '/vitamins', label: 'Vitamins & Supplements' },
    { path: '/personal-care', label: 'Personal Care' },
    { path: '/medical-equipment', label: 'Medical Equipment' },
    { path: '/health-articles', label: 'Health Articles' },
    { path: '/about', label: 'About Us' },
    { path: '/store-locator', label: 'Store Locator' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/health-tips', label: 'Health Tips' },
  ];

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
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
                  onClick={() => { handleSearchClick(); handleMenuItemClick(); }}
                  readOnly
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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium py-1 transition-colors text-sm ${
                  isActive(link.path)
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu - Complete with all links */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white border border-gray-200 rounded-lg shadow-lg mb-2">
              <div className="py-1">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2 transition-colors border-b border-gray-100 text-sm ${
                      isActive(link.path)
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    onClick={handleMenuItemClick}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Search */}
              <div className="p-3 border-t border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-3 py-2 pl-9 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
                    onClick={() => { handleSearchClick(); handleMenuItemClick(); }}
                    readOnly
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