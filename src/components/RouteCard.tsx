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
}

export const RouteCard: React.FC<RouteCardProps> = ({ 
  route, 
  isSelected, 
  onSelect,
  onStartNavigate 
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

  return (
    <div
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl p-4 transition-colors border text-white ${
        isSelected
          ? 'bg-zinc-900 border-orange-500 shadow-md ring-1 ring-orange-500/50'
          : 'bg-zinc-950/80 hover:bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
      }`}
    >
      {/* Top Tag & Selection Indicator */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 text-[10px] font-medium py-0.5 px-2 rounded-md">
          {route.tag}
        </Badge>
        {isSelected ? (
          <div className="flex items-center gap-1 text-[11px] font-semibold text-orange-400">
            <Check className="w-3 h-3" />
            <span>Active</span>
          </div>
        ) : (
          <span className="text-[11px] text-zinc-400">ETA {route.eta}</span>
        )}
      </div>

      {/* Title & Icon Header */}
      <div className="flex items-start gap-2.5 mb-2.5">
        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
          {getIcon()}
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white group-hover:text-orange-400 transition-colors">
            {route.type}
          </h4>
          <p className="text-xs text-zinc-400 line-clamp-1">
            {route.summary}
          </p>
        </div>
      </div>

      {/* Primary Metrics: Duration & Distance */}
      <div className="grid grid-cols-2 gap-2 my-2.5 p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
        <div>
          <div className="text-[10px] text-zinc-400">Duration</div>
          <div className="text-sm font-bold text-white flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange-400" />
            {route.durationStr}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-400">Distance</div>
          <div className="text-sm font-bold text-zinc-200 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            {route.distanceStr}
          </div>
        </div>
      </div>

      {/* Indian Road Intelligence Badges */}
      <div className="flex items-center justify-between text-xs py-1.5 border-t border-zinc-800/60 text-zinc-300">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-400 uppercase">RQI:</span>
          <span className={`font-semibold ${
            route.roadQualityIndex >= 85 ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            {route.roadQualityIndex}/100
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Moon className="w-3 h-3 text-purple-400" />
          <span className="text-[11px] text-zinc-300">{route.lightingScore}% Lit</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[11px] text-zinc-400">Potholes:</span>
          <span className="text-[11px] text-zinc-300 font-medium">{route.potholeDensity}/km</span>
        </div>
      </div>

      {/* Fare Snapshot & Action */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">
        <div className="text-zinc-400 text-[11px]">
          {route.id === 'cheapest' ? (
            <span className="text-purple-300 font-medium">Metro+Bus: ₹{route.totalTransitFareInr || 45}</span>
          ) : (
            <span>Auto: <strong className="text-amber-300">₹{route.autoFareInr}</strong> • Cab: ₹{route.cabFareInr}</span>
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
          className={`rounded-lg text-xs font-medium h-7 px-3 ${
            isSelected
              ? 'bg-orange-600 hover:bg-orange-500 text-white'
              : 'border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800'
          }`}
        >
          {isSelected ? 'Start Drive' : 'Select'}
        </Button>
      </div>
    </div>
  );
};
export default RouteCard;