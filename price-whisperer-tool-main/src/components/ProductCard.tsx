
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    lowestPrice: number;
    highestPrice: number;
    storePrice: number;
    savings: number;
  };
  className?: string;
  animate?: boolean;
  style?: React.CSSProperties;
}

const ProductCard = ({ product, className, animate = true, style }: ProductCardProps) => {
  const formattedLowestPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.lowestPrice);

  const isCheaperOnline = product.storePrice > product.lowestPrice;
  const savingsPercentage = Math.round((product.savings / product.storePrice) * 100);

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "block w-full bg-white/70 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md border border-white/50",
        animate && "animate-entrance",
        className
      )}
      style={style}
    >
      <div className="aspect-square w-full relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium backdrop-blur-md",
            isCheaperOnline 
              ? "bg-green-500/70 text-white" 
              : "bg-red-500/70 text-white"
          )}>
            <div className="flex items-center space-x-0.5">
              {isCheaperOnline ? (
                <>
                  <ArrowDown className="w-3 h-3" />
                  <span>{savingsPercentage}%</span>
                </>
              ) : (
                <>
                  <ArrowUp className="w-3 h-3" />
                  <span>{Math.abs(savingsPercentage)}%</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-1 mb-1">{product.name}</h3>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Best Price</p>
            <p className="text-base font-semibold">{formattedLowestPrice}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">In Store</p>
            <p className={cn(
              "text-sm",
              isCheaperOnline ? "line-through text-muted-foreground" : "font-semibold"
            )}>
              ₹{product.storePrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
