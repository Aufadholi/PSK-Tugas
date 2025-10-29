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
      if (
        selectedMahasiswa &&
        !window.confirm("Yakin ingin update data mahasiswa ini?")
      )
        return;
      onSubmit(form);
      onClose();
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-bold mb-2 text-blue-700">
          {selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
        </h3>
        <div>
          <label className="block font-medium text-gray-700 mb-1">NIM</label>
          <input
            type="text"
            name="nim"
            value={form.nim}
            onChange={handleChange}
            className={`border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 ${errors.nim ? "border-red-400" : "border-gray-300"}`}
            disabled={!!selectedMahasiswa}
            placeholder="Masukkan NIM"
            autoComplete="off"
          />
          {errors.nim && (
            <span className="text-red-500 text-xs mt-1">{errors.nim}</span>
          )}
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Nama</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className={`border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 ${errors.nama ? "border-red-400" : "border-gray-300"}`}
            placeholder="Masukkan Nama"
            autoComplete="off"
          />
          {errors.nama && (
            <span className="text-red-500 text-xs mt-1">{errors.nama}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            className="accent-blue-600 h-4 w-4"
          />
          <label className="text-gray-700">Aktif</label>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
          >
            {selectedMahasiswa ? "Update" : "Tambah"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MahasiswaModal;
