'use client';

import { BenefitCalculation } from '@/lib/benefitCalculator';
import { externalIntegrations } from '@/lib/mockData';

interface AutomaticAssessmentProps {
  language: string;
  benefitCalculation: BenefitCalculation | null;
}

export default function AutomaticAssessment({
  language,
  benefitCalculation,
}: AutomaticAssessmentProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center">
        {language === 'ru' ? 'Автоматическая проверка соответствия' : 'Автоматтык дал келүүнү текшерүү'}
      </h3>

      <div className="space-y-6">
        {/* External System Checks */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <i className="ri-links-line mr-3 text-blue-600"></i>
            {language === 'ru' ? 'Проверка внешних данных' : 'Тышкы маалыматтарды текшерүү'}
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            {externalIntegrations?.map((integration, index) => (
              <div key={integration.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className={`${integration.icon} text-blue-600`}></i>
                  </div>
                  <div>
                    <h5 className="font-medium">{integration.name}</h5>
                    <p className="text-xs text-gray-600">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                </div>
              </div>
            )) || (
              <div className="col-span-2 text-center py-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <i className="ri-loader-4-line text-2xl text-blue-600 animate-spin"></i>
                </div>
                <p className="text-gray-600">
                  {language === 'ru' ? 'Проверка внешних систем...' : 'Тышкы системаларды текшерүү...'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefit Calculation */}
        {benefitCalculation && (
          <div className={`border-2 rounded-xl p-6 ${benefitCalculation.eligible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${benefitCalculation.eligible ? 'bg-green-100' : 'bg-red-100'}`}>
                <i className={`text-xl ${benefitCalculation.eligible ? 'ri-check-line text-green-600' : 'ri-close-line text-red-600'}`}></i>
              </div>
              <h4 className={`text-lg font-semibold ${benefitCalculation.eligible ? 'text-green-800' : 'text-red-800'}`}>
                {language === 'ru' ? 'Результат расчета пособия' : 'Жөлөкпулду эсептөө жыйынтыгы'}
              </h4>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      {language === 'ru' ? 'Детей до 16 лет:' : '16 жашка чейинки балдар:'}
                    </span>
                    <span className="font-semibold">{benefitCalculation.childrenUnder16}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      {language === 'ru' ? 'Базовая ставка:' : 'Негизги ставка:'}
                    </span>
                    <span className="font-semibold" suppressHydrationWarning={true}>1,200 сом</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      {language === 'ru' ? 'Региональный коэффициент:' : 'Аймактык коэффициент:'}
                    </span>
                    <span className="font-semibold">{benefitCalculation.regionalCoefficient}x</span>
                  </div>
                  {benefitCalculation.borderBonus > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">
                        {language === 'ru' ? 'Приграничная надбавка:' : 'Чек ара кошумчасы:'}
                      </span>
                      <span className="font-semibold" suppressHydrationWarning={true}>{benefitCalculation.borderBonus.toLocaleString()} сом</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <div className={`text-sm font-medium mb-2 ${benefitCalculation.eligible ? 'text-green-700' : 'text-red-700'}`}>
                  {benefitCalculation.eligible
                    ? (language === 'ru' ? 'СЕМЬЯ ИМЕЕТ ПРАВО НА ПОСОБИЕ' : 'ҮЙ-БҮЛӨНҮН ЖӨЛӨКПУЛГА УКУГУ БАР')
                    : (language === 'ru' ? 'СЕМЬЯ НЕ ИМЕЕТ ПРАВА НА ПОСОБИЕ' : 'ҮЙ-БҮЛӨНҮН ЖӨЛӨКПУЛГА УКУГУ ЖОК')}
                </div>
                {benefitCalculation.eligible ? (
                  <div className="text-4xl font-bold text-green-600" suppressHydrationWarning={true}>
                    {benefitCalculation.totalMonthlyBenefit.toLocaleString()} сом
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-red-600">0 сом</div>
                )}
                <div className="text-xs text-gray-600 mt-1">
                  {language === 'ru' ? 'ежемесячно' : 'айына'}
                </div>
              </div>
            </div>

            {benefitCalculation.reason && (
              <div className="mt-4 p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{language === 'ru' ? 'Причина:' : 'Себеп:'}</span> {benefitCalculation.reason}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
