import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Bell, User, LogOut, Sun, Moon, 
  Twitter, Facebook, Instagram, Linkedin, 
  LayoutDashboard, BarChart2, Settings, Users
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePlatformClick = (platform: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('platform', platform);
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setSidebarOpen(false);
  };

  const currentPlatform = new URLSearchParams(location.search).get('platform') || 'all';

  const isPlatformActive = (platform: string) => {
    return currentPlatform === platform;
  };

  const platformClasses = (platform: string) => {
    return `flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
      isPlatformActive(platform)
        ? 'text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white dark:bg-gray-800 shadow-xl transition-all transform duration-300">
          <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">SocialDash</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              <a href="#" className="flex items-center px-4 py-2 text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-md">
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                <BarChart2 className="h-5 w-5 mr-3" />
                Analytics
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                <Users className="h-5 w-5 mr-3" />
                Audience
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </a>
            </nav>
            <div className="px-4 py-4 border-t dark:border-gray-700">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Connected Platforms
              </h3>
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => handlePlatformClick('all')}
                  className={platformClasses('all')}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3 text-gray-500" />
                  All Platforms
                </button>
                <button
                  onClick={() => handlePlatformClick('twitter')}
                  className={platformClasses('twitter')}
                >
                  <Twitter className="h-5 w-5 mr-3 text-blue-400" />
                  Twitter
                </button>
                <button
                  onClick={() => handlePlatformClick('facebook')}
                  className={platformClasses('facebook')}
                >
                  <Facebook className="h-5 w-5 mr-3 text-blue-600" />
                  Facebook
                </button>
                <button
                  onClick={() => handlePlatformClick('instagram')}
                  className={platformClasses('instagram')}
                >
                  <Instagram className="h-5 w-5 mr-3 text-pink-500" />
                  Instagram
                </button>
                <button
                  onClick={() => handlePlatformClick('linkedin')}
                  className={platformClasses('linkedin')}
                >
                  <Linkedin className="h-5 w-5 mr-3 text-blue-700" />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 shadow">
            <div className="flex items-center h-16 px-4 border-b dark:border-gray-700">
              <LayoutDashboard className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">SocialDash</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                <a href="#" className="flex items-center px-4 py-2 text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-md">
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  Dashboard
                </a>
                
              </nav>
         
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <button onClick={() => setSidebarOpen(true)} className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center">
                <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <img className="h-8 w-8 rounded-full" src={user?.avatar} alt={user?.name} />
                    </button>
                    <span className="ml-2 text-gray-700 dark:text-gray-300 hidden md:block">{user?.name}</span>
                  </div>
                </div>
                <button onClick={handleLogout} className="ml-4 p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;