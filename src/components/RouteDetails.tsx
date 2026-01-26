import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Navigation, TrendingUp, Fuel, Shield, Leaf } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface RouteDetailsProps {
  routeData: {
    type: string;
    distance: string;
    duration: string;
    summary?: {
      distance: number;
      duration: number;
    };
    from?: string;
    to?: string;
    geometry?: any;
    features?: string[];
  } | null;
  routeType: string;
}

const RouteDetails: React.FC<RouteDetailsProps> = ({ routeData, routeType }) => {
  if (!routeData) {
    return null;
  }

  const getRouteIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'fastest':
        return <Clock className="w-5 h-5" />;
      case 'safest':
        return <Shield className="w-5 h-5" />;
      case 'eco':
        return <Leaf className="w-5 h-5" />;
      default:
        return <Navigation className="w-5 h-5" />;
    }
  };

  const getRouteColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'fastest':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'safest':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'eco':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'scenic':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'cheapest':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'popular':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-2 border-orange-200 dark:border-gray-800 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getRouteIcon(routeType)}
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {routeData.type || routeType}
            </CardTitle>
          </div>
          <Badge className={`${getRouteColor(routeType)} font-semibold`}>
            Selected
          </Badge>
        </div>
        <CardDescription className="text-base mt-2">
          Complete route information and details
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Route Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Distance</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{routeData.distance}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Duration</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{routeData.duration}</p>
          </div>
        </div>

        {/* Route Path */}
        {routeData.from && routeData.to && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-orange-500" />
                Route Path
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium text-gray-900 dark:text-white">{routeData.from}</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-green-500 to-orange-500"></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="font-medium text-gray-900 dark:text-white">{routeData.to}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Route Features */}
        {routeData.features && routeData.features.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                Route Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {routeData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Additional Stats */}
        {routeData.summary && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Route Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Distance</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {routeData.summary.distance.toFixed(2)} km
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Estimated Time</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {Math.round(routeData.summary.duration)} minutes
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteDetails;
