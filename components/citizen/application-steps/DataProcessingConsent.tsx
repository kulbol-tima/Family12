'use client';

interface DataProcessingConsentProps {
  language: string;
  dataProcessingConsent: boolean;
  setDataProcessingConsent: (consent: boolean) => void;
}

export default function DataProcessingConsent({
  language,
  dataProcessingConsent,
  setDataProcessingConsent,
}: DataProcessingConsentProps) {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
        <i className="ri-shield-check-line text-3xl text-blue-600"></i>
      </div>
      <h3 className="text-2xl font-bold mb-6">
        {language === 'ru' ? 'Согласие на обработку данных' : 'Маалыматтарды иштетүүгө макулдук'}
      </h3>

      <div className="bg-gray-50 rounded-lg p-6 text-left max-w-2xl mx-auto mb-6">
        <h4 className="font-semibold mb-4">
          {language === 'ru' ? 'Обработка персональных данных включает:' : 'Жеке маалыматтарды иштетүү төмөнкүлөрдү камтыйт:'}
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start space-x-2">
            <i className="ri-check-line text-green-600 mt-0.5"></i>
            <span>
              {language === 'ru'
                ? 'Проверка данных через внешние системы (Tunduk, налоговая служба, банки)'
                : 'Тышкы системалар аркылуу маалыматтарды текшерүү (Tunduk, салык кызматы, банктар)'}
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <i className="ri-check-line text-green-600 mt-0.5"></i>
            <span>
              {language === 'ru'
                ? 'Хранение документов в электронном виде'
                : 'Документтерди электрондук түрдө сактоо'}
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <i className="ri-check-line text-green-600 mt-0.5"></i>
            <span>
              {language === 'ru'
                ? 'Автоматический расчет размера пособия'
                : 'Жөлөкпулдун өлчөмүн автоматтык эсептөө'}
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <i className="ri-check-line text-green-600 mt-0.5"></i>
            <span>
              {language === 'ru'
                ? 'Передача данных в территориальные органы для рассмотрения'
                : 'Карап чыгуу үчүн аймактык органдарга маалыматтарды өткөрүү'}
            </span>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-center space-x-3 mb-8">
        <input
          type="checkbox"
          id="consent"
          checked={dataProcessingConsent}
          onChange={(e) => setDataProcessingConsent(e.target.checked)}
          className="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500"
        />
        <label htmlFor="consent" className="text-lg font-medium text-gray-900 cursor-pointer">
          {language === 'ru'
            ? 'Я согласен(а) на обработку моих персональных данных'
            : 'Мен өзүмдүн жеке маалыматтарымды иштетүүгө макулмун'}
        </label>
      </div>

      {dataProcessingConsent && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-2">
            <i className="ri-check-line text-green-600 mr-2"></i>
            <span className="font-semibold text-green-800">
              {language === 'ru' ? 'Согласие получено' : 'Макулдук алынды'}
            </span>
          </div>
          <p className="text-sm text-green-700">
            {language === 'ru'
              ? 'Вы можете отозвать согласие в любое время'
              : 'Сиз каалаган убакта макулдукту кайтарып ала аласыз'}
          </p>
        </div>
      )}
    </div>
  );
}
