import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiWifi, FiCoffee, FiCar, FiStar, FiMapPin } = FiIcons;

function HomestayBookings() {
  const [selectedHomestay, setSelectedHomestay] = useState(null);

  const homestays = [
    {
      id: 1,
      name: 'Himalayan Heritage Home',
      location: 'Near Rumtek Monastery',
      distance: '2 km from monastery',
      price: '₹1,500',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      amenities: ['Free WiFi', 'Breakfast', 'Parking', 'Mountain View'],
      host: 'Pemba Sherpa'
    },
    {
      id: 2,
      name: 'Monastery View Cottage',
      location: 'Enchey Area',
      distance: '500m from monastery',
      price: '₹2,200',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      amenities: ['Free WiFi', 'All Meals', 'Garden', 'Cultural Programs'],
      host: 'Dolma Bhutia'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Monastery Homestays
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experience authentic Sikkimese culture with local families
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {homestays.map((homestay, index) => (
            <motion.div
              key={homestay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <LazyLoadImage
                src={homestay.image}
                alt={homestay.name}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {homestay.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{homestay.rating}</span>
                    <span className="text-xs text-gray-500">({homestay.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 mb-3">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                  <span className="text-sm">{homestay.location} • {homestay.distance}</span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Hosted by {homestay.host}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {homestay.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="bg-monastery-50 dark:bg-monastery-900/20 text-monastery-700 dark:text-monastery-300 px-2 py-1 rounded text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-monastery-600">
                    {homestay.price}
                    <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                      /night
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedHomestay(homestay)}
                    className="bg-monastery-600 hover:bg-monastery-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Book Stay
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Form Modal */}
        {selectedHomestay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Book {selectedHomestay.name}
              </h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Check-in"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="date"
                    placeholder="Check-out"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Number of guests</option>
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4+ guests</option>
                </select>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </form>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setSelectedHomestay(null)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-monastery-600 hover:bg-monastery-700 text-white py-2 rounded-lg font-medium">
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomestayBookings;