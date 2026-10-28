import React from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { 
  Clock, 
  MapPin, 
  Check, 
  Shield, 
  Leaf, 
  Camera, 
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
      case 'fastest': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'safest': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'eco': return <Leaf className="w-4 h-4 text-lime-400" />;
      case 'scenic': return <Camera className="w-4 h-4 text-amber-400" />;
      case 'cheapest': return <IndianRupee className="w-4 h-4 text-purple-400" />;
      case 'popular': return <Users className="w-4 h-4 text-orange-400" />;
      default: return <Navigation className="w-4 h-4 text-orange-400" />;
    }
  };

  // Compact View: streamlined for fast comparison
  if (compact) {
    return (
      <div
        id={`route-card-${route.id}`}
        onClick={onSelect}
        className={`group cursor-pointer rounded-xl px-3.5 py-2.5 transition-all duration-200 border ${
          isSelected
            ? 'bg-zinc-900 border-orange-500 shadow-md text-white'
            : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700 text-zinc-300'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
              isSelected 
                ? 'bg-orange-500/15 border-orange-500/40 text-orange-400' 
                : 'bg-zinc-800 border-zinc-700'
            }`}>
              {getIcon()}
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-xs truncate text-white">
                {route.type}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                <span className="font-bold text-white">
                  {route.durationStr}
                </span>
                <span>•</span>
                <span>{route.distanceStr}</span>
                <span>•</span>
                <span className={route.roadQualityIndex >= 85 ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                  RQI {route.roadQualityIndex}
                </span>
                <span>•</span>
                <span className="text-zinc-300 font-medium">
                  {route.id === 'cheapest' ? `₹${route.totalTransitFareInr || 45}` : `₹${route.autoFareInr}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            {isSelected ? (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartNavigate?.();
                }}
                className="h-7 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-medium"
              >
                Drive
              </Button>
            ) : (
              <span className="text-xs text-zinc-400 group-hover:text-white px-2 py-1 transition-colors">
                Select
              </span>
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
      className={`group cursor-pointer rounded-2xl p-4 transition-all duration-200 border scroll-mt-2 ${
        isSelected
          ? 'bg-zinc-900 border-orange-500 shadow-md text-white'
          : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700 text-zinc-300'
      }`}
    >
      {/* Top Header: Title, Icon & ETA */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
            isSelected 
              ? 'bg-orange-500/15 border-orange-500/40 text-orange-400' 
              : 'bg-zinc-800 border-zinc-700'
          }`}>
            {getIcon()}
          </div>
          <div>
            <h4 className="font-bold text-sm text-white group-hover:text-orange-400 transition-colors">
              {route.type}
            </h4>
            <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
              {route.summary}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 text-right">
          {isSelected ? (
            <div className="flex items-center gap-1 text-xs font-semibold text-orange-400">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Selected</span>
            </div>
          ) : (
            <span className="text-xs text-zinc-400 font-medium">ETA {route.eta}</span>
          )}
        </div>
      </div>

      {/* Primary Metrics: Duration & Distance */}
      <div className="grid grid-cols-2 gap-2 my-2.5 p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
        <div>
          <div className="text-[11px] text-zinc-400">Duration</div>
          <div className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            {route.durationStr}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-zinc-400">Distance</div>
          <div className="text-sm font-bold text-zinc-200 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            {route.distanceStr}
          </div>
        </div>
      </div>

      {/* Road Intelligence: Pavement & Lighting */}
      <div className="flex items-center justify-between text-xs py-2 border-t border-zinc-800/80 text-zinc-300">
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-zinc-400">Road Quality:</span>
          <span className={`font-semibold ${
            route.roadQualityIndex >= 85 ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            {route.roadQualityIndex}/100
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Moon className="w-3 h-3 text-purple-400" />
          <span className="text-zinc-300 font-medium">{route.lightingScore}% Lit</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-zinc-400">Potholes:</span>
          <span className="text-zinc-300 font-medium">{route.potholeDensity}/km</span>
        </div>
      </div>

      {/* Fare Snapshot & Action */}
      <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/80 text-xs">
        <div className="text-zinc-400">
          {route.id === 'cheapest' ? (
            <span className="text-purple-300 font-medium">
              Metro + Bus: ₹{route.totalTransitFareInr || 45}
            </span>
          ) : (
            <span>
              Auto: <strong className="text-white font-semibold">₹{route.autoFareInr}</strong>
              <span className="text-zinc-600 mx-1.5">•</span>
              Cab: <span className="text-zinc-300">₹{route.cabFareInr}</span>
            </span>
          )}
        </div>

        <Button
          size="sm"
          variant={isSelected ? "default" : "outline"}
          onClick={(e) => {
            e.stopPropagation();
            if (isSelected && onStartNavigate) {
              onStartNavigate();
            } else {
              onSelect();
            }
          }}
          className={`rounded-lg text-xs font-semibold h-7 px-3.5 ${
            isSelected
              ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-sm'
              : 'border-zinc-700 bg-transparent text-zinc-300 hover:text-white hover:bg-zinc-800'
          }`}
        >
          {isSelected ? 'Start Drive' : 'Select'}
        </Button>
      </div>
    </div>
  );
};

export default RouteCard;
