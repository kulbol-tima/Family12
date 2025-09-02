'use client';

interface FamilyProfileProps {
  language: string;
  application: any;
  family: any;
}

export default function FamilyProfile({
  language,
  application,
  family,
}: FamilyProfileProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200">
          <div className="w-28 h-28 bg-blue-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <i className="ri-user-3-line text-5xl text-blue-600"></i>
          </div>
          <h3 className="text-2xl font-bold text-blue-900 mb-4">{application.familyHead}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-center items-center space-x-2 p-3 bg-white rounded-lg">
              <i className="ri-id-card-line text-blue-600"></i>
              <span className="font-bold">ПИН: 12345678901234</span>
            </div>
            <div className="flex justify-center items-center space-x-2 p-2">
              <i className="ri-map-pin-line text-blue-600"></i>
              <span>{application.region}</span>
            </div>
            <div className="flex justify-center items-center space-x-2 p-2">
              <i className="ri-calendar-line text-blue-600"></i>
              <span>{language === 'ru' ? 'Подана' : 'Submitted'}: {application.submissionDate}</span>
            </div>
            <div className="flex justify-center items-center space-x-2 p-2">
              <i className="ri-time-line text-blue-600"></i>
              <span>{language === 'ru' ? 'Обновлено' : 'Updated'}: {application.lastUpdate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <h4 className="text-xl font-bold mb-6 flex items-center">
          <i className="ri-group-line mr-2 text-blue-600"></i>
          {language === 'ru' ? 'Состав семьи с детьми до 16 лет' : 'Family Composition with Children Under 16'}
        </h4>
        <div className="space-y-4">
          {family.members.map((member: any, index: number) => (
            <div key={index} className={`flex items-center justify-between p-6 rounded-xl border-2 ${member.age < 16 ? 'bg-yellow-50 border-yellow-300 shadow-md' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${member.age < 16 ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                  <i className={`ri-${member.age < 16 ? 'bear-smile' : 'user'}-line text-2xl ${member.age < 16 ? 'text-yellow-600' : 'text-gray-600'}`}></i>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-lg">{member.name}</h5>
                  <div className="text-sm text-gray-600 flex items-center space-x-4">
                    <span>{member.relation}</span>
                    <span className="font-medium">{member.age} {language === 'ru' ? 'лет' : 'years old'}</span>
                    {member.age < 16 && (
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                        {language === 'ru' ? 'РЕБЕНОК ДО 16' : 'CHILD UNDER 16'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600 text-xl" suppressHydrationWarning={true}>
                  {member.income.toLocaleString()} сом
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'ru' ? 'месячный доход' : 'monthly income'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
