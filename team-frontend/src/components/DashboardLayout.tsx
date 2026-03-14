import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import Header from './Header.js';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 h-full z-50">
        <Sidebar />
      </div>
      <div className="flex-1 ml-72">
        <Header />
        <div className="min-h-screen bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
