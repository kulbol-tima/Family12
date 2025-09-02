'use client';

import { translations } from '@/lib/translations';

interface TundukAuthenticationProps {
  language: string;
  tundukAuthenticated: boolean;
  isProcessingAuth: boolean;
  onAuth: () => void;
  onSuccess: () => void;
  setShowAuthModal: (show: boolean) => void;
}

export default function TundukAuthentication({
  language,
  tundukAuthenticated,
  isProcessingAuth,
  onAuth,
  onSuccess,
  setShowAuthModal
}: TundukAuthenticationProps) {
  const t = translations[language as keyof typeof translations];

  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
        <i className="ri-shield-check-line text-4xl text-red-600"></i>
      </div>
      <h3 className="text-2xl font-bold mb-4">
        {language === 'ru' ? 'Аутентификация через Tunduk' : 'Tunduk аркылуу аутентификация'}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {language === 'ru'
          ? 'Для подачи заявления необходимо пройти аутентификацию через государственную систему Tunduk'
          : 'Арыз берүү үчүн Tunduk мамлекеттик системасы аркылуу аутентификациядан өтүү керек'}
      </p>

      {!tundukAuthenticated ? (
        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center text-lg font-semibold whitespace-nowrap cursor-pointer"
        >
          <i className="ri-shield-user-line mr-3 text-xl"></i>
          {language === 'ru' ? 'Войти через Tunduk' : 'Tunduk аркылуу кирүү'}
        </button>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-2xl text-green-600"></i>
            </div>
          </div>
          <h4 className="font-semibold text-green-800 mb-2">
            {language === 'ru' ? 'Успешная аутентификация' : 'Ийгиликтүү аутентификация'}
          </h4>
          <p className="text-green-700 text-sm mb-4">
            {language === 'ru'
              ? 'Ваши данные получены из системы Tunduk'
              : 'Сиздин маалыматтар Tunduk системасынан алынды'}
          </p>
          <button
            onClick={onSuccess}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
          >
            {language === 'ru' ? 'Продолжить' : 'Улантуу'}
          </button>
        </div>
      )}
    </div>
  );
}
