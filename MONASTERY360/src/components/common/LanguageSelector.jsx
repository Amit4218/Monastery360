import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import SafeIcon from './SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGlobe, FiCheck } = FiIcons;

function LanguageSelector({ className = '', showLabel = false }) {
  const { language, supportedLanguages, changeLanguage, getLanguageName } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = async (newLanguage) => {
    if (newLanguage === language || isChanging) return;
    
    setIsChanging(true);
    const success = await changeLanguage(newLanguage);
    
    if (success) {
      setIsOpen(false);
      // Optionally show success feedback
      console.log(`Language changed to ${newLanguage}`);
    } else {
      console.error(`Failed to change language to ${newLanguage}`);
    }
    
    setIsChanging(false);
  };

  const currentLanguage = supportedLanguages.find(lang => lang.code === language);

  return (
    <div className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        disabled={isChanging}
      >
        <SafeIcon icon={FiGlobe} className="w-5 h-5" />
        {showLabel && (
          <span className="text-sm font-medium">
            {currentLanguage ? currentLanguage.nativeName : language.toUpperCase()}
          </span>
        )}
        {isChanging && (
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 z-50 border border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Choose Language
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Select your preferred language
                </p>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {supportedLanguages.map((lang) => {
                  const isSelected = language === lang.code;
                  const isDisabled = isChanging;
                  
                  return (
                    <motion.button
                      key={lang.code}
                      whileHover={!isDisabled ? { backgroundColor: 'rgba(0,0,0,0.05)' } : {}}
                      onClick={() => handleLanguageChange(lang.code)}
                      disabled={isDisabled}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200
                        ${isSelected 
                          ? 'bg-monastery-50 dark:bg-monastery-900/20 text-monastery-600 dark:text-monastery-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }
                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          
                          <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                            ${isSelected 
                              ? 'bg-monastery-600 text-white' 
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }
                          `}>
                            {lang.code.toUpperCase()}
                          </div>
                          
                          <div>
                            <p className="font-medium text-sm">
                              {lang.nativeName}
                            </p>
                            <p className="text-xs opacity-75">
                              {lang.name}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-monastery-600 dark:text-monastery-400"
                        >
                          <SafeIcon icon={FiCheck} className="w-4 h-4" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Language settings are saved automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;