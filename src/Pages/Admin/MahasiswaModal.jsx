import React, { useState, useEffect } from "react";
import Modal from "@/Pages/Layouts/Components/Modal";

const initialForm = { nim: "", nama: "", status: true };

const MahasiswaModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMahasiswa,
  mahasiswa,
}) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedMahasiswa) {
      setForm(selectedMahasiswa);
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [selectedMahasiswa, isModalOpen]);

  if (!isModalOpen) return null;

  const validate = () => {
    let err = {};
    if (!form.nim) err.nim = "NIM wajib diisi";
    if (!form.nama) err.nama = "Nama wajib diisi";
    if (
      !selectedMahasiswa &&
      mahasiswa.some((m) => m.nim === form.nim)
    )
      err.nim = "NIM sudah terdaftar";
    return err;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-slideUp">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              NIM
            </label>
            <input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.nim ? "border-red-400 bg-red-50" : "border-gray-200"
              } ${selectedMahasiswa ? "bg-gray-50 cursor-not-allowed" : ""}`}
              disabled={!!selectedMahasiswa}
              placeholder="Contoh: 2024001"
              autoComplete="off"
            />
            {errors.nim && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.nim}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.nama ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
              placeholder="Masukkan nama lengkap"
              autoComplete="off"
            />
            {errors.nama && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.nama}
              </p>
            )}
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="status"
                  checked={form.status}
                  onChange={handleChange}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
                  Status Aktif
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Mahasiswa dapat mengakses sistem
                </p>
              </div>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {selectedMahasiswa ? "Perbarui" : "Tambahkan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MahasiswaModal;
