
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import ScanPage from "./pages/ScanPage";
import HistoryPage from "./pages/HistoryPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import TrendsPage from "./pages/TrendsPage";
import SavedPage from "./pages/SavedPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
