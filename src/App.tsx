import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // For more interactive notifications if used
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Imports
import Homepage from "./pages/Homepage";
import RestaurantListingPage from "./pages/RestaurantListingPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import CartPage from "./pages/CartPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/restaurants" element={<RestaurantListingPage />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          {/* Placeholder for other routes like profile, login, etc. */}
          {/* <Route path="/profile" element={<UserProfilePage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster /> {/* For shadcn/ui toasts */}
      <Sonner /> {/* For sonner toasts if used separately */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;