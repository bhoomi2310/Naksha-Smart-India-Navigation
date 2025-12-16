import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Shield, Leaf, Camera, DollarSign, Users, MapPin, Navigation as NavigationIcon } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RouteCard from '@/components/RouteCard';

const Routes = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

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
      icon: DollarSign,
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Find Your Perfect Route</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from six intelligent route options tailored to your specific needs and preferences.
          </p>
        </div>
      </section>

      {/* Search Interface */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter starting location"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <div className="relative">
                    <NavigationIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter destination"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button className="w-full">Find Routes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Route Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Route Types</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each route is optimized for different priorities - choose what matters most to you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routeOptions.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                isSelected={selectedRoute === route.id}
                onSelect={() => setSelectedRoute(route.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Our Routing Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system considers real-world factors that traditional maps ignore.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                  Data Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We collect real-world data including potholes, traffic patterns, lighting conditions, and actual travel times.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                  ML Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our machine learning model analyzes hundreds of factors to predict the best routes for different scenarios.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                  Smart Routing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get personalized route recommendations based on your preferences, time of day, and current conditions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Routes;