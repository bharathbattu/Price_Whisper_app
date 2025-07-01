
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ScanButton from '@/components/ScanButton';
import { products } from '@/utils/mockData';
import { BarChart, Heart, Clock, Home as HomeIcon } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import PromoBanner from '@/components/PromoBanner';
import BottomNav from '@/components/BottomNav';

const Index = () => {
  const [recentProducts, setRecentProducts] = useState(products);
  
  useEffect(() => {
    // Simulate loading with a slight delay for animation
    const timer = setTimeout(() => {
      setRecentProducts(products);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative pb-16" style={{
      background: 'linear-gradient(to bottom, #E5DEFF 0%, #FFFFFF 100%)',
    }}>
      <Header title="" showSearch={true} />
      
      <main className="container pt-20 px-4 pb-24">
        <PromoBanner />

        <div className="mb-8 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Recent Price Checks</h2>
            <Link to="/history" className="text-sm text-primary flex items-center animate-hover hover:text-primary/80">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recentProducts.slice(0, 4).map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                animate={true}
                className="shadow-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Price Trends</h2>
            <div className="text-sm text-primary flex items-center animate-hover hover:text-primary/80">
              <BarChart className="w-4 h-4 mr-1" />
              View Charts
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-5 animate-entrance">
            <p className="text-center text-muted-foreground">
              Track price changes for your favorite products over time
            </p>
            {/* This would be a chart in the full implementation */}
          </div>
        </div>
        
        <div className="mt-8 mb-4">
          <div className="glass-morphism rounded-xl p-3 animate-entrance">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">Special Offer!</p>
                <p className="text-sm text-muted-foreground">Get 20% off on selected items</p>
              </div>
              <img 
                src="/placeholder.svg" 
                alt="Promotional banner" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
