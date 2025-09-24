import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeIcon from "../components/common/SafeIcon";
import * as FiIcons from "react-icons/fi";
import checkUser from "../hooks/checkUser";
import { postTour } from "../api/user";

function TourBooking() {
  checkUser();
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedCab, setSelectedCab] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    tour: null,
    cab: null,
    guide: null,
    date: "",
    guest: 1,
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  // Tours
  const tours = [
    {
      id: 1,
      name: "Sacred Monasteries Heritage Tour",
      duration: "8 hours",
      price: 2500,
      originalPrice: 3200,
      rating: 4.8,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      monasteries: ["Rumtek", "Enchey", "Do-drul Chorten"],
      highlights: [
        "Ancient Architecture",
        "Spiritual Experience",
        "Cultural Insights",
      ],
      description:
        "Immerse yourself in the spiritual heart of Sikkim with visits to the most significant monasteries.",
      difficulty: "Easy",
      groupSize: "2-15 people",
    },
    {
      id: 2,
      name: "Spiritual Retreat Weekend",
      duration: "2 days",
      price: 8000,
      originalPrice: 10000,
      rating: 4.9,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
      monasteries: ["Pemayangtse", "Tashiding", "Dubdi"],
      highlights: ["Meditation Retreat", "Mountain Views", "Organic Meals"],
      description:
        "A transformative spiritual journey combining monastery visits with meditation and yoga practices.",
      difficulty: "Moderate",
      groupSize: "4-12 people",
    },
    {
      id: 3,
      name: "Photography Expedition",
      duration: "3 days",
      price: 12000,
      originalPrice: 15000,
      rating: 4.7,
      reviews: 67,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      monasteries: ["Rumtek", "Enchey", "Pemayangtse", "Tashiding"],
      highlights: [
        "Golden Hour Shoots",
        "Cultural Documentation",
        "Professional Tips",
      ],
      description:
        "Capture the essence of Sikkimese Buddhism through your lens with expert photography guidance.",
      difficulty: "Moderate",
      groupSize: "3-8 people",
    },
  ];

  // Cab options
  const cabOptions = [
    {
      id: 1,
      type: "Sedan",
      model: "Toyota Etios",
      capacity: "4 passengers",
      pricePerKm: 12,
      basePrice: 1500,
    },
    {
      id: 2,
      type: "SUV",
      model: "Mahindra Scorpio",
      capacity: "7 passengers",
      pricePerKm: 18,
      basePrice: 2200,
    },
    {
      id: 3,
      type: "Luxury",
      model: "Toyota Innova Crysta",
      capacity: "6 passengers",
      pricePerKm: 25,
      basePrice: 3000,
    },
  ];

  // Guides
  const guides = [
    {
      id: 1,
      name: "Tenzin Norbu",
      experience: "8 years",
      specialization: "Buddhist Culture & History",
      rating: 4.9,
      reviews: 156,
      price: 1500,
    },
    {
      id: 2,
      name: "Pemba Sherpa",
      experience: "12 years",
      specialization: "Mountain Culture & Trekking",
      rating: 4.8,
      reviews: 203,
      price: 1800,
    },
    {
      id: 3,
      name: "Dolma Bhutia",
      experience: "6 years",
      specialization: "Local Traditions & Photography",
      rating: 4.9,
      reviews: 98,
      price: 1600,
    },
  ];

  const calculateTotalPrice = () => {
    let total = 0;
    if (bookingData.tour) total += bookingData.tour.price;
    if (bookingData.cab) total += bookingData.cab.basePrice;
    if (bookingData.guide) total += bookingData.guide.price;
    return total * bookingData.guest;
  };

  const handleBookingSubmit = async () => {
    // Flatten booking data
    const newBooking = {
      type: "tour",
      tourName: bookingData.tour?.name,
      date: bookingData.date,
      guest: bookingData.guest, // API expects `guest` (singular)
      cab: bookingData.cab
        ? `${bookingData.cab.type} (${bookingData.cab.model})`
        : null,
      guide: bookingData.guide ? bookingData.guide.name : null,
      fullName: bookingData.personalInfo.name,
      email: bookingData.personalInfo.email,
      phone: bookingData.personalInfo.phone,
      specialRequests: bookingData.personalInfo.specialRequests,
      totalPrice: calculateTotalPrice(),
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));

    // ✅ Send correct payload to API
    await postTour(newBooking);

    alert("Booking confirmed! You will receive a confirmation email shortly.");

    // Reset form
    setSelectedTour(null);
    setSelectedCab(null);
    setSelectedGuide(null);
    setBookingStep(1);
    setBookingData({
      tour: null,
      cab: null,
      guide: null,
      date: "",
      guest: 1,
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        specialRequests: "",
      },
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Tour grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {tours.map((tour) => (
          <motion.div key={tour.id} className="bg-white p-6 rounded-2xl shadow">
            <img
              src={tour.image}
              alt={tour.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{tour.description}</p>
            <p className="font-semibold">₹{tour.price} / person</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedTour(tour);
                setBookingData((prev) => ({ ...prev, tour }));
              }}
              className="mt-4 w-full bg-monastery-600 text-white py-2 rounded-lg"
            >
              Book This Tour
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTour(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-3xl w-full p-6 overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">
                Book: {selectedTour.name}
              </h2>

              {/* Step forms */}
              {bookingStep === 1 && (
                <div>
                  <h4 className="font-semibold mb-2">Choose Cab</h4>
                  {cabOptions.map((cab) => (
                    <div
                      key={cab.id}
                      className={`p-3 border mb-2 rounded cursor-pointer ${
                        selectedCab?.id === cab.id
                          ? "border-monastery-600"
                          : "border-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedCab(cab);
                        setBookingData((prev) => ({ ...prev, cab }));
                      }}
                    >
                      {cab.type} - {cab.model} (₹{cab.basePrice})
                    </div>
                  ))}
                </div>
              )}

              {bookingStep === 2 && (
                <div>
                  <h4 className="font-semibold mb-2">Choose Guide</h4>
                  {guides.map((guide) => (
                    <div
                      key={guide.id}
                      className={`p-3 border mb-2 rounded cursor-pointer ${
                        selectedGuide?.id === guide.id
                          ? "border-monastery-600"
                          : "border-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedGuide(guide);
                        setBookingData((prev) => ({ ...prev, guide }));
                      }}
                    >
                      {guide.name} - ₹{guide.price}/day
                    </div>
                  ))}
                </div>
              )}

              {bookingStep === 3 && (
                <div className="space-y-3">
                  <label>Date</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                  />
                  <label>Guests</label>
                  <input
                    type="number"
                    min="1"
                    value={bookingData.guest}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        guest: parseInt(e.target.value),
                      }))
                    }
                    className="w-full border p-2 rounded"
                  />
                  <label>Name</label>
                  <input
                    type="text"
                    value={bookingData.personalInfo.name}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          name: e.target.value,
                        },
                      }))
                    }
                    className="w-full border p-2 rounded"
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    value={bookingData.personalInfo.email}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          email: e.target.value,
                        },
                      }))
                    }
                    className="w-full border p-2 rounded"
                  />
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={bookingData.personalInfo.phone}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          phone: e.target.value,
                        },
                      }))
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
              )}

              {bookingStep === 4 && (
                <div>
                  <h4 className="font-semibold mb-2">Review</h4>
                  <p>Tour: {bookingData.tour?.name}</p>
                  <p>Date: {bookingData.date}</p>
                  <p>Guests: {bookingData.guest}</p>
                  <p>Cab: {bookingData.cab?.type}</p>
                  <p>Guide: {bookingData.guide?.name}</p>
                  <p>Total: ₹{calculateTotalPrice()}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                {bookingStep > 1 && (
                  <button
                    onClick={() => setBookingStep(bookingStep - 1)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (bookingStep < 4) {
                      setBookingStep(bookingStep + 1);
                    } else {
                      handleBookingSubmit();
                    }
                  }}
                  className="px-6 py-2 bg-monastery-600 text-white rounded"
                >
                  {bookingStep === 4 ? "Confirm" : "Next"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TourBooking;
