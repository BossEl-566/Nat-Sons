import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaClock,
  FaShieldAlt,
  FaTruck,
  FaUserMd,
  FaAward,
  FaHeart,
  FaPrescriptionBottle,
  FaCapsules,
  FaHospital,
  FaStore,
  FaUsers,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaPlayCircle,
  FaQuoteRight,
  FaCheckCircle,
  FaPills
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [stats, setStats] = useState({
    years: 0,
    customers: 0,
    products: 0,
    locations: 0
  });

  // Hero carousel slides
  const heroSlides = [
    {
      id: 1,
      title: "Ghana's Trusted Healthcare Partner",
      subtitle: "Serving communities with quality medicines and expert care since 1999",
      image: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Explore Products",
      link: "/healthcare-products"
    },
    {
      id: 2,
      title: "Premium Medical Equipment",
      subtitle: "State-of-the-art healthcare devices for hospitals and home use",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "View Equipment",
      link: "/medical-equipment"
    },
    {
      id: 3,
      title: "Expert Pharmaceutical Advice",
      subtitle: "Consult with our licensed pharmacists for personalized care",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Meet Our Team",
      link: "/about"
    }
  ];

  // Services
  const services = [
    {
      icon: <FaHospital className="w-8 h-8" />,
      title: "Hospital Supply",
      description: "Bulk medical supplies for healthcare facilities across Ghana",
      color: "from-blue-500 to-cyan-400",
      link: "/healthcare-products"
    },
    {
      icon: <FaStore className="w-8 h-8" />,
      title: "Retail Pharmacy",
      description: "Complete pharmaceutical services for individuals and families",
      color: "from-purple-500 to-pink-400",
      link: "/personal-care"
    },
    {
      icon: <FaUserMd className="w-8 h-8" />,
      title: "Clinical Services",
      description: "Health screenings, consultations, and medication management",
      color: "from-green-500 to-emerald-400",
      link: "/about"
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Delivery Service",
      description: "Reliable delivery of medicines and healthcare products",
      color: "from-orange-500 to-yellow-400",
      link: "/contact"
    }
  ];

  // Featured categories
  const categories = [
    {
      title: "Prescription Medicines",
      count: "500+",
      icon: <FaPrescriptionBottle className="w-12 h-12" />,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/healthcare-products"
    },
    {
      title: "Vitamins & Supplements",
      count: "200+",
      icon: <FaCapsules className="w-12 h-12" />,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/vitamins"
    },
    {
      title: "Medical Equipment",
      count: "100+",
      icon: <FaHospital className="w-12 h-12" />,
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/medical-equipment"
    },
    {
      title: "Personal Care",
      count: "300+",
      icon: <FaHeart className="w-12 h-12" />,
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/personal-care"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Dr. Kwame Mensah",
      role: "Hospital Director",
      content: "Nat & Sons has been our reliable medical supplier for 5 years. Their quality and service are exceptional.",
      rating: 5,
      image: "👨‍⚕️"
    },
    {
      name: "Akosua Adoma",
      role: "Regular Customer",
      content: "The pharmacists are always helpful and knowledgeable. I trust them with my family's health needs.",
      rating: 5,
      image: "👩"
    },
    {
      name: "Kofi Asante",
      role: "Local Retailer",
      content: "Their wholesale service helps my shop offer quality healthcare products to our community.",
      rating: 5,
      image: "👨‍💼"
    }
  ];

  // Stats counter animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        years: 25,
        customers: 50000,
        products: 1000,
        locations: 3
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Modern Carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 to-blue-800/90 z-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-8 bg-white/10 rounded-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <FaAward className="text-yellow-400 mr-2" />
                  <span className="font-medium">Trusted Since 1999</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  Healthcare
                  <span className="block bg-gradient-to-r from-cyan-300 to-blue-100 bg-clip-text text-transparent">
                    Redefined in Ghana
                  </span>
                </h1>
                
                <p className="text-xl text-blue-100 mb-8 max-w-xl">
                  Pioneering quality pharmacy services across Ghana with three convenient locations, 
                  serving hospitals, retailers, and families with premium healthcare solutions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    to="/healthcare-products" 
                    className="group bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
                  >
                    <span>Explore Products</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                  
                  <Link 
                    to="/contact" 
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all"
                  >
                    <FaPhoneAlt />
                    <span>Contact Us</span>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-6 mt-12">
                  <div>
                    <div className="text-3xl font-bold mb-1">3</div>
                    <div className="text-blue-200">Locations</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">25+</div>
                    <div className="text-blue-200">Years Experience</div>
                  </div>
                </div>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Modern Pharmacy Interior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                </div>
                
                {/* Floating element */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl max-w-xs"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-400 text-white p-2 rounded-lg mr-3">
                      <FaWhatsapp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">WhatsApp Order</div>
                      <div className="text-sm text-gray-600">Quick & easy</div>
                    </div>
                  </div>
                  <a 
                    href="https://wa.me/233551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white py-2 rounded-lg font-bold text-sm transition-all"
                  >
                    Order Now
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="text-white/60 text-sm font-medium">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mx-auto mt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl lg:text-6xl font-bold mb-2">{stats.years}+</div>
              <div className="text-blue-200">Years of Trust</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl lg:text-6xl font-bold mb-2">{stats.customers.toLocaleString()}+</div>
              <div className="text-blue-200">Customers Served</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-5xl lg:text-6xl font-bold mb-2">{stats.products}+</div>
              <div className="text-blue-200">Products</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-5xl lg:text-6xl font-bold mb-2">{stats.locations}</div>
              <div className="text-blue-200">Locations</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            >
              Comprehensive
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text">
                Healthcare Services
              </span>
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From hospitals to homes, we provide complete healthcare solutions across Ghana
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link to={service.link}>
                  <div className={`bg-gradient-to-br ${service.color} p-8 rounded-2xl text-white text-center h-full group-hover:shadow-2xl transition-all duration-300`}>
                    <div className="text-4xl mb-4 flex justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="opacity-90">{service.description}</p>
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="inline-flex items-center text-sm font-medium">
                        Learn more
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Featured
              <span className="block text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text">
                Categories
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our wide range of healthcare products and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link to={category.link}>
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-6 relative z-10 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`text-3xl ${index === 0 ? 'text-blue-500' : index === 1 ? 'text-purple-500' : index === 2 ? 'text-green-500' : 'text-pink-500'}`}>
                          {category.icon}
                        </div>
                        <div className="text-2xl font-bold text-gray-800">{category.count}</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
                      <div className="flex items-center text-blue-600 font-medium">
                        <span>Browse products</span>
                        <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold mb-6">
                <FaAward className="mr-2" />
                <span>Our Story</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Pioneering Healthcare in Ghana Since 1999
              </h2>
              
              <p className="text-gray-600 text-lg mb-8">
                Founded by Mr. Nana Abekah Twentoh and Mrs. Joyce Baaba Twentoh, Nat & Sons Pharmacy 
                started as the first pharmacy in Abura, Cape Coast. Today, we serve communities across 
                Ghana with three locations, providing quality healthcare to hospitals, retailers, and families.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">First pharmacy established in Abura, Cape Coast</span>
                </div>
                <div className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Trusted supplier to hospitals and healthcare facilities</span>
                </div>
                <div className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Expert pharmacists providing personalized care</span>
                </div>
              </div>
              
              <Link 
                to="/about" 
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
              >
                <span>Our Journey</span>
                <FaArrowRight className="ml-3" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">1999</div>
                    <div className="text-gray-800 font-bold">Founded</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
                    <div className="text-gray-800 font-bold">Branches</div>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                    <div className="text-gray-800 font-bold">Team Members</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-8 text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                    <div className="text-gray-800 font-bold">Emergency Service</div>
                  </div>
                </div>
              </div>
              
              {/* Floating element */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl max-w-xs"
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-500 text-2xl mr-3" />
                  <div>
                    <div className="font-bold text-gray-800">Find Us</div>
                    <div className="text-sm text-gray-600">3 locations across Ghana</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Trusted by
              <span className="block text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
                Healthcare Professionals
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              What hospitals, retailers, and customers say about our services
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="!pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-2xl mr-4">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-blue-600 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <FaQuoteRight className="text-blue-200 text-3xl mb-4" />
                    <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  </div>
                  
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Experience
                <span className="block">Better Healthcare?</span>
              </h2>
              
              <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
                Visit any of our three locations or contact us for expert pharmaceutical advice and quality healthcare products.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/store-locator" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-bold text-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <FaMapMarkerAlt />
                  <span>Find a Pharmacy</span>
                </Link>
                
                <a 
                  href="https://wa.me/233551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-3"
                >
                  <FaWhatsapp />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/233551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-500 to-emerald-400 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="ml-3 font-bold hidden sm:block">Need Help?</span>
      </a>
    </div>
  );
}