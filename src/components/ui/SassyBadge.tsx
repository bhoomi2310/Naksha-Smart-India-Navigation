import React from 'react';

interface SassyBadgeProps {
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  variant?: 'saffron' | 'emerald' | 'cyan' | 'amber' | 'purple';
  pulse?: boolean;
  className?: string;
  onClick?: () => void;
}

const colorMap = {
  saffron: {
    bg: 'bg-orange-500/10 hover:bg-orange-500/20',
    border: 'border-orange-500/30 hover:border-orange-500/60',
    text: 'text-orange-400',
    dot: 'bg-orange-500',
    ping: 'bg-orange-400',
    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.18)]',
  },
  emerald: {
    bg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
    ping: 'bg-emerald-400',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.18)]',
  },
  cyan: {
    bg: 'bg-cyan-500/10 hover:bg-cyan-500/20',
    border: 'border-cyan-500/30 hover:border-cyan-500/60',
    text: 'text-cyan-400',
    dot: 'bg-cyan-500',
    ping: 'bg-cyan-400',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.18)]',
  },
  amber: {
    bg: 'bg-amber-500/10 hover:bg-amber-500/20',
    border: 'border-amber-500/30 hover:border-amber-500/60',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
    ping: 'bg-amber-400',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.18)]',
  },
  purple: {
    bg: 'bg-purple-500/10 hover:bg-purple-500/20',
    border: 'border-purple-500/30 hover:border-purple-500/60',
    text: 'text-purple-400',
    dot: 'bg-purple-500',
    ping: 'bg-purple-400',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.18)]',
  },
};

export const SassyBadge: React.FC<SassyBadgeProps> = ({
  label,
  sublabel,
  icon,
  variant = 'saffron',
  pulse = true,
  className = '',
  onClick,
}) => {
  const c = colorMap[variant];

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-md transition-all duration-300 ${
        c.bg
      } ${c.border} ${c.text} ${c.glow} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'
      } ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 mr-0.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.ping}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${c.dot}`} />
        </span>
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
      {sublabel && (
        <span className="text-zinc-500 dark:text-zinc-400 font-normal ml-0.5">
          · {sublabel}
        </span>
      )}
    </span>
  );
};

export default SassyBadge;
