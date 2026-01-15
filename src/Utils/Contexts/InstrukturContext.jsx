import { createContext, useReducer } from 'react';
import { 
  mahasiswaPerformance, 
  kontenMedia, 
  feedbackMahasiswa,
  classAnalytics,
  weeklyStudentActivity,
  performanceDistribution
} from '@/Utils/dummyData';

const InstrukturContext = createContext();

// Initial State
const initialState = {
  mahasiswa: mahasiswaPerformance,
  konten: kontenMedia,
  feedback: feedbackMahasiswa,
  analytics: classAnalytics,
  weeklyActivity: weeklyStudentActivity,
  performanceDistribution: performanceDistribution,
  
  // Filters
  selectedKelas: 'all', // all, TI-3A, TI-3B
  selectedStatus: 'all', // all, on-track, at-risk, struggling
  selectedContentType: 'all', // all, video, pdf, image
  
  // UI State
  showUploadModal: false,
  showFeedbackModal: false,
  selectedStudent: null,
  selectedContent: null,
};

// Reducer
const instrukturReducer = (state, action) => {
  switch (action.type) {
    case 'SET_KELAS_FILTER':
      return {
        ...state,
        selectedKelas: action.payload
      };
    
    case 'SET_STATUS_FILTER':
      return {
        ...state,
        selectedStatus: action.payload
      };
    
    case 'SET_CONTENT_TYPE_FILTER':
      return {
        ...state,
        selectedContentType: action.payload
      };
    
    case 'SHOW_UPLOAD_MODAL':
      return {
        ...state,
        showUploadModal: true
      };
    
    case 'HIDE_UPLOAD_MODAL':
      return {
        ...state,
        showUploadModal: false
      };
    
    case 'SHOW_FEEDBACK_MODAL':
      return {
        ...state,
        showFeedbackModal: true,
        selectedContent: action.payload
      };
    
    case 'HIDE_FEEDBACK_MODAL':
      return {
        ...state,
        showFeedbackModal: false,
        selectedContent: null
      };
    
    case 'SELECT_STUDENT':
      return {
        ...state,
        selectedStudent: action.payload
      };
    
    case 'UPLOAD_CONTENT':
      return {
        ...state,
        konten: [action.payload, ...state.konten],
        showUploadModal: false
      };
    
    case 'ADD_FEEDBACK':
      return {
        ...state,
        feedback: [action.payload, ...state.feedback]
      };
    
    case 'UPDATE_FEEDBACK_STATUS':
      return {
        ...state,
        feedback: state.feedback.map(f =>
          f.id === action.payload.feedbackId
            ? { ...f, status: action.payload.status }
            : f
        )
      };
    
    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
};

// Provider Component
export const InstrukturProvider = ({ children }) => {
  const [state, dispatch] = useReducer(instrukturReducer, initialState);
  
  return (
    <InstrukturContext.Provider value={{ state, dispatch }}>
      {children}
    </InstrukturContext.Provider>
  );
};

export default InstrukturContext;
