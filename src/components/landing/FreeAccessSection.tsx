import React from 'react';
import { Check, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FreeAccessSectionProps {
  loggedIn: boolean;
  onOpenDashboard: () => void;
  onOpenAuth: (mode: 'register') => void;
  onOpenProfile: () => void;
}

export const FreeAccessSection: React.FC<FreeAccessSectionProps> = ({
  loggedIn,
  onOpenDashboard,
  onOpenAuth,
  onOpenProfile,
}) => {
  return (
    <section id="access" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full border-t border-zinc-800/80">
      
      {/* Header with Scroll Reveal */}
      <div className="reveal-on-scroll text-center mb-12 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          100% Free Public Map. No Subscriptions.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Navigation should be open to every traveler. You only need an account if you want to help report road hazards.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        
        {/* Public Navigation */}
        <div className="reveal-on-scroll delay-100 sassy-card-lift p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-5 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Public Navigation</h3>
              <span className="text-[11px] text-emerald-400 font-semibold">Free Forever · No Login</span>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-zinc-300">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>All 6 route profiles (Fastest, Safest, Scenic, Eco, Transit)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Audio voice turn-by-turn guidance simulator</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Metro lines and official auto rickshaw meter fares</span>
            </li>
          </ul>

          <Button
            onClick={onOpenDashboard}
            className="sassy-btn w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl py-5 transition-all border border-zinc-700"
          >
            Open Free Map
          </Button>
        </div>

        {/* Commuter Network */}
        <div className="reveal-on-scroll delay-200 sassy-card-lift p-7 rounded-2xl bg-zinc-900/90 border border-orange-500/40 space-y-5 shadow-2xl shadow-orange-600/10 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Commuter Network</h3>
              <span className="text-[11px] text-orange-400 font-semibold">Free Community Account</span>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-zinc-300">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Report potholes & flooded roads to help fellow drivers</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Save your daily commute routes and favorite trips</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Sync across your mobile phone and computer</span>
            </li>
          </ul>

          <Button
            onClick={() => {
              if (loggedIn) {
                onOpenProfile();
              } else {
                onOpenAuth('register');
              }
            }}
            className="sassy-btn btn-shimmer w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl py-5 shadow-lg shadow-orange-600/30 transition-transform active:scale-95"
          >
            {loggedIn ? 'View My Commuter Profile' : 'Sign Up (Free Forever)'}
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FreeAccessSection;
