import React from 'react';

interface AmbientBackgroundProps {
  variant?: 'console' | 'hero' | 'subtle' | 'minimal';
  showGrid?: boolean;
  className?: string;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  showGrid = true,
  className = '',
}) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#F6EFE3] ${className}`}
      aria-hidden="true"
    >
      {/* Paper grain SVG noise texture overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none" />

      {/* Subtle warm cartographic / paper grid lines */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(20, 18, 31, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(20, 18, 31, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Very subtle warm marigold corner tint (not a blurry blob, just warm paper vignette) */}
      <div 
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #F2A31B 0%, #D8472B 40%, transparent 70%)'
        }}
      />
    </div>
  );
};

export default AmbientBackground;
