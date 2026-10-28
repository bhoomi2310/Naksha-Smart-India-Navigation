import React, { useState } from 'react';
import { RouteOptionData } from '@/lib/routingService';
import RouteCard from '@/components/RouteCard';
import RouteQuickSelector from './RouteQuickSelector';
import { RouteCalculationLoader } from '@/components/NakshaLoader';
import { Compass, ChevronDown, LayoutGrid, List, Sparkles } from 'lucide-react';

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
    { label: 'Delhi → Gurgaon', from: 'Connaught Place, Delhi', to: 'Cyber City, Gurgaon' },
    { label: 'Mumbai → BKC', from: 'Chhatrapati Shivaji Airport, Mumbai', to: 'Bandra Kurla Complex, Mumbai' },
    { label: 'Bengaluru IT Corridor', from: 'Indiranagar, Bengaluru', to: 'Electronic City, Bengaluru' },
  ];

  return (
    <div className="space-y-3">
      {/* List Header with Count & View Mode Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-orange-400" />
          <span>Route Profiles</span>
          {routes.length > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
              {routes.length}
            </span>
          )}
        </h2>

        {routes.length > 0 && (
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode('detailed')}
              className={`p-1 rounded-md text-xs transition-colors ${
                viewMode === 'detailed'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Detailed Cards"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compact')}
              className={`p-1 rounded-md text-xs transition-colors ${
                viewMode === 'compact'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Compact View"
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
        <div className="glass-panel rounded-2xl p-6 border border-zinc-800">
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
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-zinc-400 py-1.5 px-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur">
              <ChevronDown className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
              <span>Scroll down to inspect remaining route profiles</span>
            </div>
          )}
        </div>
      ) : (
        /* Elevated Empty State with 1-Click Corridor Starters */
        <div className="glass-panel rounded-2xl p-6 text-center border border-dashed border-zinc-800 hover:border-orange-500/30 transition-all duration-300 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 mx-auto flex items-center justify-center shadow-inner">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Plan Your Journey</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
              Enter your pickup and destination above, or launch a popular Indian corridor:
            </p>
          </div>

          {onSelectStarterCorridor && (
            <div className="flex flex-col gap-2 pt-1">
              {starterCorridors.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => onSelectStarterCorridor(c.from, c.to)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-zinc-900/80 hover:bg-orange-600/15 border border-zinc-800 hover:border-orange-500/40 text-zinc-300 hover:text-white transition-all text-left group"
                >
                  <span className="font-semibold text-[11px]">{c.label}</span>
                  <span className="text-[10px] text-orange-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Load Route →
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
