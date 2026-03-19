import React from 'react';
import { Link } from 'react-router-dom';
import natlogo from '../assets/Original-logo.png';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      hoverColor: 'hover:bg-[#1877f2]',
      bgColor: 'bg-[#1877f2]'
    },
    { 
      name: 'X (Twitter)', 
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      hoverColor: 'hover:bg-black',
      bgColor: 'bg-black'
    },
    { 
      name: 'Instagram', 
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      hoverColor: 'hover:bg-[#e4405f]',
      bgColor: 'bg-[#e4405f]'
    },
    { 
      name: 'LinkedIn', 
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
      hoverColor: 'hover:bg-[#0077b5]',
      bgColor: 'bg-[#0077b5]'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Healthcare Products', path: '/healthcare-products' },
    { name: 'Vitamins & Supplements', path: '/vitamins' },
    { name: 'Medical Equipment', path: '/medical-equipment' },
    { name: 'Health Articles', path: '/health-articles' },
  ];

  const services = [
    { name: 'Prescription Services', path: '/prescription-services' },
    { name: 'Health Consultation', path: '/health-consultation' },
    { name: 'Medical Supplies', path: '/medical-supplies' },
    { name: 'Personal Care Products', path: '/personal-care' },
    { name: 'Baby Care Products', path: '/baby-care' },
  ];

  const contactInfo = [
    { 
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      text: 'Abura Road, Cape Coast, Ghana',
      isMultiLine: true
    },
    { 
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      text: '+233 20 813 8549'
    },
    { 
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      text: 'natandsons@yahoo.com'
    },
    { 
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      text: 'Mon - Sun: 7:00 AM - 10:00 PM'
    }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-blue-800 to-blue-900">
        {/* Animated overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
        </div>
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              y: [null, '-20%'],
              x: [null, (Math.random() - 0.5) * 20 + '%'],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info - Larger on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="flex items-center space-x-4 mb-6">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="flex items-center justify-center bg-white rounded-xl p-2 shadow-2xl"
              >
                <img 
                  src={natlogo} 
                  alt="Nat & Sons Pharmacy Logo" 
                  className="h-14 w-auto object-contain" 
                />
              </motion.div>
              <div>
                <motion.h3 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-white"
                >
                  Nat & Sons
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-blue-200 text-sm"
                >
                  Pharmacy & Healthcare
                </motion.p>
              </div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-blue-100 mb-6 leading-relaxed"
            >
              Your trusted partner in healthcare. Providing quality medical supplies, 
              vitamins, and healthcare products to the Ghanaian community with 
              professionalism and care.
            </motion.p>

            {/* Social Links with hover effects */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex space-x-3"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm 
                           flex items-center justify-center transition-all duration-300
                           hover:bg-white/20`}
                >
                  <svg 
                    className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon}/>
                  </svg>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                                 bg-gray-900 text-white text-xs py-1 px-2 rounded 
                                 opacity-0 group-hover:opacity-100 transition-opacity 
                                 whitespace-nowrap">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Quick Links
              <motion.div 
                className="absolute -bottom-2 left-0 h-0.5 bg-blue-300 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-blue-100 hover:text-white transition-all duration-300 
                             flex items-center group"
                  >
                    <span className="transform transition-transform group-hover:translate-x-2">
                      {link.name}
                    </span>
                    <motion.span 
                      className="ml-2 opacity-0 group-hover:opacity-100"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Our Services
              <motion.div 
                className="absolute -bottom-2 left-0 h-0.5 bg-blue-300 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link 
                    to={service.path} 
                    className="text-blue-100 hover:text-white transition-all duration-300 
                             flex items-center group"
                  >
                    <span className="transform transition-transform group-hover:translate-x-2">
                      {service.name}
                    </span>
                    <motion.span 
                      className="ml-2 opacity-0 group-hover:opacity-100"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Contact Us
              <motion.div 
                className="absolute -bottom-2 left-0 h-0.5 bg-blue-300 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-3 group"
                >
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm 
                                  flex items-center justify-center group-hover:bg-white/20 
                                  transition-all duration-300 group-hover:scale-110">
                      <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                  </div>
                  <div>
                    {item.isMultiLine ? (
                      <span className="text-blue-100">
                        Abura Road<br />
                        Cape Coast, Ghana
                      </span>
                    ) : (
                      <span className="text-blue-100">{item.text}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 border-t border-white/10 bg-blue-950/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-blue-200 text-sm mb-4 md:mb-0"
            >
              © {currentYear} Nat & Sons Pharmacy. All rights reserved. 
              <span className="hidden md:inline mx-2">|</span>
              <br className="md:hidden" />
              <span className="text-blue-300">Your Health, Our Priority</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex space-x-6 text-sm"
            >
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item, index) => (
                <Link 
                  key={item}
                  to="#" 
                  className="text-blue-200 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 
                                 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Decorative wave at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-blue-300 to-transparent"></div>
    </footer>
  );
}