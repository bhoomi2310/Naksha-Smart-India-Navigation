import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, User, Compass, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NakshaLogo from '@/components/NakshaLogo';

interface LandingNavbarProps {
  loggedIn: boolean;
  scrollY: number;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenDashboard: () => void;
  onOpenProfile: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  loggedIn,
  scrollY,
  onOpenAuth,
  onOpenDashboard,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isScrolled = scrollY > 20;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#F6EFE3]/95 backdrop-blur-sm border-b-[1.5px] border-[#14121F] shadow-[0_2px_0_#14121F] py-3'
          : 'bg-[#F6EFE3] border-b-[1.5px] border-[#14121F]/15 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A31B] rounded-lg p-0.5"
            aria-label="Naksha Homepage"
          >
            <NakshaLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-[#14121F]">
            <Link
              to="/dashboard"
              className={`pb-1 transition-colors hover:text-[#D8472B] ${
                location.pathname === '/dashboard'
                  ? 'border-b-2 border-[#D8472B] text-[#D8472B]'
                  : 'border-b-2 border-transparent'
              }`}
            >
              Navigation
            </Link>
            <Link
              to="/routes"
              className={`pb-1 transition-colors hover:text-[#D8472B] ${
                location.pathname === '/routes'
                  ? 'border-b-2 border-[#D8472B] text-[#D8472B]'
                  : 'border-b-2 border-transparent'
              }`}
            >
              Route Profiles
            </Link>
            <a
              href="#route-profiles"
              className="pb-1 text-[#524C61] hover:text-[#D8472B] transition-colors border-b-2 border-transparent"
            >
              Corridors
            </a>
            <a
              href="#access"
              className="pb-1 text-[#524C61] hover:text-[#D8472B] transition-colors border-b-2 border-transparent"
            >
              Free Access
            </a>
          </nav>

          {/* Auth & CTA Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {loggedIn ? (
              <Button
                size="sm"
                onClick={onOpenProfile}
                className="ink-btn-secondary text-xs rounded-lg px-4 py-2"
              >
                <User className="w-3.5 h-3.5 mr-1.5" />
                Profile & Trips
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenAuth('login')}
                  className="text-xs font-bold text-[#14121F] hover:bg-[#E6DCCB]/50 rounded-lg px-3 py-2 transition-colors"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={onOpenDashboard}
                  className="ink-btn-primary text-xs rounded-lg px-4 py-2"
                >
                  Open Map
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Drawer */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              size="sm"
              onClick={onOpenDashboard}
              className="ink-btn-primary text-xs rounded-md px-3 py-1.5"
            >
              Open Map
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open mobile navigation menu"
                  className="p-2 rounded-lg border-[1.5px] border-[#14121F] bg-[#FFFDF9] shadow-[2px_2px_0_#14121F] text-[#14121F] hover:bg-[#FAF5EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A31B]"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[320px] bg-[#F6EFE3] border-l-[1.5px] border-[#14121F] p-6 text-[#14121F]"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-6">
                    <div className="pb-4 border-b-[1.5px] border-[#14121F]/20">
                      <NakshaLogo size="sm" />
                    </div>

                    <nav className="flex flex-col space-y-3">
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border-[1.5px] border-[#14121F] bg-[#FFFDF9] shadow-[2px_2px_0_#14121F] text-xs font-bold hover:bg-[#FAF5EC]"
                      >
                        <Compass className="w-4 h-4 text-[#D8472B]" />
                        <span>Live Navigation</span>
                      </Link>

                      <Link
                        to="/routes"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border-[1.5px] border-[#14121F] bg-[#FFFDF9] shadow-[2px_2px_0_#14121F] text-xs font-bold hover:bg-[#FAF5EC]"
                      >
                        <GitFork className="w-4 h-4 text-[#1F6F6B]" />
                        <span>Route Profiles</span>
                      </Link>

                      <a
                        href="#route-profiles"
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2.5 text-xs font-semibold text-[#524C61] hover:text-[#14121F]"
                      >
                        6 Ways to Travel
                      </a>

                      <a
                        href="#access"
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2.5 text-xs font-semibold text-[#524C61] hover:text-[#14121F]"
                      >
                        Free Access
                      </a>
                    </nav>
                  </div>

                  <div className="pt-6 border-t-[1.5px] border-[#14121F]/20 space-y-3">
                    {loggedIn ? (
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenProfile();
                        }}
                        className="ink-btn-secondary w-full text-xs rounded-lg py-2.5"
                      >
                        <User className="w-3.5 h-3.5 mr-1.5" />
                        Profile & Trips
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onOpenAuth('login');
                          }}
                          className="ink-btn-secondary w-full text-xs rounded-lg py-2.5"
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onOpenAuth('register');
                          }}
                          className="ink-btn-primary w-full text-xs rounded-lg py-2.5"
                        >
                          Join Free Commuter Network
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
