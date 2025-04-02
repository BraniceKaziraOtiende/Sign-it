import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';

export function SearchBar() {
  const [word, setWord] = useState('');
  const { searchWord } = useSearch();
  const { user } = useAuth();
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowNotification(true);
      // Hide notification after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    
    if (word.trim()) {
      searchWord(word.trim());
    }
  };

  return (
    <div className="w-full max-w-md relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder={user ? "Enter a word..." : "Sign in to search..."}
            className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            disabled={!user}
          />
          <button
            type="submit"
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
              user ? 'text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300' 
                   : 'text-gray-300 dark:text-gray-600'
            }`}
            disabled={!user}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Notification */}
      {showNotification && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 
                      bg-blue-50 dark:bg-blue-900 
                      border border-blue-200 dark:border-blue-700 
                      rounded-md shadow-lg animate-fade-in">
          <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
            Please sign in with Google to search for videos
          </p>
        </div>
      )}
    </div>
  );
}