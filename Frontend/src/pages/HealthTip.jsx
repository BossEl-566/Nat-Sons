import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaHeart, 
  FaBookmark, 
  FaShareAlt,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaAppleAlt,
  FaRunning,
  FaBed,
  FaBrain,
  FaWater,
  FaSeedling,
  FaSun,
  FaUsers,
  FaFire,
  FaChevronRight,
  FaChevronLeft,
  FaTimes,
  FaPrint,
  FaDownload,
  FaBell,
  FaCheckCircle,
  FaStar,
  FaRegStar,
  FaEye,
  FaComment,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HealthTip() {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [savedTips, setSavedTips] = useState([]);
  const [completedTips, setCompletedTips] = useState([]);
  const [likedTips, setLikedTips] = useState([]);
  const [selectedTip, setSelectedTip] = useState(null);
  const [showTipModal, setShowTipModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [wellnessStreak, setWellnessStreak] = useState(7);
  const [tipOfTheDay, setTipOfTheDay] = useState(null);

  // Categories with icons and colors
  const categories = [
    { 
      id: 'all', 
      name: 'All Tips', 
      icon: <FaHeart />, 
      color: 'from-pink-500 to-rose-500',
      count: 128
    },
    { 
      id: 'nutrition', 
      name: 'Nutrition', 
      icon: <FaAppleAlt />, 
      color: 'from-green-500 to-emerald-500',
      count: 32
    },
    { 
      id: 'fitness', 
      name: 'Fitness', 
      icon: <FaRunning />, 
      color: 'from-blue-500 to-cyan-500',
      count: 24
    },
    { 
      id: 'sleep', 
      name: 'Sleep & Rest', 
      icon: <FaBed />, 
      color: 'from-indigo-500 to-purple-500',
      count: 18
    },
    { 
      id: 'mental', 
      name: 'Mental Health', 
      icon: <FaBrain />, 
      color: 'from-purple-500 to-pink-500',
      count: 22
    },
    { 
      id: 'hydration', 
      name: 'Hydration', 
      icon: <FaWater />, 
      color: 'from-cyan-500 to-blue-500',
      count: 12
    },
    { 
      id: 'preventive', 
      name: 'Preventive Care', 
      icon: <FaUserMd />, 
      color: 'from-red-500 to-orange-500',
      count: 26
    },
    { 
      id: 'natural', 
      name: 'Natural Remedies', 
      icon: <FaSeedling />, 
      color: 'from-lime-500 to-green-500',
      count: 16
    }
  ];

  // Difficulty levels
  const difficulties = [
    { id: 'all', name: 'All Levels', color: 'gray' },
    { id: 'beginner', name: 'Beginner', color: 'green' },
    { id: 'intermediate', name: 'Intermediate', color: 'yellow' },
    { id: 'advanced', name: 'Advanced', color: 'red' }
  ];

  // Time requirements
  const timeRequirements = [
    { id: 'all', name: 'Any Time', duration: '0-60 min' },
    { id: 'quick', name: 'Quick Tips', duration: '< 5 min' },
    { id: 'moderate', name: 'Moderate', duration: '5-15 min' },
    { id: 'extended', name: 'Extended', duration: '15+ min' }
  ];

  // Sample health tips data
  const sampleTips = [
    {
      id: 1,
      title: "The 8x8 Water Rule for Optimal Hydration",
      description: "Drink eight 8-ounce glasses of water daily to maintain proper hydration levels.",
      fullContent: "Proper hydration is essential for all bodily functions. Aim for at least 2 liters (8 glasses) of water daily. Start your day with a glass of warm water with lemon to kickstart metabolism. Carry a reusable water bottle and set hourly reminders. Monitor your urine color - pale yellow indicates good hydration.",
      category: 'hydration',
      difficulty: 'beginner',
      timeRequired: 'Quick',
      duration: '2 minutes',
      frequency: 'Daily',
      benefits: ['Improves skin health', 'Boosts energy levels', 'Aids digestion', 'Regulates body temperature'],
      science: "Water makes up about 60% of body weight and is essential for cellular function, nutrient transport, and waste removal.",
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      views: 2450,
      likes: 189,
      saves: 124,
      isFeatured: true,
      isDailyTip: true,
      tags: ['hydration', 'wellness', 'daily-habits']
    },
    {
      id: 2,
      title: "7-Minute Morning Stretch Routine",
      description: "Start your day with this quick full-body stretch to improve flexibility and circulation.",
      fullContent: "This 7-minute routine targets all major muscle groups. 1) Neck rolls - 30 seconds each direction. 2) Shoulder stretches - 1 minute. 3) Cat-cow pose - 1 minute. 4) Forward fold - 1 minute. 5) Quad stretch - 30 seconds each side. 6) Calf stretches - 30 seconds each side. 7) Deep breathing - 1 minute.",
      category: 'fitness',
      difficulty: 'beginner',
      timeRequired: 'Quick',
      duration: '7 minutes',
      frequency: 'Daily',
      benefits: ['Reduces stiffness', 'Improves posture', 'Increases blood flow', 'Reduces stress'],
      science: "Morning stretching improves circulation, lubricates joints, and prepares muscles for daily activities.",
      author: 'Robert Davis',
      date: '2024-01-14',
      views: 1890,
      likes: 156,
      saves: 89,
      isFeatured: true,
      isDailyTip: false,
      tags: ['stretching', 'morning-routine', 'flexibility']
    },
    {
      id: 3,
      title: "Meditation for Stress Reduction",
      description: "A simple 10-minute meditation technique to reduce anxiety and improve mental clarity.",
      fullContent: "Find a quiet space. Sit comfortably with back straight. Close your eyes. Focus on your breath. Inhale for 4 counts, hold for 4, exhale for 6. When thoughts arise, acknowledge them and return to breath. Start with 5 minutes daily, gradually increase to 20 minutes. Use guided meditation apps if needed.",
      category: 'mental',
      difficulty: 'intermediate',
      timeRequired: 'Moderate',
      duration: '10 minutes',
      frequency: 'Daily',
      benefits: ['Reduces cortisol levels', 'Improves focus', 'Lowers blood pressure', 'Enhances emotional regulation'],
      science: "Meditation reduces activity in the amygdala (stress center) and increases prefrontal cortex activity (decision-making).",
      author: 'Dr. Lisa Williams',
      date: '2024-01-13',
      views: 1670,
      likes: 134,
      saves: 78,
      isFeatured: false,
      isDailyTip: false,
      tags: ['meditation', 'stress-relief', 'mindfulness']
    },
    {
      id: 4,
      title: "Portion Control with the Plate Method",
      description: "Use your plate as a guide for balanced meals without counting calories.",
      fullContent: "Divide your plate into sections: 1/2 non-starchy vegetables, 1/4 lean protein, 1/4 whole grains. Use a 9-inch plate. Fill vegetables section with leafy greens, broccoli, peppers. Protein section: chicken, fish, beans, tofu. Grain section: brown rice, quinoa, whole wheat pasta. Add a serving of healthy fat like avocado or olive oil.",
      category: 'nutrition',
      difficulty: 'beginner',
      timeRequired: 'Quick',
      duration: '2 minutes',
      frequency: 'Every meal',
      benefits: ['Weight management', 'Balanced nutrition', 'Portion awareness', 'Easy to follow'],
      science: "The plate method ensures proper macronutrient balance and portion control without complicated calculations.",
      author: 'Lisa Williams',
      date: '2024-01-12',
      views: 1340,
      likes: 112,
      saves: 67,
      isFeatured: true,
      isDailyTip: false,
      tags: ['nutrition', 'portion-control', 'weight-management']
    },
    {
      id: 5,
      title: "Power Nap for Productivity",
      description: "A 20-minute nap can boost alertness and performance without causing sleep inertia.",
      fullContent: "Best time: 1-3 PM. Set alarm for 20 minutes. Find a quiet, dark place. Sit semi-reclined or lie down. Use eye mask if needed. Breathe deeply for 1 minute before napping. Upon waking, stretch and drink water. Avoid napping after 3 PM to protect nighttime sleep.",
      category: 'sleep',
      difficulty: 'beginner',
      timeRequired: 'Moderate',
      duration: '20 minutes',
      frequency: 'As needed',
      benefits: ['Boosts alertness', 'Improves memory', 'Reduces fatigue', 'Enhances mood'],
      science: "Short naps increase alertness by reducing sleep pressure without entering deep sleep stages that cause grogginess.",
      author: 'Dr. Michael Chen',
      date: '2024-01-11',
      views: 1120,
      likes: 98,
      saves: 56,
      isFeatured: false,
      isDailyTip: false,
      tags: ['sleep', 'productivity', 'energy-boost']
    },
    {
      id: 6,
      title: "HIIT Workout for Busy Professionals",
      description: "A 15-minute high-intensity interval training session that delivers maximum results.",
      fullContent: "Warm-up: 2 minutes light cardio. Circuit (repeat 3x): 45 seconds jump squats, 15 seconds rest. 45 seconds push-ups, 15 seconds rest. 45 seconds mountain climbers, 15 seconds rest. 45 seconds plank, 15 seconds rest. Cool-down: 2 minutes stretching. Modify intensity as needed.",
      category: 'fitness',
      difficulty: 'advanced',
      timeRequired: 'Extended',
      duration: '15 minutes',
      frequency: '3x weekly',
      benefits: ['Burns calories', 'Improves cardiovascular health', 'Builds strength', 'Time-efficient'],
      science: "HIIT creates an 'afterburn' effect where body continues to burn calories for hours after exercise.",
      author: 'Robert Davis',
      date: '2024-01-10',
      views: 1560,
      likes: 123,
      saves: 89,
      isFeatured: false,
      isDailyTip: true,
      tags: ['hiit', 'workout', 'fitness']
    },
    {
      id: 7,
      title: "Digital Detox for Mental Well-being",
      description: "Strategies to reduce screen time and improve real-world connections.",
      fullContent: "1) Set device-free hours (e.g., dinner time, last hour before bed). 2) Turn off non-essential notifications. 3) Use grayscale mode to reduce appeal. 4) Designate tech-free zones (bedroom, dining area). 5) Schedule 'digital sabbath' - one day weekly without screens. 6) Replace scrolling with reading or hobbies.",
      category: 'mental',
      difficulty: 'intermediate',
      timeRequired: 'Moderate',
      duration: 'Ongoing',
      frequency: 'Daily practice',
      benefits: ['Reduces eye strain', 'Improves sleep', 'Enhances focus', 'Strengthens relationships'],
      science: "Reducing blue light exposure improves melatonin production and sleep quality. Less screen time reduces cortisol levels.",
      author: 'Dr. Lisa Williams',
      date: '2024-01-09',
      views: 1230,
      likes: 101,
      saves: 72,
      isFeatured: false,
      isDailyTip: false,
      tags: ['digital-detox', 'mental-health', 'wellness']
    },
    {
      id: 8,
      title: "Natural Immune Boosters",
      description: "Locally available foods and herbs to strengthen your immune system.",
      fullContent: "1) Ginger tea - anti-inflammatory properties. 2) Garlic - contains allicin with antimicrobial effects. 3) Turmeric - curcumin boosts immune response. 4) Citrus fruits - vitamin C for immune cell function. 5) Moringa leaves - rich in antioxidants. 6) Hibiscus tea - high in vitamin C. 7) Local honey - antibacterial properties.",
      category: 'natural',
      difficulty: 'beginner',
      timeRequired: 'Quick',
      duration: '5 minutes',
      frequency: 'Regularly',
      benefits: ['Strengthens immunity', 'Reduces inflammation', 'Antioxidant rich', 'Locally sourced'],
      science: "These foods contain vitamins, minerals, and compounds that support various aspects of immune function.",
      author: 'Dr. Sarah Johnson',
      date: '2024-01-08',
      views: 1780,
      likes: 145,
      saves: 93,
      isFeatured: true,
      isDailyTip: false,
      tags: ['immunity', 'natural-remedies', 'ghanian-foods']
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setTips(sampleTips);
      setFilteredTips(sampleTips);
      
      // Set tip of the day
      const today = new Date().getDate();
      const dailyTip = sampleTips.find(tip => tip.id === (today % sampleTips.length) + 1);
      setTipOfTheDay(dailyTip);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Filter tips based on selections
  useEffect(() => {
    let filtered = [...tips];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tip =>
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tip => tip.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(tip => tip.difficulty === selectedDifficulty);
    }

    // Time filter
    if (timeFilter !== 'all') {
      if (timeFilter === 'quick') {
        filtered = filtered.filter(tip => tip.timeRequired === 'Quick');
      } else if (timeFilter === 'moderate') {
        filtered = filtered.filter(tip => tip.timeRequired === 'Moderate');
      } else if (timeFilter === 'extended') {
        filtered = filtered.filter(tip => tip.timeRequired === 'Extended');
      }
    }

    // Active tab filter
    if (activeTab === 'saved') {
      filtered = filtered.filter(tip => savedTips.includes(tip.id));
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(tip => completedTips.includes(tip.id));
    } else if (activeTab === 'featured') {
      filtered = filtered.filter(tip => tip.isFeatured);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'most-liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'easiest':
        filtered.sort((a, b) => {
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
        break;
      default:
        // Popular (combination of views and likes)
        filtered.sort((a, b) => (b.views + b.likes) - (a.views + a.likes));
    }

    setFilteredTips(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, timeFilter, sortBy, activeTab, tips, savedTips, completedTips]);

  const handleSaveTip = (tipId) => {
    setSavedTips(prev => 
      prev.includes(tipId)
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  const handleCompleteTip = (tipId) => {
    setCompletedTips(prev => 
      prev.includes(tipId)
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  const handleLikeTip = (tipId) => {
    setLikedTips(prev => 
      prev.includes(tipId)
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  const handleViewTip = (tip) => {
    setSelectedTip(tip);
    setShowTipModal(true);
  };

  const handleShareTip = (tip) => {
    const shareUrl = `${window.location.origin}/health-tips/${tip.id}`;
    const shareText = `Check out this health tip: ${tip.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: tip.title,
        text: tip.description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
      alert('Tip link copied to clipboard!');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
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
              Daily Health Tips
              <span className="block text-emerald-200">For a Healthier You</span>
            </motion.h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Practical, evidence-based health tips you can implement today. Small changes, big impact.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search health tips, topics, or benefits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-green-200 focus:outline-none focus:border-white/40 text-lg"
                />
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-green-200 text-xl" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-400 to-green-400 text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Streak */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="text-2xl font-bold text-green-600 mr-3">{wellnessStreak}</div>
              <div>
                <div className="font-bold text-gray-800">Day Wellness Streak</div>
                <div className="text-sm text-gray-600">Keep going! You're doing great</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {completedTips.length} tips completed
              </div>
              <div className="flex space-x-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < wellnessStreak % 7
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tip of the Day */}
      {tipOfTheDay && (
        <section className="py-8 bg-gradient-to-r from-yellow-50 to-amber-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white p-3 rounded-xl mr-4">
                      <FaSun className="text-2xl" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-amber-600">TIP OF THE DAY</div>
                      <div className="text-2xl font-bold text-gray-800">{formatDate(new Date())}</div>
                    </div>
                  </div>
                  <button className="text-amber-600 hover:text-amber-700">
                    <FaBell className="text-xl" />
                  </button>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{tipOfTheDay.title}</h3>
                    <p className="text-gray-600 mb-6">{tipOfTheDay.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tipOfTheDay.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="inline-block bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleViewTip(tipOfTheDay)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                      >
                        View Full Tip
                      </button>
                      <button
                        onClick={() => handleCompleteTip(tipOfTheDay.id)}
                        className={`border-2 px-6 py-3 rounded-lg font-bold transition-all ${
                          completedTips.includes(tipOfTheDay.id)
                            ? 'border-green-500 text-green-500 bg-green-50'
                            : 'border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-500'
                        }`}
                      >
                        {completedTips.includes(tipOfTheDay.id) ? 'Completed' : 'Mark as Done'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 mb-3">Quick Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-800">{tipOfTheDay.duration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">{tipOfTheDay.frequency}</div>
                        <div className="text-sm text-gray-600">Frequency</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800 capitalize">{tipOfTheDay.difficulty}</div>
                        <div className="text-sm text-gray-600">Level</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">{tipOfTheDay.views.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Views</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`flex-1 py-3 text-center font-medium ${
                      activeTab === 'all'
                        ? 'border-b-2 border-green-500 text-green-600'
                        : 'text-gray-600 hover:text-green-500'
                    }`}
                  >
                    All Tips
                  </button>
                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`flex-1 py-3 text-center font-medium ${
                      activeTab === 'saved'
                        ? 'border-b-2 border-green-500 text-green-600'
                        : 'text-gray-600 hover:text-green-500'
                    }`}
                  >
                    Saved
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`flex-1 py-3 text-center font-medium ${
                      activeTab === 'completed'
                        ? 'border-b-2 border-green-500 text-green-600'
                        : 'text-gray-600 hover:text-green-500'
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-green-50 text-green-600 border border-green-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${selectedCategory === category.id ? 'text-green-600' : 'text-gray-400'}`}>
                          {category.icon}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm ${selectedCategory === category.id ? 'text-green-600' : 'text-gray-500'}`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Difficulty Level</h3>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                        selectedDifficulty === difficulty.id
                          ? 'bg-green-50 text-green-600 border border-green-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 bg-${difficulty.color}-500`}></div>
                        <span className="font-medium">{difficulty.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Required */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Time Required</h3>
                <div className="space-y-2">
                  {timeRequirements.map((time) => (
                    <button
                      key={time.id}
                      onClick={() => setTimeFilter(time.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                        timeFilter === time.id
                          ? 'bg-green-50 text-green-600 border border-green-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{time.name}</div>
                        <div className="text-sm text-gray-500">{time.duration}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Daily Tips Newsletter</h3>
                <p className="text-green-100 text-sm mb-4">
                  Get a new health tip delivered to your inbox every morning.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-800"
                  />
                  <button className="w-full bg-white text-green-600 py-2 rounded-lg font-bold hover:bg-green-50 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeTab === 'saved' ? 'Saved Tips' : 
                   activeTab === 'completed' ? 'Completed Tips' : 
                   selectedCategory === 'all' ? 'All Health Tips' : 
                   `${categories.find(c => c.id === selectedCategory)?.name} Tips`}
                </h2>
                <p className="text-gray-600">
                  {filteredTips.length} tips found
                  {selectedDifficulty !== 'all' && ` • ${difficulties.find(d => d.id === selectedDifficulty)?.name}`}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="most-liked">Most Liked</option>
                    <option value="most-viewed">Most Viewed</option>
                    <option value="easiest">Easiest First</option>
                  </select>
                  <FaChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredTips.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No tips found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setTimeFilter('all');
                    setSearchTerm('');
                    setActiveTab('all');
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Tips Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTips.map((tip) => (
                    <motion.div
                      key={tip.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Tip Header */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg mr-3 bg-gradient-to-br ${
                              categories.find(c => c.id === tip.category)?.color || 'from-gray-500 to-gray-600'
                            } text-white`}>
                              {categories.find(c => c.id === tip.category)?.icon}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-500 uppercase">
                                {categories.find(c => c.id === tip.category)?.name}
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <FaClock className="mr-1" />
                                {tip.duration}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveTip(tip.id)}
                              className="text-gray-400 hover:text-green-500"
                            >
                              <FaBookmark className={`${
                                savedTips.includes(tip.id)
                                  ? 'text-green-500 fill-current'
                                  : ''
                              }`} />
                            </button>
                            {tip.isDailyTip && (
                              <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                Daily
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Tip Content */}
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                          {tip.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {tip.description}
                        </p>

                        {/* Difficulty Badge */}
                        <div className="flex items-center mb-4">
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            tip.difficulty === 'beginner' 
                              ? 'bg-green-100 text-green-600'
                              : tip.difficulty === 'intermediate'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{tip.timeRequired}</span>
                        </div>

                        {/* Benefits */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tip.benefits.slice(0, 2).map((benefit, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                            >
                              {benefit}
                            </span>
                          ))}
                          {tip.benefits.length > 2 && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              +{tip.benefits.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikeTip(tip.id)}
                              className="flex items-center text-gray-500 hover:text-red-500"
                            >
                              <FaHeart className={`mr-1 ${
                                likedTips.includes(tip.id) ? 'text-red-500 fill-current' : ''
                              }`} />
                              <span className="text-sm">{tip.likes}</span>
                            </button>
                            
                            <button className="flex items-center text-gray-500 hover:text-blue-500">
                              <FaEye className="mr-1" />
                              <span className="text-sm">{tip.views.toLocaleString()}</span>
                            </button>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleCompleteTip(tip.id)}
                              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                completedTips.includes(tip.id)
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
                              }`}
                            >
                              {completedTips.includes(tip.id) ? '✓ Done' : 'Do It'}
                            </button>
                            <button
                              onClick={() => handleViewTip(tip)}
                              className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                            >
                              View
                            </button>
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

      {/* Health Challenge Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              30-Day Wellness Challenge
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands in our monthly health challenge. Complete daily tips and track your progress.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Daily Tasks</h3>
              <p className="text-gray-600">New health tip every day for 30 days</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Community Support</h3>
              <p className="text-gray-600">Share progress and get motivated together</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFire className="text-purple-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Track Progress</h3>
              <p className="text-gray-600">Monitor improvements and celebrate wins</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-all">
              Join Challenge
            </button>
          </div>
        </div>
      </section>

      {/* Tip Detail Modal */}
      <AnimatePresence>
        {showTipModal && selectedTip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowTipModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl mr-4 bg-gradient-to-br ${
                      categories.find(c => c.id === selectedTip.category)?.color
                    } text-white`}>
                      {categories.find(c => c.id === selectedTip.category)?.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-500 uppercase">
                        {categories.find(c => c.id === selectedTip.category)?.name}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedTip.title}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTipModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    {selectedTip.duration} • {selectedTip.frequency}
                  </div>
                  <div className="flex items-center">
                    <FaUserMd className="mr-2" />
                    By {selectedTip.author}
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {formatDate(selectedTip.date)}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h4 className="font-bold text-gray-800 text-lg mb-4">What to Do</h4>
                    <div className="prose max-w-none mb-8">
                      <p className="text-gray-700 whitespace-pre-line">{selectedTip.fullContent}</p>
                    </div>

                    <h4 className="font-bold text-gray-800 text-lg mb-4">Benefits</h4>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {selectedTip.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center bg-green-50 rounded-lg p-3">
                          <FaCheckCircle className="text-green-500 mr-3" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-bold text-gray-800 text-lg mb-4">The Science</h4>
                    <div className="bg-blue-50 rounded-xl p-4 mb-8">
                      <p className="text-gray-700">{selectedTip.science}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Stats */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-800 mb-4">Quick Stats</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Views</span>
                          <span className="font-bold">{selectedTip.views.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Likes</span>
                          <span className="font-bold">{selectedTip.likes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saves</span>
                          <span className="font-bold">{selectedTip.saves}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Difficulty</span>
                          <span className={`font-bold capitalize ${
                            selectedTip.difficulty === 'beginner' 
                              ? 'text-green-600'
                              : selectedTip.difficulty === 'intermediate'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}>
                            {selectedTip.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleCompleteTip(selectedTip.id)}
                        className={`w-full py-3 rounded-lg font-bold flex items-center justify-center ${
                          completedTips.includes(selectedTip.id)
                            ? 'bg-green-100 text-green-600 border border-green-200'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                        }`}
                      >
                        {completedTips.includes(selectedTip.id) ? '✓ Completed' : 'Mark as Completed'}
                      </button>
                      
                      <button
                        onClick={() => handleSaveTip(selectedTip.id)}
                        className={`w-full py-3 rounded-lg font-bold flex items-center justify-center ${
                          savedTips.includes(selectedTip.id)
                            ? 'bg-blue-100 text-blue-600 border border-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <FaBookmark className="mr-2" />
                        {savedTips.includes(selectedTip.id) ? 'Saved' : 'Save for Later'}
                      </button>

                      <button
                        onClick={() => handleShareTip(selectedTip)}
                        className="w-full py-3 rounded-lg font-bold flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      >
                        <FaShareAlt className="mr-2" />
                        Share This Tip
                      </button>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTip.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Share Options */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Share Via</h4>
                      <div className="flex space-x-2">
                        <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                          <FaFacebook />
                        </button>
                        <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600">
                          <FaTwitter />
                        </button>
                        <button className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600">
                          <FaWhatsapp />
                        </button>
                        <button className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600">
                          <FaInstagram />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => {
              // Scroll to tip of the day
              document.querySelector('#tip-of-day')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center"
          >
            <FaSun className="text-xl" />
            <span className="ml-3 font-bold hidden sm:block">Today's Tip</span>
          </button>
          
          <button
            onClick={() => {
              // Show random tip
              const randomTip = tips[Math.floor(Math.random() * tips.length)];
              if (randomTip) {
                handleViewTip(randomTip);
              }
            }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center"
          >
            <FaDice className="text-xl" />
            <span className="ml-3 font-bold hidden sm:block">Random Tip</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Add missing FaDice icon import
const FaDice = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" clipRule="evenodd" />
  </svg>
);