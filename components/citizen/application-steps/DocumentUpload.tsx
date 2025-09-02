'use client';

interface DocumentUploadProps {
  language: string;
  uploadedFiles: File[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  fileInputKey: number;
}

export default function DocumentUpload({
  language,
  uploadedFiles,
  handleFileUpload,
  removeFile,
  fileInputKey,
}: DocumentUploadProps) {
  const getFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Байт';
    const k = 1024;
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">
        {language === 'ru' ? 'Загрузка и верификация документов' : 'Документтерди жүктөө жана текшерүү'}
      </h3>

      <div className="space-y-6">
        {/* File Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <i className="ri-upload-cloud-2-line text-2xl text-gray-400"></i>
          </div>
          <h4 className="text-lg font-semibold mb-2">
            {language === 'ru' ? 'Загрузите документы' : 'Документтерди жүктөңүз'}
          </h4>
          <p className="text-gray-600 mb-4">
            {language === 'ru'
              ? 'Перетащите файлы сюда или нажмите для выбора'
              : 'Файлдарды бул жерге сүйрөңүз же тандоо үчүн басыңыз'}
          </p>
          <input
            key={fileInputKey}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer inline-block"
          >
            {language === 'ru' ? 'Выбрать файлы' : 'Файлдарды тандоо'}
          </label>
          <p className="text-xs text-gray-500 mt-2">
            {language === 'ru'
              ? 'Поддерживаются файлы: PDF, JPG, PNG, DOC, DOCX (максимум 10 МБ)'
              : 'Колдоого алынган файлдар: PDF, JPG, PNG, DOC, DOCX (эң көп 10 МБ)'}
          </p>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'ru' ? 'Загруженные файлы:' : 'Жүктөлгөн файлдар:'}
            </h4>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={`file-${index}-${file.name}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className="ri-file-3-line text-red-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{getFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-green-600 text-sm"></i>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors cursor-pointer"
                    >
                      <i className="ri-close-line text-red-600 text-sm"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required Documents List */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4 text-blue-900">
            {language === 'ru' ? 'Необходимые документы:' : 'Керектүү документтер:'}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <i className="ri-user-3-line text-blue-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-blue-900">
                    {language === 'ru' ? 'Паспорт главы семьи' : 'Үй-бүлө башчысынын паспорту'}
                  </p>
                  <p className="text-sm text-blue-700">
                    {language === 'ru' ? 'Копия всех заполненных страниц' : 'Толтурулган бардык барактардын көчүрмөсү'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <i className="ri-baby-line text-blue-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-blue-900">
                    {language === 'ru' ? 'Свидетельства о рождении детей' : 'Балдардын туулган күбөлүктөрү'}
                  </p>
                  <p className="text-sm text-blue-700">
                    {language === 'ru' ? 'Для всех детей до 16 лет' : '16 жашка чейинки бардык балдар үчүн'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <i className="ri-money-dollar-circle-line text-blue-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-blue-900">
                    {language === 'ru' ? 'Справки о доходах' : 'Кирешелер жөнүндө справкалар'}
                  </p>
                  <p className="text-sm text-blue-700">
                    {language === 'ru' ? 'За последние 3 месяца' : 'Акыркы 3 ай үчүн'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <i className="ri-home-heart-line text-blue-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-blue-900">
                    {language === 'ru' ? 'Справка о составе семьи' : 'Үй-бүлөнүн курамы жөнүндө справка'}
                  </p>
                  <p className="text-sm text-blue-700">
                    {language === 'ru' ? 'Из местной администрации' : 'Жергиликтүү администрациядан'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
