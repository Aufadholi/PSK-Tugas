import { useState, useEffect } from "react";
import { modulList } from "@/Data/Dummy";
import TanyaDosenModal from "./TanyaDosenModal";
import { showToast } from "@/Utils/Helpers/ToastHelpers";

const Kelas = () => {
  const [modules, setModules] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModul, setSelectedModul] = useState(null);

  useEffect(() => {
    const savedModules = localStorage.getItem("modules");
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    } else {
      setModules(modulList);
    }
  }, []);

  const updateProgress = () => {
    const completedCount = modules.filter((m) => m.selesai).length;
    const progress = Math.round((completedCount / modules.length) * 100);
    localStorage.setItem("learningProgress", JSON.stringify(progress));
  };

  useEffect(() => {
    if (modules.length > 0) {
      localStorage.setItem("modules", JSON.stringify(modules));
      updateProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules]);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const handleTandaiSelesai = (id) => {
    const modul = modules.find((m) => m.id === id);
    setModules(
      modules.map((modul) =>
        modul.id === id ? { ...modul, selesai: !modul.selesai } : modul
      )
    );
    
    if (!modul.selesai) {
      showToast("Modul berhasil ditandai selesai!", "success");
    } else {
      showToast("Modul dibatalkan dari selesai", "info");
    }
  };

  const handleTanyaDosen = (modul) => {
    setSelectedModul(modul);
    setIsModalOpen(true);
  };

  const completedCount = modules.filter((m) => m.selesai).length;
  const progress = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Modul Pembelajaran</h1>
            <p className="text-gray-600 mt-1">Kelola dan pantau progress belajar Anda</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Progress Keseluruhan</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {completedCount} dari {modules.length} modul
              </span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold">
                {progress}%
              </span>
            </div>
          </div>
          <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((modul, index) => (
          <div
            key={modul.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <button
              onClick={() => toggleAccordion(modul.id)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                  modul.selesai 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {modul.selesai ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {modul.judul}
                  </h3>
                  <p className="text-sm text-gray-600">{modul.deskripsi}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {modul.selesai && (
                  <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-semibold">
                    Selesai
                  </span>
                )}
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    activeAccordion === modul.id ? 'transform rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {activeAccordion === modul.id && (
              <div className="px-6 py-5 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Deskripsi Modul</h4>
                  <p className="text-gray-600 leading-relaxed">{modul.deskripsi}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleTandaiSelesai(modul.id)}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                      modul.selesai
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {modul.selesai ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        )}
                      </svg>
                      {modul.selesai ? "Batalkan Selesai" : "Tandai Selesai"}
                    </div>
                  </button>
                  <button
                    onClick={() => handleTanyaDosen(modul)}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Tanya Dosen
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <TanyaDosenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modulJudul={selectedModul?.judul}
      />
    </div>
  );
};

export default Kelas;
