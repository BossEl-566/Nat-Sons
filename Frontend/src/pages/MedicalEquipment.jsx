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
  FaTruck,
  FaShieldAlt,
  FaWrench,
  FaStethoscope,
  FaThermometer,
  FaWeight,
  FaBed,
  FaSyringe,
  FaTint,
  FaHeartbeat,
  FaProcedures,
  FaHospital,
  FaHome,
  FaChevronDown,
  FaTimes,
  FaInfoCircle,
  FaTag,
  FaShoppingBag,
  FaClipboardCheck,
  FaUserMd,
  FaShippingFast,
  FaCogs,
  FaTools,
  FaIndustry,
  FaSortAmountDown
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import equipment image - Update this path to your actual image location
import equipmentImage from '../assets/medicalequipment.jpg';

export default function MedicalEquipment() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUseCase, setSelectedUseCase] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Main Categories with Icons
  const categories = [
    { 
      id: 'all', 
      name: 'All Equipment', 
      icon: <FaProcedures />, 
      color: 'from-blue-600 to-cyan-500',
      description: 'Complete medical equipment range'
    },
    { 
      id: 'monitoring', 
      name: 'Monitoring Devices', 
      icon: <FaHeartbeat />, 
      color: 'from-red-500 to-pink-500',
      description: 'BP Machines, Glucometers, Pulse Oximeters'
    },
    { 
      id: 'diagnostic', 
      name: 'Diagnostic Tools', 
      icon: <FaStethoscope />, 
      color: 'from-green-500 to-emerald-500',
      description: 'Thermometers, Otoscopes, Ophthalmoscopes'
    },
    { 
      id: 'therapeutic', 
      name: 'Therapeutic Equipment', 
      icon: <FaHospital />, 
      color: 'from-purple-500 to-indigo-500',
      description: 'Nebulizers, CPAP Machines, Oxygen Concentrators'
    },
    { 
      id: 'mobility', 
      name: 'Mobility Aids', 
      icon: <FaBed />, 
      color: 'from-orange-500 to-amber-500',
      description: 'Wheelchairs, Walkers, Crutches'
    },
    { 
      id: 'hospital', 
      name: 'Hospital Equipment', 
      icon: <FaHospital />, 
      color: 'from-teal-500 to-cyan-500',
      description: 'Hospital Beds, IV Stands, Patient Monitors'
    },
    { 
      id: 'home-care', 
      name: 'Home Care', 
      icon: <FaHome />, 
      color: 'from-blue-400 to-cyan-400',
      description: 'Home-use medical devices'
    },
    { 
      id: 'laboratory', 
      name: 'Lab Equipment', 
      icon: <FaTint />, 
      color: 'from-indigo-500 to-blue-500',
      description: 'Lab analyzers, centrifuges, microscopes'
    }
  ];

  // Use Case Filters
  const useCases = [
    { id: 'all', name: 'All Use Cases', icon: '🏥' },
    { id: 'diabetes', name: 'Diabetes Care', icon: '🩸' },
    { id: 'cardiac', name: 'Cardiac Care', icon: '❤️' },
    { id: 'respiratory', name: 'Respiratory Care', icon: '🌬️' },
    { id: 'elderly', name: 'Elderly Care', icon: '👵' },
    { id: 'pediatric', name: 'Pediatric Care', icon: '👶' },
    { id: 'clinical', name: 'Clinical Use', icon: '🏥' },
    { id: 'home', name: 'Home Use', icon: '🏠' }
  ];

  // Brands
  const brands = [
    { id: 'all', name: 'All Brands' },
    { id: 'omron', name: 'Omron', premium: true },
    { id: 'microlife', name: 'Microlife', premium: true },
    { id: 'accucheck', name: 'Accu-Chek', premium: true },
    { id: 'resmed', name: 'ResMed', premium: true },
    { id: 'philips', name: 'Philips', premium: true },
    { id: 'drive', name: 'Drive Medical', premium: false },
    { id: 'invacare', name: 'Invacare', premium: false },
    { id: 'local', name: 'Local Brands', premium: false }
  ];

  // Sample medical equipment data
  const sampleProducts = [
    {
      id: 1,
      name: "Digital Blood Pressure Monitor",
      brand: "Omron",
      model: "M3 Comfort",
      description: "Automatic upper arm blood pressure monitor with Intelli Wrap Cuff, 90 memory storage",
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.8,
      reviewCount: 342,
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "monitoring",
      useCase: ["cardiac", "home", "elderly"],
      brandId: "omron",
      features: ["Memory Storage", "Irregular Heartbeat Detection", "Large Display"],
      warranty: "3 Years",
      deliveryTime: "1-2 Days",
      inStock: true,
      isFeatured: true,
      isPremium: true,
      whatsappMessage: "Hi, I'm interested in the Omron M3 Comfort Blood Pressure Monitor. Can you provide more details?"
    },
    {
      id: 2,
      name: "Blood Glucose Monitoring System",
      brand: "Accu-Chek",
      model: "Active",
      description: "Complete diabetes monitoring kit with meter, lancet device, test strips, and control solution",
      price: 45.99,
      originalPrice: 65.00,
      rating: 4.7,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "monitoring",
      useCase: ["diabetes", "home"],
      brandId: "accucheck",
      features: ["500 Memory Storage", "Alternative Site Testing", "Fast Results"],
      warranty: "5 Years",
      deliveryTime: "1-3 Days",
      inStock: true,
      isFeatured: true,
      isPremium: true,
      whatsappMessage: "Hello, I need the Accu-Chek Active Glucose Monitoring System. Is it available?"
    },
    {
      id: 3,
      name: "Automatic Hospital Bed",
      brand: "Invacare",
      model: "8900P",
      description: "Full electric hospital bed with adjustable height, backrest, and knee break",
      price: 2499.99,
      originalPrice: 3200.00,
      rating: 4.9,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "hospital",
      useCase: ["elderly", "clinical"],
      brandId: "invacare",
      features: ["Electric Adjustments", "Trendelenburg Position", "Side Rails"],
      warranty: "2 Years",
      deliveryTime: "5-7 Days",
      inStock: true,
      isFeatured: true,
      isPremium: true,
      whatsappMessage: "Hi, I'm interested in the Invacare 8900P Hospital Bed. Can you provide pricing and delivery details?"
    },
    {
      id: 4,
      name: "CPAP Machine with Humidifier",
      brand: "ResMed",
      model: "AirSense 10",
      description: "Automatic CPAP machine with integrated humidifier for sleep apnea treatment",
      price: 899.99,
      originalPrice: 1200.00,
      rating: 4.8,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "therapeutic",
      useCase: ["respiratory", "home"],
      brandId: "resmed",
      features: ["AutoRamp", "Climate Control", "Advanced Data Tracking"],
      warranty: "2 Years",
      deliveryTime: "3-5 Days",
      inStock: true,
      isFeatured: false,
      isPremium: true,
      whatsappMessage: "Hello, I need information about the ResMed AirSense 10 CPAP Machine. Is prescription required?"
    },
    {
      id: 5,
      name: "Portable Oxygen Concentrator",
      brand: "Philips",
      model: "SimplyGo",
      description: "Lightweight portable oxygen concentrator with pulse and continuous flow settings",
      price: 1899.99,
      originalPrice: 2500.00,
      rating: 4.7,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "therapeutic",
      useCase: ["respiratory", "elderly"],
      brandId: "philips",
      features: ["Portable Design", "Battery Operated", "Multiple Flow Settings"],
      warranty: "3 Years",
      deliveryTime: "4-6 Days",
      inStock: true,
      isFeatured: true,
      isPremium: true,
      whatsappMessage: "Hi, I want to inquire about the Philips SimplyGo Oxygen Concentrator. What's the delivery time?"
    },
    {
      id: 6,
      name: "Digital Thermometer",
      brand: "Microlife",
      model: "MT 16C1",
      description: "Fast and accurate digital thermometer with flexible tip and fever alarm",
      price: 12.99,
      originalPrice: 19.99,
      rating: 4.5,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "diagnostic",
      useCase: ["pediatric", "home"],
      brandId: "microlife",
      features: ["Flexible Tip", "Fever Alarm", "Water Resistant"],
      warranty: "2 Years",
      deliveryTime: "1-2 Days",
      inStock: true,
      isFeatured: false,
      isPremium: false,
      whatsappMessage: "Hello, I need the Microlife MT 16C1 Digital Thermometer. Do you have it in stock?"
    },
    {
      id: 7,
      name: "Folding Wheelchair",
      brand: "Drive Medical",
      model: "Cruiser III",
      description: "Lightweight folding wheelchair with removable desk arms and swing-away footrests",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.6,
      reviewCount: 189,
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "mobility",
      useCase: ["elderly", "home"],
      brandId: "drive",
      features: ["Folding Design", "Removable Arms", "Adjustable Footrests"],
      warranty: "1 Year",
      deliveryTime: "2-4 Days",
      inStock: true,
      isFeatured: true,
      isPremium: false,
      whatsappMessage: "Hi, I'm interested in the Drive Medical Cruiser III Wheelchair. What colors are available?"
    },
    {
      id: 8,
      name: "Patient Monitor 5-Parameter",
      brand: "Mindray",
      model: "PM-9000",
      description: "Multi-parameter patient monitor for ECG, SpO2, NIBP, RESP, and temperature",
      price: 3299.99,
      originalPrice: 4500.00,
      rating: 4.9,
      reviewCount: 78,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "hospital",
      useCase: ["clinical", "cardiac"],
      brandId: "local",
      features: ["5 Parameters", "Large Color Display", "Alarm System"],
      warranty: "2 Years",
      deliveryTime: "7-10 Days",
      inStock: true,
      isFeatured: false,
      isPremium: true,
      whatsappMessage: "Hello, I need the Mindray PM-9000 Patient Monitor for our clinic. Can you arrange installation?"
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
        product.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Use case filter
    if (selectedUseCase !== 'all') {
      filtered = filtered.filter(product => 
        product.useCase.includes(selectedUseCase)
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
  }, [searchTerm, selectedCategory, selectedUseCase, priceRange, sortBy, products]);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Equipment Image */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={equipmentImage} 
            alt="Medical Equipment Solutions - Nat and Sons Pharmacy"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/70"></div>
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
              Medical Equipment Solutions
              <span className="block text-blue-200 mt-2">For Healthcare Professionals & Home Use</span>
            </motion.h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Premium medical devices from trusted brands. From glucometers to hospital beds, we have it all.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medical equipment, brands, or models..."
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
                  {categories.length}
                </div>
                <h3 className="text-lg font-bold text-white">Categories</h3>
                <p className="text-white/80 text-sm">Equipment types</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-2 font-bold">
                  {brands.filter(b => b.premium).length}
                </div>
                <h3 className="text-lg font-bold text-white">Premium Brands</h3>
                <p className="text-white/80 text-sm">Trusted quality</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-2 font-bold">
                  5+
                </div>
                <h3 className="text-lg font-bold text-white">Years Warranty</h3>
                <p className="text-white/80 text-sm">Peace of mind</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-2 font-bold">
                  24/7
                </div>
                <h3 className="text-lg font-bold text-white">Support</h3>
                <p className="text-white/80 text-sm">Technical assistance</p>
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
              <FaIndustry className="mr-2" />
              Browse Categories
            </a>
            <a 
              href="https://wa.me/233551234567" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
            >
              <FaWhatsapp className="mr-2" />
              Technical Support
            </a>
            <button className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
              <FaTools className="mr-2" />
              Maintenance Services
            </button>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section id="categories" className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Browse Equipment Categories
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
                  }}
                  className={`w-full text-center p-6 rounded-2xl transition-all shadow-lg hover:shadow-xl ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-br ${category.color} text-white`
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-100'
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
                className="lg:hidden flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <FaFilter className="mr-3" />
                  <span className="font-bold">Equipment Filters</span>
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
                          max="5000"
                          step="100"
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

                    {/* Use Case */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Medical Use Case</h3>
                        <FaStethoscope className="text-blue-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {useCases.map((useCase) => (
                          <button
                            key={useCase.id}
                            onClick={() => setSelectedUseCase(useCase.id)}
                            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                              selectedUseCase === useCase.id
                                ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-200'
                                : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:bg-gray-100 hover:border hover:border-gray-200'
                            }`}
                          >
                            <div className="text-2xl mb-1">{useCase.icon}</div>
                            <span className="text-xs font-medium text-center">{useCase.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brands */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Brands</h3>
                        <FaShieldAlt className="text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <button
                            key={brand.id}
                            className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 text-left transition-colors"
                          >
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-3 ${brand.premium ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                              <span className="text-sm text-gray-700">{brand.name}</span>
                            </div>
                            {brand.premium && (
                              <span className="text-xs bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 px-2 py-1 rounded font-bold">
                                Premium
                              </span>
                            )}
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
                        setSelectedUseCase('all');
                        setPriceRange([0, 5000]);
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

              {/* Services Sidebar */}
              <div className="hidden lg:block space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <FaWrench className="text-blue-500 text-2xl mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Installation Service</div>
                      <div className="text-sm text-gray-600">Professional setup available</div>
                    </div>
                  </div>
                  <button className="w-full mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Learn more →
                  </button>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center mb-4">
                    <FaClipboardCheck className="text-green-500 text-2xl mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Training Included</div>
                      <div className="text-sm text-gray-600">Free training for complex equipment</div>
                    </div>
                  </div>
                  <button className="w-full mt-2 text-green-600 hover:text-green-700 text-sm font-medium">
                    Learn more →
                  </button>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <div className="flex items-center mb-4">
                    <FaUserMd className="text-purple-500 text-2xl mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Medical Consultation</div>
                      <div className="text-sm text-gray-600">Free consultation with purchase</div>
                    </div>
                  </div>
                  <button className="w-full mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Learn more →
                  </button>
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
                    ? 'Medical Equipment' 
                    : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} products
                  {selectedUseCase !== 'all' && ` for ${useCases.find(u => u.id === selectedUseCase)?.name}`}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1 shadow-inner">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md' 
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-1 w-6 h-6">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`rounded ${
                          viewMode === 'grid' ? 'bg-white' : 'bg-gray-400'
                        }`}></div>
                      ))}
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'list' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md' 
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    <div className="space-y-1 w-6 h-6">
                      <div className={`h-1 rounded ${
                        viewMode === 'list' ? 'bg-white' : 'bg-gray-400'
                      }`}></div>
                      <div className={`h-1 rounded ${
                        viewMode === 'list' ? 'bg-white' : 'bg-gray-400'
                      }`}></div>
                      <div className={`h-1 rounded ${
                        viewMode === 'list' ? 'bg-white' : 'bg-gray-400'
                      }`}></div>
                    </div>
                  </button>
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
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No equipment found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedUseCase('all');
                    setPriceRange([0, 5000]);
                    setSearchTerm('');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Products Grid/List View */}
                <div className={`gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid md:grid-cols-2 lg:grid-cols-3' 
                    : 'space-y-6'
                }`}>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ y: viewMode === 'grid' ? -5 : 0 }}
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 ${
                        viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                      }`}
                    >
                      {/* Product Image */}
                      <div className={`${
                        viewMode === 'list' 
                          ? 'md:w-1/3 h-48 md:h-auto' 
                          : 'h-48'
                      } relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 space-y-2">
                          {product.isFeatured && (
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              Featured
                            </span>
                          )}
                          {product.isPremium && (
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              Premium
                            </span>
                          )}
                          {product.originalPrice > product.price && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              Save {formatPrice(product.originalPrice - product.price)}
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
                      <div className={`p-6 flex-1 ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <p className="text-gray-500 text-sm">{product.brand}</p>
                              <span className="text-gray-400">•</span>
                              <p className="text-gray-500 text-sm">{product.model}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {formatPrice(product.price)}
                            </div>
                            {product.originalPrice > product.price && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </div>
                            )}
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

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-100"
                            >
                              {feature}
                            </span>
                          ))}
                          {product.features.length > 3 && (
                            <span className="inline-block bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200">
                              +{product.features.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Specifications */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center">
                            <FaShieldAlt className="text-green-500 mr-2" />
                            <div>
                              <div className="text-xs text-gray-500">Warranty</div>
                              <div className="text-sm font-medium">{product.warranty}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaShippingFast className="text-blue-500 mr-2" />
                            <div>
                              <div className="text-xs text-gray-500">Delivery</div>
                              <div className="text-sm font-medium">{product.deliveryTime}</div>
                            </div>
                          </div>
                        </div>

                        {/* WhatsApp Inquiry Button */}
                        <button
                          onClick={() => handleWhatsAppInquiry(product)}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all group/inquiry shadow-md hover:shadow-lg"
                        >
                          <FaWhatsapp className="mr-2 text-lg" />
                          <span>Inquire on WhatsApp</span>
                          <FaChevronDown className="ml-2 transform group-hover/inquiry:translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bulk Purchase Notice */}
                <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-xl text-white mr-6">
                      <FaHospital className="text-3xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Bulk Purchase for Hospitals & Clinics?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        We offer special pricing and comprehensive solutions for healthcare facilities. 
                        Contact us for customized quotes and installation packages.
                      </p>
                      <button
                        onClick={() => {
                          const message = encodeURIComponent("Hi, I'm interested in bulk purchase of medical equipment for my healthcare facility. Can you provide more information?");
                          window.open(`https://wa.me/233551234567?text=${message}`, '_blank');
                        }}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                      >
                        Request Bulk Quote
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Comprehensive Medical Equipment Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide end-to-end solutions for all your medical equipment needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100 hover:border-blue-200 transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <FaTruck className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Delivery & Setup</h3>
              <p className="text-gray-600">Professional delivery and installation service nationwide</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100 hover:border-green-200 transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <FaWrench className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Maintenance</h3>
              <p className="text-gray-600">Regular maintenance and calibration services</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100 hover:border-purple-200 transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <FaClipboardCheck className="text-purple-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Training</h3>
              <p className="text-gray-600">Comprehensive training for equipment operation</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100 hover:border-orange-200 transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <FaShieldAlt className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Warranty</h3>
              <p className="text-gray-600">Extended warranty options available</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Trusted Medical Equipment Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['Omron', 'ResMed', 'Philips', 'Accu-Chek', 'Microlife', 'Drive Medical'].map((brand) => (
              <div key={brand} className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl flex items-center justify-center hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 hover:border-blue-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-700">{brand}</div>
                  <div className="text-xs text-gray-500 mt-1">Premium Brand</div>
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
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Inquire About Equipment</h3>
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
                    <p className="text-gray-600 text-sm">{selectedProduct.brand} {selectedProduct.model}</p>
                    <div className="text-lg font-bold text-blue-600">
                      {formatPrice(selectedProduct.price)}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-6 border border-blue-100">
                  <div className="flex items-start">
                    <FaInfoCircle className="text-blue-500 mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-blue-700">
                        You'll be redirected to WhatsApp with a pre-filled message. 
                        Our medical equipment specialists will assist you with technical specifications, 
                        availability, delivery, and installation options.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={getWhatsAppUrl(selectedProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white py-3 rounded-lg font-bold text-center transition-all shadow-md hover:shadow-lg"
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
                    className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-bold text-center transition-all shadow-md hover:shadow-lg"
                  >
                    <div className="flex items-center justify-center">
                      <FaPhoneAlt className="mr-2" />
                      Call for Technical Support
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
                <p>Technical support available: Mon-Sat 8:00 AM - 8:00 PM</p>
                <p>Installation services available for large equipment</p>
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
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-500 to-emerald-400 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center animate-bounce"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="ml-3 font-bold hidden sm:block">Equipment Inquiry</span>
      </a>
    </div>
  );
}