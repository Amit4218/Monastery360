import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SafeIcon from '../components/common/SafeIcon';
import LoadingSpinner from '../components/common/LoadingSpinner';
import HighResolutionViewer from '../components/archives/HighResolutionViewer';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiDownload, FiEye, FiBook, FiImage, FiMusic, FiFile, FiCalendar, FiHeart, FiShare2, FiZoomIn } = FiIcons;

function DigitalArchives() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showHighResViewer, setShowHighResViewer] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({});
  const [favoriteItems, setFavoriteItems] = useState(new Set());

  // Enhanced archive data with detailed information
  const archiveItems = [
    {
      id: 1,
      title: 'Ancient Tibetan Manuscript - Prajnaparamita Sutra',
      type: 'manuscript',
      category: 'manuscripts',
      monastery: 'Rumtek Monastery',
      date: '15th Century',
      description: 'Sacred Buddhist text written in gold ink on black paper, containing the Heart Sutra and other Prajnaparamita teachings.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      downloadable: true,
      views: 1234,
      language: 'Tibetan',
      pages: 108,
      material: 'Black paper, Gold ink',
      condition: 'Excellent',
      significance: 'This manuscript represents one of the finest examples of Tibetan calligraphy and contains profound teachings on wisdom and emptiness.',
      historicalContext: 'Created during the golden age of Tibetan Buddhism, this manuscript was hand-copied by master scribes in the monasteries of Tibet.',
      conservationNotes: 'Digitized in 2023 using advanced imaging techniques to preserve every detail of the original text.',
      relatedItems: [2, 3],
      fileSize: '45.2 MB',
      resolution: '4K Ultra HD'
    },
    {
      id: 2,
      title: 'Golden Buddha Statue - Shakyamuni',
      type: 'artifact',
      category: 'artifacts',
      monastery: 'Pemayangtse Monastery',
      date: '17th Century',
      description: 'Intricately carved wooden statue of Buddha Shakyamuni with gold leaf coating and precious stone inlays.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      downloadable: false,
      views: 856,
      material: 'Wood, Gold Leaf, Precious Stones',
      dimensions: 'Height: 2.5m, Width: 1.8m',
      weight: '150 kg',
      condition: 'Good',
      significance: 'This statue is considered one of the most sacred images in Sikkim, believed to have miraculous powers.',
      historicalContext: 'Commissioned by the royal family of Sikkim and crafted by master artisans from Tibet.',
      conservationNotes: 'Underwent restoration in 2019 to preserve the gold leaf and repair minor damage.',
      relatedItems: [1, 4],
      artist: 'Lama Tenzin Norbu'
    },
    {
      id: 3,
      title: 'Sacred Monastery Wall Murals - Life of Buddha',
      type: 'artwork',
      category: 'artworks',
      monastery: 'Enchey Monastery',
      date: '18th Century',
      description: 'Traditional Tibetan Buddhist paintings depicting the twelve great deeds of Buddha Shakyamuni.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      downloadable: true,
      views: 2103,
      technique: 'Natural Pigments on Clay Plaster',
      dimensions: 'Total area: 120 sq meters',
      condition: 'Fair - Some fading',
      significance: 'These murals represent the finest example of Sikkimese Buddhist art and serve as visual teachings.',
      historicalContext: 'Painted by monks and local artists during the reign of the Chogyal dynasty.',
      conservationNotes: 'Digital preservation project completed in 2022 to document the murals before further deterioration.',
      relatedItems: [1, 2],
      fileSize: '156.7 MB',
      resolution: '8K Ultra HD'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Items', icon: FiFile, count: archiveItems.length },
    { id: 'manuscripts', label: 'Manuscripts', icon: FiBook, count: 1 },
    { id: 'artifacts', label: 'Artifacts', icon: FiImage, count: 1 },
    { id: 'artworks', label: 'Artworks', icon: FiImage, count: 1 },
    { id: 'audio', label: 'Audio', icon: FiMusic, count: 0 },
    { id: 'documents', label: 'Documents', icon: FiFile, count: 0 }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filteredItems = archiveItems.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.monastery.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'manuscript': return FiBook;
      case 'artifact': return FiImage;
      case 'artwork': return FiImage;
      case 'audio': return FiMusic;
      case 'document': return FiFile;
      default: return FiFile;
    }
  };

  const handleDownload = async (item) => {
    if (!item.downloadable) return;

    setDownloadProgress(prev => ({ ...prev, [item.id]: 0 }));

    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDownloadProgress(prev => ({ ...prev, [item.id]: i }));
    }

    // Create and trigger download
    const link = document.createElement('a');
    link.href = item.image;
    link.download = `${item.title}.jpg`;
    link.click();

    setTimeout(() => {
      setDownloadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[item.id];
        return newProgress;
      });
    }, 1000);
  };

  const handleViewHighRes = (item) => {
    setSelectedItem(item);
    setShowHighResViewer(true);
  };

  const toggleFavorite = (itemId) => {
    setFavoriteItems(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-monastery-900 to-purple-900">
        <LoadingSpinner size="lg" text="Loading digital archives..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-monastery-50 via-white to-purple-50 dark:from-monastery-900 dark:via-gray-900 dark:to-purple-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-tibetan-gold to-monastery-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl"
          >
            <SafeIcon icon={FiBook} className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-monastery-600 via-tibetan-gold to-monastery-600 bg-clip-text text-transparent mb-4">
            Digital Archives
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Explore digitized manuscripts, artifacts, and cultural treasures from Sikkim's sacred monasteries
          </p>
        </motion.div>

        {/* Enhanced Search and Categories - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Enhanced Search Bar */}
            <div className="flex-1 relative group">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 sm:w-6 h-5 sm:h-6 group-focus-within:text-tibetan-gold transition-colors duration-300" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 border border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-tibetan-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-base sm:text-lg"
              />
            </div>

            {/* Filter Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <SafeIcon icon={FiFilter} className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-sm sm:text-base">Advanced Filters</span>
            </motion.button>
          </div>

          {/* Enhanced Category Tabs - Responsive */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-monastery-50 dark:hover:bg-monastery-900/20'
                }`}
              >
                <SafeIcon icon={category.icon} className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-sm sm:text-base">{category.label}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <select className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>All Monasteries</option>
                  <option>Rumtek Monastery</option>
                  <option>Pemayangtse Monastery</option>
                  <option>Enchey Monastery</option>
                </select>
                <select className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>All Periods</option>
                  <option>Ancient (Before 1500)</option>
                  <option>Medieval (1500-1800)</option>
                  <option>Modern (1800-Present)</option>
                </select>
                <select className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>All Languages</option>
                  <option>Tibetan</option>
                  <option>Sanskrit</option>
                  <option>English</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Summary - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8"
        >
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            <span className="font-bold text-monastery-600">{filteredItems.length}</span> treasures found
          </p>
          <select className="w-full sm:w-auto px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>Sort by Relevance</option>
            <option>Sort by Date (Newest)</option>
            <option>Sort by Date (Oldest)</option>
            <option>Sort by Views</option>
          </select>
        </motion.div>

        {/* Enhanced Archive Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 group"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden">
                <LazyLoadImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay with type and actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-lg ${
                      item.type === 'manuscript' ? 'bg-blue-500/80' :
                      item.type === 'artifact' ? 'bg-green-500/80' :
                      item.type === 'artwork' ? 'bg-purple-500/80' :
                      item.type === 'audio' ? 'bg-orange-500/80' : 'bg-gray-500/80'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-lg transition-colors duration-300 ${
                        favoriteItems.has(item.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-black/20 text-white hover:bg-red-500'
                      }`}
                    >
                      <SafeIcon icon={FiHeart} className="w-4 h-4" />
                    </motion.button>
                    
                    <div className="bg-black/50 backdrop-blur-lg text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1">
                      <SafeIcon icon={FiEye} className="w-3 h-3" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <SafeIcon icon={getTypeIcon(item.type)} className="w-5 h-5 text-monastery-600" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-monastery-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {item.monastery} • {item.date}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewHighRes(item);
                    }}
                    className="text-monastery-600 hover:text-monastery-700 font-semibold text-sm flex items-center justify-center space-x-2 px-4 py-2 bg-monastery-50 dark:bg-monastery-900/20 rounded-xl"
                  >
                    <SafeIcon icon={FiZoomIn} className="w-4 h-4" />
                    <span>View in High Res</span>
                  </motion.button>

                  {item.downloadable && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(item);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                      disabled={downloadProgress[item.id] !== undefined}
                    >
                      {downloadProgress[item.id] !== undefined ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          <span>{downloadProgress[item.id]}%</span>
                        </>
                      ) : (
                        <>
                          <SafeIcon icon={FiDownload} className="w-4 h-4" />
                          <span>Download</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results - Responsive */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-monastery-100 to-monastery-200 dark:from-monastery-800 dark:to-monastery-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiSearch} className="w-12 h-12 sm:w-16 sm:h-16 text-monastery-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No archives found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
              Try adjusting your search criteria or explore different categories
            </p>
          </motion.div>
        )}
      </div>

      {/* High Resolution Viewer */}
      <HighResolutionViewer
        item={selectedItem}
        isOpen={showHighResViewer}
        onClose={() => {
          setShowHighResViewer(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}

export default DigitalArchives;