import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LogoLumin } from "../reusable/logoLumin";

export const Header = () => {
  const { logout }: any = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-[64px]">
        
        {/* Logo Section */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => {
            if (location.pathname === "/") navigate("/login");
            if (location.pathname === "/dashboard") navigate("/dashboard");
          }}
        >
          <LogoLumin/>
          <h1 className="font-bold text-xl tracking-tight text-gray-900">Lumin</h1>
        </div>

        {/* Desktop Menu - Logic Unchanged */}
        <div className="hidden md:flex items-center gap-3">
          {location.pathname === "/dashboard" ? (
            <button
              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-5 rounded-xl transition-all active:scale-95 border border-red-100"
              onClick={() => logout()}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="text-gray-600 hover:text-blue-600 font-semibold py-2 px-4 transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-md shadow-blue-100 active:scale-95"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Logic Unchanged */}
      {mobileMenu && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-6 pt-2 bg-white border-b border-gray-100 animate-fadeIn">
          {location.pathname === "/dashboard" ? (
            <button
              className="w-full bg-red-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-100"
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
                className="w-full bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition"
                onClick={() => {
                  navigate("/login");
                  setMobileMenu(false);
                }}
              >
                Login
              </button>
              <button
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-100"
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