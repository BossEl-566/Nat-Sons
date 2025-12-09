import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaClock, 
  FaCar, 
  FaWalking,
  FaSearch,
  FaFilter,
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
  FaExternalLinkAlt,
  FaMap,
  FaList,
  FaExpand,
  FaCompress
} from 'react-icons/fa';

// Mock map component - in production, use Google Maps or Mapbox
const InteractiveMap = ({ selectedBranch, onBranchSelect }) => {
  const branches = [
    { id: 1, lat: 5.6037, lng: -0.1870, name: 'Accra Central' }, // Accra coordinates
    { id: 2, lat: 5.6500, lng: -0.1083, name: 'East Legon' }, // East Legon coordinates
    { id: 3, lat: 5.6667, lng: -0.0167, name: 'Tema' } // Tema coordinates
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50">
          {/* Simulated roads */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400"></div>
          
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
                left: `${50 + (branch.lng * 10)}%`,
                top: `${50 - (branch.lat * 10)}%`
              }}
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                  selectedBranch === branch.id
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    : 'bg-white text-blue-600'
                }`}>
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                {selectedBranch === branch.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                    <div className="font-bold text-gray-800">{branch.name}</div>
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="text-sm font-bold text-gray-800 mb-2">Legend</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 mr-2"></div>
            <span className="text-xs text-gray-600">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
            <span className="text-xs text-gray-600">Our Branches</span>
          </div>
        </div>
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
  const [showDirections, setShowDirections] = useState(false);
  const mapRef = useRef(null);

  // Branch data
  const branchData = [
    {
      id: 1,
      name: "Accra Central Branch",
      type: "flagship",
      address: "123 Liberation Road, Accra Central, GA-100-1234",
      phone: "+233 55 123 4567",
      whatsapp: "+233551234567",
      email: "accra@natandsonspharmacy.com",
      hours: {
        monday: "8:00 AM - 8:00 PM",
        tuesday: "8:00 AM - 8:00 PM",
        wednesday: "8:00 AM - 8:00 PM",
        thursday: "8:00 AM - 8:00 PM",
        friday: "8:00 AM - 9:00 PM",
        saturday: "9:00 AM - 6:00 PM",
        sunday: "10:00 AM - 4:00 PM"
      },
      coordinates: { lat: 5.6037, lng: -0.1870 },
      features: [
        { icon: <FaParking />, name: "Free Parking", description: "Ample parking space available" },
        { icon: <FaWheelchair />, name: "Wheelchair Access", description: "Full accessibility" },
        { icon: <FaWifi />, name: "Free WiFi", description: "High-speed internet" },
        { icon: <FaCoffee />, name: "Waiting Area", description: "Comfortable seating" },
        { icon: <FaShoppingBag />, name: "Drive-Thru", description: "Quick prescription pickup" }
      ],
      services: ["24/7 Pharmacy", "Clinical Services", "Vaccination Center", "Lab Services", "Home Delivery"],
      rating: 4.8,
      reviewCount: 342,
      distance: "1.2 km",
      travelTime: {
        car: "5 min",
        walk: "15 min",
        transit: "8 min"
      }
    },
    {
      id: 2,
      name: "East Legon Branch",
      type: "premium",
      address: "45 Legon Street, East Legon, GA-200-5678",
      phone: "+233 30 987 6543",
      whatsapp: "+233309876543",
      email: "eastlegon@natandsonspharmacy.com",
      hours: {
        monday: "7:30 AM - 9:00 PM",
        tuesday: "7:30 AM - 9:00 PM",
        wednesday: "7:30 AM - 9:00 PM",
        thursday: "7:30 AM - 9:00 PM",
        friday: "7:30 AM - 9:00 PM",
        saturday: "8:00 AM - 7:00 PM",
        sunday: "10:00 AM - 5:00 PM"
      },
      coordinates: { lat: 5.6500, lng: -0.1083 },
      features: [
        { icon: <FaParking />, name: "Valet Parking", description: "Premium parking service" },
        { icon: <FaWheelchair />, name: "Accessibility", description: "Disabled-friendly" },
        { icon: <FaCoffee />, name: "Coffee Bar", description: "Complementary beverages" },
        { icon: <FaShoppingBag />, name: "Express Pickup", description: "5-minute guarantee" }
      ],
      services: ["Pediatric Pharmacy", "Diabetes Clinic", "Compounding", "Telepharmacy", "Senior Care"],
      rating: 4.9,
      reviewCount: 289,
      distance: "4.5 km",
      travelTime: {
        car: "12 min",
        walk: "45 min",
        transit: "20 min"
      }
    },
    {
      id: 3,
      name: "Tema Community Pharmacy",
      type: "community",
      address: "78 Community 1, Tema, GA-300-9012",
      phone: "+233 24 567 8901",
      whatsapp: "+233245678901",
      email: "tema@natandsonspharmacy.com",
      hours: {
        monday: "8:00 AM - 8:00 PM",
        tuesday: "8:00 AM - 8:00 PM",
        wednesday: "8:00 AM - 8:00 PM",
        thursday: "8:00 AM - 8:00 PM",
        friday: "8:00 AM - 8:00 PM",
        saturday: "9:00 AM - 6:00 PM",
        sunday: "11:00 AM - 3:00 PM"
      },
      coordinates: { lat: 5.6667, lng: -0.0167 },
      features: [
        { icon: <FaParking />, name: "Free Parking", description: "Large parking lot" },
        { icon: <FaWheelchair />, name: "Accessible", description: "Ramp access available" },
        { icon: <FaCoffee />, name: "Community Space", description: "Health education area" }
      ],
      services: ["Family Pharmacy", "Immunizations", "Health Screenings", "Wellness Programs", "Local Delivery"],
      rating: 4.7,
      reviewCount: 156,
      distance: "18.2 km",
      travelTime: {
        car: "25 min",
        walk: "Not walkable",
        transit: "35 min"
      }
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
    const message = encodeURIComponent(`Hi, I have a question about your ${selectedBranchData.name} branch.`);
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
  };

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
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
              Find Our Pharmacies
              <span className="block text-blue-200">Across Accra & Tema</span>
            </motion.h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Visit any of our three convenient locations for expert pharmaceutical care and personalized service.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location, branch name, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-white/40 text-lg"
                />
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-blue-200 text-xl" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* View Mode Toggle */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {filteredBranches.length} locations
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Buttons */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('split')}
                  className={`p-2 rounded flex items-center ${viewMode === 'split' ? 'bg-white shadow' : ''}`}
                >
                  <div className="flex items-center">
                    <div className="grid grid-cols-2 gap-1 w-5 h-5 mr-2">
                      <div className="bg-gray-400 rounded"></div>
                      <div className="bg-blue-400 rounded"></div>
                      <div className="bg-blue-400 rounded"></div>
                      <div className="bg-gray-400 rounded"></div>
                    </div>
                    <span className="text-sm">Split</span>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded flex items-center ${viewMode === 'map' ? 'bg-white shadow' : ''}`}
                >
                  <div className="flex items-center">
                    <FaMap className="mr-2 text-gray-600" />
                    <span className="text-sm">Map</span>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded flex items-center ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <div className="flex items-center">
                    <FaList className="mr-2 text-gray-600" />
                    <span className="text-sm">List</span>
                  </div>
                </button>
              </div>

              {viewMode === 'map' && (
                <button
                  onClick={() => setExpandedMap(!expandedMap)}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {expandedMap ? <FaCompress className="mr-2" /> : <FaExpand className="mr-2" />}
                  {expandedMap ? 'Collapse' : 'Expand'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`container mx-auto px-6 lg:px-12 py-8 ${
        expandedMap ? 'max-w-full px-0' : ''
      }`}>
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-gray-600">Loading store locations...</div>
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
                  expandedMap ? 'h-screen' : 'h-[500px]'
                } ${viewMode === 'map' && !expandedMap ? 'mb-8' : ''}`}
              >
                <InteractiveMap
                  selectedBranch={selectedBranch}
                  onBranchSelect={setSelectedBranch}
                  ref={mapRef}
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
                  viewMode === 'split' ? 'h-[600px] overflow-y-auto pr-4' : ''
                }`}>
                  {filteredBranches.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                      <div className="text-6xl mb-4">📍</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">No locations found</h3>
                      <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                      >
                        Clear Search
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Branch Cards */}
                      <div className="space-y-4 mb-8">
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
                                      <span className="ml-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Flagship
                                      </span>
                                    )}
                                    {branch.type === 'premium' && (
                                      <span className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
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
                                  className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg font-medium text-sm flex items-center justify-center"
                                >
                                  <FaDirections className="mr-2" />
                                  Directions
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCallBranch(branch.phone);
                                  }}
                                  className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 py-2 rounded-lg font-medium text-sm flex items-center justify-center"
                                >
                                  <FaPhoneAlt className="mr-2" />
                                  Call
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Selected Branch Details */}
                      {selectedBranchData && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-2xl shadow-xl overflow-hidden"
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
                                <div className="inline-flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-2">
                                  <FaStar className="mr-1" />
                                  <span className="font-bold">{selectedBranchData.rating}</span>
                                  <span className="text-sm ml-1">({selectedBranchData.reviewCount} reviews)</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                  Approximately {selectedBranchData.distance} from you
                                </div>
                              </div>
                            </div>

                            {/* Contact & Hours */}
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                              {/* Contact Info */}
                              <div>
                                <h3 className="font-bold text-gray-800 mb-4 text-lg">Contact Information</h3>
                                <div className="space-y-3">
                                  <button
                                    onClick={() => handleCallBranch(selectedBranchData.phone)}
                                    className="flex items-center text-gray-700 hover:text-blue-600 w-full text-left"
                                  >
                                    <FaPhoneAlt className="mr-3 text-green-500" />
                                    <div>
                                      <div className="font-medium">{selectedBranchData.phone}</div>
                                      <div className="text-sm text-gray-500">Tap to call</div>
                                    </div>
                                  </button>
                                  
                                  <button
                                    onClick={() => handleWhatsApp(selectedBranchData.whatsapp)}
                                    className="flex items-center text-gray-700 hover:text-green-600 w-full text-left"
                                  >
                                    <FaWhatsapp className="mr-3 text-green-500" />
                                    <div>
                                      <div className="font-medium">WhatsApp</div>
                                      <div className="text-sm text-gray-500">Tap to chat</div>
                                    </div>
                                  </button>
                                  
                                  <a
                                    href={`mailto:${selectedBranchData.email}`}
                                    className="flex items-center text-gray-700 hover:text-purple-600"
                                  >
                                    <FaEnvelope className="mr-3 text-purple-500" />
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
                                <div className="space-y-2">
                                  {Object.entries(selectedBranchData.hours).map(([day, hours]) => (
                                    <div key={day} className="flex justify-between items-center py-1">
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
                                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                                    <FaCar className="text-blue-500 text-2xl mx-auto mb-2" />
                                    <div className="font-bold text-gray-800">{selectedBranchData.travelTime.car}</div>
                                    <div className="text-sm text-gray-600">By Car</div>
                                  </div>
                                  <div className="bg-green-50 rounded-xl p-4 text-center">
                                    <FaWalking className="text-green-500 text-2xl mx-auto mb-2" />
                                    <div className="font-bold text-gray-800">{selectedBranchData.travelTime.walk}</div>
                                    <div className="text-sm text-gray-600">Walking</div>
                                  </div>
                                  <div className="bg-purple-50 rounded-xl p-4 text-center">
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
                                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
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
                                    className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 px-4 py-2 rounded-full font-medium"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid md:grid-cols-3 gap-4">
                              <button
                                onClick={handleGetDirections}
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all"
                              >
                                <FaDirections className="mr-2" />
                                Get Directions
                              </button>
                              
                              <button
                                onClick={() => handleCallBranch(selectedBranchData.phone)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all"
                              >
                                <FaPhoneAlt className="mr-2" />
                                Call Now
                              </button>
                              
                              <button
                                onClick={() => handleWhatsApp(selectedBranchData.whatsapp)}
                                className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all"
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
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                All Our Locations at a Glance
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Three convenient locations to serve you better across Greater Accra
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {branches.map((branch) => (
                <div key={branch.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{branch.name}</h3>
                      {branch.type === 'flagship' && (
                        <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Main
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

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedBranch(branch.id);
                          setViewMode('split');
                          if (window.innerWidth < 1024) {
                            document.getElementById('branch-details')?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-lg font-medium text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          const address = encodeURIComponent(branch.address);
                          window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
                        }}
                        className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-medium text-sm"
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

      {/* Coming Soon Section */}
      {!expandedMap && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                New Branch Coming Soon!
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                We're excited to announce our new branch opening in Kumasi in Q3 2024. 
                Join our newsletter to be the first to know.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-bold text-lg transition-colors">
                  Notify Me
                </button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold text-lg transition-colors">
                  View Expansion Plans
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Emergency Notice */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-t border-red-100">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
            <div className="text-red-600 font-bold mr-3 mb-2 md:mb-0">🚨 Emergency Notice:</div>
            <span className="text-red-800">
              All branches have 24/7 emergency pharmacy services. Call emergency line: <strong>+233 30 200 0000</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <button
          onClick={() => {
            if (selectedBranchData) {
              handleGetDirections();
            }
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center"
        >
          <FaDirections className="text-xl" />
          <span className="ml-3 font-bold hidden sm:block">Directions</span>
        </button>
        
        <button
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const userLat = position.coords.latitude;
                  const userLng = position.coords.longitude;
                  window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${selectedBranchData?.address}`, '_blank');
                },
                (error) => {
                  handleGetDirections();
                }
              );
            } else {
              handleGetDirections();
            }
          }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center"
        >
          <FaMapMarkerAlt className="text-xl" />
          <span className="ml-3 font-bold hidden sm:block">From My Location</span>
        </button>
      </div>
    </div>
  );
}