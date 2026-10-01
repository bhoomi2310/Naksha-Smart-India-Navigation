import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { RouteOptionData, RoadHazard } from '@/lib/routingService';
import { Layers, Zap, Eye, AlertTriangle, Crosshair } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Fix Leaflet Default Marker Asset Issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Custom SVG Icons for Indian Navigation
const createCustomIcon = (svgString: string, size: [number, number] = [36, 36], anchor: [number, number] = [18, 18]) => {
  return L.divIcon({
    html: svgString,
    className: 'custom-leaflet-marker',
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -anchor[1]]
  });
};

// Origin Start Marker (Pulsating Emerald Green)
const startIcon = createCustomIcon(`
  <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
    <div style="position: absolute; width: 32px; height: 32px; background: rgba(16, 185, 129, 0.35); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
    <div style="position: relative; width: 22px; height: 22px; background: #10b981; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 0 14px rgba(16, 185, 129, 0.9); display: flex; align-items: center; justify-content: center;">
      <div style="width: 6px; height: 6px; background: #ffffff; border-radius: 50%;"></div>
    </div>
  </div>
`);

// Destination Marker (Saffron Orange Indian Pin)
const destIcon = createCustomIcon(`
  <div style="position: relative; width: 38px; height: 44px; display: flex; flex-direction: column; align-items: center;">
    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #ff7722, #ea580c); border: 3px solid #ffffff; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 14px rgba(234, 88, 12, 0.6); display: flex; align-items: center; justify-content: center;">
      <div style="width: 10px; height: 10px; background: #ffffff; border-radius: 50%; transform: rotate(45deg);"></div>
    </div>
    <div style="width: 8px; height: 3px; background: rgba(0,0,0,0.3); border-radius: 50%; margin-top: 2px;"></div>
  </div>
`, [38, 44], [19, 42]);

// Vehicle Live Position Icon (Indian Auto Rickshaw / Smart Navigator)
const vehicleIcon = (heading: number = 0) => createCustomIcon(`
  <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; transform: rotate(${heading}deg); transition: transform 0.3s ease;">
    <div style="position: absolute; width: 42px; height: 42px; background: rgba(255, 119, 34, 0.25); border-radius: 50%; animation: pulse 2s infinite;"></div>
    <div style="width: 32px; height: 32px; background: #18181b; border: 2.5px solid #ff7722; border-radius: 50%; box-shadow: 0 0 16px rgba(255, 119, 34, 0.9); display: flex; align-items: center; justify-content: center;">
      <span style="font-size: 16px;">🛺</span>
    </div>
  </div>
`, [44, 44], [22, 22]);

// Hazard Icons
const hazardIcon = (type: RoadHazard['type'], severity: RoadHazard['severity']) => {
  let emoji = '⚠️';
  let bgColor = '#f59e0b';

  if (type === 'pothole') {
    emoji = '🕳️';
    bgColor = severity === 'critical' ? '#ef4444' : '#f97316';
  } else if (type === 'waterlogging') {
    emoji = '🌊';
    bgColor = '#06b6d4';
  } else if (type === 'dark_stretch') {
    emoji = '💡';
    bgColor = '#64748b';
  } else if (type === 'construction') {
    emoji = '🚧';
    bgColor = '#eab308';
  } else if (type === 'police_check') {
    emoji = '👮';
    bgColor = '#3b82f6';
  }

  return createCustomIcon(`
    <div style="background: ${bgColor}; width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer;">
      ${emoji}
    </div>
  `, [28, 28], [14, 14]);
};

// Map View Bounds Adjuster
const MapBoundsController = ({ 
  coordinates, 
  activeVehiclePos 
}: { 
  coordinates: [number, number][]; 
  activeVehiclePos?: [number, number] | null;
}) => {
  const map = useMap();

  useEffect(() => {
    if (activeVehiclePos) {
      map.panTo(activeVehiclePos, { animate: true, duration: 0.5 });
      return;
    }

    if (coordinates && coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [coordinates, activeVehiclePos, map]);

  return null;
};

interface InteractiveMapProps {
  routes?: RouteOptionData[];
  selectedRouteId: string | null;
  onSelectRoute?: (routeId: string) => void;
  originName?: string;
  destName?: string;
  vehiclePosition?: [number, number] | null;
  vehicleHeading?: number;
  showHazards?: boolean;
  onReportHazardClick?: () => void;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  routes = [],
  selectedRouteId,
  onSelectRoute,
  originName = 'Origin Point',
  destName = 'Destination Point',
  vehiclePosition = null,
  vehicleHeading = 0,
  showHazards = true,
  onReportHazardClick,
  className = ''
}) => {
  const [mapStyle, setMapStyle] = useState<'dark' | 'street' | 'satellite'>('dark');
  const [showPotholeHeatmap, setShowPotholeHeatmap] = useState(true);

  // Selected route object
  const activeRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  // Starting center (Default: India Central/Delhi)
  const defaultCenter: [number, number] = activeRoute?.coordinates?.[0] || [28.6139, 77.2090];
  const startPoint = activeRoute?.coordinates?.[0];
  const endPoint = activeRoute?.coordinates?.[activeRoute.coordinates.length - 1];

  const tileUrls = {
    dark: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  const tileAttributions = {
    dark: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
    street: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
    satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
  };

  return (
    <div className={`relative w-full h-full min-h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 ${className}`}>
      {/* Top Map Action Toolbar */}
      <div className="absolute top-4 left-4 z-[500] flex flex-wrap items-center gap-2">
        {/* Style Selector */}
        <div className="flex bg-black/75 backdrop-blur-md rounded-xl p-1 border border-white/15 shadow-lg">
          <button
            onClick={() => setMapStyle('dark')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mapStyle === 'dark' ? 'bg-orange-500 text-white shadow-md' : 'text-zinc-300 hover:text-white'
            }`}
          >
            Cyber Dark
          </button>
          <button
            onClick={() => setMapStyle('street')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mapStyle === 'street' ? 'bg-orange-500 text-white shadow-md' : 'text-zinc-300 hover:text-white'
            }`}
          >
            Street Map
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mapStyle === 'satellite' ? 'bg-orange-500 text-white shadow-md' : 'text-zinc-300 hover:text-white'
            }`}
          >
            Satellite
          </button>
        </div>

        {/* Pothole & Hazard Toggle */}
        <button
          onClick={() => setShowPotholeHeatmap(!showPotholeHeatmap)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-md border shadow-lg transition-all ${
            showPotholeHeatmap
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-black/70 text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Indian Road Hazards</span>
        </button>
      </div>

      {/* Live Map Telemetry Badge */}
      {activeRoute && (
        <div className="absolute top-4 right-4 z-[500] bg-black/80 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-4">
          <div>
            <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">Road Quality Index</div>
            <div className="flex items-center gap-1.5">
              <span className={`text-base font-bold ${
                activeRoute.roadQualityIndex >= 85 ? 'text-emerald-400' : activeRoute.roadQualityIndex >= 70 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {activeRoute.roadQualityIndex}/100
              </span>
              <span className="text-xs text-zinc-400">RQI</span>
            </div>
          </div>
          <div className="h-8 w-px bg-white/15"></div>
          <div>
            <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">Live Weather</div>
            <div className="text-xs font-medium text-cyan-300">
              {activeRoute.weather?.temperature || 28}°C • {activeRoute.weather?.conditionText || 'Clear'}
            </div>
          </div>
        </div>
      )}

      {/* Actual React-Leaflet Map */}
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ minHeight: '480px', height: '100%', width: '100%' }}
      >
        <TileLayer
          key={mapStyle}
          attribution={tileAttributions[mapStyle]}
          url={tileUrls[mapStyle]}
          className={mapStyle === 'dark' ? 'map-tiles-dark' : ''}
        />

        <MapBoundsController 
          coordinates={activeRoute?.coordinates || []} 
          activeVehiclePos={vehiclePosition} 
        />

        {/* Alternative Routes Polylines (Dull) */}
        {routes.map((route) => {
          if (route.id === activeRoute?.id || !route.coordinates || route.coordinates.length === 0) return null;
          return (
            <Polyline
              key={route.id}
              positions={route.coordinates}
              pathOptions={{
                color: '#71717a',
                weight: 4,
                opacity: 0.5,
                dashArray: '4, 8'
              }}
              eventHandlers={{
                click: () => onSelectRoute?.(route.id)
              }}
            />
          );
        })}

        {/* Active Route Glowing Polyline */}
        {activeRoute?.coordinates && activeRoute.coordinates.length > 0 && (
          <>
            {/* Outer Glow Line */}
            <Polyline
              positions={activeRoute.coordinates}
              pathOptions={{
                color: activeRoute.accentColor || '#ff7722',
                weight: 8,
                opacity: 0.35,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
            {/* Core Crisp Route Line */}
            <Polyline
              positions={activeRoute.coordinates}
              pathOptions={{
                color: activeRoute.accentColor || '#ff7722',
                weight: 4.5,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
          </>
        )}

        {/* Origin Marker */}
        {startPoint && (
          <Marker position={startPoint} icon={startIcon}>
            <Popup className="custom-leaflet-popup">
              <div className="p-1">
                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] mb-1">
                  Trip Start
                </Badge>
                <div className="font-semibold text-sm text-zinc-900">{originName}</div>
                <div className="text-xs text-zinc-500 mt-0.5">Live GPS & Route Departure</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {endPoint && (
          <Marker position={endPoint} icon={destIcon}>
            <Popup className="custom-leaflet-popup">
              <div className="p-1">
                <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[10px] mb-1">
                  Destination
                </Badge>
                <div className="font-semibold text-sm text-zinc-900">{destName}</div>
                <div className="text-xs text-zinc-500 mt-0.5">ETA: {activeRoute?.eta || 'Calculating...'}</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Vehicle Simulator Marker (if active) */}
        {vehiclePosition && (
          <Marker position={vehiclePosition} icon={vehicleIcon(vehicleHeading)}>
            <Popup className="custom-leaflet-popup">
              <div className="p-1 text-center">
                <div className="font-bold text-xs text-orange-600">Active Live Navigation</div>
                <div className="text-[11px] text-zinc-600">Simulated Indian Commute Speed</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Road Hazards Overlay */}
        {showHazards && showPotholeHeatmap && activeRoute?.hazards && activeRoute.hazards.map((hazard) => (
          <Marker
            key={hazard.id}
            position={hazard.coordinates}
            icon={hazardIcon(hazard.type, hazard.severity)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-1 max-w-[220px]">
                <div className="flex items-center justify-between mb-1 gap-1">
                  <Badge variant={hazard.severity === 'critical' || hazard.severity === 'high' ? 'destructive' : 'secondary'} className="text-[10px]">
                    {hazard.type.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-[10px] text-zinc-400">{hazard.verifiedCount} verified</span>
                </div>
                <div className="font-semibold text-xs text-zinc-900 mb-0.5">{hazard.title}</div>
                <div className="text-[11px] text-zinc-600 leading-tight">{hazard.description}</div>
                <div className="text-[9px] text-zinc-400 mt-1">{hazard.reportedAt}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Bottom Quick Legend & Action */}
      <div className="absolute bottom-4 left-4 right-4 z-[500] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-3 text-xs text-zinc-300 pointer-events-auto">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Origin</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span>Destination</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs">🕳️</span>
            <span>Pothole/Hazard</span>
          </div>
        </div>

        {onReportHazardClick && (
          <Button
            size="sm"
            onClick={onReportHazardClick}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium text-xs shadow-lg shadow-orange-500/30 rounded-xl pointer-events-auto border border-orange-400/30"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
            Report Road Hazard
          </Button>
        )}
      </div>
    </div>
  );
};
