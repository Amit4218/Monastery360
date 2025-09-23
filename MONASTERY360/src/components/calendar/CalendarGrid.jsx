import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendarStore } from '../../store/calendarStore';
import { useTranslation } from '../../hooks/useTranslation';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiMapPin } = FiIcons;

function CalendarGrid() {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { 
    events, 
    selectedDate, 
    setSelectedDate, 
    setShowEventModal, 
    setEditingEvent,
    getEventsByDate 
  } = useCalendarStore();

  // Calendar logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  const prevMonth = new Date(year, month - 1, 0);
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonth.getDate() - i;
    calendarDays.push({
      day,
      date: new Date(year, month - 1, day),
      isCurrentMonth: false,
      isToday: false
    });
  }
  
  // Current month days
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    calendarDays.push({
      day,
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  // Next month days
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
      isToday: false
    });
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
  };

  const handleAddEvent = (date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const getEventColor = (type) => {
    const colors = {
      personal: 'bg-blue-500',
      meditation: 'bg-purple-500',
      festival: 'bg-red-500',
      ceremony: 'bg-green-500',
      tour: 'bg-orange-500',
      workshop: 'bg-indigo-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <SafeIcon icon={FiChevronLeft} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-monastery-600 text-white rounded-lg font-medium hover:bg-monastery-700 transition-colors duration-200"
          >
            Today
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <SafeIcon icon={FiChevronRight} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Day Names Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayObj, index) => {
          const dateString = dayObj.date.toISOString().split('T')[0];
          const dayEvents = getEventsByDate(dateString);
          const isSelected = selectedDate === dateString;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`
                relative p-2 min-h-[100px] border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer
                ${dayObj.isCurrentMonth 
                  ? 'bg-white dark:bg-gray-800' 
                  : 'bg-gray-50 dark:bg-gray-900 text-gray-400'
                }
                ${dayObj.isToday ? 'ring-2 ring-monastery-500' : ''}
                ${isSelected ? 'bg-monastery-50 dark:bg-monastery-900/20 ring-2 ring-monastery-400' : ''}
                hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200
              `}
              onClick={() => handleDateClick(dayObj.date)}
            >
              {/* Date Number */}
              <div className={`
                text-sm font-medium mb-1
                ${dayObj.isToday ? 'text-monastery-600 font-bold' : ''}
                ${isSelected ? 'text-monastery-700 dark:text-monastery-400' : ''}
              `}>
                {dayObj.day}
              </div>

              {/* Add Event Button */}
              {dayObj.isCurrentMonth && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddEvent(dayObj.date);
                  }}
                  className="absolute top-1 right-1 w-5 h-5 bg-monastery-600 text-white rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                >
                  <SafeIcon icon={FiPlus} className="w-3 h-3" />
                </motion.button>
              )}

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`
                      text-xs px-2 py-1 rounded text-white truncate cursor-pointer
                      ${getEventColor(event.type)}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingEvent(event);
                      setShowEventModal(true);
                    }}
                    title={event.title}
                  >
                    {event.title}
                  </motion.div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 font-medium">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Event Types</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {[
            { type: 'personal', label: 'Personal Visit' },
            { type: 'meditation', label: 'Meditation' },
            { type: 'festival', label: 'Festival' },
            { type: 'ceremony', label: 'Ceremony' },
            { type: 'tour', label: 'Tour' },
            { type: 'workshop', label: 'Workshop' }
          ].map(({ type, label }) => (
            <div key={type} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded ${getEventColor(type)}`} />
              <span className="text-gray-600 dark:text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarGrid;