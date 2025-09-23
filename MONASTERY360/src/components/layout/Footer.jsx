import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } = FiIcons;

function Footer() {
  const quickLinks = [
    { label: 'About Sikkim', path: '/about' },
    { label: 'Tourism Guidelines', path: '/guidelines' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Help & Support', path: '/support' },
  ];

  const services = [
    { label: 'Virtual Tours', path: '/virtual-tour/1' }, // Fixed path
    { label: 'Audio Guides', path: '/audio-guide' },
    { label: 'Tour Booking', path: '/booking' },
    { label: 'Homestays', path: '/homestays' },
  ];

  const socialLinks = [
    { icon: FiFacebook, url: '#', label: 'Facebook' },
    { icon: FiTwitter, url: '#', label: 'Twitter' },
    { icon: FiInstagram, url: '#', label: 'Instagram' },
    { icon: FiYoutube, url: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-monastery-500 to-tibetan-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">Monastery360</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Preserving and showcasing Sikkim's rich monastic heritage through digital innovation. 
              Discover 200+ monasteries with immersive virtual experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-monastery-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-monastery-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-monastery-400 transition-colors duration-200 text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 text-monastery-400" />
                <span className="text-gray-400 text-sm">
                  Tourism Department, Gangtok, Sikkim
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-4 h-4 text-monastery-400" />
                <span className="text-gray-400 text-sm">+91-3592-202688</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="w-4 h-4 text-monastery-400" />
                <span className="text-gray-400 text-sm">info@monastery360.sikkim.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Monastery360. Developed in partnership with Sikkim Tourism Department.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-monastery-400 transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-monastery-400 transition-colors duration-200 text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/accessibility"
              className="text-gray-400 hover:text-monastery-400 transition-colors duration-200 text-sm"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;