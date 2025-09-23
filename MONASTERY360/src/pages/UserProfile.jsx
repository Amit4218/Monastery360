import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiSettings, FiBookmark, FiMapPin, FiCalendar, FiEdit, FiMail, FiPhone, FiGlobe } = FiIcons;

function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');

  const user = {
    name: 'Thandup Sherpa',
    email: 'thandupsherpa153@gmail.com',
    phone: '+91 1234567890',
    location: 'Gangtok, Sikkim',
    joinDate: 'January 2024',
    visitedMonasteries: 0,
    savedPlaces: 0,
    upcomingBookings: 0
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'bookings', label: 'Bookings', icon: FiCalendar },
    { id: 'saved', label: 'Saved Places', icon: FiBookmark },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header - Enhanced Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-monastery-600 to-tibetan-gold rounded-full flex items-center justify-center shadow-lg">
              <SafeIcon icon={FiUser} className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h1>
              
              <div className="space-y-1 mb-4">
                <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start space-x-2">
                  <SafeIcon icon={FiMail} className="w-4 h-4" />
                  <span>{user.email}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start space-x-2">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                  <span>{user.location}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Joined {user.joinDate}
                </p>
              </div>
              
              {/* Stats Grid - Responsive */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-4">
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-monastery-600">{user.visitedMonasteries}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Visited</div>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-monastery-600">{user.savedPlaces}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Saved</div>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-monastery-600">{user.upcomingBookings}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
                </div>
              </div>
            </div>
            
            {/* Edit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-monastery-600 hover:bg-monastery-700 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200 shadow-lg"
            >
              <SafeIcon icon={FiEdit} className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Profile</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation - Mobile Horizontal Scroll */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Mobile: Horizontal scroll tabs */}
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-4 sm:px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap lg:w-full ${
                      activeTab === tab.id
                        ? 'text-monastery-600 bg-monastery-50 dark:bg-monastery-900/20 border-r-4 lg:border-r-4 lg:border-b-0 border-monastery-600'
                        : 'text-gray-600 dark:text-gray-400 hover:text-monastery-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              {/* Tab Content */}
              <div className="p-4 sm:p-6">
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue={user.phone}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Location
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent transition-all duration-300">
                          <option>Gangtok, Sikkim</option>
                          <option>Delhi, India</option>
                          <option>Mumbai, India</option>
                          <option>Kolkata, India</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself and your interest in monasteries..."
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent transition-all duration-300 resize-none"
                      />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto bg-monastery-600 hover:bg-monastery-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg"
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                )}

                {activeTab === 'bookings' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center py-12"
                  >
                    <SafeIcon icon={FiCalendar} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Bookings Yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Your tour and homestay bookings will appear here
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-monastery-600 hover:bg-monastery-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                    >
                      Browse Tours
                    </motion.button>
                  </motion.div>
                )}

                {activeTab === 'saved' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center py-12"
                  >
                    <SafeIcon icon={FiBookmark} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Saved Places
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Save monasteries and attractions to view them here
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-monastery-600 hover:bg-monastery-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                    >
                      Discover Monasteries
                    </motion.button>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                      Preferences
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="mb-2 sm:mb-0">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">Email Notifications</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about bookings and events</p>
                        </div>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="mb-2 sm:mb-0">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">SMS Notifications</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Get SMS updates for urgent notifications</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="mb-2 sm:mb-0">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">Marketing Updates</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive newsletters and promotional content</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="mb-2 sm:mb-0">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto bg-monastery-600 hover:bg-monastery-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg"
                    >
                      Save Preferences
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;