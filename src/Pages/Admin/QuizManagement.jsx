import { useState } from 'react';
import { modules } from '@/Utils/dummyData';
import toast from 'react-hot-toast';

const QuizManagement = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('create'); // create, preview
  const [quizData, setQuizData] = useState({
    title: '',
    moduleId: '',
    duration: 15,
    passingScore: 70,
    category: 'Programming',
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 10,
    explanation: '',
  });

  const handleQuizDataChange = (field, value) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (field, value) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      toast.error('Pertanyaan tidak boleh kosong!');
      return;
    }

    if (currentQuestion.type === 'multiple-choice') {
      const filledOptions = currentQuestion.options.filter(opt => opt.trim());
      if (filledOptions.length < 2) {
        toast.error('Minimal 2 pilihan jawaban!');
        return;
      }
    }

    setQuestions(prev => [...prev, { ...currentQuestion, id: Date.now() }]);
    setCurrentQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10,
      explanation: '',
    });
    toast.success('Soal berhasil ditambahkan!');
  };

  const removeQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    toast.success('Soal dihapus!');
  };

  const handleSaveQuiz = () => {
    if (!quizData.title.trim()) {
      toast.error('Judul quiz tidak boleh kosong!');
      return;
    }

    if (questions.length === 0) {
      toast.error('Tambahkan minimal 1 soal!');
      return;
    }

    // In real app, would save to backend/database
    console.log('Quiz Data:', { ...quizData, questions });
    toast.success('Quiz berhasil disimpan! (Demo Mode)');
  };

  const handlePublishQuiz = () => {
    if (questions.length === 0) {
      toast.error('Tambahkan minimal 1 soal!');
      return;
    }

    // In real app, would publish to backend
    toast.success('Quiz berhasil dipublish! (Demo Mode)');
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">⚙️ Kelola Quiz</h1>
          <p className="text-gray-600 mt-1">Buat dan kelola quiz untuk mahasiswa</p>
        </div>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
        >
          ← Kembali
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'create'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ✏️ Buat Quiz
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            👁️ Preview ({questions.length} soal)
          </button>
        </div>
      </div>

      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quiz Settings */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">⚙️ Pengaturan Quiz</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Quiz
                  </label>
                  <input
                    type="text"
                    value={quizData.title}
                    onChange={(e) => handleQuizDataChange('title', e.target.value)}
                    placeholder="Masukkan judul quiz"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign ke Modul
                  </label>
                  <select
                    value={quizData.moduleId}
                    onChange={(e) => handleQuizDataChange('moduleId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Pilih Modul</option>
                    {modules.map(module => (
                      <option key={module.id} value={module.id}>
                        {module.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={quizData.category}
                    onChange={(e) => handleQuizDataChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Database">Database</option>
                    <option value="Network">Network</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durasi (menit)
                  </label>
                  <input
                    type="number"
                    value={quizData.duration}
                    onChange={(e) => handleQuizDataChange('duration', parseInt(e.target.value))}
                    min="5"
                    max="180"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nilai Lulus (%)
                  </label>
                  <input
                    type="number"
                    value={quizData.passingScore}
                    onChange={(e) => handleQuizDataChange('passingScore', parseInt(e.target.value))}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleSaveQuiz}
                  className="w-full px-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                >
                  💾 Simpan Draft
                </button>
                <button
                  onClick={handlePublishQuiz}
                  className="w-full px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                >
                  🚀 Publish Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Question Builder */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">✏️ Tambah Soal</h3>
              
              <div className="space-y-4">
                {/* Question Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Soal
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleQuestionChange('type', 'multiple-choice')}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                        currentQuestion.type === 'multiple-choice'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Pilihan Ganda
                    </button>
                    <button
                      onClick={() => handleQuestionChange('type', 'true-false')}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                        currentQuestion.type === 'true-false'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Benar/Salah
                    </button>
                    <button
                      onClick={() => handleQuestionChange('type', 'essay')}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                        currentQuestion.type === 'essay'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Essay
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pertanyaan
                  </label>
                  <textarea
                    value={currentQuestion.question}
                    onChange={(e) => handleQuestionChange('question', e.target.value)}
                    placeholder="Tulis pertanyaan di sini..."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Options for Multiple Choice */}
                {currentQuestion.type === 'multiple-choice' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilihan Jawaban
                    </label>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={currentQuestion.correctAnswer === index}
                            onChange={() => handleQuestionChange('correctAnswer', index)}
                            className="w-5 h-5 text-green-600"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Pilihan ${String.fromCharCode(65 + index)}`}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      ✓ Pilih radio button untuk menandai jawaban yang benar
                    </p>
                  </div>
                )}

                {/* True/False Options */}
                {currentQuestion.type === 'true-false' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jawaban yang Benar
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleQuestionChange('correctAnswer', true)}
                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                          currentQuestion.correctAnswer === true
                            ? 'bg-green-600 text-white border-2 border-green-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ✅ Benar
                      </button>
                      <button
                        onClick={() => handleQuestionChange('correctAnswer', false)}
                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                          currentQuestion.correctAnswer === false
                            ? 'bg-red-600 text-white border-2 border-red-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ❌ Salah
                      </button>
                    </div>
                  </div>
                )}

                {/* Points */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poin
                    </label>
                    <input
                      type="number"
                      value={currentQuestion.points}
                      onChange={(e) => handleQuestionChange('points', parseInt(e.target.value))}
                      min="1"
                      max="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Penjelasan (opsional)
                  </label>
                  <textarea
                    value={currentQuestion.explanation}
                    onChange={(e) => handleQuestionChange('explanation', e.target.value)}
                    placeholder="Penjelasan jawaban yang benar..."
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={addQuestion}
                  className="w-full px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  ➕ Tambah Soal
                </button>
              </div>
            </div>

            {/* Added Questions List */}
            {questions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">📝 Soal yang Ditambahkan ({questions.length})</h3>
                <div className="space-y-3">
                  {questions.map((q, index) => (
                    <div key={q.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                            #{index + 1}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            {q.type === 'multiple-choice' ? 'Pilihan Ganda' :
                             q.type === 'true-false' ? 'Benar/Salah' : 'Essay'}
                          </span>
                          <span className="text-sm text-gray-600">{q.points} poin</span>
                        </div>
                        <p className="text-gray-800 line-clamp-2">{q.question}</p>
                      </div>
                      <button
                        onClick={() => removeQuestion(q.id)}
                        className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{quizData.title || 'Judul Quiz'}</h3>
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
            <span>⏱️ {quizData.duration} menit</span>
            <span>📊 {questions.length} soal</span>
            <span>✅ Nilai lulus: {quizData.passingScore}%</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
              {quizData.category}
            </span>
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Belum ada soal. Tambahkan soal terlebih dahulu.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {questions.map((q, index) => (
                <div key={q.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          {q.type === 'multiple-choice' ? 'Pilihan Ganda' :
                           q.type === 'true-false' ? 'Benar/Salah' : 'Essay'}
                        </span>
                        <span className="text-sm text-gray-600">{q.points} poin</span>
                      </div>
                      <p className="text-lg text-gray-800 mb-3">{q.question}</p>
                      
                      {q.type === 'multiple-choice' && (
                        <div className="space-y-2">
                          {q.options.filter(opt => opt.trim()).map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-3 border-2 rounded-lg ${
                                q.correctAnswer === optIndex
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200'
                              }`}
                            >
                              {option}
                              {q.correctAnswer === optIndex && (
                                <span className="ml-2 text-green-600 font-semibold">✓ Benar</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {q.type === 'true-false' && (
                        <div className="flex gap-3">
                          <div
                            className={`flex-1 p-3 border-2 rounded-lg ${
                              q.correctAnswer === true
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200'
                            }`}
                          >
                            ✅ Benar
                            {q.correctAnswer === true && (
                              <span className="ml-2 text-green-600 font-semibold">✓</span>
                            )}
                          </div>
                          <div
                            className={`flex-1 p-3 border-2 rounded-lg ${
                              q.correctAnswer === false
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200'
                            }`}
                          >
                            ❌ Salah
                            {q.correctAnswer === false && (
                              <span className="ml-2 text-green-600 font-semibold">✓</span>
                            )}
                          </div>
                        </div>
                      )}

                      {q.type === 'essay' && (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 italic">
                          Essay - Jawaban perlu dinilai manual
                        </div>
                      )}

                      {q.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Penjelasan:</strong> {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizManagement;
