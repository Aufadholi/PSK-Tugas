import { useState } from "react";
import { useKelas } from "@/Utils/Hooks/useKelas";

const Kelas = () => {
  // State untuk form pengelolaan kelas
  const [selectedMatkul, setSelectedMatkul] = useState("");
  const [selectedDosen, setSelectedDosen] = useState("");
  const [selectedMhs, setSelectedMhs] = useState([]);
  const { matakuliahQuery, dosenQuery, mahasiswaQuery } = useKelas();

  // Helper untuk validasi SKS
  const getMatkulSKS = (id) => matakuliahQuery.data?.find((m) => m.id === Number(id))?.sks || 0;
  const getDosenMaxSKS = (id) => dosenQuery.data?.find((d) => d.id === Number(id))?.maxSks || 0;
  const getMhsMaxSKS = (id) => mahasiswaQuery.data?.find((m) => m.id === Number(id))?.maxSks || 0;
  const getMhsSKSDiambil = (id) => mahasiswaQuery.data?.find((m) => m.id === Number(id))?.sksDiambil || 0;

  // Validasi: 1 matkul hanya 1 dosen, dosen/mhs tidak boleh melebihi max SKS
  const matkulSKS = getMatkulSKS(selectedMatkul);
  const dosenMaxSKS = getDosenMaxSKS(selectedDosen);
  const dosenSKSBaru = matkulSKS; // Asumsi 1 kelas = 1 matkul
  const mhsSKSBaru = selectedMhs.map((id) => getMhsSKSDiambil(id) + matkulSKS);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-4">Pengelolaan Kelas</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Mata Kuliah</label>
            <select
              className="border px-3 py-2 rounded w-full"
              value={selectedMatkul}
              onChange={e => setSelectedMatkul(e.target.value)}
            >
              <option value="">Pilih Mata Kuliah</option>
              {matakuliahQuery.data?.map((m) => (
                <option key={m.id} value={m.id}>{m.nama} ({m.sks} SKS)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Dosen Pengampu</label>
            <select
              className="border px-3 py-2 rounded w-full"
              value={selectedDosen}
              onChange={e => setSelectedDosen(e.target.value)}
              disabled={!selectedMatkul}
            >
              <option value="">Pilih Dosen</option>
              {dosenQuery.data?.map((d) => (
                <option key={d.id} value={d.id} disabled={dosenSKSBaru > d.maxSks}>
                  {d.nama} (Max SKS: {d.maxSks})
                </option>
              ))}
            </select>
            {selectedDosen && dosenSKSBaru > dosenMaxSKS && (
              <p className="text-red-500 text-sm mt-1">Dosen melebihi maksimal SKS!</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Mahasiswa</label>
            <select
              className="border px-3 py-2 rounded w-full"
              multiple
              value={selectedMhs}
              onChange={e => setSelectedMhs(Array.from(e.target.selectedOptions, o => Number(o.value)))}
              disabled={!selectedMatkul}
              size={5}
            >
              {mahasiswaQuery.data?.map((m, idx) => (
                <option key={m.id} value={m.id} disabled={getMhsSKSDiambil(m.id) + matkulSKS > m.maxSks}>
                  {m.nama} (SKS diambil: {getMhsSKSDiambil(m.id)}/{m.maxSks})
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* Tabel Mahasiswa & SKS */}
      {selectedMhs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold mb-2">Mahasiswa dalam Kelas</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">NIM</th>
                <th className="px-4 py-2 text-left">SKS Diambil</th>
                <th className="px-4 py-2 text-left">Max SKS</th>
              </tr>
            </thead>
            <tbody>
              {selectedMhs.map((id) => {
                const m = mahasiswaQuery.data?.find((x) => x.id === id);
                return m ? (
                  <tr key={m.id}>
                    <td className="px-4 py-2">{m.nama}</td>
                    <td className="px-4 py-2">{m.nim}</td>
                    <td className="px-4 py-2">{getMhsSKSDiambil(m.id) + matkulSKS}</td>
                    <td className="px-4 py-2">{m.maxSks}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Kelas;
