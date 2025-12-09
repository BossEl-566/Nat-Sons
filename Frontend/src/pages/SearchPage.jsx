import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract search query from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    }
    
    // Focus on input when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [location.search]);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - Replace with your actual search logic
    setTimeout(() => {
      // Mock search results - Replace with actual search from your backend
      const mockResults = [
        { id: 1, name: 'Vitamin C 1000mg', category: 'Vitamins', price: '$15.99' },
        { id: 2, name: 'Blood Pressure Monitor', category: 'Medical Equipment', price: '$49.99' },
        { id: 3, name: 'Hand Sanitizer', category: 'Personal Care', price: '$5.99' },
        { id: 4, name: 'Pain Relief Cream', category: 'Healthcare', price: '$12.99' },
        { id: 5, name: 'Multivitamin Complex', category: 'Vitamins', price: '$24.99' },
      ].filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(mockResults);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputClick = () => {
    // Input is already on the search page, so just ensure focus
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">

            {/* Search Bar on Search Page */}
            <div className="flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, vitamins, healthcare items..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  onClick={handleInputClick}
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </form>
            </div>

            {/* Back Button */}
            <Link 
              to="/"
              className="ml-4 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="container mx-auto px-4 py-8">
        {searchQuery && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Search Results for "{searchQuery}"
              {searchResults.length > 0 && (
                <span className="text-gray-500 text-lg font-normal ml-2">
                  ({searchResults.length} items found)
                </span>
              )}
            </h1>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Searching for products...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  </div>
                  <span className="text-blue-600 font-bold">{item.price}</span>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try different keywords or browse our categories</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">What are you looking for?</h2>
            <p className="text-gray-600 mb-8">Search for healthcare products, vitamins, medical equipment, and more</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {['Vitamins', 'Medications', 'Personal Care', 'Medical Equipment', 'First Aid', 'Baby Care', 'Skin Care', 'Health Monitors'].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSearchQuery(category);
                    navigate(`/search?q=${encodeURIComponent(category)}`);
                  }}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <span className="text-gray-700 font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}