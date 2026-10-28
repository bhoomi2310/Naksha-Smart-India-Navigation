import React from 'react';
import { ArrowRight, Compass, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PROFILES } from '@/data/routeProfilesData';
import autoRickshawWebP from '@/assets/auto-rickshaw.webp';

interface HeroSectionProps {
  onStartNavigation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartNavigation }) => {
  const profileCount = ROUTE_PROFILES.length;

  const scrollToProfiles = () => {
    const el = document.getElementById('route-profiles');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-8 pb-14 sm:pt-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Asymmetric Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Eyebrow, Fraunces Headline, Human Subcopy, CTAs & Route Line */}
        <div className="lg:col-span-7 text-left space-y-6">
          
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] border-[1.2px] border-[#14121F] shadow-[2px_2px_0_#14121F]">
            <span className="w-2 h-2 rounded-full bg-[#D8472B]" aria-hidden="true" />
            <span className="text-[11px] font-bold text-[#14121F] tracking-wide uppercase">
              India&apos;s Commuter Navigation Engine
            </span>
          </div>

          {/* Big Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#14121F] font-display tracking-tight leading-[1.08]">
            Navigation built for India.
            <br />
            <span className="text-[#14121F]">Fastest, Safest, or </span>
            <span className="relative inline-block text-[#14121F]">
              <span className="relative z-10">Scenic.</span>
              {/* Hand-drawn marigold swash SVG underline */}
              <svg
                className="absolute left-0 -bottom-2 w-full h-3.5 text-[#F2A31B] pointer-events-none"
                viewBox="0 0 150 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 12C38 3 86 4 148 10C128 14 62 15 8 13"
                  stroke="#F2A31B"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>

          {/* Short, concrete human subcopy (no em dashes) */}
          <p className="text-base sm:text-lg text-[#524C61] max-w-xl font-normal leading-relaxed">
            Pick routes based on real Indian road conditions: bypass ground-level bottleneck jams via signal-free flyovers, stay on verified illuminated roads after sunset, or take calm tree-lined heritage avenues.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={onStartNavigation}
              className="ink-btn-primary text-sm font-bold px-7 py-5 rounded-xl flex items-center gap-2"
            >
              Start Navigation
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToProfiles}
              className="ink-btn-secondary text-sm font-semibold px-6 py-5 rounded-xl flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#D8472B]" />
              Explore {profileCount} Profiles
            </Button>
          </div>

          {/* Animated SVG route-line indicator */}
          <div className="pt-3 max-w-md" aria-hidden="true">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#524C61] mb-1">
              <span>Delhi CP</span>
              <span className="text-[#D8472B]">Elevated Corridor</span>
              <span>Gurgaon CyberHub</span>
            </div>
            <svg className="w-full h-7 overflow-visible" viewBox="0 0 400 24" fill="none">
              <path
                d="M 6 16 Q 100 4, 200 18 T 394 10"
                stroke="#E6DCCB"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              <path
                d="M 6 16 Q 100 4, 200 18 T 394 10"
                stroke="#D8472B"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-route-draw"
                style={{ strokeDasharray: '400', strokeDashoffset: '400' }}
              />
              <circle cx="6" cy="16" r="4.5" fill="#D8472B" stroke="#14121F" strokeWidth="1.5" />
              <circle cx="200" cy="18" r="3.5" fill="#FFFDF9" stroke="#14121F" strokeWidth="1.5" />
              <circle cx="394" cy="10" r="5" fill="#F2A31B" stroke="#14121F" strokeWidth="1.5" />
            </svg>
          </div>

        </div>

        {/* Right Column: Framed, rotated (-2deg) poster card with marigold offset shadow & floating route overlay */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end pt-4 lg:pt-0">
          <div className="relative w-full max-w-[420px] sm:max-w-[440px]">
            
            {/* Framed Poster Card */}
            <div className="relative rounded-2xl bg-[#FFFDF9] border-2 border-[#14121F] shadow-[6px_6px_0_#F2A31B] p-3.5 transform -rotate-1 sm:-rotate-2 transition-transform duration-300 hover:rotate-0">
              
              {/* Top poster bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b-[1.5px] border-[#14121F]/15 text-[11px] font-bold text-[#14121F]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F2A31B]" />
                  Road Telemetry Active
                </span>
                <span className="text-[#524C61]">Delhi NCR</span>
              </div>

              {/* Framed Image Container */}
              <div className="relative rounded-xl overflow-hidden border-[1.5px] border-[#14121F] bg-[#EDE4D5] aspect-[4/3]">
                <img
                  src={autoRickshawWebP}
                  alt="Auto-rickshaw commuting through Indian city streets"
                  width={560}
                  height={420}
                  loading="eager"
                  className="w-full h-full object-cover object-center filter contrast-105 saturate-110"
                />
                {/* Poster Caption Ribbon */}
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-lg bg-[#FFFDF9]/95 border-[1.2px] border-[#14121F] shadow-[2px_2px_0_#14121F] text-[11px] font-bold text-[#14121F] flex items-center justify-between">
                  <span>Tested on Indian Road Conditions</span>
                  <span className="text-[#D8472B]">NavIC Lock</span>
                </div>
              </div>

              {/* Poster bottom stamp */}
              <div className="pt-2.5 flex items-center justify-between text-[10px] text-[#524C61] font-semibold">
                <span>Fastest · Safest · Scenic</span>
                <span className="text-[#14121F] font-bold">Grade A Corridors</span>
              </div>

            </div>

            {/* Floating Route Card Overlay */}
            <div className="absolute -bottom-6 -left-3 sm:-left-6 z-20 w-[88%] sm:w-[320px] p-3.5 rounded-xl bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[4px_4px_0_#14121F] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#14121F]">
                <span className="flex items-center gap-1 text-[#D8472B]">
                  <Clock className="w-3.5 h-3.5" />
                  Route Comparison
                </span>
                <span className="text-[10px] text-[#524C61]">CP → CyberHub</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {/* Fastest chip */}
                <div className="p-2 rounded-lg bg-[#FDF0ED] border-[1.2px] border-[#F4BAAD] text-center">
                  <div className="text-[9px] font-bold text-[#D8472B] uppercase">Fastest</div>
                  <div className="text-xs font-black text-[#14121F]">32 min</div>
                </div>

                {/* Safest chip */}
                <div className="p-2 rounded-lg bg-[#EAF4F3] border-[1.2px] border-[#9DCBC8] text-center">
                  <div className="text-[9px] font-bold text-[#1F6F6B] uppercase">Safest</div>
                  <div className="text-xs font-black text-[#14121F]">35 min</div>
                </div>

                {/* Scenic chip */}
                <div className="p-2 rounded-lg bg-[#FEF8EA] border-[1.2px] border-[#F8D88F] text-center">
                  <div className="text-[9px] font-bold text-[#C98109] uppercase">Scenic</div>
                  <div className="text-xs font-black text-[#14121F]">41 min</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
