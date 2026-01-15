import { useState } from 'react';
import { useForum } from '@/Utils/Hooks/useForum';
import { forumCategories, forumTags } from '@/Utils/forumData';
import { useNavigate } from 'react-router-dom';
import CreateThread from './CreateThread';

const Forum = () => {
  const navigate = useNavigate();
  const {
    filteredThreads,searchQuery,selectedCategory,selectedTags,sortBy,showCreateThread,
    currentUser,setSearchQuery,setCategoryFilter,setTagFilter,setSortBy,toggleCreateThread,
    resetFilters,voteThread,togglePin,toggleSolved,
  } = useForum();

  const [showFilters, setShowFilters] = useState(false);

  // Toggle tag selection
  const handleTagToggle = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setTagFilter(selectedTags.filter(t => t !== tagId));
    } else {
      setTagFilter([...selectedTags, tagId]);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days < 7) return `${days} hari yang lalu`;
    return date.toLocaleDateString('id-ID');
  };

  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-200',
    cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  if (showCreateThread) {
    return <CreateThread />;
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="bg-blue-600 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">💬 Forum Diskusi</h1>
            <p className="text-blue-100 text-lg">Bertanya, berbagi, dan belajar bersama</p>
          </div>
          <button
            onClick={toggleCreateThread}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Buat Thread Baru
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {forumCategories.map(category => (
          <div
            key={category.id}
            onClick={() => setCategoryFilter(category.id === selectedCategory ? null : category.id)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              selectedCategory === category.id
                ? `${colorClasses[category.color]} border-current shadow-md`
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{category.icon}</span>
              <span className="text-2xl font-bold">{category.threadCount}</span>
            </div>
            <h3 className="font-semibold text-gray-800">{category.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari thread diskusi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Terbaru</option>
            <option value="popular">Populer</option>
            <option value="mostReplies">Banyak Balasan</option>
            <option value="solved">Terpecahkan</option>
            <option value="unsolved">Belum Terpecahkan</option>
          </select>

          {/* Toggle Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>

          {/* Reset */}
          {(searchQuery || selectedCategory || selectedTags.length > 0) && (
            <button
              onClick={resetFilters}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {/* Tag Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter berdasarkan Tag:</h3>
            <div className="flex flex-wrap gap-2">
              {forumTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                    selectedTags.includes(tag.id)
                      ? `${colorClasses[tag.color]} border-current`
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Thread List */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500 text-lg">Tidak ada thread yang ditemukan</p>
            <p className="text-gray-400 mt-2">Coba ubah filter atau buat thread baru</p>
          </div>
        ) : (
          filteredThreads.map(thread => (
            <div
              key={thread.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* Vote Section */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => voteThread(thread.id, 'up')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-400 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <span className="text-lg font-bold text-gray-700">{thread.votes}</span>
                  <button
                    onClick={() => voteThread(thread.id, 'down')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-400 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-2">
                        {thread.isPinned && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-lg border border-yellow-200 flex items-center gap-1">
                            📌 Pinned
                          </span>
                        )}
                        {thread.isSolved && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg border border-green-200 flex items-center gap-1">
                            ✓ Terpecahkan
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => navigate(`/admin/forum/${thread.id}`)}
                        className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        {thread.title}
                      </h3>

                      {/* Content Preview */}
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {thread.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {thread.tags.map(tagId => {
                          const tag = forumTags.find(t => t.id === tagId);
                          return tag ? (
                            <span
                              key={tagId}
                              className={`px-3 py-1 text-xs font-medium rounded-lg border ${colorClasses[tag.color]}`}
                            >
                              #{tag.name}
                            </span>
                          ) : null;
                        })}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
                            {thread.author.avatar}
                          </div>
                          <span>{thread.author.name}</span>
                        </div>
                        <span>•</span>
                        <span>{formatDate(thread.createdAt)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {thread.views}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {thread.replies} balasan
                        </span>
                      </div>
                    </div>

                    {/* Actions (for admin/moderator) */}
                    {(currentUser.role === 'admin' || currentUser.role === 'dosen') && (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); togglePin(thread.id); }}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Pin thread"
                        >
                          <svg className={`w-5 h-5 ${thread.isPinned ? 'text-yellow-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleSolved(thread.id); }}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="Mark as solved"
                        >
                          <svg className={`w-5 h-5 ${thread.isSolved ? 'text-green-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mobile Create Button */}
      <button
        onClick={toggleCreateThread}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default Forum;
