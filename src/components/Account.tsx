import { LogOut } from 'lucide-react';

const Account = () => {
  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-all">
        <div className="w-full flex items-center justify-start gap-x-2">
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=Jacob%20Urban"
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm font-medium">John User</div>
        </div>
        <LogOut className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Account;
