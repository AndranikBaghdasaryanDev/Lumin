import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LogoLumin } from "../reusable/logoLumin";

export const Header = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="w-full bg-white/90 backdrop-blur-lg border-b border-gray-100/80 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-[72px]">
        
        {/* Logo Section */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            navigate(isAuthenticated ? "/dashboard" : "/login");
          }}
        >
          <LogoLumin/>
          <h1 className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">Lumin</h1>
        </div>

        {/* Desktop Menu - Logic Unchanged */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            null
          ) : (
            <>
              <button
                className="text-gray-600 hover:text-blue-600 font-medium py-2.5 px-5 rounded-xl transition-all duration-200 hover:bg-gray-50/50"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-7 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-200/60 active:scale-95"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button - No logout in header */}
        <div className="md:hidden">
          <button
            className="text-gray-600 p-2.5 rounded-xl hover:bg-gray-50/80 transition-all duration-200"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Logic Unchanged */}
      {mobileMenu && (
        <div className="md:hidden flex flex-col gap-3 px-8 pb-8 pt-4 bg-white/95 backdrop-blur-lg border-b border-gray-100/80 animate-fadeIn shadow-lg">
          {isAuthenticated ? (
            <>
              {/* Home button removed - only burger menu toggle remains */}
            </>
          ) : (
            <>
              <button
                className="w-full bg-gray-50/80 hover:bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl transition-all duration-200 border border-gray-200/60"
                onClick={() => {
                  navigate("/login");
                  setMobileMenu(false);
                }}
              >
                Login
              </button>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200/50"
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