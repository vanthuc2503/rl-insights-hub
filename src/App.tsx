import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useAuthStore } from "@/store/authStore";

const AdminRoute = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Admin />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
