import type { PageComponent } from '@/types';
import clsx from 'clsx';
import type { LucideProps } from 'lucide-react';
import { useLocation } from 'react-router';

interface MobileNavigationNavItemProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  page: PageComponent;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

const MobileNavigationNavItem = ({
  onClick,
  page,
  Icon,
}: MobileNavigationNavItemProps) => {
  const location = useLocation();

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center gap-1 w-32 px-4 py-2 rounded-lg transition-all'
      )}
    >
      <Icon
        className={clsx(
          'w-5 h-5',
          location.pathname === page.path
            ? 'text-white'
            : 'text-muted-foreground'
        )}
      />
      <span
        className={clsx(
          'text-xs font-medium',
          location.pathname === page.path
            ? 'text-white'
            : 'text-muted-foreground'
        )}
      >
        {page.label}
      </span>
    </button>
  );
};

export default MobileNavigationNavItem;
