import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CtaBannerProps {
  onOpenDashboard: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenDashboard }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="reveal-on-scroll p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Subtle top accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Ready to navigate?
        </h2>

        <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          Open the live map and compare Fastest, Safest, and Scenic routes for your commute across Indian cities.
        </p>

        <div className="pt-2">
          <Button
            size="lg"
            onClick={onOpenDashboard}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-5 rounded-xl text-sm shadow-lg shadow-orange-600/25 transition-all"
          >
            Open Navigation
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default CtaBanner;
