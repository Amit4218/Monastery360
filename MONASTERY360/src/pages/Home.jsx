import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from '../hooks/useTranslation';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiMap, FiArchive, FiCalendar, FiCompass, FiStar, FiUsers, FiAward } = FiIcons;

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      title: t('home.heroTitle1'),
      subtitle: t('home.heroSubtitle1'),
    },
    {
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop',
      title: t('home.heroTitle2'),
      subtitle: t('home.heroSubtitle2'),
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
      title: t('home.heroTitle3'),
      subtitle: t('home.heroSubtitle3'),
    },
  ];

  const features = [
    {
      icon: FiPlay,
      title: t('home.virtualToursFeature'),
      description: t('home.virtualToursDesc'),
      link: '/virtual-tour/1',
    },
    {
      icon: FiMap,
      title: t('home.interactiveMapsFeature'),
      description: t('home.interactiveMapsDesc'),
      link: '/map',
    },
    {
      icon: FiArchive,
      title: t('home.digitalArchivesFeature'),
      description: t('home.digitalArchivesDesc'),
      link: '/archives',
    },
    {
      icon: FiCalendar,
      title: t('home.culturalCalendarFeature'),
      description: t('home.culturalCalendarDesc'),
      link: '/calendar',
    },
  ];

  const stats = [
    { number: '200+', label: t('home.monasteries'), icon: FiCompass },
    { number: '50+', label: t('common.virtualTour'), icon: FiPlay },
    { number: '1000+', label: t('home.artifacts'), icon: FiArchive },
    { number: '25+', label: t('monastery.festivals'), icon: FiStar },
  ];

  const featuredMonasteries = [
    {
      id: 1,
      name: 'Rumtek Monastery',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      tradition: 'Kagyu',
      distance: '24 km from Gangtok',
      rating: 4.8,
      hasVirtualTour: true,
    },
    {
      id: 2,
      name: 'Enchey Monastery',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      tradition: 'Nyingma',
      distance: '3 km from Gangtok',
      rating: 4.6,
      hasVirtualTour: true,
    },
    {
      id: 3,
      name: 'Pemayangtse Monastery',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      tradition: 'Nyingma',
      distance: '110 km from Gangtok',
      rating: 4.9,
      hasVirtualTour: false,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LazyLoadImage
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </motion.div>
        ))}

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-monastery-200 bg-clip-text text-transparent">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/discover"
                className="bg-monastery-600 hover:bg-monastery-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <SafeIcon icon={FiCompass} className="w-5 h-5" />
                <span>{t('home.startExploring')}</span>
              </Link>
              <Link
                to="/virtual-tour/1"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                <span>{t('home.virtualTour')}</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.digitalHeritage')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('home.digitalHeritageDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-monastery-100 dark:bg-monastery-900/20 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-monastery-600 dark:text-monastery-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="text-monastery-600 dark:text-monastery-400 font-medium hover:underline"
                >
                  {t('common.learn')} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-monastery-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={stat.icon} className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-monastery-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Monasteries */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.featuredMonasteries')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('home.featuredMonasteriesDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMonasteries.map((monastery, index) => (
              <motion.div
                key={monastery.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <LazyLoadImage
                    src={monastery.image}
                    alt={monastery.name}
                    className="w-full h-48 object-cover"
                  />
                  {monastery.hasVirtualTour && (
                    <div className="absolute top-4 right-4 bg-monastery-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('common.virtualTour')}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {monastery.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>{monastery.tradition}</span>
                    <span>•</span>
                    <span>{monastery.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {monastery.rating}
                      </span>
                    </div>
                    <Link
                      to={`/monastery/${monastery.id}`}
                      className="bg-monastery-600 hover:bg-monastery-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      {t('common.explore')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/discover"
              className="bg-monastery-600 hover:bg-monastery-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>{t('home.viewAllMonasteries')}</span>
              <SafeIcon icon={FiCompass} className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;