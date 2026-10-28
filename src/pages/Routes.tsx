import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import SearchInterface from '@/components/SearchInterface';
import RouteDetails from '@/components/RouteDetails';
import { HazardReportModal } from '@/components/HazardReportModal';
import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import {
  RouteProfilesList,
  MapWorkspace,
} from '@/components/navigation-console';
import { calculateIndianRoutes, RouteOptionData } from '@/lib/routingService';
import { tripsAPI, isAuthenticated } from '@/lib/api';
import { toast } from 'sonner';
import { AlertTriangle, Compass, Shield, Activity, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RoutesPage: React.FC = () => {
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

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

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
          saved: activeRoute.metrics?.timeSaved,
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

  const handleHazardReported = (newHazard: any) => {
    if (activeRoute) {
      if (!newHazard.coordinates && activeRoute.coordinates && activeRoute.coordinates.length > 0) {
        newHazard.coordinates = activeRoute.coordinates[Math.floor(activeRoute.coordinates.length / 2)];
      }
      activeRoute.hazards = [newHazard, ...(activeRoute.hazards || [])];
      setRoutes([...routes]);
    }
  };

  const handleVehiclePositionChange = (pos: [number, number] | null, heading: number) => {
    setVehiclePosition(pos);
    setVehicleHeading(heading);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative selection:bg-orange-500 selection:text-white">
      {/* Background with Ambient Orbs & Navigational Grid */}
      <AmbientBackground variant="console" />

      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Comparative Page Header */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800/90 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  <GitFork className="w-3 h-3" />
                  Multi-Criteria Routing
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  Pothole, Lighting & Flood Hazard Models
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Compare Routes & Travel Conditions
              </h1>
              <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                Analyze travel time, pavement quality (RQI), street illumination, fuel usage, and multi-modal transit fares across 6 intelligent profiles.
              </p>
            </div>

            <Button
              onClick={handleOpenHazardReport}
              className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 rounded-2xl py-5 px-5 font-semibold transition-all shadow-sm flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Report Live Hazard</span>
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

        {/* Split Screen: Modular Route List + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <RouteProfilesList
              routes={routes}
              selectedRouteId={selectedRouteId}
              isLoading={isLoading}
              onSelectRoute={(id) => {
                setSelectedRouteId(id);
                setIsNavigating(false);
                setVehiclePosition(null);
              }}
              onStartNavigation={(route) => {
                setSelectedRouteId(route.id);
                handleStartNavigation();
              }}
              onSelectStarterCorridor={(from, to) => {
                setFromLocation(from);
                setToLocation(to);
                handleSearch(from, to);
              }}
            />
          </div>

          <div className="lg:col-span-7">
            <MapWorkspace
              routes={routes}
              selectedRouteId={selectedRouteId}
              activeRoute={activeRoute}
              originName={fromLocation}
              destName={toLocation}
              vehiclePosition={vehiclePosition}
              vehicleHeading={vehicleHeading}
              isNavigating={isNavigating}
              onSelectRoute={(id) => setSelectedRouteId(id)}
              onVehiclePositionChange={handleVehiclePositionChange}
              onStopNavigating={() => setIsNavigating(false)}
              onReportHazardClick={handleOpenHazardReport}
            />
          </div>
        </div>

        {/* Selected Route In-Depth Details */}
        {activeRoute && (
          <div className="pt-2 transition-all duration-500 animate-fade-in">
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
            : vehiclePosition || [19.0657, 72.8687]
        }
        onReportSubmitted={handleHazardReported}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode((m) => (m === 'login' ? 'register' : 'login'))}
      />
    </div>
  );
};

export default RoutesPage;
