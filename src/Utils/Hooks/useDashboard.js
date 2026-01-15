import { useAnalytics } from '@/Utils/Hooks/useAnalytics';
import { useMemo } from 'react';

/**
 * Custom Hook untuk Dashboard Analytics
 * Menyediakan business logic untuk dashboard pembelajaran
 */
export const useDashboard = () => {
  const { state, dispatch, actions } = useAnalytics();

  // Get completed modules percentage
  const completionPercentage = useMemo(() => {
    if (state.learningStats.totalModules === 0) return 0;
    return Math.round(
      (state.learningStats.completedModules / state.learningStats.totalModules) * 100
    );
  }, [state.learningStats.completedModules, state.learningStats.totalModules]);

  // Get today's study progress
  const todayProgressPercentage = useMemo(() => {
    const dailyGoal = state.userPreferences.dailyGoal;
    return Math.min(Math.round((state.todayProgress / dailyGoal) * 100), 100);
  }, [state.todayProgress, state.userPreferences.dailyGoal]);

  // Get module status distribution for Pie Chart
  const moduleStatusDistribution = useMemo(() => {
    return [
      {
        name: 'Selesai',
        value: state.learningStats.completedModules,
        color: '#10b981',
      },
      {
        name: 'Sedang Berjalan',
        value: state.learningStats.inProgressModules,
        color: '#f59e0b',
      },
      {
        name: 'Belum Dimulai',
        value: state.learningStats.notStartedModules,
        color: '#6b7280',
      },
    ];
  }, [state.learningStats]);

  // Get last accessed module
  const lastAccessedModule = useMemo(() => {
    return state.modules
      .filter(m => m.lastAccessed)
      .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))[0];
  }, [state.modules]);

  // Get recommended next module
  const recommendedModule = useMemo(() => {
    return state.modules.find(m => m.status === 'not-started');
  }, [state.modules]);

  // Get bookmarked modules
  const bookmarkedModules = useMemo(() => {
    return state.modules.filter(m => m.bookmarked);
  }, [state.modules]);

  // Get unlocked achievements
  const unlockedAchievements = useMemo(() => {
    return state.achievements.filter(a => a.unlocked);
  }, [state.achievements]);

  // Get recent achievements (last 3)
  const recentAchievements = useMemo(() => {
    return state.achievements
      .filter(a => a.unlocked)
      .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
      .slice(0, 3);
  }, [state.achievements]);

  // Update module progress
  const updateModuleProgress = (moduleId, progress) => {
    dispatch({
      type: actions.UPDATE_MODULE_PROGRESS,
      payload: { moduleId, progress },
    });

    // Check if module is completed
    if (progress >= 100) {
      completeModule(moduleId);
    }
  };

  // Complete a module
  const completeModule = (moduleId) => {
    dispatch({
      type: actions.COMPLETE_MODULE,
      payload: { moduleId },
    });

    // Check and unlock achievements
    checkAchievements();
  };

  // Toggle module bookmark
  const toggleBookmark = (moduleId) => {
    dispatch({
      type: actions.BOOKMARK_MODULE,
      payload: { moduleId },
    });
  };

  // Update today's study progress
  const updateTodayProgress = (minutes) => {
    dispatch({
      type: actions.UPDATE_TODAY_PROGRESS,
      payload: minutes,
    });
  };

  // Check and unlock achievements based on current progress
  const checkAchievements = () => {
    const completedModulesCount = state.learningStats.completedModules + 1;

    // First Steps Achievement
    if (completedModulesCount >= 1) {
      const achievement = state.achievements.find(a => a.id === 1);
      if (!achievement?.unlocked) {
        unlockAchievement(1, 50);
      }
    }

    // Knowledge Seeker Achievement
    if (completedModulesCount >= 10) {
      const achievement = state.achievements.find(a => a.id === 11);
      if (!achievement?.unlocked) {
        unlockAchievement(11, 500);
      }
    }
  };

  // Unlock achievement
  const unlockAchievement = (achievementId, points) => {
    dispatch({
      type: actions.UNLOCK_ACHIEVEMENT,
      payload: { achievementId, points },
    });
  };

  // Increment study streak
  const incrementStreak = () => {
    dispatch({
      type: actions.INCREMENT_STREAK,
    });
  };

  // Update user preferences
  const updatePreferences = (preferences) => {
    dispatch({
      type: actions.UPDATE_PREFERENCES,
      payload: preferences,
    });
  };

  return {
    // State
    modules: state.modules,
    quizzes: state.quizzes,
    achievements: state.achievements,
    learningStats: state.learningStats,
    weeklyProgress: state.weeklyProgress,
    studyTimeByCategory: state.studyTimeByCategory,
    cumulativeStudyHours: state.cumulativeStudyHours,
    skillRadarData: state.skillRadarData,
    userPreferences: state.userPreferences,
    todayProgress: state.todayProgress,
    loading: state.loading,
    error: state.error,

    // Computed values
    completionPercentage,
    todayProgressPercentage,
    moduleStatusDistribution,
    lastAccessedModule,
    recommendedModule,
    bookmarkedModules,
    unlockedAchievements,
    recentAchievements,

    // Actions
    updateModuleProgress,
    completeModule,
    toggleBookmark,
    updateTodayProgress,
    unlockAchievement,
    incrementStreak,
    updatePreferences,
  };
};
