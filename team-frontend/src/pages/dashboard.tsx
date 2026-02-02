import { LogoLumin } from "../components/reusable/logoLumin";

const SidebarItem = ({ icon, label, active = false }:{icon: string, label: string, active?: boolean}) => (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
    </div>
);

export function DashBoard() {
    return (
        <div className="flex min-h-screen bg-[#F1F5F9] font-sans antialiased text-slate-900">

            {/* --- Sidebar Component --- */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <LogoLumin />
                    <span className="text-xl font-black tracking-tighter">LUMIN</span>
                </div>

                <nav className="flex flex-col gap-2 flex-grow">
                    <SidebarItem icon="📊" label="Overview" active />
                    <SidebarItem icon="📦" label="Products" />
                    <SidebarItem icon="👥" label="Customers" />
                    <SidebarItem icon="📈" label="Analytics" />
                    <SidebarItem icon="⚙️" label="Settings" />
                </nav>

                <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Pro Plan</p>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-3/4"></div>
                    </div>
                    <p className="text-xs font-bold mt-2 text-slate-600">75% Capacity</p>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-1 p-10 max-w-7xl">

                {/* Top bar */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900">Market Overview</h2>
                        <p className="text-slate-500 font-medium">Welcome back, Administrator.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">Export</button>
                        <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">+ Add Entry</button>
                    </div>
                </header>

                {/* --- Bento Grid Layout --- */}
                <div className="grid grid-cols-12 gap-6 mb-8">
                    {/* Large Main Card */}
                    <div className="col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-lg text-slate-800 font-mono tracking-tight">Performance Flow</h3>
                            <div className="flex gap-2 text-xs font-bold text-slate-400">
                                <span className="text-blue-600 px-2 py-1 bg-blue-50 rounded-md">Weekly</span>
                                <span className="px-2 py-1">Monthly</span>
                            </div>
                        </div>
                        {/* Fake Chart Placeholder */}
                        <div className="h-64 w-full bg-slate-50 rounded-3xl relative overflow-hidden flex items-end px-4 gap-2">
                            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-600/10 rounded-t-lg transition-all duration-700 hover:bg-blue-600"></div>
                            ))}
                        </div>
                    </div>

                    {/* Side Info Cards */}
                    <div className="col-span-4 flex flex-col gap-6">
                        <div className="flex-1 bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Net Growth</p>
                                <h3 className="text-4xl font-black">+24.8%</h3>
                            </div>
                            <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-blue-600 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                        </div>
                        <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                            <h4 className="font-bold text-slate-800">New Clients</h4>
                            <div className="flex -space-x-3 mt-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-slate-200"></div>
                                ))}
                                <div className="h-10 w-10 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600">+12</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Row Stats --- */}
                <div className="grid grid-cols-4 gap-6 text-center">
                    {['Conversion', 'Retention', 'LTV', 'Churn'].map((label, i) => (
                        <div key={i} className="bg-white/50 backdrop-blur-sm p-6 rounded-[2rem] border border-white/40">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                            <p className="text-xl font-bold text-slate-800 mt-1">{(Math.random() * 100).toFixed(1)}%</p>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}