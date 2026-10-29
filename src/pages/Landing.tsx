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
import ScrollRouteRoad from '@/components/landing/ScrollRouteRoad';
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
  const [activeChip, setActiveChip] = useState<'fastest' | 'safest' | 'scenic'>('fastest');
  const [activeWaypoint, setActiveWaypoint] = useState<'delhi' | 'corridor' | 'cyberhub'>('delhi');
  const loggedIn = isAuthenticated();
  const { scrollProgress, scrollY } = useScrollReveal();

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-[#F6EFE3] text-[#14121F] font-sans selection:bg-[#F2A31B] selection:text-[#14121F] overflow-x-hidden relative paper-grain">
      {/* Warm Cartographic Paper Background with Grain */}
      <AmbientBackground variant="hero" />

      {/* Scroll-Driven Route Road & Auto-Rickshaw Sprite passing down the page */}
      <ScrollRouteRoad
        onWaypointChange={setActiveWaypoint}
        onActiveChipChange={setActiveChip}
      />

      {/* Subtle Top Scroll Progress Bar */}
      <ScrollProgressBar progress={scrollProgress} />

      {/* Sticky Header with Border on Scroll & Mobile Drawer */}
      <LandingNavbar
        loggedIn={loggedIn}
        scrollY={scrollY}
        onOpenAuth={handleOpenAuth}
        onOpenDashboard={() => navigate('/dashboard')}
        onOpenProfile={() => navigate('/profile')}
      />

      {/* Full-bleed Hero with masked auto illustration, 2-line headline, and floating comparison card */}
      <HeroSection
        onStartNavigation={() => navigate('/dashboard')}
        activeChip={activeChip}
        activeWaypoint={activeWaypoint}
      />

      {/* Interactive Printed Route Switcher Deck */}
      <PerspectiveDeck
        onNavigateToDashboard={() => navigate('/dashboard')}
        onNavigateToRoutes={() => navigate('/routes')}
      />

      {/* 6 Specialized Indian Route Profiles with Distinct Truck-Art Accent Colors */}
      <RouteProfilesSection onSelectRoute={() => navigate('/routes')} />

      {/* Free Public Navigation vs Commuter Contributor Network */}
      <FreeAccessSection
        loggedIn={loggedIn}
        onOpenDashboard={() => navigate('/dashboard')}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => navigate('/profile')}
      />

      {/* Final Call to Action Banner with Watermark & Vermilion Button */}
      <CtaBanner onOpenDashboard={() => navigate('/dashboard')} />

      {/* Unified Indian Craft Site Footer */}
      <Footer />

      {/* Smooth Scroll-To-Top Button */}
      <ScrollToTop scrollY={scrollY} />

      {/* Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode((m) => (m === 'login' ? 'register' : 'login'))}
      />
    </div>
  );
};

export default Landing;
