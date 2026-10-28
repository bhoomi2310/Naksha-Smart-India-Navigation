import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import SearchInterface from '@/components/SearchInterface';
import RouteDetails from '@/components/RouteDetails';
import { HazardReportModal } from '@/components/HazardReportModal';
import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import {
  ConsoleHeader,
  RouteProfilesList,
  MapWorkspace,
} from '@/components/navigation-console';
import { calculateIndianRoutes, RouteOptionData } from '@/lib/routingService';
import { isAuthenticated, hazardsAPI, tripsAPI } from '@/lib/api';
import { toast } from 'sonner';

const Index: React.FC = () => {
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
            result.routes.forEach((r) => {
              r.hazards = [...dbHazards, ...(r.hazards || [])];
            });
          }
        } catch {
          // Fall back to simulated road hazards
        }

        setRoutes(result.routes);
        setSelectedRouteId(result.routes[0].id);
        toast.success(`Calculated ${result.routes.length} Indian route profiles`);
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
        toast.success('Live navigation started! Journey saved to your profile.');
      } catch (err) {
        toast.info('Live navigation simulation started');
      }
    } else {
      toast.info('Navigation active in guest mode. Sign in to log journeys.');
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
    <div className="min-h-screen bg-[#F6EFE3] text-[#14121F] flex flex-col relative selection:bg-[#F2A31B] selection:text-[#14121F] paper-grain">
      {/* Dynamic Cyber Navigation Background with Glowing Saffron & NavIC Orbs */}
      <AmbientBackground variant="console" />

      {/* Primary Site Navbar */}
      <Navigation />

      {/* Main Console Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Modular Console Header */}
        <ConsoleHeader
          onOpenHazardReport={handleOpenHazardReport}
          activeRoutesCount={routes.length}
        />

        {/* Search & Location Input Bar */}
        <SearchInterface
          fromLocation={fromLocation}
          toLocation={toLocation}
          setFromLocation={setFromLocation}
          setToLocation={setToLocation}
          onSearch={() => handleSearch(fromLocation, toLocation)}
          isLoading={isLoading}
        />

        {/* Split Screen Workspace: Route Profiles + Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Modular Route Profiles List */}
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

          {/* Right Column: Modular Map & Simulator Workspace */}
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

        {/* Active Route Deep Intelligence Details */}
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
            : vehiclePosition || [28.6139, 77.209]
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

export default Index;
