import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendarStore } from '../../store/calendarStore';
import { useTranslation } from '../../hooks/useTranslation';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiClock, FiMapPin, FiEdit, FiTrash2, FiFilter, FiPlus, FiSearch, FiEye } = FiIcons;

function EventList() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('upcoming');
  
  const {
    events,
    setShowEventModal,
    setEditingEvent,
    deleteEvent,
    getUpcomingEvents,
    searchEvents
  } = useCalendarStore();

  // Filter and sort events
  const getFilteredEvents = () => {
    let filteredEvents = events;

    // Filter by search term
    if (searchTerm) {
      filteredEvents = searchEvents(searchTerm);
    }

    // Filter by type
    if (filterType !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.type === filterType);
    }

    // Filter by view mode
    const today = new Date().toISOString().split('T')[0];
    if (viewMode === 'upcoming') {
      filteredEvents = filteredEvents.filter(event => event.date >= today);
    } else if (viewMode === 'past') {
      filteredEvents = filteredEvents.filter(event => event.date < today);
    }

    // Sort events
    filteredEvents.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'created') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    return filteredEvents;
  };

  const filteredEvents = getFilteredEvents();

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
    }
  };

  const getEventTypeColor = (type) => {
    const colors = {
      personal: 'bg-blue-100 text-blue-800 border-blue-200',
      meditation: 'bg-purple-100 text-purple-800 border-purple-200',
      festival: 'bg-red-100 text-red-800 border-red-200',
      ceremony: 'bg-green-100 text-green-800 border-green-200',
      tour: 'bg-orange-100 text-orange-800 border-orange-200',
      workshop: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateString === tomorrow.toISOString().split('T')[0]) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Events
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredEvents.length} events found
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowEventModal(true)}
          className="bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>New Event</span>
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-monastery-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3">
          {/* View Mode */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {['upcoming', 'all', 'past'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === mode
                    ? 'bg-monastery-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-monastery-600'
                }`}
              >
                {mode === 'upcoming' ? 'Upcoming' : mode === 'all' ? 'All Events' : 'Past'}
              </button>
            ))}
          </div>

          {/* Event Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Types</option>
            <option value="personal">Personal</option>
            <option value="meditation">Meditation</option>
            <option value="festival">Festival</option>
            <option value="ceremony">Ceremony</option>
            <option value="tour">Tour</option>
            <option value="workshop">Workshop</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="created">Sort by Created</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Event Header */}
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {event.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      {event.startTime && (
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiClock} className="w-4 h-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                      )}
                    </div>
                    
                    {event.monastery && (
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                        <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                        <span>{event.monastery}</span>
                      </div>
                    )}

                    {event.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditEvent(event)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                    title="Edit Event"
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    title="Delete Event"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Event Footer */}
              {(event.participants || event.notes) && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                    {event.participants && (
                      <span>👥 {event.participants} participants</span>
                    )}
                    {event.notes && (
                      <span className="truncate">📝 {event.notes}</span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SafeIcon icon={FiCalendar} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm || filterType !== 'all' ? 'No matching events' : 'No events yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Start by creating your first monastery visit or event'}
            </p>
            {!searchTerm && filterType === 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEventModal(true)}
                className="bg-monastery-600 hover:bg-monastery-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
              >
                Create Your First Event
              </motion.button>
            )}
          </motion.div>
        )}
      </div>

      {/* Quick Stats */}
      {events.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-monastery-600">
                {events.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Total Events
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {getUpcomingEvents().length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Upcoming
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {events.filter(e => e.type === 'meditation').length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Meditation
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventList;