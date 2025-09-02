'use client';

import { GMD_THRESHOLD, incomeCategories } from '@/lib/mockData';

interface IncomeAnalysisProps {
  language: string;
  family: any;
  benefit: any;
}

export default function IncomeAnalysis({
  language,
  family,
  benefit,
}: IncomeAnalysisProps) {
  const totalIncome = family.totalIncome;
  const perCapitaIncome = benefit ? benefit.perCapitaIncome : 0;
  const isEligible = benefit ? benefit.eligible : false;

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      gray: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-6 flex items-center">
            <i className="ri-pie-chart-line mr-2 text-purple-600"></i>
            {language === 'ru' ? '8-категорийный анализ доходов' : '8-Category Income Breakdown'}
          </h4>
          <div className="space-y-4">
            {incomeCategories.map((category) => (
              <div key={category.id} className={`border-2 rounded-xl p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-bold text-lg">{category.name}</h5>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      value={family.totalIncome}
                      readOnly
                      className="w-28 px-3 py-2 text-sm font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                    />
                    <span className="text-sm font-medium">сом</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-6 flex items-center">
            <i className="ri-calculator-line mr-2 text-green-600"></i>
            {language === 'ru' ? 'Расчет ССДС и сравнение с ГМД' : 'CCDS Calculation & GMD Comparison'}
          </h4>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h5 className="font-bold text-blue-900 mb-4 text-lg">
                {language === 'ru' ? 'Общий семейный доход' : 'Total Family Income'}
              </h5>
              <div className="text-4xl font-bold text-blue-600 mb-2" suppressHydrationWarning={true}>
                {totalIncome.toLocaleString()} сом
              </div>
              <div className="text-blue-700 text-sm">
                {language === 'ru' ? 'Сумма всех 8 категорий доходов' : 'Sum of all 8 income categories'}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h5 className="font-bold text-purple-900 mb-4 text-lg">
                {language === 'ru' ? 'ССДС (Средний Совокупный Доход Семьи)' : 'CCDS (Cumulative Cash Distribution System)'}
              </h5>
              <div className="text-4xl font-bold text-purple-600 mb-2" suppressHydrationWarning={true}>
                {Math.round(perCapitaIncome).toLocaleString()} сом
              </div>
              <div className="text-purple-700 text-sm">
                {totalIncome.toLocaleString()} ÷ {family.members.length} {language === 'ru' ? 'человек = доход на душу населения' : 'people = per capita income'}
              </div>
            </div>

            <div className={`rounded-xl p-6 border-2 ${isEligible ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-300' : 'bg-gradient-to-r from-red-50 to-red-100 border-red-300'}`}>
              <h5 className={`font-bold mb-4 text-lg ${isEligible ? 'text-green-900' : 'text-red-900'}`}>
                {language === 'ru' ? 'Сравнение с порогом ГМД' : 'GMD Threshold Comparison'}
              </h5>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className={`text-2xl font-bold ${isEligible ? 'text-green-600' : 'text-red-600'}`}>
                    {GMD_THRESHOLD.toLocaleString()} сом
                  </div>
                  <div className={`text-sm ${isEligible ? 'text-green-700' : 'text-red-700'}`}>
                    {language === 'ru' ? 'Порог ГМД (Гарантированный минимальный доход)' : 'GMD Threshold (Guaranteed Minimum Income)'}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${isEligible ? 'text-green-600' : 'text-red-600'}`}>
                    {isEligible ?
                      (language === 'ru' ? '✓ ПОДХОДИТ' : '✓ ELIGIBLE') :
                      (language === 'ru' ? '✗ НЕ ПОДХОДИТ' : '✗ NOT ELIGIBLE')
                    }
                  </div>
                  <div className={`text-sm ${isEligible ? 'text-green-700' : 'text-red-700'}`}>
                    {Math.abs(Math.round(perCapitaIncome - GMD_THRESHOLD)).toLocaleString()} сом {isEligible ?
                      (language === 'ru' ? 'ниже порога' : 'below threshold') :
                      (language === 'ru' ? 'выше порога' : 'above threshold')
                    }
                  </div>
                </div>
              </div>

              {isEligible && (
                <div className="bg-green-200 text-green-800 p-4 rounded-lg mt-4">
                  <div className="flex items-center">
                    <i className="ri-check-double-line text-xl mr-2"></i>
                    <div className="font-medium">
                      {language === 'ru' ? 'Семья имеет право на получение пособия "Үй-бүлөгө көмөк"' : 'Family is eligible for "Үй-бүлөгө көмөк" benefit'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
