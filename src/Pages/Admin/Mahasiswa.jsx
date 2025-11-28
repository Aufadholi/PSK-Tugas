import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import { confirmDelete } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { useMahasiswa } from "@/Utils/Hooks/useMahasiswa";

const Mahasiswa = () => {
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    mahasiswa,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
  } = useMahasiswa();

  // Tambah mahasiswa baru
  const handleStoreMahasiswa = async (data) => {
    createMahasiswa.mutate(data, {
      onSuccess: () => toastSuccess("Data berhasil ditambahkan"),
      onError: () => toastError("Gagal menambah data"),
    });
  };

  // Update mahasiswa
  const handleUpdateMahasiswa = async (data) => {
    updateMahasiswa.mutate({ id: data.id, ...data }, {
      onSuccess: () => toastSuccess("Data berhasil diperbarui"),
      onError: () => toastError("Gagal update data"),
    });
  };

  // Delete mahasiswa
  const handleDeleteMahasiswa = async (id) => {
    confirmDelete(() => {
      deleteMahasiswa.mutate(id, {
        onSuccess: () => toastSuccess("Data berhasil dihapus"),
        onError: () => toastError("Gagal menghapus data"),
      });
    });
  };

  // Modal tambah
  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  // Modal edit
  const openEditModal = (id) => {
    const mhs = mahasiswa?.find((m) => m.id === id);
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  // Submit modal
  const handleSubmit = (form) => {
    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }
    if (selectedMahasiswa) {
      handleUpdateMahasiswa(form);
      setModalOpen(false);
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }
      handleStoreMahasiswa(form);
      setModalOpen(false);
    }
  };

  // Hapus data
  const handleDelete = (id) => {
    handleDeleteMahasiswa(id);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Data Mahasiswa</h2>
              <p className="text-gray-600 mt-1">Kelola data mahasiswa dengan mudah</p>
            </div>
          </div>
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            onClick={openAddModal}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Mahasiswa
          </button>
        </div>
      </div>

      <MahasiswaTable
        mahasiswa={mahasiswa}
        openEditModal={openEditModal}
        onDelete={handleDelete}
        onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
      />
      
      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
        mahasiswa={mahasiswa}
      />
    </div>
  );
};

export default Mahasiswa;