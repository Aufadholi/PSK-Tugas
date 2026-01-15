import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/Pages/Auth/Login";
import Dashboard from "@/Pages/Admin/Dashboard";
import Mahasiswa from "@/Pages/Admin/Mahasiswa";
import MahasiswaDetail from "@/Pages/Admin/MahasiswaDetail";
import Kelas from "@/Pages/Admin/Kelas";
import Quiz from "@/Pages/Admin/Quiz";
import Forum from "@/Pages/Admin/Forum";
import ThreadDetail from "@/Pages/Admin/ThreadDetail";
import Pencapaian from "@/Pages/Admin/Pencapaian";
import Instruktur from "@/Pages/Admin/Instruktur";
import AuthLayout from "@/Pages/Layouts/AuthLayout";
import AdminLayout from "@/Pages/Layouts/AdminLayout";
import ProtectedRoute from "@/Pages/Layouts/ProtectedRoutes";
import KelasDosen from "@/Pages/Dosen/KelasDosen";
import KelasMahasiswa from "@/Pages/Mahasiswa/KelasMahasiswa";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="mahasiswa" element={<Mahasiswa />} />
        <Route path="mahasiswa/:id" element={<MahasiswaDetail />} />
        <Route path="kelas" element={<Kelas />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="forum" element={<Forum />} />
        <Route path="forum/:id" element={<ThreadDetail />} />
        <Route path="pencapaian" element={<Pencapaian />} />
        <Route path="instruktur" element={<Instruktur />} />
      </Route>

      {/* Dosen Route */}
      <Route path="/dosen/kelas" element={
        <ProtectedRoute>
          <KelasDosen />
        </ProtectedRoute>
      } />
      {/* Mahasiswa Route */}
      <Route path="/mahasiswa/kelas" element={
        <ProtectedRoute>
          <KelasMahasiswa />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;