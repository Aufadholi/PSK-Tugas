import Button from "@/Pages/Layouts/Components/Button";
import { confirmLogout } from "@/Utils/Helpers/SwalHelpers";

const Header = () => {
  const toggleProfileMenu = () => {
    const menu = document.getElementById("profileMenu");
    if (menu) menu.classList.toggle("hidden");
  };

  return (
    <header className="border-b border-gray-200 sticky top-0 z-20 bg-white flex items-center" style={{ height: "64px" }}>
      <div className="flex-1 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <span className="text-gray-700 text-lg font-semibold">Mahasiswa</span>
        </div>
        <div className="relative flex items-center gap-4">
          <span className="text-green-500 text-lg">●</span>
          <span className="text-red-500 text-lg">●</span>
          <span className="text-purple-500 text-lg">●</span>
          <Button
            onClick={toggleProfileMenu}
            variant="secondary"
            className="w-10 h-10 flex items-center justify-center text-xl border-none shadow-none bg-gray-200 text-gray-700"
          >
            <span role="img" aria-label="profile">👤</span>
          </Button>
          <div
            id="profileMenu"
            className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 hidden z-10 border border-gray-200"
          >
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</a>
            <button
              onClick={() => {
                confirmLogout(() => {
                  localStorage.removeItem("user");
                  location.href = "/login";
                });
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;