import { createContext, useReducer, useEffect } from 'react';
import { QUIZ_ACTIONS } from '@/Utils/constants/quizConstants';

// Initial State
const initialState = {
  currentQuiz: null,
  currentQuestion: 0,
  answers: {},
  markedForReview: [],
  timeRemaining: null,
  quizStarted: false,
  quizCompleted: false,
  quizResults: null,
  loading: false,
  error: null,
};

// Reducer Function
const quizReducer = (state, action) => {
  switch (action.type) {
    case QUIZ_ACTIONS.START_QUIZ:
      return {
        ...state,
        currentQuiz: action.payload.quiz,
        currentQuestion: 0,
        answers: {},
        markedForReview: [],
        timeRemaining: action.payload.quiz.duration * 60, // convert to seconds
        quizStarted: true,
        quizCompleted: false,
        quizResults: null,
      };

    case QUIZ_ACTIONS.SET_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionIndex]: action.payload.answer,
        },
      };

    case QUIZ_ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: Math.min(
          state.currentQuestion + 1,
          state.currentQuiz.questions.length - 1
        ),
      };

    case QUIZ_ACTIONS.PREV_QUESTION:
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0),
      };

    case QUIZ_ACTIONS.GO_TO_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };

    case QUIZ_ACTIONS.TOGGLE_MARK_REVIEW: {
      const questionIndex = action.payload;
      const isMarked = state.markedForReview.includes(questionIndex);
      return {
        ...state,
        markedForReview: isMarked
          ? state.markedForReview.filter((i) => i !== questionIndex)
          : [...state.markedForReview, questionIndex],
      };
    }

    case QUIZ_ACTIONS.UPDATE_TIME: {
      const newTime = state.timeRemaining - 1;
      if (newTime <= 0) {
        // Auto-submit when time runs out
        return {
          ...state,
          timeRemaining: 0,
          quizCompleted: true,
          quizStarted: false,
        };
      }
      return {
        ...state,
        timeRemaining: newTime,
      };
    }

    case QUIZ_ACTIONS.SUBMIT_QUIZ:
      return {
        ...state,
        quizCompleted: true,
        quizStarted: false,
        quizResults: action.payload,
      };

    case QUIZ_ACTIONS.RESET_QUIZ:
      return initialState;

    case QUIZ_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case QUIZ_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case QUIZ_ACTIONS.AUTO_SAVE:
      // Save to localStorage
      localStorage.setItem(
        `quiz_${state.currentQuiz?.id}_progress`,
        JSON.stringify({
          answers: state.answers,
          markedForReview: state.markedForReview,
          currentQuestion: state.currentQuestion,
          timeRemaining: state.timeRemaining,
        })
      );
      return state;

    default:
      return state;
  }
};

// Create Context
const QuizContext = createContext(undefined);

// Provider Component
export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Auto-save effect
  useEffect(() => {
    if (state.quizStarted && state.currentQuiz) {
      const autoSaveTimer = setInterval(() => {
        dispatch({ type: QUIZ_ACTIONS.AUTO_SAVE });
      }, 5000); // Auto-save every 5 seconds

      return () => clearInterval(autoSaveTimer);
    }
  }, [state.quizStarted, state.currentQuiz, state.answers]);

  // Timer countdown effect
  useEffect(() => {
    if (state.quizStarted && state.timeRemaining > 0) {
      const timerInterval = setInterval(() => {
        dispatch({ type: QUIZ_ACTIONS.UPDATE_TIME });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [state.quizStarted, state.timeRemaining]);

  const value = {
    state,
    dispatch,
    actions: QUIZ_ACTIONS,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export default QuizContext;
