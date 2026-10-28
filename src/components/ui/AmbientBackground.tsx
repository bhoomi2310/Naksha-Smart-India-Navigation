import React from 'react';

interface AmbientBackgroundProps {
  variant?: 'console' | 'hero' | 'subtle' | 'minimal';
  showGrid?: boolean;
  className?: string;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  variant = 'console',
  showGrid = true,
  className = '',
}) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-zinc-950 ${className}`}
      aria-hidden="true"
    >
      {/* Dynamic Animated Ambient Orbs */}
      <div className="absolute inset-0">
        {/* Primary Saffron Core Beacon - Top Center-Right */}
        <div
          className={`absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full blur-[130px] opacity-25 dark:opacity-30 mix-blend-screen animate-mesh-float-1 transition-opacity duration-1000 ${
            variant === 'hero' ? 'opacity-35 w-[750px] h-[750px]' : ''
          }`}
          style={{
            background:
              'radial-gradient(circle, rgba(249, 115, 22, 0.7) 0%, rgba(234, 88, 12, 0.3) 50%, transparent 70%)',
          }}
        />

        {/* Secondary NavIC Satellite Cyan Orb - Bottom Left */}
        <div
          className="absolute -bottom-24 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 dark:opacity-20 mix-blend-screen animate-mesh-float-2 transition-opacity duration-1000"
          style={{
            background:
              'radial-gradient(circle, rgba(20, 184, 166, 0.6) 0%, rgba(13, 148, 136, 0.2) 50%, transparent 70%)',
          }}
        />

        {/* Tertiary Indian Saffron Warm Accent - Top Left */}
        <div
          className="absolute top-1/3 -left-32 w-[450px] h-[450px] rounded-full blur-[150px] opacity-10 dark:opacity-15 mix-blend-screen animate-mesh-float-3"
          style={{
            background:
              'radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, rgba(217, 119, 6, 0.2) 60%, transparent 75%)',
          }}
        />

        {/* Night Transit Violet Resonance - Bottom Right */}
        <div
          className="absolute bottom-10 right-0 w-[420px] h-[420px] rounded-full blur-[135px] opacity-10 dark:opacity-15 mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Cyber Navigation Matrix Grid */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.14] dark:opacity-[0.18]"
          style={{
            backgroundImage: `
              radial-gradient(rgba(249, 115, 22, 0.4) 1px, transparent 1px),
              radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px, 16px 16px',
            backgroundPosition: '0 0, 8px 8px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 85%)',
          }}
        />
      )}

      {/* Subtle Top Radar Coordinate Lines */}
      <div
        className="absolute top-0 inset-x-0 h-40 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '120px 100%',
        }}
      />

      {/* Deep Vignette Shadow to Anchor UI Content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 40%, rgba(9, 9, 11, 0.65) 100%)',
        }}
      />
    </div>
  );
};

export default AmbientBackground;
