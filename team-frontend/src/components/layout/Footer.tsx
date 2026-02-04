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