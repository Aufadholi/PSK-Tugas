import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import { useKelas } from "@/Utils/Hooks/useKelas";
import Sidebar from "@/Pages/Layouts/Components/Sidebar";
import { useState } from "react";

const KelasMahasiswa = () => {
	const { user } = useAuthStateContext();
	const { kelasQuery, matakuliahQuery, dosenQuery } = useKelas();
	const kelasSaya = kelasQuery.data?.data?.filter(k => k.mahasiswaIds?.includes(user?.mahasiswaId)) || [];
	// Dummy modul
	const modulList = [
		{ id: 1, judul: "Pengenalan React" },
		{ id: 2, judul: "State & Props" },
		{ id: 3, judul: "React Router DOM" },
	];
	// State progres: { [kelasId]: jumlahSelesai }
	const [progres, setProgres] = useState({});

	return (
		<div className="min-h-screen bg-gray-50 flex">
			<Sidebar isOpen={true} onClose={() => {}} />
			<div className="flex-1 p-8">
				<div className="max-w-3xl mx-auto">
					<div className="mb-6">
						<h1 className="text-2xl font-bold mb-2 text-gray-800">Selamat Datang, {user?.name}</h1>
						<p className="text-gray-600">Berikut adalah daftar kelas yang Anda ikuti dan progress belajar Anda.</p>
					</div>
					<div className="bg-white rounded-lg shadow border border-gray-200 p-6">
						<h2 className="text-xl font-bold mb-4">Kelas yang Diikuti</h2>
						{kelasSaya.length === 0 ? (
							<div className="text-gray-500">Anda belum terdaftar di kelas manapun.</div>
						) : (
							kelasSaya.map((kelas) => {
								const matkul = matakuliahQuery.data?.find((m) => m.id === kelas.mataKuliahId);
								const dosen = dosenQuery.data?.find((d) => d.id === kelas.dosenId);
								const selesai = progres[kelas.id] || 0;
								const tambahSelesai = () => setProgres(prev => ({ ...prev, [kelas.id]: Math.min((prev[kelas.id] || 0) + 1, modulList.length) }));
								return (
									<div key={kelas.id} className="mb-8 border-b pb-6">
										<div className="font-semibold text-lg mb-2">{kelas.nama} ({matkul ? matkul.nama : '-'}) - {kelas.tahun}</div>
										<div className="text-gray-500 mb-2">Dosen: {dosen ? dosen.nama : '-'}</div>
										<div className="flex items-center gap-2 mb-2">
											<span>Progress: {selesai} / {modulList.length} modul</span>
											<button className="ml-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors" onClick={tambahSelesai} disabled={selesai >= modulList.length}>
												+ Modul Selesai
											</button>
											<div className="w-32 bg-gray-200 rounded-full h-2">
												<div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(selesai / modulList.length) * 100}%` }}></div>
											</div>
										</div>
										<div className="text-xs text-gray-500 mb-2">Sisa: {modulList.length - selesai} modul</div>
										<div className="font-medium mb-1">Daftar Modul:</div>
										<ol className="list-decimal ml-6 text-sm text-gray-700">
											{modulList.map((modul) => (
												<li key={modul.id} className="mb-1">{modul.judul}</li>
											))}
										</ol>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default KelasMahasiswa;
