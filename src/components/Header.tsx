import { pages } from '@/constant';
import { Bell } from 'lucide-react';
import { useMemo } from 'react';
import { useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();
  const page = useMemo(() => {
    return pages.find((page) => page.path === location.pathname);
  }, [location.pathname]);

  return (
    <div className="bg-sidebar border border-gray-800 py-5 pl-5 pr-8 flex items-center justify-between rounded-lg">
      <div>
        <p className="font-bold">{page?.label}</p>
        <p className="text-xs md:text-sm text-muted-foreground">
          {page?.description}
        </p>
      </div>
      <Bell />
    </div>
  );
};

export default Header;
