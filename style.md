header

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
    <header className="w-full bg-white/90 backdrop-blur-lg border-b border-gray-100/80 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-[72px]">
        
        {/* Logo Section */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            if (location.pathname === "/") navigate("/login");
            if (location.pathname === "/dashboard") navigate("/dashboard");
          }}
        >
          <LogoLumin/>
          <h1 className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">Lumin</h1>
        </div>

        {/* Desktop Menu - Logic Unchanged */}
        <div className="hidden md:flex items-center gap-2">
          {location.pathname === "/dashboard" ? (
            <button
              className="bg-red-50/80 hover:bg-red-100 text-red-600 font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-red-100/60 shadow-sm hover:shadow-md"
              onClick={() => logout()}
            >
              Logout
            </button>
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
          {location.pathname === "/dashboard" ? (
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



footer



import { Link } from "react-router-dom";
import { LogoLumin } from "../reusable/logoLumin";

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100/80 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
               <LogoLumin/>
               <span className="font-bold text-gray-900 tracking-tight text-lg">Lumin</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The next generation platform for lightning-fast digital solutions.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Product</h4>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">Features</Link>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">API Reference</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Support</h4>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">Help Center</Link>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">Community</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Legal</h4>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">Privacy Policy</Link>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
            © {new Date().getFullYear()} Lumin Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <div className="w-6 h-6 bg-gray-100 rounded-full hover:bg-blue-100 cursor-pointer transition-all duration-200 hover:scale-110" />
            <div className="w-6 h-6 bg-gray-100 rounded-full hover:bg-blue-100 cursor-pointer transition-all duration-200 hover:scale-110" />
          </div>
        </div>
      </div>
    </footer>
  );
};




dashboard


import { LogoLumin } from "../components/reusable/logoLumin";
import { useState } from "react";

const SidebarItem = ({ icon, label, active = false }:{icon: string, label: string, active?: boolean}) => (
    <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-200/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
    </div>
);

export function DashBoard() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#F1F5F9] font-sans antialiased text-slate-900">

            {/* --- Sidebar Component --- */}
            <aside className={`w-72 lg:w-80 bg-white border-r border-slate-200/80 flex flex-col p-4 lg:p-8 fixed lg:sticky top-0 h-screen z-40 transform transition-transform duration-300 ease-in-out ${
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}>
                <div className="flex items-center justify-between mb-8 lg:mb-12 px-2">
                    <div className="flex items-center gap-3 lg:gap-4">
                        <LogoLumin />
                        <span className="text-xl lg:text-2xl font-black tracking-tighter">LUMIN</span>
                    </div>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col gap-2 lg:gap-3 flex-grow">
                    <SidebarItem icon="📊" label="Overview" active />
                    <SidebarItem icon="📦" label="Products" />
                    <SidebarItem icon="👥" label="Customers" />
                    <SidebarItem icon="📈" label="Analytics" />
                    <SidebarItem icon="⚙️" label="Settings" />
                </nav>

                <div className="mt-auto space-y-4">
                    {/* Mobile Logout Button */}
                    <button className="lg:hidden w-full bg-red-50/80 hover:bg-red-100 text-red-600 font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95 border border-red-100/60 shadow-sm hover:shadow-md text-sm">
                        Logout
                    </button>
                    
                    {/* Pro Plan Card */}
                    <div className="p-4 lg:p-6 bg-slate-50 rounded-2xl lg:rounded-3xl border border-slate-100/60">
                        <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 lg:mb-3">Pro Plan</p>
                        <div className="h-1.5 lg:h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                        </div>
                        <p className="text-xs lg:text-xs font-bold mt-2 lg:mt-3 text-slate-600">75% Capacity</p>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Toggle */}
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-white rounded-xl shadow-lg border border-slate-200"
            >
                {mobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Mobile Logo - Centered when menu is closed */}
            <div className={`lg:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-200">
                    <LogoLumin />
                    <span className="text-lg font-black tracking-tighter">LUMIN</span>
                </div>
            </div>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* --- Main Content Area --- */}
            <main className="flex-1 overflow-y-auto">

                {/* Overview Section */}
                <section className="p-4 sm:p-6 lg:p-12 max-w-7xl">
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 lg:mb-12">
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">Market Overview</h2>
                            <p className="text-slate-500 font-medium text-sm sm:text-base lg:text-lg mt-1 lg:mt-2">Welcome back, Administrator.</p>
                        </div>
                        <div className="flex gap-2 sm:gap-4">
                            <button className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl lg:rounded-2xl bg-white border-2 border-slate-200 font-bold text-xs sm:text-sm shadow-sm hover:bg-slate-50 transition-all duration-200">Export</button>
                            <button className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl lg:rounded-2xl bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-200/50 hover:bg-blue-700 transition-all duration-200 active:scale-95">+ Add Entry</button>
                        </div>
                    </header>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
                        {[
                            { label: "Total Revenue", value: "$124,563", change: "+12.5%", positive: true },
                            { label: "Active Users", value: "8,549", change: "+23.1%", positive: true },
                            { label: "Conversion Rate", value: "3.24%", change: "-2.4%", positive: false },
                            { label: "Avg. Order Value", value: "$86.40", change: "+5.3%", positive: true }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-4 sm:p-6 rounded-xl lg:rounded-2xl border border-slate-100/80 shadow-lg">
                                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
                                <p className="text-xl sm:text-2xl font-black text-slate-900 mb-2">{stat.value}</p>
                                <p className={`text-xs sm:text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change} from last month
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100/80 shadow-xl mb-8 lg:mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                            <h3 className="font-bold text-lg lg:text-xl text-slate-800">Revenue Overview</h3>
                            <div className="flex gap-2 sm:gap-3">
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 text-blue-600 rounded-xl text-xs sm:text-sm font-semibold">Week</button>
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold">Month</button>
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold">Year</button>
                            </div>
                        </div>
                        <div className="h-48 sm:h-56 lg:h-64 bg-slate-50 rounded-xl lg:rounded-2xl flex items-end px-2 sm:px-4 gap-1 sm:gap-2">
                            {[65, 80, 45, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-600/20 rounded-t-lg hover:bg-blue-600 transition-all duration-300"></div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="p-4 sm:p-6 lg:p-12 max-w-7xl bg-white/50">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 lg:mb-8">Products</h3>
                    <div className="bg-white rounded-2xl lg:rounded-3xl border border-slate-100/80 shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="text-left p-3 sm:p-4 lg:p-6 font-bold text-slate-700 text-xs sm:text-sm">Product</th>
                                        <th className="text-left p-3 sm:p-4 lg:p-6 font-bold text-slate-700 text-xs sm:text-sm">Category</th>
                                        <th className="text-left p-3 sm:p-4 lg:p-6 font-bold text-slate-700 text-xs sm:text-sm">Price</th>
                                        <th className="text-left p-3 sm:p-4 lg:p-6 font-bold text-slate-700 text-xs sm:text-sm">Stock</th>
                                        <th className="text-left p-3 sm:p-4 lg:p-6 font-bold text-slate-700 text-xs sm:text-sm">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: "Premium Dashboard", category: "Software", price: "$299", stock: 150, status: "Active" },
                                        { name: "Analytics Pro", category: "Tools", price: "$199", stock: 89, status: "Active" },
                                        { name: "Mobile App", category: "Application", price: "$99", stock: 0, status: "Out of Stock" }
                                    ].map((product, i) => (
                                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="p-3 sm:p-4 lg:p-6 font-semibold text-slate-900 text-xs sm:text-sm">{product.name}</td>
                                            <td className="p-3 sm:p-4 lg:p-6 text-slate-600 text-xs sm:text-sm">{product.category}</td>
                                            <td className="p-3 sm:p-4 lg:p-6 font-bold text-slate-900 text-xs sm:text-sm">{product.price}</td>
                                            <td className="p-3 sm:p-4 lg:p-6 text-slate-600 text-xs sm:text-sm">{product.stock}</td>
                                            <td className="p-3 sm:p-4 lg:p-6">
                                                <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                                                    product.status === "Active" 
                                                        ? "bg-green-100 text-green-700" 
                                                        : "bg-red-100 text-red-700"
                                                }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Customers Section */}
                <section className="p-4 sm:p-6 lg:p-12 max-w-7xl">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 lg:mb-8">Customers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {[
                            { name: "Acme Corp", email: "contact@acme.com", revenue: "$12,450", status: "Premium" },
                            { name: "TechStart Inc", email: "hello@techstart.com", revenue: "$8,320", status: "Standard" },
                            { name: "Design Studio", email: "info@designstudio.com", revenue: "$15,780", status: "Premium" },
                            { name: "Marketing Pro", email: "team@marketingpro.com", revenue: "$6,890", status: "Basic" },
                            { name: "E-commerce Plus", email: "support@ecommerce.com", revenue: "$22,100", status: "Enterprise" },
                            { name: "Startup Hub", email: "founders@startup.com", revenue: "$4,560", status: "Basic" }
                        ].map((customer, i) => (
                            <div key={i} className="bg-white p-4 sm:p-6 rounded-xl lg:rounded-2xl border border-slate-100/80 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start justify-between mb-3 lg:mb-4">
                                    <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-slate-200"></div>
                                    <span className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-semibold ${
                                        customer.status === "Premium" || customer.status === "Enterprise"
                                            ? "bg-purple-100 text-purple-700"
                                            : customer.status === "Standard"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-gray-100 text-gray-700"
                                    }`}>
                                        {customer.status}
                                    </span>
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">{customer.name}</h4>
                                <p className="text-xs sm:text-sm text-slate-600 mb-2 lg:mb-3">{customer.email}</p>
                                <p className="text-base sm:text-lg font-black text-slate-900">{customer.revenue}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Analytics Section */}
                <section className="p-4 sm:p-6 lg:p-12 max-w-7xl bg-white/50">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 lg:mb-8">Analytics</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100/80 shadow-xl">
                            <h4 className="font-bold text-base lg:text-lg text-slate-800 mb-4 lg:mb-6">Traffic Sources</h4>
                            <div className="space-y-3 lg:space-y-4">
                                {[
                                    { source: "Direct", value: 45, color: "bg-blue-600" },
                                    { source: "Organic Search", value: 30, color: "bg-green-600" },
                                    { source: "Social Media", value: 15, color: "bg-purple-600" },
                                    { source: "Referral", value: 10, color: "bg-orange-600" }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-1 lg:mb-2">
                                            <span className="text-xs sm:text-sm font-semibold text-slate-700">{item.source}</span>
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">{item.value}%</span>
                                        </div>
                                        <div className="h-1.5 lg:h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.value}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100/80 shadow-xl">
                            <h4 className="font-bold text-base lg:text-lg text-slate-800 mb-4 lg:mb-6">Device Usage</h4>
                            <div className="grid grid-cols-3 gap-2 lg:gap-4 text-center">
                                <div className="p-3 lg:p-4 bg-slate-50 rounded-xl lg:rounded-2xl">
                                    <div className="text-2xl lg:text-3xl mb-1 lg:mb-2">💻</div>
                                    <p className="text-[10px] lg:text-xs font-semibold text-slate-600">Desktop</p>
                                    <p className="text-sm lg:text-lg font-black text-slate-900">52%</p>
                                </div>
                                <div className="p-3 lg:p-4 bg-slate-50 rounded-xl lg:rounded-2xl">
                                    <div className="text-2xl lg:text-3xl mb-1 lg:mb-2">📱</div>
                                    <p className="text-[10px] lg:text-xs font-semibold text-slate-600">Mobile</p>
                                    <p className="text-sm lg:text-lg font-black text-slate-900">38%</p>
                                </div>
                                <div className="p-3 lg:p-4 bg-slate-50 rounded-xl lg:rounded-2xl">
                                    <div className="text-2xl lg:text-3xl mb-1 lg:mb-2">📟</div>
                                    <p className="text-[10px] lg:text-xs font-semibold text-slate-600">Tablet</p>
                                    <p className="text-sm lg:text-lg font-black text-slate-900">10%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Settings Section */}
                <section className="p-4 sm:p-6 lg:p-12 max-w-7xl">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 lg:mb-8">Settings</h3>
                    <div className="bg-white rounded-2xl lg:rounded-3xl border border-slate-100/80 shadow-xl p-4 sm:p-6 lg:p-8">
                        <div className="space-y-6 lg:space-y-8">
                            <div>
                                <h4 className="font-bold text-base lg:text-lg text-slate-800 mb-3 lg:mb-4">Account Settings</h4>
                                <div className="space-y-3 lg:space-y-4">
                                    <div className="flex items-center justify-between p-3 lg:p-4 bg-slate-50 rounded-xl">
                                        <div>
                                            <p className="font-semibold text-slate-900 text-sm sm:text-base">Email Notifications</p>
                                            <p className="text-xs sm:text-sm text-slate-600">Receive email updates about your account</p>
                                        </div>
                                        <button className="w-10 h-5 lg:w-12 lg:h-6 bg-blue-600 rounded-full relative transition-colors">
                                            <div className="absolute right-0.5 lg:right-1 top-0.5 lg:top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 lg:p-4 bg-slate-50 rounded-xl">
                                        <div>
                                            <p className="font-semibold text-slate-900 text-sm sm:text-base">Two-Factor Authentication</p>
                                            <p className="text-xs sm:text-sm text-slate-600">Add an extra layer of security</p>
                                        </div>
                                        <button className="w-10 h-5 lg:w-12 lg:h-6 bg-slate-300 rounded-full relative transition-colors">
                                            <div className="absolute left-0.5 lg:left-1 top-0.5 lg:top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-base lg:text-lg text-slate-800 mb-3 lg:mb-4">Preferences</h4>
                                <div className="space-y-3 lg:space-y-4">
                                    <div className="p-3 lg:p-4 bg-slate-50 rounded-xl">
                                        <p className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Language</p>
                                        <select className="w-full p-2 lg:p-3 border border-slate-200 rounded-xl bg-white text-sm sm:text-base">
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                        </select>
                                    </div>
                                    <div className="p-3 lg:p-4 bg-slate-50 rounded-xl">
                                        <p className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Timezone</p>
                                        <select className="w-full p-2 lg:p-3 border border-slate-200 rounded-xl bg-white text-sm sm:text-base">
                                            <option>UTC-5 (Eastern)</option>
                                            <option>UTC-6 (Central)</option>
                                            <option>UTC-7 (Mountain)</option>
                                            <option>UTC-8 (Pacific)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}


loading form


import { useForm } from "react-hook-form";
import { loginSchema } from "../../lib/validations/auth";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../ui/Error";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Loading } from "../ui/Loading.tsx";
import { Input } from "../reusable/input";
import { ButtonToggleVisibility } from "../reusable/buttonToggleVisibility";
import { LinkSocial } from "../reusable/linkSocial";
import { TermsPolicy } from "../reusable/termsPolicy";
import { Divider } from "../reusable/divider";
import { LogoLumin } from "../reusable/logoLumin";
type LoginFormValues = z.infer<typeof loginSchema>;


export const LoginForm = () => {
    const { isLoading, login }: any = useAuthStore()
    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
    const [error,setError] = useState({ status: false, message: "" });
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    })
    
    const navigate = useNavigate();
    const handleSave = (data: LoginFormValues) => {
        login(data.email, data.password);
        reset();
        navigate("/dashboard");
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">

            {/* ===== CENTER ===== */}
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl px-8 sm:px-10 py-12 border border-gray-100/50">

                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <LogoLumin/>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3">
                        Welcome back to Lumin
                    </h1>
                    <p className="text-center text-gray-500 text-base mb-10">
                        Login with your email and password
                    </p>

                    {/* ===== YOUR FORM (LOGIC UNTOUCHED) ===== */}
                    <form
                        onSubmit={handleSubmit(handleSave)}
                        className="space-y-6"
                    >
                        {error.status && <Error message={error.message || "Error"} />}
                        {isLoading && <Loading />}

                        {/* Email */}
                        <div>
                            {errors.email && <Error message={errors.email.message} />}
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                error={errors.email?.message || ""}
                                {...register("email")}
                            />
                        </div>

                        {/* Password */}
                        <div >
                            {errors.password && <Error message={errors.password.message} />}
                            <Input
                                type={togglePasswordVisibility ? "text" : "password"}
                                label="Password"
                                placeholder="Enter your password"
                                {...register("password")}
                                error={errors.password?.message || ""}
                            />
                            <div className="relative">
                                <ButtonToggleVisibility
                                    type="button"
                                    onClick={() => setTogglePasswordVisibility(!togglePasswordVisibility)}
                                    src={togglePasswordVisibility ? "hide" : "show"}

                                />
                            </div>

                        </div>

                        {/* Remember + Register */}

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="font-medium">Keep me signed in</span>
                            </label>

                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                                Register
                            </Link>
                        </div>

                        {/* Divider */}
                        <Divider/>

                        {/* Social */}
                        <LinkSocial 
                            type="button"
                            to="#"
                            disabled={true}
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            text="Continue with Google"
                        />
                        <LinkSocial 
                            type="button"
                            to="#"
                            disabled={true}
                            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                            text="Continue with Facebook"
                        />
                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                            className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-200/60 active:scale-95"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </main>

            {/* ===== FOOTER ===== */}
            <footer className="text-xs text-gray-400 text-center py-6 px-4">
                <TermsPolicy />
            </footer>
        </div>

    )
}


Register form 


import type z from "zod";
import { registerSchema } from "../../lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { Error } from "../ui/Error";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../reusable/input";
import { ButtonToggleVisibility } from "../reusable/buttonToggleVisibility";
import { LinkSocial } from "../reusable/linkSocial";
import { TermsPolicy } from "../reusable/termsPolicy";
import { Divider } from "../reusable/divider";
import { Loading } from "../ui/Loading.tsx";
import { useAuthStore } from "../../stores/authStore";
import { LogoLumin } from "../reusable/logoLumin";

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    })

    const {isLoading, register: registerUser}:any = useAuthStore();
    const [error, setError] = useState({ status: false, message: "" });
    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
    const [toggleConfirmPasswordVisibility, setToggleConfirmPasswordVisibility] = useState(false);

    const handleSave = (data: RegisterFormValues) => {
        registerUser(data)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">

            {/* ===== CENTER ===== */}
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl px-8 sm:px-10 py-12 border border-gray-100/50">

                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <LogoLumin/>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3">
                        Create your Lumin account
                    </h1>
                    <p className="text-center text-gray-500 text-base mb-10">
                        Sign up with your email and password
                    </p>

                    {/* ===== REGISTER FORM ===== */}
                    <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
                        {error.status && <Error message={error.message || "Error"} />}
                        {isLoading && <Loading />}

                        {/* First Name */}
                        <div>
                            {errors.firstName && <Error message={errors.firstName.message} />}
                            <Input
                                type="text"
                                label="First Name"
                                placeholder="Enter your first name"
                                error={errors.firstName?.message || ""}
                                {...register("firstName")}
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            {errors.lastName && <Error message={errors.lastName.message} />}
                            <Input
                                type="text"
                                label="Last Name"
                                placeholder="Enter your last name"
                                error={errors.lastName?.message || ""}
                                {...register("lastName")}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            {errors.email && <Error message={errors.email.message} />}
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
error={errors.email?.message || ""}
                                {...register("email")}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            {errors.password && <Error message={errors.password.message} />}
                            <Input
                                type={togglePasswordVisibility ? "text" : "password"}
                                label="Password"
                                placeholder="Enter your password"
                                error={errors.password?.message || ""}
                                {...register("password")}
                            />
                            <div className="relative">
                                <ButtonToggleVisibility
                                    type="button"
                                    onClick={() => setTogglePasswordVisibility(!togglePasswordVisibility)}
                                    src={togglePasswordVisibility ? "hide" : "show"}
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            {errors.confirmPassword && <Error message={errors.confirmPassword.message} />}
                            <Input
                                type={toggleConfirmPasswordVisibility ? "text" : "password"}
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                error={errors.confirmPassword?.message || ""}
                                {...register("confirmPassword")}
                            />
                            <div className="relative">
                                <ButtonToggleVisibility
                                    type="button"
                                    onClick={() => setToggleConfirmPasswordVisibility(!toggleConfirmPasswordVisibility)}
                                    src={toggleConfirmPasswordVisibility ? "hide" : "show"}
                                />
                            </div>
                        </div>

                        {/* Terms + Login */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="font-medium">I agree to terms</span>
                            </label>

                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                                Login
                            </Link>
                        </div>

                        {/* Divider */}
                        <Divider />

                        {/* Social */}
                        <LinkSocial 
                            type="button"
                            to="#"
                            disabled={true}
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            text="Continue with Google"
                        />
                        <LinkSocial 
                            type="button"
                            to="#"
                            disabled={true}
                            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                            text="Continue with Facebook"
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                            className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-200/60 active:scale-95"
                        >
                            Register
                        </button>
</form>
                </div>
            </main>

            {/* ===== FOOTER ===== */}
            <footer className="text-xs text-gray-400 text-center py-6 px-4">
                <TermsPolicy />
            </footer>
        </div>
    )
}





Auth store 


import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../lib/api/service/authService";
import type { AuthState } from "../types/auth";
import type { User } from "../types/user";


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user:null,
            accessToken:null,
            refreshToken:null,
            isLoading:false,
            isAuthenticated:false,
            hasHydrated:false,

            login: (email:string,password:string) => {
                set({isLoading:true});
                authService.login(email,password)
                .then((response) => {
                    console.log("Login successful:", response.data);
                    set(
                        {   
                            user:response.data.user,
                            accessToken:response.data.accessToken,
                            refreshToken:response.data.refreshToken,
                            isLoading:false,
                            isAuthenticated:true
                        }
                    )
                })
                .catch((error) => {
                    console.log("Login failed:", error.response.data);
                    set({isLoading:false});
                    throw error;
                })
            },
            logout: () => {
                set({isLoading:true});
                authService.logout()
                .then(() => {
                    set({user:null,accessToken:null,refreshToken:null,isLoading:false,isAuthenticated:false});
                })
                .catch(error => {
                    set({isLoading:false});
                    throw error;
                })
            },
            register: async (userData:User) => {
                console.log()
                set({isLoading:true});
                authService.register(userData)
                .then((response) => {
                    console.log("Registration successful:", response.data);
                    set({   
                        user:response.data.user,
                        accessToken:response.data.accessToken,
                        refreshToken:response.data.refreshToken,
                        isLoading:false,
                        isAuthenticated:true
                    })
                })
                .catch(error => {
                    console.log("Registration failed:", error.response.data);
                    set({isLoading:false});
                    throw error;
                })
            },
            setAuth: async (user:User,accessToken:string,refreshToken:string) => {
                set(
                    {
                        user:user,
                        accessToken:accessToken,
                        refreshToken:refreshToken,
                        isLoading:false,
                        isAuthenticated:true
                    }
                )
            },
            checkAuth: () => {
                set({isLoading:true});
                authService.checkAuth()
                .then(() => {
                    set({
                        isAuthenticated:true,
                    })
                })
                .catch(() => {
                    set({
                        isAuthenticated:false,
                    })          
                })
                .finally(() => {
                    set({isLoading:false});
                })
            },
            setHasHydrated: (state: boolean) => {
                set({ hasHydrated: state });
            },
        }),
        {
            name:"auth-storage",
            onRehydrateStorage: () => (state: any) => {
                state?.setHasHydrated(true);
            }
        }
    )
)





.env


PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
CORE_BACKEND_URL=https://api-core.picsartacademy.am/api/internal
INTERNAL_API_KEY=36pMAcHMEmJHcezb12KeEU896FSUbWXWp7YZP7F8RBw=
JWT_SECRET=5b8BMLb8w1W3mGr1CDSDoWQIxDuckGsPQ99PmU77sOI=



authservice


import type { User } from "../../../types/user";
import { Axios } from "../axios";

export const authService = {
    login: async (email: string, password: string) => {
        return Axios.post("/api/auth/login", { email, password });
    },
    register: async (userData: User) => {
        return Axios.post("/api/auth/register", userData);
    },
    logout: () => {
        return Axios.post("/api/auth/logout");
    },
    checkAuth: () => {
        return Axios.get("/api/auth/me");
    }
}