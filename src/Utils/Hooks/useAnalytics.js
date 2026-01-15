import { useContext } from 'react';
import AnalyticsContext from '@/Utils/Contexts/AnalyticsContext';

/**
 * Custom Hook to use Analytics Context
 * Must be used within AnalyticsProvider
 */
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
