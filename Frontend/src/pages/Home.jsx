import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaArrowRight,
  FaHospital,
  FaStore,
  FaUsers,
  FaShieldAlt,
  FaTruck,
  FaUserMd,
  FaAward,
  FaStar,
  FaPrescriptionBottle,
  FaHeart,
  FaCapsules,
  FaClinicMedical,
  FaPlay,
  FaQuoteLeft
} from 'react-icons/fa';
import { 
  HiBuildingStorefront,
  HiTruck,
  HiUserGroup,
  HiShieldCheck
} from 'react-icons/hi2';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Sample video URLs (replace with your actual videos)
  const heroVideos = [
    "/videos/pharmacy-tour.mp4",
    "/videos/customer-service.mp4",
    "/videos/medicine-storage.mp4"
  ];

  const heroTexts = [
    {
      title: "Your Trusted Healthcare Partner Since 1999",
      subtitle: "Pioneering quality healthcare in Cape Coast as the first pharmacy in Abura"
    },
    {
      title: "Serving Hospitals & Communities Across Ghana",
      subtitle: "Professional healthcare solutions for hospitals, retailers, and individual customers"
    },
    {
      title: "Quality Medicines, Expert Care",
      subtitle: "Your health is our priority at Nat & Sons Pharmacy"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroTexts.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // SVG Background Component
  const MedicalPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="medical-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M50,0 L60,20 L80,20 L65,35 L75,55 L50,45 L25,55 L35,35 L20,20 L40,20 Z" 
                fill="currentColor" opacity="0.3"/>
          <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.2"/>
          <rect x="45" y="70" width="10" height="20" fill="currentColor" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#medical-pattern)" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Enhanced Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background Carousel */}
        <div className="absolute inset-0">
          {heroVideos.map((video, index) => (
            <video
              key={index}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50"></div>
        </div>

        {/* Animated Text Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <div className={`transition-all duration-1000 transform ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm border border-white/30">
                <FaHeart className="text-3xl text-white" />
              </div>
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-poppins">
                  {heroTexts[currentSlide].title}
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light max-w-4xl mx-auto leading-relaxed">
                {heroTexts[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/healthcare-products" 
                  className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-center hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  Shop Healthcare Products
                </Link>
                <Link 
                  to="/contact" 
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-white hover:text-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <FaPhone className="w-5 h-5" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroTexts.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsVisible(true);
                }, 500);
              }}
            />
          ))}
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        <MedicalPattern />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <FaUserMd className="w-4 h-4 mr-2" />
              Meet Our Founders
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">The Visionaries Behind Our Success</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated leadership that built Ghana's trusted healthcare partner
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              {/* Founders Photo - Replace with actual founders photo */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center h-96 flex items-center justify-center">
                <div className="text-center">
                  <FaUserMd className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-700 font-semibold">Founders Photo</p>
                  <p className="text-blue-600 text-sm">Mr. Nana Abekah Twentoh & Mrs. Joyce Baaba Twentoh</p>
                </div>
                {/* Replace above div with: */}
                {/* <img 
                  src="/images/founders/founders-photo.jpg" 
                  alt="Mr. Nana Abekah Twentoh and Mrs. Joyce Baaba Twentoh"
                  className="w-full h-full object-cover rounded-2xl"
                /> */}
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 font-poppins">
                Building Healthcare Excellence Since 1999
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Under the visionary leadership of <strong className="text-blue-700">Mr. Nana Abekah Twentoh</strong> and 
                <strong className="text-blue-700"> Mrs. Joyce Baaba Twentoh</strong>, Nat & Sons Pharmacy has grown from 
                a single store in Abura to a trusted healthcare network serving communities across Ghana.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaAward className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Pioneering Spirit</h4>
                    <p className="text-gray-600">First pharmacy established in Abura, Cape Coast in 1999</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaHeart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Community Focus</h4>
                    <p className="text-gray-600">Dedicated to serving local communities with compassion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                year: "1999",
                title: "Abura Branch Opening",
                description: "Our first pharmacy opens in Cape Coast",
                image: "/images/timeline/abura-opening.jpg" // Add historical photo
              },
              {
                year: "2005",
                title: "Elmina Expansion",
                description: "Second branch opens to serve Elmina community",
                image: "/images/timeline/elmina-opening.jpg"
              },
              {
                year: "2010",
                title: "Twifo Praso Branch",
                description: "Third location opens in Twifo Praso",
                image: "/images/timeline/twifo-opening.jpg"
              }
            ].map((milestone, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 group hover:shadow-lg transition-all duration-300">
                <div className="w-full h-48 bg-blue-100 rounded-xl mb-4 flex items-center justify-center">
                  <FaClinicMedical className="w-12 h-12 text-blue-600" />
                  {/* Replace with: <img src={milestone.image} alt={milestone.title} className="w-full h-full object-cover rounded-xl" /> */}
                </div>
                <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                <p className="text-gray-600 text-sm">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Showcase Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white relative">
        <MedicalPattern />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <HiBuildingStorefront className="w-4 h-4 mr-2" />
              Store Tour
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">Experience Our Pharmacy</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a virtual tour of our modern, well-stocked pharmacies
            </p>
          </div>

          {/* Store Video Tour */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-blue-200 h-96 flex items-center justify-center">
              <div className="text-center">
                <FaPlay className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <p className="text-blue-700 font-semibold">Store Tour Video</p>
                <p className="text-blue-600">Virtual walkthrough of our facilities</p>
              </div>
              {/* Replace with: */}
              {/* <video 
                className="w-full h-full object-cover"
                controls
                poster="/images/store-tour-poster.jpg"
              >
                <source src="/videos/store-tour.mp4" type="video/mp4" />
              </video> */}
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Modern Healthcare Facilities</h3>
              <p className="text-gray-600 mb-6">
                Explore our state-of-the-art pharmacies equipped with the latest healthcare technology 
                and maintained to the highest standards of cleanliness and organization.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {['Clean Environment', 'Organized Shelves', 'Modern Equipment', 'Friendly Staff'].map((feature, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-3">
                    <div className="text-blue-600 font-semibold text-sm">{feature}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Store Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Pharmacy Interior",
                description: "Spacious and well-organized medicine shelves",
                image: "/images/stores/interior-1.jpg"
              },
              {
                title: "Consultation Area",
                description: "Private space for patient consultations",
                image: "/images/stores/consultation-area.jpg"
              },
              {
                title: "Medicine Storage",
                description: "Temperature-controlled storage facilities",
                image: "/images/stores/storage-area.jpg"
              }
            ].map((photo, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-64 flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300">
                  <FaClinicMedical className="w-12 h-12 text-blue-600" />
                  {/* Replace with: <img src={photo.image} alt={photo.title} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300" /> */}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{photo.title}</h4>
                <p className="text-gray-600 text-sm">{photo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        <MedicalPattern />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <FaUsers className="w-4 h-4 mr-2" />
              Our Team
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">Meet Our Healthcare Professionals</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated experts committed to your health and wellbeing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Pharmacy Manager",
                role: "Lead Pharmacist",
                image: "/images/team/pharmacy-manager.jpg",
                description: "Ensuring quality medication and patient care"
              },
              {
                name: "Healthcare Assistant",
                role: "Patient Support",
                image: "/images/team/healthcare-assistant.jpg",
                description: "Providing personalized customer service"
              },
              {
                name: "Dispensing Technician",
                role: "Medicine Expert",
                image: "/images/team/technician.jpg",
                description: "Accurate medicine preparation and dispensing"
              },
              {
                name: "Customer Care",
                role: "Support Specialist",
                image: "/images/team/customer-care.jpg",
                description: "Assisting with inquiries and orders"
              }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaUserMd className="w-12 h-12 text-blue-600" />
                  {/* Replace with: <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" /> */}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-2">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>

          {/* Team Video */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Behind the Scenes</h3>
                <p className="text-gray-600 mb-6">
                  Get to know our team and see how we work together to provide the best healthcare 
                  services to our community. Our staff are trained professionals dedicated to 
                  excellence in pharmaceutical care.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <FaPlay className="w-4 h-4" />
                  Watch Team Introduction
                </div>
              </div>
              <div className="bg-blue-100 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <FaPlay className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-700 font-semibold">Team Introduction Video</p>
                </div>
                {/* Replace with video component */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials with Photos */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white relative">
        <MedicalPattern />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <FaQuoteLeft className="w-4 h-4 mr-2" />
              Customer Stories
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from people who trust us with their healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Hospital Administrator",
                organization: "Regional Hospital",
                testimonial: "Nat & Sons has been our reliable partner for medical supplies for over 10 years.",
                image: "/images/testimonials/hospital-admin.jpg",
                video: "/videos/testimonials/hospital.mp4"
              },
              {
                name: "Local Retailer",
                organization: "Community Shop",
                testimonial: "Their wholesale service makes it easy to stock quality healthcare products.",
                image: "/images/testimonials/retailer.jpg",
                video: "/videos/testimonials/retailer.mp4"
              },
              {
                name: "Regular Customer",
                organization: "Abura Community",
                testimonial: "Friendly service and expert advice every time I visit.",
                image: "/images/testimonials/customer.jpg",
                video: "/videos/testimonials/customer.mp4"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUserMd className="w-8 h-8 text-blue-600" />
                    {/* Replace with: <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover rounded-full" /> */}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-blue-600 text-sm">{testimonial.organization}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.testimonial}"</p>
                <div className="flex items-center gap-2 text-blue-600 text-sm cursor-pointer">
                  <FaPlay className="w-3 h-3" />
                  Watch video testimonial
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}