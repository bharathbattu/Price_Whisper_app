export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  storePrice: number;
  lowestPrice: number;
  highestPrice: number;
  savings: number;
  category: string;
  barcode: string;
  priceHistory: { date: string; price: number }[];
}

export interface PriceComparisonItem {
  store: string;
  logo: string;
  price: number;
  url: string;
  delivery: string;
  rating: number;
}

export interface HistoryItem {
  id: string;
  name: string;
  image: string;
  date: string;
  lowestPrice: number;
}

// Sample product data
export const products: Product[] = [
  {
    id: '1',
    name: 'Apple iPhone 14 Pro (256GB) - Deep Purple',
    description: 'The iPhone 14 Pro features a 6.1-inch Super Retina XDR display with ProMotion and an Always-On display. Powered by the A16 Bionic chip, it has a 48MP main camera with a quad-pixel sensor.',
    image: 'https://images.unsplash.com/photo-1663499482103-5d7bd50c0e62?q=80&w=800&auto=format&fit=crop',
    storePrice: 129900,
    lowestPrice: 119900,
    highestPrice: 134900,
    savings: 10000,
    category: 'Electronics',
    barcode: '190199657403',
    priceHistory: [
      { date: '2023-10-01', price: 134900 },
      { date: '2023-11-01', price: 129900 },
      { date: '2023-12-01', price: 124900 },
      { date: '2024-01-01', price: 121900 },
      { date: '2024-02-01', price: 119900 },
    ],
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'The Sony WH-1000XM5 wireless headphones feature industry-leading noise cancellation with eight microphones and Auto NC Optimizer. They offer up to 30 hours of battery life and crystal clear hands-free calling.',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
    storePrice: 34990,
    lowestPrice: 28990,
    highestPrice: 39990,
    savings: 6000,
    category: 'Electronics',
    barcode: '4548736123939',
    priceHistory: [
      { date: '2023-10-01', price: 39990 },
      { date: '2023-11-01', price: 34990 },
      { date: '2023-12-01', price: 32990 },
      { date: '2024-01-01', price: 29990 },
      { date: '2024-02-01', price: 28990 },
    ],
  },
  {
    id: '3',
    name: 'Samsung 65" Neo QLED 4K Smart TV QN90B',
    description: 'The Samsung Neo QLED 4K delivers stunning contrast with Quantum Mini LEDs and powerful 4K upscaling. It features a 120Hz refresh rate, Anti-Reflection technology, and Object Tracking Sound for a premium viewing experience.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop',
    storePrice: 199990,
    lowestPrice: 149990,
    highestPrice: 219990,
    savings: 50000,
    category: 'Electronics',
    barcode: '8806092991910',
    priceHistory: [
      { date: '2023-10-01', price: 219990 },
      { date: '2023-11-01', price: 199990 },
      { date: '2023-12-01', price: 179990 },
      { date: '2024-01-01', price: 164990 },
      { date: '2024-02-01', price: 149990 },
    ],
  },
  {
    id: '4',
    name: 'Nike Air Zoom Pegasus 39 Running Shoes',
    description: 'The Nike Air Zoom Pegasus 39 offers a responsive running experience with a breathable mesh upper and Zoom Air units in the forefoot and heel. It features a wider forefoot for more comfort and a secure midfoot fit.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
    storePrice: 11995,
    lowestPrice: 8995,
    highestPrice: 12995,
    savings: 3000,
    category: 'Footwear',
    barcode: '193654377117',
    priceHistory: [
      { date: '2023-10-01', price: 12995 },
      { date: '2023-11-01', price: 11995 },
      { date: '2023-12-01', price: 10995 },
      { date: '2024-01-01', price: 9995 },
      { date: '2024-02-01', price: 8995 },
    ],
  },
];

// Get price comparison for a product
export const getPriceComparison = (productId: string): PriceComparisonItem[] => {
  const product = products.find(p => p.id === productId);
  
  if (!product) return [];
  
  // Generate mock price comparison data
  return [
    {
      store: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
      price: product.lowestPrice,
      url: 'https://amazon.in',
      delivery: 'Free delivery by tomorrow',
      rating: 4.5,
    },
    {
      store: 'Flipkart',
      logo: 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png',
      price: product.lowestPrice + Math.floor(Math.random() * 2000),
      url: 'https://flipkart.com',
      delivery: 'Free delivery in 2 days',
      rating: 4.3,
    },
  ].sort((a, b) => a.price - b.price);
};

// Search history
export const searchHistory: HistoryItem[] = [
  {
    id: '1',
    name: 'Apple iPhone 14 Pro (256GB) - Deep Purple',
    image: 'https://images.unsplash.com/photo-1663499482103-5d7bd50c0e62?q=80&w=800&auto=format&fit=crop',
    date: '2024-02-15T14:30:00Z',
    lowestPrice: 119900,
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
    date: '2024-02-12T10:15:00Z',
    lowestPrice: 28990,
  },
  {
    id: '3',
    name: 'Samsung 65" Neo QLED 4K Smart TV QN90B',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop',
    date: '2024-02-05T16:45:00Z',
    lowestPrice: 149990,
  },
  {
    id: '4',
    name: 'Nike Air Zoom Pegasus 39 Running Shoes',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
    date: '2024-01-28T09:20:00Z',
    lowestPrice: 8995,
  },
  {
    id: '1',
    name: 'Apple iPhone 14 Pro (256GB) - Deep Purple',
    image: 'https://images.unsplash.com/photo-1663499482103-5d7bd50c0e62?q=80&w=800&auto=format&fit=crop',
    date: '2024-01-20T11:10:00Z',
    lowestPrice: 124900,
  },
];

// Get a product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
