import React from 'react'
import { Link } from 'react-router-dom';

export default function TopNav() {
  return (
    <div className="bg-blue-900 text-white py-2 text-sm">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Mon - Sun: 7:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call: +233 50 345 8772</span>
                  </div>
                </div>
                <div className="hidden md:flex space-x-6">
                  <Link to="/store-locator" className="hover:text-blue-200 transition-colors">Store Locator</Link>
                  <Link to="/contact" className="hover:text-blue-200 transition-colors">Contact Us</Link>
                  <Link to="/health-tips" className="hover:text-blue-200 transition-colors">Health Tips</Link>
                </div>
              </div>
            </div>
          </div>
  )
}
