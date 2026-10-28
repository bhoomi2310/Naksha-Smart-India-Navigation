import React, { useState } from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { RouteCard } from '@/components/RouteCard';
import { RouteQuickSelector } from './RouteQuickSelector';
import { RouteCalculationLoader } from '@/components/NakshaLoader';
import { Compass, List, LayoutGrid, ChevronDown } from 'lucide-react';

interface RouteProfilesListProps {
  routes: RouteOptionData[];
  selectedRouteId: string;
  isLoading: boolean;
  onSelectRoute: (id: string) => void;
  onStartNavigation: (route: RouteOptionData) => void;
  onSelectStarterCorridor?: (from: string, to: string) => void;
}

export const RouteProfilesList: React.FC<RouteProfilesListProps> = ({
  routes,
  selectedRouteId,
  isLoading,
  onSelectRoute,
  onStartNavigation,
  onSelectStarterCorridor,
}) => {
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');

  const starterCorridors = [
    { label: 'Delhi → Gurgaon CyberHub', from: 'Connaught Place, Delhi', to: 'Cyber City, Gurgaon' },
    { label: 'Mumbai → Bandra Kurla Complex', from: 'Chhatrapati Shivaji Airport, Mumbai', to: 'Bandra Kurla Complex, Mumbai' },
    { label: 'Bengaluru IT Corridor', from: 'Indiranagar, Bengaluru', to: 'Electronic City, Bengaluru' },
  ];

  return (
    <div className="space-y-3">
      {/* List Header with Count & View Mode Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[#14121F] flex items-center gap-1.5 font-display">
          <Compass className="w-4 h-4 text-[#D8472B]" />
          <span>Available Routes</span>
        </h2>

        {routes.length > 0 && (
          <div className="flex items-center gap-1 bg-[#FFFDF9] border-[1.2px] border-[#14121F] p-0.5 rounded-lg shadow-[1px_1px_0_#14121F]">
            <button
              type="button"
              onClick={() => setViewMode('detailed')}
              className={`p-1 rounded-md text-xs transition-colors ${
                viewMode === 'detailed'
                  ? 'bg-[#D8472B] text-white shadow-sm'
                  : 'text-[#524C61] hover:text-[#14121F]'
              }`}
              title="Detailed Cards"
              aria-label="Detailed cards view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compact')}
              className={`p-1 rounded-md text-xs transition-colors ${
                viewMode === 'compact'
                  ? 'bg-[#D8472B] text-white shadow-sm'
                  : 'text-[#524C61] hover:text-[#14121F]'
              }`}
              title="Compact View"
              aria-label="Compact view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Quick 1-Click Route Pill Switcher */}
      {routes.length > 0 && (
        <RouteQuickSelector
          routes={routes}
          selectedRouteId={selectedRouteId}
          onSelectRoute={(id) => {
            onSelectRoute(id);
            const container = document.getElementById('routes-scroll-container');
            const el = document.getElementById(`route-card-${id}`);
            if (container && el) {
              const topPos = el.offsetTop - container.offsetTop;
              container.scrollTo({ top: topPos, behavior: 'smooth' });
            }
          }}
        />
      )}

      {/* Main Content: Loading, List, or Empty State */}
      {isLoading ? (
        <div className="rounded-2xl p-6">
          <RouteCalculationLoader message="Computing Indian Road Routes & Live Traffic..." />
        </div>
      ) : routes.length > 0 ? (
        <div className="space-y-2">
          <div
            id="routes-scroll-container"
            className="space-y-2.5 max-h-[560px] overflow-y-auto pr-2 custom-scrollbar-visible scroll-smooth"
          >
            {routes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                compact={viewMode === 'compact'}
                isSelected={selectedRouteId === route.id}
                onSelect={() => onSelectRoute(route.id)}
                onStartNavigate={() => {
                  onSelectRoute(route.id);
                  onStartNavigation(route);
                }}
              />
            ))}
          </div>

          {/* Visible Scroll Down Indicator */}
          {routes.length > 2 && (
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#524C61] py-1.5 px-3 rounded-lg bg-[#FAF5EC] border-[1.2px] border-[#14121F]">
              <ChevronDown className="w-3.5 h-3.5 text-[#D8472B] animate-bounce" />
              <span>Scroll down to inspect remaining route profiles</span>
            </div>
          )}
        </div>
      ) : (
        /* Elevated Empty State with 1-Click Corridor Starters */
        <div className="rounded-2xl p-6 text-center bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FDF0ED] border-[1.5px] border-[#D8472B] text-[#D8472B] mx-auto flex items-center justify-center shadow-[2px_2px_0_#14121F]">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#14121F] font-display">Plan Your Journey</h3>
            <p className="text-xs text-[#524C61] mt-1 max-w-xs mx-auto leading-relaxed">
              Enter starting point and destination above, or pick a popular Indian corridor to test:
            </p>
          </div>

          {onSelectStarterCorridor && (
            <div className="flex flex-col gap-2 pt-1">
              {starterCorridors.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => onSelectStarterCorridor(c.from, c.to)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs bg-[#FAF5EC] hover:bg-[#FEF8EA] border-[1.2px] border-[#14121F] shadow-[2px_2px_0_#14121F] text-[#14121F] transition-all text-left group"
                >
                  <span className="font-bold text-[11px]">{c.label}</span>
                  <span className="text-[11px] font-bold text-[#D8472B] group-hover:translate-x-0.5 transition-transform">
                    View Route &rarr;
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RouteProfilesList;
