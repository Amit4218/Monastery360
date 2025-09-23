import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiClock, FiCamera, FiMountain, FiStar } = FiIcons;

function NearbyAttractions() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const attractions = [
    {
      id: 1,
      name: 'Tsomgo Lake',
      category: 'nature',
      distance: '38 km from Gangtok',
      duration: '2 hours',
      rating: 4.7,
      description: 'Sacred glacial lake at 12,313 feet altitude',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      highlights: ['Sacred Lake', 'Yak Rides', 'Mountain Views']
    },
    {
      id: 2,
      name: 'Nathula Pass',
      category: 'historical',
      distance: '56 km from Gangtok',
      duration: '3 hours',
      rating: 4.5,
      description: 'Historic border pass between India and China',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      highlights: ['Border Views', 'Historical Significance', 'Mountain Pass']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Attractions' },
    { id: 'nature', label: 'Natural Sites' },
    { id: 'historical', label: 'Historical Places' },
    { id: 'cultural', label: 'Cultural Sites' }
  ];

  const filteredAttractions = selectedCategory === 'all' 
    ? attractions 
    : attractions.filter(attraction => attraction.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nearby Attractions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover beautiful places near the monasteries
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-800 rounded-lg p-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-monastery-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-monastery-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <LazyLoadImage
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {attraction.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{attraction.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                    <span>{attraction.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
                    <SafeIcon icon={FiClock} className="w-4 h-4" />
                    <span>{attraction.duration}</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {attraction.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {attraction.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-monastery-50 dark:bg-monastery-900/20 text-monastery-700 dark:text-monastery-300 px-2 py-1 rounded text-xs"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-monastery-600 hover:bg-monastery-700 text-white py-2 rounded-lg font-medium transition-colors duration-200">
                  Get Directions
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NearbyAttractions;