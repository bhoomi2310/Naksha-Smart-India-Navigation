import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CtaBannerProps {
  onOpenDashboard: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenDashboard }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="reveal-on-scroll p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-orange-600/20 via-zinc-900 to-zinc-950 border border-orange-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden group">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-32 bg-orange-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold sassy-badge-bounce">
          <Compass className="w-3.5 h-3.5 animate-spin-slow text-orange-400" />
          <span>Live Navigation Active</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Ready to explore?
        </h2>

        <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
          Open the live map now and compare Fastest, Safest, and Scenic routes for your commute across Indian cities.
        </p>

        <div className="pt-2">
          <Button
            size="lg"
            onClick={onOpenDashboard}
            className="sassy-btn btn-shimmer bg-orange-600 hover:bg-orange-500 text-white font-bold px-9 py-6 rounded-2xl text-sm shadow-xl shadow-orange-600/35 transition-all active:scale-95"
          >
            Open Live Navigation
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default CtaBanner;
