
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HistoryItem from '@/components/HistoryItem';
import ScanButton from '@/components/ScanButton';
import { searchHistory } from '@/utils/mockData';
import { Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const HistoryPage = () => {
  const [history, setHistory] = useState(searchHistory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredHistory = history.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearHistory = () => {
    setHistory([]);
    toast.success('Search history cleared');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Search History" showBackButton />
      
      <main className="container pt-20 px-4">
        {/* Search Input */}
        <div className="glass-morphism rounded-xl p-2 mb-6 flex items-center animate-entrance">
          <Search className="ml-2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your history"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none px-3 py-2 text-foreground placeholder:text-muted-foreground"
          />
          {history.length > 0 && (
            <button 
              onClick={clearHistory}
              className="p-2 text-red-500 rounded-full hover:bg-red-500/10 animate-hover"
              aria-label="Clear history"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="glass-morphism rounded-xl p-8 text-center animate-entrance">
            <h2 className="text-lg font-medium mb-2">No Search History</h2>
            <p className="text-muted-foreground mb-4">You haven't scanned any products yet.</p>
            <button 
              onClick={() => window.location.href = '/scan'}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium animate-hover hover:bg-primary/90"
            >
              Start Scanning
            </button>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="glass-morphism rounded-xl p-8 text-center animate-entrance">
            <h2 className="text-lg font-medium mb-2">No Results</h2>
            <p className="text-muted-foreground">No items match your search.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item, index) => (
              <HistoryItem key={item.id + index} item={item} index={index} />
            ))}
          </div>
        )}
      </main>

      <ScanButton />
    </div>
  );
};

export default HistoryPage;
