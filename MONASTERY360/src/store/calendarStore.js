import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCalendarStore = create(
  persist(
    (set, get) => ({
      events: [
        // Sample events for testing
        {
          id: '1',
          title: 'Visit Rumtek Monastery',
          description: 'Guided tour of the main monastery',
          date: '2024-12-25',
          startTime: '09:00',
          endTime: '12:00',
          type: 'personal',
          monastery: 'Rumtek Monastery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Morning Meditation',
          description: 'Join the morning meditation session',
          date: '2024-12-26',
          startTime: '06:00',
          endTime: '07:00',
          type: 'meditation',
          monastery: 'Enchey Monastery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      selectedDate: new Date().toISOString().split('T')[0],
      viewMode: 'month',
      showEventModal: false,
      editingEvent: null,

      // Event CRUD operations
      addEvent: (event) => {
        const newEvent = {
          ...event,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set(state => ({
          events: [...state.events, newEvent]
        }));
      },

      updateEvent: (eventId, updatedEvent) => {
        set(state => ({
          events: state.events.map(event =>
            event.id === eventId
              ? { ...event, ...updatedEvent, updatedAt: new Date().toISOString() }
              : event
          )
        }));
      },

      deleteEvent: (eventId) => {
        set(state => ({
          events: state.events.filter(event => event.id !== eventId)
        }));
      },

      getEventById: (eventId) => {
        const { events } = get();
        return events.find(event => event.id === eventId);
      },

      getEventsByDate: (date) => {
        const { events } = get();
        return events.filter(event => event.date === date);
      },

      getUpcomingEvents: (limit = 5) => {
        const { events } = get();
        const today = new Date().toISOString().split('T')[0];
        return events
          .filter(event => event.date >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, limit);
      },

      // UI state management
      setSelectedDate: (date) => set({ selectedDate: date }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setShowEventModal: (show) => set({ showEventModal: show }),
      setEditingEvent: (event) => set({ editingEvent: event }),

      // Search and filter
      searchEvents: (query) => {
        const { events } = get();
        return events.filter(event =>
          event.title.toLowerCase().includes(query.toLowerCase()) ||
          (event.description && event.description.toLowerCase().includes(query.toLowerCase())) ||
          (event.monastery && event.monastery.toLowerCase().includes(query.toLowerCase()))
        );
      },

      getEventsByType: (type) => {
        const { events } = get();
        return events.filter(event => event.type === type);
      }
    }),
    {
      name: 'monastery-calendar-events'
    }
  )
);