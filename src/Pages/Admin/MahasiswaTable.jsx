import React from "react";

const MahasiswaTable = ({ mahasiswa, openEditModal, onDelete, onDetail }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100 bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-blue-300">
            <th className="py-3 px-4 text-left font-semibold text-gray-700">NIM</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Nama</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
            <th className="py-3 px-4 text-center font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-400">Tidak ada data mahasiswa.</td>
            </tr>
          ) : (
            mahasiswa.map((mhs) => (
              <tr key={mhs.nim} className="border-b last:border-none hover:bg-gray-50">
                <td className="py-2 px-4 font-mono">{mhs.nim}</td>
                <td className="py-2 px-4">{mhs.nama}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${mhs.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {mhs.status ? "Aktif" : "Tidak Aktif"}
                  </span>
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow"
                    onClick={() => onDetail(mhs.nim)}
                  >
                    Detail
                  </button>
                  <button
                    className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold shadow"
                    onClick={() => openEditModal(mhs.nim)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow"
                    onClick={() => onDelete(mhs.nim)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MahasiswaTable;
