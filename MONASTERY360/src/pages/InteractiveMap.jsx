import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import LoadingSpinner from '../components/common/LoadingSpinner';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiNavigation, FiFilter, FiSearch, FiRoute, FiInfo, FiStar, FiZoomIn, FiZoomOut } = FiIcons;

function InteractiveMap() {
  const [loading, setLoading] = useState(true);
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mapView, setMapView] = useState('satellite');
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced monasteries data with exact coordinates
  const monasteries = [
    {
      id: 1,
      name: 'Rumtek Monastery',
      coordinates: { lat: 27.2887, lng: 88.5615 },
      tradition: 'Kagyu',
      rating: 4.8,
      distance: '24 km from Gangtok',
      hasVirtualTour: true,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      description: 'The largest monastery in Sikkim and the main seat of the Karmapa.',
      established: 1966,
      altitude: '1500m'
    },
    {
      id: 2,
      name: 'Enchey Monastery',
      coordinates: { lat: 27.3358, lng: 88.6192 },
      tradition: 'Nyingma',
      rating: 4.6,
      distance: '3 km from Gangtok',
      hasVirtualTour: true,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=200&fit=crop',
      description: 'One of the most important monasteries in Gangtok with stunning valley views.',
      established: 1840,
      altitude: '1800m'
    },
    {
      id: 3,
      name: 'Pemayangtse Monastery',
      coordinates: { lat: 27.3044, lng: 88.2528 },
      tradition: 'Nyingma',
      rating: 4.9,
      distance: '110 km from Gangtok',
      hasVirtualTour: false,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      description: 'One of the oldest and most significant monasteries in Sikkim.',
      established: 1705,
      altitude: '2085m'
    }
  ];

  const [filteredMonasteries, setFilteredMonasteries] = useState(monasteries);

  useEffect(() => {
    // Simulate map loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // Filter monasteries based on search
    const filtered = monasteries.filter(monastery =>
      monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      monastery.tradition.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMonasteries(filtered);
  }, [searchQuery]);

  const handleMonasteryClick = (monastery) => {
    setSelectedMonastery(monastery);
  };

  const getDirections = (monastery) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${monastery.coordinates.lat},${monastery.coordinates.lng}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading interactive map..." />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Map Container */}
      <div className="relative w-full h-full">
        {/* Google Maps Embed */}
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115412.83!2d88.5615!3d27.2887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDE3JzE5LjMiTiA4OMKwMzMnNDEuNCJF!5e1!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin&maptype=${mapView}`}
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Monastery Markers Overlay */}
        {filteredMonasteries.map((monastery, index) => (
          <motion.div
            key={monastery.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${30 + index * 25}%`,
              top: `${40 + index * 15}%`
            }}
            onClick={() => handleMonasteryClick(monastery)}
          >
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 ${
                selectedMonastery?.id === monastery.id 
                  ? 'bg-monastery-600 ring-4 ring-white' 
                  : 'bg-red-500'
              }`}>
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-white" />
              </div>
              
              {/* Pulse Animation */}
              <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25"></div>
              
              {/* Monastery Name Label */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md whitespace-nowrap text-sm font-medium z-20">
                {monastery.name}
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {monastery.tradition} • {monastery.established}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <input
                type="text"
                placeholder="Search monasteries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-monastery-500 bg-transparent w-full sm:w-64"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <SafeIcon icon={FiFilter} className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            <select
              value={mapView}
              onChange={(e) => setMapView(e.target.value)}
              className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md border-none focus:outline-none focus:ring-2 focus:ring-monastery-500"
            >
              <option value="roadmap">Roadmap</option>
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <SafeIcon icon={FiNavigation} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-20 min-w-64"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Filter Monasteries</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tradition
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
                  <option>All Traditions</option>
                  <option>Kagyu</option>
                  <option>Nyingma</option>
                  <option>Gelug</option>
                  <option>Sakya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Distance
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
                  <option>Any Distance</option>
                  <option>Within 10 km</option>
                  <option>Within 50 km</option>
                  <option>Within 100 km</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="virtualTour" className="rounded" />
                <label htmlFor="virtualTour" className="text-sm text-gray-700 dark:text-gray-300">
                  Has Virtual Tour
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Monastery Details Panel */}
        {selectedMonastery && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-0 right-0 w-80 sm:w-96 h-full bg-white dark:bg-gray-800 shadow-lg z-20 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedMonastery.name}
                </h2>
                <button
                  onClick={() => setSelectedMonastery(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </div>

              <img
                src={selectedMonastery.image}
                alt={selectedMonastery.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {selectedMonastery.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tradition:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedMonastery.tradition}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Established:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedMonastery.established}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Altitude:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedMonastery.altitude}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedMonastery.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedMonastery.distance}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Coordinates:</span>
                  <span className="font-medium text-gray-900 dark:text-white text-sm">
                    {selectedMonastery.coordinates.lat.toFixed(4)}°N, {selectedMonastery.coordinates.lng.toFixed(4)}°E
                  </span>
                </div>
              </div>

              {selectedMonastery.hasVirtualTour && (
                <div className="bg-monastery-50 dark:bg-monastery-900/20 p-3 rounded-lg mb-6">
                  <div className="flex items-center space-x-2 text-monastery-700 dark:text-monastery-300">
                    <SafeIcon icon={FiInfo} className="w-4 h-4" />
                    <span className="text-sm font-medium">Virtual Tour Available</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={() => getDirections(selectedMonastery)}
                  className="w-full bg-monastery-600 hover:bg-monastery-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiRoute} className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>

                {selectedMonastery.hasVirtualTour && (
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                    Start Virtual Tour
                  </button>
                )}

                <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-20 sm:bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 z-10">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Monastery</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-monastery-600 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Has Virtual Tour</span>
            </div>
          </div>
        </div>

        {/* Search Results Counter */}
        {searchQuery && (
          <div className="absolute top-20 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 z-10">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredMonasteries.length} results for "{searchQuery}"
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default InteractiveMap;