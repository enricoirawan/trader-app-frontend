import { pages } from '@/constant';
import { useNavigate } from 'react-router';
import MobileNavigationNavItem from './MobileNavigationNavItem';
import AccountMobile from './AccountMobile';

const MobileNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t border-gray-800 z-40">
      <div className="flex items-center justify-around px-4 py-3">
        {pages.map((page, index) => {
          const Icon = page.icon;
          return (
            <MobileNavigationNavItem
              key={index}
              page={page}
              Icon={Icon}
              onClick={() => navigate(page.path)}
            />
          );
        })}
        <AccountMobile />
      </div>
    </nav>
  );
};

export default MobileNavigation;
