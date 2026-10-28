import React from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { Zap, Shield, Leaf, Camera, IndianRupee, Users } from 'lucide-react';

interface RouteQuickSelectorProps {
  routes: RouteOptionData[];
  selectedRouteId: string;
  onSelectRoute: (routeId: string) => void;
}

export const RouteQuickSelector: React.FC<RouteQuickSelectorProps> = ({
  routes,
  selectedRouteId,
  onSelectRoute,
}) => {
  if (!routes || routes.length === 0) return null;

  const getRouteIcon = (id: string) => {
    switch (id) {
      case 'fastest':
        return <Zap className="w-3 h-3 text-amber-300" />;
      case 'safest':
        return <Shield className="w-3 h-3 text-emerald-300" />;
      case 'eco':
        return <Leaf className="w-3 h-3 text-lime-300" />;
      case 'scenic':
        return <Camera className="w-3 h-3 text-sky-300" />;
      case 'cheapest':
        return <IndianRupee className="w-3 h-3 text-purple-300" />;
      case 'popular':
        return <Users className="w-3 h-3 text-orange-300" />;
      default:
        return <Zap className="w-3 h-3 text-orange-300" />;
    }
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-1.5 pb-1">
      {routes.map((route) => {
        const isSelected = selectedRouteId === route.id;
        return (
          <button
            key={route.id}
            type="button"
            onClick={() => onSelectRoute(route.id)}
            className={`group relative px-2 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 text-center border overflow-hidden ${
              isSelected
                ? 'bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-600/30 scale-[1.02] ring-1 ring-orange-400/50'
                : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:border-orange-500/40 hover:text-white'
            }`}
          >
            {/* Active Top Highlight */}
            {isSelected && (
              <div className="absolute top-0 inset-x-0 h-0.5 bg-amber-300" />
            )}

            <div className="flex items-center justify-center gap-1 font-bold truncate text-[11px]">
              {getRouteIcon(route.id)}
              <span>{route.type.split(' ')[0]}</span>
            </div>

            <div
              className={`text-[10px] mt-0.5 ${
                isSelected
                  ? 'text-orange-100 font-semibold'
                  : 'text-zinc-400 group-hover:text-zinc-300'
              }`}
            >
              {route.durationStr}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RouteQuickSelector;
