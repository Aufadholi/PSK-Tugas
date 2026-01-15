import { useContext } from 'react';
import ForumContext from '@/Utils/Contexts/ForumContext';
import { 
  sortThreads, 
  searchThreads,
  getRepliesByThread,
  getTopLevelReplies,
  getNestedReplies
} from '@/Utils/forumData';

/**
 * Custom Hook to use Forum Context
 * Must be used within ForumProvider
 */
export const useForum = () => {
  const context = useContext(ForumContext);
  
  if (context === undefined) {
    throw new Error('useForum must be used within a ForumProvider');
  }

  const { state, dispatch } = context;

  // Get filtered and sorted threads
  const getFilteredThreads = () => {
    let filtered = [...state.threads];

    // Search filter
    if (state.searchQuery) {
      filtered = searchThreads(state.searchQuery);
    }

    // Category filter
    if (state.selectedCategory) {
      filtered = filtered.filter(t => t.categoryId === state.selectedCategory);
    }

    // Tags filter
    if (state.selectedTags.length > 0) {
      filtered = filtered.filter(t => 
        state.selectedTags.some(tagId => t.tags.includes(tagId))
      );
    }

    // Sort
    filtered = sortThreads(filtered, state.sortBy);

    // Pinned threads first
    filtered.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

    return filtered;
  };

  // Get replies for current thread
  const getThreadReplies = (threadId) => {
    return getRepliesByThread(threadId || state.currentThread?.id);
  };

  // Get top level replies
  const getTopReplies = (threadId) => {
    return getTopLevelReplies(threadId || state.currentThread?.id);
  };

  // Get nested replies for a reply
  const getRepliesForReply = (replyId) => {
    return getNestedReplies(replyId);
  };

  // Actions
  const createThread = (threadData) => {
    const newThread = {
      id: state.threads.length + 1,
      ...threadData,
      author: state.currentUser,
      views: 0,
      replies: 0,
      votes: 0,
      isPinned: false,
      isSolved: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      solvedBy: null,
    };

    dispatch({ type: 'ADD_THREAD', payload: newThread });
    return newThread;
  };

  const updateThread = (threadId, updates) => {
    dispatch({ 
      type: 'UPDATE_THREAD', 
      payload: { id: threadId, updates } 
    });
  };

  const deleteThread = (threadId) => {
    dispatch({ type: 'DELETE_THREAD', payload: threadId });
  };

  const voteThread = (threadId, voteType) => {
    dispatch({ 
      type: 'VOTE_THREAD', 
      payload: { threadId, voteType } 
    });
  };

  const createReply = (replyData) => {
    const newReply = {
      id: state.replies.length + 1,
      ...replyData,
      author: state.currentUser,
      votes: 0,
      isHelpful: false,
      isBestAnswer: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_REPLY', payload: newReply });
    return newReply;
  };

  const updateReply = (replyId, updates) => {
    dispatch({ 
      type: 'UPDATE_REPLY', 
      payload: { id: replyId, updates } 
    });
  };

  const deleteReply = (replyId) => {
    dispatch({ type: 'DELETE_REPLY', payload: replyId });
  };

  const voteReply = (replyId, voteType) => {
    dispatch({ 
      type: 'VOTE_REPLY', 
      payload: { replyId, voteType } 
    });
  };

  const markAsHelpful = (replyId) => {
    dispatch({ type: 'MARK_AS_HELPFUL', payload: replyId });
  };

  const setBestAnswer = (replyId, threadId) => {
    dispatch({ 
      type: 'SET_BEST_ANSWER', 
      payload: { replyId, threadId } 
    });
  };

  const toggleSolved = (threadId) => {
    dispatch({ type: 'TOGGLE_SOLVED', payload: threadId });
  };

  const togglePin = (threadId) => {
    dispatch({ type: 'TOGGLE_PIN', payload: threadId });
  };

  const incrementViews = (threadId) => {
    dispatch({ type: 'INCREMENT_VIEWS', payload: threadId });
  };

  const setCurrentThread = (thread) => {
    dispatch({ type: 'SET_CURRENT_THREAD', payload: thread });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setCategoryFilter = (categoryId) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: categoryId });
  };

  const setTagFilter = (tags) => {
    dispatch({ type: 'SET_TAG_FILTER', payload: tags });
  };

  const setSortBy = (sortBy) => {
    dispatch({ type: 'SET_SORT', payload: sortBy });
  };

  const toggleCreateThread = () => {
    dispatch({ type: 'TOGGLE_CREATE_THREAD' });
  };

  const toggleReplyForm = (replyingTo = null) => {
    dispatch({ type: 'TOGGLE_REPLY_FORM', payload: replyingTo });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  return {
    // State
    ...state,
    
    // Computed
    filteredThreads: getFilteredThreads(),
    
    // Getters
    getThreadReplies,
    getTopReplies,
    getRepliesForReply,
    
    // Actions
    createThread,
    updateThread,
    deleteThread,
    voteThread,
    createReply,
    updateReply,
    deleteReply,
    voteReply,
    markAsHelpful,
    setBestAnswer,
    toggleSolved,
    togglePin,
    incrementViews,
    setCurrentThread,
    setSearchQuery,
    setCategoryFilter,
    setTagFilter,
    setSortBy,
    toggleCreateThread,
    toggleReplyForm,
    resetFilters,
  };
};

export default useForum;
