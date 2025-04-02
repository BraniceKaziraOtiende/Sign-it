import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Video } from '../types';
import wordsData from '../data/words.json';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';
import { SearchHistory } from '../types';

interface SearchContextType {
  currentVideo: Video | null;
  searchWord: (word: string) => void;
  searchHistory: SearchHistory[];
  isHistoryVisible: boolean;
  toggleHistory: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const { user } = useAuth();

  // Load history from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedHistory = localStorage.getItem(`searchHistory-${user.id}`);
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      } else {
        setSearchHistory([]);
      }
    } else {
      setSearchHistory([]);
    }
  }, [user]);

  const searchWord = (word: string) => {
    const videoUrl = (wordsData as Record<string, string>)[word.toLowerCase()];
    if (videoUrl) {
      const video = {
        id: videoUrl.split('/').pop() || '',
        url: videoUrl,
        word
      };
      setCurrentVideo(video);

      // Add to history if user is logged in
      if (user) {
        const newHistory = {
          id: uuidv4(),
          word,
          timestamp: Date.now(),
          videoId: video.id
        };
        
        const updatedHistory = [newHistory, ...searchHistory].slice(0, 10); // Keep last 10 searches
        setSearchHistory(updatedHistory);
        localStorage.setItem(`searchHistory-${user.id}`, JSON.stringify(updatedHistory));
      }
    } else {
      setCurrentVideo(null);
    }
  };

  const toggleHistory = () => {
    setIsHistoryVisible(prev => !prev);
  };

  return (
    <SearchContext.Provider value={{ 
      currentVideo, 
      searchWord, 
      searchHistory,
      isHistoryVisible,
      toggleHistory 
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}