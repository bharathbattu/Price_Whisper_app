
// Format price in Indian Rupees
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Calculate savings percentage
export const calculateSavingsPercentage = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

// Get color based on price comparison
export const getPriceComparisonColor = (storePrice: number, onlinePrice: number): string => {
  if (onlinePrice < storePrice) {
    return 'text-green-500';
  } else if (onlinePrice > storePrice) {
    return 'text-red-500';
  }
  return 'text-gray-500';
};

// Calculate price trend (is the price going up, down, or stable)
export const getPriceTrend = (priceHistory: { date: string; price: number }[]): 'up' | 'down' | 'stable' => {
  if (!priceHistory || priceHistory.length < 2) return 'stable';

  const sortedPrices = [...priceHistory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const firstPrice = sortedPrices[0].price;
  const lastPrice = sortedPrices[sortedPrices.length - 1].price;

  if (lastPrice < firstPrice) return 'down';
  if (lastPrice > firstPrice) return 'up';
  return 'stable';
};
