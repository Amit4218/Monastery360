import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2, FiDownload, FiHeadphones } = FiIcons;

function AudioGuide() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const audioTracks = [
    {
      id: 1,
      title: 'Welcome to Rumtek Monastery',
      duration: '3:45',
      monastery: 'Rumtek Monastery',
      description: 'Introduction to the largest monastery in Sikkim'
    },
    {
      id: 2,
      title: 'The Golden Stupa',
      duration: '5:20',
      monastery: 'Rumtek Monastery',
      description: 'Sacred relics and significance of the golden stupa'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <SafeIcon icon={FiHeadphones} className="w-16 h-16 text-monastery-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Audio Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Listen to narrated tours and learn about monastery history
          </p>
        </motion.div>

        {/* Audio Player */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {audioTracks[currentTrack].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {audioTracks[currentTrack].monastery}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div className="bg-monastery-600 h-2 rounded-full w-1/3"></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>1:20</span>
              <span>{audioTracks[currentTrack].duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center space-x-6">
            <button className="text-gray-600 dark:text-gray-400 hover:text-monastery-600 transition-colors duration-200">
              <SafeIcon icon={FiSkipBack} className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-monastery-600 hover:bg-monastery-700 text-white w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="w-8 h-8" />
            </button>
            
            <button className="text-gray-600 dark:text-gray-400 hover:text-monastery-600 transition-colors duration-200">
              <SafeIcon icon={FiSkipForward} className="w-8 h-8" />
            </button>
          </div>

          {/* Volume and Download */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiVolume2} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-monastery-600 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Track List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Available Tracks
          </h3>
          
          <div className="space-y-3">
            {audioTracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => setCurrentTrack(index)}
                className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                  currentTrack === index
                    ? 'bg-monastery-50 dark:bg-monastery-900/20 border border-monastery-200 dark:border-monastery-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {track.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {track.description}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {track.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioGuide;