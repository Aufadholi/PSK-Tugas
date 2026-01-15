import { createContext, useReducer } from 'react';
import { achievements as initialAchievements } from '@/Utils/dummyData';

const AchievementsContext = createContext();

// Action Types
const UNLOCK_ACHIEVEMENT = 'UNLOCK_ACHIEVEMENT';
const UPDATE_ACHIEVEMENT_PROGRESS = 'UPDATE_ACHIEVEMENT_PROGRESS';
const RESET_ACHIEVEMENTS = 'RESET_ACHIEVEMENTS';
const SET_LEARNING_PATH = 'SET_LEARNING_PATH';
const UPDATE_PATH_PROGRESS = 'UPDATE_PATH_PROGRESS';

// Initial State
const initialState = {
  achievements: initialAchievements,
  totalPoints: initialAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0),
  unlockedCount: initialAchievements.filter(a => a.unlocked).length,
  learningPath: [
    {
      id: 1,
      title: 'React Fundamentals Path',
      description: 'Master React basics and build your foundation',
      steps: [
        { moduleId: 1, completed: true, order: 1 },
        { moduleId: 2, completed: false, order: 2 },
        { moduleId: 10, completed: false, order: 3 }
      ],
      progress: 33,
      category: 'Programming',
      difficulty: 'beginner',
      estimatedHours: 8.3,
      color: '#6366f1'
    },
    {
      id: 2,
      title: 'Database Mastery Path',
      description: 'From SQL basics to NoSQL databases',
      steps: [
        { moduleId: 3, completed: true, order: 1 },
        { moduleId: 4, completed: false, order: 2 },
        { moduleId: 8, completed: false, order: 3 }
      ],
      progress: 33,
      category: 'Database',
      difficulty: 'intermediate',
      estimatedHours: 7.6,
      color: '#8b5cf6'
    },
    {
      id: 3,
      title: 'Network Professional Path',
      description: 'Become a networking expert',
      steps: [
        { moduleId: 5, completed: true, order: 1 },
        { moduleId: 6, completed: false, order: 2 },
        { moduleId: 9, completed: false, order: 3 },
        { moduleId: 12, completed: false, order: 4 }
      ],
      progress: 25,
      category: 'Network',
      difficulty: 'advanced',
      estimatedHours: 10.4,
      color: '#ec4899'
    },
    {
      id: 4,
      title: 'Full Stack Developer Path',
      description: 'Complete journey to full stack development',
      steps: [
        { moduleId: 1, completed: true, order: 1 },
        { moduleId: 3, completed: true, order: 2 },
        { moduleId: 7, completed: false, order: 3 },
        { moduleId: 11, completed: false, order: 4 },
        { moduleId: 5, completed: true, order: 5 }
      ],
      progress: 60,
      category: 'Programming',
      difficulty: 'advanced',
      estimatedHours: 11.6,
      color: '#10b981'
    }
  ],
  stats: {
    commonUnlocked: initialAchievements.filter(a => a.unlocked && a.rarity === 'common').length,
    uncommonUnlocked: initialAchievements.filter(a => a.unlocked && a.rarity === 'uncommon').length,
    rareUnlocked: initialAchievements.filter(a => a.unlocked && a.rarity === 'rare').length,
    epicUnlocked: initialAchievements.filter(a => a.unlocked && a.rarity === 'epic').length,
    legendaryUnlocked: initialAchievements.filter(a => a.unlocked && a.rarity === 'legendary').length
  }
};

// Reducer
const achievementsReducer = (state, action) => {
  switch (action.type) {
    case UNLOCK_ACHIEVEMENT: {
      const { achievementId } = action.payload;
      const updatedAchievements = state.achievements.map(a => 
        a.id === achievementId && !a.unlocked
          ? { ...a, unlocked: true, unlockedAt: new Date().toISOString(), progress: 100 }
          : a
      );
      const achievement = updatedAchievements.find(a => a.id === achievementId);
      
      return {
        ...state,
        achievements: updatedAchievements,
        totalPoints: state.totalPoints + (achievement?.unlocked ? achievement.points : 0),
        unlockedCount: state.unlockedCount + 1,
        stats: {
          commonUnlocked: updatedAchievements.filter(a => a.unlocked && a.rarity === 'common').length,
          uncommonUnlocked: updatedAchievements.filter(a => a.unlocked && a.rarity === 'uncommon').length,
          rareUnlocked: updatedAchievements.filter(a => a.unlocked && a.rarity === 'rare').length,
          epicUnlocked: updatedAchievements.filter(a => a.unlocked && a.rarity === 'epic').length,
          legendaryUnlocked: updatedAchievements.filter(a => a.unlocked && a.rarity === 'legendary').length
        }
      };
    }
    
    case UPDATE_ACHIEVEMENT_PROGRESS: {
      const { achievementId, progress } = action.payload;
      const updatedAchievements = state.achievements.map(a => 
        a.id === achievementId ? { ...a, progress: Math.min(100, progress) } : a
      );
      
      return {
        ...state,
        achievements: updatedAchievements
      };
    }
    
    case UPDATE_PATH_PROGRESS: {
      const { pathId, moduleId } = action.payload;
      const updatedPaths = state.learningPath.map(path => {
        if (path.id === pathId) {
          const updatedSteps = path.steps.map(step =>
            step.moduleId === moduleId ? { ...step, completed: true } : step
          );
          const completedSteps = updatedSteps.filter(s => s.completed).length;
          const progress = Math.round((completedSteps / updatedSteps.length) * 100);
          
          return { ...path, steps: updatedSteps, progress };
        }
        return path;
      });
      
      return {
        ...state,
        learningPath: updatedPaths
      };
    }
    
    case SET_LEARNING_PATH: {
      return {
        ...state,
        learningPath: action.payload
      };
    }
    
    case RESET_ACHIEVEMENTS: {
      return initialState;
    }
    
    default:
      return state;
  }
};

// Provider Component
export const AchievementsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(achievementsReducer, initialState);
  
  return (
    <AchievementsContext.Provider value={{ state, dispatch }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export default AchievementsContext;
