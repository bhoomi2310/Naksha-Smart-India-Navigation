import React from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { Zap, Shield, Leaf, Compass, IndianRupee, Users } from 'lucide-react';

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
        return <Zap className="w-3 h-3 text-[#D8472B]" />;
      case 'safest':
        return <Shield className="w-3 h-3 text-[#1F6F6B]" />;
      case 'eco':
        return <Leaf className="w-3 h-3 text-[#2E7D32]" />;
      case 'scenic':
        return <Compass className="w-3 h-3 text-[#C98109]" />;
      case 'cheapest':
        return <IndianRupee className="w-3 h-3 text-[#1961A3]" />;
      case 'popular':
        return <Users className="w-3 h-3 text-[#8C4300]" />;
      default:
        return <Zap className="w-3 h-3 text-[#D8472B]" />;
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
            className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all text-center border-[1.5px] border-[#14121F] ${
              isSelected
                ? 'bg-[#D8472B] text-white shadow-[2px_2px_0_#14121F]'
                : 'bg-[#FFFDF9] text-[#14121F] hover:bg-[#FAF5EC]'
            }`}
          >
            <div className="flex items-center justify-center gap-1 truncate text-[11px]">
              <span className={isSelected ? 'text-white' : ''}>{getRouteIcon(route.id)}</span>
              <span>{route.type.split(' ')[0]}</span>
            </div>

            <div
              className={`text-[10px] mt-0.5 ${
                isSelected
                  ? 'text-[#FFFDF9] font-bold'
                  : 'text-[#524C61] font-semibold'
              }`}
            >
              {Math.round(route.duration / 60)} min
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RouteQuickSelector;
