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
  const getMhsSKSDiambil = (id) => mahasiswaQuery.data?.find((m) => m.id === Number(id))?.sksDiambil || 0;

  // Validasi: 1 matkul hanya 1 dosen, dosen/mhs tidak boleh melebihi max SKS
  const matkulSKS = getMatkulSKS(selectedMatkul);
  const dosenMaxSKS = getDosenMaxSKS(selectedDosen);
  const dosenSKSBaru = matkulSKS; // Asumsi 1 kelas = 1 matkul

  // Dummy modul
  const modulList = [
    { id: 1, judul: "Pengenalan React" },
    { id: 2, judul: "State & Props" },
    { id: 3, judul: "React Router DOM" },
  ];
  // State progres: { [mahasiswaId]: jumlahSelesai }
  const [progres, setProgres] = useState({});

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">Pengelolaan Kelas</h2>
        <form className="space-y-3">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Mata Kuliah</label>
            <select
              className="border px-3 py-2 rounded w-full focus:ring focus:ring-indigo-200"
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
            <label className="block font-medium mb-1 text-gray-700">Dosen Pengampu</label>
            <select
              className="border px-3 py-2 rounded w-full focus:ring focus:ring-indigo-200"
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
              <p className="text-red-500 text-xs mt-1">Dosen melebihi maksimal SKS!</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Mahasiswa</label>
            <select
              className="border px-3 py-2 rounded w-full focus:ring focus:ring-indigo-200"
              multiple
              value={selectedMhs}
              onChange={e => setSelectedMhs(Array.from(e.target.selectedOptions, o => Number(o.value)))}
              disabled={!selectedMatkul}
              size={4}
            >
              {mahasiswaQuery.data?.map((m) => (
                <option key={m.id} value={m.id} disabled={getMhsSKSDiambil(m.id) + matkulSKS > m.maxSks}>
                  {m.nama} (SKS diambil: {getMhsSKSDiambil(m.id)}/{m.maxSks})
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {selectedMhs.length > 0 && (
        <div className="bg-white rounded-xl shadow border border-gray-100 p-4 mt-4">
          <h3 className="font-bold mb-2 text-indigo-700">Mahasiswa dalam Kelas</h3>
          <table className="min-w-full text-sm border">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-3 py-2 text-left">Nama</th>
                <th className="px-3 py-2 text-left">NIM</th>
                <th className="px-3 py-2 text-left">SKS Diambil</th>
                <th className="px-3 py-2 text-left">Max SKS</th>
                <th className="px-3 py-2 text-left">Progress</th>
              </tr>
            </thead>
            <tbody>
              {selectedMhs.map((id) => {
                const m = mahasiswaQuery.data?.find((x) => x.id === id);
                const selesai = progres[id] || 0;
                const tambahSelesai = () => setProgres(prev => ({ ...prev, [id]: Math.min((prev[id] || 0) + 1, modulList.length) }));
                return m ? (
                  <tr key={m.id} className="border-b">
                    <td className="px-3 py-2">{m.nama}</td>
                    <td className="px-3 py-2">{m.nim}</td>
                    <td className="px-3 py-2">{getMhsSKSDiambil(m.id) + matkulSKS}</td>
                    <td className="px-3 py-2">{m.maxSks}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span>{selesai} / {modulList.length}</span>
                        <button className="ml-2 px-2 py-1 bg-indigo-500 text-white rounded text-xs" onClick={tambahSelesai} disabled={selesai >= modulList.length}>
                          + Modul
                        </button>
                        <div className="w-24 bg-gray-200 rounded h-2">
                          <div className="bg-indigo-500 h-2 rounded" style={{ width: `${(selesai / modulList.length) * 100}%` }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Sisa: {modulList.length - selesai} modul</div>
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
          <div className="font-medium mt-4 mb-1 text-gray-700">Daftar Modul:</div>
          <ol className="list-decimal ml-6 text-sm text-gray-700">
            {modulList.map((modul) => (
              <li key={modul.id} className="mb-1">{modul.judul}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Kelas;
