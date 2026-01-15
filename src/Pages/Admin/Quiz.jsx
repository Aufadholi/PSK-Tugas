import { useState } from 'react';
import { quizzes } from '@/Utils/dummyData';
import { getQuizQuestions } from '@/Utils/quizQuestionsData';
import QuizTaking from './QuizTaking';
import QuizAnalytics from './QuizAnalytics';
import QuizManagement from './QuizManagement';
import toast from 'react-hot-toast';

const Quiz = () => {
  const [activeTab, setActiveTab] = useState('list'); // list, taking, analytics, management
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const isInstructor = user?.role === 'dosen' || user?.role === 'admin';

  // Group quizzes by status
  const availableQuizzes = quizzes.filter(q => q.status === 'not-started');
  const inProgressQuizzes = quizzes.filter(q => q.status === 'in-progress');
  const completedQuizzes = quizzes.filter(q => q.status === 'completed');

  const handleStartQuiz = (quiz) => {
    const quizWithQuestions = getQuizQuestions(quiz.id);
    if (quizWithQuestions) {
      setSelectedQuiz(quizWithQuestions);
      setActiveTab('taking');
    } else {
      toast.error('Quiz ini belum memiliki soal lengkap. Hanya Quiz 1, 2, dan 3 yang tersedia untuk demo.');
    }
  };

  const handleViewResults = (quiz) => {
    setSelectedQuiz(quiz);
    setActiveTab('analytics');
  };

  const handleBackToList = () => {
    setSelectedQuiz(null);
    setActiveTab('list');
  };

  // Render different views based on active tab
  if (activeTab === 'taking' && selectedQuiz) {
    return <QuizTaking quiz={selectedQuiz} onExit={handleBackToList} />;
  }

  if (activeTab === 'analytics') {
    return <QuizAnalytics onBack={handleBackToList} />;
  }

  if (activeTab === 'management' && isInstructor) {
    return <QuizManagement onBack={handleBackToList} />;
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="bg-purple-600 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">📝 Sistem Quiz & Penilaian</h1>
            <p className="text-purple-100 text-lg">Uji pemahaman Anda dengan quiz interaktif</p>
          </div>
          <div className="hidden md:block">
            <svg className="w-32 h-32 text-white opacity-20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'list'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📋 Daftar Quiz
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📊 Analitik
          </button>
          {isInstructor && (
            <button
              onClick={() => setActiveTab('management')}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'management'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ⚙️ Kelola Quiz
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Quiz Selesai</h3>
          <p className="text-3xl font-bold text-gray-800">{completedQuizzes.length}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Tersedia</h3>
          <p className="text-3xl font-bold text-gray-800">{availableQuizzes.length}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Rata-rata Nilai</h3>
          <p className="text-3xl font-bold text-gray-800">
            {completedQuizzes.length > 0
              ? Math.round(completedQuizzes.reduce((sum, q) => sum + (q.score || 0), 0) / completedQuizzes.length)
              : 0}
          </p>
        </div>
      </div>

      {/* Quiz Lists */}
      <div className="space-y-6">
        {/* In Progress Quizzes */}
        {inProgressQuizzes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🔄 Quiz Sedang Dikerjakan</h2>
            <div className="space-y-4">
              {inProgressQuizzes.map((quiz) => (
                <div key={quiz.id} className="border border-yellow-200 bg-yellow-50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{quiz.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>⏱️ {quiz.duration} menit</span>
                      <span>📊 {quiz.totalQuestions} soal</span>
                      <span>✅ Nilai lulus: {quiz.passingScore}%</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                  >
                    Lanjutkan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Quizzes */}
        {availableQuizzes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Quiz Tersedia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableQuizzes.map((quiz) => (
                <div key={quiz.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{quiz.title}</h3>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                        {quiz.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>Durasi: {quiz.duration} menit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📊</span>
                      <span>Jumlah soal: {quiz.totalQuestions}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✅</span>
                      <span>Nilai lulus: {quiz.passingScore}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📘</span>
                      <span>Tipe: {quiz.type}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Mulai Quiz
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Quizzes */}
        {completedQuizzes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">✅ Quiz yang Sudah Selesai</h2>
            <div className="space-y-4">
              {completedQuizzes.map((quiz) => (
                <div key={quiz.id} className="border border-green-200 bg-green-50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{quiz.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        quiz.score >= quiz.passingScore
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {quiz.score >= quiz.passingScore ? '✅ Lulus' : '❌ Tidak Lulus'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📊 Nilai: <strong className="text-gray-800">{quiz.score}</strong></span>
                      <span>⏱️ Waktu: {quiz.timeSpent} menit</span>
                      <span>📅 {new Date(quiz.attemptDate).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewResults(quiz)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Lihat Hasil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
