import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Shield, Leaf, Camera, Users, MapPin, Navigation as NavigationIcon, IndianRupee } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RouteCard from '@/components/RouteCard';
import RouteDetails from '@/components/RouteDetails';
import { navigationAPI } from '@/lib/api';
import { toast } from 'sonner';
import hampiImage from '@/assets/hampi.png';

const Routes = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!fromLocation || !toLocation) {
      toast.error('Please enter both starting location and destination');
      return;
    }

    setIsLoading(true);
    try {
      // Fetch routes for all types
      const routeTypes = ['fastest', 'safest', 'eco', 'scenic', 'cheapest', 'popular'];
      const routePromises = routeTypes.map(type => 
        navigationAPI.getRoutes(fromLocation, toLocation, type).catch(err => {
          console.error(`Error fetching ${type} route:`, err);
          return null;
        })
      );

      const results = await Promise.all(routePromises);
      const validRoutes = results.filter(r => r !== null);
      
      if (validRoutes.length > 0) {
        setRoutes(validRoutes);
        toast.success(`Found ${validRoutes.length} route options!`);
      } else {
        toast.error('Could not find routes. Please check your locations and API key.');
      }
    } catch (error: any) {
      console.error('Route search error:', error);
      toast.error(error.message || 'Failed to fetch routes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouteSelect = async (routeId: string) => {
    if (!fromLocation || !toLocation) {
      toast.error('Please search for routes first');
      return;
    }

    setSelectedRoute(routeId);
    
    try {
      const routeData = await navigationAPI.getRoutes(fromLocation, toLocation, routeId);
      const routeOption = routeOptions.find(r => r.id === routeId);
      
      if (routeData?.routes?.[0]) {
        const selectedData = {
          ...routeData.routes[0],
          type: routeOption?.type || routeId,
          from: fromLocation,
          to: toLocation,
          features: routeOption?.features || []
        };
        setSelectedRouteData(selectedData);
        toast.success(`${routeOption?.type} selected!`);
      } else {
        toast.error('Route data not available');
      }
    } catch (error: any) {
      console.error('Route selection error:', error);
      toast.error(error.message || 'Failed to load route details');
    }
  };

  const routeOptions = [
    {
      id: 'fastest',
      type: 'Fastest Route',
      icon: Clock,
      duration: '18 mins',
      distance: '7.2 km',
      description: 'Time-optimized using real measured speeds',
      features: ['Real traffic data', 'Dynamic routing', 'Live updates'],
      eta: 'Arrives by 3:45 PM',
      color: 'route-fastest'
    },
    {
      id: 'safest', 
      type: 'Safest Route',
      icon: Shield,
      duration: '22 mins',
      distance: '8.1 km',
      description: 'Well-lit roads, fewer potholes, safer at night',
      features: ['Good lighting', 'Better road condition', 'Lower crime rate'],
      eta: 'Arrives by 3:49 PM',
      color: 'route-safest'
    },
    {
      id: 'eco',
      type: 'Eco-Friendly Route',
      icon: Leaf,
      duration: '25 mins',
      distance: '7.8 km',
      description: 'Minimum stop-and-go, fuel efficient',
      features: ['Less fuel consumption', 'Fewer signals', 'Smooth traffic'],
      eta: 'Arrives by 3:52 PM',
      color: 'route-eco'
    },
    {
      id: 'scenic',
      type: 'Scenic Route',
      icon: Camera,
      duration: '28 mins',
      distance: '9.5 km',
      description: 'Routes through parks, markets, monuments',
      features: ['Beautiful views', 'Cultural sites', 'Local attractions'],
      eta: 'Arrives by 3:55 PM',
      color: 'route-scenic'
    },
    {
      id: 'cheapest',
      type: 'Cheapest Route',
      icon: IndianRupee,
      duration: '35 mins',
      distance: '12.3 km',
      description: 'Bus + metro integration with fare calculation',
      features: ['₹25 total fare', 'Public transport', 'Metro + bus combo'],
      eta: 'Arrives by 4:02 PM',
      color: 'route-cheapest'
    },
    {
      id: 'popular',
      type: 'Most Popular Route',
      icon: Users,
      duration: '20 mins',
      distance: '7.5 km',
      description: 'What most locals actually take',
      features: ['Local favorite', 'Familiar roads', 'Community tested'],
      eta: 'Arrives by 3:47 PM',
      color: 'route-popular'
    }
  ];

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden relative">
      {/* Full Page Background - Hampi Stone Chariot (Image 2) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${hampiImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        {/* Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="heading-section text-white mb-6 drop-shadow-2xl font-extrabold">
              Find Your Perfect Route
            </h1>
            <p className="text-xl text-white/95 max-w-3xl mx-auto font-light drop-shadow-lg">
              Choose from six intelligent route options tailored to your specific needs and preferences.
            </p>
          </div>
        </section>

        {/* Search Interface */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                      <Input
                        placeholder="Enter starting location"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && fromLocation && toLocation && handleSearch()}
                        className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">To</label>
                    <div className="relative">
                      <NavigationIcon className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                      <Input
                        placeholder="Enter destination"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && fromLocation && toLocation && handleSearch()}
                        className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold"
                    onClick={handleSearch}
                    disabled={!fromLocation || !toLocation || isLoading}
                  >
                    {isLoading ? 'Searching...' : 'Find Routes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Route Options */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-section mb-4 text-white drop-shadow-lg font-bold">Available Route Types</h2>
              <p className="text-white/90 max-w-2xl mx-auto font-light">
                Each route is optimized for different priorities - choose what matters most to you.
              </p>
            </div>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-white/90 text-lg">Finding best routes...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {routeOptions.map((route) => {
                  // Try to find real data for this route
                  const realRouteData = routes.find(r => {
                    const routeType = r.routes?.[0]?.type;
                    return routeType === route.id || 
                           (routeType === 'fastest' && route.id === 'fastest') ||
                           (routeType && routeType.includes(route.id));
                  });
                  
                  const displayRoute = realRouteData?.routes?.[0]
                    ? {
                        ...route,
                        duration: `${Math.round(realRouteData.routes[0].summary.duration)} mins`,
                        distance: `${realRouteData.routes[0].summary.distance.toFixed(1)} km`,
                        realData: true
                      }
                    : route;

                  return (
                    <RouteCard
                      key={route.id}
                      route={displayRoute}
                      isSelected={selectedRoute === route.id}
                      onSelect={() => handleRouteSelect(route.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Route Details Section */}
        {selectedRoute && selectedRouteData && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <RouteDetails routeData={selectedRouteData} routeType={selectedRoute} />
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-section mb-4 text-white drop-shadow-lg font-bold">How Our Routing Works</h2>
              <p className="text-white/90 max-w-2xl mx-auto font-light">
                Our AI-powered system considers real-world factors that traditional maps ignore.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Data Collection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We collect real-world data including potholes, traffic patterns, lighting conditions, and actual travel times.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    ML Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our machine learning model analyzes hundreds of factors to predict the best routes for different scenarios.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Smart Routing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Get personalized route recommendations based on your preferences, time of day, and current conditions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Routes;
