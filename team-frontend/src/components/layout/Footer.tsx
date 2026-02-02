import { Link } from "react-router-dom";
import { LogoLumin } from "../reusable/logoLumin";

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <LogoLumin/>
               <span className="font-bold text-gray-900 tracking-tight">Lumin</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The next generation platform for lightning-fast digital solutions.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest">Product</h4>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Features</Link>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">API Reference</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest">Support</h4>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Help Center</Link>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Community</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest">Legal</h4>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
            © {new Date().getFullYear()} Lumin Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <div className="w-5 h-5 bg-gray-100 rounded-full hover:bg-blue-100 cursor-pointer transition-colors" />
            <div className="w-5 h-5 bg-gray-100 rounded-full hover:bg-blue-100 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};