import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiUsers, FiClock, FiMapPin, FiStar, FiCar, FiUser, FiPhone, FiMail, FiCheck, FiArrowRight } = FiIcons;

function TourBooking() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedCab, setSelectedCab] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    tour: null,
    cab: null,
    guide: null,
    date: '',
    guests: 1,
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    }
  });

  // Enhanced tour packages
  const tours = [
    {
      id: 1,
      name: 'Sacred Monasteries Heritage Tour',
      duration: '8 hours',
      price: 2500,
      originalPrice: 3200,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      includes: ['Professional Guide', 'Transportation', 'Lunch', 'Entry Fees', 'Photography Permits'],
      monasteries: ['Rumtek', 'Enchey', 'Do-drul Chorten'],
      highlights: ['Ancient Architecture', 'Spiritual Experience', 'Cultural Insights'],
      description: 'Immerse yourself in the spiritual heart of Sikkim with visits to the most significant monasteries.',
      difficulty: 'Easy',
      groupSize: '2-15 people'
    },
    {
      id: 2,
      name: 'Spiritual Retreat Weekend',
      duration: '2 days',
      price: 8000,
      originalPrice: 10000,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
      includes: ['Luxury Accommodation', 'All Meals', 'Meditation Sessions', 'Yoga Classes', 'Guide', 'Airport Transfer'],
      monasteries: ['Pemayangtse', 'Tashiding', 'Dubdi'],
      highlights: ['Meditation Retreat', 'Mountain Views', 'Organic Meals'],
      description: 'A transformative spiritual journey combining monastery visits with meditation and yoga practices.',
      difficulty: 'Moderate',
      groupSize: '4-12 people'
    },
    {
      id: 3,
      name: 'Photography Expedition',
      duration: '3 days',
      price: 12000,
      originalPrice: 15000,
      rating: 4.7,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      includes: ['Photography Guide', 'Equipment Rental', 'Accommodation', 'All Meals', 'Permits', 'Post-processing Workshop'],
      monasteries: ['Rumtek', 'Enchey', 'Pemayangtse', 'Tashiding'],
      highlights: ['Golden Hour Shoots', 'Cultural Documentation', 'Professional Tips'],
      description: 'Capture the essence of Sikkimese Buddhism through your lens with expert photography guidance.',
      difficulty: 'Moderate',
      groupSize: '3-8 people'
    }
  ];

  // Cab options
  const cabOptions = [
    {
      id: 1,
      type: 'Sedan',
      model: 'Toyota Etios',
      capacity: '4 passengers',
      pricePerKm: 12,
      basePrice: 1500,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
      features: ['AC', 'Music System', 'GPS'],
      driver: 'Experienced Local Driver'
    },
    {
      id: 2,
      type: 'SUV',
      model: 'Mahindra Scorpio',
      capacity: '7 passengers',
      pricePerKm: 18,
      basePrice: 2200,
      image: 'https://images.unsplash.com/photo-1494976688153-ca3ce29d8df8?w=400&h=300&fit=crop',
      features: ['AC', 'Music System', 'GPS', 'Extra Luggage Space'],
      driver: 'Professional Mountain Driver'
    },
    {
      id: 3,
      type: 'Luxury',
      model: 'Toyota Innova Crysta',
      capacity: '6 passengers',
      pricePerKm: 25,
      basePrice: 3000,
      image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400&h=300&fit=crop',
      features: ['Premium AC', 'Entertainment System', 'GPS', 'Comfortable Seating', 'WiFi'],
      driver: 'Premium Service Driver'
    }
  ];

  // Guide options
  const guides = [
    {
      id: 1,
      name: 'Tenzin Norbu',
      experience: '8 years',
      languages: ['English', 'Hindi', 'Tibetan', 'Nepali'],
      specialization: 'Buddhist Culture & History',
      rating: 4.9,
      reviews: 156,
      price: 1500,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      description: 'Expert in Tibetan Buddhism with deep knowledge of monastery history and spiritual practices.',
      certifications: ['Licensed Tour Guide', 'Buddhist Studies Certificate']
    },
    {
      id: 2,
      name: 'Pemba Sherpa',
      experience: '12 years',
      languages: ['English', 'Hindi', 'Sherpa', 'Nepali'],
      specialization: 'Mountain Culture & Trekking',
      rating: 4.8,
      reviews: 203,
      price: 1800,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      description: 'Mountaineer turned cultural guide with extensive knowledge of Himalayan traditions.',
      certifications: ['Licensed Tour Guide', 'Wilderness First Aid']
    },
    {
      id: 3,
      name: 'Dolma Bhutia',
      experience: '6 years',
      languages: ['English', 'Hindi', 'Bhutia', 'Lepcha'],
      specialization: 'Local Traditions & Photography',
      rating: 4.9,
      reviews: 98,
      price: 1600,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop',
      description: 'Cultural expert specializing in local traditions, festivals, and photography spots.',
      certifications: ['Licensed Tour Guide', 'Photography Instructor']
    }
  ];

  const handleBookingSubmit = () => {
    // Process booking
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    setSelectedTour(null);
    setBookingStep(1);
    setBookingData({
      tour: null,
      cab: null,
      guide: null,
      date: '',
      guests: 1,
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        specialRequests: ''
      }
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (bookingData.tour) total += bookingData.tour.price;
    if (bookingData.cab) total += bookingData.cab.basePrice;
    if (bookingData.guide) total += bookingData.guide.price;
    return total * bookingData.guests;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-monastery-50 via-white to-purple-50 dark:from-monastery-900 dark:via-gray-900 dark:to-purple-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-tibetan-gold to-monastery-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <SafeIcon icon={FiCalendar} className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-monastery-600 via-tibetan-gold to-monastery-600 bg-clip-text text-transparent mb-4">
            Book Your Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create your perfect monastery exploration experience with our curated tours, transportation, and expert guides
          </p>
        </motion.div>

        {/* Tour Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save ₹{tour.originalPrice - tour.price}
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-lg text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                  <span>{tour.rating}</span>
                  <span>({tour.reviews})</span>
                </div>
                
                {/* Difficulty Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-lg px-3 py-1 rounded-full text-sm font-medium">
                  {tour.difficulty}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-monastery-600 transition-colors duration-300">
                  {tour.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {tour.description}
                </p>

                {/* Tour Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <SafeIcon icon={FiClock} className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <SafeIcon icon={FiUsers} className="w-4 h-4" />
                    <span>{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                    <span>{tour.monasteries.join(', ')}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-monastery-50 dark:bg-monastery-900/20 text-monastery-700 dark:text-monastery-300 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-gray-400 line-through text-sm">₹{tour.originalPrice.toLocaleString()}</span>
                    <div className="text-3xl font-bold text-monastery-600">
                      ₹{tour.price.toLocaleString()}
                      <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                        /person
                      </span>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedTour(tour);
                    setBookingData(prev => ({ ...prev, tour }));
                  }}
                  className="w-full bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Book This Tour</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Modal */}
        <AnimatePresence>
          {selectedTour && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedTour(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Progress Indicator */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-center space-x-4 mb-4">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center">
                        <motion.div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                            bookingStep >= step 
                              ? 'bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white' 
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                          }`}
                          animate={{
                            scale: bookingStep === step ? 1.1 : 1,
                          }}
                        >
                          {bookingStep > step ? <SafeIcon icon={FiCheck} className="w-5 h-5" /> : step}
                        </motion.div>
                        {step < 4 && (
                          <div className={`w-12 h-1 mx-2 ${
                            bookingStep > step ? 'bg-monastery-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {bookingStep === 1 && 'Select Transportation'}
                      {bookingStep === 2 && 'Choose Your Guide'}
                      {bookingStep === 3 && 'Personal Information'}
                      {bookingStep === 4 && 'Confirm Booking'}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Transportation */}
                    {bookingStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                      >
                        <h4 className="text-xl font-semibold mb-4">Choose Your Transportation</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {cabOptions.map((cab) => (
                            <motion.div
                              key={cab.id}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => {
                                setSelectedCab(cab);
                                setBookingData(prev => ({ ...prev, cab }));
                              }}
                              className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                                selectedCab?.id === cab.id
                                  ? 'border-monastery-600 bg-monastery-50 dark:bg-monastery-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-monastery-400'
                              }`}
                            >
                              <img src={cab.image} alt={cab.model} className="w-full h-32 object-cover rounded-lg mb-3" />
                              <h5 className="font-semibold text-gray-900 dark:text-white">{cab.type}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{cab.model}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{cab.capacity}</p>
                              <div className="text-lg font-bold text-monastery-600">₹{cab.basePrice}</div>
                              <p className="text-xs text-gray-500">+ ₹{cab.pricePerKm}/km</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Guide Selection */}
                    {bookingStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                      >
                        <h4 className="text-xl font-semibold mb-4">Select Your Guide</h4>
                        <div className="space-y-4">
                          {guides.map((guide) => (
                            <motion.div
                              key={guide.id}
                              whileHover={{ scale: 1.01 }}
                              onClick={() => {
                                setSelectedGuide(guide);
                                setBookingData(prev => ({ ...prev, guide }));
                              }}
                              className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                                selectedGuide?.id === guide.id
                                  ? 'border-monastery-600 bg-monastery-50 dark:bg-monastery-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-monastery-400'
                              }`}
                            >
                              <img src={guide.image} alt={guide.name} className="w-16 h-16 rounded-full mr-4" />
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 dark:text-white">{guide.name}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{guide.specialization}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{guide.experience} experience</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                                  <span className="text-sm">{guide.rating} ({guide.reviews} reviews)</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-monastery-600">₹{guide.price}</div>
                                <p className="text-xs text-gray-500">per day</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Personal Information */}
                    {bookingStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                      >
                        <h4 className="text-xl font-semibold mb-4">Your Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Tour Date</label>
                            <input
                              type="date"
                              value={bookingData.date}
                              onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Number of Guests</label>
                            <select
                              value={bookingData.guests}
                              onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                              type="text"
                              value={bookingData.personalInfo.name}
                              onChange={(e) => setBookingData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, name: e.target.value }
                              }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                              type="email"
                              value={bookingData.personalInfo.email}
                              onChange={(e) => setBookingData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, email: e.target.value }
                              }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <input
                              type="tel"
                              value={bookingData.personalInfo.phone}
                              onChange={(e) => setBookingData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, phone: e.target.value }
                              }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Enter your phone number"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                            <textarea
                              value={bookingData.personalInfo.specialRequests}
                              onChange={(e) => setBookingData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, specialRequests: e.target.value }
                              }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Any special requirements or requests..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Confirmation */}
                    {bookingStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                      >
                        <h4 className="text-xl font-semibold mb-4">Confirm Your Booking</h4>
                        
                        {/* Booking Summary */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Tour Package:</span>
                            <span>{bookingData.tour?.name}</span>
                          </div>
                          {bookingData.cab && (
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Transportation:</span>
                              <span>{bookingData.cab.type} - {bookingData.cab.model}</span>
                            </div>
                          )}
                          {bookingData.guide && (
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Guide:</span>
                              <span>{bookingData.guide.name}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Date:</span>
                            <span>{new Date(bookingData.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Guests:</span>
                            <span>{bookingData.guests}</span>
                          </div>
                          <hr className="border-gray-300 dark:border-gray-600" />
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total Amount:</span>
                            <span className="text-monastery-600">₹{calculateTotalPrice().toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-4">
                      {bookingStep > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setBookingStep(bookingStep - 1)}
                          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Previous
                        </motion.button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTour(null)}
                        className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (bookingStep < 4) {
                          setBookingStep(bookingStep + 1);
                        } else {
                          handleBookingSubmit();
                        }
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>{bookingStep === 4 ? 'Confirm Booking' : 'Continue'}</span>
                      <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TourBooking;