import React from "react";

const MahasiswaTable = ({ mahasiswa, openEditModal, onDelete, onDetail }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NIM</th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Mahasiswa</th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mahasiswa.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500 font-medium">Belum ada data mahasiswa</p>
                    <p className="text-gray-400 text-sm mt-1">Klik tombol "Tambah Mahasiswa" untuk menambahkan data</p>
                  </div>
                </td>
              </tr>
            ) : (
              mahasiswa.map((mhs) => (
                <tr key={mhs.nim} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm font-semibold text-gray-700">{mhs.nim}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {mhs.nama.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">{mhs.nama}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      mhs.status 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${mhs.status ? "bg-green-500" : "bg-red-500"}`}></span>
                      {mhs.status ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="group relative px-3 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium text-sm transition-all duration-200"
                        onClick={() => onDetail(mhs.nim)}
                        title="Lihat Detail"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        className="group relative px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 font-medium text-sm transition-all duration-200"
                        onClick={() => openEditModal(mhs.nim)}
                        title="Edit Data"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        className="group relative px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm transition-all duration-200"
                        onClick={() => onDelete(mhs.nim)}
                        title="Hapus Data"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {mahasiswa.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Menampilkan <span className="font-semibold text-gray-800">{mahasiswa.length}</span> data mahasiswa
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Total: </span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold">
                {mahasiswa.length} Mahasiswa
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MahasiswaTable;