
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMahasiswa = async () => {
      try {
        // Pastikan id dikonversi ke number
        const res = await getMahasiswa(Number(id));
        setMahasiswa(res.data);
      } catch {
        toastError("Data tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };
    fetchMahasiswa();
  }, [id]);

  if (loading) {
    return <p className="text-center">Memuat data...</p>;
  }

  if (!mahasiswa) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6">Mahasiswa dengan ID {id} tidak ditemukan dalam database.</p>
            <button
              onClick={() => navigate("/admin/mahasiswa")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors"
            >
              Kembali ke Daftar Mahasiswa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/mahasiswa")}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </button>

      {/* Profile Card */}
      <div className="bg-blue-600 rounded-lg shadow p-8 text-white">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {mahasiswa.nama.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{mahasiswa.nama}</h1>
            <div className="flex items-center gap-2 text-blue-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span className="font-mono">{mahasiswa.nim}</span>
            </div>
          </div>
          <div>
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${
              mahasiswa.status 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              <span className={`w-2 h-2 rounded-full ${mahasiswa.status ? "bg-green-600" : "bg-red-600"}`}></span>
              {mahasiswa.status ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
        </div>
      </div>

      {/* Detail Information */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-8 py-4 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">Informasi Detail</h2>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Nomor Induk Mahasiswa</p>
                <p className="text-lg font-semibold text-gray-800 font-mono">{mahasiswa.nim}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Nama Lengkap</p>
                <p className="text-lg font-semibold text-gray-800">{mahasiswa.nama}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${mahasiswa.status ? "bg-green-50" : "bg-red-50"}`}>
                <svg className={`w-6 h-6 ${mahasiswa.status ? "text-green-600" : "text-red-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Status Mahasiswa</p>
                <p className={`text-lg font-semibold ${mahasiswa.status ? "text-green-600" : "text-red-600"}`}>
                  {mahasiswa.status ? "Aktif" : "Tidak Aktif"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-1">Kelola Data</h3>
            <p className="text-sm text-gray-600">Edit atau hapus data mahasiswa</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-medium px-5 py-2.5 rounded-md border border-yellow-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Data
            </button>
            <button className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-5 py-2.5 rounded-md border border-red-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Hapus Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MahasiswaDetail;