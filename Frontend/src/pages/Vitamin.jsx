import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaShoppingCart, 
  FaStar, 
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaLeaf,
  FaCapsules,
  FaAppleAlt,
  FaBone,
  FaBrain,
  FaEye,
  FaHeartbeat,
  FaFire,
  FaWeight,
  FaBaby,
  FaMale,
  FaFemale,
  FaChevronDown,
  FaTimes,
  FaShoppingBag
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Using DummyJSON API for product data
const API_URL = 'https://dummyjson.com/products/category/skincare';

export default function Vitamin() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Categories with icons
  const categories = [
    { id: 'all', name: 'All Products', icon: <FaCapsules />, color: 'from-blue-500 to-cyan-400' },
    { id: 'multivitamins', name: 'Multivitamins', icon: <FaAppleAlt />, color: 'from-green-500 to-emerald-400' },
    { id: 'bone-joint', name: 'Bone & Joint', icon: <FaBone />, color: 'from-purple-500 to-pink-400' },
    { id: 'brain-health', name: 'Brain Health', icon: <FaBrain />, color: 'from-indigo-500 to-blue-400' },
    { id: 'eye-health', name: 'Eye Health', icon: <FaEye />, color: 'from-yellow-500 to-orange-400' },
    { id: 'heart-health', name: 'Heart Health', icon: <FaHeartbeat />, color: 'from-red-500 to-pink-400' },
    { id: 'weight-loss', name: 'Weight Management', icon: <FaWeight />, color: 'from-teal-500 to-cyan-400' },
    { id: 'immune', name: 'Immune Support', icon: <FaShieldAlt />, color: 'from-orange-500 to-yellow-400' }
  ];

  // Benefits filter options
  const benefits = [
    { id: 'energy', name: 'Energy Boost', icon: <FaFire /> },
    { id: 'immunity', name: 'Immunity Support', icon: <FaShieldAlt /> },
    { id: 'digestive', name: 'Digestive Health', icon: <FaLeaf /> },
    { id: 'sleep', name: 'Sleep Support', icon: '😴' },
    { id: 'stress', name: 'Stress Relief', icon: '🧘' },
    { id: 'skin', name: 'Skin Health', icon: '✨' },
    { id: 'hair', name: 'Hair & Nails', icon: '💇' },
    { id: 'detox', name: 'Detox & Cleanse', icon: '🌿' }
  ];

  // Age groups
  const ageGroups = [
    { id: 'kids', name: 'Kids', icon: <FaBaby /> },
    { id: 'adults', name: 'Adults', icon: <FaMale /> },
    { id: 'seniors', name: 'Seniors', icon: <FaFemale /> }
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Using DummyJSON API - in production, replace with your own API
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Transform API data to match our vitamin product structure
        const transformedProducts = data.products.map(product => ({
          id: product.id,
          name: product.title,
          brand: 'NatureWell',
          description: product.description,
          price: Math.floor(Math.random() * 200) + 20, // Random price between 20-220
          originalPrice: Math.floor(Math.random() * 300) + 40,
          rating: product.rating,
          reviewCount: Math.floor(Math.random() * 1000),
          image: product.thumbnail,
          category: categories[Math.floor(Math.random() * categories.length)].id,
          benefits: benefits.slice(0, Math.floor(Math.random() * 3) + 1).map(b => b.id),
          ageGroup: ageGroups[Math.floor(Math.random() * ageGroups.length)].id,
          inStock: Math.random() > 0.1,
          isFeatured: Math.random() > 0.7
        }));
        
        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback data if API fails
        setProducts(getFallbackProducts());
        setFilteredProducts(getFallbackProducts());
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selections
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Benefits filter
    if (selectedBenefits.length > 0) {
      filtered = filtered.filter(product =>
        selectedBenefits.some(benefit => product.benefits.includes(benefit))
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured first
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedBenefits, priceRange, sortBy, products]);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, { ...product, quantity: 1 }]);
    // Show notification
    const event = new CustomEvent('notification', {
      detail: { message: `${product.name} added to cart!`, type: 'success' }
    });
    window.dispatchEvent(event);
  };

  const handleAddToWishlist = (product) => {
    setWishlist(prev => 
      prev.some(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product]
    );
  };

  const toggleBenefit = (benefitId) => {
    setSelectedBenefits(prev =>
      prev.includes(benefitId)
        ? prev.filter(id => id !== benefitId)
        : [...prev, benefitId]
    );
  };

  const getFallbackProducts = () => {
    return [
      {
        id: 1,
        name: "Premium Multivitamin Complex",
        brand: "HealthPlus",
        description: "Complete daily nutrition with essential vitamins and minerals",
        price: 45.99,
        originalPrice: 59.99,
        rating: 4.8,
        reviewCount: 1245,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "multivitamins",
        benefits: ["energy", "immunity"],
        ageGroup: "adults",
        inStock: true,
        isFeatured: true
      },
      // Add more fallback products as needed
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Premium Vitamins &
              <span className="block text-cyan-200">Supplements</span>
            </motion.h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover scientifically-formulated supplements for optimal health and wellness. Quality you can trust.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vitamins, supplements, or brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-white/40 text-lg"
                />
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-blue-200 text-xl" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 }
            }}
            className="!pb-12"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-center p-4 rounded-2xl transition-all ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-br ${category.color} text-white shadow-xl`
                      : 'bg-white text-gray-700 hover:bg-blue-50 shadow-lg'
                  }`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="font-bold text-sm">{category.name}</div>
                </motion.button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-between w-full bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <FaFilter className="mr-3 text-blue-600" />
                  <span className="font-bold">Filters</span>
                </div>
                <FaChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Filters Content */}
              <AnimatePresence>
                {(showFilters || window.innerWidth >= 1024) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-6 space-y-6 overflow-hidden"
                  >
                    {/* Price Range */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                        <FaFilter className="mr-2" />
                        Price Range
                      </h3>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="500"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>GHS {priceRange[0]}</span>
                          <span>GHS {priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">Health Benefits</h3>
                      <div className="space-y-2">
                        {benefits.map((benefit) => (
                          <button
                            key={benefit.id}
                            onClick={() => toggleBenefit(benefit.id)}
                            className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                              selectedBenefits.includes(benefit.id)
                                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className="mr-3">{benefit.icon}</span>
                            <span className="text-sm font-medium">{benefit.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Age Group */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">Age Group</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {ageGroups.map((group) => (
                          <button
                            key={group.id}
                            className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                          >
                            <div className="text-2xl mb-1">{group.icon}</div>
                            <span className="text-xs font-medium">{group.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">Sort By</h3>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                    </div>

                    {/* Clear Filters */}
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedBenefits([]);
                        setPriceRange([0, 500]);
                        setSortBy('featured');
                        setSearchTerm('');
                      }}
                      className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-bold hover:opacity-90 transition-opacity"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' ? 'All Products' : 
                    categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBenefits([]);
                    setPriceRange([0, 500]);
                    setSearchTerm('');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 space-y-2">
                          {product.isFeatured && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              Out of Stock
                            </span>
                          )}
                        </div>
                        
                        {/* Wishlist Button */}
                        <button
                          onClick={() => handleAddToWishlist(product)}
                          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                        >
                          <FaHeart className={`${
                            wishlist.some(item => item.id === product.id)
                              ? 'text-red-500 fill-current'
                              : 'text-gray-400'
                          }`} />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Benefits */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.benefits.slice(0, 2).map(benefitId => {
                            const benefit = benefits.find(b => b.id === benefitId);
                            return benefit ? (
                              <span
                                key={benefitId}
                                className="inline-flex items-center bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
                              >
                                {benefit.icon} <span className="ml-1">{benefit.name}</span>
                              </span>
                            ) : null;
                          })}
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className="text-2xl font-bold text-blue-600">
                                GHS {product.price.toFixed(2)}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                  GHS {product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className={`flex items-center px-4 py-2 rounded-lg font-bold transition-all ${
                              product.inStock
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <FaShoppingCart className="mr-2" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More */}
                {filteredProducts.length > 0 && filteredProducts.length < products.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => {
                        // In production, this would load more products from API
                        setFilteredProducts(prev => [
                          ...prev,
                          ...products.slice(prev.length, prev.length + 6)
                        ]);
                      }}
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
                    >
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <FaTruck className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-gray-600 text-sm">On orders over GHS 200 in Accra</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">Third-party tested for purity</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <FaLeaf className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Natural Ingredients</h3>
              <p className="text-gray-600 text-sm">No artificial additives</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <FaStar className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Expert Approved</h3>
              <p className="text-gray-600 text-sm">Formulated by pharmacists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Trusted Brands We Carry
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['NatureWell', 'HealthPlus', 'PureForm', 'VitaCare', 'WellnessPro', 'BioEssence'].map((brand) => (
              <div key={brand} className="bg-white p-8 rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="text-3xl mb-2">💊</div>
                  <div className="font-bold text-gray-800">{brand}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our pharmacists are available for free consultations to help you find the right supplements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-bold text-lg transition-colors">
                Book Consultation
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold text-lg transition-colors">
                View Supplement Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => {
              // In production, this would open cart modal
              const event = new CustomEvent('cart-open');
              window.dispatchEvent(event);
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all flex items-center"
          >
            <FaShoppingBag className="mr-2" />
            <span>Cart ({cart.length})</span>
            <div className="ml-3 bg-white text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
              GHS {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
}