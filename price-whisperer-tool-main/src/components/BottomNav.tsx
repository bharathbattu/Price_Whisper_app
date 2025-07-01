
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg rounded-t-xl z-50">
      <div className="flex justify-around items-center py-3 px-4">
        <Link to="/" className={cn(
          "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200",
          isActive('/') ? "text-primary bg-primary/10 scale-110" : "text-gray-500 hover:text-primary"
        )}>
          <Home className={cn(
            "w-5 h-5 mb-1",
            isActive('/') && "filter drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]"
          )} />
          <span className="text-xs font-medium">Home</span>
        </Link>
        
        <Link to="/saved" className={cn(
          "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200",
          isActive('/saved') ? "text-primary bg-primary/10 scale-110" : "text-gray-500 hover:text-primary"
        )}>
          <Heart className={cn(
            "w-5 h-5 mb-1",
            isActive('/saved') && "filter drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]"
          )} />
          <span className="text-xs font-medium">Saved</span>
        </Link>
        
        <Link to="/history" className={cn(
          "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200",
          isActive('/history') ? "text-primary bg-primary/10 scale-110" : "text-gray-500 hover:text-primary"
        )}>
          <Clock className={cn(
            "w-5 h-5 mb-1",
            isActive('/history') && "filter drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]"
          )} />
          <span className="text-xs font-medium">History</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
