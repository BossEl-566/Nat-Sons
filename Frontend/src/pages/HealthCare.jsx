import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaShieldAlt,
  FaTruck,
  FaStar,
  FaHeart,
  FaEye,
  FaMedkit,
  FaPrescriptionBottle,
  FaThermometer,
  FaSyringe,
  FaStethoscope,
  FaPills,
  FaCapsules,
  FaBaby,
  FaMale,
  FaFemale,
  FaChevronDown,
  FaTimes,
  FaInfoCircle,
  FaExclamationTriangle,
  FaShoppingBag,
  FaTag,
  FaClock,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaUserFriends,
  FaSortAmountDown,

} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import healthcareImage from '../assets/healthcare.jpg';


export default function HealthCare() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Main Categories with Icons - UPDATED: Removed prices from here
  const categories = [
    { 
      id: 'all', 
      name: 'All Products', 
      icon: <FaMedkit />, 
      color: 'from-blue-500 to-cyan-400',
      subcategories: []
    },
    { 
      id: 'first-aid', 
      name: 'First Aid', 
      icon: <FaThermometer />, 
      color: 'from-red-500 to-pink-400',
      subcategories: ['bandages', 'antiseptics', 'wound-care', 'emergency-kits']
    },
    { 
      id: 'medical-equipment', 
      name: 'Medical Equipment', 
      icon: <FaStethoscope />, 
      color: 'from-green-500 to-emerald-400',
      subcategories: ['monitoring', 'mobility', 'diagnostic', 'therapeutic']
    },
    { 
      id: 'personal-care', 
      name: 'Personal Care', 
      icon: <FaBaby />, 
      color: 'from-purple-500 to-pink-400',
      subcategories: ['oral-care', 'skin-care', 'hair-care', 'hygiene']
    },
    { 
      id: 'otc-medications', 
      name: 'OTC Medications', 
      icon: <FaPills />, 
      color: 'from-orange-500 to-yellow-400',
      subcategories: ['pain-relief', 'cold-flu', 'allergy', 'digestive']
    },
    { 
      id: 'wellness', 
      name: 'Wellness Products', 
      icon: <FaHeart />, 
      color: 'from-teal-500 to-cyan-400',
      subcategories: ['fitness', 'sleep', 'stress', 'immunity']
    },
    { 
      id: 'baby-care', 
      name: 'Baby & Maternity', 
      icon: <FaBaby />, 
      color: 'from-pink-500 to-rose-400',
      subcategories: ['baby-care', 'maternity', 'feeding', 'nursery']
    },
    { 
      id: 'senior-care', 
      name: 'Senior Care', 
      icon: <FaMale />, 
      color: 'from-indigo-500 to-blue-400',
      subcategories: ['mobility', 'continence', 'comfort', 'safety']
    }
  ];

  // Subcategories mapping
  const subcategories = {
    'first-aid': [
      { id: 'bandages', name: 'Bandages & Dressings' },
      { id: 'antiseptics', name: 'Antiseptics' },
      { id: 'wound-care', name: 'Wound Care' },
      { id: 'emergency-kits', name: 'Emergency Kits' }
    ],
    'medical-equipment': [
      { id: 'monitoring', name: 'Monitoring Devices' },
      { id: 'mobility', name: 'Mobility Aids' },
      { id: 'diagnostic', name: 'Diagnostic Tools' },
      { id: 'therapeutic', name: 'Therapeutic Equipment' }
    ],
    'personal-care': [
      { id: 'oral-care', name: 'Oral Care' },
      { id: 'skin-care', name: 'Skin Care' },
      { id: 'hair-care', name: 'Hair Care' },
      { id: 'hygiene', name: 'Personal Hygiene' }
    ]
  };

  // Age groups
  const ageGroups = [
    { id: 'all-ages', name: 'All Ages', icon: '👨‍👩‍👧‍👦' },
    { id: 'kids', name: 'Kids', icon: <FaBaby /> },
    { id: 'adults', name: 'Adults', icon: <FaMale /> },
    { id: 'seniors', name: 'Seniors', icon: <FaFemale /> }
  ];

  // NEW: Service Info Cards
  const services = [
    { 
      icon: <FaClock />, 
      title: '24/7 Support', 
      description: 'Round-the-clock assistance via WhatsApp'
    },
    { 
      icon: <FaMapMarkerAlt />, 
      title: 'Nationwide Delivery', 
      description: 'Fast delivery across all regions'
    },
    { 
      icon: <FaShieldAlt />, 
      title: 'Certified Products', 
      description: 'Authentic & FDA-approved items'
    }
  ];

  // Sample products data (in production, this would come from your CMS/API)
  const sampleProducts = [
    {
      id: 1,
      name: "Premium First Aid Kit",
      brand: "MediCare",
      description: "Complete emergency first aid kit with 100+ pieces for home and travel",
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.8,
      reviewCount: 342,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "first-aid",
      subcategory: "emergency-kits",
      ageGroup: "all-ages",
      inStock: true,
      isFeatured: true,
      whatsappMessage: "Hi, I'm interested in the Premium First Aid Kit. Can you provide more details and availability?"
    },
    {
      id: 2,
      name: "Digital Blood Pressure Monitor",
      brand: "Omron",
      description: "Automatic upper arm blood pressure monitor with large display",
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.6,
      reviewCount: 189,
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "medical-equipment",
      subcategory: "monitoring",
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      whatsappMessage: "Hello, I'd like to inquire about the Digital Blood Pressure Monitor. Is it available?"
    },
    {
      id: 3,
      name: "Alcohol-Based Hand Sanitizer",
      brand: "Dettol",
      description: "70% alcohol hand sanitizer with moisturizer, 500ml bottle",
      price: 8.99,
      originalPrice: 12.99,
      rating: 4.4,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "personal-care",
      subcategory: "hygiene",
      ageGroup: "all-ages",
      inStock: true,
      isFeatured: false,
      whatsappMessage: "Hi, I want to buy Alcohol-Based Hand Sanitizer. Do you have stock?"
    },
    {
      id: 4,
      name: "Adult Diapers",
      brand: "Tena",
      description: "Super absorbent adult diapers for maximum protection, pack of 30",
      price: 25.99,
      originalPrice: 35.99,
      rating: 4.7,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "senior-care",
      subcategory: "continence",
      ageGroup: "seniors",
      inStock: true,
      isFeatured: true,
      whatsappMessage: "Hello, I need Adult Diapers. Can you tell me about pricing and sizes?"
    },
    {
      id: 5,
      name: "Baby Thermometer",
      brand: "Braun",
      description: "Digital infrared forehead thermometer for babies and kids",
      price: 32.99,
      originalPrice: 45.99,
      rating: 4.5,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "baby-care",
      subcategory: "baby-care",
      ageGroup: "kids",
      inStock: true,
      isFeatured: false,
      whatsappMessage: "Hi, I'm looking for a Baby Thermometer. Is the Braun model available?"
    },
    {
      id: 6,
      name: "Pain Relief Gel",
      brand: "Voltaren",
      description: "Diclofenac diethylamine gel for muscle and joint pain relief, 100g",
      price: 12.99,
      originalPrice: 18.99,
      rating: 4.3,
      reviewCount: 289,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "otc-medications",
      subcategory: "pain-relief",
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      whatsappMessage: "Hello, I need Pain Relief Gel. Can you provide information on usage?"
    },
    {
      id: 7,
      name: "Walking Cane with Seat",
      brand: "Drive Medical",
      description: "Adjustable walking cane with built-in foldable seat",
      price: 65.99,
      originalPrice: 89.99,
      rating: 4.6,
      reviewCount: 123,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "senior-care",
      subcategory: "mobility",
      ageGroup: "seniors",
      inStock: true,
      isFeatured: false,
      whatsappMessage: "Hi, I'm interested in the Walking Cane with Seat. Is it adjustable?"
    },
    {
      id: 8,
      name: "CPAP Machine",
      brand: "ResMed",
      description: "Automatic CPAP machine for sleep apnea with humidifier",
      price: 899.99,
      originalPrice: 1200.00,
      rating: 4.9,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "medical-equipment",
      subcategory: "therapeutic",
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      whatsappMessage: "Hello, I need information about the CPAP Machine. Is prescription required?"
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
      
      // Subcategory filter
      if (selectedSubCategory !== 'all') {
        filtered = filtered.filter(product => product.subcategory === selectedSubCategory);
      }
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
  }, [searchTerm, selectedCategory, selectedSubCategory, priceRange, sortBy, products]);

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
    const phoneNumber = "233209468565"; // Your WhatsApp number
    const message = encodeURIComponent(product.whatsappMessage);
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Healthcare Image */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={healthcareImage} 
            alt="Healthcare Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-teal-900/70"></div>
        </div>

        {/* Pattern Overlay */}
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
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            >
              Quality Healthcare Products
              <span className="block text-teal-200 mt-2">For Every Need</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-lg"
            >
              Browse our extensive collection of healthcare essentials. 
              <br />All products available for purchase via WhatsApp.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto relative"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search healthcare products, equipment, or brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/80 focus:outline-none focus:border-white/50 text-lg shadow-2xl"
                />
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/90 text-xl" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl">
                  Search
                </button>
              </div>
            </motion.div>

            {/* Service Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {services.map((service, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-3xl text-white">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white text-center mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-center text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
            <FaExclamationTriangle className="text-amber-600 mr-3 mb-2 md:mb-0" />
            <span className="text-amber-800 font-medium">
              Note: Due to Ghana pharmacy regulations, all purchases must be made via WhatsApp or in-store consultation.
            </span>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Shop by Category
          </h2>
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
                    setSelectedSubCategory('all');
                  }}
                  className={`w-full text-center p-4 rounded-2xl transition-all ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-br ${category.color} text-white shadow-xl`
                      : 'bg-white text-gray-700 hover:bg-blue-50 shadow-lg hover:shadow-xl'
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

      {/* Subcategories */}
      {selectedCategory !== 'all' && subcategories[selectedCategory] && (
        <section className="py-6 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 lg:px-12">
            <h3 className="font-bold text-gray-800 mb-4">Subcategories:</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedSubCategory('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedSubCategory === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {subcategories[selectedCategory].map((subcat) => (
                <button
                  key={subcat.id}
                  onClick={() => setSelectedSubCategory(subcat.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedSubCategory === subcat.id
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subcat.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content - Products Section */}
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <FaFilter className="mr-3" />
                  <span className="font-bold">Filters & Sort</span>
                </div>
                <FaChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {(showFilters || window.innerWidth >= 1024) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-6 space-y-6 overflow-hidden border border-gray-200"
                  >
                    {/* Price Range - MOVED TO FILTERS SECTION */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Price Range (GHS)</h3>
                        <FaTag className="text-blue-600" />
                      </div>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 font-medium">
                          <span>GHS {priceRange[0]}</span>
                          <span>GHS {priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Age Group */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Age Group</h3>
                        <FaUserFriends className="text-blue-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {ageGroups.map((group) => (
                          <button
                            key={group.id}
                            className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-blue-400 transition-all"
                          >
                            <div className="text-2xl mb-1">{group.icon}</div>
                            <span className="text-xs font-medium text-gray-700">{group.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Sort By</h3>
                        <FaSortAmountDown className="text-blue-600" />
                      </div>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-r from-gray-50 to-white"
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
                        setSelectedSubCategory('all');
                        setPriceRange([0, 1000]);
                        setSortBy('featured');
                        setSearchTerm('');
                      }}
                      className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-bold hover:from-gray-200 hover:to-gray-300 transition-all shadow-md hover:shadow-lg"
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
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedCategory === 'all' 
                    ? 'Healthcare Products' 
                    : `${categories.find(c => c.id === selectedCategory)?.name}`}
                </h2>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} products
                  {selectedSubCategory !== 'all' && 
                    ` in "${subcategories[selectedCategory]?.find(s => s.id === selectedSubCategory)?.name}"`
                  }
                </p>
              </div>
              {filteredProducts.length > 0 && (
                <div className="hidden md:block bg-gradient-to-r from-blue-100 to-teal-100 px-4 py-2 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    💰 All prices shown include VAT
                  </p>
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse border border-gray-200">
                    <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubCategory('all');
                    setPriceRange([0, 1000]);
                    setSearchTerm('');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
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
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 space-y-2">
                          {product.isFeatured && (
                            <span className="bg-gradient-to-r from-blue-500 to-teal-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              Featured
                            </span>
                          )}
                          {product.originalPrice > product.price && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
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
                              ? 'text-red-500 fill-current animate-pulse'
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
                            {product.rating} ({product.reviewCount} reviews)
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Age Group */}
                        <div className="flex items-center mb-4">
                          <span className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 px-3 py-1 rounded-full border border-gray-300">
                            {ageGroups.find(g => g.id === product.ageGroup)?.name}
                          </span>
                        </div>

                        {/* Price Section - ALL PRICES SHOWN HERE */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-baseline">
                                <span className="text-2xl font-bold text-blue-600">
                                  GHS {product.price.toFixed(2)}
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="ml-3 text-sm text-gray-500 line-through">
                                    GHS {product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              {product.originalPrice > product.price && (
                                <div className="mt-1">
                                  <span className="text-xs text-green-600 font-bold">
                                    You save GHS {(product.originalPrice - product.price).toFixed(2)}!
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* WhatsApp Inquiry Button */}
                        <button
                          onClick={() => handleWhatsAppInquiry(product)}
                          className="w-full bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all group/inquiry shadow-md hover:shadow-lg"
                        >
                          <FaWhatsapp className="mr-2 text-lg" />
                          <span>Inquire on WhatsApp</span>
                          <FaChevronDown className="ml-2 transform group-hover/inquiry:translate-y-1 transition-transform" />
                        </button>

                        {/* Quick Info */}
                        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <FaTruck className="mr-1" />
                            <span>Free shipping</span>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="mr-1" />
                            <span>24/7 support</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

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
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
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
                    <div className="text-lg font-bold text-blue-600">
                      GHS {selectedProduct.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 mb-6 border border-blue-100">
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
                    className="block w-full bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white py-3 rounded-lg font-bold text-center transition-all shadow-md hover:shadow-lg"
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
                    className="block w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white py-3 rounded-lg font-bold text-center transition-all shadow-md hover:shadow-lg"
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
        href="https://wa.me/233209468565"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-500 to-teal-400 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center animate-bounce"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="ml-3 font-bold hidden sm:block">Need Help?</span>
      </a>
    </div>
  );
}