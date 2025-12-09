import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaStar,
  FaHeart,
  FaEye,
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaLeaf,
  FaUser,
  FaBaby,
  FaMale,
  FaFemale,
  FaChevronDown,
  FaTimes,
  FaInfoCircle,
  FaBath,
  FaSoap,
  FaTooth,
  FaSprayCan,
  FaWheelchair,
  FaWind,
  FaPrescriptionBottle,
  FaTag,
  FaShoppingCart
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PersonalCare() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkinType, setSelectedSkinType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Main Categories with Icons
  const categories = [
    { 
      id: 'all', 
      name: 'All Products', 
      icon: <FaShoppingBag />, 
      color: 'from-blue-500 to-cyan-400',
      description: 'Complete personal care collection'
    },
    { 
      id: 'skin-care', 
      name: 'Skin Care', 
      icon: <FaSoap />, 
      color: 'from-pink-500 to-rose-400',
      description: 'Moisturizers, cleansers, treatments'
    },
    { 
      id: 'hair-care', 
      name: 'Hair Care', 
      icon: <FaUser />, 
      color: 'from-purple-500 to-indigo-400',
      description: 'Shampoos, conditioners, treatments'
    },
    { 
      id: 'oral-care', 
      name: 'Oral Care', 
      icon: <FaTooth />, 
      color: 'from-teal-500 to-emerald-400',
      description: 'Toothpaste, brushes, mouthwash'
    },
    { 
      id: 'bath-body', 
      name: 'Bath & Body', 
      icon: <FaBath />, 
      color: 'from-orange-500 to-yellow-400',
      description: 'Soaps, shower gels, lotions'
    },
    { 
      id: 'deodorants', 
      name: 'Deodorants', 
      icon: <FaWind />, 
      color: 'from-green-500 to-lime-400',
      description: 'Anti-perspirants, deodorants'
    },
    { 
      id: 'baby-care', 
      name: 'Baby Care', 
      icon: <FaBaby />, 
      color: 'from-blue-300 to-cyan-300',
      description: 'Gentle products for babies'
    },
    { 
      id: 'men-care', 
      name: "Men's Care", 
      icon: <FaMale />, 
      color: 'from-blue-700 to-indigo-600',
      description: 'Grooming products for men'
    }
  ];

  // Skin Type Filters
  const skinTypes = [
    { id: 'all', name: 'All Skin Types', icon: '👨‍👩‍👧‍👦' },
    { id: 'normal', name: 'Normal', icon: '😊' },
    { id: 'dry', name: 'Dry', icon: '🏜️' },
    { id: 'oily', name: 'Oily', icon: '💧' },
    { id: 'combination', name: 'Combination', icon: '⚖️' },
    { id: 'sensitive', name: 'Sensitive', icon: '🌱' }
  ];

  // Brand Filters
  const brands = [
    { id: 'all', name: 'All Brands' },
    { id: 'dove', name: 'Dove' },
    { id: 'nivea', name: 'Nivea' },
    { id: 'vaseline', name: 'Vaseline' },
    { id: 'palmers', name: "Palmer's" },
    { id: 'cerave', name: 'CeraVe' },
    { id: 'neutrogena', name: 'Neutrogena' },
    { id: 'local', name: 'Local Brands' }
  ];

  // Sample products data
  const sampleProducts = [
    {
      id: 1,
      name: "Cocoa Butter Formula Lotion",
      brand: "Palmer's",
      description: "Deeply moisturizing cocoa butter formula for dry skin, 400ml",
      price: 25.99,
      originalPrice: 32.99,
      rating: 4.7,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "skin-care",
      skinType: ["dry", "normal"],
      brandId: "palmers",
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isNatural: true,
      whatsappMessage: "Hi, I'm interested in Palmer's Cocoa Butter Formula Lotion. Can you provide more details?"
    },
    {
      id: 2,
      name: "Intensive Moisture Shampoo",
      brand: "Dove",
      description: "Repairing shampoo for dry and damaged hair, 350ml",
      price: 18.99,
      originalPrice: 24.99,
      rating: 4.5,
      reviewCount: 312,
      image: "https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "hair-care",
      skinType: ["all"],
      brandId: "dove",
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isNatural: false,
      whatsappMessage: "Hello, I'd like to inquire about Dove Intensive Moisture Shampoo. Is it available?"
    },
    {
      id: 3,
      name: "Sensitive Toothpaste",
      brand: "Sensodyne",
      description: "Toothpaste for sensitive teeth, provides relief and protection, 100g",
      price: 12.99,
      originalPrice: 16.99,
      rating: 4.8,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "oral-care",
      skinType: ["sensitive"],
      brandId: "neutrogena",
      ageGroup: "adults",
      inStock: true,
      isFeatured: false,
      isNatural: false,
      whatsappMessage: "Hi, I need Sensitive Toothpaste. Do you have it in stock?"
    },
    {
      id: 4,
      name: "Shea Butter Body Wash",
      brand: "Nivea",
      description: "Nourishing body wash with shea butter, 500ml",
      price: 15.99,
      originalPrice: 20.99,
      rating: 4.4,
      reviewCount: 189,
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "bath-body",
      skinType: ["dry", "normal"],
      brandId: "nivea",
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isNatural: true,
      whatsappMessage: "Hello, I'm looking for Nivea Shea Butter Body Wash. Can you tell me about pricing?"
    },
    {
      id: 5,
      name: "Clinical Protection Deodorant",
      brand: "Dove",
      description: "48-hour protection deodorant, 45ml",
      price: 8.99,
      originalPrice: 12.99,
      rating: 4.6,
      reviewCount: 278,
      image: "https://images.unsplash.com/photo-1595425922309-6c6d2186d13f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "deodorants",
      skinType: ["sensitive", "normal"],
      brandId: "dove",
      ageGroup: "adults",
      inStock: true,
      isFeatured: false,
      isNatural: false,
      whatsappMessage: "Hi, I want to buy Dove Clinical Protection Deodorant. Do you have different scents?"
    },
    {
      id: 6,
      name: "Baby Soap & Shampoo",
      brand: "Johnson's",
      description: "Gentle 2-in-1 soap and shampoo for babies, 200ml",
      price: 10.99,
      originalPrice: 14.99,
      rating: 4.9,
      reviewCount: 412,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "baby-care",
      skinType: ["sensitive"],
      brandId: "local",
      ageGroup: "kids",
      inStock: true,
      isFeatured: true,
      isNatural: true,
      whatsappMessage: "Hello, I need Johnson's Baby Soap & Shampoo. Is it gentle for newborn skin?"
    },
    {
      id: 7,
      name: "Men's Face Wash",
      brand: "Nivea",
      description: "Deep cleansing face wash for men, 100ml",
      price: 14.99,
      originalPrice: 19.99,
      rating: 4.3,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1591088398331-02e8959b47d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "men-care",
      skinType: ["oily", "combination"],
      brandId: "nivea",
      ageGroup: "adults",
      inStock: true,
      isFeatured: false,
      isNatural: false,
      whatsappMessage: "Hi, I'm interested in Nivea Men's Face Wash. Does it help with oily skin?"
    },
    {
      id: 8,
      name: "Vaseline Petroleum Jelly",
      brand: "Vaseline",
      description: "Original petroleum jelly for multi-purpose skin care, 100g",
      price: 6.99,
      originalPrice: 9.99,
      rating: 4.7,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "skin-care",
      skinType: ["dry", "normal", "sensitive"],
      brandId: "vaseline",
      ageGroup: "all-ages",
      inStock: true,
      isFeatured: true,
      isNatural: false,
      whatsappMessage: "Hello, I need Vaseline Petroleum Jelly. Is the original version available?"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter products based on selections
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Skin type filter
    if (selectedSkinType !== 'all') {
      filtered = filtered.filter(product => 
        product.skinType.includes(selectedSkinType)
      );
    }

    // Active tab filter
    if (activeTab === 'natural') {
      filtered = filtered.filter(product => product.isNatural);
    } else if (activeTab === 'featured') {
      filtered = filtered.filter(product => product.isFeatured);
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
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured first, then by rating
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedSkinType, activeTab, priceRange, sortBy, products]);

  const handleWhatsAppInquiry = (product) => {
    setSelectedProduct(product);
    setShowWhatsAppModal(true);
  };

  const handleAddToWishlist = (product) => {
    setWishlist(prev => 
      prev.some(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product]
    );
  };

  const getWhatsAppUrl = (product) => {
    const phoneNumber = "233551234567"; // Your WhatsApp number
    const message = encodeURIComponent(product.whatsappMessage);
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-pink-500 to-purple-600 overflow-hidden">
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
              Personal Care Essentials
              <span className="block text-pink-200">For Your Daily Routine</span>
            </motion.h1>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Discover premium skincare, hair care, and personal hygiene products for the whole family.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search personal care products, brands, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-pink-200 focus:outline-none focus:border-white/40 text-lg"
                />
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-pink-200 text-xl" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === 'featured'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaStar className="inline mr-2" />
              Featured
            </button>
            <button
              onClick={() => setActiveTab('natural')}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === 'natural'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaLeaf className="inline mr-2" />
              Natural Products
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
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
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setActiveTab('all');
                  }}
                  className={`w-full text-center p-6 rounded-2xl transition-all ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-br ${category.color} text-white shadow-xl`
                      : 'bg-white text-gray-700 hover:bg-pink-50 shadow-lg'
                  }`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <div className="font-bold text-sm mb-2">{category.name}</div>
                  <div className="text-xs opacity-75">{category.description}</div>
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
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-between w-full bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <FaFilter className="mr-3 text-pink-600" />
                  <span className="font-bold">Filters</span>
                </div>
                <FaChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

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
                      <h3 className="font-bold text-gray-800 mb-4">Price Range (GHS)</h3>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="300"
                          step="5"
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

                    {/* Skin Type */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">Skin Type</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {skinTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedSkinType(type.id)}
                            className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                              selectedSkinType === type.id
                                ? 'bg-pink-50 text-pink-600 border border-pink-200'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <div className="text-2xl mb-1">{type.icon}</div>
                            <span className="text-xs font-medium">{type.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brands */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">Brands</h3>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <button
                            key={brand.id}
                            className="flex items-center w-full p-2 rounded hover:bg-gray-50 text-left"
                          >
                            <div className="w-3 h-3 rounded-full bg-gray-300 mr-3"></div>
                            <span className="text-sm text-gray-700">{brand.name}</span>
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="featured">Featured First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="name">Name (A-Z)</option>
                      </select>
                    </div>

                    {/* Clear Filters */}
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedSkinType('all');
                        setPriceRange([0, 300]);
                        setSortBy('featured');
                        setSearchTerm('');
                        setActiveTab('all');
                      }}
                      className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-bold hover:opacity-90 transition-opacity"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trust Indicators Sidebar */}
              <div className="hidden lg:block space-y-4">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <FaLeaf className="text-green-500 text-2xl mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Natural Ingredients</div>
                      <div className="text-sm text-gray-600">Many products available</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <FaTruck className="text-blue-500 text-2xl mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Free Delivery</div>
                      <div className="text-sm text-gray-600">On orders over GHS 200</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' 
                    ? 'Personal Care Products' 
                    : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} products
                  {selectedSkinType !== 'all' && ` for ${skinTypes.find(s => s.id === selectedSkinType)?.name.toLowerCase()} skin`}
                </p>
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
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSkinType('all');
                    setPriceRange([0, 300]);
                    setSearchTerm('');
                    setActiveTab('all');
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
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
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 space-y-2">
                          {product.isFeatured && (
                            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                          {product.isNatural && (
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              Natural
                            </span>
                          )}
                          {product.originalPrice > product.price && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              Save GHS {(product.originalPrice - product.price).toFixed(2)}
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

                        {/* Quick View */}
                        <button
                          onClick={() => handleWhatsAppInquiry(product)}
                          className="absolute bottom-3 right-3 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
                        >
                          <FaEye />
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

                        {/* Skin Type Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.skinType.map((type) => (
                            <span
                              key={type}
                              className="inline-block bg-pink-50 text-pink-600 text-xs px-2 py-1 rounded"
                            >
                              {skinTypes.find(t => t.id === type)?.name}
                            </span>
                          ))}
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className="text-2xl font-bold text-pink-600">
                                GHS {product.price.toFixed(2)}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                  GHS {product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* WhatsApp Inquiry Button */}
                        <button
                          onClick={() => handleWhatsAppInquiry(product)}
                          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all group/inquiry"
                        >
                          <FaWhatsapp className="mr-2 text-lg" />
                          <span>Inquire on WhatsApp</span>
                          <FaChevronDown className="ml-2 transform group-hover/inquiry:translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More (if needed) */}
                {filteredProducts.length > 0 && filteredProducts.length < products.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => {
                        // In production, this would load more products
                        setFilteredProducts(prev => [
                          ...prev,
                          ...products.slice(prev.length, prev.length + 6)
                        ]);
                      }}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
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

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Our Personal Care Products?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We carefully select products that meet our high standards for quality and effectiveness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Ingredients</h3>
              <p className="text-gray-600">Products with proven, safe ingredients for optimal results</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Dermatologist Tested</h3>
              <p className="text-gray-600">Many products are dermatologically tested for safety</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTag className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with regular discounts and offers</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-teal-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Convenient Delivery</h3>
              <p className="text-gray-600">Fast delivery options available across Accra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Trusted Brands We Carry
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {['Dove', 'Nivea', 'Vaseline', "Palmer's", 'CeraVe', 'Neutrogena', 'Johnson\'s', 'Sensodyne'].map((brand) => (
              <div key={brand} className="bg-gray-50 p-6 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-700">{brand}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {showWhatsAppModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowWhatsAppModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Inquire About Product</h3>
                <button
                  onClick={() => setShowWhatsAppModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-start mb-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-contain rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{selectedProduct.name}</h4>
                    <p className="text-gray-600 text-sm">{selectedProduct.brand}</p>
                    <div className="text-lg font-bold text-pink-600">
                      GHS {selectedProduct.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <FaInfoCircle className="text-blue-500 mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-blue-700">
                        You'll be redirected to WhatsApp with a pre-filled message about this product. 
                        Our team will assist you with availability, pricing, and delivery options.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={getWhatsAppUrl(selectedProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white py-3 rounded-lg font-bold text-center transition-all"
                  >
                    <div className="flex items-center justify-center">
                      <FaWhatsapp className="mr-2 text-xl" />
                      Open WhatsApp
                    </div>
                  </a>

                  <button
                    onClick={() => {
                      window.location.href = `tel:+233551234567`;
                    }}
                    className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 rounded-lg font-bold text-center transition-all"
                  >
                    <div className="flex items-center justify-center">
                      <FaPhoneAlt className="mr-2" />
                      Call Instead
                    </div>
                  </button>

                  <button
                    onClick={() => setShowWhatsAppModal(false)}
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-bold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Response time: Usually within 15 minutes during business hours</p>
                <p>Business hours: Mon-Sat 8:00 AM - 8:00 PM</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick WhatsApp Button */}
      <a
        href="https://wa.me/233551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-500 to-emerald-400 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="ml-3 font-bold hidden sm:block">Ask About Products</span>
      </a>
    </div>
  );
}