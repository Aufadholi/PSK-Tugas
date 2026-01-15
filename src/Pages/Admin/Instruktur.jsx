import { useState } from 'react';
import { useInstruktur } from '@/Utils/Hooks/useInstruktur';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Instruktur = () => {
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, content
  
  const tabs = [
    { id: 'analytics', label: 'Analitik Kelas', icon: '📊' },
    { id: 'content', label: 'Manajemen Konten', icon: '📁' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Instruktur</h1>
        <p className="text-gray-600 mt-2">Monitor performa mahasiswa dan kelola konten pembelajaran</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'content' && <ContentTab />}
      </div>
    </div>
  );
};

// ============ ANALYTICS TAB ============
const AnalyticsTab = () => {
  const {
    analytics,
    weeklyActivity,
    performanceDistribution,
    getFilteredMahasiswa,
    getMahasiswaNeedingHelp,
    getTopPerformers,
    selectedKelas,
    selectedStatus,
    setKelasFilter,
    setStatusFilter
  } = useInstruktur();

  const filteredMahasiswa = getFilteredMahasiswa();
  const needingHelp = getMahasiswaNeedingHelp();
  const topPerformers = getTopPerformers(3);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Mahasiswa</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.totalStudents}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Aktif minggu ini: {weeklyActivity[weeklyActivity.length - 1].activeStudents}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rata-rata Nilai</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{analytics.averageClassScore}</p>
            </div>
            <div className="text-4xl">📈</div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Tingkat penyelesaian: {analytics.averageCompletionRate}%
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Waktu Belajar</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{analytics.totalStudyHours}h</p>
            </div>
            <div className="text-4xl">⏱️</div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Rata-rata: {analytics.averageStudyTimePerStudent}h/mahasiswa
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Butuh Bantuan</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{analytics.studentsNeedingHelp}</p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {analytics.strugglingStudents} struggling
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Mingguan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="activeStudents" stroke="#3b82f6" name="Mahasiswa Aktif" />
              <Line type="monotone" dataKey="avgStudyTime" stroke="#10b981" name="Avg Study Time (h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Performa</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#6366f1" name="Jumlah Mahasiswa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Students Needing Help */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">⚠️ Mahasiswa yang Butuh Bantuan</h3>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            {needingHelp.length} Mahasiswa
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {needingHelp.map(student => (
            <div key={student.id} className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold">
                  {student.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.nim} - {student.kelas}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Nilai rata-rata:</span>
                      <span className={`font-semibold ${student.averageQuizScore < 70 ? 'text-red-600' : 'text-gray-900'}`}>
                        {student.averageQuizScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Penyelesaian:</span>
                      <span className="font-semibold text-gray-900">{student.completionRate}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs mt-2">
                      <span className={`px-2 py-1 rounded-full ${
                        student.status === 'struggling' ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'
                      }`}>
                        {student.status === 'struggling' ? 'Struggling' : 'At Risk'}
                      </span>
                      {student.performanceTrend === 'down' && (
                        <span className="text-red-600">↓ Menurun</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">🏆 Top Performers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((student, index) => (
            <div key={student.id} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold">
                    {student.avatar}
                  </div>
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                      🥇
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.kelas}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Nilai rata-rata:</span>
                      <span className="font-semibold text-green-600">{student.averageQuizScore}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Achievements:</span>
                      <span className="font-semibold text-gray-900">{student.achievements}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Students Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Mahasiswa</h3>
          <div className="flex gap-3">
            <select
              value={selectedKelas}
              onChange={(e) => setKelasFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Kelas</option>
              <option value="TI-3A">TI-3A</option>
              <option value="TI-3B">TI-3B</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="on-track">On Track</option>
              <option value="at-risk">At Risk</option>
              <option value="struggling">Struggling</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Mahasiswa</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Kelas</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Nilai Rata-rata</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Penyelesaian</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Waktu Belajar</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMahasiswa.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                        {student.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.nim}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{student.kelas}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold ${
                      student.averageQuizScore >= 90 ? 'text-green-600' :
                      student.averageQuizScore >= 80 ? 'text-blue-600' :
                      student.averageQuizScore >= 70 ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {student.averageQuizScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-medium text-gray-900">{student.completionRate}%</span>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            student.completionRate >= 80 ? 'bg-green-500' :
                            student.completionRate >= 60 ? 'bg-blue-500' :
                            student.completionRate >= 40 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${student.completionRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    {Math.round(student.totalStudyTime / 60)}h
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === 'on-track' ? 'bg-green-100 text-green-700' :
                      student.status === 'at-risk' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {student.status === 'on-track' ? 'On Track' :
                       student.status === 'at-risk' ? 'At Risk' : 'Struggling'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-lg ${
                      student.performanceTrend === 'up' ? 'text-green-600' :
                      student.performanceTrend === 'stable' ? 'text-gray-600' :
                      'text-red-600'
                    }`}>
                      {student.performanceTrend === 'up' ? '↑' :
                       student.performanceTrend === 'stable' ? '→' : '↓'}
                    </span>
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

// ============ CONTENT TAB ============
const ContentTab = () => {
  const {
    getFilteredKonten,
    getHighEngagementContent,
    getLowEngagementContent,
    getRecentFeedback,
    getPendingFeedback,
    selectedContentType,
    setContentTypeFilter,
    uploadContent,
    updateFeedbackStatus,
    analytics
  } = useInstruktur();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState('library'); // library, analytics, feedback
  const [uploadForm, setUploadForm] = useState({
    title: '',
    type: 'video',
    moduleId: 1,
    fileSize: '',
    duration: ''
  });

  const filteredKonten = getFilteredKonten();
  const highEngagement = getHighEngagementContent();
  const lowEngagement = getLowEngagementContent();
  const recentFeedback = getRecentFeedback();
  const pendingFeedback = getPendingFeedback();

  const handleUpload = (e) => {
    e.preventDefault();
    uploadContent({
      ...uploadForm,
      uploadedBy: "Current Instructor"
    });
    setUploadForm({ title: '', type: 'video', moduleId: 1, fileSize: '', duration: '' });
    setShowUploadForm(false);
  };

  const contentTabs = [
    { id: 'library', label: 'Koleksi Konten', count: filteredKonten.length },
    { id: 'analytics', label: 'Analitik Konten', count: null },
    { id: 'feedback', label: 'Feedback', count: pendingFeedback.length }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Konten</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.totalContentUploaded}</p>
            </div>
            <div className="text-4xl">📁</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Engagement</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{analytics.highEngagementContent}</p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rata-rata Rating</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{analytics.averageContentRating}</p>
            </div>
            <div className="text-4xl">⭐</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Feedback</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{pendingFeedback.length}</p>
            </div>
            <div className="text-4xl">💬</div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            {contentTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {selectedTab === 'library' && (
            <div className="space-y-6">
              {/* Upload Button & Filter */}
              <div className="flex items-center justify-between">
                <select
                  value={selectedContentType}
                  onChange={(e) => setContentTypeFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Tipe</option>
                  <option value="video">Video</option>
                  <option value="pdf">PDF</option>
                  <option value="image">Image</option>
                </select>

                <button
                  onClick={() => setShowUploadForm(!showUploadForm)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Konten
                </button>
              </div>

              {/* Upload Form */}
              {showUploadForm && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Media Baru (UI Only)</h3>
                  <form onSubmit={handleUpload} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Judul Konten</label>
                        <input
                          type="text"
                          value={uploadForm.title}
                          onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                        <select
                          value={uploadForm.type}
                          onChange={(e) => setUploadForm({...uploadForm, type: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="video">Video</option>
                          <option value="pdf">PDF</option>
                          <option value="image">Image</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Module ID</label>
                        <input
                          type="number"
                          value={uploadForm.moduleId}
                          onChange={(e) => setUploadForm({...uploadForm, moduleId: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                          max="12"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
                        <input
                          type="text"
                          value={uploadForm.fileSize}
                          onChange={(e) => setUploadForm({...uploadForm, fileSize: e.target.value})}
                          placeholder="e.g., 245 MB"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Upload (Simulasi)
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowUploadForm(false)}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Content Library Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredKonten.map(content => (
                  <div key={content.id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-40 flex items-center justify-center text-6xl ${
                      content.type === 'video' ? 'bg-red-100' :
                      content.type === 'pdf' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      {content.type === 'video' ? '🎥' :
                       content.type === 'pdf' ? '📄' : '🖼️'}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 line-clamp-2 flex-1">{content.title}</h4>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          content.engagement === 'high' ? 'bg-green-100 text-green-700' :
                          content.engagement === 'medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {content.engagement}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Module {content.moduleId} • {content.fileSize}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {content.views || 0}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {content.likes || 0}
                        </div>
                      </div>
                      {content.type === 'video' && (
                        <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
                          Completion: {content.completionRate}%
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-6">
              {/* High Engagement Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 Konten dengan Engagement Tinggi</h3>
                <div className="space-y-3">
                  {highEngagement.map(content => (
                    <div key={content.id} className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl">
                          {content.type === 'video' ? '🎥' : content.type === 'pdf' ? '📄' : '🖼️'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{content.title}</h4>
                          <p className="text-sm text-gray-600">Module {content.moduleId}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-sm text-gray-600">Views: <span className="font-semibold text-gray-900">{content.views}</span></div>
                          <div className="text-sm text-gray-600">Likes: <span className="font-semibold text-gray-900">{content.likes}</span></div>
                          {content.completionRate && (
                            <div className="text-sm text-gray-600">Completion: <span className="font-semibold text-green-600">{content.completionRate}%</span></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Engagement Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Konten dengan Engagement Rendah</h3>
                <div className="space-y-3">
                  {lowEngagement.map(content => (
                    <div key={content.id} className="flex items-center justify-between p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl">
                          {content.type === 'video' ? '🎥' : content.type === 'pdf' ? '📄' : '🖼️'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{content.title}</h4>
                          <p className="text-sm text-gray-600">Module {content.moduleId}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-sm text-gray-600">Views: <span className="font-semibold text-gray-900">{content.views}</span></div>
                          <div className="text-sm text-gray-600">Likes: <span className="font-semibold text-gray-900">{content.likes}</span></div>
                          {content.completionRate && (
                            <div className="text-sm text-gray-600">Completion: <span className="font-semibold text-orange-600">{content.completionRate}%</span></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {lowEngagement.length === 0 && (
                  <div className="text-center py-8 text-gray-600">
                    Tidak ada konten dengan engagement rendah 👍
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedTab === 'feedback' && (
            <div className="space-y-6">
              {/* Pending Feedback */}
              {pendingFeedback.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">⏳ Pending Review</h3>
                  <div className="space-y-3">
                    {pendingFeedback.map(feedback => (
                      <div key={feedback.id} className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-semibold text-sm">
                              {feedback.studentName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{feedback.studentName}</p>
                              <p className="text-sm text-gray-600">{new Date(feedback.date).toLocaleDateString('id-ID')}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>⭐</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">"{feedback.feedback}"</p>
                        <p className="text-xs text-gray-600 mb-3">Konten: {feedback.contentTitle}</p>
                        <button
                          onClick={() => updateFeedbackStatus(feedback.id, 'reviewed')}
                          className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Mark as Reviewed
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Feedback */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Semua Feedback</h3>
                <div className="space-y-3">
                  {recentFeedback.map(feedback => (
                    <div key={feedback.id} className={`p-4 border-2 rounded-lg ${
                      feedback.status === 'pending' ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold text-sm">
                            {feedback.studentName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{feedback.studentName}</p>
                            <p className="text-sm text-gray-600">{new Date(feedback.date).toLocaleDateString('id-ID')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>⭐</span>
                            ))}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            feedback.status === 'reviewed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {feedback.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">"{feedback.feedback}"</p>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Konten: {feedback.contentTitle}</span>
                        <span>{feedback.helpful} helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Instruktur;
