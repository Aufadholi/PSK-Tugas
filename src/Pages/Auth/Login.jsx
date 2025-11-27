

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
        window.location.href = "/admin/dashboard";
      }, 1000);
    } catch (err) {
      toastError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Belajar Pintar</h2>
          <p className="text-gray-500">Platform Pembelajaran Digital</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input 
                type="email" 
                name="email" 
                placeholder="nama@universitas.ac.id" 
                className="mt-1"
                required 
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <Input 
                type="password" 
                name="password" 
                placeholder="Masukkan password" 
                className="mt-1"
                required 
              />
            </div>
            <div className="flex justify-between items-center pt-2">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
              </label>
              <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Lupa password?
              </Link>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Masuk
            </Button>
          </div>
        </Form>
        
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