import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ROUTE_PROFILES } from '@/data/routeProfilesData';

interface RouteProfilesSectionProps {
  onSelectRoute: () => void;
}

export const RouteProfilesSection: React.FC<RouteProfilesSectionProps> = ({ onSelectRoute }) => {
  return (
    <section id="route-profiles" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Jaali separator */}
      <div className="jaali-border-divider mb-12 opacity-60" aria-hidden="true" />

      {/* Section Header */}
      <div className="reveal-on-scroll text-center mb-12 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black text-[#14121F] font-display tracking-tight">
          6 Ways to Travel Your City
        </h2>
        <p className="text-sm text-[#524C61] max-w-xl mx-auto leading-relaxed">
          Every Indian commute has different priorities. Select the routing model that fits your travel hour, road surface preference, or budget.
        </p>
      </div>

      {/* 6 Specialized Route Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROUTE_PROFILES.map((profile, idx) => {
          const Icon = profile.icon;
          const delayClass = [
            'delay-100',
            'delay-150',
            'delay-200',
            'delay-250',
            'delay-300',
            'delay-350',
          ][idx % 6];

          return (
            <div
              key={profile.id}
              onClick={onSelectRoute}
              className={`reveal-on-scroll ${delayClass} p-6 rounded-2xl bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] hover:-translate-y-1 hover:shadow-[5px_5px_0_#14121F] transition-all duration-200 cursor-pointer group text-left space-y-4`}
            >
              {/* Top Row: Icon only */}
              <div className="flex items-center justify-between">
                <div
                  className="w-11 h-11 rounded-xl border-[1.5px] border-[#14121F] shadow-[2px_2px_0_#14121F] flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: profile.bgTint, color: profile.accentColor }}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#14121F] font-sans group-hover:text-[#D8472B] transition-colors">
                  {profile.title}
                </h3>
                <p className="text-xs text-[#524C61] leading-relaxed min-h-[44px]">
                  {profile.desc}
                </p>
              </div>

              {/* Metrics Breakdown */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t-[1.2px] border-[#14121F]/15 text-center">
                <div className="p-1.5 rounded-lg bg-[#FAF5EC] border border-[#14121F]/10">
                  <div className="text-[9px] text-[#524C61] uppercase font-bold truncate">
                    {profile.stats.stat1.label}
                  </div>
                  <div className="text-[11px] font-black text-[#14121F] mt-0.5 truncate">
                    {profile.stats.stat1.value}
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FAF5EC] border border-[#14121F]/10">
                  <div className="text-[9px] text-[#524C61] uppercase font-bold truncate">
                    {profile.stats.stat2.label}
                  </div>
                  <div className="text-[11px] font-black text-[#14121F] mt-0.5 truncate">
                    {profile.stats.stat2.value}
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FAF5EC] border border-[#14121F]/10">
                  <div className="text-[9px] text-[#524C61] uppercase font-bold truncate">
                    {profile.stats.stat3.label}
                  </div>
                  <div className="text-[11px] font-black text-[#14121F] mt-0.5 truncate">
                    {profile.stats.stat3.value}
                  </div>
                </div>
              </div>

              {/* Best for Footer */}
              <div className="pt-2 border-t-[1.2px] border-[#14121F]/15 flex items-center justify-between text-xs">
                <span className="text-[#524C61] text-[11px] font-semibold">Recommended for:</span>
                <span className="font-bold text-xs" style={{ color: profile.tagColor }}>
                  {profile.bestFor}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RouteProfilesSection;
