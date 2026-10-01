import React from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { IndianRupee, Train, Bus, Car, Leaf, Footprints, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TransitFareCardProps {
  route: RouteOptionData;
}

export const TransitFareCard: React.FC<TransitFareCardProps> = ({ route }) => {
  return (
    <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-4 shadow-xl text-white">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <IndianRupee className="w-4 h-4" />
          </span>
          <div>
            <h4 className="font-bold text-sm text-white">Multimodal & Transit Fare Breakdown</h4>
            <p className="text-[11px] text-zinc-400">Accurate Indian city transit estimates</p>
          </div>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px]">
          🌱 {route.carbonSavedGrams}g CO₂ Saved
        </Badge>
      </div>

      {/* Multimodal Steps if available */}
      {route.transitLegs && route.transitLegs.length > 0 ? (
        <div className="space-y-2 py-3 border-b border-white/10">
          <div className="text-xs font-semibold text-zinc-300 mb-2">Trip Sequence & Transfer Steps</div>
          {route.transitLegs.map((leg, idx) => (
            <div key={idx} className="flex items-center justify-between bg-zinc-950/60 p-2.5 rounded-xl border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300">
                  {leg.mode === 'metro' && <Train className="w-3.5 h-3.5 text-blue-400" />}
                  {leg.mode === 'bus' && <Bus className="w-3.5 h-3.5 text-green-400" />}
                  {leg.mode === 'walk' && <Footprints className="w-3.5 h-3.5 text-amber-400" />}
                </span>
                <div>
                  <div className="font-medium text-white">{leg.line || leg.from}</div>
                  <div className="text-[10px] text-zinc-400">
                    {leg.from} ➔ {leg.to} ({leg.durationMins} mins)
                  </div>
                </div>
              </div>
              <div className="font-bold text-orange-400 text-sm">
                {leg.fareInr > 0 ? `₹${leg.fareInr}` : 'Free'}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Fare Comparison Grid */}
      <div className="grid grid-cols-3 gap-2.5 pt-3">
        {/* Metro/Bus Pass */}
        <div className="bg-zinc-950/70 border border-white/10 rounded-xl p-2.5 text-center">
          <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center justify-center gap-1">
            <Train className="w-3 h-3 text-purple-400" />
            Metro+Bus
          </div>
          <div className="text-base font-extrabold text-purple-400 mt-1">
            ₹{route.totalTransitFareInr || 45}
          </div>
          <div className="text-[9px] text-emerald-400 mt-0.5">Most Economical</div>
        </div>

        {/* Auto Rickshaw Meter */}
        <div className="bg-zinc-950/70 border border-white/10 rounded-xl p-2.5 text-center">
          <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center justify-center gap-1">
            <span className="text-xs">🛺</span>
            Auto Meter
          </div>
          <div className="text-base font-extrabold text-amber-400 mt-1">
            ₹{route.autoFareInr}
          </div>
          <div className="text-[9px] text-zinc-400 mt-0.5">Govt meter rate</div>
        </div>

        {/* Cab / Taxi */}
        <div className="bg-zinc-950/70 border border-white/10 rounded-xl p-2.5 text-center">
          <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center justify-center gap-1">
            <Car className="w-3 h-3 text-cyan-400" />
            Cab / Taxi
          </div>
          <div className="text-base font-extrabold text-cyan-400 mt-1">
            ₹{route.cabFareInr}
          </div>
          <div className="text-[9px] text-zinc-400 mt-0.5">Estimated app fare</div>
        </div>
      </div>
    </div>
  );
};
