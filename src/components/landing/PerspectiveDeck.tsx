import React, { useState } from 'react';
import { Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PerspectiveDeckProps {
  onNavigateToDashboard: () => void;
  onNavigateToRoutes: () => void;
}

export const PerspectiveDeck: React.FC<PerspectiveDeckProps> = ({
  onNavigateToDashboard,
  onNavigateToRoutes,
}) => {
  const [activeDeckCard, setActiveDeckCard] = useState<'route' | 'scenic' | 'fares'>('route');
  const [selectedProfile, setSelectedProfile] = useState<'fastest' | 'safest' | 'scenic' | 'eco' | 'metro'>('fastest');

  const routeProfilesData = {
    fastest: {
      name: 'Fastest Route',
      time: '32 mins',
      distance: '28.4 km',
      desc: 'Optimized via major flyovers and expressway corridors to bypass surface signal bottlenecks.',
      stat1: { label: 'Road Surface', value: 'Smooth' },
      stat2: { label: 'Corridor', value: 'Barapullah Flyover' },
      stat3: { label: 'Signal Delays', value: '6 Skipped' }
    },
    safest: {
      name: 'Safest Route',
      time: '35 mins',
      distance: '29.1 km',
      desc: 'Maximizes illuminated multi-lane boulevards with verified active police booths & emergency SOS spots.',
      stat1: { label: 'Streetlighting', value: '98% Lit' },
      stat2: { label: 'CCTV Coverage', value: 'High Density' },
      stat3: { label: 'Police Booths', value: '4 En-Route' }
    },
    scenic: {
      name: 'Scenic Heritage Route',
      time: '41 mins',
      distance: '31.2 km',
      desc: 'Routes through wide tree-lined boulevards past India Gate, Lodhi Gardens, and central monuments.',
      stat1: { label: 'Green Canopy', value: '82% Shaded' },
      stat2: { label: 'Honking Density', value: 'Very Low' },
      stat3: { label: 'Heritage Spots', value: '5 Landmarks' }
    },
    eco: {
      name: 'Eco-Saver Route',
      time: '34 mins',
      distance: '27.8 km',
      desc: 'Flattest gradients and consistent speed cruising to cut petrol usage and brake pad wear.',
      stat1: { label: 'Fuel Saved', value: '~220 ml' },
      stat2: { label: 'Idling Time', value: '-65% vs Base' },
      stat3: { label: 'EV Efficiency', value: 'Optimal Regen' }
    },
    metro: {
      name: 'Metro + Auto Route',
      time: '24 mins',
      distance: '26.0 km',
      desc: 'Rapid Yellow Line air-conditioned transit with electric feeder auto connection.',
      stat1: { label: 'Ticket Fare', value: '₹45 total' },
      stat2: { label: 'Traffic Delay', value: '0 mins (On Tracks)' },
      stat3: { label: 'Comfort', value: 'Full AC Pass' }
    }
  };

  return (
    <div id="preview" className="relative max-w-5xl mx-auto w-full z-10 px-4">
      {/* 3D Cards Perspective Container */}
      <div className="perspective-container relative flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
        
        {/* LEFT CARD: Scenic & Safe Route Comparison */}
        <div 
          onClick={() => setActiveDeckCard('scenic')}
          className={`cursor-pointer absolute w-[92%] sm:w-[500px] transition-all duration-500 ${
            activeDeckCard === 'scenic'
              ? 'z-30 card-center-active'
              : activeDeckCard === 'route'
              ? 'hidden lg:block -left-10 z-10 card-left-perspective opacity-60 hover:opacity-95'
              : 'hidden lg:block -left-10 z-10 card-left-perspective opacity-40 hover:opacity-85'
          }`}
        >
          <div className="rounded-3xl p-1 bg-gradient-to-b from-amber-500/30 via-zinc-800/80 to-zinc-900 shadow-2xl sassy-card-lift">
            <div className="bg-zinc-950 rounded-[22px] p-6 text-left space-y-4 border border-zinc-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Scenic & Safe Options
                </span>
                <span className="text-xs text-zinc-400">Delhi NCR</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Why Settle for Just Distance?</h3>
                <p className="text-xs text-zinc-400 mt-1">Pick the route that matches your comfort level and driving mood.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 flex items-start gap-3 group transition-colors">
                  <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 flex-shrink-0 mt-0.5 icon-glow-box">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Scenic Heritage Corridor</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">India Gate, Shanti Path & Lodhi Gardens. Tree-canopied with minimal honking.</div>
                    <div className="text-[10px] text-amber-400 font-semibold mt-1">Relaxed drive · 41 mins</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 flex items-start gap-3 group transition-colors">
                  <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 flex-shrink-0 mt-0.5 icon-glow-box">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Night Safety Corridor</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">98% streetlights illuminated. Continuous CCTV coverage and zero dark alleys.</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-1">Verified safe for solo night travel · 35 mins</div>
                  </div>
                </div>
              </div>

              <Button 
                size="sm" 
                onClick={onNavigateToRoutes}
                className="sassy-btn w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs rounded-xl h-9 border border-zinc-700 transition-colors"
              >
                Compare Route Paths
              </Button>
            </div>
          </div>
        </div>

        {/* CENTER CARD: Interactive Route Profile Switcher */}
        <div 
          onClick={() => setActiveDeckCard('route')}
          className={`transition-all duration-500 w-[95%] sm:w-[600px] ${
            activeDeckCard === 'route'
              ? 'z-30 card-center-active'
              : activeDeckCard === 'scenic'
              ? 'hidden lg:block -right-10 z-10 card-right-perspective opacity-60 hover:opacity-95 cursor-pointer'
              : 'hidden lg:block -left-10 z-10 card-left-perspective opacity-60 hover:opacity-95 cursor-pointer'
          }`}
        >
          <div className="rounded-3xl p-1 bg-gradient-to-b from-orange-500/40 via-zinc-800/80 to-zinc-900 shadow-2xl sassy-card-lift">
            <div className="bg-zinc-950 rounded-[22px] p-6 text-left space-y-4 border border-orange-500/30 shadow-2xl">
              
              {/* Clean Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                  Trip Preview: Connaught Place to Cyber City
                </span>
                <span className="text-xs text-orange-400 font-bold">{routeProfilesData[selectedProfile].name}</span>
              </div>

              {/* Route Profile Buttons */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-zinc-400">Select Route Profile:</div>
                <div className="flex flex-wrap gap-1.5">
                  {(['fastest', 'safest', 'scenic', 'eco', 'metro'] as const).map((key) => {
                    const prof = routeProfilesData[key];
                    const isSel = selectedProfile === key;
                    return (
                      <button
                        key={key}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProfile(key);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                          isSel 
                            ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-105' 
                            : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-orange-500/40 hover:scale-[1.02]'
                        }`}
                      >
                        {prof.name.split(' ')[0]} ({prof.time})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Active Route Profile Details */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-white">
                      Connaught Place to Cyber City
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {routeProfilesData[selectedProfile].desc}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 pl-3">
                    <div className="text-xl font-black text-orange-400">
                      {routeProfilesData[selectedProfile].time}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-semibold">
                      {routeProfilesData[selectedProfile].distance}
                    </div>
                  </div>
                </div>

                {/* 3 Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-800 text-center">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-orange-500/40 shadow-sm transition-colors">
                    <div className="text-[9px] text-zinc-400 uppercase font-semibold">
                      {routeProfilesData[selectedProfile].stat1.label}
                    </div>
                    <div className="text-xs font-black text-white mt-0.5">
                      {routeProfilesData[selectedProfile].stat1.value}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-emerald-500/40 shadow-sm transition-colors">
                    <div className="text-[9px] text-zinc-400 uppercase font-semibold">
                      {routeProfilesData[selectedProfile].stat2.label}
                    </div>
                    <div className="text-xs font-black text-emerald-400 mt-0.5">
                      {routeProfilesData[selectedProfile].stat2.value}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-500/40 shadow-sm transition-colors">
                    <div className="text-[9px] text-zinc-400 uppercase font-semibold">
                      {routeProfilesData[selectedProfile].stat3.label}
                    </div>
                    <div className="text-xs font-black text-amber-400 mt-0.5">
                      {routeProfilesData[selectedProfile].stat3.value}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={onNavigateToDashboard}
                className="sassy-btn btn-shimmer w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-5 rounded-xl text-xs shadow-lg shadow-orange-600/30 transition-transform active:scale-95"
              >
                Navigate with {routeProfilesData[selectedProfile].name}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

            </div>
          </div>
        </div>

        {/* RIGHT CARD: Transit & Fare Breakdown */}
        <div 
          onClick={() => setActiveDeckCard('fares')}
          className={`cursor-pointer absolute w-[92%] sm:w-[500px] transition-all duration-500 ${
            activeDeckCard === 'fares'
              ? 'z-30 card-center-active'
              : activeDeckCard === 'route'
              ? 'hidden lg:block -right-10 z-10 card-right-perspective opacity-60 hover:opacity-95'
              : 'hidden lg:block -right-10 z-10 card-right-perspective opacity-40 hover:opacity-85'
          }`}
        >
          <div className="rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-zinc-800/80 to-zinc-900 shadow-2xl sassy-card-lift">
            <div className="bg-zinc-950 rounded-[22px] p-6 text-left space-y-4 border border-zinc-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Transit & Fare Breakdown
                </span>
                <span className="text-xs text-zinc-400">Delhi Rates</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Transit Fare Matrix</h3>
                <p className="text-xs text-zinc-400 mt-1">Official government auto tariffs vs Metro vs Cab fares.</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between hover:border-cyan-500/40 transition-colors">
                  <div>
                    <div className="font-bold text-white text-xs">Yellow Line Metro</div>
                    <div className="text-[10px] text-zinc-400">Fast & zero traffic delay</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-emerald-400 text-sm">₹45</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between hover:border-amber-500/40 transition-colors">
                  <div>
                    <div className="font-bold text-white text-xs">Official Auto Meter</div>
                    <div className="text-[10px] text-zinc-400">Base ₹30 + ₹11/km</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-amber-400 text-sm">₹210</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between hover:border-zinc-700 transition-colors">
                  <div>
                    <div className="font-bold text-white text-xs">Ride App Cabs</div>
                    <div className="text-[10px] text-zinc-400">With peak surge</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-zinc-300 text-sm">₹385</div>
                  </div>
                </div>
              </div>

              <Button 
                size="sm" 
                onClick={onNavigateToRoutes}
                className="sassy-btn w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs rounded-xl h-9 border border-zinc-700 transition-colors"
              >
                Compare All 6 Route Options
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerspectiveDeck;
