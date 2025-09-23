import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendarStore } from '../../store/calendarStore';
import { useTranslation } from '../../hooks/useTranslation';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiSave, FiTrash2, FiCalendar, FiClock, FiMapPin, FiUsers, FiEdit, FiBell } = FiIcons;

function EventModal() {
  const { t } = useTranslation();
  const { 
    showEventModal, 
    editingEvent, 
    selectedDate,
    setShowEventModal, 
    setEditingEvent,
    addEvent,
    updateEvent,
    deleteEvent
  } = useCalendarStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: selectedDate,
    startTime: '09:00',
    endTime: '10:00',
    type: 'personal',
    monastery: '',
    location: '',
    participants: '',
    reminder: '30',
    notes: ''
  });

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (editingEvent) {
      setFormData({ ...editingEvent });
    } else {
      setFormData({
        title: '',
        description: '',
        date: selectedDate,
        startTime: '09:00',
        endTime: '10:00',
        type: 'personal',
        monastery: '',
        location: '',
        participants: '',
        reminder: '30',
        notes: ''
      });
    }
  }, [editingEvent, selectedDate]);

  const eventTypes = [
    { id: 'personal', label: t('calendar.personal', 'Personal Visit'), color: 'bg-blue-500' },
    { id: 'meditation', label: t('calendar.meditation', 'Meditation Session'), color: 'bg-purple-500' },
    { id: 'festival', label: t('calendar.festival', 'Festival'), color: 'bg-red-500' },
    { id: 'ceremony', label: t('calendar.ceremony', 'Ceremony'), color: 'bg-green-500' },
    { id: 'tour', label: t('calendar.tour', 'Guided Tour'), color: 'bg-orange-500' },
    { id: 'workshop', label: t('calendar.workshop', 'Workshop'), color: 'bg-indigo-500' }
  ];

  const monasteries = [
    'Rumtek Monastery',
    'Enchey Monastery',
    'Pemayangtse Monastery',
    'Tashiding Monastery',
    'Dubdi Monastery'
  ];

  const reminderOptions = [
    { value: '0', label: t('calendar.noReminder', 'No reminder') },
    { value: '15', label: t('calendar.15min', '15 minutes before') },
    { value: '30', label: t('calendar.30min', '30 minutes before') },
    { value: '60', label: t('calendar.1hour', '1 hour before') },
    { value: '1440', label: t('calendar.1day', '1 day before') }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
    } else {
      addEvent(formData);
    }
    
    handleClose();
  };

  const handleDelete = () => {
    if (editingEvent) {
      setIsDeleting(true);
      setTimeout(() => {
        deleteEvent(editingEvent.id);
        handleClose();
        setIsDeleting(false);
      }, 1000);
    }
  };

  const handleClose = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setIsDeleting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!showEventModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-monastery-100 dark:bg-monastery-900/20 rounded-xl flex items-center justify-center">
                <SafeIcon icon={editingEvent ? FiEdit : FiCalendar} className="w-5 h-5 text-monastery-600 dark:text-monastery-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingEvent ? 'Edit Event' : t('calendar.scheduleEvent', 'Schedule Your Event')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {editingEvent ? 'Update your event details' : t('calendar.createPersonalEvent', 'Create a personal event or reminder')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {editingEvent && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200"
                >
                  {isDeleting ? (
                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                  )}
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {t('calendar.eventTitle', 'Event Title')} *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent transition-all duration-300"
                placeholder={t('calendar.eventTitlePlaceholder', 'Enter event title')}
                required
              />
            </div>

            {/* Event Type & Monastery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calendar.eventType', 'Event Type')}
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
                >
                  {eventTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calendar.monastery', 'Monastery')}
                </label>
                <select
                  name="monastery"
                  value={formData.monastery}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
                >
                  <option value="">{t('calendar.selectMonastery', 'Select Monastery')}</option>
                  {monasteries.map((monastery) => (
                    <option key={monastery} value={monastery}>
                      {monastery}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calendar.date', 'Date')} *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calendar.startTime', 'Start Time')}
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calendar.endTime', 'End Time')}
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Location & Participants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calendar.location', 'Location')}
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
                  placeholder={t('calendar.locationPlaceholder', 'Specific location or area')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calendar.participants', 'Participants')}
                </label>
                <input
                  type="text"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
                  placeholder={t('calendar.participantsPlaceholder', 'Number of people')}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {t('calendar.description', 'Description')}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent resize-none"
                placeholder={t('calendar.descriptionPlaceholder', 'What do you plan to do?')}
              />
            </div>

            {/* Reminder & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calendar.reminder', 'Reminder')}
                </label>
                <select
                  name="reminder"
                  value={formData.reminder}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
                >
                  {reminderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('calendar.notes', 'Additional Notes')}
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-monastery-500 focus:border-transparent"
                  placeholder={t('calendar.notesPlaceholder', 'Any special requirements')}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {t('calendar.cancel', 'Cancel')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiSave} className="w-5 h-5" />
                <span>{editingEvent ? t('calendar.updateEvent', 'Update Event') : t('calendar.createEvent', 'Create Event')}</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EventModal;