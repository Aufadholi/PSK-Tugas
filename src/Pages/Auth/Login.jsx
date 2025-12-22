

import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import { login } from "@/Utils/Apis/AuthApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

const Login = () => {
  const { setUser } = useAuthStateContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const user = await login(email, password);
      setUser(user);
      toastSuccess("Login berhasil!");
      setTimeout(() => {
        if (user.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else if (user.role === "mahasiswa") {
          window.location.href = "/mahasiswa/kelas";
        } else if (user.role === "dosen") {
          window.location.href = "/dosen/kelas";
        } else {
          window.location.href = "/";
        }
      }, 1000);
    } catch (err) {
      toastError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-600 rounded-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sistem Akademik</h2>
          <p className="text-gray-600">Silakan login untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="nama@universitas.ac.id" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Masukkan password" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required 
              />
            </div>
            <div className="flex justify-between items-center pt-2">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
              </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Lupa password?
                  </a>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition-colors"
            >
              Masuk
            </button>
          </div>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Demo: <span className="font-semibold text-gray-700">admin@mail.com</span> / <span className="font-semibold text-gray-700">123456</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;