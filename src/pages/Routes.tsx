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
    <div className="min-h-screen bg-[#F6EFE3] text-[#14121F] flex flex-col relative selection:bg-[#F2A31B] selection:text-[#14121F] paper-grain">
      {/* Background with Paper Grid */}
      <AmbientBackground variant="console" />

      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Comparative Page Header */}
        <div className="ink-card p-5 sm:p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-[#14121F] font-display tracking-tight">
                Compare Routes &amp; Travel Conditions
              </h1>
              <p className="text-xs text-[#524C61] max-w-2xl leading-relaxed">
                Analyze travel time, pavement quality (RQI), street illumination, fuel usage, and transit fares across multiple routes.
              </p>
            </div>

            <Button
              onClick={handleOpenHazardReport}
              variant="outline"
              size="sm"
              className="ink-btn-secondary h-9 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#D8472B]" />
              <span>Report Hazard</span>
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
