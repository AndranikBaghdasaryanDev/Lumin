import {
  LayoutDashboard,
  BookOpen,
  Settings,
  TrendingUp,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const NavigationItem = ({ item }: { item: NavItem }) => {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `group relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white/60 rounded-r-full" />
          )}

          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-all duration-200 ${
              isActive
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-gray-200"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${
                isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
              }`}
            />
          </div>

          <span className="text-sm font-medium flex-1">
            {item.name}
          </span>
        </>
      )}
    </NavLink>
  );
};

const UserProfile = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    try {
      // Immediate logout without waiting for API
      localStorage.removeItem("access_token");
      logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="p-3 border-t border-gray-100">
      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="relative flex-shrink-0">
            {user?.profile?.profileImage ? (
              <img
                src={user.profile.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ${user?.profile?.profileImage ? 'hidden' : ''}`}>
              <span className="text-white font-semibold text-sm">
                {user?.firstName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-50"></div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.email?.split('@')[0] || 'Error'
              }
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.email || 'error@error.com'}
            </p>
          </div>

          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 bg-white rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-gray-200">
          <button
            className="flex items-center gap-2 w-full text-red-500 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-lg transition-all duration-200 text-sm group"
            onClick={handleLogout}
          >
            <div className="relative">
              <LogOut className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            </div>
            <span className="font-medium">Logout</span>
            <div className="ml-auto">
              <div className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarHeader = () => {
  return (
    <div className="p-5 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-bold text-gray-900">Lumin</h1>
      </div>

      <div className="mt-4 flex items-center justify-between p-2.5 bg-green-50 rounded-xl border border-green-100">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-green-600" />
          <span className="text-xs text-green-700">Performance</span>
        </div>
        <span className="text-xs font-bold text-green-600">+12.5%</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings},
  ];

  return (
    <div className="flex flex-col h-screen w-72 bg-white text-gray-800 fixed left-0 top-0 border-r border-gray-100 shadow-sm">
      <SidebarHeader />

      <nav className="flex-1 py-5 px-3 flex flex-col gap-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
          Main Menu
        </p>
        {navItems.map((item) => (
          <NavigationItem key={item.name} item={item} />
        ))}
      </nav>

      <UserProfile />
    </div>
  );
};

export default Sidebar;