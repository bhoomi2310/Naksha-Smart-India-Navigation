import React from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { voiceGuidance } from '@/lib/voiceGuidance';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  Shield, 
  Leaf, 
  AlertTriangle, 
  Play, 
  Compass,
  Volume2,
  CornerUpLeft,
  CornerUpRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  CheckCircle2
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

  const renderStepIcon = (type: string, modifier?: string) => {
    const mod = modifier?.toLowerCase() || '';
    if (type === 'arrive') return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
    if (type === 'depart') return <Navigation className="w-3.5 h-3.5 text-[#1F6F6B]" />;
    if (mod.includes('left')) return <CornerUpLeft className="w-3.5 h-3.5 text-[#D8472B]" />;
    if (mod.includes('right')) return <CornerUpRight className="w-3.5 h-3.5 text-[#D8472B]" />;
    if (mod.includes('slight left')) return <ArrowUpLeft className="w-3.5 h-3.5 text-[#C98109]" />;
    if (mod.includes('slight right')) return <ArrowUpRight className="w-3.5 h-3.5 text-[#C98109]" />;
    return <ArrowUp className="w-3.5 h-3.5 text-[#1F6F6B]" />;
  };

  return (
    <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[4px_4px_0_#14121F] rounded-2xl p-5 text-[#14121F] space-y-5">
      {/* Route Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#14121F]/15">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-[#524C61]">
            <span>Estimated Arrival: <strong className="text-[#14121F]">{routeData.eta}</strong></span>
          </div>
          <h3 className="text-xl font-bold text-[#14121F] font-display tracking-tight">
            {routeData.type}
          </h3>
          <p className="text-xs text-[#524C61] mt-0.5">
            {routeData.summary}
          </p>
        </div>

        {onStartNavigation && (
          <Button
            onClick={onStartNavigation}
            className="ink-btn-primary px-6 py-5 rounded-xl text-sm flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            Start Navigation
          </Button>
        )}
      </div>

      {/* Key Telemetry Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-[#FAF5EC] border-[1.2px] border-[#14121F]/20 p-3 rounded-xl text-center">
          <div className="text-[10px] uppercase font-bold text-[#524C61]">Distance</div>
          <div className="text-lg font-black text-[#14121F] mt-0.5">{routeData.distanceStr}</div>
        </div>

        <div className="bg-[#FAF5EC] border-[1.2px] border-[#14121F]/20 p-3 rounded-xl text-center">
          <div className="text-[10px] uppercase font-bold text-[#524C61]">Travel Time</div>
          <div className="text-lg font-black text-[#D8472B] mt-0.5">{routeData.durationStr}</div>
        </div>

        <div className="bg-[#FAF5EC] border-[1.2px] border-[#14121F]/20 p-3 rounded-xl text-center">
          <div className="text-[10px] uppercase font-bold text-[#524C61]">Road Score (RQI)</div>
          <div className="text-lg font-black text-[#1F6F6B] mt-0.5">{routeData.roadQualityIndex}/100</div>
        </div>

        <div className="bg-[#FAF5EC] border-[1.2px] border-[#14121F]/20 p-3 rounded-xl text-center">
          <div className="text-[10px] uppercase font-bold text-[#524C61]">Streetlights</div>
          <div className="text-lg font-black text-[#C98109] mt-0.5">{routeData.lightingScore}%</div>
        </div>
      </div>

      {/* Multimodal Fare Calculator */}
      <TransitFareCard route={routeData} />

      {/* Road Features */}
      {routeData.features && routeData.features.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-xs text-[#14121F]">
            Route Characteristics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {routeData.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#FAF5EC] border-[1.2px] border-[#14121F]/20 p-2.5 rounded-xl text-xs text-[#14121F] font-semibold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D8472B]"></span>
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
            <h4 className="font-bold text-xs text-[#14121F] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#1F6F6B]" />
              Turn-by-Turn Maneuvers ({routeData.steps.length} Steps)
            </h4>
            <span className="text-[11px] font-semibold text-[#1F6F6B] bg-[#EAF4F3] px-2 py-0.5 rounded border border-[#9DCBC8]">
              Google Maps Level Precision
            </span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1 divide-y divide-[#14121F]/10 bg-[#FAF5EC] rounded-xl p-3 border-[1.2px] border-[#14121F]/20">
            {routeData.steps.map((step, idx) => (
              <div key={idx} className="pt-2 first:pt-0 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="flex-shrink-0 flex items-center gap-1 mt-0.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFFDF9] border border-[#14121F] flex items-center justify-center font-bold text-[10px] text-[#D8472B]">
                      {idx + 1}
                    </span>
                    <span className="p-1 rounded bg-[#FFFDF9] border border-[#14121F]/20">
                      {renderStepIcon(step.type, step.modifier)}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="font-bold text-[#14121F] flex items-center gap-1.5 flex-wrap">
                      <span>{step.instruction}</span>
                      {step.roadRef && (
                        <span className="bg-[#1F6F6B]/15 text-[#1F6F6B] border border-[#1F6F6B]/30 px-1.5 py-0.2 rounded text-[9px] font-bold">
                          {step.roadRef}
                        </span>
                      )}
                      {step.exitNumber && (
                        <span className="bg-[#C98109]/15 text-[#C98109] border border-[#C98109]/30 px-1.5 py-0.2 rounded text-[9px] font-bold">
                          Exit {step.exitNumber}
                        </span>
                      )}
                    </div>
                    {step.spokenInstruction && (
                      <div className="text-[10px] text-[#524C61] mt-0.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => voiceGuidance.speak(step.spokenInstruction, true)}
                          className="hover:text-[#D8472B] inline-flex items-center gap-1 text-[#1F6F6B] font-semibold"
                          title="Listen to voice navigation cue"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Voice:</span>
                        </button>
                        <span className="italic truncate">&quot;{step.spokenInstruction}&quot;</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-[#14121F] font-bold text-[11px] whitespace-nowrap">
                    {step.distance > 1000 ? `${(step.distance / 1000).toFixed(1)} km` : `${step.distance} m`}
                  </div>
                  {step.duration > 0 && (
                    <div className="text-[10px] text-[#524C61]">
                      {step.duration >= 60 ? `${Math.round(step.duration / 60)} min` : `${step.duration}s`}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hazards on this Route */}
      {routeData.hazards && routeData.hazards.length > 0 && (
        <div className="bg-[#FEF8EA] border-[1.5px] border-[#C98109]/30 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#C98109] font-bold text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-[#D8472B]" />
              <span>{routeData.hazards.length} Road Hazards Reported on this Path</span>
            </div>
            {onReportHazard && (
              <button
                onClick={onReportHazard}
                className="text-[11px] font-bold text-[#D8472B] hover:underline"
              >
                + Add Report
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {routeData.hazards.slice(0, 4).map((hz) => (
              <div key={hz.id} className="bg-[#FFFDF9] border-[1.2px] border-[#14121F]/20 p-2.5 rounded-lg">
                <div className="font-bold text-[#14121F] text-xs">{hz.title}</div>
                <div className="text-[10px] text-[#524C61] line-clamp-1">{hz.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default RouteDetails;
