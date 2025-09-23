import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useI18nStore } from '../store/i18nStore';
import { useEffect } from 'react';

/**
 * Enhanced useTranslation hook that integrates with our store
 * and provides additional functionality
 */
export const useTranslation = (namespace = 'translation') => {
  const { t, i18n } = useI18nTranslation(namespace);
  const { language, setLanguage, supportedLanguages } = useI18nStore();

  // Sync i18n language with store
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  // Update store when i18n language changes
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      if (lng !== language) {
        setLanguage(lng);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n, language, setLanguage]);

  // Enhanced translation function with fallbacks
  const translate = (key, options = {}) => {
    try {
      const translation = t(key, options);
      
      // If translation is same as key, it means translation is missing
      if (translation === key && process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation for key: ${key} in language: ${language}`);
      }
      
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      return key; // Return key as fallback
    }
  };

  // Function to change language with error handling
  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng);
      setLanguage(lng);
      return true;
    } catch (error) {
      console.error('Failed to change language:', error);
      return false;
    }
  };

  // Check if current language is RTL
  const isRTL = () => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(language);
  };

  // Get language direction
  const getDirection = () => {
    return isRTL() ? 'rtl' : 'ltr';
  };

  // Format numbers according to current locale
  const formatNumber = (number, options = {}) => {
    try {
      return new Intl.NumberFormat(language, options).format(number);
    } catch (error) {
      return number.toString();
    }
  };

  // Format dates according to current locale
  const formatDate = (date, options = {}) => {
    try {
      return new Intl.DateTimeFormat(language, options).format(new Date(date));
    } catch (error) {
      return new Date(date).toLocaleDateString();
    }
  };

  // Format currency according to current locale
  const formatCurrency = (amount, currency = 'INR') => {
    try {
      return new Intl.NumberFormat(language, {
        style: 'currency',
        currency: currency,
      }).format(amount);
    } catch (error) {
      return `${currency} ${amount}`;
    }
  };

  // Get native language name
  const getLanguageName = (lng) => {
    const langData = supportedLanguages.find(lang => lang.code === lng);
    return langData ? langData.nativeName : lng;
  };

  return {
    t: translate,
    i18n,
    language,
    changeLanguage,
    supportedLanguages,
    isRTL,
    getDirection,
    formatNumber,
    formatDate,
    formatCurrency,
    getLanguageName,
    ready: i18n.isInitialized
  };
};

export default useTranslation;