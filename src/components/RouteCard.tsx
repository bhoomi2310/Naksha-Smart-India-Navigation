import React from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { 
  Clock, 
  MapPin, 
  Check, 
  Shield, 
  Leaf, 
  Compass, 
  IndianRupee, 
  Users, 
  Navigation, 
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RouteCardProps {
  route: RouteOptionData;
  isSelected: boolean;
  onSelect: () => void;
  onStartNavigate?: () => void;
  compact?: boolean;
}

export const RouteCard: React.FC<RouteCardProps> = ({ 
  route, 
  isSelected, 
  onSelect,
  onStartNavigate,
  compact = false
}) => {
  const getIcon = () => {
    switch (route.id) {
      case 'fastest': return <Clock className="w-4 h-4 text-[#D8472B]" />;
      case 'safest': return <Shield className="w-4 h-4 text-[#1F6F6B]" />;
      case 'eco': return <Leaf className="w-4 h-4 text-[#2E7D32]" />;
      case 'scenic': return <Compass className="w-4 h-4 text-[#C98109]" />;
      case 'cheapest': return <IndianRupee className="w-4 h-4 text-[#1961A3]" />;
      case 'popular': return <Users className="w-4 h-4 text-[#8C4300]" />;
      default: return <Navigation className="w-4 h-4 text-[#D8472B]" />;
    }
  };

  // Compact View: streamlined for fast comparison
  if (compact) {
    return (
      <div
        id={`route-card-${route.id}`}
        onClick={onSelect}
        className={`group cursor-pointer rounded-xl px-3.5 py-2.5 transition-all text-left ${
          isSelected
            ? 'bg-[#FFFDF9] border-2 border-[#14121F] shadow-[3px_3px_0_#D8472B] text-[#14121F]'
            : 'bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[2px_2px_0_#14121F] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#14121F] text-[#14121F]'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border-[1.2px] border-[#14121F] ${
              isSelected 
                ? 'bg-[#FDF0ED] text-[#D8472B]' 
                : 'bg-[#FAF5EC] text-[#14121F]'
            }`}>
              {getIcon()}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs truncate group-hover:text-[#D8472B] transition-colors">
                  {route.type}
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8472B]" />
                )}
              </div>
              <div className="text-[11px] text-[#524C61] flex items-center gap-2 mt-0.5">
                <span>{route.durationStr}</span>
                <span>&bull;</span>
                <span>{route.distanceStr}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] font-bold text-[#524C61]">
              ETA {route.eta}
            </span>
            {onStartNavigate && isSelected && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartNavigate();
                }}
                className="h-7 px-2.5 rounded-md ink-btn-primary text-[10px] font-bold flex items-center gap-1"
              >
                <span>Go</span>
                <Navigation className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Detailed View: Clean, human-designed routing card
  return (
    <div
      id={`route-card-${route.id}`}
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl p-4 transition-all scroll-mt-2 text-left ${
        isSelected
          ? 'bg-[#FFFDF9] border-2 border-[#14121F] shadow-[4px_4px_0_#D8472B] text-[#14121F]'
          : 'bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[2px_2px_0_#14121F] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#14121F] text-[#14121F]'
      }`}
    >
      {/* Top Header: Title, Icon & ETA */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border-[1.2px] border-[#14121F] ${
            isSelected 
              ? 'bg-[#FDF0ED] text-[#D8472B]' 
              : 'bg-[#FAF5EC] text-[#14121F]'
          }`}>
            {getIcon()}
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#14121F] group-hover:text-[#D8472B] transition-colors">
              {route.type}
            </h4>
            <p className="text-xs text-[#524C61] line-clamp-1 mt-0.5">
              {route.summary}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 text-right">
          {isSelected ? (
            <div className="flex items-center gap-1 text-xs font-bold text-[#D8472B]">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Selected</span>
            </div>
          ) : (
            <span className="text-xs text-[#524C61] font-semibold">ETA {route.eta}</span>
          )}
        </div>
      </div>

      {/* Primary Metrics: Duration & Distance */}
      <div className="grid grid-cols-2 gap-2 my-2.5 p-2.5 rounded-xl bg-[#FAF5EC] border-[1.2px] border-[#14121F]/15">
        <div>
          <div className="text-[11px] text-[#524C61] font-medium">Duration</div>
          <div className="text-sm font-black text-[#14121F] flex items-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-[#D8472B]" />
            {route.durationStr}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-[#524C61] font-medium">Distance</div>
          <div className="text-sm font-black text-[#14121F] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#1F6F6B]" />
            {route.distanceStr}
          </div>
        </div>
      </div>

      {/* Road Intelligence: Pavement & Lighting */}
      <div className="flex items-center justify-between text-xs py-2 border-t-[1.2px] border-[#14121F]/15 text-[#524C61]">
        <div className="flex items-center gap-1">
          <span className="text-[11px]">Road Quality:</span>
          <span className={`font-bold ${
            route.roadQualityIndex >= 85 ? 'text-[#1F6F6B]' : 'text-[#C98109]'
          }`}>
            {route.roadQualityIndex}/100
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Moon className="w-3 h-3 text-[#1F6F6B]" />
          <span>{route.lightingScore ?? (route as any).nightSafetyIndex ?? 92}% lit</span>
        </div>
      </div>

      {/* Action Footer: Start Navigation */}
      {onStartNavigate && isSelected && (
        <div className="pt-2 border-t-[1.2px] border-[#14121F]/15">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStartNavigate();
            }}
            className="ink-btn-primary w-full text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Start Live Navigation</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default RouteCard;
