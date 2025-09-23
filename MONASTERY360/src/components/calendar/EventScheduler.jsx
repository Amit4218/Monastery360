import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiCalendar, FiClock, FiMapPin, FiUser, FiEdit, FiTrash2, FiSave } = FiIcons;

function EventScheduler({ isOpen, onClose, onEventAdd, selectedDate, existingEvents = [] }) {
  const { t } = useTranslation();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: selectedDate || new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    type: 'personal',
    monastery: '',
    reminder: '30',
    notes: '',
    participants: ''
  });

  const [isEditing, setIsEditing] = useState(null);

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
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      createdAt: new Date().toISOString()
    };
    
    onEventAdd(newEvent);
    
    // Reset form
    setEventData({
      title: '',
      description: '',
      date: selectedDate || new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      location: '',
      type: 'personal',
      monastery: '',
      reminder: '30',
      notes: '',
      participants: ''
    });
    
    onClose();
  };

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteEvent = (eventId) => {
    // This would typically call a delete function passed as prop
    console.log('Delete event:', eventId);
  };

  const handleEditEvent = (event) => {
    setEventData(event);
    setIsEditing(event.id);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('calendar.scheduleEvent', 'Schedule Your Event')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('calendar.createPersonalEvent', 'Create a personal event or reminder for your monastery visit')}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Event Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      {t('calendar.eventTitle', 'Event Title')} *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={eventData.title}
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
                        value={eventData.type}
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
                        value={eventData.monastery}
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
                        value={eventData.date}
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
                        value={eventData.startTime}
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
                        value={eventData.endTime}
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
                        value={eventData.location}
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
                        value={eventData.participants}
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
                      value={eventData.description}
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
                        value={eventData.reminder}
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
                        value={eventData.notes}
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
                      onClick={onClose}
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
                      <span>{isEditing ? t('calendar.updateEvent', 'Update Event') : t('calendar.createEvent', 'Create Event')}</span>
                    </motion.button>
                  </div>
                </form>
              </div>

              {/* Existing Events Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <SafeIcon icon={FiCalendar} className="w-5 h-5" />
                    <span>{t('calendar.upcomingEvents', 'Your Events')}</span>
                  </h3>

                  {existingEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <SafeIcon icon={FiCalendar} className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t('calendar.noEvents', 'No events scheduled yet')}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {existingEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                {event.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(event.date).toLocaleDateString()} at {event.startTime}
                              </p>
                              {event.monastery && (
                                <p className="text-xs text-monastery-600 dark:text-monastery-400 mt-1">
                                  {event.monastery}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEditEvent(event)}
                                className="text-blue-500 hover:text-blue-600 p-1"
                              >
                                <SafeIcon icon={FiEdit} className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-red-500 hover:text-red-600 p-1"
                              >
                                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Tips */}
                <div className="bg-monastery-50 dark:bg-monastery-900/20 rounded-2xl p-6 mt-6">
                  <h4 className="font-semibold text-monastery-800 dark:text-monastery-300 mb-3">
                    {t('calendar.tips', 'Planning Tips')}
                  </h4>
                  <ul className="text-sm text-monastery-700 dark:text-monastery-400 space-y-2">
                    <li>• {t('calendar.tip1', 'Check monastery timings before visiting')}</li>
                    <li>• {t('calendar.tip2', 'Dress modestly and respectfully')}</li>
                    <li>• {t('calendar.tip3', 'Maintain silence in prayer halls')}</li>
                    <li>• {t('calendar.tip4', 'Photography restrictions may apply')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EventScheduler;