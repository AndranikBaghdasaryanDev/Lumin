import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  FileText,
  HelpCircle,
  TrendingUp,
  Award,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge: string | null;
}

// Reusable Navigation Item Component
const NavigationItem = ({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      className={({ isActive: linkActive }) =>
        `group relative flex items-center px-4 py-3 mx-2 rounded-xl transition-all duration-300 ease-in-out ${
          linkActive || isActive
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
            : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
        }`
      }
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
          isActive ? "bg-white/20" : "bg-gray-700/50 group-hover:bg-gray-600/50"
        }`}
      >
        <Icon
          className={`w-5 h-5 transition-all duration-300 ${
            isActive ? "text-white" : "text-gray-400 group-hover:text-white"
          }`}
        />
      </div>

      <span
        className={`ml-3 font-medium transition-all duration-300 ${
          isActive ? "text-white" : "text-gray-300 group-hover:text-white"
        }`}
      >
        {item.name}
      </span>

      {/* Hover effect indicator */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:h-8" />

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full" />
      )}
    </NavLink>
  );
};

// Reusable User Profile Component
const UserProfile = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">Admin User</p>
            <p className="text-gray-400 text-sm truncate">admin@eduhub.com</p>
          </div>

          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <button className="flex items-center space-x-2 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-all duration-200">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Sidebar Header Component
const SidebarHeader = () => {
  return (
    <div className="p-6 border-b border-gray-800/50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">EduHub</h1>
          <p className="text-gray-400 text-xs">Admin Dashboard</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-xs text-gray-400">Performance</span>
        </div>
        <span className="text-xs font-bold text-green-400">+12.5%</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Courses",
      href: "/courses",
      icon: BookOpen,
      badge: "8",
    },
    {
      name: "Students",
      href: "/students",
      icon: Users,
      badge: "1.2k",
    },
    {
      name: "Reports",
      href: "/reports",
      icon: FileText,
      badge: null,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      badge: null,
    },
    {
      name: "Help",
      href: "/help",
      icon: HelpCircle,
      badge: null,
    },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white h-screen fixed left-0 top-0 shadow-2xl border-r border-gray-800/50 backdrop-blur-xl">
      {/* Sidebar Header */}
      <SidebarHeader />

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <div className="px-3 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Menu
          </p>
        </div>

        <div className="space-y-1">
          {navItems.map((item) => (
            <NavigationItem key={item.name} item={item} isActive={false} />
          ))}
        </div>

        <div className="px-3 mt-8 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Quick Actions
          </p>
        </div>

        <div className="px-3">
          <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Award className="w-5 h-5" />
            <span className="font-medium">Create Course</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};

export default Sidebar;
