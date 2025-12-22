import React, { useState, useEffect } from "react";
import Modal from "@/Pages/Layouts/Components/Modal";

const initialForm = { nim: "", nama: "", maxSks: 24, sksDiambil: 0, status: true };

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md p-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIM
            </label>
            <input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.nim ? "border-red-400 bg-red-50" : "border-gray-300"
              } ${selectedMahasiswa ? "bg-gray-50 cursor-not-allowed" : ""}`}
              disabled={!!selectedMahasiswa}
              placeholder="Contoh: A11.2020.00001"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.nama ? "border-red-400 bg-red-50" : "border-gray-300"
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
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="status"
                checked={form.status}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">
                Status Aktif
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 border border-gray-300 rounded-md transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
            >
              {selectedMahasiswa ? "Perbarui" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MahasiswaModal;
