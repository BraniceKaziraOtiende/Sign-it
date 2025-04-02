import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
import { History, Clock, ChevronUp, ChevronDown } from 'lucide-react';

export function HistoryTab() {
  const { searchHistory, searchWord, isHistoryVisible, toggleHistory } = useSearch();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full">
      <button
        onClick={toggleHistory}
        className="w-full flex items-center justify-between p-4 bg-white rounded-t-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Search History</h2>
        </div>
        {isHistoryVisible ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      
      {isHistoryVisible && (
        <div className="bg-white rounded-b-lg shadow-sm border-x border-b border-slate-200 divide-y divide-slate-100 max-h-[calc(100vh-20rem)] overflow-y-auto">
          {searchHistory.length === 0 ? (
            <div className="p-4 text-center text-slate-500">
              No search history yet
            </div>
          ) : (
            searchHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => searchWord(item.word)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-indigo-600">{item.word}</span>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(item.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
} 