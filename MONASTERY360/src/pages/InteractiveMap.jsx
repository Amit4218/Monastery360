import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SafeIcon from "../components/common/SafeIcon";
import LoadingSpinner from "../components/common/LoadingSpinner";
import * as FiIcons from "react-icons/fi";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const { FiMapPin, FiNavigation, FiFilter, FiRoute, FiInfo, FiStar } = FiIcons;

// Fix Leaflet's default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function InteractiveMap() {
  const [loading, setLoading] = useState(true);
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mapView, setMapView] = useState("street");
  const [searchQuery, setSearchQuery] = useState("");

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      coordinates: [27.2887, 88.5615],
      tradition: "Kagyu",
      established: 1966,
      hasVirtualTour: true,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      description:
        "The largest monastery in Sikkim and the main seat of the Karmapa.",
    },
    {
      id: 2,
      name: "Enchey Monastery",
      coordinates: [27.3358, 88.6192],
      tradition: "Nyingma",
      established: 1840,
      hasVirtualTour: true,
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=200&fit=crop",
      description:
        "One of the most important monasteries in Gangtok with stunning valley views.",
    },
    {
      id: 3,
      name: "Pemayangtse Monastery",
      coordinates: [27.3044, 88.2528],
      tradition: "Nyingma",
      established: 1705,
      hasVirtualTour: false,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      description:
        "One of the oldest and most significant monasteries in Sikkim.",
    },
    {
      id: 4,
      name: "Lingdum Monastery",
      coordinates: [27.331186, 88.5790941],
      tradition: "Zurmang Kagyu",
      established: 1999,
      hasVirtualTour: false,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      description:
        "A serene Kagyu monastery founded by Zurmang Gharwang Rinpoche; known for its large golden Buddha statue and murals.",
    },
  ];

  const [filteredMonasteries, setFilteredMonasteries] = useState(monasteries);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    const filtered = monasteries.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tradition.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMonasteries(filtered);
  }, [searchQuery]);

  const handleMonasteryClick = (monastery) => {
    setSelectedMonastery(monastery);
  };

  const getDirections = (monastery) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${monastery.coordinates[0]},${monastery.coordinates[1]}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading interactive map..." />
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative">
      {/* Search & Filters */}
      <div className="absolute top-4 left-4 z-20 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Search monasteries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <SafeIcon icon={FiFilter} className="w-5 h-5" />
        </button>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-20 min-w-64"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Filter Monasteries
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tradition
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                onChange={(e) => {
                  const value = e.target.value;
                  setFilteredMonasteries(
                    monasteries.filter((m) =>
                      value === "All" ? true : m.tradition === value
                    )
                  );
                }}
              >
                <option>All</option>
                <option>Kagyu</option>
                <option>Nyingma</option>
                <option>Zurmang Kagyu</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="virtualTour"
                className="rounded"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilteredMonasteries(
                    monasteries.filter((m) =>
                      checked ? m.hasVirtualTour : true
                    )
                  );
                }}
              />
              <label
                htmlFor="virtualTour"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Has Virtual Tour
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {/* Map */}
      <MapContainer
        center={[27.33, 88.61]}
        zoom={10}
        className="h-full w-full"
        style={{ zIndex: 0 }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Street">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Hybrid">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Terrain">
            <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
        </LayersControl>

        {filteredMonasteries.map((monastery, index) => (
          <Marker
            key={monastery.id}
            position={monastery.coordinates}
            eventHandlers={{
              click: () => handleMonasteryClick(monastery),
            }}
          >
            <Popup>
              <div className="font-semibold">{monastery.name}</div>
              <div className="text-sm text-gray-600">
                {monastery.tradition} • Established {monastery.established}
              </div>
              <button
                onClick={() => getDirections(monastery)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                Get Directions
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Sidebar for Selected Monastery */}
      {selectedMonastery && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-0 right-0 w-80 sm:w-96 h-full bg-white dark:bg-gray-800 shadow-lg z-20 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedMonastery.name}
              </h2>
              <button
                onClick={() => setSelectedMonastery(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>

            <img
              src={selectedMonastery.image}
              alt={selectedMonastery.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedMonastery.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Tradition:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedMonastery.tradition}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Established:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedMonastery.established}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default InteractiveMap;
