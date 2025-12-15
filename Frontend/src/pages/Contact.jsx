import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
  FaEnvelopeOpen,
  FaComment
} from 'react-icons/fa';
import contactImage from '../assets/contact.jpg'; // Update this path according to your folder structure

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Ghana pharmacy branches
  const branches = [
    {
      id: 1,
      name: "Abura Branch",
      address: "Abura, Central Region, Cape Coast",
      phone: "+233 50 345 8772",
      whatsapp: "+233209468565",
      email: "natandsons@yahoo.com",
      hours: "Mon-Fri: 8:00 AM - 8:00 PM\nSat: 9:00 AM - 6:00 PM\nSun: 10:00 AM - 4:00 PM"
    },
    {
      id: 2,
      name: "Elmina Branch",
      address: "Elmina, Central Region, Cape Coast",
      phone: "+233 50 345 8772",
      whatsapp: "+233209468565",
      email: " natandsons@yahoo.com",
      hours: "Mon-Fri: 7:30 AM - 9:00 PM\nSat: 8:00 AM - 7:00 PM\nSun: 10:00 AM - 5:00 PM"
    },
    {
      id: 3,
      name: "Twifo Praso Branch",
      address: "Twifo Praso, Central Region, Cape Coast",
      phone: "+233 50 345 8772",
      whatsapp: "+233209468565",
      email: " natandsons@yahoo.com",
      hours: "Mon-Fri: 8:00 AM - 8:00 PM\nSat: 9:00 AM - 6:00 PM\nSun: 11:00 AM - 3:00 PM"
    }
  ];

  const departments = [
    {
      icon: <FaEnvelopeOpen className="w-6 h-6" />,
      title: "General Inquiries",
      email: " natandsons@yahoo.com",
      description: "For general questions about our services and products"
    },
    {
      icon: <FaUser className="w-6 h-6" />,
      title: "Customer Support",
      email: "natandsons@yahoo.com",
      description: "Assistance with orders, deliveries, and account issues"
    },
    {
      icon: <FaComment className="w-6 h-6" />,
      title: "Medical Questions",
      email: "natandsons@yahoo.com",
      description: "Consult our pharmacists for medication-related questions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Contact Image */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={contactImage} 
            alt="Contact Us Background - Nat and Sons Pharmacy"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/70"></div>
          {/* Secondary Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Get in Touch With Us
              <span className="block text-cyan-200 mt-2">We're Here to Help</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Reach out to any of our three locations across Ghana. 
              <br />Our team is ready to assist with your healthcare needs.
            </p>
            
            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.a
                href="https://wa.me/233209468565"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <FaWhatsapp className="mr-3 text-xl" />
                Chat on WhatsApp
              </motion.a>
              
              <motion.a
                href="tel:+233551234567"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-bold transition-all border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
              >
                <FaPhoneAlt className="mr-3 text-xl" />
                Call Now
              </motion.a>

              <motion.a
                href="#contact-form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <FaEnvelope className="mr-3 text-xl" />
                Send Email
              </motion.a>
            </div>

            {/* Contact Info Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-3">
                  <FaPhoneAlt />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Phone Support</h3>
                <p className="text-white/80">24/7 Available</p>
                <a href="tel:+233209468565" className="text-cyan-200 font-bold hover:text-cyan-100">
                +233 50 345 8772
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-3">
                  <FaWhatsapp />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-white/80">Instant Response</p>
                <a 
                  href="https://wa.me/233209468565" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-200 font-bold hover:text-cyan-100"
                >
                  Start Chat
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl text-white mb-3">
                  <FaEnvelope />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                <p className="text-white/80">Within 24 Hours</p>
                <a href="mailto:info@natandsonspharmacy.com" className="text-cyan-200 font-bold hover:text-cyan-100">
                natandsons@yahoo.com 
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Our Locations in Ghana
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit any of our conveniently located pharmacies across Accra and Tema
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl text-white mr-4">
                      <FaMapMarkerAlt className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{branch.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">Branch {branch.id}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">{branch.address}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <FaClock className="text-green-500 mr-3 flex-shrink-0" />
                      <div>
                        {branch.hours.split('\n').map((line, i) => (
                          <p key={i} className="text-gray-600 text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {/* WhatsApp Button */}
                    <motion.a
                      href={`https://wa.me/${branch.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center">
                        <FaWhatsapp className="mr-3 text-green-600" />
                        <span className="font-medium">WhatsApp</span>
                      </div>
                      <span className="text-sm opacity-75 group-hover:opacity-100">Tap to chat</span>
                    </motion.a>

                    {/* Phone Button */}
                    <motion.a
                      href={`tel:${branch.phone}`}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center">
                        <FaPhoneAlt className="mr-3 text-blue-600" />
                        <span className="font-medium">Call</span>
                      </div>
                      <span className="text-sm opacity-75 group-hover:opacity-100">{branch.phone}</span>
                    </motion.a>

                    {/* Email Button */}
                    <motion.a
                      href={`mailto:${branch.email}`}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center">
                        <FaEnvelope className="mr-3 text-purple-600" />
                        <span className="font-medium">Email</span>
                      </div>
                      <span className="text-sm opacity-75 group-hover:opacity-100">Send message</span>
                    </motion.a>
                  </div>

                  <motion.a
                    href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="block w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-center py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                  >
                    Get Directions
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Departments */}
      <section id="contact-form" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Have questions or need assistance? Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
                      placeholder="John Mensah"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
                      placeholder="+233 55 123 4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300 bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="prescription">Prescription Inquiry</option>
                      <option value="delivery">Delivery Service</option>
                      <option value="products">Product Availability</option>
                      <option value="pharmacist">Pharmacist Consultation</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none hover:border-blue-300"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center"
                  >
                    <FaCheckCircle className="text-green-500 mr-3 text-xl" />
                    <div>
                      <div className="font-bold text-green-800">Message Sent Successfully!</div>
                      <div className="text-green-600 text-sm">We'll get back to you within 24 hours.</div>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center shadow-md hover:shadow-lg ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-3" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Departments & Info */}
            <div>
              <div className="mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Contact Specific Departments
                </h2>
                <p className="text-gray-600">
                  For faster service, contact the appropriate department directly.
                </p>
              </div>

              <div className="space-y-6 mb-12">
                {departments.map((dept, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-cyan-50 rounded-xl p-6 transition-all border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-lg mr-4 shadow-sm">
                        <div className="text-blue-600">{dept.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{dept.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{dept.description}</p>
                        <motion.a
                          href={`mailto:${dept.email}`}
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                        >
                          <FaEnvelope className="mr-2 transition-transform group-hover:scale-110" />
                          {dept.email}
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Emergency Information */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100 shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="bg-gradient-to-br from-red-500 to-orange-400 p-3 rounded-full text-white mr-4">
                    <FaExclamationCircle className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Emergency Contact</h3>
                    <p className="text-gray-600 mb-4">
                      For medical emergencies, please contact emergency services immediately.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-red-100 hover:border-red-200 transition-colors">
                    <div className="font-medium text-gray-800">Ghana Emergency Services</div>
                    <a href="tel:999" className="text-red-600 font-bold hover:text-red-700">
                      911
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-blue-100 hover:border-blue-200 transition-colors">
                    <div className="font-medium text-gray-800">24/7 Pharmacy Hotline</div>
                    <a href="tel:+233302000000" className="text-blue-600 font-bold hover:text-blue-700">
                    +233 50 345 8772
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Newsletter */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h3>
              <p className="text-gray-600 mb-8">
                Follow us on social media for health tips, updates, and promotions.
              </p>
              
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebookF />, color: 'bg-blue-600 hover:bg-blue-700', label: 'Facebook', href: '#' },
                  { icon: <FaTwitter />, color: 'bg-sky-500 hover:bg-sky-600', label: 'Twitter', href: '#' },
                  { icon: <FaInstagram />, color: 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600', label: 'Instagram', href: '#' },
                  { icon: <FaWhatsapp />, color: 'bg-green-500 hover:bg-green-600', label: 'WhatsApp', href: 'https://wa.me/233209468565' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.includes('wa.me') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${social.color} text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Stay Updated</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for health tips and exclusive offers.
              </p>
              
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-300"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-r-lg font-bold transition-all shadow-md hover:shadow-lg"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Find Us on the Map
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All our locations are easily accessible with ample parking space
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg">
            {/* Map Placeholder - In reality, you'd embed Google Maps */}
            <div className="h-[400px] bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              {/* Map marker animations */}
              {branches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  className="absolute"
                  style={{
                    left: `${30 + index * 30}%`,
                    top: '50%',
                  }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold">
                      {branch.id}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-lg text-sm font-medium text-gray-700">
                      {branch.name}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div className="text-center">
                <div className="text-5xl mb-4 text-blue-200">📍</div>
                <div className="text-gray-600 font-medium">Interactive Map Coming Soon</div>
                <p className="text-gray-500 text-sm mt-2">Real-time directions will be available here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Footer */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">Need Help Now?</div>
              <a href="tel:+233551234567" className="text-xl font-bold hover:text-cyan-200 transition-colors">
                +233 55 123 4567
              </a>
            </div>
            
            <div>
              <div className="text-2xl font-bold mb-2">WhatsApp Support</div>
              <a 
                href="https://wa.me/233209468565" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                <FaWhatsapp className="mr-2" />
                Start Chat
              </a>
            </div>
            
            <div>
              <div className="text-2xl font-bold mb-2">Email Response Time</div>
              <div className="text-cyan-200 font-bold">Within 24 Hours</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}