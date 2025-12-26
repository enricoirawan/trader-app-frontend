import { pages } from '@/constant';
import { useNavigate } from 'react-router';
import Account from './Account';
import Logo from './Logo';
import SidebarDesktopNavItem from './SidebarDesktopNavItem';

const SidebarDesktop = () => {
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex md:flex-col fixed top-3 bottom-3 w-64 bg-sidebar border border-gray-800 rounded-xl">
      <Logo />

      <nav className="flex-1 p-4 space-y-2">
        {pages.map((page, index) => {
          const Icon = page.icon;
          return (
            <SidebarDesktopNavItem
              key={index}
              onClick={() => navigate(page.path)}
              Icon={Icon}
              page={page}
            />
          );
        })}
      </nav>

      <Account />
    </aside>
  );
};

export default SidebarDesktop;
