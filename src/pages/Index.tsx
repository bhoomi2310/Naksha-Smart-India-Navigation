import React, { useState } from 'react';
import { Clock, Shield, Leaf, Camera, IndianRupee, Users } from 'lucide-react';
import RouteCard from '@/components/RouteCard';
import RouteDetails from '@/components/RouteDetails';
import SearchInterface from '@/components/SearchInterface';
import Navigation from '@/components/Navigation';
import DataInsights from '@/components/DataInsights';
import { navigationAPI } from '@/lib/api';
import { toast } from 'sonner';

// Import image - if file doesn't exist, create it manually (see IMAGE_SETUP.md)
import tajMahalImage from '@/assets/taj-mahal.png';

const Index = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedRouteData, setSelectedRouteData] = useState<any>(null);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
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
        toast.error('Could not find routes. Please check your locations.');
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
      {/* Full Page Background - Taj Mahal (Image 1) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${tajMahalImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-hero text-white mb-6 drop-shadow-2xl font-extrabold">
              Welcome to Naksha
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 mb-10 max-w-2xl mx-auto font-light drop-shadow-lg">
              Smart navigation for Indian roads. Routes that understand real conditions.
            </p>
          </div>
        </section>

        {/* Search Interface */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="max-w-4xl mx-auto">
            <SearchInterface 
              fromLocation={fromLocation}
              toLocation={toLocation}
              setFromLocation={setFromLocation}
              setToLocation={setToLocation}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>
        </section>

        {/* Route Options */}
        {(fromLocation && toLocation) && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="heading-section text-center mb-10 text-white drop-shadow-lg">Route Options</h2>
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-white/90 text-lg">Finding best routes...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        )}

        {/* Route Details Section */}
        {selectedRoute && selectedRouteData && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <RouteDetails routeData={selectedRouteData} routeType={selectedRoute} />
            </div>
          </section>
        )}

        {/* Data Insights */}
        <DataInsights />

        {/* Footer */}
        <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2 text-white">Naksha</h3>
            <p className="text-white/80 text-sm">
              Smart navigation for Indian roads
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
