'use client';

import { externalIntegrations } from '@/lib/mockData';

interface ExternalVerificationProps {
  language: string;
}

export default function ExternalVerification({
  language,
}: ExternalVerificationProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      verified: 'text-green-600 bg-green-50 border-green-200',
      pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      warning: 'text-orange-600 bg-orange-50 border-orange-200',
      error: 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      verified: 'ri-check-line',
      pending: 'ri-time-line',
      warning: 'ri-alert-line',
      error: 'ri-close-line'
    };
    return icons[status as keyof typeof icons] || 'ri-question-line';
  };

  return (
    <div>
      <h4 className="text-xl font-bold mb-6 flex items-center">
        <i className="ri-shield-check-line mr-2 text-green-600"></i>
        {language === 'ru' ? 'Комплексная проверка внешних данных' : 'Comprehensive External Data Verification'}
      </h4>
      <div className="grid lg:grid-cols-2 gap-6">
        {externalIntegrations.map((system, index) => (
          <div key={index} className={`border-2 rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <i className={`${system.icon} text-xl text-gray-700`}></i>
                </div>
                <div>
                  <h5 className="font-bold text-lg">{system.name}</h5>
                  <div className="text-xs opacity-75">
                    {system.description}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-sm font-medium hover:underline cursor-pointer bg-white px-3 py-1 rounded-lg shadow-sm">
                  <i className="ri-refresh-line mr-1"></i>
                  {language === 'ru' ? 'Обновить' : 'Refresh'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
