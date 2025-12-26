import type { PageComponent } from '@/types';
import clsx from 'clsx';
import type { LucideProps } from 'lucide-react';
import { useLocation } from 'react-router';

interface SidebarDesktopNavItemProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  page: PageComponent;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

const SidebarDesktopNavItem = ({
  onClick,
  page,
  Icon,
}: SidebarDesktopNavItemProps) => {
  const location = useLocation();

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer',
        location.pathname === page.path && 'bg-accent'
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
          'font-medium',
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

export default SidebarDesktopNavItem;
