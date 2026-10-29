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
    <section id="access" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Jaali separator */}
      <div className="jaali-border-divider mb-12 opacity-60" aria-hidden="true" />

      {/* Header */}
      <div className="reveal-on-scroll text-center mb-12 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black text-[#14121F] font-display tracking-tight">
          100% Free Public Map. No Subscriptions.
        </h2>
        <p className="text-xs sm:text-sm text-[#524C61] max-w-lg mx-auto leading-relaxed">
          Navigation should be accessible to every commuter in India. You only need an account if you want to help report road hazards.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        
        {/* Public Navigation Card */}
        <div className="reveal-on-scroll delay-100 p-6 sm:p-7 rounded-2xl bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EAF4F3] border-[1.5px] border-[#14121F] text-[#1F6F6B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#14121F]">Public Navigation</h3>
              <span className="text-[11px] text-[#1F6F6B] font-bold">Free Forever · No Login Required</span>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-[#524C61]">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#1F6F6B] flex-shrink-0 mt-0.5" />
              <span>All 6 specialized Indian route profiles (Fastest, Safest, Scenic, Eco, Transit)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#1F6F6B] flex-shrink-0 mt-0.5" />
              <span>Voice turn-by-turn guidance engine tuned for Indian street names</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#1F6F6B] flex-shrink-0 mt-0.5" />
              <span>Live Metro connectivity and official auto rickshaw meter fares</span>
            </li>
          </ul>

          <Button
            onClick={onOpenDashboard}
            className="ink-btn-secondary w-full text-xs py-3 rounded-xl"
          >
            Open Free Navigation Map
          </Button>
        </div>

        {/* Commuter Network Card */}
        <div className="reveal-on-scroll delay-200 p-6 sm:p-7 rounded-2xl bg-[#FAF5EC] border-2 border-[#14121F] shadow-[5px_5px_0_#F2A31B] space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FDF0ED] border-[1.5px] border-[#14121F] text-[#D8472B]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#14121F]">Commuter Network</h3>
              <span className="text-[11px] text-[#D8472B] font-bold">Free Community Contributor Account</span>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-[#524C61]">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#D8472B] flex-shrink-0 mt-0.5" />
              <span>Report potholes and monsoon waterlogged spots to alert other drivers</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#D8472B] flex-shrink-0 mt-0.5" />
              <span>Save your daily office commute routes and favorite pit stops</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#D8472B] flex-shrink-0 mt-0.5" />
              <span>Sync route preferences seamlessly across your phone and laptop</span>
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
            className="ink-btn-primary w-full text-xs py-3 rounded-xl"
          >
            {loggedIn ? 'View My Commuter Trips' : 'Join Free Community'}
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FreeAccessSection;
