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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {
    result = { data: [], total: 0 },
    isLoadingMahasiswa,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
  } = useMahasiswa({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: perPage,
  });

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
    const mhs = result.data?.find((m) => m.id === id);
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
      const exists = result.data.find((m) => m.nim === form.nim);
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

  // Pagination & sort
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / perPage);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

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

      {/* Search, Sort, Limit */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Cari nama/NIM..."
          className="border px-3 py-1 rounded flex-grow"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="name">Sort by Nama</option>
          <option value="nim">Sort by NIM</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>{num} / halaman</option>
          ))}
        </select>
      </div>

      <MahasiswaTable
        mahasiswa={result.data}
        openEditModal={openEditModal}
        onDelete={handleDelete}
        onDetail={(id) => navigate(`/admin/mahasiswa/${Number(id)}`)}
        isLoading={isLoadingMahasiswa}
      />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">Halaman {page} dari {totalPages}</p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
        mahasiswa={result.data}
      />
    </div>
  );
};

export default Mahasiswa;