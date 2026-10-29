import React from 'react';

interface AutoRickshawSpriteProps {
  className?: string;
  size?: number;
  isMoving?: boolean;
}

export const AutoRickshawSprite: React.FC<AutoRickshawSpriteProps> = ({
  className = '',
  size = 48,
  isMoving = true,
}) => {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{
        width: size,
        height: (size * 34) / 48,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full overflow-visible ${isMoving ? 'animate-[auto-bob_1.2s_ease-in-out_infinite]' : ''}`}
      >
        {/* Soft shadow under auto */}
        <ellipse cx="32" cy="42" rx="22" ry="3" fill="#14121F" fillOpacity="0.22" />

        {/* Chassis frame & ink shadow */}
        <path
          d="M10 32 H54 L52 38 H14 Z"
          fill="#14121F"
          stroke="#14121F"
          strokeWidth="1.2"
        />

        {/* Main Body - Marigold (#F2A31B) */}
        <path
          d="M14 22 L20 16 H38 L48 24 L52 32 H12 L14 22 Z"
          fill="#F2A31B"
          stroke="#14121F"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Canopy / Roof - Muted Teal (#1F6F6B) */}
        <path
          d="M16 16 C18 10, 32 8, 44 11 L48 16 H16 Z"
          fill="#1F6F6B"
          stroke="#14121F"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Front Windshield glass & pillars */}
        <path
          d="M44 14 L49 23 H42 L39 14 Z"
          fill="#EAF4F3"
          fillOpacity="0.85"
          stroke="#14121F"
          strokeWidth="1.2"
        />

        {/* Side Passenger Opening */}
        <path
          d="M22 18 H36 V30 H22 Z"
          fill="#FFFDF9"
          fillOpacity="0.75"
          stroke="#14121F"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Passenger Seat Backrest */}
        <rect x="23" y="22" width="4" height="8" rx="1.5" fill="#14121F" />

        {/* Vermilion Accent stripe & meter box */}
        <path
          d="M13 27 H51 V29 H13 Z"
          fill="#D8472B"
        />

        {/* Front Headlight (bright white/yellow with vermilion rim) */}
        <circle cx="53" cy="27" r="2.5" fill="#FFFDF9" stroke="#D8472B" strokeWidth="1.2" />

        {/* Back wheel assembly */}
        <g className={isMoving ? 'animate-[spin_0.8s_linear_infinite] origin-[20px_36px]' : ''}>
          <circle cx="20" cy="36" r="6" fill="#14121F" />
          <circle cx="20" cy="36" r="3" fill="#FFFDF9" stroke="#14121F" strokeWidth="1" />
          <line x1="20" y1="31" x2="20" y2="41" stroke="#14121F" strokeWidth="0.8" />
          <line x1="15" y1="36" x2="25" y2="36" stroke="#14121F" strokeWidth="0.8" />
        </g>

        {/* Front wheel assembly */}
        <g className={isMoving ? 'animate-[spin_0.8s_linear_infinite] origin-[46px_37px]' : ''}>
          <circle cx="46" cy="37" r="5" fill="#14121F" />
          <circle cx="46" cy="37" r="2.5" fill="#FFFDF9" stroke="#14121F" strokeWidth="1" />
          <line x1="46" y1="33" x2="46" y2="41" stroke="#14121F" strokeWidth="0.8" />
          <line x1="42" y1="37" x2="50" y2="37" stroke="#14121F" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
};

export default AutoRickshawSprite;

