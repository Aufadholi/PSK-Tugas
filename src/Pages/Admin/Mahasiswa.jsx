import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mahasiswaList as initialList } from "@/Data/Dummy";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState(initialList);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Tambah mahasiswa baru
  const storeMahasiswa = (data) => {
    setMahasiswa([...mahasiswa, data]);
  };

  // Update mahasiswa
  const updateMahasiswa = (data) => {
    setMahasiswa(
      mahasiswa.map((mhs) =>
        mhs.nim === data.nim ? { ...mhs, ...data } : mhs
      )
    );
  };

  // Delete mahasiswa
  const deleteMahasiswa = (nim) => {
    setMahasiswa(mahasiswa.filter((mhs) => mhs.nim !== nim));
  };

  // Modal tambah
  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  // Modal edit
  const openEditModal = (nim) => {
    const mhs = mahasiswa.find((m) => m.nim === nim);
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  // Hapus data
  const handleDelete = (nim) => {
    confirmDelete(() => {
      deleteMahasiswa(nim);
      toastSuccess("Data berhasil dihapus");
    });
  };

  // Submit modal
  const handleSubmit = (form) => {
    const err = {};
    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }
    if (selectedMahasiswa) {
      confirmUpdate(() => {
        updateMahasiswa(form);
        toastSuccess("Data berhasil diperbarui");
        setModalOpen(false);
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }
      storeMahasiswa(form);
      toastSuccess("Data berhasil ditambahkan");
      setModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Data Mahasiswa</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={openAddModal}
        >
          + Tambah Mahasiswa
        </button>
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