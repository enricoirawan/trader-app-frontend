import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOutIcon } from 'lucide-react';
import { useState } from 'react';

const AccountMobile = () => {
  const { isAuthenticated, name, logout, login } = useAuth();

  const [open, setOpen] = useState<boolean>(false);

  return isAuthenticated ? (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex flex-col items-center gap-1 w-32 px-4 py-2 rounded-lg transition-all">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </PopoverTrigger>

      <PopoverContent side="top" className="w-40">
        <p>John User</p>
        <div className="border-b-2 border-gray-800"></div>
        <button
          onClick={() => logout()}
          className="flex items-center justify-start gap-x-2"
        >
          <LogOutIcon size={18} />
          <p className="text-xs">Logout</p>
        </button>
      </PopoverContent>
    </Popover>
  ) : (
    <button
      onClick={() => login()}
      className="flex flex-col items-center gap-1 w-32 px-4 py-2 rounded-lg transition-all"
    >
      <LogIn className="w-5 h-5 text-muted-foreground" />
      <p className="text-xs text-muted-foreground">Login</p>
    </button>
  );
};

export default AccountMobile;
