'use client';

interface IncomeAssessmentProps {
  language: string;
  incomes: Record<string, number>;
  setIncomes: (incomes: Record<string, number>) => void;
}

export default function IncomeAssessment({
  language,
  incomes,
  setIncomes,
}: IncomeAssessmentProps) {
  const totalIncome = Object.values(incomes).reduce((sum, income) => sum + income, 0);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">
        {language === 'ru' ? 'Оценка доходов по 8 категориям' : '8 категория боюнча кирешелерди баалоо'}
      </h3>

      <div className="space-y-6">
        {/* I. Primary Income */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <i className="ri-money-dollar-circle-line mr-3"></i>
            I. {language === 'ru' ? 'Основной доход' : 'Негизги киреше'}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Заработная плата' : 'Эмгек акы'}
              </label>
              <input
                type="number"
                value={incomes['salary'] || ''}
                onChange={(e) => setIncomes({...incomes, salary: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Пенсия' : 'Пенсия'}
              </label>
              <input
                type="number"
                value={incomes['pension'] || ''}
                onChange={(e) => setIncomes({...incomes, pension: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* II. Education */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
            <i className="ri-book-line mr-3"></i>
            II. {language === 'ru' ? 'Образование' : 'Билим берүү'}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Стипендии' : 'Стипендиялар'}
              </label>
              <input
                type="number"
                value={incomes['scholarship'] || ''}
                onChange={(e) => setIncomes({...incomes, scholarship: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Плата за обучение' : 'Окуу төлөмү'}
              </label>
              <input
                type="number"
                value={incomes['tuition'] || ''}
                onChange={(e) => setIncomes({...incomes, tuition: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* III. Other Income */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
            <i className="ri-heart-line mr-3"></i>
            III. {language === 'ru' ? 'Прочие доходы' : 'Башка кирешелер'}
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Алименты' : 'Алименттер'}
              </label>
              <input
                type="number"
                value={incomes['alimony'] || ''}
                onChange={(e) => setIncomes({...incomes, alimony: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Дивиденды' : 'Дивиденддер'}
              </label>
              <input
                type="number"
                value={incomes['dividends'] || ''}
                onChange={(e) => setIncomes({...incomes, dividends: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Помощь' : 'Жардам'}
              </label>
              <input
                type="number"
                value={incomes['assistance'] || ''}
                onChange={(e) => setIncomes({...incomes, assistance: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* IV. Business Activity */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
            <i className="ri-briefcase-line mr-3"></i>
            IV. {language === 'ru' ? 'Предпринимательская деятельность' : 'Ишкердик ишмердүүлүк'}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Предпринимательство' : 'Ишкердик'}
              </label>
              <input
                type="number"
                value={incomes['business'] || ''}
                onChange={(e) => setIncomes({...incomes, business: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Патенты' : 'Патенттер'}
              </label>
              <input
                type="number"
                value={incomes['patents'] || ''}
                onChange={(e) => setIncomes({...incomes, patents: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* V. Land Ownership */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
            <i className="ri-plant-line mr-3"></i>
            V. {language === 'ru' ? 'Землевладение' : 'Жер ээлик'}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Орошаемое земледелие' : 'Сугарылган айыл чарба'}
              </label>
              <input
                type="number"
                value={incomes['irrigated_agriculture'] || ''}
                onChange={(e) => setIncomes({...incomes, irrigated_agriculture: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Богарное земледелие' : 'Жамгырчыл айыл чарба'}
              </label>
              <input
                type="number"
                value={incomes['rain_fed_agriculture'] || ''}
                onChange={(e) => setIncomes({...incomes, rain_fed_agriculture: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* VI. Subsidiary Farming */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
            <i className="ri-home-garden-line mr-3"></i>
            VI. {language === 'ru' ? 'Подсобное хозяйство' : 'Жардамчы чарба'}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Животноводство' : 'Мал чарба'}
              </label>
              <input
                type="number"
                value={incomes['livestock'] || ''}
                onChange={(e) => setIncomes({...incomes, livestock: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Личное хозяйство' : 'Жеке чарба'}
              </label>
              <input
                type="number"
                value={incomes['personal_farming'] || ''}
                onChange={(e) => setIncomes({...incomes, personal_farming: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* VII. Bank Deposits and Investments */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
            <i className="ri-bank-line mr-3"></i>
            VII. {language === 'ru' ? 'Банковские депозиты и инвестиции' : 'Банк депозиттери жана инвестициялар'}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Банковские депозиты' : 'Банк депозиттери'}
              </label>
              <input
                type="number"
                value={incomes['deposits'] || ''}
                onChange={(e) => setIncomes({...incomes, deposits: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ru' ? 'Инвестиции' : 'Инвестициялар'}
              </label>
              <input
                type="number"
                value={incomes['investments'] || ''}
                onChange={(e) => setIncomes({...incomes, investments: parseInt(e.target.value) || 0})}
                placeholder={language === 'ru' ? 'Сумма в сомах' : 'Сомдо сумма'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* VIII. Total Family Income */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-calculator-line mr-3"></i>
            VIII. {language === 'ru' ? 'Общий семейный доход' : 'Жалпы үй-бүлөлүк киреше'}
          </h4>
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>{language === 'ru' ? 'Общий месячный доход:' : 'Жалпы айлык киреше:'}</span>
              <span className="text-red-600" suppressHydrationWarning={true}>
                {totalIncome.toLocaleString()} сом
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
