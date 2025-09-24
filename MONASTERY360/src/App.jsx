import React, { Suspense, lazy, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { useThemeStore } from "./store/themeStore";
import { useI18nStore } from "./store/i18nStore";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorBoundary from "./components/common/ErrorBoundary";
import EnhancedAIChatbox from "./components/ai/EnhancedAIChatbox";
import "./i18n/config";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const MonasteryDiscovery = lazy(() => import("./pages/MonasteryDiscovery"));
const MonasteryDetails = lazy(() => import("./pages/MonasteryDetails"));
// const VirtualTour = lazy(() => import("./pages/VirtualTour"));
const InteractiveMap = lazy(() => import("./pages/InteractiveMap"));
const DigitalArchives = lazy(() => import("./pages/DigitalArchives"));
const CulturalCalendar = lazy(() => import("./pages/CulturalCalendar"));
const AudioGuide = lazy(() => import("./pages/AudioGuide"));
const TourBooking = lazy(() => import("./pages/TourBooking"));
const HomestayBookings = lazy(() => import("./pages/HomestayBookings"));
const NearbyAttractions = lazy(() => import("./pages/NearbyAttractions"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const VirtualTour = lazy(() => import("./pages/VirtualTour"));

function App() {
  const { theme, setTheme } = useThemeStore();
  const { language } = useI18nStore();

  useEffect(() => {
    // Initialize theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    // System theme detection
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (theme === "system") {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, setTheme]);

  return (
    <div
      className={`${theme} min-h-screen transition-all duration-500 ease-in-out`}
    >
      <div className="min-h-screen bg-gradient-to-br from-monastery-50 via-white to-purple-50 dark:from-monastery-900 dark:via-gray-900 dark:to-purple-900">
        <ErrorBoundary>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <motion.main
                className="flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <LoadingSpinner size="lg" text="Loading..." />
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/discover" element={<MonasteryDiscovery />} />
                    <Route
                      path="/monastery/:id"
                      element={<MonasteryDetails />}
                    />
                    {/* <Route path="/virtual-tour/:id" element={<VirtualTour />} /> */}
                    <Route path="/map" element={<InteractiveMap />} />
                    <Route path="/archives" element={<DigitalArchives />} />
                    <Route path="/calendar" element={<CulturalCalendar />} />
                    <Route path="/audio-guide" element={<AudioGuide />} />
                    <Route path="/booking" element={<TourBooking />} />
                    <Route path="/homestays" element={<HomestayBookings />} />
                    <Route
                      path="/attractions"
                      element={<NearbyAttractions />}
                    />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/virtual-tour/:id" element={<VirtualTour />} />
                  </Routes>
                </Suspense>
              </motion.main>
              <Footer />
            </div>

            {/* Enhanced AI Chatbox - Available on all pages */}
            <EnhancedAIChatbox />
          </Router>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
