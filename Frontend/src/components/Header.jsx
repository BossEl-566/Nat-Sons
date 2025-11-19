import React from 'react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <span>🕒 24/7 Service Available</span>
              <span>📞 Call: 1-800-PHARMACY</span>
            </div>
            <div className="flex space-x-4">
              <span>📍 Store Locator</span>
              <span>📧 Contact Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">+</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-600">MediCare</h1>
                  <p className="text-gray-500 text-sm">Pharmacy & Healthcare</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines, healthcare products..."
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

            {/* Action Buttons */}
            <div className="flex items-center space-x-6">
              {/* Account */}
              <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">My Account</p>
                </div>
              </div>

              {/* Cart */}
              <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors relative">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">Cart</p>
                </div>
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  3
                </span>
              </div>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 rounded-lg border border-gray-300">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="hidden lg:flex justify-center space-x-8 mt-4">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Medicines</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Healthcare</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Wellness</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Prescriptions</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Lab Tests</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">Health Articles</a>
          </div>
        </div>
      </nav>
    </header>
  )
}