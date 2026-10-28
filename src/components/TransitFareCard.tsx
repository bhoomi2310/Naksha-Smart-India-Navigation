import React from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { IndianRupee, Train, Bus, Car, Footprints, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TransitFareCardProps {
  route: RouteOptionData;
}

export const TransitFareCard: React.FC<TransitFareCardProps> = ({ route }) => {
  return (
    <div className="bg-[#FAF5EC] border-[1.5px] border-[#14121F] rounded-xl p-4 text-[#14121F]">
      <div className="flex items-center justify-between pb-3 border-b border-[#14121F]/15">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#FFFDF9] text-[#1961A3] border-[1.2px] border-[#14121F]">
            <IndianRupee className="w-4 h-4" />
          </span>
          <div>
            <h4 className="font-bold text-sm text-[#14121F]">Transit & Fare Breakdown</h4>
            <p className="text-[11px] text-[#524C61]">Accurate Indian city transit estimates</p>
          </div>
        </div>
        <Badge className="bg-[#EAF4F3] text-[#1F6F6B] border border-[#9DCBC8] text-[10px] font-bold">
          {route.carbonSavedGrams}g CO₂ Saved
        </Badge>
      </div>

      {/* Multimodal Steps if available */}
      {route.transitLegs && route.transitLegs.length > 0 ? (
        <div className="space-y-2 py-3 border-b border-[#14121F]/15">
          <div className="text-xs font-bold text-[#14121F] mb-2">Trip Sequence & Transfer Steps</div>
          {route.transitLegs.map((leg, idx) => (
            <div key={idx} className="flex items-center justify-between bg-[#FFFDF9] p-2.5 rounded-xl border-[1.2px] border-[#14121F] text-xs shadow-[1px_1px_0_#14121F]">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#FAF5EC] text-[#14121F] border border-[#14121F]/20">
                  {leg.mode === 'metro' && <Train className="w-3.5 h-3.5 text-[#1961A3]" />}
                  {leg.mode === 'bus' && <Bus className="w-3.5 h-3.5 text-[#1F6F6B]" />}
                  {leg.mode === 'walk' && <Footprints className="w-3.5 h-3.5 text-[#C98109]" />}
                </span>
                <div>
                  <div className="font-bold text-[#14121F]">{leg.line || leg.from}</div>
                  <div className="text-[10px] text-[#524C61]">
                    {leg.from} → {leg.to} ({leg.durationMins} mins)
                  </div>
                </div>
              </div>
              <div className="font-bold text-[#D8472B] text-sm">
                {leg.fareInr > 0 ? `₹${leg.fareInr}` : 'Free'}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Fare Comparison Grid */}
      <div className="grid grid-cols-3 gap-2.5 pt-3">
        {/* Metro/Bus Pass */}
        <div className="bg-[#FFFDF9] border-[1.2px] border-[#14121F] rounded-xl p-2.5 text-center shadow-[1px_1px_0_#14121F]">
          <div className="text-[10px] text-[#524C61] uppercase font-bold flex items-center justify-center gap-1">
            <Train className="w-3 h-3 text-[#1961A3]" />
            Metro+Bus
          </div>
          <div className="text-base font-black text-[#1961A3] mt-1">
            ₹{route.totalTransitFareInr || 45}
          </div>
          <div className="text-[9px] font-bold text-[#1F6F6B] mt-0.5">Most Economical</div>
        </div>

        {/* Auto Rickshaw Meter */}
        <div className="bg-[#FFFDF9] border-[1.2px] border-[#14121F] rounded-xl p-2.5 text-center shadow-[1px_1px_0_#14121F]">
          <div className="text-[10px] text-[#524C61] uppercase font-bold flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 text-[#C98109]" />
            Auto Meter
          </div>
          <div className="text-base font-black text-[#C98109] mt-1">
            ₹{route.autoMeterFareInr || 185}
          </div>
          <div className="text-[9px] text-[#524C61] font-semibold mt-0.5">Official Govt Tariff</div>
        </div>

        {/* Private Cab App */}
        <div className="bg-[#FFFDF9] border-[1.2px] border-[#14121F] rounded-xl p-2.5 text-center shadow-[1px_1px_0_#14121F]">
          <div className="text-[10px] text-[#524C61] uppercase font-bold flex items-center justify-center gap-1">
            <Car className="w-3 h-3 text-[#524C61]" />
            Cab App
          </div>
          <div className="text-base font-black text-[#14121F] mt-1">
            ₹{route.cabFareInr || 350}
          </div>
          <div className="text-[9px] text-[#524C61] font-semibold mt-0.5">With Peak Surge</div>
        </div>
      </div>
    </div>
  );
};

export default TransitFareCard;
