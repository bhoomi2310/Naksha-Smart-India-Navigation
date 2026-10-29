import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CtaBannerProps {
  onOpenDashboard: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenDashboard }) => {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Jaali separator */}
      <div className="jaali-border-divider mb-12 opacity-60" aria-hidden="true" />

      <div className="reveal-on-scroll relative p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border-2 border-[#14121F] shadow-[6px_6px_0_#14121F] text-center space-y-6 overflow-hidden">

        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-[#14121F] font-display tracking-tight">
            Navigation Built for Indian Cities.
          </h2>

          <p className="text-sm text-[#524C61] leading-relaxed">
            Open the live map to compare signal-free elevated corridors, verified safe night boulevards, and multimodal transit fares.
          </p>
        </div>

        <div className="relative z-10 pt-2 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            onClick={onOpenDashboard}
            className="ink-btn-primary text-sm px-8 py-5 rounded-xl flex items-center gap-2"
          >
            <span>Open Navigation Map</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default CtaBanner;
