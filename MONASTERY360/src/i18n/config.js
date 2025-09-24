import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import { en } from './translations/en';
import { hi } from './translations/hi';
import { ne } from './translations/ne';
import { bo } from './translations/bo';


const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ne: { translation: ne },
  bo: { translation: bo }
  
};

// Language detection options
const detectionOptions = {
  order: ['localStorage', 'navigator', 'htmlTag'],
  lookupLocalStorage: 'monastery-language',
  caches: ['localStorage'],
  excludeCacheFor: ['cimode']
};

// Initialize i18next with comprehensive configuration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    detection: detectionOptions,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Additional options for better UX
    load: 'languageOnly', // Load only language, not region
    preload: ['en'], // Preload English as fallback
    
    // Namespace configuration
    defaultNS: 'translation',
    ns: 'translation',
    
    // React specific options
    react: {
      useSuspense: false, // Disable suspense for better error handling
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em']
    },
    
    // Pluralization
    pluralSeparator: '_',
    contextSeparator: '_',
    
    // Missing key handling
    saveMissing: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${lng}.${ns}.${key}`);
      }
    },
    
    // Performance optimizations
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false
  })
  .catch(error => {
    console.error('i18n initialization failed:', error);
  });

// Export configured i18n instance
export default i18n;

// Export helper function to change language
export const changeLanguage = (language) => {
  return i18n.changeLanguage(language);
};

// Export helper function to get current language
export const getCurrentLanguage = () => {
  return i18n.language || i18n.options.fallbackLng;
};

// Export helper function to get available languages
export const getAvailableLanguages = () => {
  return Object.keys(resources);
};

// Export helper function to check if translation exists
export const hasTranslation = (key, options = {}) => {
  return i18n.exists(key, options);
};