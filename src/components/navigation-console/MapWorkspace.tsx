import React from 'react';
import { RouteOptionData } from '@/lib/routingService';
import { InteractiveMap } from '@/components/InteractiveMap';
import { TurnByTurnNavigator } from '@/components/TurnByTurnNavigator';
import { Satellite, Navigation } from 'lucide-react';

interface MapWorkspaceProps {
  routes: RouteOptionData[];
  selectedRouteId: string;
  activeRoute?: RouteOptionData;
  originName: string;
  destName: string;
  vehiclePosition: [number, number] | null;
  vehicleHeading: number;
  isNavigating: boolean;
  onSelectRoute: (id: string) => void;
  onVehiclePositionChange: (pos: [number, number] | null, heading: number) => void;
  onStopNavigating: () => void;
  onReportHazardClick: () => void;
}

export const MapWorkspace: React.FC<MapWorkspaceProps> = ({
  routes,
  selectedRouteId,
  activeRoute,
  originName,
  destName,
  vehiclePosition,
  vehicleHeading,
  isNavigating,
  onSelectRoute,
  onVehiclePositionChange,
  onStopNavigating,
  onReportHazardClick,
}) => {
  return (
    <div className="space-y-3 sticky top-20">
      {/* Turn-by-Turn Driving Mode HUD */}
      {isNavigating && activeRoute && (
        <div className="transition-all duration-300 animate-fade-in">
          <TurnByTurnNavigator
            route={activeRoute}
            onVehiclePositionChange={onVehiclePositionChange}
            onClose={onStopNavigating}
          />
        </div>
      )}

      {/* Map Paper Frame */}
      <div className="rounded-2xl overflow-hidden border-[1.5px] border-[#14121F] shadow-[4px_4px_0_#14121F] bg-[#FFFDF9] relative transition-all duration-300">
        {/* Top Map Telemetry Bar */}
        <div className="px-3.5 py-2.5 bg-[#FAF5EC] border-b-[1.5px] border-[#14121F] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#D8472B] animate-pulse flex-shrink-0" />
            <span className="font-bold text-[#14121F] truncate text-[11px]">
              {originName && destName
                ? `${originName.split(',')[0]} → ${destName.split(',')[0]}`
                : 'India Navigation Map · All Corridors'}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isNavigating ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1F6F6B] bg-[#EAF4F3] px-2 py-0.5 rounded-md border border-[#9DCBC8]">
                <Navigation className="w-3 h-3 text-[#1F6F6B]" />
                Live Turn-by-Turn
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#524C61]">
                <Satellite className="w-3 h-3 text-[#D8472B]" />
                NavIC + Dual GPS
              </span>
            )}
          </div>
        </div>

        {/* Interactive Leaflet Map Canvas */}
        <div className="h-[480px] sm:h-[550px] w-full relative">
          <InteractiveMap
            routes={routes}
            selectedRouteId={selectedRouteId}
            onSelectRoute={onSelectRoute}
            originName={originName}
            destName={destName}
            vehiclePosition={vehiclePosition}
            vehicleHeading={vehicleHeading}
            onReportHazardClick={onReportHazardClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MapWorkspace;
