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
  FaArrowRight,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaHeart,
  FaHandsHelping,
  FaBalanceScale,
  FaLightbulb,
  FaBullseye,
  FaEye
} from 'react-icons/fa';

// Import your video file - update this path with your actual video
import heroVideo from '../assets/pharmacy-hero-video.mp4';

export default function About() {
  const [activeBranch, setActiveBranch] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Image URLs from Unsplash
  const images = {
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
      name: "Abura",
      address: "Abura, Central Region, Ghana",
      hours: "Mon-Sat: 8AM-10PM | Sun: 2PM-9PM",
      phone: "+233 50 345 8772",
      features: ["24/7 Pharmacy", "Drive-Thru", "Clinical Services", "Compound Lab"],
      image: images.pharmacyInterior
    },
    {
      id: 1,
      name: "Elmina",
      address: "Elmina, Central Region, Ghana",
      hours: "Mon-Sat: 8AM-10PM | Sun: 2PM-9PM",
      phone: "+233 50 345 8772",
      features: ["Pediatric Care", "Vaccination Center", "Diabetes Clinic", "Home Delivery"],
      image: images.modernPharmacy
    },
    {
      id: 2,
      name: "Twifo Praso",
      address: "Twifo Praso, Central Region, Ghana",
      hours: "Mon-Sat: 8AM-10PM | Sun: 2PM-9PM",
      phone: "+233 50 345 8772",
      features: ["Senior Care", "Medication Therapy", "Health Screenings", "Wellness Programs"],
      image: images.teamConsultation
    }
  ];

  // Updated Milestones specific to Nat & Sons Pharmacy
  const milestones = [
    { year: 1999, title: "Humble Beginnings", description: "Founded by Mr. Nana Abekah Twentoh and Mrs. Joyce Baaba Twentoh as the first pharmacy in Abura, Cape Coast" },
    { year: 2005, title: "Expanding Reach", description: "Introduced comprehensive healthcare services beyond basic pharmacy" },
    { year: 2015, title: "Second Branch Launch", description: "Opened Elmina location to serve the growing coastal community" },
    { year: 2020, title: "Digital Innovation", description: "Launched telepharmacy and online consultation services" },
    { year: 2023, title: "Regional Growth", description: "Opened third location in Twifo Praso, expanding our Central Region presence" }
  ];

  // Mission, Vision & Values
  const missionVision = {
    mission: {
      title: "Our Mission",
      description: "To provide accessible, quality healthcare through personalized pharmaceutical services, innovative solutions, and compassionate care that improves the wellbeing of every community we serve.",
      icon: <FaBullseye className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    vision: {
      title: "Our Vision",
      description: "To be Ghana's most trusted healthcare partner, recognized for excellence in pharmaceutical care, community health initiatives, and pioneering healthcare solutions that transform lives.",
      icon: <FaEye className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    }
  };

  const coreValues = [
    {
      title: "Integrity",
      description: "Upholding the highest ethical standards in all our operations and patient interactions.",
      icon: <FaBalanceScale className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Compassion",
      description: "Treating every patient with empathy, respect, and genuine care for their wellbeing.",
      icon: <FaHeart className="w-8 h-8" />,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Excellence",
      description: "Striving for the highest quality in pharmaceutical services and patient care.",
      icon: <FaAward className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Innovation",
      description: "Embracing new technologies and approaches to enhance healthcare delivery.",
      icon: <FaLightbulb className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Community",
      description: "Actively contributing to and supporting the health needs of our local communities.",
      icon: <FaHandsHelping className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Professionalism",
      description: "Maintaining expert knowledge and delivering reliable, trustworthy services.",
      icon: <FaUserMd className="w-8 h-8" />,
      color: "from-teal-500 to-green-500"
    }
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
      {/* Hero Section with Video */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img 
              src="https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Pharmacy Background"
              className="w-full h-full object-cover"
            />
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <button
            onClick={togglePlay}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <FaStar className="text-yellow-400 mr-2" />
                <span className="text-white font-medium">Trusted Since 1999</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Nat & Sons
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-100 bg-clip-text text-transparent mt-2">
                  Pharmacy
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8 max-w-2xl font-light">
                Three locations across Central Region. One mission: exceptional healthcare for every community we serve.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/locations" 
                    className="group bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
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
                    className="group border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300"
                  >
                    <span>Explore Our Services</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="text-white/60 text-sm font-medium mb-2">Scroll to explore</div>
          <div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
              style={{ scaleX: scrollProgress }}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            >
              Our Purpose &
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text mt-2">
                Promise
              </span>
            </motion.h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Guided by our mission and vision, we are committed to transforming healthcare in Ghana
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-24">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br ${missionVision.mission.color} text-white mb-6`}>
                {missionVision.mission.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {missionVision.mission.title}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {missionVision.mission.description}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br ${missionVision.vision.color} text-white mb-6`}>
                {missionVision.vision.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {missionVision.vision.title}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {missionVision.vision.description}
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision and interaction at Nat & Sons Pharmacy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full">
                  <div className={`inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-br ${value.color} text-white mb-4`}>
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            >
              Our Journey of
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text mt-2">
                Excellence & Growth
              </span>
            </motion.h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              From a single pharmacy to three locations serving Central Region, our commitment to quality healthcare continues to grow
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Timeline line - Hidden on mobile, shown on md+ */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-cyan-400" />
            
            <div className="space-y-12 sm:space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Mobile layout (stacked) */}
                  <div className="md:hidden">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full shadow-lg">
                        <div className="text-2xl font-bold">{milestone.year}</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Desktop layout (timeline) */}
                  <div className="hidden md:flex items-center">
                    <div className="w-1/2 pr-12 text-right">
                      {index % 2 === 0 && (
                        <>
                          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full shadow-lg">
                            <div className="text-2xl font-bold">{milestone.year}</div>
                          </div>
                          <div className="mt-4 bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                            <p className="text-gray-600">{milestone.description}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full z-10 shadow-lg" />

                    <div className="w-1/2 pl-12">
                      {index % 2 === 1 && (
                        <>
                          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full shadow-lg">
                            <div className="text-2xl font-bold">{milestone.year}</div>
                          </div>
                          <div className="mt-4 bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                            <p className="text-gray-600">{milestone.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three Locations, One Standard of Excellence Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Three Locations,
              <span className="block text-transparent bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text mt-2">
                One Standard of Excellence
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Serving Central Region with the same commitment to quality across all our branches
            </p>
          </div>

          {/* Branch Navigation */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex rounded-full bg-blue-50 p-2 shadow-sm">
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranch(branch.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                    activeBranch === branch.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                  }`}
                >
                  {branch.name}
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
              className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center"
            >
              <div className="w-full lg:w-1/2">
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
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
                  className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl max-w-sm"
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

              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 px-4 py-2 rounded-full mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span className="font-medium">Location {activeBranch + 1} of 3</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  {branches[activeBranch].name} Branch
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
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Our Comprehensive
              <span className="block text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text mt-2">
                Healthcare Services
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Available at all three locations, our full suite of services ensures complete care for every patient need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">{service.description}</p>
                  
                  <div className="flex items-center text-blue-600 font-medium text-sm sm:text-base">
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Our Dedicated
                <span className="block text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text mt-2">
                  Healthcare Team
                </span>
              </h2>
              
              <p className="text-gray-600 text-base sm:text-lg mb-8">
                Led by our visionary founders and supported by certified pharmacists and healthcare professionals across three locations, our team is committed to your wellbeing. Each member undergoes continuous training to provide the highest standard of care.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-gray-700 font-medium">Years of Service</div>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-700 font-medium">Healthcare Experts</div>
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

            <div className="w-full lg:w-1/2 relative">
              <img 
                src={images.healthcareTeam} 
                alt="Healthcare Team" 
                className="rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl sm:shadow-2xl w-full"
              />
              
              {/* Floating certification badge */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl"
              >
                <div className="flex items-center">
                  <FaAward className="text-yellow-500 text-2xl sm:text-3xl mr-3" />
                  <div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base">Certified Excellence</div>
                    <div className="text-xs sm:text-sm text-gray-600">Nationwide Recognition</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-xl sm:rounded-2xl lg:rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Experience Healthcare That Cares
              </h2>
              
              <p className="text-blue-100 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                Visit any of our three locations in Central Region and discover why thousands trust Nat & Sons Pharmacy with their health.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact" 
                    className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl"
                  >
                    <FaPhoneAlt />
                    <span>Schedule Consultation</span>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/locations" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300"
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