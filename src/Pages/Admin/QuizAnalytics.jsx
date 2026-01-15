import { useMemo } from 'react';
import { quizzes } from '@/Utils/dummyData';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const QuizAnalytics = ({ onBack }) => {
  const completedQuizzes = useMemo(
    () => quizzes.filter((q) => q.status === 'completed'),
    []
  );

  // Riwayat nilai quiz (Line Chart)
  const scoreHistory = useMemo(() => {
    return completedQuizzes.map((quiz, index) => ({
      name: `Quiz ${index + 1}`,
      score: quiz.score,
      passingScore: quiz.passingScore,
      date: new Date(quiz.attemptDate).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
      }),
    }));
  }, [completedQuizzes]);

  // Akurasi per kategori (Bar Chart)
  const categoryAccuracy = useMemo(() => {
    const categories = {};
    
    completedQuizzes.forEach((quiz) => {
      if (!categories[quiz.category]) {
        categories[quiz.category] = { total: 0, sum: 0, count: 0 };
      }
      categories[quiz.category].sum += quiz.score;
      categories[quiz.category].count += 1;
    });

    return Object.keys(categories).map((category) => ({
      category,
      accuracy: Math.round(categories[category].sum / categories[category].count),
      quizCount: categories[category].count,
    }));
  }, [completedQuizzes]);

  // Analisis waktu per quiz (Bar Chart)
  const timeAnalysis = useMemo(() => {
    return completedQuizzes.map((quiz, index) => ({
      name: `Quiz ${index + 1}`,
      timeSpent: quiz.timeSpent,
      duration: quiz.duration,
      efficiency: Math.round((quiz.timeSpent / quiz.duration) * 100),
    }));
  }, [completedQuizzes]);

  // Status distribution (Pie Chart)
  const passFailDistribution = useMemo(() => {
    const passed = completedQuizzes.filter((q) => q.score >= q.passingScore).length;
    const failed = completedQuizzes.length - passed;
    
    return [
      { name: 'Lulus', value: passed, color: '#10b981' },
      { name: 'Tidak Lulus', value: failed, color: '#ef4444' },
    ];
  }, [completedQuizzes]);

  // Overall statistics
  const stats = useMemo(() => {
    if (completedQuizzes.length === 0) {
      return {
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        passRate: 0,
        totalTime: 0,
        averageTime: 0,
      };
    }

    const scores = completedQuizzes.map((q) => q.score);
    const times = completedQuizzes.map((q) => q.timeSpent);
    const passed = completedQuizzes.filter((q) => q.score >= q.passingScore).length;

    return {
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      passRate: Math.round((passed / completedQuizzes.length) * 100),
      totalTime: times.reduce((a, b) => a + b, 0),
      averageTime: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
    };
  }, [completedQuizzes]);

  if (completedQuizzes.length === 0) {
    return (
      <div className="space-y-6 max-w-7xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Data Quiz</h3>
          <p className="text-gray-600 mb-6">Selesaikan quiz terlebih dahulu untuk melihat analitik</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Kembali ke Daftar Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📊 Analitik Quiz</h1>
          <p className="text-gray-600 mt-1">Analisis performa dan kemajuan Anda</p>
        </div>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
        >
          ← Kembali
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Rata-rata Nilai</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.averageScore}</p>
          <p className="text-xs text-gray-500 mt-1">dari {completedQuizzes.length} quiz</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Nilai Tertinggi</h3>
          <p className="text-3xl font-bold text-green-600">{stats.highestScore}</p>
          <p className="text-xs text-gray-500 mt-1">Best performance</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Tingkat Kelulusan</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.passRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Pass rate</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Rata-rata Waktu</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.averageTime}</p>
          <p className="text-xs text-gray-500 mt-1">menit per quiz</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Riwayat Nilai (Line Chart) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Riwayat Nilai Quiz</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={scoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8b5cf6"
                strokeWidth={3}
                name="Nilai"
                dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="passingScore"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Batas Lulus"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribusi Lulus/Tidak Lulus (Pie Chart) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Distribusi Kelulusan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={passFailDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {passFailDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Akurasi per Kategori (Bar Chart) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Akurasi per Kategori</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryAccuracy}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar
                dataKey="accuracy"
                fill="#6366f1"
                name="Akurasi (%)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Analisis Waktu (Bar Chart) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">⏱️ Analisis Waktu Pengerjaan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={timeAnalysis}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar
                dataKey="timeSpent"
                fill="#f59e0b"
                name="Waktu Terpakai (menit)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="duration"
                fill="#6b7280"
                name="Durasi Total (menit)"
                radius={[8, 8, 0, 0]}
                opacity={0.5}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Quiz List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Riwayat Detail Quiz</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Quiz</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Kategori</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Nilai</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Waktu</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {completedQuizzes.map((quiz) => (
                <tr key={quiz.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{quiz.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                      {quiz.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-lg font-bold text-gray-800">{quiz.score}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        quiz.score >= quiz.passingScore
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {quiz.score >= quiz.passingScore ? '✅ Lulus' : '❌ Tidak Lulus'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600">
                    {quiz.timeSpent}/{quiz.duration} min
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(quiz.attemptDate).toLocaleDateString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizAnalytics;
