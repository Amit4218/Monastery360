import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZoomIn, FiZoomOut, FiMove, FiRotateCw, FiDownload, FiX, FiMaximize, FiMinimize } = FiIcons;

function HighResolutionViewer({ item, isOpen, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Reset viewer state when opening
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
  }, [isOpen]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 10));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.1));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.1), 10));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const downloadHighRes = async () => {
    try {
      const response = await fetch(item.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.title}_high_resolution.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Controls */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
          <div className="bg-black/50 backdrop-blur-lg text-white px-6 py-3 rounded-2xl border border-white/20">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm opacity-75">High Resolution Viewer</p>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomOut}
              className="bg-black/50 backdrop-blur-lg text-white p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <SafeIcon icon={FiZoomOut} className="w-5 h-5" />
            </motion.button>

            <div className="bg-black/50 backdrop-blur-lg text-white px-4 py-3 rounded-xl border border-white/20 font-mono">
              {Math.round(zoom * 100)}%
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomIn}
              className="bg-black/50 backdrop-blur-lg text-white p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <SafeIcon icon={FiZoomIn} className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRotate}
              className="bg-black/50 backdrop-blur-lg text-white p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <SafeIcon icon={FiRotateCw} className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
              className="bg-black/50 backdrop-blur-lg text-white p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <SafeIcon icon={isFullscreen ? FiMinimize : FiMaximize} className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={downloadHighRes}
              className="bg-gradient-to-r from-tibetan-gold to-monastery-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <SafeIcon icon={FiDownload} className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition-all duration-300"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Image Container */}
        <div 
          className="w-full h-full flex items-center justify-center overflow-hidden cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            ref={imageRef}
            src={item.image}
            alt={item.title}
            className="max-w-none select-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            drag={false}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl px-6 py-3 flex items-center space-x-4 border border-white/20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetView}
              className="text-white hover:text-tibetan-gold transition-colors duration-300 flex items-center space-x-2"
            >
              <SafeIcon icon={FiMove} className="w-4 h-4" />
              <span className="text-sm">Reset View</span>
            </motion.button>

            <div className="w-px h-6 bg-white/20" />

            <div className="text-white text-sm">
              Position: {Math.round(position.x)}, {Math.round(position.y)}
            </div>

            <div className="w-px h-6 bg-white/20" />

            <div className="text-white text-sm">
              Rotation: {rotation}°
            </div>
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-black/30 backdrop-blur-lg text-white p-4 rounded-xl border border-white/10 max-w-xs"
        >
          <h4 className="font-semibold mb-2">Viewer Controls</h4>
          <div className="text-sm space-y-1 opacity-75">
            <p>• Scroll to zoom in/out</p>
            <p>• Click and drag to pan</p>
            <p>• Use toolbar for precise control</p>
            <p>• Double-click to reset view</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default HighResolutionViewer;