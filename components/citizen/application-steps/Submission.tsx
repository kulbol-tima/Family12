'use client';

import { BenefitCalculation } from '@/lib/benefitCalculator';

interface SubmissionProps {
  language: string;
  benefitCalculation: BenefitCalculation | null;
  isSubmitting: boolean;
  handleSubmitApplication: () => void;
}

export default function Submission({
  language,
  benefitCalculation,
  isSubmitting,
  handleSubmitApplication,
}: SubmissionProps) {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
        <i className="ri-send-plane-line text-3xl text-green-600"></i>
      </div>
      <h3 className="text-2xl font-bold mb-6">
        {language === 'ru' ? 'Подача заявки в территориальный орган' : 'Аймактык органга арыз берүү'}
      </h3>

      <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto mb-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-green-600 text-sm"></i>
            </div>
            <span className="text-gray-700">
              {language === 'ru' ? 'Все данные проверены и валидированы' : 'Бардык маалыматтар текшерилди жана тастыкталды'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-green-600 text-sm"></i>
            </div>
            <span className="text-gray-700">
              {language === 'ru' ? 'Документы загружены и готовы к рассмотрению' : 'Документтер жүктөлдү жана карап чыгууга даяр'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-green-600 text-sm"></i>
            </div>
            <span className="text-gray-700">
              {language === 'ru' ? 'Согласие на обработку данных получено' : 'Маалыматтарды иштетүүгө макулдук алынды'}
            </span>
          </div>
          {benefitCalculation?.eligible && (
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-sm"></i>
              </div>
              <span className="text-gray-700">
                {language === 'ru'
                  ? `Семья имеет право на пособие: ${benefitCalculation.totalMonthlyBenefit.toLocaleString()} сом/месяц`
                  : `Үй-бүлөнүн жөлөкпулга укугу бар: ${benefitCalculation.totalMonthlyBenefit.toLocaleString()} сом/айына`}
              </span>
            </div>
          )}
        </div>
      </div>

      {benefitCalculation?.eligible ? (
        <button
          onClick={handleSubmitApplication}
          disabled={isSubmitting}
          className={`px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center whitespace-nowrap cursor-pointer ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
        >
          {isSubmitting ? (
            <>
              <i className="ri-loader-4-line mr-3 animate-spin"></i>
              {language === 'ru' ? 'Отправка в территориальный орган...' : 'Аймактык органга жөнөтүлүүдө...'}
            </>
          ) : (
            <>
              <i className="ri-send-plane-line mr-3"></i>
              {language === 'ru' ? 'Подать заявку в территориальный орган' : 'Аймактык органга арыз берүү'}
            </>
          )}
        </button>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <i className="ri-error-warning-line text-3xl text-red-600 mb-4"></i>
          <p className="font-semibold text-red-800 mb-2">
            {language === 'ru' ? 'Заявка не может быть подана' : 'Арыз берилбейт'}
          </p>
          <p className="text-red-700 text-sm">
            {language === 'ru'
              ? 'Семья не соответствует критериям получения пособия'
              : 'Үй-бүлө жөлөкпул алуу критерийлерине дал келбейт'}
          </p>
        </div>
      )}
    </div>
  );
}
