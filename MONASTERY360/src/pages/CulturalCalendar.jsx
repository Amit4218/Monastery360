import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useCalendarStore } from '../store/calendarStore';
import CalendarGrid from '../components/calendar/CalendarGrid';
import EventModal from '../components/calendar/EventModal';
import EventList from '../components/calendar/EventList';
import SafeIcon from '../components/common/SafeIcon';
import LoadingSpinner from '../components/common/LoadingSpinner';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiPlus, FiList, FiGrid, FiSearch, FiFilter, FiClock, FiMapPin, FiUsers, FiStar, FiTrendingUp } = FiIcons;

function CulturalCalendar() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeView, setActiveView] = useState('calendar'); // calendar, list, stats
  
  const { 
    events, 
    viewMode, 
    setViewMode, 
    setShowEventModal, 
    getUpcomingEvents,
    searchEvents,
    getEventsByType 
  } = useCalendarStore();

  // Enhanced festival data with more details
  const festivals = [
    {
      id: 'f1',
      title: 'Losar - Tibetan New Year',
      monastery: 'Rumtek Monastery',
      date: '2024-02-10',
      endDate: '2024-02-12',
      time: '06:00 AM - 08:00 PM',
      type: 'festival',
      significance: 'high',
      description: 'The most important festival in Tibetan Buddhism, celebrating the new year with prayers, dances, and traditional ceremonies.',
      duration: '3 days',
      participants: 'Open to all',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      activities: ['Cham Dance', 'Prayer Ceremonies', 'Traditional Music', 'Feast'],
      dresscode: 'Traditional or formal attire recommended',
      ticketPrice: 'Free',
      bookingRequired: false,
      culturalSignificance: 'Marks the beginning of the Tibetan calendar year with purification rituals and merit accumulation.'
    },
    {
      id: 'f2',
      title: 'Buddha Purnima',
      monastery: 'Enchey Monastery',
      date: '2024-05-23',
      time: '05:00 AM - 07:00 PM',
      type: 'religious',
      significance: 'high',
      description: 'Celebration of Buddha\'s birth, enlightenment, and death. A day of meditation, prayers, and teachings.',
      duration: '1 day',
      participants: 'Open to all',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      activities: ['Morning Prayers', 'Dharma Teachings', 'Meditation Session', 'Community Feast'],
      dresscode: 'Modest clothing required',
      ticketPrice: 'Free',
      bookingRequired: false,
      culturalSignificance: 'Triple celebration of Buddha\'s birth, enlightenment, and parinirvana on the same auspicious day.'
    },
    {
      id: 'f3',
      title: 'Saga Dawa Festival',
      monastery: 'Tashiding Monastery',
      date: '2024-06-15',
      endDate: '2024-07-15',
      time: '06:00 AM - 06:00 PM',
      type: 'festival',
      significance: 'high',
      description: 'Month-long celebration marking Buddha\'s birth, enlightenment, and parinirvana.',
      duration: '1 month',
      participants: 'Open to all',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      activities: ['Daily Prayers', 'Circumambulation', 'Merit Making', 'Community Service'],
      dresscode: 'Modest traditional clothing preferred',
      ticketPrice: 'Free',
      bookingRequired: false,
      culturalSignificance: 'The holiest month in Buddhist calendar where merit is multiplied 100,000 times.'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const upcomingEvents = getUpcomingEvents();
  const filteredEvents = searchQuery ? searchEvents(searchQuery) : events;
  const typeFilteredEvents = filterType === 'all' ? filteredEvents : getEventsByType(filterType);

  // Calculate calendar statistics
  const getCalendarStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    return {
      totalEvents: events.length,
      upcomingEvents: events.filter(e => e.date >= today).length,
      thisMonthEvents: events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate.getMonth() === thisMonth && eventDate.getFullYear() === thisYear;
      }).length,
      completedEvents: events.filter(e => e.date < today).length,
      mostPopularType: getMostPopularEventType(),
      averageEventsPerMonth: Math.round(events.length / 12 * 10) / 10
    };
  };

  const getMostPopularEventType = () => {
    const typeCounts = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(typeCounts).reduce((a, b) => 
      typeCounts[a[0]] > typeCounts[b[0]] ? a : b
    )?.[0] || 'personal';
  };

  const stats = getCalendarStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading cultural calendar..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('calendarPage.title', 'Cultural Calendar & Events')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t('calendarPage.subtitle', 'Discover festivals, ceremonies, and cultural events across Sikkim\'s monasteries')}
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>{stats.totalEvents} total events</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                  <span>{stats.upcomingEvents} upcoming</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <SafeIcon icon={FiStar} className="w-4 h-4" />
                  <span>{stats.thisMonthEvents} this month</span>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEventModal(true)}
              className="bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5" />
              <span>Schedule Event</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative max-w-md">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events and festivals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-monastery-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filters and View Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
              >
                <option value="all">All Events</option>
                <option value="personal">Personal</option>
                <option value="meditation">Meditation</option>
                <option value="festival">Festivals</option>
                <option value="ceremony">Ceremonies</option>
                <option value="tour">Tours</option>
                <option value="workshop">Workshops</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setActiveView('calendar')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    activeView === 'calendar' 
                      ? 'bg-monastery-600 text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-monastery-600'
                  }`}
                >
                  <SafeIcon icon={FiGrid} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    activeView === 'list' 
                      ? 'bg-monastery-600 text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-monastery-600'
                  }`}
                >
                  <SafeIcon icon={FiList} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveView('stats')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    activeView === 'stats' 
                      ? 'bg-monastery-600 text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-monastery-600'
                  }`}
                >
                  <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeView === 'calendar' && <CalendarGrid />}
            {activeView === 'list' && <EventList />}
            {activeView === 'stats' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Calendar Statistics & Insights
                </h3>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalEvents}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-400">Total Events</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">{stats.upcomingEvents}</div>
                    <div className="text-sm text-green-700 dark:text-green-400">Upcoming</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{stats.thisMonthEvents}</div>
                    <div className="text-sm text-purple-700 dark:text-purple-400">This Month</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{stats.completedEvents}</div>
                    <div className="text-sm text-orange-700 dark:text-orange-400">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-monastery-50 dark:bg-monastery-900/20 rounded-xl">
                    <div className="text-lg font-bold text-monastery-600 mb-2 capitalize">{stats.mostPopularType}</div>
                    <div className="text-sm text-monastery-700 dark:text-monastery-400">Most Popular</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-3xl font-bold text-gray-600 mb-2">{stats.averageEventsPerMonth}</div>
                    <div className="text-sm text-gray-700 dark:text-gray-400">Avg/Month</div>
                  </div>
                </div>

                {/* Event Type Distribution */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Event Types Distribution</h4>
                  <div className="space-y-3">
                    {['personal', 'meditation', 'festival', 'ceremony', 'tour', 'workshop'].map(type => {
                      const count = events.filter(e => e.type === type).length;
                      const percentage = events.length > 0 ? (count / events.length) * 100 : 0;
                      
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded ${
                              type === 'personal' ? 'bg-blue-500' :
                              type === 'meditation' ? 'bg-purple-500' :
                              type === 'festival' ? 'bg-red-500' :
                              type === 'ceremony' ? 'bg-green-500' :
                              type === 'tour' ? 'bg-orange-500' : 'bg-indigo-500'
                            }`} />
                            <span className="capitalize text-gray-700 dark:text-gray-300">{type}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  type === 'personal' ? 'bg-blue-500' :
                                  type === 'meditation' ? 'bg-purple-500' :
                                  type === 'festival' ? 'bg-red-500' :
                                  type === 'ceremony' ? 'bg-green-500' :
                                  type === 'tour' ? 'bg-orange-500' : 'bg-indigo-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                              {count} ({Math.round(percentage)}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="w-5 h-5" />
                <span>Upcoming Events</span>
              </h3>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 5).map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {new Date(event.date).toLocaleDateString()} at {event.startTime}
                      </p>
                      {event.monastery && (
                        <p className="text-xs text-monastery-600 dark:text-monastery-400 mt-1">
                          {event.monastery}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No upcoming events scheduled
                </p>
              )}
            </div>

            {/* Enhanced Festival Calendar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <SafeIcon icon={FiStar} className="w-5 h-5" />
                <span>Major Festivals 2024</span>
              </h3>
              <div className="space-y-4">
                {festivals.map((festival) => (
                  <motion.div 
                    key={festival.id} 
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                      {festival.title}
                    </h4>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        📍 {festival.monastery}
                      </p>
                      <p className="text-xs text-monastery-600 dark:text-monastery-400">
                        📅 {new Date(festival.date).toLocaleDateString()}
                        {festival.endDate && ` - ${new Date(festival.endDate).toLocaleDateString()}`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ⏱️ {festival.duration} • {festival.ticketPrice}
                      </p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {festival.activities.slice(0, 2).map((activity, idx) => (
                        <span key={idx} className="bg-monastery-100 dark:bg-monastery-900/30 text-monastery-700 dark:text-monastery-300 px-2 py-1 rounded text-xs">
                          {activity}
                        </span>
                      ))}
                      {festival.activities.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{festival.activities.length - 2} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Quick Tips */}
            <div className="bg-monastery-50 dark:bg-monastery-900/20 rounded-2xl p-6">
              <h4 className="font-semibold text-monastery-800 dark:text-monastery-300 mb-3">
                {t('calendar.tips', 'Planning Tips')}
              </h4>
              <ul className="text-sm text-monastery-700 dark:text-monastery-400 space-y-2">
                <li>• {t('calendar.tip1', 'Check monastery timings before visiting')}</li>
                <li>• {t('calendar.tip2', 'Dress modestly and respectfully')}</li>
                <li>• {t('calendar.tip3', 'Maintain silence in prayer halls')}</li>
                <li>• {t('calendar.tip4', 'Photography restrictions may apply')}</li>
                <li>• Book accommodations early during festival seasons</li>
                <li>• Carry valid ID for monastery visits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal />
    </div>
  );
}

export default CulturalCalendar;