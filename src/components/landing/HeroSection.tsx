import React, { useEffect, useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PROFILES } from '@/data/routeProfilesData';
import autoRickshawWebP from '@/assets/auto-rickshaw.webp';

interface HeroSectionProps {
  onStartNavigation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartNavigation }) => {
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
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] overflow-hidden">

      {/*
        HERO BACKGROUND: Auto illustration as full-bleed right panel.
        Positioned absolute on the full-width section — reaches true screen edge.
        Fades into paper background via mask-image — no overlay, no blur.
        On desktop: covers the right 70%, fade starts from 38% left.
        On mobile: top banner with bottom fade.
      */}
      <div
        className={`absolute top-0 pointer-events-none z-0 overflow-hidden ${
          isMobile ? 'w-full h-[260px] right-0' : 'w-[70%] h-full right-0'
        }`}
        style={{
          maskImage: isMobile
            ? 'linear-gradient(to bottom, black 50%, transparent 100%)'
            : 'linear-gradient(to right, transparent 0%, black 38%)',
          WebkitMaskImage: isMobile
            ? 'linear-gradient(to bottom, black 50%, transparent 100%)'
            : 'linear-gradient(to right, transparent 0%, black 38%)',
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
            className="w-full h-full object-cover object-right filter contrast-[1.03] saturate-[1.08]"
          />
          {/* Very light paper wash for legibility */}
          <div className="absolute inset-0 bg-[#F6EFE3]/15 mix-blend-multiply pointer-events-none" />
        </div>
      </div>

      {/* Text content: constrained to max-w-6xl with standard padding */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-14 sm:pb-20 flex items-center min-h-[580px] sm:min-h-[640px]">
        <div className="max-w-[46%] sm:max-w-[50%] lg:max-w-[44%] text-left space-y-5 sm:space-y-6 pt-12 sm:pt-0">

          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] border-[1.2px] border-[#14121F] shadow-[2px_2px_0_#14121F]">
            <span className="w-2 h-2 rounded-full bg-[#D8472B]" aria-hidden="true" />
            <span className="text-[11px] font-bold text-[#14121F] tracking-wide uppercase">
              India&apos;s Commuter Navigation Engine
            </span>
          </div>

          {/*
            Headline: 2 lines on desktop using clamp().
            Line 1: Navigation built for India.
            Line 2: Fastest, Safest, or Scenic.
          */}
          <h1 className="text-[clamp(1.5rem,2.6vw,2.75rem)] font-black text-[#14121F] font-display tracking-tight leading-[1.12] sm:leading-[1.14]">
            Navigation built for India.
            <br />
            <span>Fastest, Safest, or </span>
            <span className="relative inline-block text-[#14121F]">
              <span className="relative z-10">Scenic.</span>
              {/* Hand-drawn marigold swash underline */}
              <svg
                className="absolute left-0 -bottom-2 w-full h-3.5 pointer-events-none overflow-visible"
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

          {/* Human subcopy */}
          <p className="text-sm sm:text-sm text-[#524C61] max-w-full font-normal leading-relaxed pr-4 sm:pr-0">
            Pick routes based on real Indian road conditions: bypass ground-level bottleneck jams via signal-free flyovers, stay on verified illuminated roads after sunset, or take calm tree-lined heritage avenues.
          </p>

          {/* CTAs */}
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

        </div>
      </div>

    </section>);
};

export default HeroSection;
