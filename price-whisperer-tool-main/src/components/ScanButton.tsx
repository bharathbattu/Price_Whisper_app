
import { Camera, Barcode, Search } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ScanButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAction = (action: 'camera' | 'barcode' | 'search') => {
    setIsExpanded(false);
    
    // In a real app, this would initialize the camera or scanner
    // For now, we'll just navigate to the scan page with a query param
    navigate(`/scan?mode=${action}`);
  };

  return (
    <div className="fixed bottom-8 right-0 left-0 flex justify-center z-50" ref={buttonRef}>
      <div className={`relative ${isExpanded ? 'scale-110' : ''} transition-transform duration-300`}>
        {/* Main button */}
        <button
          onClick={toggleExpand}
          className="neo-morphism w-16 h-16 rounded-full flex items-center justify-center text-primary bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 transition-all duration-300"
          aria-label="Scan options"
        >
          <div className={`transition-all duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
            <Search className="w-6 h-6" />
          </div>
        </button>

        {/* Action buttons that appear when expanded */}
        <div className={`absolute left-0 transition-all duration-300 ${isExpanded ? 'opacity-100 -translate-x-20' : 'opacity-0 translate-x-0 pointer-events-none'}`}>
          <button
            onClick={() => handleAction('camera')}
            className="neo-morphism w-12 h-12 rounded-full flex items-center justify-center bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 text-primary animate-hover"
            aria-label="Take photo"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        <div className={`absolute right-0 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-20' : 'opacity-0 translate-x-0 pointer-events-none'}`}>
          <button
            onClick={() => handleAction('barcode')}
            className="neo-morphism w-12 h-12 rounded-full flex items-center justify-center bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 text-primary animate-hover"
            aria-label="Scan barcode"
          >
            <Barcode className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanButton;
