import React from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  Shield, 
  Leaf, 
  AlertTriangle, 
  Play, 
  Compass
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TransitFareCard } from './TransitFareCard';

interface RouteDetailsProps {
  routeData: RouteOptionData;
  onStartNavigation?: () => void;
  onReportHazard?: () => void;
}

export const RouteDetails: React.FC<RouteDetailsProps> = ({ 
  routeData, 
  onStartNavigation,
  onReportHazard 
}) => {
  if (!routeData) return null;

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 text-white space-y-5">
      {/* Route Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-zinc-800 text-orange-400 border border-zinc-700 text-xs font-medium py-0.5 px-2.5 rounded-md">
              {routeData.tag}
            </Badge>
            <span className="text-xs text-zinc-400">ETA: {routeData.eta}</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {routeData.type}
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {routeData.summary}
          </p>
        </div>

        {onStartNavigation && (
          <Button
            onClick={onStartNavigation}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-5 rounded-xl text-sm flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            Start Navigation
          </Button>
        )}
      </div>

      {/* Key Telemetry Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl text-center">
          <div className="text-[10px] uppercase text-zinc-400">Distance</div>
          <div className="text-lg font-bold text-white mt-0.5">{routeData.distanceStr}</div>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl text-center">
          <div className="text-[10px] uppercase text-zinc-400">Travel Time</div>
          <div className="text-lg font-bold text-orange-400 mt-0.5">{routeData.durationStr}</div>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl text-center">
          <div className="text-[10px] uppercase text-zinc-400">Road Score (RQI)</div>
          <div className="text-lg font-bold text-emerald-400 mt-0.5">{routeData.roadQualityIndex}/100</div>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl text-center">
          <div className="text-[10px] uppercase text-zinc-400">Streetlights</div>
          <div className="text-lg font-bold text-purple-400 mt-0.5">{routeData.lightingScore}%</div>
        </div>
      </div>

      {/* Multimodal Fare Calculator */}
      <TransitFareCard route={routeData} />

      {/* Road Features */}
      {routeData.features && routeData.features.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-xs text-zinc-300">
            Route Characteristics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {routeData.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-zinc-950/60 border border-zinc-800 p-2.5 rounded-xl text-xs text-zinc-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Turn-by-Turn Steps Preview */}
      {routeData.steps && routeData.steps.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-xs text-zinc-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Turn-by-Turn Maneuvers ({routeData.steps.length} Steps)
            </h4>
            <span className="text-[11px] text-zinc-400">OSRM Step Directions</span>
          </div>

          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 divide-y divide-zinc-800/60 bg-zinc-950/60 rounded-xl p-2.5 border border-zinc-800">
            {routeData.steps.map((step, idx) => (
              <div key={idx} className="flex items-start justify-between py-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-orange-400">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-medium text-white">{step.instruction}</div>
                    <div className="text-[10px] text-zinc-400">{step.name}</div>
                  </div>
                </div>
                <div className="text-zinc-400 text-[11px] pl-2 whitespace-nowrap">
                  {step.distance > 1000 ? `${(step.distance / 1000).toFixed(1)} km` : `${step.distance} m`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hazards on this Route */}
      {routeData.hazards && routeData.hazards.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{routeData.hazards.length} Road Hazards Reported on this Path</span>
            </div>
            {onReportHazard && (
              <button
                onClick={onReportHazard}
                className="text-[11px] font-medium text-amber-400 hover:text-amber-300 underline"
              >
                + Add Report
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {routeData.hazards.slice(0, 4).map((hz) => (
              <div key={hz.id} className="bg-zinc-950/80 border border-amber-500/20 p-2.5 rounded-lg">
                <div className="font-medium text-white text-xs">{hz.title}</div>
                <div className="text-[10px] text-zinc-400 line-clamp-1">{hz.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default RouteDetails;
