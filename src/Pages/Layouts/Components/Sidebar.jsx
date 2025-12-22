import { NavLink } from "react-router-dom";
import React from "react";

const Sidebar = ({ isOpen, onClose }) => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}
  const role = user?.role;

  return (
    <aside
      className={`h-screen w-64 flex flex-col z-40 bg-white border-r border-gray-200
        fixed top-0 left-0 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0`}
    >
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <button
          className="text-gray-400 hover:text-gray-600 text-2xl px-2 md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ×
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-gray-800">
            Sistem Akademik
          </span>
        </div>
      </div>
      <nav className="py-6 px-4 space-y-1 flex-1">
        {role === "admin" && (
          <>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md font-medium text-sm transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/admin/kelas"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md font-medium text-sm transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Kelas</span>
            </NavLink>
            <NavLink
              to="/admin/mahasiswa"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md font-medium text-sm transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Mahasiswa</span>
            </NavLink>
          </>
        )}
        {role === "dosen" && (
          <>
            <NavLink
              to="/dosen/kelas"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md font-medium text-sm transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Kelas Dosen</span>
            </NavLink>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-md font-medium text-sm text-red-600 hover:bg-red-50 w-full mt-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
              </svg>
              <span>Logout</span>
            </button>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;