import React from 'react';
import { Navigation as NavIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const isScrolled = scrollY > 30;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/90 border-b border-orange-500/20 backdrop-blur-xl shadow-2xl shadow-black/60 py-3'
          : 'bg-zinc-950/50 border-b border-zinc-900/60 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Built for India Subtitle */}
          <div
            onClick={onOpenDashboard}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-600/30 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-orange-600/60 transition-all duration-300">
              <NavIcon className="w-4 h-4 text-white fill-current transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-orange-500 font-black text-lg tracking-tight">नक्शा</span>
                <span className="text-white font-bold text-lg tracking-tight">Naksha</span>
              </div>
              <span className="text-[10px] text-orange-400 font-semibold tracking-wide">
                Built for India
              </span>
            </div>
          </div>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-300">
            <button
              onClick={onOpenDashboard}
              className="hover:text-orange-400 transition-colors hover:scale-105"
            >
              Navigation
            </button>
            <a 
              href="#route-profiles" 
              className="hover:text-orange-400 transition-colors hover:scale-105"
            >
              Route Profiles
            </a>
          </nav>

          {/* Auth & Launch Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {loggedIn ? (
              <Button
                size="sm"
                onClick={onOpenProfile}
                className="sassy-btn bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-semibold rounded-xl px-4 transition-all"
              >
                Profile & Trips
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenAuth('login')}
                  className="text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl px-3 transition-colors active:scale-95"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={onOpenDashboard}
                  className="sassy-btn btn-shimmer bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl px-4 shadow-lg shadow-orange-600/30 transition-all active:scale-95"
                >
                  Open Map
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
