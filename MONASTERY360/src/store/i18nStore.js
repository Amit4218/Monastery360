import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useI18nStore = create(
  persist(
    (set, get) => ({
      language: 'en',
      
      setLanguage: (language) => {
        set({ language });
        
        // Update document language attribute
        if (typeof document !== 'undefined') {
          document.documentElement.lang = language;
        }
      },
      
      supportedLanguages: [
        { 
          code: 'en', 
          name: 'English', 
          nativeName: 'English',
          flag: '🇺🇸'
        },
        { 
          code: 'hi', 
          name: 'Hindi', 
          nativeName: 'हिन्दी',
          flag: '🇮🇳'
        },
        { 
          code: 'ne', 
          name: 'Nepali', 
          nativeName: 'नेपाली',
          flag: '🇳🇵'
        },
        { 
          code: 'bo', 
          name: 'Tibetan', 
          nativeName: 'བོད་སྐད་',
          flag: '🏔️'
        },
        // { 
        //   code: 'si', 
        //   name: 'Sikkimese', 
        //   nativeName: 'སུ་ཁིམ་སྐད་',
        //   flag: '🏔️'
        // },
      ],
      
      // Get current language data
      getCurrentLanguage: () => {
        const { language, supportedLanguages } = get();
        return supportedLanguages.find(lang => lang.code === language) || supportedLanguages[0];
      },
      
      // Check if language is supported
      isLanguageSupported: (langCode) => {
        const { supportedLanguages } = get();
        return supportedLanguages.some(lang => lang.code === langCode);
      },
    }),
    {
      name: 'monastery-language',
      
      // Custom storage to handle language changes
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.documentElement.lang = state.language;
        }
      }
    }
  )
);