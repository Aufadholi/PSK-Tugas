import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/Pages/Auth/Login";
import Dashboard from "@/Pages/Admin/Dashboard";
import Mahasiswa from "@/Pages/Admin/Mahasiswa";
import MahasiswaDetail from "@/Pages/Admin/MahasiswaDetail";
import Kelas from "@/Pages/Admin/Kelas";
import AuthLayout from "@/Pages/Layouts/AuthLayout";
import AdminLayout from "@/Pages/Layouts/AdminLayout";
import ProtectedRoute from "@/Pages/Layouts/ProtectedRoutes";

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
        <Route path="mahasiswa/:nim" element={<MahasiswaDetail />} />
        <Route path="kelas" element={<Kelas />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;