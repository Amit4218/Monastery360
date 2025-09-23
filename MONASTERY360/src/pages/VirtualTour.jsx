import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import LoadingSpinner from '../components/common/LoadingSpinner';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiVolume2, FiVolumeX, FiRotateCcw, FiMaximize, FiInfo, FiMap, FiCamera, FiShare2 } = FiIcons;

function VirtualTour() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const tourData = {
    name: 'Rumtek Monastery Virtual Tour',
    description: 'Experience the sacred halls and chambers of Rumtek Monastery through immersive 360° views',
    scenes: [
      {
        id: 1,
        name: 'Main Entrance',
        description: 'Traditional Tibetan architecture welcomes visitors at the monastery entrance',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        hotspots: [
          { 
            x: 30, y: 40, 
            title: 'Prayer Wheels', 
            description: 'Sacred prayer wheels containing mantras. Spinning them clockwise accumulates merit.',
            audio: 'prayer-wheels.mp3',
            details: 'These prayer wheels contain thousands of mantras written on paper. Each spin is equivalent to reciting all the mantras inside.'
          },
          { 
            x: 70, y: 30, 
            title: 'Main Hall Entrance', 
            description: 'Enter the main prayer hall where monks gather for ceremonies',
            audio: 'main-hall.mp3',
            details: 'The entrance is adorned with traditional Tibetan architectural elements and sacred symbols.'
          }
        ]
      },
      {
        id: 2,
        name: 'Prayer Hall',
        description: 'The main assembly hall where monks gather for daily prayers and ceremonies',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
        hotspots: [
          { 
            x: 50, y: 20, 
            title: 'Buddha Statue', 
            description: 'Golden statue of Buddha Shakyamuni in meditation pose',
            audio: 'buddha-statue.mp3',
            details: 'This magnificent statue is made of gold and precious stones, representing the enlightened state of Buddha.'
          },
          { 
            x: 25, y: 60, 
            title: 'Meditation Cushions', 
            description: 'Where monks sit for meditation and prayer sessions',
            audio: 'meditation-area.mp3',
            details: 'These cushions are arranged in traditional formation for group meditation and prayer ceremonies.'
          }
        ]
      },
      {
        id: 3,
        name: 'Golden Stupa',
        description: 'The magnificent golden stupa containing sacred relics',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        hotspots: [
          { 
            x: 50, y: 50, 
            title: 'Sacred Relics', 
            description: 'Contains relics of Buddhist masters and holy texts',
            audio: 'sacred-relics.mp3',
            details: 'This stupa houses precious relics of past Buddhist masters and sacred texts dating back centuries.'
          },
          { 
            x: 80, y: 70, 
            title: 'Offering Area', 
            description: 'Place for devotional offerings and prayers',
            audio: 'offering-area.mp3',
            details: 'Devotees place offerings of flowers, butter lamps, and incense here as acts of devotion.'
          }
        ]
      }
    ],
    audioGuide: {
      introduction: 'Welcome to Rumtek Monastery, the seat of the Karmapa...',
      duration: '15 minutes'
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSceneChange = (sceneIndex) => {
    setCurrentScene(sceneIndex);
    setSelectedHotspot(null);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-monastery-900 to-purple-900">
        <div className="text-center text-white">
          <LoadingSpinner size="lg" text="Loading Virtual Tour..." />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-300"
          >
            Preparing 360° immersive experience...
          </motion.p>
        </div>
      </div>
    );
  }

  const currentSceneData = tourData.scenes[currentScene];

  return (
    <div className="h-screen bg-gradient-to-br from-monastery-900 to-purple-900 overflow-hidden relative">
      {/* Virtual Tour Viewer */}
      <div className="relative w-full h-full">
        {/* 360° Image with Enhanced Effects */}
        <motion.div 
          className="w-full h-full relative overflow-hidden"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={currentSceneData.image}
            alt={currentSceneData.name}
            className="w-full h-full object-cover filter brightness-90"
          />
          
          {/* Ambient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
          
          {/* Interactive Hotspots */}
          <AnimatePresence>
            {currentSceneData.hotspots.map((hotspot, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.3, duration: 0.5 }}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onClick={() => handleHotspotClick(hotspot)}
              >
                {/* Pulsing Ring */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 w-8 h-8 bg-tibetan-gold/30 rounded-full"
                />
                
                {/* Main Hotspot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-8 h-8 bg-gradient-to-br from-tibetan-gold to-monastery-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white/50"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 text-white"
                  >
                    ℹ️
                  </motion.div>
                </motion.div>
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none"
                >
                  {hotspot.title}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Top Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute top-6 left-6 right-6 flex justify-between items-center z-20"
        >
          <div className="bg-black/50 backdrop-blur-xl text-white px-6 py-4 rounded-2xl border border-white/20">
            <h2 className="text-xl font-bold">{tourData.name}</h2>
            <p className="text-sm opacity-80">{currentSceneData.name}</p>
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowInfo(!showInfo)}
              className="bg-black/50 backdrop-blur-xl text-white p-4 rounded-2xl border border-white/20 hover:bg-tibetan-gold/20 transition-all duration-300"
            >
              <SafeIcon icon={FiInfo} className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
              className="bg-black/50 backdrop-blur-xl text-white p-4 rounded-2xl border border-white/20 hover:bg-tibetan-gold/20 transition-all duration-300"
            >
              <SafeIcon icon={FiMaximize} className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black/50 backdrop-blur-xl text-white p-4 rounded-2xl border border-white/20 hover:bg-tibetan-gold/20 transition-all duration-300"
            >
              <SafeIcon icon={FiShare2} className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Scene Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex space-x-4">
            {tourData.scenes.map((scene, index) => (
              <motion.button
                key={scene.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSceneChange(index)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                  currentScene === index
                    ? 'border-tibetan-gold scale-110 shadow-2xl'
                    : 'border-white/30 hover:border-tibetan-gold/50'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.name}
                  className="w-full h-full object-cover"
                />
                {currentScene === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-tibetan-gold/20 flex items-center justify-center"
                  >
                    <SafeIcon icon={FiPlay} className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bottom Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="bg-black/50 backdrop-blur-xl rounded-2xl px-8 py-4 flex items-center space-x-6 border border-white/20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="text-white hover:text-tibetan-gold transition-colors duration-300"
            >
              <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="w-8 h-8" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="text-white hover:text-tibetan-gold transition-colors duration-300"
            >
              <SafeIcon icon={isMuted ? FiVolumeX : FiVolume2} className="w-8 h-8" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-tibetan-gold transition-colors duration-300"
            >
              <SafeIcon icon={FiRotateCcw} className="w-8 h-8" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-tibetan-gold transition-colors duration-300"
            >
              <SafeIcon icon={FiMap} className="w-8 h-8" />
            </motion.button>
            
            <div className="text-white text-lg font-medium px-4 py-2 bg-white/10 rounded-xl">
              {currentScene + 1} / {tourData.scenes.length}
            </div>
          </div>
        </motion.div>

        {/* Info Panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-96 h-full bg-black/80 backdrop-blur-xl text-white p-8 overflow-y-auto z-30 border-l border-white/20"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-tibetan-gold">{currentSceneData.name}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {currentSceneData.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-white">Points of Interest</h4>
                  <div className="space-y-4">
                    {currentSceneData.hotspots.map((hotspot, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="border border-white/20 rounded-xl p-4 bg-white/5 cursor-pointer"
                        onClick={() => handleHotspotClick(hotspot)}
                      >
                        <h5 className="font-semibold text-tibetan-gold mb-2">{hotspot.title}</h5>
                        <p className="text-sm text-gray-300">{hotspot.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-white">Audio Guide</h4>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Introduction</span>
                      <span className="text-sm text-gray-400">{tourData.audioGuide.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-tibetan-gold hover:text-tibetan-gold/80"
                      >
                        <SafeIcon icon={FiPlay} className="w-6 h-6" />
                      </motion.button>
                      <div className="flex-1 bg-white/20 rounded-full h-3">
                        <motion.div 
                          className="bg-tibetan-gold h-3 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "33%" }}
                          transition={{ duration: 2 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hotspot Detail Modal */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-40"
              onClick={() => setSelectedHotspot(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl mx-4 border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-tibetan-gold mb-4">
                    {selectedHotspot.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {selectedHotspot.details}
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-tibetan-gold hover:bg-tibetan-gold/80 text-black px-6 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiPlay} className="w-5 h-5" />
                      <span>Play Audio</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedHotspot(null)}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Welcome Instructions */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white pointer-events-none z-10"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-4 text-tibetan-gold">Welcome to Virtual Tour</h3>
            <p className="text-lg mb-2">🖱️ Click and drag to explore</p>
            <p className="text-lg">ℹ️ Click hotspots for detailed information</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default VirtualTour;