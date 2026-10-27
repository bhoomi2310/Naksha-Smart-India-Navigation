import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import NakshaLoader from "@/components/NakshaLoader";
import ErrorBoundary from "@/components/ErrorBoundary";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import RoutesPage from "./pages/Routes";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  useEffect(() => {
    try {
      sessionStorage.removeItem('naksha_intro_seen');
    } catch {}

    const handleReplay = () => setShowInitialLoader(true);
    window.addEventListener('replay-naksha-loader', handleReplay);
    return () => window.removeEventListener('replay-naksha-loader', handleReplay);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        forcedTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <TooltipProvider>
          {showInitialLoader && (
            <NakshaLoader 
              duration={1900} 
              onFinish={() => setShowInitialLoader(false)} 
            />
          )}
          <Toaster />
        <Sonner />
        <div className="min-h-screen w-full max-w-full overflow-x-hidden">
          <ErrorBoundary>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/routes" element={<RoutesPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/onboarding" element={<Onboarding />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </div>
      </TooltipProvider>
    </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
