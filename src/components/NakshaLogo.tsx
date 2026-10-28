import React from 'react';

interface NakshaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'vermilion' | 'ink';
  className?: string;
}

export const NakshaLogo: React.FC<NakshaLogoProps> = ({
  size = 'md',
  showText = true,
  variant = 'vermilion',
  className = '',
}) => {
  const boxDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }[size];

  const arrowDimensions = {
    sm: 16,
    md: 20,
    lg: 24,
  }[size];

  const bgColor = variant === 'vermilion' ? 'bg-[#D8472B]' : 'bg-[#14121F]';
  const arrowFill = '#FFFDF9';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 45-Degree Northeast Tilted Navigation Pointer in Rounded Squircle with Hard Ink Border */}
      <div
        className={`${boxDimensions} rounded-xl ${bgColor} border-[1.5px] border-[#14121F] shadow-[2px_2px_0_#14121F] flex items-center justify-center flex-shrink-0 transition-transform hover:-translate-y-0.5`}
        aria-hidden="true"
      >
        <svg
          width={arrowDimensions}
          height={arrowDimensions}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Northeast Navigation Pointer: tip at (50, 14), barbs at (36.5, 50) and (14, 27.5), notch at (30.5, 33.5) */}
          <polygon
            points="50,14 36.5,50 30.5,33.5 14,27.5"
            fill={arrowFill}
            stroke="#14121F"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-baseline gap-1.5">
            <span
              lang="hi"
              className="text-[#D8472B] font-bold text-lg tracking-tight font-devanagari"
            >
              नक्शा
            </span>
            <span className="text-[#14121F] font-bold text-lg tracking-tight font-display">
              Naksha
            </span>
          </div>
          <span className="text-[10px] text-[#524C61] font-semibold tracking-wider mt-0.5">
            Built for India
          </span>
        </div>
      )}
    </div>
  );
};

export default NakshaLogo;
