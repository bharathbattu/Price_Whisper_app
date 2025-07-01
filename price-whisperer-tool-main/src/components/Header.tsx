import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Settings, Moon, Sun, ShoppingCart } from 'lucide-react';
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  onBackClick?: () => void;
}

const Header = ({ title, showBackButton = false, showSearch = false, onBackClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [aiRecommendationsEnabled, setAiRecommendationsEnabled] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [issueReport, setIssueReport] = useState('');
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowTerms(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmitIssue = () => {
    if (issueReport.trim()) {
      alert('Your issue has been reported. Thank you for your feedback!');
      setIssueReport('');
    }
  };

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 py-4 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {showBackButton && (
              <button 
                onClick={handleBackClick}
                className="mr-3 p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 animate-hover"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            {title && <h1 className="text-xl font-medium">{title}</h1>}
            {!title && !showBackButton && (
              <div className="text-lg font-bold text-[#6A0DAD] flex items-center">
                <span className="bg-[#6A0DAD] text-white rounded-full p-1 mr-1.5">
                  <ShoppingCart className="h-4 w-4" />
                </span>
                shopcrazy
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100/50 animate-hover">
                  <Bell className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 p-3 bg-white/90 backdrop-blur-lg dark:bg-gray-900/90">
                <div className="mb-3">
                  <h3 className="font-medium text-primary mb-2">Alerts & Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Notifications</p>
                        <p className="text-xs text-muted-foreground">Alerts for price drops, deals, and new features</p>
                      </div>
                      <Switch 
                        checked={notificationsEnabled} 
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">AI Recommendations</p>
                        <p className="text-xs text-muted-foreground">Smart suggestions based on your search history</p>
                      </div>
                      <Switch 
                        checked={aiRecommendationsEnabled} 
                        onCheckedChange={setAiRecommendationsEnabled}
                      />
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <button 
              className="p-2 rounded-full hover:bg-gray-100/50 animate-hover"
              onClick={toggleSettings}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        {showSearch && <SearchBar />}
        
        {showSettings && !showTerms && (
          <div className="absolute right-4 mt-2 w-72 bg-white/90 backdrop-blur-lg dark:bg-gray-900/90 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-medium text-primary">Interface & Preferences</h3>
              <div className="mt-2 space-y-2">
                <button className="w-full text-left py-1.5 px-2 rounded-md hover:bg-gray-100/70 dark:hover:bg-gray-800/70 text-sm flex items-center justify-between">
                  <span>Language</span>
                  <span className="text-xs text-muted-foreground">English (US)</span>
                </button>
                <button className="w-full text-left py-1.5 px-2 rounded-md hover:bg-gray-100/70 dark:hover:bg-gray-800/70 text-sm flex items-center justify-between" onClick={toggleTheme}>
                  <span>Theme Mode</span>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-2">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                    {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </div>
                </button>
              </div>
            </div>
            
            <div className="px-4 py-2">
              <h3 className="font-medium text-primary">Help & Support</h3>
              <div className="mt-2 space-y-2">
                <button className="w-full text-left py-1.5 px-2 rounded-md hover:bg-gray-100/70 dark:hover:bg-gray-800/70 text-sm">
                  <span>Contact Support</span>
                  <div className="mt-1 text-xs text-muted-foreground">vikramchand02vc@gmail.com</div>
                </button>
                <div className="w-full text-left py-1.5 px-2 rounded-md hover:bg-gray-100/70 dark:hover:bg-gray-800/70 text-sm">
                  <span>Report an Issue</span>
                  <div className="mt-2">
                    <Textarea 
                      placeholder="Describe your issue..." 
                      className="text-xs min-h-[60px]"
                      value={issueReport}
                      onChange={(e) => setIssueReport(e.target.value)}
                    />
                    <Button 
                      size="sm" 
                      className="w-full mt-2 text-xs"
                      onClick={handleSubmitIssue}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                <button className="w-full text-left py-1.5 px-2 rounded-md hover:bg-gray-100/70 dark:hover:bg-gray-800/70 text-sm" onClick={toggleTerms}>
                  Terms & Conditions
                </button>
              </div>
            </div>
          </div>
        )}

        {showSettings && showTerms && (
          <div className="absolute right-4 mt-2 w-80 max-h-96 overflow-y-auto bg-white/90 backdrop-blur-lg dark:bg-gray-900/90 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
            <div className="px-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-primary">Terms & Conditions</h3>
                <button 
                  onClick={toggleTerms}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Back
                </button>
              </div>
              <div className="text-xs text-muted-foreground space-y-2">
                <p className="text-xs text-muted-foreground">Last Updated: 20-03-2025</p>
                
                <p>Welcome to BestBuyNow ("the App"), an AI-powered price comparison tool. By downloading, accessing, or using our App, you agree to comply with these Terms & Conditions. Please read them carefully before using the App.</p>
                
                <div>
                  <p className="font-medium text-foreground">1. Acceptance of Terms</p>
                  <p>By using the App, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. If you do not agree, please do not use the App.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">2. Use of the App</p>
                  <p>The App is designed to help users compare prices by scanning barcodes or images.</p>
                  <p>You must be at least 18 years old or have parental consent to use the App.</p>
                  <p>You agree not to misuse the App for fraudulent activities or illegal purposes.</p>
                  <p>We reserve the right to suspend or terminate your account if you violate these terms.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">3. Data & Privacy</p>
                  <p>The App collects and processes certain personal and non-personal data. Please refer to our Privacy Policy for more details.</p>
                  <p>We do not share personal information with third parties without user consent, except as required by law.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">4. Accuracy of Information</p>
                  <p>We strive to provide accurate and up-to-date price comparisons. However, we do not guarantee that all data is error-free or current at all times.</p>
                  <p>Prices, discounts, and availability are subject to change by third-party retailers.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">5. Third-Party Links & Services</p>
                  <p>The App integrates with third-party e-commerce platforms (e.g., Amazon, Flipkart) for product pricing.</p>
                  <p>We are not responsible for transactions, services, or policies of third-party platforms.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">6. Affiliate Disclosure</p>
                  <p>The App may contain affiliate links. When users make purchases through these links, we may earn a commission.</p>
                  <p>This does not affect the price users pay for products.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">7. Limitation of Liability</p>
                  <p>We are not liable for any loss, damage, or inconvenience caused by incorrect pricing data or third-party transactions.</p>
                  <p>Your use of the App is at your own risk.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">8. Modifications to Terms</p>
                  <p>We may update these Terms & Conditions from time to time. Continued use of the App after changes means you accept the new terms.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">9. Contact Us</p>
                  <p>If you have any questions regarding these Terms & Conditions, please contact us at vikramchand02vc@gmail.com.</p>
                </div>
                
                <p>By using the App, you agree to these Terms & Conditions. Thank you for using BestBuyNow!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
