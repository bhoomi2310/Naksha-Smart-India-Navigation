import React, { useState } from 'react';
import { Compass, ShieldCheck, ArrowRight, Train, Car, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PROFILES } from '@/data/routeProfilesData';

interface PerspectiveDeckProps {
  onNavigateToDashboard: () => void;
  onNavigateToRoutes: () => void;
}

export const PerspectiveDeck: React.FC<PerspectiveDeckProps> = ({
  onNavigateToDashboard,
  onNavigateToRoutes,
}) => {
  const [activeDeckCard, setActiveDeckCard] = useState<'route' | 'scenic' | 'fares'>('route');
  const [selectedProfileId, setSelectedProfileId] = useState<string>('fastest');

  const selectedProfile = ROUTE_PROFILES.find((p) => p.id === selectedProfileId) || ROUTE_PROFILES[0];

  return (
    <div id="preview" className="relative max-w-5xl mx-auto w-full z-10 px-6 md:px-12 py-8">
      {/* Traditional Indian Jaali Diamond Divider */}
      <div data-roadtrip-divider="1" className="py-8 my-2 flex items-center justify-center" aria-hidden="true">
        <svg className="w-64 h-3 text-[#14121F]/30" viewBox="0 0 256 12" fill="none">
          <line x1="0" y1="6" x2="256" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 64 6 L 80 1 L 96 6 L 80 11 Z" fill="#FDF0ED" stroke="#D8472B" strokeWidth="1.2" />
          <path d="M 112 6 L 128 1 L 144 6 L 128 11 Z" fill="#FEF8EA" stroke="#F2A31B" strokeWidth="1.2" />
          <path d="M 160 6 L 176 1 L 192 6 L 176 11 Z" fill="#EAF4F3" stroke="#1F6F6B" strokeWidth="1.2" />
          <circle cx="80" cy="6" r="1.5" fill="#D8472B" />
          <circle cx="128" cy="6" r="1.5" fill="#F2A31B" />
          <circle cx="176" cy="6" r="1.5" fill="#1F6F6B" />
        </svg>
      </div>

      {/* Tab selection for mobile or easy switching */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <button
          onClick={() => setActiveDeckCard('scenic')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeDeckCard === 'scenic'
              ? 'bg-[#14121F] text-[#FFFDF9] shadow-[2px_2px_0_#F2A31B]'
              : 'bg-[#FFFDF9] text-[#14121F] border-[1.2px] border-[#14121F] hover:bg-[#FAF5EC]'
          }`}
        >
          Corridor Compare
        </button>
        <button
          onClick={() => setActiveDeckCard('route')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeDeckCard === 'route'
              ? 'bg-[#D8472B] text-[#FFFDF9] shadow-[2px_2px_0_#14121F]'
              : 'bg-[#FFFDF9] text-[#14121F] border-[1.2px] border-[#14121F] hover:bg-[#FAF5EC]'
          }`}
        >
          Live Route Simulator
        </button>
        <button
          onClick={() => setActiveDeckCard('fares')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeDeckCard === 'fares'
              ? 'bg-[#14121F] text-[#FFFDF9] shadow-[2px_2px_0_#F2A31B]'
              : 'bg-[#FFFDF9] text-[#14121F] border-[1.2px] border-[#14121F] hover:bg-[#FAF5EC]'
          }`}
        >
          Transit Fares
        </button>
      </div>

      {/* Center Deck Card */}
      <div className="w-full max-w-2xl mx-auto">
        {activeDeckCard === 'route' && (
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FFFDF9] border-2 border-[#14121F] shadow-[6px_6px_0_#14121F] text-left space-y-5 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-[1.5px] border-[#14121F]/15">
              <span className="text-xs font-bold text-[#14121F] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D8472B] animate-ping" />
                Live Preview: Connaught Place to Gurgaon CyberHub
              </span>
              <span className="text-xs font-black text-[#D8472B] uppercase">
                {selectedProfile.title}
              </span>
            </div>

            {/* Route Profile Quick Select Chips */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-[#524C61] uppercase tracking-wider">
                Select Profile:
              </div>
              <div className="flex flex-wrap gap-2">
                {ROUTE_PROFILES.map((prof) => {
                  const isSelected = selectedProfileId === prof.id;
                  return (
                    <button
                      key={prof.id}
                      onClick={() => setSelectedProfileId(prof.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border-[1.5px] transition-all ${
                        isSelected
                          ? 'bg-[#D8472B] text-[#FFFDF9] border-[#14121F] shadow-[3px_3px_0_#14121F]'
                          : 'bg-[#FAF5EC] text-[#14121F] border-[#14121F]/30 hover:border-[#14121F] hover:bg-[#FFFDF9]'
                      }`}
                    >
                      {prof.shortTitle} ({prof.timeExample})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Profile Detail Card */}
            <div className="p-4 rounded-xl bg-[#FAF5EC] border-[1.5px] border-[#14121F] space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-[#14121F]">
                    {selectedProfile.title} Corridor
                  </h4>
                  <p className="text-xs text-[#524C61] mt-0.5 leading-relaxed">
                    {selectedProfile.desc}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-black text-[#D8472B]">
                    {selectedProfile.timeExample}
                  </div>
                  <div className="text-[11px] font-bold text-[#524C61]">
                    {selectedProfile.distanceExample}
                  </div>
                </div>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t-[1.2px] border-[#14121F]/15 text-center">
                <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#14121F]/20">
                  <div className="text-[9px] text-[#524C61] uppercase font-bold">
                    {selectedProfile.stats.stat1.label}
                  </div>
                  <div className="text-xs font-black text-[#14121F] mt-0.5">
                    {selectedProfile.stats.stat1.value}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#14121F]/20">
                  <div className="text-[9px] text-[#524C61] uppercase font-bold">
                    {selectedProfile.stats.stat2.label}
                  </div>
                  <div className="text-xs font-black text-[#1F6F6B] mt-0.5">
                    {selectedProfile.stats.stat2.value}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#14121F]/20">
                  <div className="text-[9px] text-[#524C61] uppercase font-bold">
                    {selectedProfile.stats.stat3.label}
                  </div>
                  <div className="text-xs font-black text-[#C98109] mt-0.5">
                    {selectedProfile.stats.stat3.value}
                  </div>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <Button
              onClick={onNavigateToDashboard}
              className="ink-btn-primary w-full text-xs py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <span>Navigate with {selectedProfile.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {activeDeckCard === 'scenic' && (
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FFFDF9] border-2 border-[#14121F] shadow-[6px_6px_0_#14121F] text-left space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b-[1.5px] border-[#14121F]/15">
              <span className="text-xs font-bold text-[#14121F]">
                Corridor Safety & Quality Analysis
              </span>
              <span className="text-xs text-[#524C61]">Delhi NCR Network</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#14121F] font-display">
                Why Choose by Quality Over Just Kilometers?
              </h3>
              <p className="text-xs text-[#524C61]">
                A route that is 2 km shorter can have 8 red lights and broken pavement. Naksha prioritizes your driving experience.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF5EC] border-[1.5px] border-[#14121F] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FEF8EA] border border-[#14121F] text-[#C98109] flex-shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#14121F] text-xs">Scenic Heritage Corridor</div>
                  <div className="text-[11px] text-[#524C61] mt-0.5">
                    Shanti Path, India Gate, and Lodhi Gardens. Tree-canopied with 40% lower honking density.
                  </div>
                  <div className="text-[10px] text-[#C98109] font-bold mt-1">Calm leisure route · 41 mins</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF5EC] border-[1.5px] border-[#14121F] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#EAF4F3] border border-[#14121F] text-[#1F6F6B] flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#14121F] text-xs">Night Safety Corridor</div>
                  <div className="text-[11px] text-[#524C61] mt-0.5">
                    98% continuous streetlights, active police booths, and commercial road stretches. No dark alleys.
                  </div>
                  <div className="text-[10px] text-[#1F6F6B] font-bold mt-1">Verified safe for solo night travel · 35 mins</div>
                </div>
              </div>
            </div>

            <Button
              onClick={onNavigateToRoutes}
              className="ink-btn-secondary w-full text-xs py-2.5 rounded-xl"
            >
              Compare All Corridor Metrics
            </Button>
          </div>
        )}

        {activeDeckCard === 'fares' && (
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FFFDF9] border-2 border-[#14121F] shadow-[6px_6px_0_#14121F] text-left space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b-[1.5px] border-[#14121F]/15">
              <span className="text-xs font-bold text-[#14121F]">
                Government Auto Tariff vs Metro Matrix
              </span>
              <span className="text-xs text-[#524C61]">Delhi Gazette Rates</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#14121F] font-display">
                Real Transit Fare Breakdown
              </h3>
              <p className="text-xs text-[#524C61]">
                Check official meter rates against app cab surge pricing and air-conditioned Metro lines.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF5EC] border-[1.5px] border-[#14121F] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Train className="w-4 h-4 text-[#1961A3]" />
                  <div>
                    <div className="font-bold text-[#14121F]">Yellow Line Metro</div>
                    <div className="text-[10px] text-[#524C61]">Air-conditioned with zero traffic jam</div>
                  </div>
                </div>
                <div className="font-black text-sm text-[#1F6F6B]">₹45</div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5EC] border-[1.5px] border-[#14121F] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#C98109]" />
                  <div>
                    <div className="font-bold text-[#14121F]">Official Auto Rickshaw Meter</div>
                    <div className="text-[10px] text-[#524C61]">Base ₹30 for first 1.5 km + ₹11/km after</div>
                  </div>
                </div>
                <div className="font-black text-sm text-[#C98109]">₹210</div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5EC] border-[1.5px] border-[#14121F] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Car className="w-4 h-4 text-[#524C61]" />
                  <div>
                    <div className="font-bold text-[#14121F]">Private Cab App</div>
                    <div className="text-[10px] text-[#524C61]">Estimated with standard peak surge</div>
                  </div>
                </div>
                <div className="font-black text-sm text-[#524C61]">₹385</div>
              </div>
            </div>

            <Button
              onClick={onNavigateToRoutes}
              className="ink-btn-secondary w-full text-xs py-2.5 rounded-xl"
            >
              View Transit & Metro Routes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerspectiveDeck;
