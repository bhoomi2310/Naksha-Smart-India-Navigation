import React, { useEffect, useState } from 'react';
import { ArrowRight, Compass, Clock, Navigation as NavIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PROFILES } from '@/data/routeProfilesData';
import autoRickshawWebP from '@/assets/auto-rickshaw.webp';

interface HeroSectionProps {
  onStartNavigation: () => void;
  activeChip?: 'fastest' | 'safest' | 'scenic';
  activeWaypoint?: 'delhi' | 'corridor' | 'cyberhub';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartNavigation,
  activeChip = 'fastest',
  activeWaypoint = 'delhi',
}) => {
  const profileCount = ROUTE_PROFILES.length;
  const [parallaxTransform, setParallaxTransform] = useState('none');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches || window.innerWidth < 768) {
      return () => window.removeEventListener('resize', checkMobile);
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = 650;
          if (scrollY <= heroHeight) {
            const translateY = scrollY * 0.3;
            const scale = 1.0 + Math.min(0.06, (scrollY / heroHeight) * 0.06);
            setParallaxTransform(`translate3d(0, ${translateY}px, 0) scale(${scale})`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToProfiles = () => {
    const el = document.getElementById('route-profiles');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] pt-8 pb-14 sm:pt-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex items-center overflow-hidden">
      
      {/* 
        HERO BACKGROUND AUTO ILLUSTRATION
        Anchored to the right 60% of the viewport with object-fit: cover,
        front facing left towards content.
        Faded into paper background on left via CSS mask-image linear gradient.
        No dark overlay, no blur, no glow.
      */}
      <div
        className={`absolute top-0 right-0 pointer-events-none z-0 overflow-hidden ${
          isMobile
            ? 'w-full h-[260px] top-0'
            : 'w-[62%] h-full right-0 top-0'
        }`}
        style={{
          maskImage: isMobile
            ? 'linear-gradient(to bottom, black 50%, transparent 100%)'
            : 'linear-gradient(to right, transparent 0%, black 45%)',
          WebkitMaskImage: isMobile
            ? 'linear-gradient(to bottom, black 50%, transparent 100%)'
            : 'linear-gradient(to right, transparent 0%, black 45%)',
        }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full will-change-transform transition-transform duration-75 ease-out"
          style={{ transform: parallaxTransform }}
        >
          <img
            src={autoRickshawWebP}
            alt="Indian auto-rickshaw navigating city streets"
            width={682}
            height={1024}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center filter contrast-[1.03] saturate-[1.08]"
          />
          {/* Subtle paper wash matching #F6EFE3 */}
          <div className="absolute inset-0 bg-[#F6EFE3]/20 mix-blend-multiply pointer-events-none" />
        </div>
      </div>

      {/* Small metadata tags on background image */}
      <div className="hidden sm:flex items-center gap-2.5 absolute top-6 right-6 lg:right-10 z-10 pointer-events-none">
        <div className="px-2.5 py-1 rounded-md bg-[#FFFDF9]/95 border-[1.2px] border-[#14121F] shadow-[2px_2px_0_#F2A31B] text-[10px] font-bold text-[#14121F] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F6F6B]" />
          <span>NavIC Lock</span>
        </div>
        <div className="px-2.5 py-1 rounded-md bg-[#FFFDF9]/95 border-[1.2px] border-[#14121F] shadow-[2px_2px_0_#F2A31B] text-[10px] font-bold text-[#14121F]">
          <span>Grade A Corridors</span>
        </div>
      </div>

      {/* Hero Grid Container */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Eyebrow, 2-line Headline, Swash, Human Subcopy, CTAs, Waypoint indicator */}
        <div className="lg:col-span-7 text-left space-y-5 sm:space-y-6 pt-12 sm:pt-0">
          
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] border-[1.2px] border-[#14121F] shadow-[2px_2px_0_#14121F]">
            <span className="w-2 h-2 rounded-full bg-[#D8472B]" aria-hidden="true" />
            <span className="text-[11px] font-bold text-[#14121F] tracking-wide uppercase">
              India&apos;s Commuter Navigation Engine
            </span>
          </div>

          {/* 
            Headline: Strictly 2 lines on desktop with clamp() 
            Line 1: Navigation built for India.
            Line 2: Fastest, Safest, or Scenic.
          */}
          <h1 className="text-[clamp(1.5rem,4.5vw,3.15rem)] font-black text-[#14121F] font-display tracking-tight leading-[1.12] sm:leading-[1.14]">
            Navigation built for India.
            <br />
            <span>Fastest, Safest, or </span>
            <span className="relative inline-block text-[#14121F]">
              <span className="relative z-10">Scenic.</span>
              {/* Hand-drawn marigold swash SVG spanning full word */}
              <svg
                className="absolute left-0 -bottom-2 w-full h-3.5 text-[#F2A31B] pointer-events-none overflow-visible"
                viewBox="0 0 160 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M 2 13 C 40 4, 110 5, 158 10 C 120 15, 52 16, 6 14"
                  stroke="#F2A31B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>

          {/* Human subcopy (short, concrete, no em dashes) */}
          <p className="text-sm sm:text-base text-[#524C61] max-w-full sm:max-w-lg font-normal leading-relaxed pr-4 sm:pr-0">
            Pick routes based on real Indian road conditions: bypass ground-level bottleneck jams via signal-free flyovers, stay on verified illuminated roads after sunset, or take calm tree-lined heritage avenues.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Button
              size="lg"
              onClick={onStartNavigation}
              className="ink-btn-primary text-sm font-bold px-7 py-5 rounded-xl flex items-center justify-center gap-2"
            >
              <span>Start Navigation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToProfiles}
              className="ink-btn-secondary text-sm font-semibold px-6 py-5 rounded-xl flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#D8472B]" />
              <span>Explore {profileCount} Profiles</span>
            </Button>
          </div>

          {/* Waypoint Indicator Bar connected to scroll */}
          <div className="pt-2 max-w-md" aria-hidden="true">
            <div className="flex items-center justify-between text-[11px] font-bold mb-1">
              <span className={activeWaypoint === 'delhi' ? 'text-[#D8472B] underline decoration-[#F2A31B] decoration-2' : 'text-[#524C61]'}>
                Delhi CP
              </span>
              <span className={activeWaypoint === 'corridor' ? 'text-[#D8472B] underline decoration-[#F2A31B] decoration-2' : 'text-[#524C61]'}>
                Elevated Corridor
              </span>
              <span className={activeWaypoint === 'cyberhub' ? 'text-[#D8472B] underline decoration-[#F2A31B] decoration-2' : 'text-[#524C61]'}>
                Gurgaon CyberHub
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#E5DEC9] overflow-hidden">
              <div
                className="h-full bg-[#D8472B] transition-all duration-300"
                style={{
                  width:
                    activeWaypoint === 'delhi'
                      ? '25%'
                      : activeWaypoint === 'corridor'
                      ? '65%'
                      : '100%',
                }}
              />
            </div>
          </div>

        </div>

        {/* 
          Right Column: Bottom-Right Compact Floating Route Comparison Card 
          Does not cover the auto.
          Gentle 3s float animation, thin ink border, marigold shadow.
          On mobile, shows as inline card below content.
        */}
        <div className="lg:col-span-5 flex justify-end items-end pt-4 lg:pt-28">
          <div className="w-full max-w-[320px] p-3.5 rounded-xl bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[4px_4px_0_#F2A31B] space-y-2.5 animate-float-gentle relative z-10">
            
            <div className="flex items-center justify-between text-[11px] font-bold text-[#14121F] border-b-[1.2px] border-[#14121F]/15 pb-2">
              <span className="flex items-center gap-1.5 text-[#D8472B]">
                <Clock className="w-3.5 h-3.5" />
                Live Route Comparison
              </span>
              <span className="text-[10px] text-[#524C61] flex items-center gap-1">
                <NavIcon className="w-3 h-3 text-[#1F6F6B]" />
                CP → CyberHub
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {/* Fastest chip */}
              <div
                className={`p-2 rounded-lg border-[1.2px] text-center transition-all ${
                  activeChip === 'fastest'
                    ? 'bg-[#FDF0ED] border-[#D8472B] ring-2 ring-[#D8472B]/30 shadow-[1px_1px_0_#D8472B]'
                    : 'bg-[#FAF5EC] border-[#E5DEC9] opacity-80'
                }`}
              >
                <div className="text-[9px] font-bold text-[#D8472B] uppercase">Fastest</div>
                <div className="text-xs font-black text-[#14121F]">32 min</div>
              </div>

              {/* Safest chip */}
              <div
                className={`p-2 rounded-lg border-[1.2px] text-center transition-all ${
                  activeChip === 'safest'
                    ? 'bg-[#EAF4F3] border-[#1F6F6B] ring-2 ring-[#1F6F6B]/30 shadow-[1px_1px_0_#1F6F6B]'
                    : 'bg-[#FAF5EC] border-[#E5DEC9] opacity-80'
                }`}
              >
                <div className="text-[9px] font-bold text-[#1F6F6B] uppercase">Safest</div>
                <div className="text-xs font-black text-[#14121F]">35 min</div>
              </div>

              {/* Scenic chip */}
              <div
                className={`p-2 rounded-lg border-[1.2px] text-center transition-all ${
                  activeChip === 'scenic'
                    ? 'bg-[#FEF8EA] border-[#F2A31B] ring-2 ring-[#F2A31B]/40 shadow-[1px_1px_0_#F2A31B]'
                    : 'bg-[#FAF5EC] border-[#E5DEC9] opacity-80'
                }`}
              >
                <div className="text-[9px] font-bold text-[#C98109] uppercase">Scenic</div>
                <div className="text-xs font-black text-[#14121F]">41 min</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5 text-[10px] text-[#524C61] font-semibold">
              <span>Telemetry: Active</span>
              <span className="text-[#14121F] font-bold">Signal-free 78%</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
