import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SafeIcon from "../components/common/SafeIcon";
import * as FiIcons from "react-icons/fi";
import { useUser } from "../context/userContext";
import checkUser from "../hooks/checkUser";
import { getData } from "../api/user";

const {
  FiUser,
  FiSettings,
  FiBookmark,
  FiMapPin,
  FiCalendar,
  FiEdit,
  FiMail,
  FiPhone,
  FiHome,
  FiNavigation,
} = FiIcons;

function UserProfile() {
  checkUser();

  useEffect(() => {
    const data = async () => {
      await getData(); // stores homeStayBookings and tourBookings in the local s
    };
    data();
  }, []);

  const [activeTab, setActiveTab] = useState("profile");
  const [bio, setBio] = useState("");
  const { User, setUser } = useUser();
  const [bookings, setBookings] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  // Initialize state from localStorage and User context
  useEffect(() => {
    const storedBio = localStorage.getItem("bio") || "";
    setBio(storedBio);

    // Initialize user data from context with fallbacks
    setUserData({
      name: User?.fullName || "Thandup Sherpa",
      email: User?.email || "thandupsherpa153@gmail.com",
      phone: User?.phone || "+91 1234567890",
      location: User?.location || "Gangtok, Sikkim",
    });
  }, [User]);

  useEffect(() => {
    try {
      const storedBookings =
        JSON.parse(localStorage.getItem("bookings")) || "[]";
      setBookings(storedBookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
      setBookings([]);
    }
  }, []);

  const user = {
    ...userData,
    joinDate: "January 2024",
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "bookings", label: "Bookings", icon: FiCalendar },
    { id: "settings", label: "Settings", icon: FiSettings },
  ];

  const handleUserDataChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSavePersonalInfo = () => {
    const updatedUser = {
      ...User,
      fullName: userData.name,
      email: userData.email,
      phone: userData.phone,
      location: userData.location,
      bio,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("bio", bio);

    alert("Personal information saved!");
  };

  // Function to render booking cards based on type
  const renderBookingCard = (booking, index) => {
    if (booking.type === "tour") {
      // Tour booking card
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <SafeIcon
                  icon={FiNavigation}
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {booking.tourName || "Tour Booking"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tour Package
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium rounded-full">
              ₹{(booking.totalPrice ?? 0).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Date:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.date
                  ? new Date(booking.date).toLocaleDateString()
                  : "Flexible"}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Guests:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.guests || 0}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Vehicle:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.cab || "Not specified"}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Guide:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.guide || "Not assigned"}
              </p>
            </div>
          </div>
        </motion.div>
      );
    } else {
      // Accommodation booking card (default)
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <SafeIcon
                  icon={FiHome}
                  className="w-4 h-4 text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {booking.name || "Accommodation Booking"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stay</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium rounded-full">
              {booking.price || "₹1,700"}
            </span>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-1">
              <SafeIcon icon={FiMapPin} className="w-3 h-3" />
              <span>{booking.location || "Location not specified"}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                Check-in:
              </span>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.checkIn
                  ? new Date(booking.checkIn).toLocaleDateString()
                  : "Not set"}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                Check-out:
              </span>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.checkOut
                  ? new Date(booking.checkOut).toLocaleDateString()
                  : "Not set"}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Guests:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.guests || "2 guests"}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Rating:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.rating ? `${booking.rating} ★` : "Not rated"}
              </p>
            </div>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-monastery-600 to-tibetan-gold rounded-full flex items-center justify-center shadow-lg">
              <SafeIcon
                icon={FiUser}
                className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h1>

              <div className="space-y-1 mb-4">
                <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start space-x-2">
                  <SafeIcon icon={FiMail} className="w-4 h-4" />
                  <span>{user.email}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start space-x-2">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                  <span>{user.location}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Joined {user.joinDate}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-4 sm:px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap lg:w-full ${
                      activeTab === tab.id
                        ? "text-monastery-600 bg-monastery-50 dark:bg-monastery-900/20 border-r-4 lg:border-r-4 lg:border-b-0 border-monastery-600"
                        : "text-gray-600 dark:text-gray-400 hover:text-monastery-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="p-4 sm:p-6">
                {activeTab === "profile" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) =>
                            handleUserDataChange("name", e.target.value)
                          }
                          className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) =>
                            handleUserDataChange("email", e.target.value)
                          }
                          className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) =>
                            handleUserDataChange("phone", e.target.value)
                          }
                          className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={userData.location}
                          onChange={(e) =>
                            handleUserDataChange("location", e.target.value)
                          }
                          className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Bio
                        </label>
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          rows={3}
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSavePersonalInfo}
                      className="bg-monastery-600 hover:bg-monastery-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                    >
                      Save Information
                    </motion.button>
                  </motion.div>
                )}

                {activeTab === "bookings" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      My Bookings
                    </h3>

                    {bookings.length === 0 ? (
                      <div className="text-center py-12">
                        <SafeIcon
                          icon={FiCalendar}
                          className="w-16 h-16 text-gray-400 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          No Bookings Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Your bookings will appear here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {bookings.map((booking, index) =>
                          renderBookingCard(booking, index)
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Placeholder for other tabs */}
                {(activeTab === "saved" || activeTab === "settings") && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center py-12"
                  >
                    <SafeIcon
                      icon={
                        tabs.find((tab) => tab.id === activeTab)?.icon ||
                        FiSettings
                      }
                      className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {activeTab === "saved" ? "Saved Places" : "Settings"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {activeTab === "saved"
                        ? "Your saved places will appear here"
                        : "Settings functionality coming soon"}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
