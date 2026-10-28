import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import { isAuthenticated } from '@/lib/api';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { AmbientBackground } from '@/components/ui/AmbientBackground';

// Modular Landing Page Components
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import PerspectiveDeck from '@/components/landing/PerspectiveDeck';
import RouteProfilesSection from '@/components/landing/RouteProfilesSection';
import FreeAccessSection from '@/components/landing/FreeAccessSection';
import CtaBanner from '@/components/landing/CtaBanner';
import ScrollProgressBar from '@/components/landing/ScrollProgressBar';
import ScrollToTop from '@/components/landing/ScrollToTop';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const loggedIn = isAuthenticated();
  const { scrollProgress, scrollY } = useScrollReveal();

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden relative">
      {/* Dynamic Cyber Navigation Background */}
      <AmbientBackground variant="hero" />

      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgressBar progress={scrollProgress} />

      {/* Modular Navbar with Scroll-Aware Blur & Glow */}
      <LandingNavbar
        loggedIn={loggedIn}
        scrollY={scrollY}
        onOpenAuth={handleOpenAuth}
        onOpenDashboard={() => navigate('/dashboard')}
        onOpenProfile={() => navigate('/profile')}
      />

      {/* Hero Section with Driving Animation & Built for India Header */}
      <HeroSection onStartNavigation={() => navigate('/dashboard')} />

      {/* 3D Perspective Route Switcher Deck */}
      <PerspectiveDeck
        onNavigateToDashboard={() => navigate('/dashboard')}
        onNavigateToRoutes={() => navigate('/routes')}
      />

      {/* 6 Specialized Indian Route Profiles Section with Hover Micro-Interactions */}
      <RouteProfilesSection onSelectRoute={() => navigate('/routes')} />

      {/* Free Public Navigation vs Commuter Network Section */}
      <FreeAccessSection
        loggedIn={loggedIn}
        onOpenDashboard={() => navigate('/dashboard')}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => navigate('/profile')}
      />

      {/* Final Call to Action Banner with Shimmer Button */}
      <CtaBanner onOpenDashboard={() => navigate('/dashboard')} />

      {/* Unified Site Footer */}
      <Footer />

      {/* Floating Smooth Scroll-To-Top Button */}
      <ScrollToTop scrollY={scrollY} />

      {/* Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default Landing;
