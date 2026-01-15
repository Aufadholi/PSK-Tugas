import { createContext, useReducer, useEffect } from 'react';
import { 
  modules, quizzes, achievements, learningStats,weeklyProgress,
  studyTimeByCategory,cumulativeStudyHours,skillRadarData
} from '@/Utils/dummyData';

// Initial State
const initialState = {
  modules,quizzes,achievements,learningStats,weeklyProgress,studyTimeByCategory,
  cumulativeStudyHours,skillRadarData,
  userPreferences: {
    theme: 'light',
    notifications: true,
    dailyGoal: 60, // menit per hari
  },
  todayProgress: 0,
  loading: false,
  error: null,
};

// Action Types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  UPDATE_MODULE_PROGRESS: 'UPDATE_MODULE_PROGRESS',
  COMPLETE_MODULE: 'COMPLETE_MODULE',
  BOOKMARK_MODULE: 'BOOKMARK_MODULE',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  UPDATE_TODAY_PROGRESS: 'UPDATE_TODAY_PROGRESS',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  INCREMENT_STREAK: 'INCREMENT_STREAK',
};

// Reducer Function
const analyticsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.UPDATE_MODULE_PROGRESS:
      return {
        ...state,
        modules: state.modules.map(m =>
          m.id === action.payload.moduleId
            ? { ...m, progress: action.payload.progress, status: 'in-progress' }
            : m
        ),
      };
    
    case ACTIONS.COMPLETE_MODULE:
      return {
        ...state,
        modules: state.modules.map(m =>
          m.id === action.payload.moduleId
            ? { ...m, status: 'completed', progress: 100, completedAt: new Date().toISOString() }
            : m
        ),
        learningStats: {
          ...state.learningStats,
          completedModules: state.learningStats.completedModules + 1,
        },
      };
    
    case ACTIONS.BOOKMARK_MODULE:
      return {
        ...state,
        modules: state.modules.map(m =>
          m.id === action.payload.moduleId
            ? { ...m, bookmarked: !m.bookmarked }
            : m
        ),
      };
    
    case ACTIONS.UNLOCK_ACHIEVEMENT:
      return {
        ...state,
        achievements: state.achievements.map(a =>
          a.id === action.payload.achievementId
            ? { ...a, unlocked: true, unlockedAt: new Date().toISOString(), progress: 100 }
            : a
        ),
        learningStats: {
          ...state.learningStats,
          totalPoints: state.learningStats.totalPoints + action.payload.points,
        },
      };
    
    case ACTIONS.UPDATE_TODAY_PROGRESS:
      return {
        ...state,
        todayProgress: action.payload,
      };
    
    case ACTIONS.UPDATE_PREFERENCES:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload,
        },
      };
    
    case ACTIONS.INCREMENT_STREAK:
      return {
        ...state,
        learningStats: {
          ...state.learningStats,
          currentStreak: state.learningStats.currentStreak + 1,
          longestStreak: Math.max(
            state.learningStats.currentStreak + 1,
            state.learningStats.longestStreak
          ),
        },
      };
    
    default:
      return state;
  }
};

// Create Context
const AnalyticsContext = createContext(undefined);

// Provider Component
export const AnalyticsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(analyticsReducer, initialState);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      dispatch({
        type: ACTIONS.UPDATE_PREFERENCES,
        payload: JSON.parse(savedPreferences),
      });
    }
  }, []);

  // Save preferences to localStorage when changed
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(state.userPreferences));
  }, [state.userPreferences]);

  // Context value
  const value = {
    state,
    dispatch,
    actions: ACTIONS,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsContext;
