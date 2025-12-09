import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaClock, 
  FaUser, 
  FaEye,
  FaHeart,
  FaShareAlt,
  FaComment,
  FaBookmark,
  FaCalendarAlt,
  FaTag,
  FaChevronRight,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaArrowRight,
  FaStethoscope,
  FaAppleAlt,
  FaHeartbeat,
  FaBaby,
  FaBrain,
  FaLeaf,
  FaRunning,
  FaPills,
  FaCapsules,
  FaHome,
  FaNewspaper
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Categories with icons
  const categories = [
    { 
      id: 'all', 
      name: 'All Articles', 
      icon: <FaNewspaper />, 
      color: 'from-blue-500 to-cyan-400',
      count: 48
    },
    { 
      id: 'general-health', 
      name: 'General Health', 
      icon: <FaHeartbeat />, 
      color: 'from-red-500 to-pink-400',
      count: 12
    },
    { 
      id: 'nutrition', 
      name: 'Nutrition', 
      icon: <FaAppleAlt />, 
      color: 'from-green-500 to-emerald-400',
      count: 8
    },
    { 
      id: 'mental-health', 
      name: 'Mental Health', 
      icon: <FaBrain />, 
      color: 'from-purple-500 to-indigo-400',
      count: 6
    },
    { 
      id: 'fitness', 
      name: 'Fitness', 
      icon: <FaRunning />, 
      color: 'from-orange-500 to-amber-400',
      count: 7
    },
    { 
      id: 'preventive-care', 
      name: 'Preventive Care', 
      icon: <FaStethoscope />, 
      color: 'from-teal-500 to-cyan-400',
      count: 9
    },
    { 
      id: 'natural-remedies', 
      name: 'Natural Remedies', 
      icon: <FaLeaf />, 
      color: 'from-lime-500 to-green-400',
      count: 5
    },
    { 
      id: 'medication-guides', 
      name: 'Medication Guides', 
      icon: <FaPills />, 
      color: 'from-indigo-500 to-blue-400',
      count: 4
    }
  ];

  // Popular tags
  const tags = [
    { id: 'all', name: 'All Tags' },
    { id: 'diabetes', name: 'Diabetes' },
    { id: 'hypertension', name: 'Hypertension' },
    { id: 'immunity', name: 'Immunity' },
    { id: 'weight-loss', name: 'Weight Loss' },
    { id: 'stress-management', name: 'Stress Management' },
    { id: 'sleep-health', name: 'Sleep Health' },
    { id: 'child-health', name: 'Child Health' },
    { id: 'elderly-care', name: 'Elderly Care' },
    { id: 'covid-19', name: 'COVID-19' },
    { id: 'vaccination', name: 'Vaccination' },
    { id: 'healthy-living', name: 'Healthy Living' }
  ];

  // Authors
  const authors = [
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Chief Pharmacist', avatar: '👩‍⚕️' },
    { id: 2, name: 'Dr. Michael Chen', role: 'Clinical Specialist', avatar: '👨‍⚕️' },
    { id: 3, name: 'Lisa Williams', role: 'Nutritionist', avatar: '👩‍🍳' },
    { id: 4, name: 'Robert Davis', role: 'Fitness Expert', avatar: '🏋️‍♂️' }
  ];

  // Sample articles data
  const sampleArticles = [
    {
      id: 1,
      title: "Understanding Blood Pressure: What Those Numbers Really Mean",
      excerpt: "Learn how to interpret your blood pressure readings and what lifestyle changes can help maintain healthy levels.",
      content: "Full article content here...",
      author: authors[0],
      category: 'preventive-care',
      tags: ['hypertension', 'heart-health', 'preventive-care'],
      readTime: 5,
      views: 1250,
      likes: 89,
      comments: 24,
      publishDate: '2024-01-15',
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      isTrending: true
    },
    {
      id: 2,
      title: "The Complete Guide to Diabetes Management in Ghana",
      excerpt: "Practical tips for managing diabetes in the Ghanaian context, including diet modifications and exercise routines.",
      content: "Full article content here...",
      author: authors[1],
      category: 'general-health',
      tags: ['diabetes', 'nutrition', 'healthy-living'],
      readTime: 8,
      views: 1890,
      likes: 124,
      comments: 42,
      publishDate: '2024-01-10',
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      isTrending: true
    },
    {
      id: 3,
      title: "10 Natural Remedies for Common Colds in Ghana",
      excerpt: "Traditional and natural remedies that can help alleviate cold symptoms using locally available ingredients.",
      content: "Full article content here...",
      author: authors[2],
      category: 'natural-remedies',
      tags: ['immunity', 'natural-remedies', 'covid-19'],
      readTime: 6,
      views: 1560,
      likes: 97,
      comments: 31,
      publishDate: '2024-01-05',
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      isTrending: false
    },
    {
      id: 4,
      title: "Mental Health Awareness: Breaking the Stigma in Ghana",
      excerpt: "Understanding mental health issues and how to seek help in the Ghanaian healthcare system.",
      content: "Full article content here...",
      author: authors[0],
      category: 'mental-health',
      tags: ['mental-health', 'stress-management', 'healthy-living'],
      readTime: 7,
      views: 1420,
      likes: 113,
      comments: 38,
      publishDate: '2024-01-02',
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      isTrending: true
    },
    {
      id: 5,
      title: "Ghanaian Superfoods for Boosting Immunity",
      excerpt: "Discover locally available foods that can significantly enhance your immune system.",
      content: "Full article content here...",
      author: authors[2],
      category: 'nutrition',
      tags: ['nutrition', 'immunity', 'healthy-living'],
      readTime: 4,
      views: 980,
      likes: 67,
      comments: 19,
      publishDate: '2023-12-28',
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      isTrending: false
    },
    {
      id: 6,
      title: "Exercise Routines for Busy Professionals in Accra",
      excerpt: "Quick and effective workout routines that can be done at home or office with minimal equipment.",
      content: "Full article content here...",
      author: authors[3],
      category: 'fitness',
      tags: ['fitness', 'weight-loss', 'healthy-living'],
      readTime: 5,
      views: 1120,
      likes: 78,
      comments: 26,
      publishDate: '2023-12-25',
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      isTrending: true
    },
    {
      id: 7,
      title: "Understanding Antibiotics: When to Use and When to Avoid",
      excerpt: "A pharmacist's guide to proper antibiotic usage and the dangers of antibiotic resistance.",
      content: "Full article content here...",
      author: authors[0],
      category: 'medication-guides',
      tags: ['medication', 'antibiotics', 'preventive-care'],
      readTime: 6,
      views: 1340,
      likes: 92,
      comments: 33,
      publishDate: '2023-12-20',
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      isTrending: false
    },
    {
      id: 8,
      title: "Child Health: Vaccination Schedule in Ghana 2024",
      excerpt: "Complete guide to childhood vaccinations and their importance in disease prevention.",
      content: "Full article content here...",
      author: authors[1],
      category: 'preventive-care',
      tags: ['child-health', 'vaccination', 'preventive-care'],
      readTime: 7,
      views: 1670,
      likes: 105,
      comments: 45,
      publishDate: '2023-12-15',
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      isTrending: true
    },
    {
      id: 9,
      title: "Managing Stress in Modern Ghanaian Life",
      excerpt: "Practical techniques for stress management in today's fast-paced environment.",
      content: "Full article content here...",
      author: authors[0],
      category: 'mental-health',
      tags: ['stress-management', 'mental-health', 'healthy-living'],
      readTime: 5,
      views: 1230,
      likes: 84,
      comments: 29,
      publishDate: '2023-12-10',
      image: "https://images.unsplash.com/photo-1491897554428-130a60dd4757?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      isTrending: false
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setArticles(sampleArticles);
      setFilteredArticles(sampleArticles);
      setFeaturedArticles(sampleArticles.filter(article => article.isFeatured));
      setLoading(false);
    }, 1000);
  }, []);

  // Filter articles based on selections
  useEffect(() => {
    let filtered = [...articles];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(article => 
        article.tags.includes(selectedTag)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'trending':
        filtered.sort((a, b) => {
          if (a.isTrending && !b.isTrending) return -1;
          if (!a.isTrending && b.isTrending) return 1;
          return b.views - a.views;
        });
        break;
      case 'most-liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'most-commented':
        filtered.sort((a, b) => b.comments - a.comments);
        break;
      default:
        // Newest first
        filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, selectedTag, sortBy, articles]);

  const handleSaveArticle = (articleId) => {
    setSavedArticles(prev => 
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleLikeArticle = (articleId) => {
    setLikedArticles(prev => 
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleShareArticle = (article) => {
    const shareUrl = `${window.location.origin}/articles/${article.id}`;
    const shareText = `Check out this health article: ${article.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: shareUrl,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GH', options);
  };

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-teal-600 overflow-hidden">
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
              Health Articles & Guides
              <span className="block text-teal-200">Expert Advice for Your Wellness Journey</span>
            </motion.h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Evidence-based health information, wellness tips, and medical insights from our expert team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search health topics, conditions, or symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-white/40 text-lg"
                />
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-blue-200 text-xl" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-teal-400 to-blue-400 text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Carousel */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Articles</h2>
            <button className="text-blue-600 hover:text-blue-700 font-bold flex items-center">
              View All <FaArrowRight className="ml-2" />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="!pb-12"
          >
            {featuredArticles.map((article) => (
              <SwiperSlide key={article.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FaCalendarAlt className="mr-2" />
                      {formatDate(article.publishDate)}
                      <span className="mx-2">•</span>
                      <FaClock className="mr-2" />
                      {article.readTime} min read
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          {article.author.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{article.author.name}</div>
                          <div className="text-xs text-gray-500">{article.author.role}</div>
                        </div>
                      </div>
                      
                      <button className="text-blue-600 hover:text-blue-700">
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-24 space-y-6">
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
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${selectedCategory === category.id ? 'text-blue-600' : 'text-gray-400'}`}>
                          {category.icon}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm ${selectedCategory === category.id ? 'text-blue-600' : 'text-gray-500'}`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => setSelectedTag(tag.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTag === tag.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Health Insights Newsletter</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get weekly health tips and articles delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-800"
                  />
                  <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Trending Articles */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Trending Now</h3>
                <div className="space-y-4">
                  {articles
                    .filter(article => article.isTrending)
                    .slice(0, 3)
                    .map((article) => (
                      <div key={article.id} className="flex items-start space-x-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <FaEye className="mr-1" />
                            {article.views.toLocaleString()} views
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' 
                    ? 'All Health Articles' 
                    : `${categories.find(c => c.id === selectedCategory)?.name}`}
                </h2>
                <p className="text-gray-600">
                  {filteredArticles.length} articles found
                  {selectedTag !== 'all' && ` • Tag: ${tags.find(t => t.id === selectedTag)?.name}`}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="trending">Trending</option>
                    <option value="most-liked">Most Liked</option>
                    <option value="most-commented">Most Commented</option>
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
            ) : currentArticles.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedTag('all');
                    setSearchTerm('');
                    setSortBy('newest');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentArticles.map((article) => (
                    <motion.article
                      key={article.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Article Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                            {categories.find(c => c.id === article.category)?.name}
                          </span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 space-y-2">
                          <button
                            onClick={() => handleSaveArticle(article.id)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                          >
                            <FaBookmark className={`${
                              savedArticles.includes(article.id)
                                ? 'text-blue-500 fill-current'
                                : 'text-gray-400'
                            }`} />
                          </button>
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <FaUser className="mr-2" />
                            {article.author.name}
                          </div>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <FaClock className="mr-2" />
                            {article.readTime} min read
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                          {article.tags.length > 2 && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              +{article.tags.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikeArticle(article.id)}
                              className="flex items-center text-gray-500 hover:text-red-500"
                            >
                              <FaHeart className={`mr-1 ${
                                likedArticles.includes(article.id) ? 'text-red-500 fill-current' : ''
                              }`} />
                              <span className="text-sm">{article.likes}</span>
                            </button>
                            
                            <button className="flex items-center text-gray-500 hover:text-blue-500">
                              <FaComment className="mr-1" />
                              <span className="text-sm">{article.comments}</span>
                            </button>
                            
                            <button
                              onClick={() => handleShareArticle(article)}
                              className="flex items-center text-gray-500 hover:text-green-500"
                            >
                              <FaShareAlt className="mr-1" />
                              <span className="text-sm">Share</span>
                            </button>
                          </div>

                          <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                            Read More
                            <FaChevronRight className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-lg ${
                            currentPage === i + 1
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Expert Authors Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet Our Health Experts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Articles written by qualified healthcare professionals and wellness experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {authors.map((author) => (
              <div key={author.id} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center text-3xl mx-auto mb-4">
                  {author.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{author.name}</h3>
                <p className="text-gray-600 mb-4">{author.role}</p>
                <div className="text-sm text-gray-500">
                  {articles.filter(a => a.author.id === author.id).length} articles
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Have a Health Question?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our pharmacists are available to answer your health-related questions. Get personalized advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/233551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-bold text-lg transition-colors"
              >
                Ask a Pharmacist
              </a>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold text-lg transition-colors">
                Browse FAQs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Share Options */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <div className="text-center mb-4">
            <span className="text-sm font-bold text-gray-700">Share</span>
          </div>
          <div className="space-y-3">
            <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
              <FaFacebook />
            </a>
            <a href="#" className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600">
              <FaWhatsapp />
            </a>
            <a href="#" className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}