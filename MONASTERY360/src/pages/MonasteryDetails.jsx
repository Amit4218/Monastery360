import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SafeIcon from '../components/common/SafeIcon';
import LoadingSpinner from '../components/common/LoadingSpinner';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiClock, FiStar, FiPlay, FiHeadphones, FiCalendar, FiHome, FiCamera, FiInfo } = FiIcons;

function MonasteryDetails() {
  const { id } = useParams();
  const [monastery, setMonastery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API
  const mockMonastery = {
    id: parseInt(id),
    name: 'Rumtek Monastery',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    ],
    tradition: 'Kagyu',
    district: 'East Sikkim',
    established: 1966,
    altitude: '1500m',
    coordinates: { lat: 27.3389, lng: 88.5678 },
    distance: '24 km from Gangtok',
    rating: 4.8,
    reviews: 324,
    hasVirtualTour: true,
    hasAudioGuide: true,
    accessibility: 'Easy',
    description: 'Rumtek Monastery, also called the Dharmachakra Centre, is a gompa located in the Indian state of Sikkim near the capital Gangtok. It is the largest monastery in Sikkim and is the main seat of the Karmapa.',
    history: 'The monastery was built under the direction of the 16th Karmapa, Rangjung Rigpe Dorje in the 1960s. The monastery is built in the traditional Tibetan architectural style, although it also has some aspects of Sikkimese and Chinese architecture.',
    significance: 'Rumtek serves as the main seat of the Karma Kagyu lineage and is home to the Karmapa, one of the most important figures in Tibetan Buddhism.',
    timings: {
      opening: '6:00 AM',
      closing: '6:00 PM',
      prayerTimes: ['6:00 AM', '12:00 PM', '6:00 PM']
    },
    festivals: [
      { name: 'Losar', date: 'February', description: 'Tibetan New Year celebration' },
      { name: 'Buddha Purnima', date: 'May', description: 'Buddha\'s birthday celebration' },
      { name: 'Saga Dawa', date: 'June', description: 'Month of merit celebration' }
    ],
    nearbyStays: [
      { name: 'Monastery Guest House', distance: '0.5 km', rating: 4.2 },
      { name: 'Rumtek Retreat', distance: '1 km', rating: 4.5 },
      { name: 'Himalayan Homestay', distance: '2 km', rating: 4.0 }
    ],
    facilities: ['Parking', 'Restrooms', 'Gift Shop', 'Meditation Hall', 'Library'],
    rules: [
      'Maintain silence in prayer halls',
      'Remove shoes before entering',
      'No photography inside main hall',
      'Dress modestly',
      'Follow the guided path'
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMonastery(mockMonastery);
      setLoading(false);
    }, 1000);
  }, [id]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiInfo },
    { id: 'history', label: 'History', icon: FiClock },
    { id: 'festivals', label: 'Festivals', icon: FiCalendar },
    { id: 'visit', label: 'Visit Info', icon: FiMapPin },
    { id: 'gallery', label: 'Gallery', icon: FiCamera }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading monastery details..." />
      </div>
    );
  }

  if (!monastery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Monastery not found
          </h2>
          <Link
            to="/discover"
            className="bg-monastery-600 hover:bg-monastery-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Discovery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyLoadImage
          src={monastery.image}
          alt={monastery.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-8 left-8 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-2"
          >
            {monastery.name}
          </motion.h1>
          <div className="flex items-center space-x-4 text-lg">
            <span>{monastery.tradition}</span>
            <span>•</span>
            <span>{monastery.district}</span>
            <span>•</span>
            <span>Est. {monastery.established}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute bottom-8 right-8 flex space-x-4">
          {monastery.hasVirtualTour && (
            <Link
              to={`/virtual-tour/${monastery.id}`}
              className="bg-monastery-600 hover:bg-monastery-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <SafeIcon icon={FiPlay} className="w-5 h-5" />
              <span>Virtual Tour</span>
            </Link>
          )}
          {monastery.hasAudioGuide && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <SafeIcon icon={FiHeadphones} className="w-5 h-5" />
              <span>Audio Guide</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <SafeIcon icon={FiStar} className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{monastery.rating}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{monastery.reviews} reviews</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <SafeIcon icon={FiMapPin} className="w-8 h-8 text-monastery-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{monastery.altitude}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Altitude</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <SafeIcon icon={FiClock} className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{monastery.accessibility}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Accessibility</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <SafeIcon icon={FiHome} className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{monastery.nearbyStays.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Nearby Stays</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-monastery-600 border-b-2 border-monastery-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-monastery-600'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    About {monastery.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {monastery.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Facilities
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {monastery.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="bg-monastery-50 dark:bg-monastery-900/20 text-monastery-700 dark:text-monastery-300 px-3 py-1 rounded-full text-sm"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Historical Background
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {monastery.history}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Religious Significance
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {monastery.significance}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'festivals' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Annual Festivals & Celebrations
                </h3>
                {monastery.festivals.map((festival, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {festival.name}
                      </h4>
                      <span className="bg-monastery-600 text-white px-3 py-1 rounded-full text-sm">
                        {festival.date}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {festival.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'visit' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Opening Hours
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Opening:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {monastery.timings.opening}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Closing:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {monastery.timings.closing}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Prayer Times
                    </h4>
                    <div className="space-y-2">
                      {monastery.timings.prayerTimes.map((time, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <SafeIcon icon={FiClock} className="w-4 h-4 text-monastery-600" />
                          <span className="text-gray-900 dark:text-white">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Visitor Guidelines
                  </h4>
                  <ul className="space-y-2">
                    {monastery.rules.map((rule, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-monastery-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Photo Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {monastery.gallery.map((image, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-lg">
                      <LazyLoadImage
                        src={image}
                        alt={`${monastery.name} - Image ${index + 1}`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonasteryDetails;