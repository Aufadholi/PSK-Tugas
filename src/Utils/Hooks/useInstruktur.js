import { useContext } from 'react';
import InstrukturContext from '@/Utils/Contexts/InstrukturContext';

export const useInstruktur = () => {
  const context = useContext(InstrukturContext);
  
  if (!context) {
    throw new Error('useInstruktur must be used within InstrukturProvider');
  }
  
  const { state, dispatch } = context;
  
  // Filter mahasiswa
  const getFilteredMahasiswa = () => {
    let filtered = state.mahasiswa;
    
    if (state.selectedKelas !== 'all') {
      filtered = filtered.filter(m => m.kelas === state.selectedKelas);
    }
    
    if (state.selectedStatus !== 'all') {
      filtered = filtered.filter(m => m.status === state.selectedStatus);
    }
    
    return filtered;
  };
  
  // Filter konten
  const getFilteredKonten = () => {
    if (state.selectedContentType === 'all') {
      return state.konten;
    }
    return state.konten.filter(k => k.type === state.selectedContentType);
  };
  
  // Get mahasiswa yang butuh bantuan
  const getMahasiswaNeedingHelp = () => {
    return state.mahasiswa.filter(m => m.needsHelp);
  };
  
  // Get mahasiswa by status
  const getMahasiswaByStatus = (status) => {
    return state.mahasiswa.filter(m => m.status === status);
  };
  
  // Get top performers
  const getTopPerformers = (limit = 5) => {
    return [...state.mahasiswa]
      .sort((a, b) => b.averageQuizScore - a.averageQuizScore)
      .slice(0, limit);
  };
  
  // Get konten dengan engagement tinggi
  const getHighEngagementContent = () => {
    return state.konten.filter(k => k.engagement === 'high');
  };
  
  // Get konten dengan engagement rendah
  const getLowEngagementContent = () => {
    return state.konten.filter(k => k.engagement === 'low');
  };
  
  // Get recent feedback
  const getRecentFeedback = (limit = 5) => {
    return [...state.feedback]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };
  
  // Get pending feedback
  const getPendingFeedback = () => {
    return state.feedback.filter(f => f.status === 'pending');
  };
  
  // Get average rating for content
  const getContentAverageRating = (contentId) => {
    const contentFeedback = state.feedback.filter(f => f.contentId === contentId);
    if (contentFeedback.length === 0) return 0;
    return (contentFeedback.reduce((sum, f) => sum + f.rating, 0) / contentFeedback.length).toFixed(1);
  };
  
  // Set filters
  const setKelasFilter = (kelas) => {
    dispatch({ type: 'SET_KELAS_FILTER', payload: kelas });
  };
  
  const setStatusFilter = (status) => {
    dispatch({ type: 'SET_STATUS_FILTER', payload: status });
  };
  
  const setContentTypeFilter = (type) => {
    dispatch({ type: 'SET_CONTENT_TYPE_FILTER', payload: type });
  };
  
  // Select student
  const selectStudent = (student) => {
    dispatch({ type: 'SELECT_STUDENT', payload: student });
  };
  
  // Upload content (UI only - no actual upload)
  const uploadContent = (content) => {
    const newContent = {
      id: state.konten.length + 1,
      uploadDate: new Date().toISOString(),
      views: 0,
      likes: 0,
      engagement: 'medium',
      ...content
    };
    dispatch({ type: 'UPLOAD_CONTENT', payload: newContent });
  };
  
  // Update feedback status
  const updateFeedbackStatus = (feedbackId, status) => {
    dispatch({ 
      type: 'UPDATE_FEEDBACK_STATUS', 
      payload: { feedbackId, status } 
    });
  };
  
  return {
    // State
    mahasiswa: state.mahasiswa,
    konten: state.konten,
    feedback: state.feedback,
    analytics: state.analytics,
    weeklyActivity: state.weeklyActivity,
    performanceDistribution: state.performanceDistribution,
    selectedKelas: state.selectedKelas,
    selectedStatus: state.selectedStatus,
    selectedContentType: state.selectedContentType,
    selectedStudent: state.selectedStudent,
    selectedContent: state.selectedContent,
    
    // Getters
    getFilteredMahasiswa,
    getFilteredKonten,
    getMahasiswaNeedingHelp,
    getMahasiswaByStatus,
    getTopPerformers,
    getHighEngagementContent,
    getLowEngagementContent,
    getRecentFeedback,
    getPendingFeedback,
    getContentAverageRating,
    
    // Actions
    setKelasFilter,
    setStatusFilter,
    setContentTypeFilter,
    selectStudent,
    uploadContent,
    updateFeedbackStatus
  };
};

export default useInstruktur;
