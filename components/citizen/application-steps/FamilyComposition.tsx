'use client';

import { FamilyMember } from '@/lib/benefitCalculator';

interface FamilyCompositionProps {
  language: string;
  familyMembers: FamilyMember[];
  addFamilyMember: () => void;
  updateFamilyMember: (index: number, field: keyof FamilyMember, value: string | number) => void;
  removeFamilyMember: (index: number) => void;
}

export default function FamilyComposition({
  language,
  familyMembers,
  addFamilyMember,
  updateFamilyMember,
  removeFamilyMember,
}: FamilyCompositionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">
        {language === 'ru' ? 'Декларация состава семьи' : 'Үй-бүлөнүн курамын декларациялоо'}
      </h3>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-gray-700">
            {language === 'ru' ? 'Состав семьи' : 'Үй-бүлөнүн курамы'}
          </label>
          <button
            onClick={addFamilyMember}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>
            {language === 'ru' ? 'Добавить члена семьи' : 'Үй-бүлө мүчөсүн кошуу'}
          </button>
        </div>

        {familyMembers.map((member, index) => (
          <div key={`member-${index}`} className="grid md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {language === 'ru' ? 'ФИО' : 'Аты-жөнү'}
              </label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateFamilyMember(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder={language === 'ru' ? 'Введите ФИО' : 'Аты-жөнүн жазыңыз'}
                readOnly={index === 0}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {language === 'ru' ? 'Возраст' : 'Жаш'}
              </label>
              <input
                type="number"
                value={member.age || ''}
                onChange={(e) => updateFamilyMember(index, 'age', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {language === 'ru' ? 'Родственная связь' : 'Туугандык байланыш'}
              </label>
              <select
                value={member.relation}
                onChange={(e) => updateFamilyMember(index, 'relation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
              >
                <option value="">
                  {language === 'ru' ? 'Выберите' : 'Тандаңыз'}
                </option>
                <option value="Мать">{language === 'ru' ? 'Мать' : 'Эне'}</option>
                <option value="Отец">{language === 'ru' ? 'Отец' : 'Ата'}</option>
                <option value="Сын">{language === 'ru' ? 'Сын' : 'Уул'}</option>
                <option value="Дочь">{language === 'ru' ? 'Дочь' : 'Кыз'}</option>
                <option value="Бабушка">{language === 'ru' ? 'Бабушка' : 'Чоң эне'}</option>
                <option value="Дедушка">{language === 'ru' ? 'Дедушка' : 'Чоң ата'}</option>
              </select>
            </div>
            <div className="flex items-end">
              {familyMembers.length > 1 && index > 0 && (
                <button
                  onClick={() => removeFamilyMember(index)}
                  className="w-full bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors inline-flex items-center justify-center whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  {language === 'ru' ? 'Удалить' : 'Жок кылуу'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
