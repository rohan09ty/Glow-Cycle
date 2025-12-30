import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { CycleProvider } from "@/contexts/CycleContext";
import BottomNav from "@/components/BottomNav";
import AuthPage from "@/pages/AuthPage";
import OnboardingPage from "@/pages/OnboardingPage";
import HomePage from "@/pages/HomePage";
import TrackerPage from "@/pages/TrackerPage";
import MoodPage from "@/pages/MoodPage";
import ChatPage from "@/pages/ChatPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!user?.onboardingComplete && window.location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useUser();

  return (
    <>
      <Routes>
        <Route 
          path="/auth" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />} 
        />
        <Route 
          path="/onboarding" 
          element={
            !isAuthenticated ? <Navigate to="/auth" replace /> : 
            user?.onboardingComplete ? <Navigate to="/" replace /> : 
            <OnboardingPage />
          } 
        />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/tracker" element={<ProtectedRoute><TrackerPage /></ProtectedRoute>} />
        <Route path="/mood" element={<ProtectedRoute><MoodPage /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/tips" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <CycleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </CycleProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
