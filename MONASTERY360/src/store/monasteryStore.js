import { create } from 'zustand';

export const useMonasteryStore = create((set, get) => ({
  monasteries: [
    {
      id: 1,
      name: 'Rumtek Monastery',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      tradition: 'Kagyu',
      district: 'East Sikkim',
      established: 1966,
      altitude: '1500m',
      distance: '24 km from Gangtok',
      rating: 4.8,
      reviews: 324,
      hasVirtualTour: true,
      hasAudioGuide: true,
      accessibility: 'Easy',
      description: 'The largest monastery in Sikkim and the main seat of the Karmapa.',
      highlights: ['Golden Stupa', 'Prayer Wheels', 'Monastery Museum'],
      upcomingFestivals: ['Losar', 'Buddha Purnima'],
    },
    {
      id: 2,
      name: 'Enchey Monastery',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      tradition: 'Nyingma',
      district: 'East Sikkim',
      established: 1840,
      altitude: '1800m',
      distance: '3 km from Gangtok',
      rating: 4.6,
      reviews: 198,
      hasVirtualTour: true,
      hasAudioGuide: true,
      accessibility: 'Moderate',
      description: 'One of the most important monasteries in Gangtok with stunning valley views.',
      highlights: ['Ancient Murals', 'Prayer Hall', 'Mountain Views'],
      upcomingFestivals: ['Cham Dance'],
    },
    {
      id: 3,
      name: 'Pemayangtse Monastery',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      tradition: 'Nyingma',
      district: 'West Sikkim',
      established: 1705,
      altitude: '2085m',
      distance: '110 km from Gangtok',
      rating: 4.9,
      reviews: 412,
      hasVirtualTour: false,
      hasAudioGuide: true,
      accessibility: 'Difficult',
      description: 'One of the oldest and most significant monasteries in Sikkim.',
      highlights: ['Wooden Sculptures', 'Ancient Texts', 'Himalayan Views'],
      upcomingFestivals: ['Chaang Lo'],
    },
    {
      id: 4,
      name: 'Tashiding Monastery',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      tradition: 'Nyingma',
      district: 'West Sikkim',
      established: 1641,
      altitude: '1465m',
      distance: '40 km from Gyalshing',
      rating: 4.7,
      reviews: 156,
      hasVirtualTour: false,
      hasAudioGuide: false,
      accessibility: 'Moderate',
      description: 'Sacred monastery known for its holy water and spiritual significance.',
      highlights: ['Sacred Chorten', 'Holy Water', 'Panoramic Views'],
      upcomingFestivals: ['Bhumchu'],
    },
    {
      id: 5,
      name: 'Dubdi Monastery',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      tradition: 'Nyingma',
      district: 'West Sikkim',
      established: 1701,
      altitude: '2100m',
      distance: '45 km from Gyalshing',
      rating: 4.5,
      reviews: 89,
      hasVirtualTour: false,
      hasAudioGuide: false,
      accessibility: 'Difficult',
      description: 'The first monastery built in Sikkim, known as "The Retreat".',
      highlights: ['Historical Significance', 'Ancient Architecture', 'Forest Setting'],
      upcomingFestivals: ['Losar'],
    }
  ],
  selectedMonastery: null,
  filters: {
    district: '',
    tradition: '',
    accessibility: '',
    hasVirtualTour: false,
  },
  searchQuery: '',
  loading: false,
  error: null,

  setMonasteries: (monasteries) => set({ monasteries }),
  setSelectedMonastery: (monastery) => set({ selectedMonastery: monastery }),
  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  getFilteredMonasteries: () => {
    const { monasteries, filters, searchQuery } = get();
    
    return monasteries.filter(monastery => {
      const matchesSearch = !searchQuery || 
        monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.tradition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDistrict = !filters.district || monastery.district === filters.district;
      const matchesTradition = !filters.tradition || monastery.tradition === filters.tradition;
      const matchesAccessibility = !filters.accessibility || monastery.accessibility === filters.accessibility;
      const matchesVirtualTour = !filters.hasVirtualTour || monastery.hasVirtualTour;

      return matchesSearch && matchesDistrict && matchesTradition && matchesAccessibility && matchesVirtualTour;
    });
  },

  getMonasteryById: (id) => {
    const { monasteries } = get();
    return monasteries.find(monastery => monastery.id === parseInt(id));
  },
}));