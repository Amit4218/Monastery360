import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import SafeIcon from "../components/common/SafeIcon";
import * as FiIcons from "react-icons/fi";
import { useUser } from "../context/userContext";

const {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheck,
  FiPhone,
  FiUploadCloud,
} = FiIcons;

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phone: "",
    interests: [],
  });

  const { setUser } = useUser();

  const interests = [
    t("interests.philosophy", "Buddhist Philosophy"),
    t("interests.meditation", "Meditation"),
    t("interests.architecture", "Architecture"),
    t("interests.history", "History"),
    t("interests.photography", "Photography"),
    t("interests.trekking", "Trekking"),
    t("interests.culture", "Culture"),
    t("interests.spirituality", "Spirituality"),
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setUser(formData);
        navigate("/home");
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleInterest = (interest) => {
    const updated = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: updated });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-monastery-900 via-purple-900 to-blue-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(212,175,55,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(212,175,55,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(212,175,55,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md w-full"
        >
          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    currentStep >= step ? "bg-tibetan-gold" : "bg-white/20"
                  }`}
                  animate={{
                    scale: currentStep === step ? 1.3 : 1,
                    backgroundColor:
                      currentStep >= step ? "#d4af37" : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <p className="text-center text-white/70 text-sm">
              {t("auth.step", "Step")} {currentStep} {t("auth.of", "of")} 3
            </p>
          </motion.div>

          {/* Logo & Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 bg-gradient-to-br from-tibetan-gold to-monastery-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <span className="text-white font-bold text-2xl">🏔️</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-white via-tibetan-gold to-white bg-clip-text text-transparent mb-2"
            >
              {t("auth.joinJourney", "Join Our Journey")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-300 text-lg"
            >
              {t("auth.beginExploration", "Begin your spiritual exploration")}
            </motion.p>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 m-5"
          >
            <form onSubmit={handleSubmit} className="space-y-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">
                          {t("auth.fullName", "Full Name")}
                        </label>
                        <div className="relative group">
                          <SafeIcon
                            icon={FiUser}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-tibetan-gold transition-colors duration-300"
                          />
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-tibetan-gold focus:ring-2 focus:ring-tibetan-gold/20 transition-all duration-300"
                            placeholder={t(
                              "auth.fullNamePlaceholder",
                              "Full name"
                            )}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">
                          {t("auth.phone", "phone")}
                        </label>
                        <div className="relative group">
                          <SafeIcon
                            icon={FiPhone}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-tibetan-gold transition-colors duration-300"
                          />
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-tibetan-gold focus:ring-2 focus:ring-tibetan-gold/20 transition-all duration-300"
                            placeholder={t("auth.phonePlaceholder", "phone")}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">
                          {t("auth.location", "location")}
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-tibetan-gold focus:ring-2 focus:ring-tibetan-gold/20 transition-all duration-300"
                          placeholder={t(
                            "auth.locationPlaceholder",
                            "State-City"
                          )}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">
                        {t("auth.email", "Email Address")}
                      </label>
                      <div className="relative group">
                        <SafeIcon
                          icon={FiMail}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-tibetan-gold transition-colors duration-300"
                        />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-tibetan-gold focus:ring-2 focus:ring-tibetan-gold/20 transition-all duration-300"
                          placeholder={t("auth.enterEmail", "Enter your email")}
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Password */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">
                        {t("auth.password", "Password")}
                      </label>
                      <div className="relative group">
                        <SafeIcon
                          icon={FiLock}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-tibetan-gold transition-colors duration-300"
                        />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-tibetan-gold focus:ring-2 focus:ring-tibetan-gold/20 transition-all duration-300"
                          placeholder={t(
                            "auth.createPassword",
                            "Create password"
                          )}
                          required
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-tibetan-gold transition-colors duration-300"
                        >
                          <SafeIcon
                            icon={showPassword ? FiEyeOff : FiEye}
                            className="w-5 h-5"
                          />
                        </motion.button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">
                        {t("auth.confirmPassword", "Confirm Password")}
                      </label>
                      <div className="relative group">
                        <SafeIcon
                          icon={FiLock}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-tibetan-gold transition-colors duration-300"
                        />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-tibetan-gold focus:ring-2 focus:ring-tibetan-gold/20 transition-all duration-300"
                          placeholder={t(
                            "auth.confirmPasswordPlaceholder",
                            "Confirm password"
                          )}
                          required
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-tibetan-gold transition-colors duration-300"
                        >
                          <SafeIcon
                            icon={showConfirmPassword ? FiEyeOff : FiEye}
                            className="w-5 h-5"
                          />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Interests */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-4">
                        {t("auth.interests", "What interests you?")} (
                        {t("auth.optional", "Optional")})
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {interests.map((interest) => (
                          <motion.button
                            key={interest}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleInterest(interest)}
                            className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                              formData.interests.includes(interest)
                                ? "bg-tibetan-gold/20 border-tibetan-gold text-tibetan-gold"
                                : "bg-white/5 border-white/20 text-white/80 hover:border-tibetan-gold/50"
                            }`}
                          >
                            <div className="flex items-center justify-center space-x-2">
                              {formData.interests.includes(interest) && (
                                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                              )}
                              <span>{interest}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        required
                        className="w-4 h-4 text-tibetan-gold bg-white/10 border-white/20 rounded focus:ring-tibetan-gold"
                      />
                      <span className="ml-3 text-white/80 text-sm">
                        {t("auth.agreeToTerms", "I agree to the")}{" "}
                        <Link
                          to="/terms"
                          className="text-tibetan-gold hover:underline"
                        >
                          {t("auth.termsOfService", "Terms of Service")}
                        </Link>{" "}
                        {t("auth.and", "and")}{" "}
                        <Link
                          to="/privacy"
                          className="text-tibetan-gold hover:underline"
                        >
                          {t("auth.privacyPolicy", "Privacy Policy")}
                        </Link>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                {currentStep > 1 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 bg-white/10 border border-white/20 text-white py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-white/20"
                  >
                    {t("auth.back", "Back")}
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`${
                    currentStep === 1 ? "w-full" : "flex-1"
                  } bg-gradient-to-r from-tibetan-gold to-monastery-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2`}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-2"
                      >
                        <span>
                          {currentStep === 3
                            ? t("auth.createAccount", "Create Account")
                            : t("auth.continue", "Continue")}
                        </span>
                        <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-6"
            >
              <span className="text-white/70">
                {t("auth.haveAccount", "Already have an account?")}{" "}
              </span>
              <Link
                to="/login"
                className="text-tibetan-gold hover:text-tibetan-gold/80 font-semibold transition-colors duration-300"
              >
                {t("auth.signIn", "Sign in")}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
