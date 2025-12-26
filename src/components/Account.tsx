import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOut } from 'lucide-react';

const Account = () => {
  const { isAuthenticated, name, logout, login } = useAuth();

  return (
    <div className="p-4 border-t border-gray-800">
      {isAuthenticated ? (
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-all">
          <div className="w-full flex items-center justify-start gap-x-2">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm font-medium">{name}</div>
          </div>
          <LogOut className="w-5 h-5 cursor-pointer" onClick={() => logout()} />
        </div>
      ) : (
        <button
          onClick={() => login()}
          className="group flex items-center gap-3 px-4 py-2 rounded-lg transition-all cursor-pointer"
        >
          <p className="text-sm text-muted-foreground group-hover:text-white transition-colors">
            Log In to your account
          </p>

          <LogIn className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
        </button>
      )}
    </div>
  );
};

export default Account;
