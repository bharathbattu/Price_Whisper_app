
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Camera, Barcode, Upload, FileImage } from 'lucide-react';
import { products } from '@/utils/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ScanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode') || 'camera';
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (isScanning) {
      // Simulate scanning process
      const timer = setTimeout(() => {
        setScanComplete(true);
        setIsScanning(false);
        
        toast.success('Product identified successfully');
        
        // Simulate navigation after successful scan
        setTimeout(() => {
          // Navigate to random product for demo purposes
          const randomProductId = products[Math.floor(Math.random() * products.length)].id;
          navigate(`/product/${randomProductId}`);
        }, 1000);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isScanning, navigate]);

  const startScanning = () => {
    setIsScanning(true);
    toast.info('Scanning...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title={`${mode === 'camera' ? 'Camera' : mode === 'barcode' ? 'Barcode' : 'Search'}`} showBackButton />
      
      <main className="container pt-20 px-4 flex flex-col items-center">
        <div className="w-full max-w-md glass-morphism rounded-xl overflow-hidden mb-8 animate-entrance">
          <div className="aspect-square relative">
            {/* Scanning UI */}
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              {mode === 'camera' && (
                <div className={cn(
                  "w-full h-full flex items-center justify-center transition-opacity",
                  isScanning ? "opacity-50" : "opacity-100"
                )}>
                  <Camera className="w-20 h-20 text-white" />
                </div>
              )}
              
              {mode === 'barcode' && (
                <div className={cn(
                  "w-full h-full flex items-center justify-center transition-opacity",
                  isScanning ? "opacity-50" : "opacity-100"
                )}>
                  <Barcode className="w-20 h-20 text-white" />
                </div>
              )}
              
              {mode === 'search' && (
                <div className={cn(
                  "w-full h-full flex items-center justify-center transition-opacity",
                  isScanning ? "opacity-50" : "opacity-100"
                )}>
                  <FileImage className="w-20 h-20 text-white" />
                </div>
              )}
              
              {/* Scanning animation */}
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-xs h-1 bg-white/20 overflow-hidden rounded-full">
                    <div className="h-full bg-primary animate-pulse w-1/4 rounded-full" />
                  </div>
                </div>
              )}
              
              {/* Scan complete animation */}
              {scanComplete && (
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <div className="rounded-full bg-green-500 p-3 animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-5">
            <button
              onClick={startScanning}
              disabled={isScanning}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium flex items-center justify-center animate-hover hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanning ? 'Scanning...' : `Start ${mode === 'camera' ? 'Camera' : mode === 'barcode' ? 'Scanner' : 'Scanning'}`}
            </button>
          </div>
        </div>
        
        <div className="glass-morphism rounded-xl p-5 w-full max-w-md animate-entrance">
          <h3 className="font-medium mb-3">Alternative Methods</h3>
          <div className="grid grid-cols-2 gap-3">
            {mode !== 'camera' && (
              <button
                onClick={() => navigate('/scan?mode=camera')}
                className="p-3 border border-border rounded-lg flex flex-col items-center justify-center animate-hover hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <Camera className="w-6 h-6 mb-2" />
                <span className="text-sm">Camera</span>
              </button>
            )}
            
            {mode !== 'barcode' && (
              <button
                onClick={() => navigate('/scan?mode=barcode')}
                className="p-3 border border-border rounded-lg flex flex-col items-center justify-center animate-hover hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <Barcode className="w-6 h-6 mb-2" />
                <span className="text-sm">Barcode</span>
              </button>
            )}
            
            {mode !== 'search' && (
              <button
                onClick={() => navigate('/scan?mode=search')}
                className="p-3 border border-border rounded-lg flex flex-col items-center justify-center animate-hover hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-sm">Upload</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScanPage;
