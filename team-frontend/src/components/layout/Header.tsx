import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";

export const Header = () => {
  const { logout }: any = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="w-full bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-[50px]">
        {/* Logo */}
        <h1
          className="font-bold text-lg cursor-pointer"
          onClick={() => {
            if (location.pathname === "/") navigate("/login");
            if (location.pathname === "/dashboard") navigate("/dashboard");
          }}
        >
          Lumin
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {location.pathname === "/dashboard" ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
              onClick={() => logout()}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden flex flex-col gap-2 px-4 pb-2 bg-gray-700">
          {location.pathname === "/dashboard" ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
              onClick={() => {
                logout();
                setMobileMenu(false);
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                onClick={() => {
                  navigate("/login");
                  setMobileMenu(false);
                }}
              >
                Login
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                onClick={() => {
                  navigate("/register");
                  setMobileMenu(false);
                }}
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
