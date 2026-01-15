import { useNavigate } from "react-router-dom";
import { useDashboard } from "@/Utils/Hooks/useDashboard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const {
    learningStats,
    weeklyProgress,
    studyTimeByCategory,
    cumulativeStudyHours,
    skillRadarData,
    moduleStatusDistribution,
    completionPercentage,
    todayProgressPercentage,
    lastAccessedModule,
    recommendedModule,
    bookmarkedModules,
    recentAchievements,
    userPreferences,
    todayProgress,
  } = useDashboard();

  const COLORS = ['#10b981', '#f59e0b', '#6b7280'];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome Card */}
      <div className="bg-indigo-600 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Selamat Datang, {user?.nama || user?.name}! 👋
            </h1>
            <p className="text-indigo-100 text-lg">NIM: {user?.nim || "N/A"}</p>
          </div>
          <div className="hidden md:block">
            <svg className="w-32 h-32 text-white opacity-20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 
              8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 
              2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Ringkasan Progress - Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Modul */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 
                5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Modul</h3>
          <p className="text-3xl font-bold text-gray-800">{learningStats.completedModules}/{learningStats.totalModules}</p>
          <p className="text-xs text-gray-500 mt-2">{completionPercentage}% Selesai</p>
        </div>

        {/* Waktu Belajar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Waktu Belajar</h3>
          <p className="text-3xl font-bold text-gray-800">{Math.round(learningStats.totalStudyTime / 60)}h</p>
          <p className="text-xs text-gray-500 mt-2">{learningStats.totalStudyTime} menit</p>
        </div>

        {/* Poin Pencapaian */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Poin Pencapaian</h3>
          <p className="text-3xl font-bold text-gray-800">{learningStats.totalPoints}</p>
          <p className="text-xs text-gray-500 mt-2">{recentAchievements.length} achievement terbuka</p>
        </div>

        {/* Streak Belajar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Streak Belajar</h3>
          <p className="text-3xl font-bold text-gray-800">{learningStats.currentStreak} Hari</p>
          <p className="text-xs text-gray-500 mt-2">Terpanjang: {learningStats.longestStreak} hari</p>
        </div>
      </div>

      {/* Panel Aksi Cepat */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🚀 Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Lanjutkan Modul Terakhir */}
          {lastAccessedModule && (
            <button
              onClick={() => navigate("/admin/kelas")}
              className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">📚</span>
                <svg className="w-5 h-5 text-indigo-600 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Lanjutkan Belajar</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{lastAccessedModule.title}</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${lastAccessedModule.progress}%` }}></div>
              </div>
            </button>
          )}

          {/* Rekomendasi Modul */}
          {recommendedModule && (
            <button
              onClick={() => navigate("/admin/kelas")}
              className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">✨</span>
                <svg className="w-5 h-5 text-green-600 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Rekomendasi</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{recommendedModule.title}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">{recommendedModule.category}</span>
            </button>
          )}

          {/* Progress Target Hari Ini */}
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">🎯</span>
              <span className="text-sm font-bold text-blue-600">{todayProgressPercentage}%</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Target Hari Ini</h3>
            <p className="text-xs text-gray-600">{todayProgress}/{userPreferences.dailyGoal} menit</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${todayProgressPercentage}%` }}></div>
            </div>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => navigate("/admin/kelas")}
            className="p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">🔖</span>
              <span className="text-sm font-bold text-amber-600">{bookmarkedModules.length}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Bookmark</h3>
            <p className="text-xs text-gray-600">Materi yang ditandai</p>
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Progress per Minggu */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Progress Belajar (4 Minggu Terakhir)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} label={{ value: 'Jam Belajar', angle: 90, position: 'insideRight', style: { fontSize: 11 } }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value, name) => [
                  name === 'Progress (%)' ? `${value}%` : `${value} jam`,
                  name
                ]}
              />
              <Legend 
                wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
                iconType="line"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="progress" 
                stroke="#6366f1" 
                strokeWidth={3} 
                name="Progress (%)" 
                dot={{ fill: '#6366f1', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="hours" 
                stroke="#10b981" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                name="Jam Belajar" 
                dot={{ fill: '#10b981', r: 4, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-0.5 bg-indigo-600 rounded"></div>
              <span>Garis Solid = Progress Utama</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-0.5 bg-green-600 rounded" style={{ backgroundImage: 'repeating-linear-gradient(to right, #10b981 0px, #10b981 5px, transparent 5px, transparent 10px)' }}></div>
              <span>Garis Putus = Jam Belajar</span>
            </div>
          </div>
        </div>

        {/* Pie Chart - Distribusi Status Modul */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Distribusi Status Modul</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={moduleStatusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {moduleStatusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Waktu Belajar per Kategori */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Waktu Belajar per Kategori</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={studyTimeByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="hours" fill="#6366f1" name="Jam Belajar" radius={[8, 8, 0, 0]}>
                {studyTimeByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart - Akumulasi Jam Belajar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">⏰ Akumulasi Jam Belajar</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={cumulativeStudyHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="hours" stroke="#8b5cf6" fill="#c4b5fd" name="Total Jam" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Chart - Penilaian Kemampuan */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Penilaian Kemampuan per Kategori</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={skillRadarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="skill" stroke="#6b7280" fontSize={12} />
            <PolarRadiusAxis stroke="#6b7280" fontSize={12} />
            <Radar name="Kemampuan" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Pencapaian Terbaru</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-md font-medium">
                        +{achievement.points} poin
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md font-medium">
                        {achievement.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;