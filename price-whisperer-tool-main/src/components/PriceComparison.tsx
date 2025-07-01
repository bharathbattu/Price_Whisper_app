
import { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Price {
  store: string;
  logo: string;
  price: number;
  url: string;
  delivery: string;
  rating: number;
}

interface PriceComparisonProps {
  prices: Price[];
  className?: string;
}

const PriceComparison = ({ prices: initialPrices, className }: PriceComparisonProps) => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (initialPrices.length > 0) {
      const sortedPrices = [...initialPrices].sort((a, b) => a.price - b.price);
      setPrices(sortedPrices);
    }
  }, [initialPrices]);

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    const sortedPrices = [...prices].sort((a, b) => {
      return newOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
    
    setPrices(sortedPrices);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={cn("glass-morphism rounded-xl overflow-hidden", className)}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-medium">Price Comparison</h3>
        <button 
          onClick={toggleSortOrder}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 animate-hover"
          aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>
      <div className="divide-y divide-border">
        {prices.map((price, index) => (
          <a 
            key={price.store + index}
            href={price.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center mr-3">
              <img src={price.logo} alt={price.store} className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{price.store}</p>
              <div className="flex items-center mt-1">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{price.delivery}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "w-2 h-2 rounded-full",
                        i < Math.round(price.rating) ? "bg-yellow-400" : "bg-gray-200 dark:bg-gray-700"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold ml-3">
              {formatPrice(price.price)}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PriceComparison;
