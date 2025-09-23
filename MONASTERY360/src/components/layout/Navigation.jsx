import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';
import { useTranslation } from '../../hooks/useTranslation';
import SafeIcon from '../common/SafeIcon';
import LanguageSelector from '../common/LanguageSelector';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiSun, FiMoon, FiHome, FiCompass, FiMap, FiArchive, FiCalendar, FiBookmark, FiUser } = FiIcons;

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('navigation.home'), icon: FiHome },
    { path: '/discover', label: t('navigation.discover'), icon: FiCompass },
    { path: '/map', label: t('navigation.map'), icon: FiMap },
    { path: '/archives', label: t('navigation.archives'), icon: FiArchive },
    { path: '/calendar', label: t('navigation.calendar'), icon: FiCalendar },
    { path: '/booking', label: t('navigation.booking'), icon: FiBookmark },
    { path: '/profile', label: t('navigation.profile'), icon: FiUser },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-monastery-500 to-tibetan-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Monastery360
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-monastery-600 dark:text-monastery-400 bg-monastery-50 dark:bg-monastery-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-monastery-600 dark:hover:text-monastery-400'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Language Selector */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <SafeIcon icon={theme === 'light' ? FiMoon : FiSun} className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-monastery-600 bg-monastery-50 dark:bg-monastery-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-monastery-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navigation;