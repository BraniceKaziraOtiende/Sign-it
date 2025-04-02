import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserCircle2, LogOut, Sun, Moon } from 'lucide-react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export function Header() {
  const { user, login, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const decoded = jwtDecode<GoogleUser>(credentialResponse.credential!);
    
    login({
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      avatar: decoded.picture
    });
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Word Video Lookup</h1>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {user ? (
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
              <button
                onClick={logout}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <UserCircle2 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Login Failed')}
                useOneTap
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}