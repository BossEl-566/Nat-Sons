import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaClock, 
  FaCar, 
  FaWalking,
  FaSearch,
  FaDirections,
  FaWhatsapp,
  FaEnvelope,
  FaWifi,
  FaWheelchair,
  FaParking,
  FaCoffee,
  FaShoppingBag,
  FaStar,
  FaChevronRight,
  FaTimes,
  FaMap,
  FaList,
  FaExpand,
  FaCompress,
  FaHeart,
  FaCrosshairs,
  FaFirstAid,
  FaUsers,
  FaAward
} from 'react-icons/fa';

// Mock Interactive Map Component
const InteractiveMap = ({ selectedBranch, onBranchSelect }) => {
  // Updated coordinates for Central Region, Ghana locations
  const branches = [
    { id: 1, lat: 5.1037, lng: -1.2870, name: 'Abura', color: 'from-blue-600 to-cyan-500' }, // Abura coordinates
    { id: 2, lat: 5.0850, lng: -1.3517, name: 'Elmina', color: 'from-purple-500 to-pink-500' }, // Elmina coordinates
    { id: 3, lat: 5.6667, lng: -1.0167, name: 'Twifo Praso', color: 'from-green-500 to-emerald-500' } // Twifo Praso coordinates
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl overflow-hidden border border-gray-200">
      {/* Map Background - Simulated */}
      <div className="absolute inset-0">
        {/* Water/Blue background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100">
          {/* Simulated roads */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute top-1/3 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          
          {/* Land areas */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full"></div>
        </div>
        
        {/* Branch markers */}
        {branches.map((branch) => (
          <motion.button
            key={branch.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: branch.id * 0.1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => onBranchSelect(branch.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
              selectedBranch === branch.id 
                ? 'z-10' 
                : 'z-0'
            }`}
            style={{
              left: `${30 + (branch.id * 20)}%`,
              top: `${40 + (branch.id * 10)}%`
            }}
          >
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl ${
                selectedBranch === branch.id
                  ? `bg-gradient-to-r ${branch.color} text-white ring-4 ring-white/50`
                  : 'bg-white text-gray-700 shadow-lg'
              }`}>
                <FaMapMarkerAlt className="text-xl" />
              </div>
              {selectedBranch === branch.id && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap"
                >
                  <div className="font-bold text-gray-800">{branch.name}</div>
                  <div className="text-xs text-gray-600 mt-1">Click for details</div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Map Legend */}
      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="text-sm font-bold text-gray-800 mb-3">Our Locations</div>
        <div className="space-y-3">
          {branches.map((branch) => (
            <div key={branch.id} className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${selectedBranch === branch.id ? `bg-gradient-to-r ${branch.color}` : 'bg-gray-400'}`}></div>
              <span className={`text-sm ${selectedBranch === branch.id ? 'font-bold text-gray-800' : 'text-gray-600'}`}>
                {branch.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button className="bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <FaExpand className="text-gray-600" />
        </button>
        <button className="bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <FaCrosshairs className="text-gray-600" />
        </button>
      </div>

      {/* Central Region Label */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
        <div className="text-sm font-medium text-gray-700">Central Region, Ghana</div>
      </div>
    </div>
  );
};

export default function StoreLocator() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('split'); // split, map, list
  const [expandedMap, setExpandedMap] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const mapRef = useRef(null);

  // Branch data - Updated for Nat & Sons Pharmacy locations in Central Region
  const branchData = [
    {
      id: 1,
      name: "Nat & Sons Pharmacy - Abura",
      type: "flagship",
      address: "Main Street, Abura, Cape Coast, Central Region, Ghana",
      phone: "+233 50 345 8772",
      whatsapp: "233209468565",
      email: "natandsons@yahoo.com",
      hours: {
        monday: "8:00 AM - 10:00 PM",
        tuesday: "8:00 AM - 10:00 PM",
        wednesday: "8:00 AM - 10:00 PM",
        thursday: "8:00 AM - 10:00 PM",
        friday: "8:00 AM - 10:00 PM",
        saturday: "8:00 AM - 10:00 PM",
        sunday: "2:00 PM - 9:00 PM"
      },
      coordinates: { lat: 5.1037, lng: -1.2870 },
      features: [
        { icon: <FaParking />, name: "Free Parking", description: "Ample parking space available" },
        { icon: <FaWheelchair />, name: "Wheelchair Access", description: "Full accessibility" },
        { icon: <FaCoffee />, name: "Waiting Area", description: "Comfortable seating" },
        { icon: <FaShoppingBag />, name: "Drive-Thru", description: "Quick prescription pickup" },
        { icon: <FaFirstAid />, name: "Emergency Service", description: "24/7 emergency pharmacy" }
      ],
      services: ["24/7 Pharmacy", "Clinical Services", "Vaccination Center", "Compound Lab", "Home Delivery"],
      rating: 4.8,
      reviewCount: 342,
      distance: "1.2 km",
      travelTime: {
        car: "5 min",
        walk: "15 min",
        transit: "8 min"
      },
      description: "Our flagship location, established in 1999 as the first pharmacy in Abura, Cape Coast. Offering comprehensive healthcare services with 24/7 emergency support.",
      established: "1999",
      manager: "Mr. Nana Abekah Twentoh"
    },
    {
      id: 2,
      name: "Nat & Sons Pharmacy - Elmina",
      type: "premium",
      address: "Coastal Road, Elmina, Central Region, Ghana",
      phone: "+233 50 345 8772",
      whatsapp: "233209468565",
      email: "natandsons@yahoo.com",
      hours: {
        monday: "8:00 AM - 10:00 PM",
        tuesday: "8:00 AM - 10:00 PM",
        wednesday: "8:00 AM - 10:00 PM",
        thursday: "8:00 AM - 10:00 PM",
        friday: "8:00 AM - 10:00 PM",
        saturday: "8:00 AM - 10:00 PM",
        sunday: "2:00 PM - 9:00 PM"
      },
      coordinates: { lat: 5.0850, lng: -1.3517 },
      features: [
        { icon: <FaParking />, name: "Free Parking", description: "Secure parking area" },
        { icon: <FaWheelchair />, name: "Accessibility", description: "Disabled-friendly" },
        { icon: <FaCoffee />, name: "Patient Lounge", description: "Spacious waiting area" },
        { icon: <FaShoppingBag />, name: "Express Pickup", description: "5-minute guarantee" },
        { icon: <FaUsers />, name: "Pediatric Care", description: "Specialized children's section" }
      ],
      services: ["Pediatric Pharmacy", "Diabetes Clinic", "Home Delivery", "Senior Care", "Teleconsultation"],
      rating: 4.9,
      reviewCount: 289,
      distance: "4.5 km",
      travelTime: {
        car: "12 min",
        walk: "45 min",
        transit: "20 min"
      },
      description: "Serving the coastal community with premium healthcare services and personalized care. Special focus on pediatric and diabetes management.",
      established: "2015",
      manager: "Mrs. Joyce Baaba Twentoh"
    },
    {
      id: 3,
      name: "Nat & Sons Pharmacy - Twifo Praso",
      type: "community",
      address: "Market Square, Twifo Praso, Central Region, Ghana",
      phone: "+233 50 345 8772",
      whatsapp: "233209468565",
      email: "natandsons@yahoo.com",
      hours: {
        monday: "8:00 AM - 10:00 PM",
        tuesday: "8:00 AM - 10:00 PM",
        wednesday: "8:00 AM - 10:00 PM",
        thursday: "8:00 AM - 10:00 PM",
        friday: "8:00 AM - 10:00 PM",
        saturday: "8:00 AM - 10:00 PM",
        sunday: "2:00 PM - 9:00 PM"
      },
      coordinates: { lat: 5.6667, lng: -1.0167 },
      features: [
        { icon: <FaParking />, name: "Free Parking", description: "Large parking lot" },
        { icon: <FaWheelchair />, name: "Accessible", description: "Ramp access available" },
        { icon: <FaCoffee />, name: "Community Space", description: "Health education area" },
        { icon: <FaAward />, name: "Wellness Programs", description: "Community health initiatives" }
      ],
      services: ["Family Pharmacy", "Immunizations", "Health Screenings", "Wellness Programs", "Local Delivery"],
      rating: 4.7,
      reviewCount: 156,
      distance: "18.2 km",
      travelTime: {
        car: "25 min",
        walk: "Not walkable",
        transit: "35 min"
      },
      description: "Community-focused pharmacy providing essential healthcare services to Twifo Praso and surrounding areas. Active in community health education.",
      established: "2023",
      manager: "Pharm. Misheal Twentoh"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setBranches(branchData);
      setLoading(false);
    }, 1000);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied or error:", error);
        }
      );
    }
  }, []);

  const selectedBranchData = branches.find(b => b.id === selectedBranch);

  const handleGetDirections = () => {
    if (selectedBranchData) {
      const address = encodeURIComponent(selectedBranchData.address);
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
      window.open(mapsUrl, '_blank');
    }
  };

  const handleCallBranch = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (whatsapp) => {
    const message = encodeURIComponent(`Hello Nat & Sons Pharmacy, I have a question about your ${selectedBranchData.name}.`);
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
  };

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Modern Hero Section - Split Design */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full filter blur-3xl opacity-10"></div>
          
          {/* Floating location markers */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <FaMapMarkerAlt className="text-white/10 text-2xl" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh] py-8">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white"
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <FaHeart className="text-pink-400 mr-2" />
                <span className="font-medium">Healthcare Access Made Easy</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Your Nearest
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-100 bg-clip-text text-transparent">
                  Nat & Sons Pharmacy
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 max-w-xl">
                Three convenient locations across Central Region, Ghana. Quality healthcare is closer than you think.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold mb-1">3</div>
                  <div className="text-blue-200">Locations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">25+</div>
                  <div className="text-blue-200">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-blue-200">Emergency Service</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">50k+</div>
                  <div className="text-blue-200">Customers Served</div>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSearch(true)}
                  className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold flex items-center gap-3 hover:shadow-2xl transition-all shadow-lg"
                >
                  <FaSearch />
                  <span>Find Pharmacy</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetDirections}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-white/10 transition-all"
                >
                  <FaDirections />
                  <span>Get Directions</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Side - Location Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {branchData.slice(0, 2).map((branch) => (
                <motion.div
                  key={branch.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedBranch(branch.id)}
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all border border-white/20 ${
                    selectedBranch === branch.id ? 'ring-2 ring-cyan-400 bg-white/15' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        branch.type === 'flagship' 
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-400' 
                          : branch.type === 'premium'
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                          : 'bg-gradient-to-r from-green-400 to-emerald-400'
                      }`}>
                        <FaMapMarkerAlt className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{branch.name.split(' - ')[1]}</h3>
                        <div className="flex items-center text-blue-200 text-sm">
                          <FaClock className="mr-1" />
                          Open until {branch.hours.friday.split(' - ')[1]}
                        </div>
                      </div>
                    </div>
                    <FaChevronRight className="text-white/60" />
                  </div>
                  <div className="flex items-center text-blue-200 mb-2">
                    <FaPhoneAlt className="mr-2" />
                    <span className="text-sm">{branch.phone}</span>
                  </div>
                  <p className="text-blue-200/80 text-sm line-clamp-2">{branch.address}</p>
                  <div className="flex items-center mt-3">
                    <FaStar className="text-yellow-300 mr-1" />
                    <span className="text-blue-200 text-sm">{branch.rating} ({branch.reviewCount} reviews)</span>
                  </div>
                </motion.div>
              ))}
              
              {/* View All Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setViewMode('list')}
                className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 cursor-pointer border border-white/20 text-center"
              >
                <div className="text-white font-bold mb-1">View All Locations</div>
                <div className="text-blue-200 text-sm">Explore all 3 branches in Central Region</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="text-white/60 text-sm font-medium">Explore Locations</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mx-auto mt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Floating Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Find a Pharmacy</h3>
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search by location, branch name, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-500"
                />
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {branches.map((branch) => (
                  <div
                    key={branch.id}
                    onClick={() => {
                      setSelectedBranch(branch.id);
                      setShowSearch(false);
                      setViewMode('split');
                    }}
                    className="p-4 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border border-gray-100"
                  >
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        branch.type === 'flagship' 
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-400' 
                          : branch.type === 'premium'
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                          : 'bg-gradient-to-r from-green-400 to-emerald-400'
                      }`}>
                        <FaMapMarkerAlt className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{branch.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{branch.address}</div>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <FaClock className="mr-1" />
                          Open until {branch.hours.friday.split(' - ')[1]}
                        </div>
                      </div>
                      <FaChevronRight className="text-gray-400 ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Mode Toggle */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              {filteredBranches.length} location{filteredBranches.length !== 1 ? 's' : ''} found
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Buttons */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('split')}
                  className={`p-3 rounded-lg flex items-center ${viewMode === 'split' ? 'bg-white shadow' : ''}`}
                >
                  <div className="flex items-center">
                    <div className="grid grid-cols-2 gap-1 w-5 h-5 mr-2">
                      <div className={`rounded ${viewMode === 'split' ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
                      <div className={`rounded ${viewMode === 'split' ? 'bg-cyan-500' : 'bg-gray-400'}`}></div>
                      <div className={`rounded ${viewMode === 'split' ? 'bg-cyan-500' : 'bg-gray-400'}`}></div>
                      <div className={`rounded ${viewMode === 'split' ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
                    </div>
                    <span className="text-sm font-medium">Split View</span>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-3 rounded-lg flex items-center ${viewMode === 'map' ? 'bg-white shadow' : ''}`}
                >
                  <div className="flex items-center">
                    <FaMap className={`mr-2 ${viewMode === 'map' ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span className="text-sm font-medium">Map Only</span>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg flex items-center ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <div className="flex items-center">
                    <FaList className={`mr-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span className="text-sm font-medium">List Only</span>
                  </div>
                </button>
              </div>

              {viewMode === 'map' && (
                <button
                  onClick={() => setExpandedMap(!expandedMap)}
                  className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md"
                >
                  {expandedMap ? <FaCompress className="mr-2" /> : <FaExpand className="mr-2" />}
                  {expandedMap ? 'Collapse Map' : 'Expand Map'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
        expandedMap ? 'max-w-full px-0' : ''
      }`}>
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-gray-600">Loading pharmacy locations...</div>
          </div>
        ) : (
          <div className={`gap-8 ${
            viewMode === 'split' ? 'grid lg:grid-cols-2' : ''
          }`}>
            {/* Map Section */}
            {(viewMode === 'split' || viewMode === 'map') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${
                  viewMode === 'split' ? 'h-[600px]' : 
                  expandedMap ? 'h-[80vh]' : 'h-[500px]'
                } ${viewMode === 'map' && !expandedMap ? 'mb-8' : ''}`}
              >
                <InteractiveMap
                  selectedBranch={selectedBranch}
                  onBranchSelect={setSelectedBranch}
                />
              </motion.div>
            )}

            {/* Branches List/Details */}
            {(viewMode === 'split' || viewMode === 'list') && (
              <div className={`${
                viewMode === 'split' ? '' : 
                viewMode === 'list' ? 'max-w-4xl mx-auto' : ''
              }`}>
                {/* Branch List */}
                <div className={`${
                  viewMode === 'split' ? 'h-[600px] overflow-y-auto pr-4 space-y-4' : 'space-y-4'
                }`} id="branch-list">
                  {filteredBranches.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                      <div className="text-6xl mb-4">📍</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">No locations found</h3>
                      <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity shadow-md"
                      >
                        Show All Locations
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Branch Cards */}
                      {filteredBranches.map((branch) => (
                        <motion.div
                          key={branch.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedBranch(branch.id)}
                          className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all ${
                            selectedBranch === branch.id 
                              ? 'ring-2 ring-blue-500 shadow-xl' 
                              : 'hover:shadow-xl'
                          }`}
                        >
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <div className="flex items-center mb-2">
                                  <h3 className="text-xl font-bold text-gray-800">{branch.name}</h3>
                                  {branch.type === 'flagship' && (
                                    <span className="ml-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                      Flagship
                                    </span>
                                  )}
                                  {branch.type === 'premium' && (
                                    <span className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                      Premium
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex items-center text-gray-600 mb-1">
                                  <FaMapMarkerAlt className="mr-2" />
                                  <span className="text-sm">{branch.address}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                  <FaClock className="mr-2" />
                                  <span className="text-sm">Open until {branch.hours.friday.split(' - ')[1]}</span>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="flex items-center justify-end mb-2">
                                  <FaStar className="text-yellow-400 mr-1" />
                                  <span className="font-bold">{branch.rating}</span>
                                  <span className="text-gray-500 text-sm ml-1">({branch.reviewCount})</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                  {branch.distance} away
                                </div>
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleGetDirections();
                                }}
                                className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors"
                              >
                                <FaDirections className="mr-2" />
                                Directions
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCallBranch(branch.phone);
                                }}
                                className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors"
                              >
                                <FaPhoneAlt className="mr-2" />
                                Call
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Selected Branch Details */}
                      {selectedBranchData && viewMode === 'split' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8"
                          id="branch-details"
                        >
                          <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                  {selectedBranchData.name}
                                </h2>
                                <div className="flex items-center text-gray-600 mb-4">
                                  <FaMapMarkerAlt className="mr-2" />
                                  <span>{selectedBranchData.address}</span>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full mb-2">
                                  <FaStar className="mr-2" />
                                  <span className="font-bold">{selectedBranchData.rating}</span>
                                  <span className="text-sm ml-1">({selectedBranchData.reviewCount} reviews)</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                  Established: {selectedBranchData.established}
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-8">{selectedBranchData.description}</p>

                            {/* Contact & Hours */}
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                              {/* Contact Info */}
                              <div>
                                <h3 className="font-bold text-gray-800 mb-4 text-lg">Contact Information</h3>
                                <div className="space-y-4">
                                  <button
                                    onClick={() => handleCallBranch(selectedBranchData.phone)}
                                    className="flex items-center text-gray-700 hover:text-blue-600 w-full text-left group"
                                  >
                                    <div className="bg-blue-100 p-3 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                                      <FaPhoneAlt className="text-blue-500" />
                                    </div>
                                    <div>
                                      <div className="font-medium">{selectedBranchData.phone}</div>
                                      <div className="text-sm text-gray-500">Tap to call</div>
                                    </div>
                                  </button>
                                  
                                  <button
                                    onClick={() => handleWhatsApp(selectedBranchData.whatsapp)}
                                    className="flex items-center text-gray-700 hover:text-green-600 w-full text-left group"
                                  >
                                    <div className="bg-green-100 p-3 rounded-lg mr-3 group-hover:bg-green-200 transition-colors">
                                      <FaWhatsapp className="text-green-500" />
                                    </div>
                                    <div>
                                      <div className="font-medium">WhatsApp</div>
                                      <div className="text-sm text-gray-500">Tap to chat</div>
                                    </div>
                                  </button>
                                  
                                  <a
                                    href={`mailto:${selectedBranchData.email}`}
                                    className="flex items-center text-gray-700 hover:text-purple-600 group"
                                  >
                                    <div className="bg-purple-100 p-3 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors">
                                      <FaEnvelope className="text-purple-500" />
                                    </div>
                                    <div>
                                      <div className="font-medium">{selectedBranchData.email}</div>
                                      <div className="text-sm text-gray-500">Send email</div>
                                    </div>
                                  </a>
                                </div>
                              </div>

                              {/* Operating Hours */}
                              <div>
                                <h3 className="font-bold text-gray-800 mb-4 text-lg">Opening Hours</h3>
                                <div className="space-y-3">
                                  {Object.entries(selectedBranchData.hours).map(([day, hours]) => (
                                    <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                      <span className="font-medium capitalize">{day}:</span>
                                      <span className="text-gray-600">{hours}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Travel Time */}
                            {userLocation && (
                              <div className="mb-8">
                                <h3 className="font-bold text-gray-800 mb-4 text-lg">Travel Time From Your Location</h3>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="bg-blue-50 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors">
                                    <FaCar className="text-blue-500 text-2xl mx-auto mb-2" />
                                    <div className="font-bold text-gray-800">{selectedBranchData.travelTime.car}</div>
                                    <div className="text-sm text-gray-600">By Car</div>
                                  </div>
                                  <div className="bg-green-50 rounded-xl p-4 text-center hover:bg-green-100 transition-colors">
                                    <FaWalking className="text-green-500 text-2xl mx-auto mb-2" />
                                    <div className="font-bold text-gray-800">{selectedBranchData.travelTime.walk}</div>
                                    <div className="text-sm text-gray-600">Walking</div>
                                  </div>
                                  <div className="bg-purple-50 rounded-xl p-4 text-center hover:bg-purple-100 transition-colors">
                                    <FaDirections className="text-purple-500 text-2xl mx-auto mb-2" />
                                    <div className="font-bold text-gray-800">{selectedBranchData.travelTime.transit}</div>
                                    <div className="text-sm text-gray-600">Public Transit</div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Features */}
                            <div className="mb-8">
                              <h3 className="font-bold text-gray-800 mb-4 text-lg">Branch Features</h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {selectedBranchData.features.map((feature, index) => (
                                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                                    <div className="text-blue-500 text-2xl mb-2 flex justify-center">
                                      {feature.icon}
                                    </div>
                                    <div className="font-medium text-gray-800 mb-1">{feature.name}</div>
                                    <div className="text-xs text-gray-600">{feature.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Services */}
                            <div className="mb-8">
                              <h3 className="font-bold text-gray-800 mb-4 text-lg">Available Services</h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedBranchData.services.map((service, index) => (
                                  <span
                                    key={index}
                                    className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 px-4 py-2 rounded-full font-medium border border-blue-100"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Branch Manager */}
                            <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                              <h3 className="font-bold text-gray-800 mb-2">Branch Manager</h3>
                              <p className="text-gray-600">{selectedBranchData.manager}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid md:grid-cols-3 gap-4">
                              <button
                                onClick={handleGetDirections}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                              >
                                <FaDirections className="mr-2" />
                                Get Directions
                              </button>
                              
                              <button
                                onClick={() => handleCallBranch(selectedBranchData.phone)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                              >
                                <FaPhoneAlt className="mr-2" />
                                Call Now
                              </button>
                              
                              <button
                                onClick={() => handleWhatsApp(selectedBranchData.whatsapp)}
                                className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                              >
                                <FaWhatsapp className="mr-2" />
                                WhatsApp
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* All Branches Summary */}
      {!expandedMap && (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Central Region Locations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Three branches serving different communities with the same commitment to quality healthcare
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {branches.map((branch) => (
                <div key={branch.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{branch.name.split(' - ')[1]}</h3>
                      {branch.type === 'flagship' && (
                        <span className="bg-gradient-to-r from-yellow-400 to-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Flagship
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-3 text-blue-500" />
                        <span className="text-sm">{branch.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaPhoneAlt className="mr-3 text-green-500" />
                        <span className="text-sm">{branch.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaClock className="mr-3 text-purple-500" />
                        <span className="text-sm">Today: {branch.hours.friday}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">{branch.description}</p>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedBranch(branch.id);
                          setViewMode('split');
                          document.getElementById('branch-list')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 py-2 rounded-lg font-medium text-sm transition-opacity"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          const address = encodeURIComponent(branch.address);
                          window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
                        }}
                        className="flex-1 bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 rounded-lg font-medium text-sm transition-colors"
                      >
                        Directions
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Emergency Notice */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-t border-red-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
            <div className="text-red-600 font-bold mr-3 mb-2 md:mb-0 flex items-center">
              <FaFirstAid className="mr-2" /> Emergency Services Available:
            </div>
            <span className="text-red-800">
              All branches offer 24/7 emergency pharmacy services. Call: <strong>+233 50 345 8772</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSearch(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center"
        >
          <FaSearch className="text-xl" />
          <span className="ml-3 font-bold hidden sm:block">Find Pharmacy</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleGetDirections}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center"
        >
          <FaDirections className="text-xl" />
          <span className="ml-3 font-bold hidden sm:block">Get Directions</span>
        </motion.button>
      </div>
    </div>
  );
}