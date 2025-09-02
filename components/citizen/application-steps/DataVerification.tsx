'use client';

import { regions } from '@/lib/mockData';

interface DataVerificationProps {
  language: string;
  citizenData: any;
  setCitizenData: (data: any) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

export default function DataVerification({
  language,
  citizenData,
  setCitizenData,
  selectedRegion,
  setSelectedRegion,
}: DataVerificationProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">
        {language === 'ru' ? 'Проверка предзаполненных данных' : 'Алдын ала толтурулган маалыматтарды текшерүү'}
      </h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <i className="ri-information-line text-blue-600 mr-3"></i>
          <h4 className="font-semibold text-blue-800">
            {language === 'ru' ? 'Данные получены из Tunduk' : 'Tunduk системасынан алынган маалыматтар'}
          </h4>
        </div>
        <p className="text-blue-700 text-sm">
          {language === 'ru'
            ? 'Проверьте правильность автоматически заполненных данных и при необходимости внесите изменения'
            : 'Автоматтык толтурулган маалыматтардын туура экендигин текшериңиз жана керек болсо өзгөртүүлөрдү киргизиңиз'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ru' ? 'Полное имя' : 'Толук аты'}
            </label>
            <input
              type="text"
              value={citizenData.fullName}
              onChange={(e) => setCitizenData({...citizenData, fullName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ru' ? 'Личный номер' : 'Жеке номер'}
            </label>
            <input
              type="text"
              value={citizenData.personalId}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ru' ? 'Адрес проживания' : 'Жашаган дареги'}
            </label>
            <textarea
              value={citizenData.address}
              onChange={(e) => setCitizenData({...citizenData, address: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ru' ? 'Номер телефона' : 'Телефон номери'}
            </label>
            <input
              type="tel"
              value={citizenData.phone}
              onChange={(e) => setCitizenData({...citizenData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ru' ? 'Электронная почта' : 'Электрондук почта'}
            </label>
            <input
              type="email"
              value={citizenData.email}
              onChange={(e) => setCitizenData({...citizenData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ru' ? 'Регион проживания' : 'Жашаган аймак'}
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
            >
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
