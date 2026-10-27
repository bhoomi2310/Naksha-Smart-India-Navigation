import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SearchInterface from '@/components/SearchInterface';
import RouteCard from '@/components/RouteCard';
import RouteDetails from '@/components/RouteDetails';
import { InteractiveMap } from '@/components/InteractiveMap';
import { TurnByTurnNavigator } from '@/components/TurnByTurnNavigator';
import { HazardReportModal } from '@/components/HazardReportModal';
import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import { calculateIndianRoutes, RouteOptionData } from '@/lib/routingService';
import { RouteCalculationLoader } from '@/components/NakshaLoader';
import { isAuthenticated, hazardsAPI, tripsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { 
  Compass, 
  AlertTriangle,
  Share2,
  Lock,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [routes, setRoutes] = useState<RouteOptionData[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('fastest');
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [vehiclePosition, setVehiclePosition] = useState<[number, number] | null>(null);
  const [vehicleHeading, setVehicleHeading] = useState(0);
  const [isHazardModalOpen, setIsHazardModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleSearch = async (from = fromLocation, to = toLocation) => {
    if (!from || !to) {
      toast.error('Please enter both starting location and destination');
      return;
    }

    setIsLoading(true);
    setIsNavigating(false);
    setVehiclePosition(null);

    try {
      const result = await calculateIndianRoutes(from, to);
      if (result.routes && result.routes.length > 0) {
        try {
          const dbHazards = await hazardsAPI.getHazards(20);
          if (dbHazards && dbHazards.length > 0) {
            result.routes.forEach(r => {
              r.hazards = [...dbHazards, ...(r.hazards || [])];
            });
          }
        } catch {
          // Keep default simulated route hazards
        }

        setRoutes(result.routes);
        setSelectedRouteId(result.routes[0].id);
        toast.success(`Calculated ${result.routes.length} Indian route options`);
      } else {
        toast.error('No routes found for these locations');
      }
    } catch (error: any) {
      console.error('Routing calculation error:', error);
      toast.error('Failed to compute routes');
    } finally {
      setIsLoading(false);
    }
  };

  const activeRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  const handleStartNavigation = async () => {
    if (!activeRoute) return;
    setIsNavigating(true);
    if (activeRoute.coordinates && activeRoute.coordinates[0]) {
      setVehiclePosition(activeRoute.coordinates[0]);
    }

    if (isAuthenticated()) {
      try {
        await tripsAPI.saveTrip({
          from: fromLocation,
          to: toLocation,
          duration: activeRoute.duration,
          distance: activeRoute.distance,
          type: activeRoute.type,
          saved: activeRoute.metrics?.timeSaved
        });
        toast.success('Live navigation started! Journey saved to your profile.');
      } catch (err) {
        toast.info('Live navigation simulation started');
      }
    } else {
      toast.info('Navigation active in guest mode. Sign in to log journeys to your commuter profile.');
    }
  };

  const handleVehiclePositionChange = (pos: [number, number] | null, heading: number) => {
    setVehiclePosition(pos);
    setVehicleHeading(heading);
  };

  const handleOpenHazardReport = () => {
    if (!isAuthenticated()) {
      toast.info('Please sign in to report road hazards');
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    setIsHazardModalOpen(true);
  };

  const handleHazardReported = (newHazard: any) => {
    if (activeRoute) {
      if (!newHazard.coordinates && activeRoute.coordinates && activeRoute.coordinates.length > 0) {
        newHazard.coordinates = activeRoute.coordinates[Math.floor(activeRoute.coordinates.length / 2)];
      }
      activeRoute.hazards = [newHazard, ...(activeRoute.hazards || [])];
      setRoutes([...routes]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                Live Indian Route Engine
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Navigation Console
            </h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              Real-time routing with road condition scoring, night lighting index, and transit fares.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              onClick={handleOpenHazardReport}
              variant="outline"
              size="sm"
              className="border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white rounded-xl text-xs font-semibold h-9"
            >
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-500 dark:text-amber-400" />
              Report Hazard
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success('Link copied');
              }}
              variant="ghost"
              size="sm"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-xs h-9 px-3 rounded-xl"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              Share
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <SearchInterface
          fromLocation={fromLocation}
          toLocation={toLocation}
          setFromLocation={setFromLocation}
          setToLocation={setToLocation}
          onSearch={() => handleSearch(fromLocation, toLocation)}
          isLoading={isLoading}
        />

        {/* Split Screen Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Route Profile Cards */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-orange-400" />
                Route Profiles ({routes.length})
              </h2>
              <span className="text-xs text-zinc-400">Select to inspect</span>
            </div>

            {/* Quick 1-Click Route Grid - Fully visible with no chopped horizontal scroll */}
            {routes.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-1.5 pb-1">
                {routes.map((r) => {
                  const isSel = selectedRouteId === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setSelectedRouteId(r.id);
                        setIsNavigating(false);
                        setVehiclePosition(null);
                        const container = document.getElementById('routes-scroll-container');
                        const el = document.getElementById(`route-card-${r.id}`);
                        if (container && el) {
                          const topPos = el.offsetTop - container.offsetTop;
                          container.scrollTo({ top: topPos, behavior: 'smooth' });
                        }
                      }}
                      className={`px-2 py-1.5 rounded-xl text-xs font-medium transition-all text-center border ${
                        isSel
                          ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/30 scale-[1.02]'
                          : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:border-orange-500/40 hover:text-white'
                      }`}
                    >
                      <div className="font-bold truncate text-[11px]">{r.type.split(' ')[0]}</div>
                      <div className={`text-[10px] ${isSel ? 'text-orange-100 font-semibold' : 'text-zinc-400'}`}>
                        {r.durationStr}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {isLoading ? (
              <RouteCalculationLoader message="Calculating Indian Road Routes..." />
            ) : routes.length > 0 ? (
              <div className="space-y-2">
                <div 
                  id="routes-scroll-container"
                  className="space-y-2.5 max-h-[550px] overflow-y-auto pr-2.5 custom-scrollbar-visible scroll-smooth"
                >
                  {routes.map((route) => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      isSelected={selectedRouteId === route.id}
                      onSelect={() => {
                        setSelectedRouteId(route.id);
                        setIsNavigating(false);
                        setVehiclePosition(null);
                      }}
                      onStartNavigate={() => {
                        setSelectedRouteId(route.id);
                        handleStartNavigation();
                      }}
                    />
                  ))}
                </div>

                {/* Visible scroll affordance indicator */}
                {routes.length > 2 && (
                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-zinc-400 py-1.5 px-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <ChevronDown className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
                    <span>Scroll down to see remaining routes</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 backdrop-blur space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 mx-auto flex items-center justify-center">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Plan Your Journey</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
                    Type your pickup location and destination above, or choose a popular corridor to calculate smart route profiles with road quality, lighting, and transit fares.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Map & Simulator */}
          <div className="lg:col-span-7 space-y-3 sticky top-20">
            {isNavigating && activeRoute && (
              <TurnByTurnNavigator
                route={activeRoute}
                onVehiclePositionChange={handleVehiclePositionChange}
                onClose={() => setIsNavigating(false)}
              />
            )}

            <div className="h-[480px] sm:h-[540px] w-full">
              <InteractiveMap
                routes={routes}
                selectedRouteId={selectedRouteId}
                onSelectRoute={(id) => setSelectedRouteId(id)}
                originName={fromLocation}
                destName={toLocation}
                vehiclePosition={vehiclePosition}
                vehicleHeading={vehicleHeading}
                onReportHazardClick={handleOpenHazardReport}
              />
            </div>
          </div>
        </div>

        {/* Selected Route In-Depth Details */}
        {activeRoute && (
          <div className="pt-2">
            <RouteDetails
              routeData={activeRoute}
              onStartNavigation={handleStartNavigation}
              onReportHazard={handleOpenHazardReport}
            />
          </div>
        )}
      </main>

      <Footer />

      {/* Hazard Report Modal */}
      <HazardReportModal
        isOpen={isHazardModalOpen}
        onClose={() => setIsHazardModalOpen(false)}
        currentLocationName={fromLocation}
        coordinates={
          activeRoute?.coordinates && activeRoute.coordinates.length > 0
            ? activeRoute.coordinates[Math.floor(activeRoute.coordinates.length / 2)]
            : vehiclePosition || [28.6139, 77.2090]
        }
        onReportSubmitted={handleHazardReported}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(m => m === 'login' ? 'register' : 'login')}
      />
    </div>
  );
};

export default Index;
