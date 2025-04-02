import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { VideoPlayer } from './components/VideoPlayer';
import { HistoryTab } from './components/HistoryTab';
import { Menu } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
              <div className="flex flex-col items-center">
                <SearchBar />
                
                {/* Mobile Toggle Button */}
                <div className="md:hidden w-full mt-4 flex justify-end">
                  <button 
                    onClick={toggleSidebar}
                    className="bg-blue-500 text-white p-2 rounded-md flex items-center"
                  >
                    <Menu size={20} />
                    <span className="ml-2">
                      {showSidebar ? "Hide History" : "Show History"}
                    </span>
                  </button>
                </div>
                
                <div className="w-full mt-4 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-8">
                  {/* Mobile Sidebar (conditionally shown) */}
                  {showSidebar && (
                    <div className="w-full md:hidden mb-4">
                      <HistoryTab />
                    </div>
                  )}
                  
                  {/* Desktop Sidebar (always visible on larger screens) */}
                  <div className="hidden md:block md:w-80 flex-shrink-0">
                    <HistoryTab />
                  </div>
                  
                  {/* Main Content Area */}
                  <div className="flex-1">
                    <VideoPlayer />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;