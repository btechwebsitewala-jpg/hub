import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import TestsPage from "./pages/TestsPage";
import TestDetailPage from "./pages/TestDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import ResultsInquiryPage from "./pages/ResultsInquiryPage";
import QuoteRequestPage from "./pages/QuoteRequestPage";
import HelpPage from "./pages/HelpPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/tests" element={<TestsPage />} />
            <Route path="/test/:testSlug" element={<TestDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/results-inquiry" element={<ResultsInquiryPage />} />
            <Route path="/quote-request" element={<QuoteRequestPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
