import { useState } from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SafeIcon from "../components/common/SafeIcon";
import { FiStar, FiMapPin } from "react-icons/fi";
import { useUser } from "../context/userContext";

function HomestayBookings() {
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const { User } = useUser();

  // Form state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [fullName, setFullName] = useState(User.fullName || "Thandup Sherpa");
  const [email, setEmail] = useState(
    User.email || "thandupsherpa123@gmail.com"
  );
  const [phone, setPhone] = useState(User.phone || "987654321");

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

  const handleConfirm = () => {
    if (!checkIn || !checkOut || !guests) {
      alert("Please fill in all booking details.");
      return;
    }

    // Flatten homestay details with booking info
    const booking = {
      ...selectedHomestay,
      checkIn,
      checkOut,
      guests,
      fullName,
      email,
      phone,
    };

    // Safe parse existing bookings
    let existingBookings = [];
    try {
      const stored = localStorage.getItem("bookings");
      if (stored) {
        existingBookings = JSON.parse(stored);
        if (!Array.isArray(existingBookings)) {
          existingBookings = [];
        }
      }
    } catch (e) {
      console.warn("Corrupt localStorage data, resetting:", e);
      existingBookings = [];
    }

    // Add booking
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    console.log("Booking saved:", booking);

    // Reset form
    setSelectedHomestay(null);
    setCheckIn("");
    setCheckOut("");
    setGuests("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {homestay.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {homestay.location} • {homestay.distance}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Hosted by {homestay.host}
                </p>

                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-monastery-600">
                    {homestay.price}
                    <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                      /night
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedHomestay(homestay)}
                    className="bg-monastery-600 hover:bg-monastery-700 text-white px-4 py-2 rounded-lg font-medium"
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Book {selectedHomestay.name}
              </h3>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Number of guests</option>
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4+ guests</option>
                </select>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </form>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setSelectedHomestay(null)}
                  className="flex-1 bg-gray-200 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-monastery-600 hover:bg-monastery-700 text-white py-2 rounded-lg font-medium"
                >
                  Confirm
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
