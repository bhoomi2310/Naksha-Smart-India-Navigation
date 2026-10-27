import React from 'react';
import { Clock, ShieldCheck, Compass, Leaf, Train, AlertTriangle, ArrowRight } from 'lucide-react';

interface RouteProfilesSectionProps {
  onSelectRoute: () => void;
}

export const RouteProfilesSection: React.FC<RouteProfilesSectionProps> = ({ onSelectRoute }) => {
  const cards = [
    {
      title: 'Fastest Route',
      desc: 'Optimized via signal-free elevated flyovers and arterial expressways to skip ground-level bottlenecks and red lights.',
      bestFor: 'Morning & evening rush',
      icon: Clock,
      themeColor: 'blue',
      borderHover: 'hover:border-blue-500/50',
      iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      badgeColor: 'text-blue-400',
      delayClass: 'delay-100',
    },
    {
      title: 'Safest Route',
      desc: 'Avoids unlit alleys, broken pavements, and isolated patches. Guides you through well-lit avenues with verified police booths.',
      bestFor: 'Solo drivers & night travel',
      icon: ShieldCheck,
      themeColor: 'emerald',
      borderHover: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      badgeColor: 'text-emerald-400',
      delayClass: 'delay-150',
    },
    {
      title: 'Scenic Heritage Route',
      desc: 'Curves past iconic Indian monuments, lush botanical gardens, and wide tree-lined avenues for a calm, relaxing journey.',
      bestFor: 'Weekend & peaceful leisure',
      icon: Compass,
      themeColor: 'amber',
      borderHover: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      badgeColor: 'text-amber-400',
      delayClass: 'delay-200',
    },
    {
      title: 'Eco-Saver Route',
      desc: 'Minimizes stop-and-go red signal idling and steep gradients. Keeps a steady 45 km/h cruising speed to cut petrol usage and tailpipe emissions.',
      bestFor: 'Daily office budget & EV cars',
      icon: Leaf,
      themeColor: 'lime',
      borderHover: 'hover:border-lime-500/50',
      iconBg: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
      badgeColor: 'text-lime-400',
      delayClass: 'delay-250',
    },
    {
      title: 'Metro + Transit Route',
      desc: 'Combines rapid AC Metro lines with electric feeder buses and official auto meter fares. Beats monsoon jams with zero parking stress.',
      bestFor: 'Monsoon rains & saving ₹180+',
      icon: Train,
      themeColor: 'cyan',
      borderHover: 'hover:border-cyan-500/50',
      iconBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      badgeColor: 'text-cyan-400',
      delayClass: 'delay-300',
    },
    {
      title: 'Pothole & Flood-Free Route',
      desc: 'Dynamically detours around waterlogged underpasses, deep craters, and road construction verified by local commuters.',
      bestFor: 'Protecting tyres & suspension',
      icon: AlertTriangle,
      themeColor: 'orange',
      borderHover: 'hover:border-orange-500/50',
      iconBg: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      badgeColor: 'text-orange-400',
      delayClass: 'delay-350',
    },
  ];

  return (
    <section id="route-profiles" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Section Header with Scroll Reveal */}
      <div className="reveal-on-scroll text-center mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          6 Ways to Travel
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          Choose the route profile that fits your schedule, safety needs, or mood. Built specifically for diverse Indian commute realities.
        </p>
      </div>

      {/* 6 Specialized Route Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={onSelectRoute}
              className={`reveal-on-scroll ${card.delayClass} sassy-card-lift p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 ${card.borderHover} cursor-pointer group text-left space-y-3.5 shadow-xl relative overflow-hidden backdrop-blur-sm`}
            >
              {/* Top Row: Icon with Zoom and Glow effect */}
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${card.iconBg} border flex items-center justify-center icon-glow-box`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-lg bg-zinc-800/80 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:border group-hover:border-orange-500/30 transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all duration-300" />
                </div>
              </div>

              {/* Clean Title */}
              <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-zinc-400 leading-relaxed min-h-[44px]">
                {card.desc}
              </p>

              {/* Footer Metric / Best For */}
              <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-500 text-[11px] font-medium">Best for</span>
                <span className={`${card.badgeColor} font-semibold text-xs`}>{card.bestFor}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RouteProfilesSection;
