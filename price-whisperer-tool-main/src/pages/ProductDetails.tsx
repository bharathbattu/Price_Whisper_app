
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import PriceComparison from '@/components/PriceComparison';
import { getProductById, getPriceComparison } from '@/utils/mockData';
import { formatPrice, calculateSavingsPercentage, getPriceComparisonColor } from '@/utils/priceUtils';
import { BarChart, ArrowUp, ArrowDown, Barcode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState(id ? getProductById(id) : undefined);
  const [priceComparison, setPriceComparison] = useState(id ? getPriceComparison(id) : []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setPriceComparison(getPriceComparison(id));
      } else {
        toast.error('Product not found');
        navigate('/');
      }
      setIsLoading(false);
    }, 500);
  }, [id, navigate]);

  const setupPriceAlert = () => {
    toast.success('Price alert set successfully! We\'ll notify you when the price drops.');
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Product Details" showBackButton />
        <div className="container pt-20 px-4 flex justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const isCheaperOnline = product.lowestPrice < product.storePrice;
  const savingsPercentage = calculateSavingsPercentage(product.storePrice, product.lowestPrice);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Product Details" showBackButton />
      
      <main className="container pt-20 px-4">
        {/* Product Image and Basic Info */}
        <div className="glass-morphism rounded-xl overflow-hidden mb-6 animate-entrance">
          <div className="aspect-video w-full relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <div className={cn(
                "px-4 py-2 rounded-full text-white backdrop-blur-md flex items-center space-x-1",
                isCheaperOnline ? "bg-green-500/70" : "bg-red-500/70"
              )}>
                {isCheaperOnline ? (
                  <>
                    <ArrowDown className="w-4 h-4" />
                    <span>Save {savingsPercentage}%</span>
                  </>
                ) : (
                  <>
                    <ArrowUp className="w-4 h-4" />
                    <span>+{Math.abs(savingsPercentage)}%</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="p-5">
            <h1 className="text-xl font-medium">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <Barcode className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{product.barcode}</span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Best Online Price</p>
                <p className="text-2xl font-semibold">{formatPrice(product.lowestPrice)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">In Store</p>
                <p className={cn(
                  "text-xl",
                  isCheaperOnline ? "line-through text-muted-foreground" : "font-semibold"
                )}>
                  {formatPrice(product.storePrice)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={setupPriceAlert}
                className="w-full py-2.5 bg-primary text-white rounded-lg font-medium flex items-center justify-center animate-hover hover:bg-primary/90"
              >
                Set Price Alert
              </button>
            </div>
          </div>
        </div>
        
        {/* Price Comparison */}
        <PriceComparison prices={priceComparison} className="mb-6 animate-entrance animate-delay-100" />
        
        {/* Product Description */}
        <div className="glass-morphism rounded-xl p-5 mb-6 animate-entrance animate-delay-200">
          <h2 className="font-medium mb-2">Product Description</h2>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        
        {/* Price History */}
        <div className="glass-morphism rounded-xl p-5 animate-entrance animate-delay-300">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium">Price History</h2>
            <div className="text-sm text-primary flex items-center">
              <BarChart className="w-4 h-4 mr-1" />
              View Chart
            </div>
          </div>
          <div className="space-y-2">
            {product.priceHistory.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <span className="font-medium">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
