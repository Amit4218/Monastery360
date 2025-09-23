import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SafeIcon from "../components/common/SafeIcon";
import LoadingSpinner from "../components/common/LoadingSpinner";
import HighResolutionViewer from "../components/archives/HighResolutionViewer";
import * as FiIcons from "react-icons/fi";

const {
  FiSearch,
  FiFilter,
  FiDownload,
  FiBook,
  FiImage,
  FiMusic,
  FiFile,
  FiVideo,
  FiHeart,
} = FiIcons;

function DigitalArchives() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showHighResViewer, setShowHighResViewer] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({});
  const [favoriteItems, setFavoriteItems] = useState(new Set());
  const [selectedMonastery, setSelectedMonastery] = useState("all");

  // Archive items
  const archiveItems = [
    // {
    //   id: 1,
    //   title: "Ancient Tibetan Manuscript - Prajnaparamita Sutra",
    //   type: "manuscript",
    //   category: "manuscripts",
    //   monastery: "Rumtek Monastery",
    //   date: "15th Century",
    //   description:
    //     "Sacred Buddhist text written in gold ink on black paper, containing the Heart Sutra and other Prajnaparamita teachings.",
    //   image:
    //     "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    //   downloadable: true,
    //   views: 1234,
    //   language: "Tibetan",
    //   pages: 108,
    //   material: "Black paper, Gold ink",
    //   condition: "Excellent",
    //   significance:
    //     "This manuscript represents one of the finest examples of Tibetan calligraphy and contains profound teachings on wisdom and emptiness.",
    //   historicalContext:
    //     "Created during the golden age of Tibetan Buddhism, this manuscript was hand-copied by master scribes in the monasteries of Tibet.",
    //   conservationNotes:
    //     "Digitized in 2023 using advanced imaging techniques to preserve every detail of the original text.",
    //   relatedItems: [2, 3],
    //   fileSize: "45.2 MB",
    //   resolution: "4K Ultra HD",
    // },
    // {
    //   id: 2,
    //   title: "Golden Buddha Statue - Shakyamuni",
    //   type: "artifact",
    //   category: "artifacts",
    //   monastery: "Pemayangtse Monastery",
    //   date: "17th Century",
    //   description:
    //     "Intricately carved wooden statue of Buddha Shakyamuni with gold leaf coating and precious stone inlays.",
    //   image:
    //     "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    //   downloadable: false,
    //   views: 856,
    //   material: "Wood, Gold Leaf, Precious Stones",
    //   dimensions: "Height: 2.5m, Width: 1.8m",
    //   weight: "150 kg",
    //   condition: "Good",
    //   significance:
    //     "This statue is considered one of the most sacred images in Sikkim, believed to have miraculous powers.",
    //   historicalContext:
    //     "Commissioned by the royal family of Sikkim and crafted by master artisans from Tibet.",
    //   conservationNotes:
    //     "Underwent restoration in 2019 to preserve the gold leaf and repair minor damage.",
    //   relatedItems: [1, 4],
    //   artist: "Lama Tenzin Norbu",
    // },
    // {
    //   id: 3,
    //   title: "Sacred Monastery Wall Murals - Life of Buddha",
    //   type: "artwork",
    //   category: "artworks",
    //   monastery: "Enchey Monastery",
    //   date: "18th Century",
    //   description:
    //     "Traditional Tibetan Buddhist paintings depicting the twelve great deeds of Buddha Shakyamuni.",
    //   image:
    //     "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    //   downloadable: true,
    //   views: 2103,
    //   technique: "Natural Pigments on Clay Plaster",
    //   dimensions: "Total area: 120 sq meters",
    //   condition: "Fair - Some fading",
    //   significance:
    //     "These murals represent the finest example of Sikkimese Buddhist art and serve as visual teachings.",
    //   historicalContext:
    //     "Painted by monks and local artists during the reign of the Chogyal dynasty.",
    //   conservationNotes:
    //     "Digital preservation project completed in 2022 to document the murals before further deterioration.",
    //   relatedItems: [1, 2],
    //   fileSize: "156.7 MB",
    //   resolution: "8K Ultra HD",
    // },
    {
      id: 4,
      title: "Lingdum Monastery - Healing Garden",
      type: "image",
      category: "images",
      monastery: "Lingdum Monastery",
      date: "2022",
      description:
        "A serene garden within Lingdum Monastery where visitors and patients spend time for relaxation and healing.",
      image:
        "https://imgs.search.brave.com/tIAjqaxL5s6hiQuGSdtsorTvrfG79xCgV3cDsdIBYYg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLW8v/MTcvZmYvYmQvNjkv/bGluZ2R1bS1tb25h/c3RlcnktcmFua2Eu/anBn",
      downloadable: true,
      views: 512,
      resolution: "8K Ultra HD",
      fileSize: "12 MB",
    },

    {
      id: 5,
      title: "Gharwang Rinppoche",
      type: "video",
      category: "videos",
      monastery: "Rumtek Monastery",
      date: "2023",
      description:
        "A short video recording of Gharwang Rinpoche's motivation.",
      videoUrl:
        "/vids/Gharwang Rinpoche - the importance of understanding our motivation. [Ux9uIFxtmfk].webm",
      downloadable: true,
      views: 324,
      duration: "2:34",
      resolution: "1080p",
      fileSize: "25 MB",
    },
    // Inside archiveItems array, add these objects (after your existing items)
    {
      id: 6,
      title: "Lingdum Monastery - Rinpoche",
      type: "image",
      category: "images",
      monastery: "Lingdum Monastery",
      date: "2022",
      description: "Portrait of the Rinpoche of Lingdum Monastery.",
      image: "/images/rim.jpeg",
      downloadable: true,
      views: 120,
      resolution: "4K",
    },

    {
      id: 7,
      title: "Lingdum Monastery - Debate",
      type: "image",
      category: "images",
      monastery: "Lingdum Monastery",
      date: "2022",
      description:
        "Monks participating in a traditional debate at Lingdum Monastery.",
      image: "/images/debate.jpeg",
      downloadable: true,
      views: 95,
      resolution: "4K",
    },
    {
      id: 8,
      title: "Lingdum Monastery - Prayer Hall",
      type: "image",
      category: "images",
      monastery: "Lingdum Monastery",
      date: "2022",
      description: "Inside the prayer hall of Lingdum Monastery.",
      image: "/images/in.jpeg",
      downloadable: true,
      views: 87,
      resolution: "4K",
    },
    {
      id: 9,
      title: "Lingdum Monastery - Buddha Statue",
      type: "image",
      category: "images",
      monastery: "Lingdum Monastery",
      date: "2022",
      description: "Buddha statue at Lingdum Monastery.",
      image: "/images/lordBuddha.jpeg",
      downloadable: true,
      views: 110,
      resolution: "4K",
    },
    {
      id: 10,
      title: "Rimpoche's Birthday Celebration",
      type: "image",
      category: "images",
      monastery: "Lingdum Monastery",
      date: "2022",
      description: "Locals celebrating rimpoche's bitrhday",
      image: "/images/btd.jpeg",
      downloadable: true,
      views: 130,
      resolution: "4K",
    },
    {
      id: 11,
      title: "Zurmang Kadyug",
      type: "document",
      category: "documents",
      monastery: "Lingdum Monastery",
      date: "19th Century",
      description:
        "Digitized archival document detailing the history of Zurmang Kadyug.",
      fileUrl: "/pdfs/ZurmangHistory.pdf",
      downloadable: true,
      views: 200,
      fileSize: "5 MB",
      language: "English",
    },
  ];

  const categories = [
    { id: "all", label: "All Items", icon: FiFile, count: archiveItems.length },
    {
      id: "manuscripts",
      label: "Manuscripts",
      icon: FiBook,
      count: archiveItems.filter((i) => i.category === "manuscripts").length,
    },
    {
      id: "artifacts",
      label: "Artifacts",
      icon: FiImage,
      count: archiveItems.filter((i) => i.category === "artifacts").length,
    },
    {
      id: "artworks",
      label: "Artworks",
      icon: FiImage,
      count: archiveItems.filter((i) => i.category === "artworks").length,
    },
    {
      id: "images",
      label: "Images",
      icon: FiImage,
      count: archiveItems.filter((i) => i.category === "images").length,
    },
    {
      id: "videos",
      label: "Videos",
      icon: FiVideo,
      count: archiveItems.filter((i) => i.category === "videos").length,
    },
    {
      id: "audio",
      label: "Audio",
      icon: FiMusic,
      count: archiveItems.filter((i) => i.category === "audio").length,
    },
    {
      id: "documents",
      label: "Documents",
      icon: FiFile,
      count: archiveItems.filter((i) => i.category === "documents").length,
    },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const filteredItems = archiveItems.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.monastery.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    const matchesMonastery =
      selectedMonastery === "all" || item.monastery === selectedMonastery;

    return matchesSearch && matchesCategory && matchesMonastery;
  });

  const handleDownload = async (item) => {
    if (!item.downloadable) return;
    setDownloadProgress((prev) => ({ ...prev, [item.id]: 0 }));

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setDownloadProgress((prev) => ({ ...prev, [item.id]: i }));
    }

    const link = document.createElement("a");
    link.href = item.image || item.videoUrl || item.fileUrl;
    link.download = `${item.title}`;
    link.click();

    setTimeout(() => {
      setDownloadProgress((prev) => {
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
    setFavoriteItems((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) newFavorites.delete(itemId);
      else newFavorites.add(itemId);
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
        {/* Header */}
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
            <SafeIcon
              icon={FiBook}
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
            />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-monastery-600 via-tibetan-gold to-monastery-600 bg-clip-text text-transparent mb-4">
            Digital Archives
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Explore digitized manuscripts, artifacts, images, videos, and
            cultural treasures from Sikkim's sacred monasteries
          </p>
        </motion.div>

        {/* Search & Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex-1 relative group">
              <SafeIcon
                icon={FiSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 sm:w-6 h-5 sm:h-6 group-focus-within:text-tibetan-gold transition-colors duration-300"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 border border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-tibetan-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-base sm:text-lg"
              />
            </div>
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

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedMonastery("all"); // reset monastery on category change
                }}
                className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-monastery-50 dark:hover:bg-monastery-900/20"
                }`}
              >
                <SafeIcon
                  icon={category.icon}
                  className="w-4 sm:w-5 h-4 sm:h-5"
                />
                <span className="text-sm sm:text-base">{category.label}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                {/* Dynamic Monastery Filter */}
                <select
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={selectedMonastery}
                  onChange={(e) => setSelectedMonastery(e.target.value)}
                >
                  <option value="all">All Monasteries</option>
                  {[
                    ...new Set(
                      archiveItems
                        .filter(
                          (item) =>
                            selectedCategory === "all" ||
                            item.category === selectedCategory
                        )
                        .map((item) => item.monastery)
                    ),
                  ].map((monastery) => (
                    <option key={monastery} value={monastery}>
                      {monastery}
                    </option>
                  ))}
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

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8"
        >
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            <span className="font-bold text-monastery-600">
              {filteredItems.length}
            </span>{" "}
            treasures found
          </p>
          <select className="w-full sm:w-auto px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>Sort by Relevance</option>
            <option>Sort by Date (Newest)</option>
            <option>Sort by Date (Oldest)</option>
            <option>Sort by Views</option>
          </select>
        </motion.div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 group"
              onClick={() => handleViewHighRes(item)}
            >
              {item.type === "video" ? (
                <video
                  src={item.videoUrl}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  controls={false}
                  muted
                />
              ) : item.type === "document" ? (
                <iframe
                  src={item.fileUrl}
                  title={item.title}
                  className="w-full h-48 sm:h-56 lg:h-64 border-0 transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <LazyLoadImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}

              <div className="p-4 sm:p-6 flex flex-col gap-2">
                <h3 className="font-semibold text-lg sm:text-xl text-gray-900 dark:text-white truncate">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="text-monastery-600 dark:text-tibetan-gold hover:text-red-500 transition-colors duration-300"
                  >
                    <FiHeart
                      className={`w-5 h-5 ${
                        favoriteItems.has(item.id) ? "fill-red-500" : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(item);
                    }}
                    disabled={!item.downloadable}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      item.downloadable
                        ? "bg-monastery-600 text-white hover:bg-monastery-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {downloadProgress[item.id]
                      ? `${downloadProgress[item.id]}%`
                      : "Download"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showHighResViewer && selectedItem && (
        <HighResolutionViewer
          item={selectedItem}
          onClose={() => setShowHighResViewer(false)}
        />
      )}
    </div>
  );
}

export default DigitalArchives;
