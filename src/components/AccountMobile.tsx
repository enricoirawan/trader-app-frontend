import { LogOut, LogOutIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

const AccountMobile = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex flex-col items-center gap-1 w-32 px-4 py-2 rounded-lg transition-all">
        <img
          src="https://api.dicebear.com/7.x/initials/svg?seed=Jacob%20Urban"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </PopoverTrigger>

      <PopoverContent side="top" className="w-40">
        <p>John User</p>
        <div className="border-b-2 border-gray-800"></div>
        <div className="flex items-center justify-start gap-x-2">
          <LogOutIcon size={18} />
          <p className="text-xs">Logout</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccountMobile;
