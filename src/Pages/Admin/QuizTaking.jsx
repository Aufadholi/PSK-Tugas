import { useState, useEffect } from 'react';
import { useQuiz } from '@/Utils/Hooks/useQuiz';
import { calculateQuizScore } from '@/Utils/quizQuestionsData';
import toast from 'react-hot-toast';

const QuizTaking = ({ quiz, onExit }) => {
  const { state, dispatch, actions } = useQuiz();
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [localAnswers, setLocalAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Start quiz on mount
  useEffect(() => {
    dispatch({ type: actions.START_QUIZ, payload: { quiz } });
    
    // Try to restore previous progress from localStorage
    const saved = localStorage.getItem(`quiz_${quiz.id}_progress`);
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        setLocalAnswers(progress.answers || {});
        if (progress.currentQuestion !== undefined) {
          dispatch({ type: actions.GO_TO_QUESTION, payload: progress.currentQuestion });
        }
        toast.success('Progress sebelumnya dipulihkan!');
      } catch (e) {
        console.error('Error restoring progress:', e);
      }
    }

    return () => {
      // Cleanup
      localStorage.removeItem(`quiz_${quiz.id}_progress`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.id]);

  // Sync local answers with context
  useEffect(() => {
    Object.keys(localAnswers).forEach(key => {
      dispatch({
        type: actions.SET_ANSWER,
        payload: { questionIndex: parseInt(key), answer: localAnswers[key] }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localAnswers]);

  const currentQuestion = quiz.questions[state.currentQuestion];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(state.answers).length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  // Format time remaining
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle answer change
  const handleAnswerChange = (answer) => {
    setLocalAnswers(prev => ({
      ...prev,
      [state.currentQuestion]: answer
    }));
    
    // Auto-save
    setTimeout(() => {
      dispatch({ type: actions.AUTO_SAVE });
    }, 100);
  };

  // Navigation handlers
  const handleNext = () => {
    if (state.currentQuestion < totalQuestions - 1) {
      dispatch({ type: actions.NEXT_QUESTION });
    }
  };

  const handlePrev = () => {
    if (state.currentQuestion > 0) {
      dispatch({ type: actions.PREV_QUESTION });
    }
  };

  const handleGoToQuestion = (index) => {
    dispatch({ type: actions.GO_TO_QUESTION, payload: index });
  };

  const handleToggleMarkReview = () => {
    dispatch({ type: actions.TOGGLE_MARK_REVIEW, payload: state.currentQuestion });
  };

  // Submit quiz
  const handleSubmit = () => {
    const results = calculateQuizScore(quiz, state.answers);
    
    dispatch({
      type: actions.SUBMIT_QUIZ,
      payload: results
    });

    // Save to dummy data (in real app, would save to backend)
    setQuizResults(results);
    setShowResults(true);
    setShowSubmitConfirm(false);
    
    // Clear localStorage
    localStorage.removeItem(`quiz_${quiz.id}_progress`);
  };

  // Handle finish from results page
  const handleFinish = () => {
    toast.success(`Quiz selesai! Nilai Anda: ${quizResults.score}`);
    onExit();
  };

  // Auto-submit when time runs out
  useEffect(() => {
    if (state.timeRemaining === 0 && state.quizStarted) {
      toast.error('Waktu habis! Quiz akan di-submit otomatis.');
      setTimeout(() => {
        handleSubmit();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.timeRemaining, state.quizStarted]);

  // Warn before leaving
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (state.quizStarted && !showResults) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.quizStarted, showResults]);

  if (!state.quizStarted && !state.quizCompleted) {
    return <div className="p-8 text-center">Loading quiz...</div>;
  }

  // Show Results Page
  if (showResults && quizResults) {
    const passed = quizResults.score >= quiz.passingScore;
    const correctAnswers = quizResults.correctCount;
    const incorrectAnswers = quizResults.incorrectCount;
    const timeUsed = Math.floor((quiz.duration * 60 - state.timeRemaining) / 60);
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Results Header */}
          <div className={`rounded-3xl shadow-2xl p-8 mb-6 ${
            passed 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-red-500 to-rose-600'
          } text-white`}>
            <div className="text-center">
              <div className="text-6xl mb-4">
                {passed ? '🎉' : '😔'}
              </div>
              <h1 className="text-4xl font-bold mb-2">
                {passed ? 'Selamat! Anda Lulus!' : 'Belum Berhasil'}
              </h1>
              <p className="text-xl opacity-90">
                {passed 
                  ? 'Kerja bagus! Anda telah menyelesaikan quiz dengan baik.' 
                  : 'Jangan menyerah! Pelajari kembali materi dan coba lagi.'}
              </p>
            </div>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 mb-4">
                <div className="text-5xl font-bold text-purple-600">{quizResults.score}</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Nilai Akhir</h2>
              <p className="text-gray-600">
                Passing Score: <span className="font-semibold">{quiz.passingScore}</span>
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-sm text-gray-600 mt-1">Benar</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                <div className="text-3xl font-bold text-red-600">{incorrectAnswers}</div>
                <div className="text-sm text-gray-600 mt-1">Salah</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
                <div className="text-sm text-gray-600 mt-1">Akurasi</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{timeUsed}</div>
                <div className="text-sm text-gray-600 mt-1">Menit</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress Pengerjaan</span>
                <span>{correctAnswers}/{totalQuestions} soal benar</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${
                    passed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-rose-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quiz Details */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Detail Quiz</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Judul Quiz</span>
                <span className="font-semibold text-gray-800">{quiz.title}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Total Soal</span>
                <span className="font-semibold text-gray-800">{totalQuestions} soal</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Waktu Pengerjaan</span>
                <span className="font-semibold text-gray-800">{timeUsed} dari {quiz.duration} menit</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Soal Ditandai Review</span>
                <span className="font-semibold text-gray-800">{state.markedForReview.length} soal</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Status</span>
                <span className={`px-4 py-1 rounded-full font-bold ${
                  passed 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {passed ? '✅ LULUS' : '❌ TIDAK LULUS'}
                </span>
              </div>
            </div>
          </div>

          {/* Answer Review Summary */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Ringkasan Jawaban</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {quiz.questions.map((question, index) => {
                const userAnswer = state.answers[index];
                const isCorrect = quizResults.details[index]?.isCorrect;
                
                return (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold border-2 ${
                      isCorrect
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : userAnswer !== undefined
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                    }`}
                    title={`Soal ${index + 1}: ${isCorrect ? 'Benar' : userAnswer !== undefined ? 'Salah' : 'Tidak dijawab'}`}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 border-2 border-green-300 rounded"></div>
                <span className="text-gray-600">Jawaban Benar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-100 border-2 border-red-300 rounded"></div>
                <span className="text-gray-600">Jawaban Salah</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 border-2 border-gray-300 rounded"></div>
                <span className="text-gray-600">Tidak Dijawab</span>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className={`rounded-2xl p-6 mb-6 ${
            passed 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
          }`}>
            <p className="text-gray-700 text-center">
              {passed 
                ? '💪 Pertahankan semangat belajar Anda! Lanjutkan ke materi berikutnya untuk terus berkembang.'
                : '📚 Gunakan hasil ini sebagai pembelajaran. Tinjau kembali materi yang belum dikuasai dan coba lagi!'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleFinish}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Selesai & Kembali
            </button>
            {!passed && (
              <button
                onClick={onExit}
                className="flex-1 px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all"
              >
                Coba Lagi
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{quiz.title}</h1>
              <p className="text-sm text-gray-600">Soal {state.currentQuestion + 1} dari {totalQuestions}</p>
            </div>
            
            {/* Timer */}
            <div className={`px-6 py-3 rounded-xl font-bold text-lg ${
              state.timeRemaining < 60 ? 'bg-red-100 text-red-700' :
              state.timeRemaining < 300 ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              ⏱️ {formatTime(state.timeRemaining)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{answeredCount}/{totalQuestions} terjawab ({progress}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold">
                    #{state.currentQuestion + 1}
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {currentQuestion.type === 'multiple-choice' ? 'Pilihan Ganda' :
                       currentQuestion.type === 'true-false' ? 'Benar/Salah' : 'Essay'}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{currentQuestion.points} poin</p>
                  </div>
                </div>

                {/* Mark for Review */}
                <button
                  onClick={handleToggleMarkReview}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    state.markedForReview.includes(state.currentQuestion)
                      ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-400'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {state.markedForReview.includes(state.currentQuestion) ? '⭐ Ditandai' : '☆ Tandai'}
                </button>
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.type === 'multiple-choice' && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          localAnswers[state.currentQuestion] === index
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          checked={localAnswers[state.currentQuestion] === index}
                          onChange={() => handleAnswerChange(index)}
                          className="w-5 h-5 text-purple-600"
                        />
                        <span className="ml-4 text-gray-800">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'true-false' && (
                  <div className="space-y-3">
                    <label
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        localAnswers[state.currentQuestion] === true
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        checked={localAnswers[state.currentQuestion] === true}
                        onChange={() => handleAnswerChange(true)}
                        className="w-5 h-5 text-green-600"
                      />
                      <span className="ml-4 text-gray-800 font-semibold">✅ Benar</span>
                    </label>
                    <label
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        localAnswers[state.currentQuestion] === false
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        checked={localAnswers[state.currentQuestion] === false}
                        onChange={() => handleAnswerChange(false)}
                        className="w-5 h-5 text-red-600"
                      />
                      <span className="ml-4 text-gray-800 font-semibold">❌ Salah</span>
                    </label>
                  </div>
                )}

                {currentQuestion.type === 'essay' && (
                  <textarea
                    value={localAnswers[state.currentQuestion] || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Tulis jawaban Anda di sini..."
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none min-h-[200px] resize-y"
                  />
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={state.currentQuestion === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Sebelumnya
              </button>

              {state.currentQuestion === totalQuestions - 1 ? (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Selanjutnya →
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-32">
              <h3 className="font-bold text-gray-800 mb-4">Navigasi Soal</h3>
              <div className="grid grid-cols-5 gap-2">
                {quiz.questions.map((_, index) => {
                  const isAnswered = state.answers[index] !== undefined;
                  const isMarked = state.markedForReview.includes(index);
                  const isCurrent = state.currentQuestion === index;

                  return (
                    <button
                      key={index}
                      onClick={() => handleGoToQuestion(index)}
                      className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                        isCurrent
                          ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                          : isMarked
                          ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-400'
                          : isAnswered
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span>Terjawab</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded"></div>
                  <span>Ditandai</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                  <span>Belum dijawab</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="w-full mt-6 px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Konfirmasi Submit</h3>
            <div className="space-y-3 mb-6">
              <p className="text-gray-600">
                Apakah Anda yakin ingin submit quiz ini?
              </p>
              <div className="p-4 bg-gray-50 rounded-xl space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total soal:</span>
                  <strong>{totalQuestions}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Terjawab:</span>
                  <strong className="text-green-600">{answeredCount}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Belum dijawab:</span>
                  <strong className="text-red-600">{totalQuestions - answeredCount}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Ditandai review:</span>
                  <strong className="text-yellow-600">{state.markedForReview.length}</strong>
                </div>
              </div>
              <p className="text-sm text-red-600">
                ⚠️ Soal yang belum dijawab akan dianggap salah!
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Ya, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTaking;
