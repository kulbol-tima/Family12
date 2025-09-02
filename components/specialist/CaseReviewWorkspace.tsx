
'use client';

import { useReducer, useEffect } from 'react';
import Link from 'next/link';
import { mockApplications, mockFamilies } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { calculateBenefit, BenefitCalculation } from '@/lib/benefitCalculator';
import FamilyProfile from './case-review-steps/FamilyProfile';
import IncomeAnalysis from './case-review-steps/IncomeAnalysis';
import ExternalVerification from './case-review-steps/ExternalVerification';
import DecisionMakingTools from './DecisionMakingTools';

const initialState = {
  activeSection: 'profile',
  isClient: false,
  benefit: null,
  application: null,
  family: null,
};

function caseReviewReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'SET_IS_CLIENT':
      return { ...state, isClient: action.payload };
    case 'SET_BENEFIT':
      return { ...state, benefit: action.payload };
    case 'SET_APPLICATION':
      return { ...state, application: action.payload };
    case 'SET_FAMILY':
      return { ...state, family: action.payload };
    default:
      return state;
  }
}

interface CaseReviewWorkspaceProps {
  applicationId: string;
}

export default function CaseReviewWorkspace({ applicationId }: CaseReviewWorkspaceProps) {
  const { language } = useLanguage();
  const [state, dispatch] = useReducer(caseReviewReducer, initialState);
  const { activeSection, isClient, benefit, application, family } = state;

  useEffect(() => {
    dispatch({ type: 'SET_IS_CLIENT', payload: true });
    const app = mockApplications.find(app => app.id === applicationId);
    const fam = mockFamilies.find(f => f.familyHead === app?.familyHead);
    if (app && fam) {
      const benefitCalculation = calculateBenefit(fam.members, app.region.toLowerCase(), fam.totalIncome);
      dispatch({ type: 'SET_BENEFIT', payload: benefitCalculation });
      dispatch({ type: 'SET_APPLICATION', payload: app });
      dispatch({ type: 'SET_FAMILY', payload: fam });
    }
  }, [applicationId]);

  if (!isClient || !application || !family) return null;

  if (!application || !family) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <i className="ri-file-search-line text-4xl text-red-600"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {language === 'ru' ? 'Заявка не найдена' : 'Application not found'}
        </h3>
        <p className="text-gray-600 mb-6">
          {language === 'ru' ? 'Заявка с ID ' + applicationId + ' не существует в системе УБК' : 'Application with ID ' + applicationId + ' does not exist in the УБК system'}
        </p>
        <Link href="/specialist/dashboard" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 inline-flex items-center font-medium cursor-pointer">
          <i className="ri-arrow-left-line mr-2"></i>
          {language === 'ru' ? 'Вернуться к панели' : 'Return to Dashboard'}
        </Link>
      </div>
    );
  }

  const sections = [
    { id: 'profile', name: language === 'ru' ? 'Профиль семьи' : 'Family Profile', icon: 'ri-group-line' },
    { id: 'income', name: language === 'ru' ? 'Анализ доходов (ССДС)' : 'Income Analysis (CCDS)', icon: 'ri-money-dollar-line' },
    { id: 'external', name: language === 'ru' ? 'Внешние проверки' : 'External Verification', icon: 'ri-links-line' },
    { id: 'documents', name: language === 'ru' ? 'Документы' : 'Documents', icon: 'ri-file-list-3-line' },
    { id: 'decision', name: language === 'ru' ? 'Принятие решения' : 'Decision Making', icon: 'ri-gavel-line' }
  ];

  const handleDecision = (decision: 'approve' | 'reject') => {
    // Handle decision logic
  };

  return (
    <div className="space-y-6">
      {/* Application Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <i className="ri-file-text-line text-3xl text-white"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{applicationId}</h2>
              <div className="text-red-100 mt-1">
                {language === 'ru' ? 'Заявка на получение пособия "Үй-бүлөгө көмөк"' : 'Application for "Үй-бүлөгө көмөк" benefit'}
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm text-red-100">
                <span><i className="ri-user-line mr-1"></i>{application.familyHead}</span>
                <span><i className="ri-map-pin-line mr-1"></i>{application.region}</span>
                <span><i className="ri-calendar-line mr-1"></i>{application.submissionDate}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold" suppressHydrationWarning={true}>
              {application.monthlyBenefit.toLocaleString()}
            </div>
            <div className="text-red-100">{language === 'ru' ? 'сомов в месяц' : 'soms per month'}</div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: section.id })}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-3 whitespace-nowrap cursor-pointer transition-all ${
                  activeSection === section.id
                    ? 'border-red-600 text-red-600 bg-red-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className={`${section.icon} mr-2 text-lg`}></i>
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeSection === 'profile' && (
            <FamilyProfile
              language={language}
              application={application}
              family={family}
            />
          )}

          {activeSection === 'income' && (
            <IncomeAnalysis
              language={language}
              family={family}
              benefit={benefit}
            />
          )}

          {activeSection === 'external' && (
            <ExternalVerification
              language={language}
            />
          )}

          {activeSection === 'decision' && (
            <DecisionMakingTools
              language={language}
              application={application}
              family={family}
              onDecision={handleDecision}
            />
          )}

          {activeSection === 'documents' && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className={`${sections.find(s => s.id === activeSection)?.icon} text-4xl text-gray-400`}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {sections.find(s => s.id === activeSection)?.name}
              </h3>
              <p className="text-gray-600">
                {language === 'ru' ? 'Данный раздел находится в разработке для полной системы УБК' : 'This section is under development for the complete УБК system'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
