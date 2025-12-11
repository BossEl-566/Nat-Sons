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
  FaShoppingBag,
  FaPills,
  FaMedkit,
  FaFlask,
  FaCheckCircle,
  FaUsers,
  FaClock,
  FaShippingFast,
  FaTag,
  FaSortAmountDown
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import vitamin image - Update this path to your actual image location
import vitaminImage from '../assets/vitamin.jpg'; 

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
    { id: 'all', name: 'All Products', icon: <FaCapsules />, color: 'from-blue-500 to-cyan-400', count: 36 },
    { id: 'multivitamins', name: 'Multivitamins', icon: <FaAppleAlt />, color: 'from-green-500 to-emerald-400', count: 8 },
    { id: 'bone-joint', name: 'Bone & Joint', icon: <FaBone />, color: 'from-purple-500 to-pink-400', count: 6 },
    { id: 'brain-health', name: 'Brain Health', icon: <FaBrain />, color: 'from-indigo-500 to-blue-400', count: 4 },
    { id: 'eye-health', name: 'Eye Health', icon: <FaEye />, color: 'from-yellow-500 to-orange-400', count: 3 },
    { id: 'heart-health', name: 'Heart Health', icon: <FaHeartbeat />, color: 'from-red-500 to-pink-400', count: 5 },
    { id: 'weight-loss', name: 'Weight Management', icon: <FaWeight />, color: 'from-teal-500 to-cyan-400', count: 7 },
    { id: 'immune', name: 'Immune Support', icon: <FaShieldAlt />, color: 'from-orange-500 to-yellow-400', count: 5 }
  ];

  // Benefits filter options
  const benefits = [
    { id: 'energy', name: 'Energy Boost', icon: <FaFire />, color: 'from-yellow-500 to-orange-400' },
    { id: 'immunity', name: 'Immunity Support', icon: <FaShieldAlt />, color: 'from-green-500 to-emerald-400' },
    { id: 'digestive', name: 'Digestive Health', icon: <FaLeaf />, color: 'from-lime-500 to-green-400' },
    { id: 'sleep', name: 'Sleep Support', icon: '😴', color: 'from-indigo-500 to-blue-400' },
    { id: 'stress', name: 'Stress Relief', icon: '🧘', color: 'from-purple-500 to-pink-400' },
    { id: 'skin', name: 'Skin Health', icon: '✨', color: 'from-pink-500 to-rose-400' },
    { id: 'hair', name: 'Hair & Nails', icon: '💇', color: 'from-amber-500 to-yellow-400' },
    { id: 'detox', name: 'Detox & Cleanse', icon: '🌿', color: 'from-teal-500 to-cyan-400' }
  ];

  // Age groups
  const ageGroups = [
    { id: 'kids', name: 'Kids', icon: <FaBaby />, color: 'from-pink-500 to-rose-400' },
    { id: 'adults', name: 'Adults', icon: <FaMale />, color: 'from-blue-500 to-cyan-400' },
    { id: 'seniors', name: 'Seniors', icon: <FaFemale />, color: 'from-purple-500 to-indigo-400' }
  ];

  // Popular brands
  const popularBrands = [
    { name: 'NatureWell', rating: 4.9, specialty: 'Organic Supplements' },
    { name: 'HealthPlus', rating: 4.8, specialty: 'Clinical Formulas' },
    { name: 'PureForm', rating: 4.7, specialty: 'Vegetarian Capsules' },
    { name: 'VitaCare', rating: 4.8, specialty: 'Senior Formulas' },
    { name: 'WellnessPro', rating: 4.9, specialty: 'Sports Nutrition' },
    { name: 'BioEssence', rating: 4.7, specialty: 'Natural Extracts' }
  ];

  // Dummy products data
  const dummyProducts = [
    {
      id: 1,
      name: "Premium Multivitamin Complex",
      brand: "HealthPlus",
      description: "Complete daily nutrition with essential vitamins and minerals for optimal health and energy",
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviewCount: 1245,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "multivitamins",
      benefits: ["energy", "immunity", "skin"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isBestSeller: true,
      deliveryTime: "1-2 days",
      dosage: "1 capsule daily",
      ingredients: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E", "B-Complex", "Zinc", "Selenium"]
    },
    {
      id: 2,
      name: "Omega-3 Fish Oil Capsules",
      brand: "NatureWell",
      description: "High potency fish oil with 1000mg EPA and DHA for heart and brain health",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.7,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "heart-health",
      benefits: ["heart-health", "brain-health", "skin"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isBestSeller: false,
      deliveryTime: "2-3 days",
      dosage: "2 capsules daily",
      ingredients: ["Fish Oil", "EPA", "DHA", "Vitamin E"]
    },
    {
      id: 3,
      name: "Vitamin D3 + K2",
      brand: "PureForm",
      description: "Advanced bone support formula with high absorption vitamin D3 and K2",
      price: 32.99,
      originalPrice: 45.99,
      rating: 4.6,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "bone-joint",
      benefits: ["bone-joint", "immunity"],
      ageGroup: "seniors",
      inStock: true,
      isFeatured: false,
      isBestSeller: true,
      deliveryTime: "1-2 days",
      dosage: "1 softgel daily",
      ingredients: ["Vitamin D3", "Vitamin K2", "Coconut Oil"]
    },
    {
      id: 4,
      name: "Probiotic Digestive Support",
      brand: "BioEssence",
      description: "30 billion CFU probiotic blend for optimal digestive and immune health",
      price: 39.99,
      originalPrice: 52.99,
      rating: 4.9,
      reviewCount: 1234,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "immune",
      benefits: ["digestive", "immunity", "skin"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isBestSeller: false,
      deliveryTime: "2-3 days",
      dosage: "1 capsule daily",
      ingredients: ["Lactobacillus", "Bifidobacterium", "Prebiotic Fiber"]
    },
    {
      id: 5,
      name: "Kids Gummy Multivitamin",
      brand: "VitaCare",
      description: "Delicious gummy vitamins with essential nutrients for growing children",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviewCount: 678,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "multivitamins",
      benefits: ["immunity", "energy", "bone-joint"],
      ageGroup: "kids",
      inStock: true,
      isFeatured: false,
      isBestSeller: true,
      deliveryTime: "1-2 days",
      dosage: "2 gummies daily",
      ingredients: ["Vitamin C", "Vitamin D", "Zinc", "Natural Fruit Flavors"]
    },
    {
      id: 6,
      name: "Ashwagandha Stress Support",
      brand: "WellnessPro",
      description: "Adaptogenic herb formula for stress relief and mental clarity",
      price: 28.99,
      originalPrice: 38.99,
      rating: 4.7,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "brain-health",
      benefits: ["stress", "sleep", "energy"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isBestSeller: false,
      deliveryTime: "2-4 days",
      dosage: "2 capsules daily",
      ingredients: ["Ashwagandha Extract", "Black Pepper", "Vegetable Capsule"]
    },
    {
      id: 7,
      name: "Weight Management Formula",
      brand: "HealthPlus",
      description: "Advanced thermogenic formula to support healthy weight management",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.5,
      reviewCount: 789,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "weight-loss",
      benefits: ["weight-loss", "energy", "detox"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: false,
      isBestSeller: true,
      deliveryTime: "1-3 days",
      dosage: "2 capsules before meals",
      ingredients: ["Green Tea Extract", "Garcinia Cambogia", "Caffeine"]
    },
    {
      id: 8,
      name: "Vision Support Lutein",
      brand: "NatureWell",
      description: "Lutein and zeaxanthin formula for optimal eye health and vision protection",
      price: 36.99,
      originalPrice: 49.99,
      rating: 4.6,
      reviewCount: 345,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "eye-health",
      benefits: ["eye-health", "skin"],
      ageGroup: "seniors",
      inStock: true,
      isFeatured: false,
      isBestSeller: false,
      deliveryTime: "2-3 days",
      dosage: "1 softgel daily",
      ingredients: ["Lutein", "Zeaxanthin", "Vitamin C", "Vitamin E"]
    },
    {
      id: 9,
      name: "Senior Complete Formula",
      brand: "VitaCare",
      description: "Comprehensive vitamin and mineral formula specially designed for seniors",
      price: 52.99,
      originalPrice: 69.99,
      rating: 4.8,
      reviewCount: 432,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "multivitamins",
      benefits: ["bone-joint", "heart-health", "brain-health"],
      ageGroup: "seniors",
      inStock: true,
      isFeatured: true,
      isBestSeller: true,
      deliveryTime: "1-2 days",
      dosage: "2 tablets daily",
      ingredients: ["Vitamin B12", "Vitamin D3", "Calcium", "Magnesium", "CoQ10"]
    }
  ];

  useEffect(() => {
    // Simulate API loading with dummy data
    setTimeout(() => {
      setProducts(dummyProducts);
      setFilteredProducts(dummyProducts);
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
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
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
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Featured first, then bestseller, then rating
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return b.rating - a.rating;
        });
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Vitamin Image */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={vitaminImage} 
            alt="Premium Vitamins & Supplements - Nat and Sons Pharmacy"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/70"></div>
          {/* Secondary Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
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
              Premium Vitamins &
              <span className="block text-cyan-200 mt-2">Supplements</span>
            </motion.h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg">
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
                  className="w-full px-6 py-4 pl-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/80 focus:outline-none focus:border-white/50 text-lg shadow-2xl"
                />
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/90 text-xl" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-2 font-bold">
                  {dummyProducts.length}+
                </div>
                <h3 className="text-lg font-bold text-white">Products</h3>
                <p className="text-white/80 text-sm">High-quality formulas</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-2 font-bold">
                  {popularBrands.length}
                </div>
                <h3 className="text-lg font-bold text-white">Premium Brands</h3>
                <p className="text-white/80 text-sm">Trusted quality</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-2 font-bold">
                  4.8+
                </div>
                <h3 className="text-lg font-bold text-white">Average Rating</h3>
                <p className="text-white/80 text-sm">Customer satisfaction</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-2 font-bold">
                  24/7
                </div>
                <h3 className="text-lg font-bold text-white">Expert Support</h3>
                <p className="text-white/80 text-sm">Pharmacist advice</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Action Buttons */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#categories" 
              className="flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
            >
              <FaCapsules className="mr-2" />
              Browse Categories
            </a>
            <a 
              href="#best-sellers" 
              className="flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
            >
              <FaStar className="mr-2" />
              Best Sellers
            </a>
            <button className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
              <FaLeaf className="mr-2" />
              Natural Products
            </button>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section id="categories" className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Browse by Category
          </h2>
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
                  className={`w-full text-center p-6 rounded-2xl transition-all shadow-lg hover:shadow-xl ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-br ${category.color} text-white`
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-100'
                  }`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <div className="font-bold text-sm mb-2">{category.name}</div>
                  <div className="text-xs opacity-75">{category.count} products</div>
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
                className="lg:hidden flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <FaFilter className="mr-3" />
                  <span className="font-bold">Vitamin Filters</span>
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
                    className="bg-white rounded-2xl shadow-xl p-6 space-y-6 overflow-hidden border border-gray-200"
                  >
                    {/* Price Range */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Price Range (GHS)</h3>
                        <FaTag className="text-blue-600" />
                      </div>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="500"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 font-medium">
                          <span>{formatPrice(priceRange[0])}</span>
                          <span>{formatPrice(priceRange[1])}</span>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Health Benefits</h3>
                        <FaLeaf className="text-green-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {benefits.map((benefit) => (
                          <button
                            key={benefit.id}
                            onClick={() => toggleBenefit(benefit.id)}
                            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                              selectedBenefits.includes(benefit.id)
                                ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-200'
                                : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:bg-gray-100 hover:border hover:border-gray-200'
                            }`}
                          >
                            <div className="text-2xl mb-1">{benefit.icon}</div>
                            <span className="text-xs font-medium text-center">{benefit.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Age Group */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Age Group</h3>
                        <FaUsers className="text-purple-600" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {ageGroups.map((group) => (
                          <button
                            key={group.id}
                            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                              selectedCategory === 'age-' + group.id
                                ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-200'
                                : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:bg-gray-100 hover:border hover:border-gray-200'
                            }`}
                          >
                            <div className="text-2xl mb-1">{group.icon}</div>
                            <span className="text-xs font-medium">{group.name}</span>
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
                        <option value="popular">Most Popular</option>
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
                      className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-bold hover:from-gray-200 hover:to-gray-300 transition-all shadow-md hover:shadow-lg"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quality Guarantee Sidebar */}
              <div className="hidden lg:block space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <FaCheckCircle className="text-green-500 text-2xl mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Quality Guaranteed</div>
                      <div className="text-sm text-gray-600">Third-party lab tested</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center mb-4">
                    <FaLeaf className="text-green-500 text-2xl mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Natural Ingredients</div>
                      <div className="text-sm text-gray-600">No artificial additives</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <div className="flex items-center mb-4">
                    <FaShippingFast className="text-purple-500 text-2xl mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Fast Delivery</div>
                      <div className="text-sm text-gray-600">Free over GHS 200</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' 
                    ? 'Premium Vitamins & Supplements' 
                    : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                  {selectedBenefits.length > 0 && ` • ${selectedBenefits.length} benefits selected`}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                </div>
              </div>
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
                    setSelectedBenefits([]);
                    setPriceRange([0, 500]);
                    setSearchTerm('');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div id="best-sellers" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 space-y-2">
                          {product.isFeatured && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              Featured
                            </span>
                          )}
                          {product.isBestSeller && (
                            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              Best Seller
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
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
                              ? 'text-red-500 fill-current animate-pulse'
                              : 'text-gray-400'
                          }`} />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
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
                            {product.rating} ({product.reviewCount.toLocaleString()} reviews)
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
                                className="inline-flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-100"
                              >
                                {benefit.icon} <span className="ml-1">{benefit.name}</span>
                              </span>
                            ) : null;
                          })}
                          {product.benefits.length > 2 && (
                            <span className="inline-flex items-center bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200">
                              +{product.benefits.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Age Group */}
                        <div className="flex items-center mb-4">
                          <span className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                            {ageGroups.find(g => g.id === product.ageGroup)?.name}
                          </span>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className="text-2xl font-bold text-blue-600">
                                {formatPrice(product.price)}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                            {product.originalPrice > product.price && (
                              <div className="mt-1">
                                <span className="text-xs text-green-600 font-bold">
                                  Save {formatPrice(product.originalPrice - product.price)}!
                                </span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className={`flex items-center px-4 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg ${
                              product.inStock
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500'
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <FaTruck className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-gray-600 text-sm">On orders over GHS 200 in Accra</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">Third-party tested for purity</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <FaLeaf className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Natural Ingredients</h3>
              <p className="text-gray-600 text-sm">No artificial additives</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <FaCheckCircle className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Expert Approved</h3>
              <p className="text-gray-600 text-sm">Formulated by pharmacists</p>
            </motion.div>
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
            {popularBrands.map((brand) => (
              <motion.div 
                key={brand.name} 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">💊</div>
                  <div className="font-bold text-gray-800 mb-1">{brand.name}</div>
                  <div className="flex items-center justify-center text-sm text-yellow-500 mb-1">
                    <FaStar className="mr-1" />
                    {brand.rating}
                  </div>
                  <div className="text-xs text-gray-500">{brand.specialty}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our pharmacists are available for free consultations to help you find the right supplements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl">
                Book Consultation
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl">
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
              {formatPrice(cart.reduce((total, item) => total + item.price, 0))}
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
}