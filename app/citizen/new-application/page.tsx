
'use client';

import { useReducer, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { incomeCategories, regions, externalIntegrations } from '@/lib/mockData';
import { calculateBenefit, FamilyMember, simulateExternalCheck } from '@/lib/benefitCalculator';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import TundukAuthentication from '@/components/citizen/application-steps/TundukAuthentication';
import DataVerification from '@/components/citizen/application-steps/DataVerification';
import FamilyComposition from '@/components/citizen/application-steps/FamilyComposition';
import IncomeAssessment from '@/components/citizen/application-steps/IncomeAssessment';
import DocumentUpload from '@/components/citizen/application-steps/DocumentUpload';
import DataProcessingConsent from '@/components/citizen/application-steps/DataProcessingConsent';
import AutomaticAssessment from '@/components/citizen/application-steps/AutomaticAssessment';
import Submission from '@/components/citizen/application-steps/Submission';

const initialState = {
  currentStep: 1,
  isClient: false,
  fileInputKey: 0,
  isSubmitting: false,
  showSuccessModal: false,
  generatedApplicationId: '',
  tundukAuthenticated: false,
  showAuthModal: false,
  isProcessingAuth: false,
  externalChecks: {},
  dataProcessingConsent: false,
  citizenData: {
    fullName: 'Айжан Сулайманова Абдуллаевна',
    personalId: '12345678901234',
    address: 'г. Бишкек, ул. Манаса 45, кв. 12',
    phone: '+996 555 123-456',
    email: 'aizhana.s@mail.kg'
  },
  familyMembers: [],
  selectedRegion: 'bishkek',
  incomes: {},
  uploadedFiles: [],
};

function applicationReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_IS_CLIENT':
      return { ...state, isClient: action.payload };
    case 'SET_FILE_INPUT_KEY':
      return { ...state, fileInputKey: action.payload };
    case 'SET_IS_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_SHOW_SUCCESS_MODAL':
      return { ...state, showSuccessModal: action.payload };
    case 'SET_GENERATED_APPLICATION_ID':
      return { ...state, generatedApplicationId: action.payload };
    case 'SET_TUNDUK_AUTHENTICATED':
      return { ...state, tundukAuthenticated: action.payload };
    case 'SET_SHOW_AUTH_MODAL':
      return { ...state, showAuthModal: action.payload };
    case 'SET_IS_PROCESSING_AUTH':
      return { ...state, isProcessingAuth: action.payload };
    case 'SET_EXTERNAL_CHECKS':
      return { ...state, externalChecks: action.payload };
    case 'SET_DATA_PROCESSING_CONSENT':
      return { ...state, dataProcessingConsent: action.payload };
    case 'SET_CITIZEN_DATA':
      return { ...state, citizenData: action.payload };
    case 'SET_FAMILY_MEMBERS':
      return { ...state, familyMembers: action.payload };
    case 'SET_SELECTED_REGION':
      return { ...state, selectedRegion: action.payload };
    case 'SET_INCOMES':
      return { ...state, incomes: action.payload };
    case 'SET_UPLOADED_FILES':
      return { ...state, uploadedFiles: action.payload };
    case 'RESET_FORM':
      return {
        ...initialState,
        isClient: true,
        language: state.language,
      };
    default:
      return state;
  }
}

export default function NewApplication() {
  const { language, setLanguage } = useLanguage();
  const [state, dispatch] = useReducer(applicationReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: 'SET_IS_CLIENT', payload: true });
    dispatch({ type: 'SET_FAMILY_MEMBERS', payload: [{ name: state.citizenData.fullName, age: 32, relation: 'Мать', income: 0 }] });
  }, []);

  const {
    currentStep,
    isClient,
    fileInputKey,
    isSubmitting,
    showSuccessModal,
    generatedApplicationId,
    tundukAuthenticated,
    showAuthModal,
    isProcessingAuth,
    dataProcessingConsent,
    citizenData,
    familyMembers,
    selectedRegion,
    incomes,
    uploadedFiles,
  } = state;

  const t = translations[language as keyof typeof translations];

  const steps = [
    { id: 1, name: language === 'ru' ? 'Аутентификация Tunduk' : 'Tunduk аутентификациясы' },
    { id: 2, name: language === 'ru' ? 'Проверка данных' : 'Маалыматты текшерүү' },
    { id: 3, name: language === 'ru' ? 'Состав семьи' : 'Үй-бүлөнүн курамы' },
    { id: 4, name: language === 'ru' ? 'Оценка доходов (8 категорий)' : 'Кирешелерди баалоо (8 категория)' },
    { id: 5, name: language === 'ru' ? 'Документы' : 'Документтер' },
    { id: 6, name: language === 'ru' ? 'Согласие на обработку' : 'Иштетүүгө макулдук' },
    { id: 7, name: language === 'ru' ? 'Автоматическая проверка' : 'Автоматтык текшерүү' },
    { id: 8, name: language === 'ru' ? 'Подача заявки' : 'Арыз берүү' }
  ];

  if (!isClient) {
    return null;
  }

  const handleTundukAuth = async () => {
    dispatch({ type: 'SET_IS_PROCESSING_AUTH', payload: true });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    dispatch({ type: 'SET_CITIZEN_DATA', payload: {
      fullName: 'Айжан Сулайманова Абдуллаевна',
      personalId: '12345678901234',
      address: 'г. Бишкек, ул. Манаса 45, кв. 12',
      phone: '+996 555 123-456',
      email: 'aizhana.s@mail.kg'
    }});
    
    dispatch({ type: 'SET_FAMILY_MEMBERS', payload: [
      { name: 'Айжан Сулайманова Абдуллаевна', age: 32, relation: 'Мать', income: 0 }
    ]});
    
    dispatch({ type: 'SET_TUNDUK_AUTHENTICATED', payload: true });
    dispatch({ type: 'SET_IS_PROCESSING_AUTH', payload: false });
    dispatch({ type: 'SET_SHOW_AUTH_MODAL', payload: false });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 2 });
  };

  const performExternalChecks = async () => {
    const checks: Record<string, any> = {};
    for (const integration of externalIntegrations) {
      checks[integration.id] = await simulateExternalCheck(integration.id, citizenData);
    }
    dispatch({ type: 'SET_EXTERNAL_CHECKS', payload: checks });
  };

  const addFamilyMember = () => {
    dispatch({ type: 'SET_FAMILY_MEMBERS', payload: [...familyMembers, { name: '', age: 0, relation: '', income: 0 }] });
  };

  const updateFamilyMember = (index: number, field: keyof FamilyMember, value: string | number) => {
    const updated = [...familyMembers];
    updated[index] = { ...updated[index], [field]: value };
    dispatch({ type: 'SET_FAMILY_MEMBERS', payload: updated });
  };

  const removeFamilyMember = (index: number) => {
    if (familyMembers.length > 1) {
      dispatch({ type: 'SET_FAMILY_MEMBERS', payload: familyMembers.filter((_: any, i: number) => i !== index) });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      dispatch({ type: 'SET_UPLOADED_FILES', payload: [...uploadedFiles, ...newFiles] });
      dispatch({ type: 'SET_FILE_INPUT_KEY', payload: fileInputKey + 1 });
    }
  };

  const removeFile = (index: number) => {
    dispatch({ type: 'SET_UPLOADED_FILES', payload: uploadedFiles.filter((_: any, i: number) => i !== index) });
  };

  const totalIncome = Object.values(incomes).reduce((sum, income) => sum + (income as number), 0);

  const benefitCalculation = selectedRegion && familyMembers.length > 0 && familyMembers[0].name
    ? calculateBenefit(familyMembers, selectedRegion, totalIncome)
    : null;

  const handleSubmitApplication = async () => {
    if (!benefitCalculation || !benefitCalculation.eligible) {
      alert(language === 'ru' ? 'Заявка не может быть подана - семья не имеет права на пособие' : 'Арыз берилбейт - үй-бүлөнүн жөлөкпулга укугу жок');
      return;
    }

    if (uploadedFiles.length === 0) {
      alert(language === 'ru' ? 'Пожалуйста, загрузите необходимые документы' : 'Керектүү документтерди жүктөңүз');
      return;
    }

    if (!dataProcessingConsent) {
      alert(language === 'ru' ? 'Необходимо дать согласие на обработку данных' : 'Маалыматтарды иштетүүгө макулдук керек');
      return;
    }

    dispatch({ type: 'SET_IS_SUBMITTING', payload: true });

    await new Promise(resolve => setTimeout(resolve, 3000));

    const newApplicationId = `APP-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    dispatch({ type: 'SET_GENERATED_APPLICATION_ID', payload: newApplicationId });
    dispatch({ type: 'SET_SHOW_SUCCESS_MODAL', payload: true });
    dispatch({ type: 'SET_IS_SUBMITTING', payload: false });
  };

  const handleSuccessModalClose = () => {
    dispatch({ type: 'SET_SHOW_SUCCESS_MODAL', payload: false });
    router.push('/citizen');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-red-600">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/citizen" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <i className="ri-government-line text-2xl text-white"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {language === 'ru' ? 'Новая заявка на пособие' : 'Жөлөкпулга жаңы арыз'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {language === 'ru' ? '8-шаговый процесс подачи' : '8 кадамдуу берүү процесси'}
                  </p>
                </div>
              </Link>
            </div>

            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.id ? 'bg-red-600 border-red-600 text-white' : 'border-gray-300 text-gray-400'}`}>
                    {currentStep > step.id ? (
                      <i className="ri-check-line text-lg"></i>
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className={`text-xs font-medium ${currentStep >= step.id ? 'text-red-600' : 'text-gray-400'}`}>
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 min-w-[20px] ${currentStep > step.id ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {currentStep === 1 && (
              <TundukAuthentication
                language={language}
                tundukAuthenticated={tundukAuthenticated}
                isProcessingAuth={isProcessingAuth}
                onAuth={handleTundukAuth}
                onSuccess={() => dispatch({ type: 'SET_CURRENT_STEP', payload: 2 })}
                setShowAuthModal={(show) => dispatch({ type: 'SET_SHOW_AUTH_MODAL', payload: show })}
              />
            )}

            {currentStep === 2 && (
              <DataVerification
                language={language}
                citizenData={citizenData}
                setCitizenData={(data) => dispatch({ type: 'SET_CITIZEN_DATA', payload: data })}
                selectedRegion={selectedRegion}
                setSelectedRegion={(region) => dispatch({ type: 'SET_SELECTED_REGION', payload: region })}
              />
            )}

            {currentStep === 3 && (
              <FamilyComposition
                language={language}
                familyMembers={familyMembers}
                addFamilyMember={addFamilyMember}
                updateFamilyMember={updateFamilyMember}
                removeFamilyMember={removeFamilyMember}
              />
            )}

            {currentStep === 4 && (
              <IncomeAssessment
                language={language}
                incomes={incomes}
                setIncomes={(newIncomes) => dispatch({ type: 'SET_INCOMES', payload: newIncomes })}
              />
            )}

            {currentStep === 5 && (
              <DocumentUpload
                language={language}
                uploadedFiles={uploadedFiles}
                handleFileUpload={handleFileUpload}
                removeFile={removeFile}
                fileInputKey={fileInputKey}
              />
            )}

            {currentStep === 6 && (
              <DataProcessingConsent
                language={language}
                dataProcessingConsent={dataProcessingConsent}
                setDataProcessingConsent={(consent) => dispatch({ type: 'SET_DATA_PROCESSING_CONSENT', payload: consent })}
              />
            )}

            {currentStep === 7 && (
              <AutomaticAssessment
                language={language}
                benefitCalculation={benefitCalculation}
              />
            )}

            {currentStep === 8 && (
              <Submission
                language={language}
                benefitCalculation={benefitCalculation}
                isSubmitting={isSubmitting}
                handleSubmitApplication={handleSubmitApplication}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => dispatch({ type: 'SET_CURRENT_STEP', payload: Math.max(1, currentStep - 1) })}
                disabled={currentStep === 1 || isSubmitting}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center whitespace-nowrap cursor-pointer"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                {language === 'ru' ? 'Назад' : 'Артка'}
              </button>

              <div className="flex space-x-3">
                {currentStep > 1 && currentStep < 8 && (
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                    {language === 'ru' ? 'Сохранить как черновик' : 'Долбоор катары сактоо'}
                  </button>
                )}

                {currentStep < 8 && (
                  <button
                    onClick={() => {
                      if (currentStep === 1 && !tundukAuthenticated) {
                        dispatch({ type: 'SET_SHOW_AUTH_MODAL', payload: true });
                      } else if (currentStep === 6 && !dataProcessingConsent) {
                        alert(language === 'ru' ? 'Необходимо дать согласие на обработку данных' : 'Маалыматтарды иштетүүгө макулдук керек');
                      } else if (currentStep === 7) {
                        performExternalChecks().then(() => dispatch({ type: 'SET_CURRENT_STEP', payload: 8 }));
                      } else {
                        dispatch({ type: 'SET_CURRENT_STEP', payload: Math.min(8, currentStep + 1) });
                      }
                    }}
                    disabled={(currentStep === 1 && !tundukAuthenticated) || (currentStep === 6 && !dataProcessingConsent)}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center whitespace-nowrap cursor-pointer"
                  >
                    {language === 'ru' ? 'Далее' : 'Андан ары'}
                    <i className="ri-arrow-right-line ml-2"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tunduk Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="ri-shield-user-line text-3xl text-red-600"></i>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'ru' ? 'Аутентификация Tunduk' : 'Tunduk аутентификациясы'}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {language === 'ru'
                  ? 'Для продолжения необходимо пройти аутентификацию через государственную систему Tunduk'
                  : 'Улантуу үчүн Tunduk мамлекеттик системасы аркылуу аутентификациядан өтүү керек'}
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => dispatch({ type: 'SET_SHOW_AUTH_MODAL', payload: false })}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                >
                  {language === 'ru' ? 'Отмена' : 'Жокко чыгаруу'}
                </button>
                <button
                  onClick={handleTundukAuth}
                  disabled={isProcessingAuth}
                  className={`flex-1 px-4 py-3 rounded-lg whitespace-nowrap cursor-pointer ${isProcessingAuth ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
                >
                  {isProcessingAuth ? (
                    <>
                      <i className="ri-loader-4-line mr-2 animate-spin"></i>
                      {language === 'ru' ? 'Проверка...' : 'Текшерүү...'}
                    </>
                  ) : (
                    <>
                      <i className="ri-shield-check-line mr-2"></i>
                      {language === 'ru' ? 'Войти' : 'Кирүү'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="ri-check-line text-3xl text-green-600"></i>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'ru' ? 'Заявка успешно подана в территориальный орган!' : 'Арыз аймактык органга ийгиликтүү берилди!'}
              </h3>

              <p className="text-gray-600 mb-6">
                {language === 'ru'
                  ? 'Ваша заявка направлена в территориальный орган для рассмотрения. Номер заявки:'
                  : 'Сиздин арызыңыз карап чыгуу үчүн аймактык органга жөнөтүлдү. Арыз номери:'}
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-2xl font-bold text-red-600">
                  {generatedApplicationId}
                </div>
              </div>

              <div className="space-y-4 mb-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <i className="ri-time-line text-blue-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {language === 'ru' ? 'Рассмотрение заявки' : 'Арызды карап чыгуу'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'ru'
                        ? 'Территориальный орган рассмотрит вашу заявку в течение 5-7 рабочих дней'
                        : 'Аймактык орган сиздин арызыңызды 5-7 жумуш күнүнүн ичинде карап чыгат'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <i className="ri-notification-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {language === 'ru' ? 'Уведомления' : 'Билдирүүлөр'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'ru'
                        ? 'Вы получите SMS и email уведомления о статусе заявки'
                        : 'Сизге арыздын абалы жөнүндө SMS жана email билдирүү келет'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <i className="ri-money-dollar-circle-line text-purple-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {language === 'ru' ? 'Ожидаемая выплата' : 'Күтүлүүчү төлөм'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-green-600" suppressHydrationWarning={true}>
                        {benefitCalculation?.totalMonthlyBenefit.toLocaleString()} сом
                      </span> {language === 'ru' ? 'ежемесячно при одобрении' : 'айына бекитилгенде'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSuccessModalClose}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 whitespace-nowrap cursor-pointer"
                >
                  {language === 'ru' ? 'К моим заявкам' : 'Менин арыздарыма'}
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: 'SET_SHOW_SUCCESS_MODAL', payload: false });
                    dispatch({ type: 'RESET_FORM' });
                  }}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
                >
                  {language === 'ru' ? 'Новая заявка' : 'Жаңы арыз'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
