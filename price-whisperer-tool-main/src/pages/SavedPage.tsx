
import { ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';

const SavedPage = () => {
  return (
    <div className="container max-w-md mx-auto pb-16">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 px-4 flex items-center border-b">
        <Link to="/" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Heart className="h-5 w-5" /> Saved Items
        </h1>
      </div>
      
      <div className="p-4 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <Heart className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No saved items</h2>
        <p className="text-gray-500 text-center mb-6">
          Items you save will appear here for easy access
        </p>
        <Link 
          to="/" 
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Browse Products
        </Link>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default SavedPage;
