import { NavLink } from "react-router-dom";
import React from "react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`h-screen w-64 flex flex-col border-r border-gray-200 z-40 bg-[#2952a3] text-white
        fixed top-0 left-0 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0`}
    >
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {/* Hamburger only on mobile */}
        <button
          className="text-white text-2xl px-2 md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          &times;
        </button>
        <span className="text-2xl font-bold tracking-wide">Admin</span>
      </div>
      <nav className="py-6 px-4 space-y-2 flex-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 font-medium text-base transition duration-200 ${isActive ? '' : 'hover:bg-blue-600 hover:rounded-2xl'}`
          }
          style={({ isActive }) => isActive ? { background: "#2952a3", color: "#fff" } : { color: "#fff" }}
        >
          <span style={{ color: "#fff" }}>🏠</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/mahasiswa"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 font-medium text-base transition duration-200 ${isActive ? '' : 'hover:bg-blue-600 hover:rounded-2xl'}`
          }
          style={({ isActive }) => isActive ? { background: "#2952a3", color: "#fff" } : { color: "#fff" }}
        >
          <span style={{ color: "#fff" }}>🎓</span>
          <span>Mahasiswa</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;