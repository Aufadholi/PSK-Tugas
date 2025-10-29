
import React from "react";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import { mahasiswaList } from "@/Data/Dummy";

const MahasiswaDetail = () => {
  const path = window.location.pathname;
  const nim = path.split("/").pop();
  const mahasiswa = mahasiswaList.find((m) => m.nim === nim);

  if (!mahasiswa) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <span className="text-5xl mb-2">❌</span>
        <p className="text-red-500 font-semibold text-lg">Data mahasiswa tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl text-blue-400 border border-blue-200">
          <span role="img" aria-label="avatar">👤</span>
        </div>
        <div>
          <Heading as="h2" className="mb-1 text-left text-blue-700 text-2xl font-bold">{mahasiswa.nama}</Heading>
          <div className="text-gray-500 text-sm">NIM: {mahasiswa.nim}</div>
        </div>
      </div>
      <table className="table-auto text-sm w-full border border-gray-100 rounded-xl overflow-hidden mb-2">
        <tbody>
          <tr className="bg-gray-50">
            <td className="py-2 px-4 font-medium text-gray-600 w-1/3">NIM</td>
            <td className="py-2 px-4 text-gray-700">{mahasiswa.nim}</td>
          </tr>
          <tr className="bg-white">
            <td className="py-2 px-4 font-medium text-gray-600">Nama</td>
            <td className="py-2 px-4 text-gray-700">{mahasiswa.nama}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-6 flex gap-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm font-semibold">Edit</button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow text-sm font-semibold">Hapus</button>
      </div>
    </Card>
  );
};

export default MahasiswaDetail;