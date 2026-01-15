import { createContext, useReducer, useEffect } from 'react';
import { forumThreads, forumReplies, getCurrentUser } from '@/Utils/forumData';

// Create Context
const ForumContext = createContext();

// Initial State
const initialState = {
  threads: forumThreads,
  replies: forumReplies,
  currentThread: null,
  currentUser: getCurrentUser(),
  
  // Filters & Search
  searchQuery: '',
  selectedCategory: null,
  selectedTags: [],
  sortBy: 'newest', // newest, popular, solved, unsolved, mostReplies
  
  // UI State
  showCreateThread: false,
  showReplyForm: false,
  replyingTo: null, // for nested replies
  
  // Loading & Error
  loading: false,
  error: null,
};

// Reducer Function
const forumReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THREADS':
      return {
        ...state,
        threads: action.payload,
      };

    case 'SET_CURRENT_THREAD':
      return {
        ...state,
        currentThread: action.payload,
      };

    case 'ADD_THREAD':
      return {
        ...state,
        threads: [action.payload, ...state.threads],
        showCreateThread: false,
      };

    case 'UPDATE_THREAD': {
      return {
        ...state,
        threads: state.threads.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        ),
        currentThread: state.currentThread?.id === action.payload.id
          ? { ...state.currentThread, ...action.payload.updates }
          : state.currentThread,
      };
    }

    case 'DELETE_THREAD':
      return {
        ...state,
        threads: state.threads.filter(t => t.id !== action.payload),
        currentThread: state.currentThread?.id === action.payload ? null : state.currentThread,
      };

    case 'VOTE_THREAD': {
      const { threadId, voteType } = action.payload;
      return {
        ...state,
        threads: state.threads.map(t =>
          t.id === threadId
            ? { ...t, votes: t.votes + (voteType === 'up' ? 1 : -1) }
            : t
        ),
        currentThread: state.currentThread?.id === threadId
          ? { ...state.currentThread, votes: state.currentThread.votes + (voteType === 'up' ? 1 : -1) }
          : state.currentThread,
      };
    }

    case 'ADD_REPLY':
      return {
        ...state,
        replies: [...state.replies, action.payload],
        threads: state.threads.map(t =>
          t.id === action.payload.threadId
            ? { ...t, replies: t.replies + 1, updatedAt: new Date().toISOString() }
            : t
        ),
        currentThread: state.currentThread?.id === action.payload.threadId
          ? { ...state.currentThread, replies: state.currentThread.replies + 1 }
          : state.currentThread,
        showReplyForm: false,
        replyingTo: null,
      };

    case 'UPDATE_REPLY': {
      return {
        ...state,
        replies: state.replies.map(r =>
          r.id === action.payload.id ? { ...r, ...action.payload.updates } : r
        ),
      };
    }

    case 'DELETE_REPLY':
      return {
        ...state,
        replies: state.replies.filter(r => r.id !== action.payload),
      };

    case 'VOTE_REPLY': {
      const { replyId, voteType } = action.payload;
      return {
        ...state,
        replies: state.replies.map(r =>
          r.id === replyId
            ? { ...r, votes: r.votes + (voteType === 'up' ? 1 : -1) }
            : r
        ),
      };
    }

    case 'MARK_AS_HELPFUL': {
      return {
        ...state,
        replies: state.replies.map(r =>
          r.id === action.payload
            ? { ...r, isHelpful: !r.isHelpful }
            : r
        ),
      };
    }

    case 'SET_BEST_ANSWER': {
      const { replyId, threadId } = action.payload;
      return {
        ...state,
        replies: state.replies.map(r =>
          r.threadId === threadId
            ? { ...r, isBestAnswer: r.id === replyId }
            : r
        ),
        threads: state.threads.map(t =>
          t.id === threadId
            ? { ...t, isSolved: true, solvedBy: state.replies.find(r => r.id === replyId)?.author.id }
            : t
        ),
        currentThread: state.currentThread?.id === threadId
          ? { ...state.currentThread, isSolved: true }
          : state.currentThread,
      };
    }

    case 'TOGGLE_SOLVED': {
      const thread = state.threads.find(t => t.id === action.payload);
      return {
        ...state,
        threads: state.threads.map(t =>
          t.id === action.payload
            ? { ...t, isSolved: !t.isSolved }
            : t
        ),
        currentThread: state.currentThread?.id === action.payload
          ? { ...state.currentThread, isSolved: !thread.isSolved }
          : state.currentThread,
      };
    }

    case 'TOGGLE_PIN': {
      return {
        ...state,
        threads: state.threads.map(t =>
          t.id === action.payload
            ? { ...t, isPinned: !t.isPinned }
            : t
        ),
        currentThread: state.currentThread?.id === action.payload
          ? { ...state.currentThread, isPinned: !state.currentThread.isPinned }
          : state.currentThread,
      };
    }

    case 'INCREMENT_VIEWS': {
      return {
        ...state,
        threads: state.threads.map(t =>
          t.id === action.payload
            ? { ...t, views: t.views + 1 }
            : t
        ),
        currentThread: state.currentThread?.id === action.payload
          ? { ...state.currentThread, views: state.currentThread.views + 1 }
          : state.currentThread,
      };
    }

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case 'SET_TAG_FILTER':
      return {
        ...state,
        selectedTags: action.payload,
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload,
      };

    case 'TOGGLE_CREATE_THREAD':
      return {
        ...state,
        showCreateThread: !state.showCreateThread,
      };

    case 'TOGGLE_REPLY_FORM':
      return {
        ...state,
        showReplyForm: !state.showReplyForm,
        replyingTo: action.payload || null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        searchQuery: '',
        selectedCategory: null,
        selectedTags: [],
        sortBy: 'newest',
      };

    default:
      return state;
  }
};

// Provider Component
export const ForumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(forumReducer, initialState);

  // Auto-save to localStorage (optional)
  useEffect(() => {
    const saveTimer = setInterval(() => {
      if (state.threads.length > 0) {
        localStorage.setItem('forum_data', JSON.stringify({
          threads: state.threads,
          replies: state.replies,
        }));
      }
    }, 30000); // Save every 30 seconds

    return () => clearInterval(saveTimer);
  }, [state.threads, state.replies]);

  // Restore from localStorage on mount (optional)
  useEffect(() => {
    const saved = localStorage.getItem('forum_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.threads) {
          dispatch({ type: 'SET_THREADS', payload: data.threads });
        }
      } catch (e) {
        console.error('Error restoring forum data:', e);
      }
    }
  }, []);

  return (
    <ForumContext.Provider value={{ state, dispatch }}>
      {children}
    </ForumContext.Provider>
  );
};

export default ForumContext;
