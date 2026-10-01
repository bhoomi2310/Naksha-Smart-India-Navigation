import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SearchInterface from '@/components/SearchInterface';
import RouteCard from '@/components/RouteCard';
import RouteDetails from '@/components/RouteDetails';
import { InteractiveMap } from '@/components/InteractiveMap';
import { TurnByTurnNavigator } from '@/components/TurnByTurnNavigator';
import { HazardReportModal } from '@/components/HazardReportModal';
import { calculateIndianRoutes, RouteOptionData } from '@/lib/routingService';
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
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RoutesPage = () => {
  const [fromLocation, setFromLocation] = useState('BKC (Bandra Kurla Complex), Mumbai');
  const [toLocation, setToLocation] = useState('Marine Drive, Mumbai');
  const [routes, setRoutes] = useState<RouteOptionData[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('fastest');
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [vehiclePosition, setVehiclePosition] = useState<[number, number] | null>(null);
  const [vehicleHeading, setVehicleHeading] = useState(0);
  const [isHazardModalOpen, setIsHazardModalOpen] = useState(false);

  useEffect(() => {
    handleSearch('BKC (Bandra Kurla Complex), Mumbai', 'Marine Drive, Mumbai');
  }, []);

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

  const handleStartNavigation = () => {
    if (!activeRoute) return;
    setIsNavigating(true);
    if (activeRoute.coordinates && activeRoute.coordinates[0]) {
      setVehiclePosition(activeRoute.coordinates[0]);
    }
    toast.info('Live driving mode active. Turn-by-turn simulation ready.');
  };

  const handleVehiclePositionChange = (pos: [number, number] | null, heading: number) => {
    setVehiclePosition(pos);
    setVehicleHeading(heading);
  };

  const handleHazardReported = (newHazard: any) => {
    if (activeRoute) {
      activeRoute.hazards = [newHazard, ...(activeRoute.hazards || [])];
      setRoutes([...routes]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-orange-500 selection:text-white">
      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-white/10 p-6 rounded-3xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-xs">
                  Multi-Criteria Routing
                </Badge>
                <span className="text-xs text-zinc-400">Pothole & Safety Heatmaps Active</span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Compare Indian Routes & Telemetry
              </h1>
              <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
                Compare travel times, pothole density, street lighting index, fuel consumption, and public transit fares across 6 intelligent navigation models.
              </p>
            </div>

            <Button
              onClick={() => setIsHazardModalOpen(true)}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-2xl py-6 font-semibold"
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

            {isLoading ? (
              <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-12 text-center space-y-3">
                <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="font-bold text-sm text-white">Fetching real Indian road metrics...</div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
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
                onReportHazardClick={() => setIsHazardModalOpen(true)}
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
              onReportHazard={() => setIsHazardModalOpen(true)}
            />
          </div>
        )}
      </main>

      <HazardReportModal
        isOpen={isHazardModalOpen}
        onClose={() => setIsHazardModalOpen(false)}
        currentLocationName={fromLocation}
        onReportSubmitted={handleHazardReported}
      />

      <footer className="bg-black/90 border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-lg font-black text-white">
            <span className="text-orange-500">नक्शा</span> Naksha
          </div>
          <div className="text-xs text-zinc-400">
            Real-time Indian Navigation System • Built with OpenStreetMap & OSRM
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoutesPage;
