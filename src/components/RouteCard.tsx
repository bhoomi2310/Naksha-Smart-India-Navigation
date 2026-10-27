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
import { Badge } from '@/components/ui/badge';
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
      case 'fastest': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'safest': return <Shield className="w-4 h-4 text-emerald-500" />;
      case 'eco': return <Leaf className="w-4 h-4 text-lime-500" />;
      case 'scenic': return <Camera className="w-4 h-4 text-amber-500" />;
      case 'cheapest': return <IndianRupee className="w-4 h-4 text-purple-500" />;
      case 'popular': return <Users className="w-4 h-4 text-orange-500" />;
      default: return <Navigation className="w-4 h-4 text-orange-500" />;
    }
  };

  // Compact Mode: All 6 routes fit in the viewport without scrolling!
  if (compact) {
    return (
      <div
        id={`route-card-${route.id}`}
        onClick={onSelect}
        className={`group cursor-pointer rounded-xl px-3 py-2.5 transition-all duration-300 border ${
          isSelected
            ? 'bg-zinc-900 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.25)] ring-1 ring-orange-500/50 text-white scale-[1.01]'
            : 'bg-zinc-950/80 hover:bg-zinc-900/90 border-zinc-800 hover:border-orange-500/40 text-white hover:scale-[1.008]'
        }`}
      >
        <div className="flex items-center justify-between gap-2.5">
          {/* Left: Icon & Route Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-transform group-hover:scale-110 ${
              isSelected 
                ? 'bg-orange-500/15 border-orange-500/40 text-orange-400' 
                : 'bg-zinc-800 border-zinc-700'
            }`}>
              {getIcon()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-bold text-xs truncate text-white group-hover:text-orange-400 transition-colors">
                  {route.type}
                </h4>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-zinc-800 text-zinc-400">
                  {route.tag}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                <span className="font-bold text-zinc-100 flex items-center gap-0.5">
                  <Clock className="w-3 h-3 text-orange-400" />
                  {route.durationStr}
                </span>
                <span>•</span>
                <span>{route.distanceStr}</span>
                <span>•</span>
                <span className={`font-semibold ${
                  route.roadQualityIndex >= 85 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  RQI {route.roadQualityIndex}
                </span>
                <span>•</span>
                <span className="text-zinc-300 font-medium">
                  {route.id === 'cheapest' ? `₹${route.totalTransitFareInr || 45}` : `₹${route.autoFareInr}`}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Action Button or Indicator */}
          <div className="flex-shrink-0 flex items-center gap-1">
            {isSelected ? (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartNavigate?.();
                }}
                className="sassy-btn h-7 px-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-semibold shadow-md shadow-orange-600/30"
              >
                Drive
              </Button>
            ) : (
              <span className="text-[11px] font-medium text-zinc-400 group-hover:text-orange-400 px-2 py-1 transition-colors">
                Select
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Detailed Mode: Full In-Depth Indian Navigation Card
  return (
    <div
      id={`route-card-${route.id}`}
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl p-3.5 transition-all duration-300 border scroll-mt-2 ${
        isSelected
          ? 'bg-zinc-900 border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.22)] ring-1 ring-orange-500/50 text-white scale-[1.01]'
          : 'bg-zinc-950/80 hover:bg-zinc-900/80 border-zinc-800 hover:border-orange-500/40 text-white hover:scale-[1.008]'
      }`}
    >
      {/* Top Tag & Selection Indicator */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <Badge className="bg-zinc-800/90 text-zinc-300 border-zinc-700/80 text-[10px] font-semibold py-0.5 px-2 rounded-md">
          {route.tag}
        </Badge>
        {isSelected ? (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-[11px] font-bold text-orange-400 shadow-sm">
            <Check className="w-3 h-3 stroke-[2.5]" />
            <span>Active</span>
          </div>
        ) : (
          <span className="text-[11px] text-zinc-400 font-medium">ETA {route.eta}</span>
        )}
      </div>

      {/* Title & Icon Header */}
      <div className="flex items-start gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700 transition-transform group-hover:scale-110">
          {getIcon()}
        </div>
        <div>
          <h4 className="font-bold text-sm text-white group-hover:text-orange-400 transition-colors">
            {route.type}
          </h4>
          <p className="text-xs text-zinc-400 line-clamp-1">
            {route.summary}
          </p>
        </div>
      </div>

      {/* Primary Metrics: Duration & Distance */}
      <div className="grid grid-cols-2 gap-2 my-2 p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
        <div>
          <div className="text-[10px] font-medium text-zinc-400">Duration</div>
          <div className="text-sm font-black text-white flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange-400" />
            {route.durationStr}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-medium text-zinc-400">Distance</div>
          <div className="text-sm font-black text-zinc-200 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            {route.distanceStr}
          </div>
        </div>
      </div>

      {/* Indian Road Intelligence Badges */}
      <div className="flex items-center justify-between text-xs py-1.5 border-t border-zinc-800/60 text-zinc-300">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-400 uppercase font-semibold">RQI:</span>
          <span className={`font-bold ${
            route.roadQualityIndex >= 85 ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            {route.roadQualityIndex}/100
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Moon className="w-3 h-3 text-purple-400" />
          <span className="text-[11px] text-zinc-300 font-medium">{route.lightingScore}% Lit</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[11px] text-zinc-400">Potholes:</span>
          <span className="text-[11px] text-zinc-300 font-medium">{route.potholeDensity}/km</span>
        </div>
      </div>

      {/* Fare Snapshot & Action */}
      <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/70 text-xs">
        <div className="text-zinc-400 text-[11px]">
          {route.id === 'cheapest' ? (
            <span className="inline-flex items-center gap-1 text-purple-300 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
              Metro+Bus: ₹{route.totalTransitFareInr || 45}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              Auto: <strong className="text-amber-300 font-bold">₹{route.autoFareInr}</strong>
              <span className="text-zinc-600">•</span>
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
          className={`sassy-btn rounded-lg text-xs font-semibold h-7 px-3 ${
            isSelected
              ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/30'
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