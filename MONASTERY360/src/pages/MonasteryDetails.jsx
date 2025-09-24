import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SafeIcon from "../components/common/SafeIcon";
import LoadingSpinner from "../components/common/LoadingSpinner";
import * as FiIcons from "react-icons/fi";

const {
  FiMapPin,
  FiClock,
  FiStar,
  FiPlay,
  FiHeadphones,
  FiCalendar,
  FiHome,
  FiCamera,
  FiInfo,
} = FiIcons;

function MonasteryDetails() {
  const { id } = useParams();
  const [monastery, setMonastery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  function getAudio(lang) {
    const eng =
      "https://res.cloudinary.com/dtmpzi4ye/video/upload/v1758665143/kvqodfocijnhirhl7oas.mp4";
    const hindi =
      "https://www.canva.com/design/DAGz1YtdPZg/kDTQiMBVb_N0zOWRQDPBvQ/watch?utm_content=DAGz1YtdPZg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h221353512a";
    const nepali =
      "https://www.canva.com/design/DAGz1qu6kWo/3DhTCEZDu_lhdwoZaauNLg/watch?utm_content=DAGz1qu6kWo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hbd4c11ca73";

    if (lang == "english") {
      const a = document.createElement("a");
      a.href = eng;
      a.target = "_blank";

      document.body.appendChild(a);
      a.click();
    } else if (lang == "nepali") {
      const a = document.createElement("a");
      a.href = nepali;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
    } else if (lang == "hindi") {
      const a = document.createElement("a");
      a.href = hindi;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
    } else {
      return;
    }

    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);
  }

  // Mock data - in real app, this would come from API
  const mockMonastery = {
    id: parseInt(id),
    name: "Lingdum Monastery",
    image:
      "https://scontent-bom2-4.xx.fbcdn.net/v/t39.30808-6/473643140_593361926883121_2142552495858515871_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=rYagUHd0Z28Q7kNvwFiTreu&_nc_oc=AdmqP0ycAHK0H54anBGz3bSZWSQFBOnAWc1FsQKq6_N8WNxWZ3DNoB14f4kZ9lkc54bNU3sMmyuHL9YgVonxzkD-&_nc_zt=23&_nc_ht=scontent-bom2-4.xx&_nc_gid=uSIPQDAbs2GWhWLCOQ7kiw&oh=00_Afb6UuAviuYL3VxPdfaZ6kKqclO9cko14R41nWIHrDUPbQ&oe=68D8D285",
    gallery: [
      "https://scontent-bom2-1.xx.fbcdn.net/v/t39.30808-6/309504348_101655326058958_7207180780009684964_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=OHFL3rjgeBQQ7kNvwEubUQW&_nc_oc=AdlHDuYL0vMMK9qjZOyOyKNGiHBsywXL5wHFLlCPCWYYR0ahd62NFjOajy8YyqkPfu2Lb4cdKZ7SfJBshQbvv-FE&_nc_zt=23&_nc_ht=scontent-bom2-1.xx&_nc_gid=iFOsUL13dtEzwTAxyEJCMA&oh=00_AfaQjFzhTO4v17HayfSiI1AGscerYXenGg0RZH3RHKBIrA&oe=68D8D7D6",
      "https://scontent-bom2-3.xx.fbcdn.net/v/t39.30808-6/553197611_786240054261973_5906991413193784122_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ngNlH2xr_nkQ7kNvwF30OZz&_nc_oc=AdmdmCW5Crk142507nxyPgnPYohXx5eeiG19YG6A0kh-HY6wnLHNBQzCzfppYviGX-InsZcQkpDEZLdtD5UrObGV&_nc_zt=23&_nc_ht=scontent-bom2-3.xx&_nc_gid=k92a408FzxxT9RdMpbHUyQ&oh=00_AfZA6h4BzM0abbsxr2I0yhXYfrCFsUptZ1fUgPyVIFWL4w&oe=68D8E749",
      "https://scontent-bom2-2.xx.fbcdn.net/v/t39.30808-6/549801593_783215687897743_6818158841350314633_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ChsTUdXFTrUQ7kNvwFgFGRk&_nc_oc=AdkA2hgeqAeMVP7pk0Hu2YiVt1w_9T9NYo_6z3bgWDexkpr-BCLTR7oLr3aDXlp1Kic_Y3O30PDGIPtQCfjTuKlN&_nc_zt=23&_nc_ht=scontent-bom2-2.xx&_nc_gid=GGAHorb2DACJ8y-Z6yvMwg&oh=00_AfYQbyBwH11RiZFMwdMN06JjVgQcMzv0D2C1JZvfCrFHag&oe=68D8F141",
      "https://scontent-bom2-3.xx.fbcdn.net/v/t39.30808-6/547294755_779185921634053_123640945098209310_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=3TwYmCJ2N5gQ7kNvwF4VHSo&_nc_oc=AdmAL54PUDxJwVkkUMu7jlOXmFetAvkzmbQDj3PRV2frQtRKiwUyh3ZBCMNtV9uS1Gjl9w2wpzFUgVm1-rYiG65L&_nc_zt=23&_nc_ht=scontent-bom2-3.xx&_nc_gid=siURuVeNX-Ug6Ny6Cj64tg&oh=00_AfYI_3Q80K40qEavOgpLnp1chy6ZkzxtCkBpdIExYKLZxA&oe=68D8F465",
      "https://scontent-bom2-1.xx.fbcdn.net/v/t39.30808-6/541525220_769943045891674_1969514866313178483_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_ohc=xL_5yiG1HR8Q7kNvwHvrD-K&_nc_oc=AdkRGnxqMVE6oBB1JVB8cz3PNCD9UnH6zNi36URw6QJSCfigEpQiwj1TksQ-G9vJLa0pTZ9HJErePCY0Krm_XT8_&_nc_zt=23&_nc_ht=scontent-bom2-1.xx&_nc_gid=HvpOTHv99JQ89-DQpAHGvg&oh=00_AfalnzLecP82zU0IPwdGy-hiNVrzaGVLk2jhfRJgwDhtMQ&oe=68D8F09C",
      "https://scontent-bom2-1.xx.fbcdn.net/v/t39.30808-6/540590878_769549295931049_2714029641725986417_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=joG54E13A_QQ7kNvwHtDPE3&_nc_oc=AdlcwwBxh-lZYyCppY9EUiaalDbbEILjQuIhrgwOx-XxdlL2QkigjrDQWYUYmy_9_GzcQtt4gGevhA6TR9OEGyAX&_nc_zt=23&_nc_ht=scontent-bom2-1.xx&_nc_gid=C8VoXno5pOtOZIVf9rRLyg&oh=00_AfZsJ9ZCY53Ttl27RkHnfDR0QDPtqneyACpT1q4NK0SP3g&oe=68D8E695",
    ],
    tradition: "Kagyu",
    district: "East Sikkim",
    established: 1966,
    altitude: "1500m",
    coordinates: { lat: 27.3389, lng: 88.5678 },
    distance: "24 km from Gangtok",
    rating: 4.8,
    reviews: 324,
    hasVirtualTour: true,
    hasAudioGuide: true,
    accessibility: "Easy",
    description:
      "Lingdum Monastery, also called the Dharmachakra Centre, is a gompa located in the Indian state of Sikkim near the capital Gangtok. It is the largest monastery in Sikkim and is the main seat of the Karmapa.",
    history:
      "The monastery was built under the direction of the 16th Karmapa, Rangjung Rigpe Dorje in the 1960s. The monastery is built in the traditional Tibetan architectural style, although it also has some aspects of Sikkimese and Chinese architecture.",
    significance:
      "Lingdum serves as the main seat of the Karma Kagyu lineage and is home to the Karmapa, one of the most important figures in Tibetan Buddhism.",
    timings: {
      opening: "6:00 AM",
      closing: "6:00 PM",
      prayerTimes: ["6:00 AM", "12:00 PM", "6:00 PM"],
    },
    festivals: [
      {
        name: "Losar",
        date: "February",
        description: "Tibetan New Year celebration",
      },
      {
        name: "Buddha Purnima",
        date: "May",
        description: "Buddha's birthday celebration",
      },
      {
        name: "Saga Dawa",
        date: "June",
        description: "Month of merit celebration",
      },
    ],
    nearbyStays: [
      { name: "Monastery Guest House", distance: "0.5 km", rating: 4.2 },
      { name: "Lingdum Retreat", distance: "1 km", rating: 4.5 },
      { name: "Himalayan Homestay", distance: "2 km", rating: 4.0 },
    ],
    facilities: [
      "Parking",
      "Restrooms",
      "Gift Shop",
      "Meditation Hall",
      "Library",
    ],
    rules: [
      "Maintain silence in prayer halls",
      "Remove shoes before entering",
      "No photography inside main hall",
      "Dress modestly",
      "Follow the guided path",
    ],
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMonastery(mockMonastery);
      setLoading(false);
    }, 1000);
  }, [id]);

  const tabs = [
    { id: "overview", label: "Overview", icon: FiInfo },
    { id: "history", label: "History", icon: FiClock },
    { id: "festivals", label: "Festivals", icon: FiCalendar },
    { id: "visit", label: "Visit Info", icon: FiMapPin },
    { id: "gallery", label: "Gallery", icon: FiCamera },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading monastery details..." />
      </div>
    );
  }

  if (!monastery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Monastery not found
          </h2>
          <Link
            to="/discover"
            className="bg-monastery-600 hover:bg-monastery-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Discovery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyLoadImage
          src={monastery.image}
          alt={monastery.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-8 left-8 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-2"
          >
            {monastery.name}
          </motion.h1>
          <div className="flex items-center space-x-4 text-lg">
            <span>{monastery.tradition}</span>
            <span>•</span>
            <span>{monastery.district}</span>
            <span>•</span>
            <span>Est. {monastery.established}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-8 right-8 flex flex-col sm:flex-row gap-4">
          {monastery.hasVirtualTour && (
            <Link
              to={`/virtual-tour/${monastery.id}`}
              className="bg-monastery-600 hover:bg-monastery-700 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <SafeIcon icon={FiPlay} className="w-4 h-4" />
              <span>Virtual Tour</span>
            </Link>
          )}
          {monastery.hasAudioGuide && (
            <div className="relative flex items-center">
              <SafeIcon
                icon={FiHeadphones}
                className="absolute left-3 w-4 h-4 text-white z-10"
              />
              <select
                onChange={(e) => getAudio(e.target.value)}
                className="bg-blue-600 hover:bg-blue-700 text-white pl-10 pr-4 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer appearance-none shadow-lg hover:shadow-xl w-full"
              >
                <option value="">Audio Guide</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="nepali">Nepali</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <SafeIcon
              icon={FiStar}
              className="w-8 h-8 text-yellow-400 mx-auto mb-2"
            />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {monastery.rating}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {monastery.reviews} reviews
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <SafeIcon
              icon={FiMapPin}
              className="w-8 h-8 text-monastery-600 mx-auto mb-2"
            />
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {monastery.altitude}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Altitude
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <SafeIcon
              icon={FiClock}
              className="w-8 h-8 text-green-600 mx-auto mb-2"
            />
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {monastery.accessibility}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Accessibility
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <SafeIcon
              icon={FiHome}
              className="w-8 h-8 text-blue-600 mx-auto mb-2"
            />
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {monastery.nearbyStays.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Nearby Stays
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-monastery-600 border-b-2 border-monastery-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-monastery-600"
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    About {monastery.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {monastery.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Facilities
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {monastery.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="bg-monastery-50 dark:bg-monastery-900/20 text-monastery-700 dark:text-monastery-300 px-3 py-1 rounded-full text-sm"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Historical Background
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {monastery.history}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Religious Significance
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {monastery.significance}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "festivals" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Annual Festivals & Celebrations
                </h3>
                {monastery.festivals.map((festival, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {festival.name}
                      </h4>
                      <span className="bg-monastery-600 text-white px-3 py-1 rounded-full text-sm">
                        {festival.date}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {festival.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "visit" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Opening Hours
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Opening:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {monastery.timings.opening}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Closing:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {monastery.timings.closing}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Prayer Times
                    </h4>
                    <div className="space-y-2">
                      {monastery.timings.prayerTimes.map((time, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <SafeIcon
                            icon={FiClock}
                            className="w-4 h-4 text-monastery-600"
                          />
                          <span className="text-gray-900 dark:text-white">
                            {time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Visitor Guidelines
                  </h4>
                  <ul className="space-y-2">
                    {monastery.rules.map((rule, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-monastery-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === "gallery" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Photo Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {monastery.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <LazyLoadImage
                        src={image}
                        alt={`${monastery.name} - Image ${index + 1}`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonasteryDetails;
