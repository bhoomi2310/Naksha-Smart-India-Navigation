import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SearchInterface from '@/components/SearchInterface';
import RouteCard from '@/components/RouteCard';
import RouteDetails from '@/components/RouteDetails';
import { InteractiveMap } from '@/components/InteractiveMap';
import { TurnByTurnNavigator } from '@/components/TurnByTurnNavigator';
import { HazardReportModal } from '@/components/HazardReportModal';
import { calculateIndianRoutes, RouteOptionData } from '@/lib/routingService';
import { RouteCalculationLoader } from '@/components/NakshaLoader';
import { tripsAPI, isAuthenticated } from '@/lib/api';
import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  AlertTriangle, 
  ArrowRight,
  Shield,
  Leaf,
  Clock,
  IndianRupee,
  Users,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RoutesPage = () => {
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
        setRoutes(result.routes);
        setSelectedRouteId(result.routes[0].id);
        toast.success(`Generated ${result.routes.length} Indian routes for comparison!`);
      } else {
        toast.error('Could not compute routes for specified locations.');
      }
    } catch (error: any) {
      console.error('Route search error:', error);
      toast.error('Routing computation error. Using real fallback engine.');
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
        toast.success('Live driving mode active. Trip saved to your commuter profile.');
      } catch (err) {
        toast.info('Live driving mode active. Turn-by-turn simulation ready.');
      }
    } else {
      toast.info('Driving in guest mode. Sign in to save journeys to your commuter profile.');
    }
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

  const handleVehiclePositionChange = (pos: [number, number] | null, heading: number) => {
    setVehiclePosition(pos);
    setVehicleHeading(heading);
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-orange-500 selection:text-white">
      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge className="bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 text-xs font-semibold">
                  Multi-Criteria Routing
                </Badge>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Pothole & Safety Heatmaps Active</span>
              </div>
              <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                Compare Routes & Travel Conditions
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
                Compare travel times, pothole density, street lighting index, fuel consumption, and public transit fares across 6 intelligent navigation models.
              </p>
            </div>

            <Button
              onClick={handleOpenHazardReport}
              className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/40 rounded-2xl py-6 font-semibold transition-all shadow-xs"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Live Road Hazard
            </Button>
          </div>
        </div>

        {/* Search Planner */}
        <SearchInterface
          fromLocation={fromLocation}
          toLocation={toLocation}
          setFromLocation={setFromLocation}
          setToLocation={setToLocation}
          onSearch={() => handleSearch(fromLocation, toLocation)}
          isLoading={isLoading}
        />

        {/* Comparative Grid & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Route Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-orange-400" />
                Select Route Option ({routes.length})
              </h2>
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
                        const container = document.getElementById('routes-scroll-container-page');
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
              <RouteCalculationLoader message="Fetching Indian Route Engine Models..." />
            ) : routes.length > 0 ? (
              <div className="space-y-2">
                <div 
                  id="routes-scroll-container-page"
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
                    Enter starting point and destination above, or select a popular Indian corridor to compare routes.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Map & Simulator */}
          <div className="lg:col-span-7 space-y-4 sticky top-4">
            {isNavigating && activeRoute && (
              <TurnByTurnNavigator
                route={activeRoute}
                onVehiclePositionChange={handleVehiclePositionChange}
                onClose={() => setIsNavigating(false)}
              />
            )}

            <div className="h-[520px] sm:h-[580px] w-full">
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

        {/* Detailed Breakdown */}
        {activeRoute && (
          <div className="pt-4">
            <RouteDetails
              routeData={activeRoute}
              onStartNavigation={handleStartNavigation}
              onReportHazard={handleOpenHazardReport}
            />
          </div>
        )}
      </main>

      <HazardReportModal
        isOpen={isHazardModalOpen}
        onClose={() => setIsHazardModalOpen(false)}
        currentLocationName={fromLocation}
        coordinates={
          activeRoute?.coordinates && activeRoute.coordinates.length > 0
            ? activeRoute.coordinates[Math.floor(activeRoute.coordinates.length / 2)]
            : vehiclePosition || [19.0657, 72.8687]
        }
        onReportSubmitted={handleHazardReported}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(m => m === 'login' ? 'register' : 'login')}
      />

      <Footer />
    </div>
  );
};

export default RoutesPage;
