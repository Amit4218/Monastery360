import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMonasteryStore } from "../store/monasteryStore";
import SafeIcon from "../components/common/SafeIcon";
import LoadingSpinner from "../components/common/LoadingSpinner";
import * as FiIcons from "react-icons/fi";

const {
  FiSearch,
  FiFilter,
  FiMapPin,
  FiStar,
  FiPlay,
  FiHeadphones,
  FiCalendar,
  FiUsers,
} = FiIcons;

function MonasteryDiscovery() {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const {
    monasteries,
    searchQuery,
    filters,
    loading,
    setSearchQuery,
    setFilters,
    getFilteredMonasteries,
  } = useMonasteryStore();

  // Mock data - in real app, this would come from API
  const mockMonasteries = [
    {
      id: 1,
      name: "Lingdum Monastery ",
      virtualTourId: "68cffb442021a246b1906045",
      image:
        "https://imgs.search.brave.com/CfJbAAPcfGHcKEUIEQPhfi9pQc0-me8RG2BFo5opqlM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLW8v/MTcvZmYvYmQvMDcv/bGluZ2R1bS1tb25h/c3RlcnktcmFua2Eu/anBn",
      tradition: "Zurmang Kagyu",
      district: "East Sikkim",
      established: 1999,
      altitude: "1500m",
      distance: "15 km from Gangtok",
      rating: 4.8,
      reviews: 324,
      hasVirtualTour: true,
      hasAudioGuide: true,

      description:
        "The largest monastery in Sikkim and the main seat of the Karmapa.",
      highlights: ["Golden Stupa", "Prayer Wheels", "Monastery Museum"],
      upcomingFestivals: ["Losar", "Buddha Purnima"],
    },
    {
      id: 2,
      name: "Enchey Monastery",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
      tradition: "Nyingma",
      district: "East Sikkim",
      established: 1840,
      altitude: "1800m",
      distance: "3 km from Gangtok",
      rating: 4.6,
      reviews: 198,
      hasVirtualTour: true,
      hasAudioGuide: true,

      description:
        "One of the most important monasteries in Gangtok with stunning valley views.",
      highlights: ["Ancient Murals", "Prayer Hall", "Mountain Views"],
      upcomingFestivals: ["Cham Dance"],
    },
    {
      id: 3,
      name: "Pemayangtse Monastery",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tradition: "Nyingma",
      district: "West Sikkim",
      established: 1705,
      altitude: "2085m",
      distance: "110 km from Gangtok",
      rating: 4.9,
      reviews: 412,
      hasVirtualTour: false,
      hasAudioGuide: true,

      description:
        "One of the oldest and most significant monasteries in Sikkim.",
      highlights: ["Wooden Sculptures", "Ancient Texts", "Himalayan Views"],
      upcomingFestivals: ["Chaang Lo"],
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      useMonasteryStore.setState({
        monasteries: mockMonasteries,
        loading: false,
      });
    }, 1000);
  }, []);

  const filteredMonasteries = getFilteredMonasteries();

  const districts = [
    "All Districts",
    "East Sikkim",
    "West Sikkim",
    "North Sikkim",
    "South Sikkim",
  ];
  const traditions = ["All Traditions", "Nyingma", "Kagyu", "Gelug", "Sakya"];
  const accessibilityLevels = ["All Levels", "Easy", "Moderate", "Difficult"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading monasteries..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Monasteries
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore {monasteries.length}+ sacred monasteries across Sikkim
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <SafeIcon
                icon={FiSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
              <input
                type="text"
                placeholder={t("common.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-monastery-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <SafeIcon icon={FiFilter} className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <select
                value={filters.district}
                onChange={(e) => setFilters({ district: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {districts.map((district) => (
                  <option
                    key={district}
                    value={district === "All Districts" ? "" : district}
                  >
                    {district}
                  </option>
                ))}
              </select>

              <select
                value={filters.tradition}
                onChange={(e) => setFilters({ tradition: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {traditions.map((tradition) => (
                  <option
                    key={tradition}
                    value={tradition === "All Traditions" ? "" : tradition}
                  >
                    {tradition}
                  </option>
                ))}
              </select>

              <select
                value={filters.accessibility}
                onChange={(e) => setFilters({ accessibility: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {accessibilityLevels.map((level) => (
                  <option
                    key={level}
                    value={level === "All Levels" ? "" : level}
                  >
                    {level}
                  </option>
                ))}
              </select>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.hasVirtualTour}
                  onChange={(e) =>
                    setFilters({ hasVirtualTour: e.target.checked })
                  }
                  className="w-4 h-4 text-monastery-600 rounded focus:ring-monastery-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Virtual Tour Available
                </span>
              </label>
            </motion.div>
          )}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredMonasteries.length} monasteries found
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid"
                  ? "bg-monastery-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list"
                  ? "bg-monastery-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Monastery Grid/List */}
        <div
          className={`grid ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          } gap-6`}
        >
          {filteredMonasteries.map((monastery, index) => (
            <motion.div
              key={monastery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div className={`relative ${viewMode === "list" ? "w-1/3" : ""}`}>
                <LazyLoadImage
                  src={monastery.image}
                  alt={monastery.name}
                  className={`w-full object-cover ${
                    viewMode === "list" ? "h-48" : "h-48"
                  }`}
                />
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {monastery.hasVirtualTour && (
                    <span className="bg-monastery-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <SafeIcon icon={FiPlay} className="w-3 h-3" />
                      <span>VR Tour</span>
                    </span>
                  )}
                  {monastery.hasAudioGuide && (
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <SafeIcon icon={FiHeadphones} className="w-3 h-3" />
                      <span>Audio</span>
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center space-x-1">
                    <SafeIcon
                      icon={FiStar}
                      className="w-3 h-3 text-yellow-400"
                    />
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {monastery.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {monastery.name}
                  </h3>
                
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>{monastery.tradition}</span>
                  <span>•</span>
                  <span>{monastery.established}</span>
                  <span>•</span>
                  <span>{monastery.altitude}</span>
                </div>

                <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                  <span>{monastery.distance}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {monastery.description}
                </p>

                {monastery.highlights && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {monastery.highlights
                        .slice(0, 3)
                        .map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-monastery-50 dark:bg-monastery-900/20 text-monastery-700 dark:text-monastery-300 px-2 py-1 rounded text-xs"
                          >
                            {highlight}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <SafeIcon
                      icon={FiUsers}
                      className="w-4 h-4 text-gray-400"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {monastery.reviews} reviews
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {monastery.hasVirtualTour && (
                      <Link
                        to={`/virtual-tour/${monastery.id}`}
                        className="bg-monastery-600 hover:bg-monastery-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                      >
                        VR Tour
                      </Link>
                    )}
                    <Link
                      to={`/monastery/${monastery.id}`}
                      className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMonasteries.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiSearch} className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No monasteries found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonasteryDiscovery;
