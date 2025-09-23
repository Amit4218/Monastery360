import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowRight } = FiIcons;

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('user', JSON.stringify({
        name: 'John Doe',
        email: formData.email,
        joinDate: new Date().toISOString()
      }));
      navigate('/home');
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-monastery-900 via-purple-900 to-blue-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(212,175,55,0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-tibetan-gold rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md w-full"
        >
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
              {t('auth.welcomeBack', 'Welcome Back')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-300 text-lg"
            >
              {t('auth.continueJourney', 'Continue your spiritual journey')}
            </motion.p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-white/90 text-sm font-medium mb-2">
                  {t('auth.email', 'Email Address')}
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
                    placeholder={t('auth.enterEmail', 'Enter your email')}
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-white/90 text-sm font-medium mb-2">
                  {t('auth.password', 'Password')}
                </label>
                <div className="relative group">
                  <SafeIcon 
                    icon={FiLock} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-tibetan-gold transition-colors duration-300" 
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-tibetan-gold focus:ring-2 focus:ring-tibetan-gold/20 transition-all duration-300"
                    placeholder={t('auth.enterPassword', 'Enter your password')}
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-tibetan-gold transition-colors duration-300"
                  >
                    <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Remember & Forgot */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-tibetan-gold bg-white/10 border-white/20 rounded focus:ring-tibetan-gold"
                  />
                  <span className="ml-2 text-white/80 text-sm">
                    {t('auth.rememberMe', 'Remember me')}
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-tibetan-gold hover:text-tibetan-gold/80 text-sm font-medium transition-colors duration-300"
                >
                  {t('auth.forgotPassword', 'Forgot password?')}
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-tibetan-gold to-monastery-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 group"
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
                      <span>{t('auth.signIn', 'Sign In')}</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-center mt-6"
            >
              <span className="text-white/70">{t('auth.noAccount', "Don't have an account?")} </span>
              <Link
                to="/register"
                className="text-tibetan-gold hover:text-tibetan-gold/80 font-semibold transition-colors duration-300"
              >
                {t('auth.signUp', 'Sign up')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Login Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-8 text-center"
          >
            <p className="text-white/60 mb-4">{t('auth.orContinueAs', 'Or continue as')}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-white/20 flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiUser} className="w-5 h-5" />
              <span>{t('auth.guestUser', 'Guest User')}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;