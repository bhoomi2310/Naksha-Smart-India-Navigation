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
import { isAuthenticated } from '@/lib/api';
import { toast } from 'sonner';
import { 
  Compass, 
  AlertTriangle,
  Share2,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [fromLocation, setFromLocation] = useState('Connaught Place, Delhi');
  const [toLocation, setToLocation] = useState('Cyber City, Gurgaon');
  const [routes, setRoutes] = useState<RouteOptionData[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('fastest');
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [vehiclePosition, setVehiclePosition] = useState<[number, number] | null>(null);
  const [vehicleHeading, setVehicleHeading] = useState(0);
  const [isHazardModalOpen, setIsHazardModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    handleSearch('Connaught Place, Delhi', 'Cyber City, Gurgaon');
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

  const handleStartNavigation = () => {
    if (!activeRoute) return;
    setIsNavigating(true);
    if (activeRoute.coordinates && activeRoute.coordinates[0]) {
      setVehiclePosition(activeRoute.coordinates[0]);
    }
    toast.info('Live navigation simulation started');
  };

  const handleVehiclePositionChange = (pos: [number, number] | null, heading: number) => {
    setVehiclePosition(pos);
    setVehicleHeading(heading);
  };

  const handleOpenHazardReport = () => {
    if (!isAuthenticated()) {
      toast.info('Please sign in to report road hazards');
      setIsAuthModalOpen(true);
      return;
    }
    setIsHazardModalOpen(true);
  };

  const handleHazardReported = (newHazard: any) => {
    if (activeRoute) {
      activeRoute.hazards = [newHazard, ...(activeRoute.hazards || [])];
      setRoutes([...routes]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wide">
                Live Indian Route Engine
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Navigation Console
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Real-time routing with road condition scoring, night lighting index, and transit fares.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              onClick={handleOpenHazardReport}
              variant="outline"
              size="sm"
              className="border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white rounded-xl text-xs font-medium h-9"
            >
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Report Hazard
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success('Link copied');
              }}
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white text-xs h-9 px-3 rounded-xl"
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
              <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-orange-400" />
                Route Profiles ({routes.length})
              </h2>
              <span className="text-xs text-zinc-400">Select to inspect</span>
            </div>

            {isLoading ? (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-10 text-center space-y-2">
                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="text-xs font-medium text-zinc-300">Calculating Indian road routes...</div>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
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
        onReportSubmitted={handleHazardReported}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode="login"
        onSwitchMode={() => {}}
      />
    </div>
  );
};

export default Index;
