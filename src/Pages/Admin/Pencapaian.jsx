import { useState } from 'react';
import { useAchievements } from '@/Utils/Hooks/useAchievements';
import { modules } from '@/Utils/dummyData';

const Pencapaian = () => {
  const [activeTab, setActiveTab] = useState('progress'); // progress, badges, learning-path
  const {
    achievements,
    learningPath,
    totalPoints,
    unlockedCount,
    stats,
    getCompletionPercentage,
    getInProgressAchievements
  } = useAchievements();

  const tabs = [
    { id: 'progress', label: 'Progress Pencapaian', icon: '📊' },
    { id: 'badges', label: 'Koleksi Badge', icon: '🏅' },
    { id: 'learning-path', label: 'Learning Path', icon: '🗺️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sistem Pencapaian & Gamifikasi</h1>
            <p className="text-gray-600 mt-2">Tracking progress pembelajaran dan koleksi badge Anda</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 min-w-[200px]">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{totalPoints}</div>
              <div className="text-sm text-gray-600 mt-1">Total Poin</div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Achievement Unlocked</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {unlockedCount}/{achievements.length}
                </p>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{getCompletionPercentage()}% Selesai</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rare & Epic</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {stats.rareUnlocked + stats.epicUnlocked}
                </p>
              </div>
              <div className="text-3xl">💎</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Badge langka terkumpul</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dalam Progress</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {getInProgressAchievements().length}
                </p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Achievement hampir unlock</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Learning Paths</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {learningPath.filter(p => p.progress > 0).length}/{learningPath.length}
                </p>
              </div>
              <div className="text-3xl">🛤️</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Path dalam progress</p>
          </div>
        </div>
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
        {activeTab === 'progress' && <ProgressTab />}
        {activeTab === 'badges' && <BadgesTab />}
        {activeTab === 'learning-path' && <LearningPathTab />}
      </div>
    </div>
  );
};

// ============ PROGRESS TAB ============
const ProgressTab = () => {
  const {
    achievements,
    getInProgressAchievements,
    getUnlockedAchievements,
    getLockedAchievements,
    getRarityColor
  } = useAchievements();

  const [filter, setFilter] = useState('all'); // all, unlocked, in-progress, locked

  const getFilteredAchievements = () => {
    switch (filter) {
      case 'unlocked':
        return getUnlockedAchievements();
      case 'in-progress':
        return getInProgressAchievements();
      case 'locked':
        return getLockedAchievements();
      default:
        return achievements;
    }
  };

  const filteredAchievements = getFilteredAchievements();

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Semua ({achievements.length})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'unlocked'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Unlocked ({getUnlockedAchievements().length})
        </button>
        <button
          onClick={() => setFilter('in-progress')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'in-progress'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Dalam Progress ({getInProgressAchievements().length})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'locked'
              ? 'bg-gray-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Locked ({getLockedAchievements().length})
        </button>
      </div>

      {/* Achievement List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAchievements.map(achievement => (
          <div
            key={achievement.id}
            className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
              achievement.unlocked ? 'border-l-4' : 'opacity-75'
            }`}
            style={{
              borderLeftColor: achievement.unlocked ? getRarityColor(achievement.rarity) : 'transparent'
            }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`text-5xl ${achievement.unlocked ? '' : 'grayscale opacity-40'}`}
              >
                {achievement.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      {achievement.title}
                      {achievement.unlocked && (
                        <span className="text-green-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">+{achievement.points}</div>
                    <div className="text-xs text-gray-500 mt-1">poin</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{achievement.requirement}</span>
                    <span className="text-sm font-medium text-gray-900">{achievement.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="rounded-full h-3 transition-all duration-500"
                      style={{
                        width: `${achievement.progress}%`,
                        backgroundColor: getRarityColor(achievement.rarity)
                      }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getRarityColor(achievement.rarity) }}
                    >
                      {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                      {achievement.category}
                    </span>
                  </div>

                  {achievement.unlocked && (
                    <span className="text-xs text-gray-500">
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString('id-ID')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">Tidak ada achievement dalam kategori ini</p>
        </div>
      )}
    </div>
  );
};

// ============ BADGES TAB ============
const BadgesTab = () => {
  const {
    achievements,
    getRarityColor,
    getRarityLabel
  } = useAchievements();

  const [selectedRarity, setSelectedRarity] = useState('all');

  const rarities = [
    { id: 'all', label: 'Semua', count: achievements.length },
    { id: 'common', label: 'Umum', count: achievements.filter(a => a.rarity === 'common').length },
    { id: 'uncommon', label: 'Tidak Umum', count: achievements.filter(a => a.rarity === 'uncommon').length },
    { id: 'rare', label: 'Langka', count: achievements.filter(a => a.rarity === 'rare').length },
    { id: 'epic', label: 'Epik', count: achievements.filter(a => a.rarity === 'epic').length },
    { id: 'legendary', label: 'Legendaris', count: achievements.filter(a => a.rarity === 'legendary').length }
  ];

  const filteredBadges = selectedRarity === 'all'
    ? achievements
    : achievements.filter(a => a.rarity === selectedRarity);

  return (
    <div className="space-y-6">
      {/* Rarity Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {rarities.slice(1).map(rarity => {
          const unlocked = achievements.filter(a => a.rarity === rarity.id && a.unlocked).length;
          return (
            <div key={rarity.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{rarity.label}</span>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getRarityColor(rarity.id) }}
                />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {unlocked}/{rarity.count}
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                <div
                  className="rounded-full h-1.5 transition-all duration-300"
                  style={{
                    width: `${(unlocked / rarity.count) * 100}%`,
                    backgroundColor: getRarityColor(rarity.id)
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Rarity Filter */}
      <div className="flex gap-2 flex-wrap">
        {rarities.map(rarity => (
          <button
            key={rarity.id}
            onClick={() => setSelectedRarity(rarity.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedRarity === rarity.id
                ? 'text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:shadow-md'
            }`}
            style={{
              backgroundColor: selectedRarity === rarity.id ? getRarityColor(rarity.id) : undefined
            }}
          >
            {rarity.label} ({rarity.count})
          </button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBadges.map(badge => (
          <div
            key={badge.id}
            className={`bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl ${
              badge.unlocked ? 'border-2 hover:scale-105' : 'opacity-60'
            }`}
            style={{
              borderColor: badge.unlocked ? getRarityColor(badge.rarity) : 'transparent'
            }}
          >
            {/* Badge Icon */}
            <div
              className={`text-6xl mb-4 transition-all duration-300 ${
                badge.unlocked ? 'animate-pulse' : 'grayscale'
              }`}
            >
              {badge.icon}
            </div>

            {/* Badge Info */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{badge.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{badge.description}</p>

            {/* Rarity Badge */}
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
              style={{ backgroundColor: getRarityColor(badge.rarity) }}
            >
              {getRarityLabel(badge.rarity)}
            </div>

            {/* Points */}
            <div className="text-2xl font-bold text-blue-600 mb-2">+{badge.points}</div>

            {/* Status */}
            {badge.unlocked ? (
              <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Unlocked
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                <div className="mb-1">{badge.progress}% Progress</div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="rounded-full h-2 transition-all duration-300"
                    style={{
                      width: `${badge.progress}%`,
                      backgroundColor: getRarityColor(badge.rarity)
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ LEARNING PATH TAB ============
const LearningPathTab = () => {
  const { learningPath } = useAchievements();

  const getModuleInfo = (moduleId) => {
    return modules.find(m => m.id === moduleId);
  };

  return (
    <div className="space-y-6">
      {/* Path Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Journey</h2>
        <p className="text-gray-600">
          Ikuti jalur pembelajaran yang direkomendasikan untuk mencapai tujuan Anda
        </p>
      </div>

      {/* Paths Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {learningPath.map(path => {
          const completedSteps = path.steps.filter(s => s.completed).length;
          const totalSteps = path.steps.length;

          return (
            <div key={path.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Path Header */}
              <div
                className="p-6 text-white"
                style={{ backgroundColor: path.color }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                    <p className="text-sm opacity-90">{path.description}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center min-w-[80px] shadow-md">
                    <div className="text-2xl font-bold" style={{ color: path.color }}>{path.progress}%</div>
                    <div className="text-xs text-gray-600">Selesai</div>
                  </div>
                </div>

                {/* Path Progress Bar */}
                <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-500"
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
              </div>

              {/* Path Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>{totalSteps} Modul</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>~{path.estimatedHours} jam</span>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${path.color}20`,
                      color: path.color
                    }}
                  >
                    {path.difficulty}
                  </span>
                </div>
              </div>

              {/* Learning Steps */}
              <div className="p-6">
                <div className="relative">
                  {path.steps.map((step, index) => {
                    const module = getModuleInfo(step.moduleId);
                    const isLast = index === path.steps.length - 1;

                    return (
                      <div key={step.moduleId} className="relative">
                        <div className="flex gap-4">
                          {/* Step Number with Line */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all ${
                                step.completed ? 'ring-4 ring-green-100' : ''
                              }`}
                              style={{
                                backgroundColor: step.completed ? '#10b981' : '#d1d5db'
                              }}
                            >
                              {step.completed ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                step.order
                              )}
                            </div>
                            {!isLast && (
                              <div
                                className={`w-0.5 h-16 ${
                                  step.completed ? 'bg-green-300' : 'bg-gray-300'
                                }`}
                              />
                            )}
                          </div>

                          {/* Module Info */}
                          <div className={`flex-1 pb-6 ${isLast ? 'pb-0' : ''}`}>
                            <div
                              className={`p-4 rounded-lg border-2 transition-all ${
                                step.completed
                                  ? 'bg-green-50 border-green-200'
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    {module?.title || `Module ${step.moduleId}`}
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {module?.description || 'Deskripsi tidak tersedia'}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      {module?.duration || 0} menit
                                    </span>
                                    <span className="px-2 py-0.5 bg-white rounded text-xs">
                                      {module?.difficulty || 'beginner'}
                                    </span>
                                  </div>
                                </div>
                                {step.completed && (
                                  <div className="ml-2 text-green-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Path Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress Path:</span>
                    <span className="font-semibold text-gray-900">
                      {completedSteps} dari {totalSteps} modul selesai
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pencapaian;
