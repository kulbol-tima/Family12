'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLanguage('ru')}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${
          language === 'ru' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Русский
      </button>
      <button
        onClick={() => setLanguage('ky')}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${
          language === 'ky' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Кыргызча
      </button>
    </div>
  );
}