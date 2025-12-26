import { Outlet } from 'react-router';
import MobileNavigation from './MobileNavigation';
import SidebarDesktop from './SidebarDesktop';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen text-white">
      <SidebarDesktop />

      <div className="md:ml-64 pb-20 md:pb-0">
        {/* Page Content */}
        <main className="px-4 md:px-5 py-3">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      {/* Page Content */}

      <MobileNavigation />
    </div>
  );
};

export default DashboardLayout;
