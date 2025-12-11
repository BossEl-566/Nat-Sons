import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaClock,
  FaTruck,
  FaUserMd,
  FaAward,
  FaHeart,
  FaPrescriptionBottle,
  FaCapsules,
  FaHospital,
  FaStore,
  FaStar,
  FaQuoteRight,
  FaCheckCircle,
  FaShieldAlt,
  FaPills,
  FaLeaf,
  FaStethoscope,
  FaBriefcaseMedical,
  FaUsers
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import your images - Update these paths with your actual image files
import moderninterior from '../assets/mordern-pharmacy.jpg';
import founder1 from '../assets/founder1.jpg'; // Add your founder images here
import founder2 from '../assets/founder2.jpg';
import placeholderFounder from '../assets/placeholder.jpg'; // Fallback image

export default function HomePage() {
  const [stats, setStats] = useState({
    years: 0,
    customers: 0,
    products: 0,
    locations: 0
  });

  // Founders data - update with actual names and image paths
  const founders = [
    {
      name: "Dr. (pharm) Nana Abekah Twentoh",
      role: "Co-Founder & CEO",
      image: founder1,
      description: "With over 25 years of pharmaceutical experience, Mr. Twentoh established the first pharmacy in Abura, Cape Coast.",
      achievement: "Pioneered modern pharmacy practice in the region"
    },
    {
      name: "Mrs. Joyce Baaba Twentoh",
      role: "Co-Founder & Director",
      image: founder2,
      description: "Mrs. Twentoh brought her expertise in healthcare management to build a customer-focused pharmacy network.",
      achievement: "Established community healthcare programs"
    }
  ];

  // Services
  const services = [
    {
      icon: <FaHospital className="w-6 h-6" />,
      title: "Hospital Supply",
      description: "Bulk medical supplies for healthcare facilities",
      color: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-600",
      link: "/healthcare-products"
    },
    {
      icon: <FaStore className="w-6 h-6" />,
      title: "Retail Pharmacy",
      description: "Complete pharmaceutical services for individuals",
      color: "bg-purple-50 border-purple-100",
      iconColor: "text-purple-600",
      link: "/personal-care"
    },
    {
      icon: <FaUserMd className="w-6 h-6" />,
      title: "Clinical Services",
      description: "Health screenings and consultations",
      color: "bg-green-50 border-green-100",
      iconColor: "text-green-600",
      link: "/about"
    },
    {
      icon: <FaTruck className="w-6 h-6" />,
      title: "Delivery Service",
      description: "Reliable delivery across Ghana",
      color: "bg-orange-50 border-orange-100",
      iconColor: "text-orange-600",
      link: "/contact"
    }
  ];

  // Featured categories
  const categories = [
    {
      title: "Prescription Medicines",
      count: "500+",
      icon: <FaPrescriptionBottle className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/healthcare-products"
    },
    {
      title: "Vitamins & Supplements",
      count: "200+",
      icon: <FaCapsules className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/vitamins"
    },
    {
      title: "Medical Equipment",
      count: "100+",
      icon: <FaStethoscope className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/medical-equipment"
    },
    {
      title: "Personal Care",
      count: "300+",
      icon: <FaLeaf className="w-8 h-8" />,
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-16 sm:pt-20 lg:pt-24">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 text-center lg:text-left"
              >
                {/* Trust Badge */}
                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium text-sm mb-6">
                  <FaAward className="mr-2 text-yellow-500" />
                  Trusted Healthcare Since 1999
                </div>
                
                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Premium Healthcare
                  <span className="block text-blue-600 mt-2">For Ghana's Communities</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                  Serving hospitals, retailers, and families with quality medicines, 
                  expert advice, and reliable healthcare solutions across Ghana.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
                  <Link 
                    to="/healthcare-products" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl"
                  >
                    <span>Browse Products</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                  
                  <Link 
                    to="/contact" 
                    className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaPhoneAlt />
                    <span>Contact Us</span>
                  </Link>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">3</div>
                    <div className="text-sm text-gray-600">Locations</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">25+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:w-1/2"
              >
                <div className="relative">
                  <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={moderninterior}
                      alt="Modern Pharmacy Interior"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Floating WhatsApp Card */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-xl shadow-xl max-w-[200px] sm:max-w-xs"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-green-500 text-white p-2 rounded-lg mr-3">
                        <FaWhatsapp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm sm:text-base">Quick Order</div>
                        <div className="text-xs sm:text-sm text-gray-600">Via WhatsApp</div>
                      </div>
                    </div>
                    <a 
                      href="https://wa.me/233209468565"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold text-sm transition-colors"
                    >
                      Order Now
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { value: stats.years, label: 'Years of Trust', icon: <FaAward className="w-5 h-5" /> },
              { value: stats.customers.toLocaleString(), label: 'Happy Customers', icon: <FaUsers className="w-5 h-5" /> },
              { value: stats.products, label: 'Products', icon: <FaPrescriptionBottle className="w-5 h-5" /> },
              { value: stats.locations, label: 'Locations', icon: <FaMapMarkerAlt className="w-5 h-5" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-center text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}+</div>
                <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Healthcare Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Comprehensive pharmaceutical solutions for all your healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link to={service.link}>
                  <div className={`${service.color} border rounded-xl p-5 sm:p-6 h-full hover:shadow-lg transition-all duration-300`}>
                    <div className={`${service.iconColor} text-2xl mb-4`}>
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <div className="text-blue-600 font-medium text-sm flex items-center gap-2">
                      Learn more
                      <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Product Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Explore our wide range of healthcare products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={category.link}>
                  <div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img 
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="font-bold text-gray-900">{category.count}</span>
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-blue-600 text-xl">
                          {category.icon}
                        </div>
                        <h3 className="font-bold text-gray-900">{category.title}</h3>
                      </div>
                      <div className="text-blue-600 font-medium text-sm flex items-center gap-2">
                        Shop now
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium text-sm mb-4">
              <FaAward className="mr-2" />
              Our Founders
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Meet Our Visionary Founders
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              The dedicated individuals who built Ghana's trusted healthcare provider
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Founder Image */}
                    <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
                      <img 
                        src={founder.image || placeholderFounder}
                        alt={founder.name}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                        {founder.name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-3">
                        {founder.role}
                      </p>
                      <p className="text-gray-600 mb-4 text-sm sm:text-base">
                        {founder.description}
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-green-600 text-sm">
                        <FaCheckCircle />
                        <span className="font-medium">{founder.achievement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Company Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">1999</div>
                  <div className="font-bold text-gray-900">Year Founded</div>
                  <div className="text-gray-600 text-sm mt-1">Abura, Cape Coast</div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Journey</h3>
                <p className="text-gray-600 mb-4">
                  What started as a single pharmacy in Abura, Cape Coast has grown into a trusted healthcare network 
                  serving communities across Ghana. Our founders' commitment to quality and community care remains 
                  at the heart of everything we do.
                </p>
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                >
                  Read our full story
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              What our partners and customers say about us
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 }
            }}
            className="!pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-xl mr-4">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-blue-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <FaQuoteRight className="text-blue-100 text-xl mb-3" />
                  <p className="text-gray-600 text-sm mb-4">"{testimonial.content}"</p>
                  
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
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Better Healthcare?
            </h2>
            <p className="text-blue-100 mb-8 sm:mb-12 text-sm sm:text-base">
              Visit one of our three locations or contact us for expert pharmaceutical advice
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link 
                to="/store-locator" 
                className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FaMapMarkerAlt />
                <span>Find a Pharmacy</span>
              </Link>
              
              <a 
                href="https://wa.me/233209468565"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FaWhatsapp />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <FaClock />
                <span>Mon-Sat: 8AM - 10PM</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt />
                <span>+233 209 468 565</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>3 Locations in Ghana</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/233209468565"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center"
      >
        <FaWhatsapp className="text-xl" />
        <span className="ml-2 font-semibold hidden sm:block">Need Help?</span>
      </a>
    </div>
  );
}