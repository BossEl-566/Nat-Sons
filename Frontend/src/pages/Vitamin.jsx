import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaWhatsapp, 
  FaPhoneAlt, 
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
  FaSortAmountDown,
  FaInfoCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import vitamin image - Update this path to your actual image location
import vitaminImage from '../assets/vitamin.jpg'; 
// Import all supplement product images from assets
import PremiumMultivitamin from "../assets/Multivitamin.jpeg";
import Omega3FishOil from "../assets/Omega3-Fish-Oil.jpeg";
import VitaminDK2 from "../assets/Vitamin-D-K2.jpeg";
import Probiotics from "../assets/Probiotic.jpeg";
import KidsGummyVitamins from "../assets/Kids-Gummy-Vitamins.jpeg";
import Ashwagandha from "../assets/Ashwagandha.jpeg";
import WeightManagement from "../assets/Weight-Management.jpeg";
import VisionSupport from "../assets/Vision-Support.jpeg";
import SeniorFormula from "../assets/Senior-Formula.jpeg";

export default function Vitamin() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  // Service Info Cards
  const services = [
    { 
      icon: <FaClock />, 
      title: '24/7 Support', 
      description: 'Round-the-clock assistance via WhatsApp'
    },
    { 
      icon: <FaShippingFast />, 
      title: 'Nationwide Delivery', 
      description: 'Fast delivery across all regions'
    },
    { 
      icon: <FaShieldAlt />, 
      title: 'Certified Products', 
      description: 'Authentic & FDA-approved items'
    }
  ];

  // Dummy products data
  const dummyProducts = [
    {
      id: 1,
      name: "Premium Multivitamin Complex",
      brand: "HealthPlus",
      description: "Complete daily nutrition with essential vitamins and minerals for optimal health and energy",
      rating: 4.8,
      reviewCount: 1245,
      image: PremiumMultivitamin, // Changed from URL to imported image
      category: "multivitamins",
      benefits: ["energy", "immunity", "skin"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isBestSeller: true,
      deliveryTime: "1-2 days",
      dosage: "1 capsule daily",
      ingredients: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E", "B-Complex", "Zinc", "Selenium"],
      whatsappMessage: "Hi, I'm interested in the Premium Multivitamin Complex. Can you provide more details and pricing?"
    },
    {
      id: 2,
      name: "Omega-3 Fish Oil Capsules",
      brand: "NatureWell",
      description: "High potency fish oil with 1000mg EPA and DHA for heart and brain health",
      rating: 4.7,
      reviewCount: 892,
      image: Omega3FishOil, // Changed from URL to imported image
      category: "heart-health",
      benefits: ["heart-health", "brain-health", "skin"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isBestSeller: false,
      deliveryTime: "2-3 days",
      dosage: "2 capsules daily",
      ingredients: ["Fish Oil", "EPA", "DHA", "Vitamin E"],
      whatsappMessage: "Hello, I'd like to inquire about Omega-3 Fish Oil Capsules. Is it available?"
    },
    {
      id: 3,
      name: "Vitamin D3 + K2",
      brand: "PureForm",
      description: "Advanced bone support formula with high absorption vitamin D3 and K2",
      rating: 4.6,
      reviewCount: 567,
      image: VitaminDK2, // Changed from URL to imported image
      category: "bone-joint",
      benefits: ["bone-joint", "immunity"],
      ageGroup: "seniors",
      inStock: true,
      isFeatured: false,
      isBestSeller: true,
      deliveryTime: "1-2 days",
      dosage: "1 softgel daily",
      ingredients: ["Vitamin D3", "Vitamin K2", "Coconut Oil"],
      whatsappMessage: "Hi, I need information about Vitamin D3 + K2. What are the dosage options?"
    },
    {
      id: 4,
      name: "Probiotic Digestive Support",
      brand: "BioEssence",
      description: "30 billion CFU probiotic blend for optimal digestive and immune health",
      rating: 4.9,
      reviewCount: 1234,
      image: Probiotics, // Changed from URL to imported image
      category: "immune",
      benefits: ["digestive", "immunity", "skin"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isBestSeller: false,
      deliveryTime: "2-3 days",
      dosage: "1 capsule daily",
      ingredients: ["Lactobacillus", "Bifidobacterium", "Prebiotic Fiber"],
      whatsappMessage: "Hello, I want to buy Probiotic Digestive Support. Do you have different CFU options?"
    },
    {
      id: 5,
      name: "Kids Gummy Multivitamin",
      brand: "VitaCare",
      description: "Delicious gummy vitamins with essential nutrients for growing children",
      rating: 4.8,
      reviewCount: 678,
      image: KidsGummyVitamins, // Changed from URL to imported image
      category: "multivitamins",
      benefits: ["immunity", "energy", "bone-joint"],
      ageGroup: "kids",
      inStock: true,
      isFeatured: false,
      isBestSeller: true,
      deliveryTime: "1-2 days",
      dosage: "2 gummies daily",
      ingredients: ["Vitamin C", "Vitamin D", "Zinc", "Natural Fruit Flavors"],
      whatsappMessage: "Hi, I'm looking for Kids Gummy Multivitamin. What flavors do you have?"
    },
    {
      id: 6,
      name: "Ashwagandha Stress Support",
      brand: "WellnessPro",
      description: "Adaptogenic herb formula for stress relief and mental clarity",
      rating: 4.7,
      reviewCount: 456,
      image: Ashwagandha, // Changed from URL to imported image
      category: "brain-health",
      benefits: ["stress", "sleep", "energy"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: true,
      isBestSeller: false,
      deliveryTime: "2-4 days",
      dosage: "2 capsules daily",
      ingredients: ["Ashwagandha Extract", "Black Pepper", "Vegetable Capsule"],
      whatsappMessage: "Hello, I need Ashwagandha Stress Support. Is it suitable for anxiety?"
    },
    {
      id: 7,
      name: "Weight Management Formula",
      brand: "HealthPlus",
      description: "Advanced thermogenic formula to support healthy weight management",
      rating: 4.5,
      reviewCount: 789,
      image: WeightManagement, // Changed from URL to imported image
      category: "weight-loss",
      benefits: ["weight-loss", "energy", "detox"],
      ageGroup: "adults",
      inStock: true,
      isFeatured: false,
      isBestSeller: true,
      deliveryTime: "1-3 days",
      dosage: "2 capsules before meals",
      ingredients: ["Green Tea Extract", "Garcinia Cambogia", "Caffeine"],
      whatsappMessage: "Hi, I'm interested in Weight Management Formula. Are there side effects?"
    },
    {
      id: 8,
      name: "Vision Support Lutein",
      brand: "NatureWell",
      description: "Lutein and zeaxanthin formula for optimal eye health and vision protection",
      rating: 4.6,
      reviewCount: 345,
      image: VisionSupport, // Changed from URL to imported image
      category: "eye-health",
      benefits: ["eye-health", "skin"],
      ageGroup: "seniors",
      inStock: true,
      isFeatured: false,
      isBestSeller: false,
      deliveryTime: "2-3 days",
      dosage: "1 softgel daily",
      ingredients: ["Lutein", "Zeaxanthin", "Vitamin C", "Vitamin E"],
      whatsappMessage: "Hello, I need Vision Support Lutein. Is it for macular degeneration?"
    },
    {
      id: 9,
      name: "Senior Complete Formula",
      brand: "VitaCare",
      description: "Comprehensive vitamin and mineral formula specially designed for seniors",
      rating: 4.8,
      reviewCount: 432,
      image: SeniorFormula, // Changed from URL to imported image
      category: "multivitamins",
      benefits: ["bone-joint", "heart-health", "brain-health"],
      ageGroup: "seniors",
      inStock: true,
      isFeatured: true,
      isBestSeller: true,
      deliveryTime: "1-2 days",
      dosage: "2 tablets daily",
      ingredients: ["Vitamin B12", "Vitamin D3", "Calcium", "Magnesium", "CoQ10"],
      whatsappMessage: "Hi, I'm looking for Senior Complete Formula. Can you advise on dosage?"
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

    // Sorting
    switch (sortBy) {
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
  }, [searchTerm, selectedCategory, selectedBenefits, sortBy, products]);

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

  const toggleBenefit = (benefitId) => {
    setSelectedBenefits(prev =>
      prev.includes(benefitId)
        ? prev.filter(id => id !== benefitId)
        : [...prev, benefitId]
    );
  };

  const getWhatsAppUrl = (product) => {
    const phoneNumber = "233209468565"; // Your WhatsApp number
    const message = encodeURIComponent(product.whatsappMessage);
    return `https://wa.me/${phoneNumber}?text=${message}`;
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
                        <option value="rating">Highest Rated</option>
                        <option value="popular">Most Popular</option>
                      </select>
                    </div>

                    {/* Clear Filters */}
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedBenefits([]);
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
                      <div className="text-sm text-gray-600">Contact for shipping details</div>
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
                        <div className="flex items-center mb-6">
                          <span className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                            {ageGroups.find(g => g.id === product.ageGroup)?.name}
                          </span>
                        </div>

                        {/* WhatsApp Inquiry Button */}
                        <button
                          onClick={() => handleWhatsAppInquiry(product)}
                          disabled={!product.inStock}
                          className={`w-full bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all group/inquiry shadow-md hover:shadow-lg ${
                            !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <FaWhatsapp className="mr-2 text-lg" />
                          <span>{product.inStock ? 'Inquire on WhatsApp' : 'Out of Stock'}</span>
                          <FaChevronDown className="ml-2 transform group-hover/inquiry:translate-y-1 transition-transform" />
                        </button>

                        {/* Quick Info */}
                        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <FaTruck className="mr-1" />
                            <span>Free shipping available</span>
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
                    <div className="text-sm text-blue-600 mt-1">
                      Contact us for pricing details
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
                      window.location.href = `tel:+233208138549`;
                    }}
                    className="block w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white py-3 rounded-lg font-bold text-center transition-all shadow-md hover:shadow-lg"
                  >
                    <div className="flex items-center justify-center">
                      <FaPhoneAlt className="mr-2" />
                      Call Instead for whole sale inquiries
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

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <FaTruck className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Nationwide Delivery</h3>
              <p className="text-gray-600 text-sm">Fast shipping across Ghana</p>
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
              <a
                href="https://wa.me/233209468565"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl text-center"
              >
                WhatsApp Consultation
              </a>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl">
                View Supplement Guide
              </button>
            </div>
          </div>
        </div>
      </section>

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