import { useContext } from 'react';
import QuizContext from '@/Utils/Contexts/QuizContext';
import { QUIZ_ACTIONS } from '@/Utils/constants/quizConstants';

/**
 * Custom Hook to use Quiz Context
 * Must be used within QuizProvider
 */
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return { ...context, actions: QUIZ_ACTIONS };
};
