
import React, { useState } from "react";
import Sidebar from "@/Pages/Layouts/Components/Sidebar";
import Header from "@/Pages/Layouts/Components/Header";
import Footer from "@/Pages/Layouts/Components/Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1">
        <Header onHamburgerClick={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 p-6 overflow-x-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;