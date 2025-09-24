import { useState } from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SafeIcon from "../components/common/SafeIcon";
import { FiStar, FiMapPin } from "react-icons/fi";
import { useUser } from "../context/userContext";
import { postHomeStay } from "../api/user";

function HomestayBookings() {
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const { User } = useUser();

  // Form state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [fullName, setFullName] = useState(User?.fullName || "Thandup Sherpa");
  const [email, setEmail] = useState(
    User?.email || "thandupsherpa123@gmail.com"
  );
  const [phone, setPhone] = useState(User?.phone || "987654321");

  const homestays = [
    {
      id: 1,
      name: "Home Stay | Pal Karma Zurmang Shedup",
      location: "Near Rumtek Monastery",
      distance: "2 km from monastery",
      price: "₹1,700",
      rating: 4.6,
      reviews: 75,
      image:
        "https://lh3.googleusercontent.com/p/AF1QipNFiu7q7Fw5Z5rnp5ROCiMHhLJtxfriFqofokfc=w252-h166-k-no",
      amenities: ["Free WiFi", "Breakfast", "Parking", "Mountain View"],
      host: "Zurmang Shedup",
    },
    {
      id: 2,
      name: "Tashi Norkhil Villa & Homestay",
      location: "Enchey Area",
      distance: "3km from monastery",
      price: "₹1,370",
      rating: 4.7,
      reviews: 31,
      image:
        "https://lh3.googleusercontent.com/p/AF1QipNq7HzUrBdawPuqFrxgOC4I95h7dd4SjQKqrVIe=s287-w287-h192-n-k-no-v1",
      amenities: ["Free WiFi", "All Meals", "Garden", "Cultural Programs"],
      host: "Tashi Norkhil ",
    },
  ];

  const handleConfirm = async () => {
    if (!checkIn || !checkOut || !guests) {
      alert("Please fill in all booking details.");
      return;
    }

    // Create booking data in the exact format expected by postHomeStay
    const bookingData = {
      id: selectedHomestay.id,
      name: selectedHomestay.name,
      distance: selectedHomestay.distance,
      location: selectedHomestay.location,
      price: selectedHomestay.price,
      rating: selectedHomestay.rating,
      reviews: selectedHomestay.reviews,
      image: selectedHomestay.image,
      host: selectedHomestay.host,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      fullName: fullName,
      email: email,
      phone: phone,
    };

    try {
      // Send to API
      await postHomeStay(bookingData);

      // Store in localStorage under homeStayBookings
      let existingHomeStayBookings = [];
      try {
        const stored = localStorage.getItem("homeStayBookings");
        if (stored) {
          existingHomeStayBookings = JSON.parse(stored);
          if (!Array.isArray(existingHomeStayBookings)) {
            existingHomeStayBookings = [];
          }
        }
      } catch (e) {
        console.warn("Corrupt localStorage data, resetting:", e);
        existingHomeStayBookings = [];
      }

      // Add new booking
      existingHomeStayBookings.push(bookingData);
      localStorage.setItem(
        "homeStayBookings",
        JSON.stringify(existingHomeStayBookings)
      );

      // Reset form and show success message
      setSelectedHomestay(null);
      setCheckIn("");
      setCheckOut("");
      setGuests("");

      alert("Booking confirmed successfully!");
    } catch (error) {
      console.error("Error booking homestay:", error);
      alert("Failed to book homestay. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Homestay Bookings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Experience authentic local hospitality in Sikkim
          </p>
        </motion.div>

        {/* Homestays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {homestays.map((homestay, index) => (
            <motion.div
              key={homestay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <LazyLoadImage
                src={homestay.image}
                alt={homestay.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {homestay.name}
                </h3>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                  <span className="text-sm">{homestay.location}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">{homestay.distance}</span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <SafeIcon
                      icon={FiStar}
                      className="w-4 h-4 text-yellow-400 mr-1"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {homestay.rating}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      ({homestay.reviews} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Hosted by <span className="font-medium">{homestay.host}</span>
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {homestay.amenities?.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-bold text-monastery-600">
                      {homestay.price}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      /night
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedHomestay(homestay)}
                    className="bg-monastery-600 hover:bg-monastery-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Book Stay
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Form Modal */}
        {selectedHomestay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Book Your Stay
                </h3>
                <button
                  onClick={() => setSelectedHomestay(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {selectedHomestay.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedHomestay.location}
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      min={checkIn || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select guests</option>
                    <option value="1 guest">1 guest</option>
                    <option value="2 guests">2 guests</option>
                    <option value="3 guests">3 guests</option>
                    <option value="4 guests">4 guests</option>
                    <option value="4+ guests">4+ guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </form>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setSelectedHomestay(null)}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-monastery-600 hover:bg-monastery-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomestayBookings;
