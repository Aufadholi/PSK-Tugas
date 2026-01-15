import { useState } from 'react';
import { useForum } from '@/Utils/Hooks/useForum';
import { forumCategories, forumTags } from '@/Utils/forumData';
import { modules } from '@/Utils/dummyData';
import toast from 'react-hot-toast';

const CreateThread = () => {
  const { toggleCreateThread, createThread } = useForum();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: 1,
    tags: [],
    moduleId: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Judul tidak boleh kosong!');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('Konten tidak boleh kosong!');
      return;
    }
    
    if (formData.tags.length === 0) {
      toast.error('Pilih minimal 1 tag!');
      return;
    }

    createThread(formData);
    toast.success('Thread berhasil dibuat!');
    toggleCreateThread();
  };

  const toggleTag = (tagId) => {
    if (formData.tags.includes(tagId)) {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter(t => t !== tagId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagId]
      }));
    }
  };

  const availableTags = forumTags.filter(tag => tag.category === formData.categoryId);

  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    purple: 'bg-purple-100 text-purple-700 border-purple-300',
    blue: 'bg-blue-100 text-blue-700 border-blue-300',
    green: 'bg-green-100 text-green-700 border-green-300',
    red: 'bg-red-100 text-red-700 border-red-300',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    pink: 'bg-pink-100 text-pink-700 border-pink-300',
    cyan: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    orange: 'bg-orange-100 text-orange-700 border-orange-300',
    gray: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Buat Thread Baru</h1>
        <button
          onClick={toggleCreateThread}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
        >
          ✕ Batal
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Judul Thread <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Tulis judul yang jelas dan deskriptif..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              categoryId: parseInt(e.target.value),
              tags: [] // Reset tags when category changes
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {forumCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-500 mb-3">Pilih minimal 1 tag yang relevan</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                  formData.tags.includes(tag.id)
                    ? `${colorClasses[tag.color]} border-current`
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                #{tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Konten <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={10}
            placeholder="Jelaskan pertanyaan atau topik diskusi Anda dengan detail..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-sm text-gray-500 mt-2">
            Tips: Gunakan @username untuk mention user, ``` untuk code block
          </p>
        </div>

        {/* Module Reference (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Module Terkait (Opsional)
          </label>
          <select
            value={formData.moduleId || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              moduleId: e.target.value ? parseInt(e.target.value) : null 
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tidak terkait module tertentu</option>
            {modules && modules.map(module => (
              <option key={module.id} value={module.id}>
                {module.title}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Posting Thread
          </button>
          <button
            type="button"
            onClick={toggleCreateThread}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
        </div>
      </form>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Tips membuat thread yang baik:
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Gunakan judul yang spesifik dan deskriptif</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Jelaskan masalah atau topik dengan detail yang cukup</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Sertakan contoh code jika membahas programming</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Pilih kategori dan tag yang tepat</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Gunakan bahasa yang sopan dan profesional</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreateThread;
