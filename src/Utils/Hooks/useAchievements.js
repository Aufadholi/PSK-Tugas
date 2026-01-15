import { useContext } from 'react';
import AchievementsContext from '@/Utils/Contexts/AchievementsContext';

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  
  if (!context) {
    throw new Error('useAchievements must be used within AchievementsProvider');
  }
  
  const { state, dispatch } = context;
  
  // Unlock achievement
  const unlockAchievement = (achievementId) => {
    dispatch({
      type: 'UNLOCK_ACHIEVEMENT',
      payload: { achievementId }
    });
  };
  
  // Update achievement progress
  const updateProgress = (achievementId, progress) => {
    dispatch({
      type: 'UPDATE_ACHIEVEMENT_PROGRESS',
      payload: { achievementId, progress }
    });
  };
  
  // Update learning path progress
  const updatePathProgress = (pathId, moduleId) => {
    dispatch({
      type: 'UPDATE_PATH_PROGRESS',
      payload: { pathId, moduleId }
    });
  };
  
  // Get achievements by category
  const getAchievementsByCategory = (category) => {
    return state.achievements.filter(a => a.category === category);
  };
  
  // Get achievements by rarity
  const getAchievementsByRarity = (rarity) => {
    return state.achievements.filter(a => a.rarity === rarity);
  };
  
  // Get unlocked achievements
  const getUnlockedAchievements = () => {
    return state.achievements.filter(a => a.unlocked);
  };
  
  // Get locked achievements
  const getLockedAchievements = () => {
    return state.achievements.filter(a => !a.unlocked);
  };
  
  // Get achievements in progress (progress > 0 but < 100)
  const getInProgressAchievements = () => {
    return state.achievements.filter(a => !a.unlocked && a.progress > 0);
  };
  
  // Get recommended next achievement
  const getRecommendedAchievement = () => {
    const inProgress = getInProgressAchievements();
    if (inProgress.length > 0) {
      return inProgress.sort((a, b) => b.progress - a.progress)[0];
    }
    
    const locked = getLockedAchievements();
    return locked.find(a => a.rarity === 'common' || a.rarity === 'uncommon');
  };
  
  // Get completion percentage
  const getCompletionPercentage = () => {
    return Math.round((state.unlockedCount / state.achievements.length) * 100);
  };
  
  // Get rarity color
  const getRarityColor = (rarity) => {
    const colors = {
      common: '#9ca3af',
      uncommon: '#10b981',
      rare: '#3b82f6',
      epic: '#a855f7',
      legendary: '#f59e0b'
    };
    return colors[rarity] || '#9ca3af';
  };
  
  // Get rarity label
  const getRarityLabel = (rarity) => {
    const labels = {
      common: 'Umum',
      uncommon: 'Tidak Umum',
      rare: 'Langka',
      epic: 'Epik',
      legendary: 'Legendaris'
    };
    return labels[rarity] || 'Umum';
  };
  
  return {
    achievements: state.achievements,
    learningPath: state.learningPath,
    totalPoints: state.totalPoints,
    unlockedCount: state.unlockedCount,
    stats: state.stats,
    unlockAchievement,
    updateProgress,
    updatePathProgress,
    getAchievementsByCategory,
    getAchievementsByRarity,
    getUnlockedAchievements,
    getLockedAchievements,
    getInProgressAchievements,
    getRecommendedAchievement,
    getCompletionPercentage,
    getRarityColor,
    getRarityLabel
  };
};

export default useAchievements;
