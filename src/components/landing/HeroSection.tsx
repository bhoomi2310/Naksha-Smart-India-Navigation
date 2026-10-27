import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import autoRickshawImage from '@/assets/auto-rickshaw.png';

interface HeroSectionProps {
  onStartNavigation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartNavigation }) => {
  const scrollToProfiles = () => {
    const el = document.getElementById('route-profiles');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-12 pb-16">
      
      {/* Layer 1: Static Auto Rickshaw Background + Deep Black Gradient Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Static Perspective Road Markings */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-[40%] opacity-20"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #f97316 60%, transparent 40%)',
            backgroundSize: '4px 48px',
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'center top',
            maskImage: 'linear-gradient(to bottom, transparent, black 35%, black 90%, transparent)'
          }}
        />

        {/* Auto Rickshaw Image - Completely STATIC (no movement), distinctly visible yet deeply merged into black */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.52] sm:opacity-[0.60] filter brightness-105 contrast-110 saturate-[1.2] transition-opacity duration-500 mix-blend-screen"
          style={{ 
            backgroundImage: `url(${autoRickshawImage})`,
            backgroundPosition: 'center 46%',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 48%, black 38%, rgba(0,0,0,0.75) 65%, transparent 95%)',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 48%, black 38%, rgba(0,0,0,0.75) 65%, transparent 95%)'
          }}
        />

        {/* Soft Warm Headlight Ambient Glow (Static) */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[500px] h-[280px] bg-gradient-to-b from-amber-400/20 via-orange-500/10 to-transparent blur-3xl rounded-full pointer-events-none opacity-80" />

        {/* Layer 2: Increased Black Gradient & Vignette Overlays - Deep, seamless obsidian merge */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 48%, transparent 15%, rgba(9,9,11,0.6) 52%, rgba(9,9,11,0.92) 78%, #09090b 98%)'
          }}
        />
        {/* Additional vertical dark gradient veil to seamlessly merge the auto deeper */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/75 via-transparent to-zinc-950 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 via-zinc-950/85 to-transparent pointer-events-none" />
        
        {/* Layer 3: Ambient Glowing Orange & Amber Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">

        {/* Clean, Human Headline Explicitly Mentioning Built for India */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] transition-colors duration-200">
          Navigation Built for India.
          <br />
          <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 bg-clip-text text-transparent sassy-shimmer-text">
            Fastest, Safest, or Scenic.
          </span>
        </h1>

        {/* Concise, Non-Repetitive Subhead */}
        <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed transition-colors duration-200">
          Compare routes based on what matters to you: avoid traffic choke points, stick to well-lit roads after dark, or take peaceful heritage boulevards.
        </p>

        {/* Sassy Interactive Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Button
            size="lg"
            onClick={onStartNavigation}
            className="sassy-btn btn-shimmer bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-6 rounded-2xl text-base shadow-xl shadow-orange-600/30 transition-all"
          >
            Start Navigation
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={scrollToProfiles}
            className="sassy-btn bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 px-7 py-6 rounded-2xl text-base backdrop-blur-md transition-all hover:border-orange-500/50"
          >
            <Compass className="mr-2 w-4 h-4 text-orange-400" />
            Explore 6 Profiles
          </Button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
