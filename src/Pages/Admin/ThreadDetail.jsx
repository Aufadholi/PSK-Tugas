import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForum } from '@/Utils/Hooks/useForum';
import { forumTags } from '@/Utils/forumData';
import toast from 'react-hot-toast';

const ThreadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    threads,currentThread,currentUser,getTopReplies,getRepliesForReply,
    setCurrentThread,incrementViews,voteReply,createReply,setBestAnswer,
    markAsHelpful,toggleSolved,togglePin,
  } = useForum();

  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const viewsIncrementedRef = useRef(false);

  useEffect(() => {
    const threadId = parseInt(id);
    const thread = threads.find(t => t.id === threadId);
    
    if (thread && (!currentThread || currentThread.id !== threadId)) {
      setCurrentThread(thread);
      
      // Increment views only once per thread load
      if (!viewsIncrementedRef.current) {
        incrementViews(threadId);
        viewsIncrementedRef.current = true;
      }
    }

    // Cleanup on unmount
    return () => {
      setCurrentThread(null);
      viewsIncrementedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleReply = (parentReplyId = null) => {
    if (!replyContent.trim()) {
      toast.error('Balasan tidak boleh kosong!');
      return;
    }

    // Extract mentions from content
    const mentions = [];
    const mentionRegex = /@(\w+)/g;
    let match;
    while ((match = mentionRegex.exec(replyContent)) !== null) {
      mentions.push(match[1]);
    }

    createReply({
      threadId: parseInt(id),
      content: replyContent,
      parentReplyId,
      mentions,
    });

    setReplyContent('');
    setReplyingTo(null);
    toast.success('Balasan berhasil dikirim!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const colorClasses = {
    cyan: 'bg-cyan-100 text-cyan-700',
    blue: 'bg-blue-100 text-blue-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    pink: 'bg-pink-100 text-pink-700',
    orange: 'bg-orange-100 text-orange-700',
    purple: 'bg-purple-100 text-purple-700',
    gray: 'bg-gray-100 text-gray-700',
  };

  const ReplyComponent = ({ reply, level = 0 }) => {
    const nestedReplies = getRepliesForReply(reply.id);
    
    return (
      <div className={`${level > 0 ? 'ml-12 mt-4' : ''}`}>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex gap-4">
            {/* Vote */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => voteReply(reply.id, 'up')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-5 h-5 text-gray-400 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <span className="font-bold text-gray-700">{reply.votes}</span>
              <button
                onClick={() => voteReply(reply.id, 'down')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-5 h-5 text-gray-400 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Author & Badges */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                  {reply.author.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{reply.author.name}</span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${colorClasses[reply.author.badgeColor]}`}>
                      {reply.author.badge}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded border border-blue-200">
                      {reply.author.reputation} poin
                    </span>
                    {reply.isBestAnswer && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded border border-green-200">
                        ✓ Best Answer
                      </span>
                    )}
                    {reply.isHelpful && (
                      <span className="text-yellow-500 text-sm">⭐</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(reply.createdAt)}</span>
                </div>
              </div>

              {/* Reply Content */}
              <div className="prose max-w-none text-gray-700 mb-4">
                {reply.content.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 text-sm">
                <button
                  onClick={() => { setReplyingTo(reply); setReplyContent(`@${reply.author.name} `); }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Balas
                </button>
                <button
                  onClick={() => markAsHelpful(reply.id)}
                  className="text-gray-600 hover:text-yellow-600 font-medium"
                >
                  {reply.isHelpful ? '⭐ Helpful' : 'Tandai Helpful'}
                </button>
                {!currentThread?.isSolved && (currentUser.role === 'admin' || currentUser.role === 'dosen' || currentUser.id === currentThread?.author.id) && (
                  <button
                    onClick={() => { setBestAnswer(reply.id, currentThread.id); toast.success('Best answer set!'); }}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    ✓ Set Best Answer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nested Replies */}
        {nestedReplies.length > 0 && (
          <div className="mt-4">
            {nestedReplies.map(nestedReply => (
              <ReplyComponent key={nestedReply.id} reply={nestedReply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!currentThread) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center">
        <p className="text-gray-500">Loading thread...</p>
      </div>
    );
  }

  const topLevelReplies = getTopReplies(currentThread.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/forum')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Forum
      </button>

      {/* Thread */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          {currentThread.isPinned && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-lg border border-yellow-200">
              📌 Pinned
            </span>
          )}
          {currentThread.isSolved && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-lg border border-green-200">
              ✓ Terpecahkan
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentThread.title}</h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {currentThread.tags.map(tagId => {
            const tag = forumTags.find(t => t.id === tagId);
            return tag ? (
              <span key={tagId} className={`px-3 py-1 text-sm font-medium rounded-lg ${colorClasses[tag.color]}`}>
                #{tag.name}
              </span>
            ) : null;
          })}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold">
            {currentThread.author.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{currentThread.author.name}</span>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded ${colorClasses[currentThread.author.badgeColor]}`}>
                {currentThread.author.badge}
              </span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded border border-blue-200">
                {currentThread.author.reputation} poin
              </span>
            </div>
            <span className="text-sm text-gray-500">{formatDate(currentThread.createdAt)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-gray-700 mb-6 whitespace-pre-wrap">
          {currentThread.content}
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>{currentThread.views} views</span>
            <span>{currentThread.replies} replies</span>
            <span>{currentThread.votes} votes</span>
          </div>

          {(currentUser.role === 'admin' || currentUser.role === 'dosen') && (
            <div className="flex gap-2">
              <button
                onClick={() => togglePin(currentThread.id)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
              >
                {currentThread.isPinned ? 'Unpin' : 'Pin'}
              </button>
              <button
                onClick={() => toggleSolved(currentThread.id)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
              >
                {currentThread.isSolved ? 'Mark Unsolved' : 'Mark Solved'}
              </button>
              <button
                onClick={() => setShowReportModal(true)}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium"
              >
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{topLevelReplies.length} Balasan</h2>
        {topLevelReplies.map(reply => (
          <ReplyComponent key={reply.id} reply={reply} />
        ))}
      </div>

      {/* Reply Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {replyingTo ? `Balas ke @${replyingTo.author.name}` : 'Tulis Balasan'}
        </h3>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          rows={5}
          placeholder="Tulis balasan Anda..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={() => handleReply(replyingTo?.id)}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Kirim Balasan
          </button>
          {replyingTo && (
            <button
              onClick={() => { setReplyingTo(null); setReplyContent(''); }}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Laporkan Konten</h3>
            <p className="text-gray-600 mb-6">Laporan akan ditinjau oleh moderator.</p>
            <textarea
              rows={4}
              placeholder="Alasan pelaporan..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setShowReportModal(false); toast.success('Laporan terkirim!'); }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700"
              >
                Kirim Laporan
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadDetail;
