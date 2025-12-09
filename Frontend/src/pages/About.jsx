import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaChevronRight,
  FaStar,
  FaUsers,
  FaAward,
  FaShieldAlt,
  FaHeartbeat,
  FaPrescriptionBottle,
  FaTruck,
  FaStethoscope,
  FaClipboardCheck,
  FaMicroscope,
  FaUserMd,
  FaClock,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

export default function About() {
  const [activeBranch, setActiveBranch] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Image URLs from Unsplash (professional pharmacy/healthcare images)
  const images = {
    hero: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    pharmacyInterior: "https://images.unsplash.com/photo-1580281658669-fdb06cc74d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80",
    teamConsultation: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
    medicineStorage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    labTesting: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80",
    deliveryService: "https://images.unsplash.com/photo-1601126374163-26b3a6a93f7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    modernPharmacy: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    healthcareTeam: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80"
  };

  const branches = [
    {
      id: 0,
      name: "Downtown Medical Center",
      address: "123 Healthcare Avenue, Medical District, City 10001",
      hours: "Mon-Fri: 8AM-10PM | Sat-Sun: 9AM-8PM",
      phone: "(555) 123-4567",
      features: ["24/7 Pharmacy", "Drive-Thru", "Clinical Services", "Compound Lab"],
      image: images.pharmacyInterior
    },
    {
      id: 1,
      name: "Northside Health Plaza",
      address: "456 Wellness Boulevard, Northside, City 10002",
      hours: "Mon-Fri: 7AM-9PM | Sat: 9AM-6PM | Sun: 10AM-5PM",
      phone: "(555) 234-5678",
      features: ["Pediatric Care", "Vaccination Center", "Diabetes Clinic", "Home Delivery"],
      image: images.modernPharmacy
    },
    {
      id: 2,
      name: "Westgate Community Pharmacy",
      address: "789 Care Street, Westgate, City 10003",
      hours: "Mon-Fri: 8AM-9PM | Sat: 9AM-5PM | Sun: Closed",
      phone: "(555) 345-6789",
      features: ["Senior Care", "Medication Therapy", "Health Screenings", "Wellness Programs"],
      image: images.teamConsultation
    }
  ];

  const milestones = [
    { year: 1995, title: "Founded Downtown", description: "Opened our first location" },
    { year: 2005, title: "Expanded Services", description: "Added clinical pharmacy services" },
    { year: 2015, title: "Second Branch", description: "Opened Northside location" },
    { year: 2020, title: "Digital Transformation", description: "Launched telepharmacy services" },
    { year: 2023, title: "Third Branch", description: "Opened Westgate location" }
  ];

  const services = [
    {
      icon: <FaPrescriptionBottle className="w-12 h-12" />,
      title: "Prescription Management",
      description: "Comprehensive medication management with automatic refills and synchronization",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <FaStethoscope className="w-12 h-12" />,
      title: "Clinical Services",
      description: "Vaccinations, health screenings, and chronic disease management programs",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: <FaTruck className="w-12 h-12" />,
      title: "Home Delivery",
      description: "Free prescription delivery within 24 hours for all locations",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: <FaMicroscope className="w-12 h-12" />,
      title: "Compounding Pharmacy",
      description: "Custom medication formulations for unique patient needs",
      color: "from-orange-500 to-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
          }}
        >
          <img 
            src={images.hero} 
            alt="Modern Pharmacy Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-8 bg-white/20 rounded-lg"
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

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <FaStar className="text-yellow-400 mr-2" />
                <span className="text-white font-medium">Trusted Since 1995</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Healthcare
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-100 bg-clip-text text-transparent">
                  Redefined
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-2xl font-light">
                Three locations. One mission: exceptional care for every patient, every time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/locations" 
                    className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                  >
                    <span>Find Your Nearest Branch</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FaChevronRight />
                    </motion.div>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/services" 
                    className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-white/10 transition-all duration-300"
                  >
                    <span>Explore Our Services</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
              style={{ scaleX: scrollProgress }}
            />
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            >
              Our Journey of
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text">
                Growth & Care
              </span>
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From a single pharmacy to three locations serving thousands, our commitment remains unchanged.
            </p>
          </div>

          <div className="relative" ref={timelineRef}>
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-cyan-400" />
            
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Year badge */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full">
                      <div className="text-2xl font-bold">{milestone.year}</div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full z-10" />

                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12 text-right'}`}>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branches Showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Three Locations,
              <span className="block text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text">
                One Standard of Excellence
              </span>
            </h2>
          </div>

          {/* Branch Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full bg-blue-50 p-2">
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranch(branch.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeBranch === branch.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {branch.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Branch Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBranch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative">
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={branches[activeBranch].image} 
                    alt={branches[activeBranch].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Floating info card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-2xl max-w-sm"
                >
                  <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-blue-500 mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Get Directions</div>
                      <div className="text-sm text-gray-600">Free parking available</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-green-500 mr-3" />
                    <div>
                      <div className="font-bold text-gray-800">Extended Hours</div>
                      <div className="text-sm text-gray-600">{branches[activeBranch].hours}</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div>
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 px-4 py-2 rounded-full mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span className="font-medium">Location {activeBranch + 1} of 3</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  {branches[activeBranch].name}
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">{branches[activeBranch].address}</p>
                  </div>
                  <div className="flex items-start">
                    <FaPhoneAlt className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600 font-medium">{branches[activeBranch].phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {branches[activeBranch].features.map((feature, index) => (
                    <div key={index} className="flex items-center bg-blue-50 rounded-lg p-3">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to={`/locations/${activeBranch}`}
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-xl transition-all duration-300"
                  >
                    <span>View Location Details</span>
                    <FaArrowRight className="ml-3" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Comprehensive
              <span className="block text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
                Healthcare Services
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Available at all three locations, our full suite of services ensures complete care for every patient need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <div className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>Available at all locations</span>
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Expert Care by
                <span className="block text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text">
                  Dedicated Professionals
                </span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8">
                Our team of 50+ certified pharmacists and healthcare professionals across three locations are committed to your wellbeing. Each member undergoes continuous training to provide the highest standard of care.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-700 font-medium">Healthcare Experts</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                  <div className="text-gray-700 font-medium">Years Combined Experience</div>
                </div>
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/team"
                  className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-xl transition-all duration-300"
                >
                  <span>Meet Our Full Team</span>
                  <FaArrowRight className="ml-3" />
                </Link>
              </motion.div>
            </div>

            <div className="relative">
              <img 
                src={images.healthcareTeam} 
                alt="Healthcare Team" 
                className="rounded-3xl shadow-2xl"
              />
              
              {/* Floating certification badge */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center">
                  <FaAward className="text-yellow-500 text-3xl mr-3" />
                  <div>
                    <div className="font-bold text-gray-800">Certified Excellence</div>
                    <div className="text-sm text-gray-600">Nationwide Recognition</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: "25+", label: "Years of Trust", icon: <FaAward /> },
              { number: "50,000+", label: "Families Served", icon: <FaUsers /> },
              { number: "3", label: "Locations", icon: <FaMapMarkerAlt /> },
              { number: "98.7%", label: "Satisfaction Rate", icon: <FaHeartbeat /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="text-center"
              >
                <div className="text-4xl mb-4 text-cyan-300">{stat.icon}</div>
                <div className="text-5xl lg:text-6xl font-bold mb-3">{stat.number}</div>
                <div className="text-xl text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
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
                Experience Healthcare
                <span className="block">That Cares About You</span>
              </h2>
              
              <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
                Visit any of our three locations and discover why thousands trust us with their health.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact" 
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl"
                  >
                    <FaPhoneAlt />
                    <span>Schedule Consultation</span>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/locations" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <FaMapMarkerAlt />
                    <span>Find Nearest Branch</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}