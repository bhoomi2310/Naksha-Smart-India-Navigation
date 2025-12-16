import React, { useState } from 'react';
import { Search, MapPin, Navigation as NavigationIcon, Clock, Shield, Leaf, Camera, DollarSign, Users, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RouteCard from '@/components/RouteCard';
import SearchInterface from '@/components/SearchInterface';
import Navigation from '@/components/Navigation';
import MLModelDemo from '@/components/MLModelDemo';

import DataInsights from '@/components/DataInsights';
import heroImage from '@/assets/naksha-hero.jpg';
import routeOptionsImage from '@/assets/route-options.jpg';

const Index = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

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
      
      {/* Hero Section */}
      <section 
        className="hero-gradient py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 138, 30, 0.9), rgba(54, 54, 82, 0.9)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            <span className="text-white">Naksha</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 mb-8 max-w-4xl mx-auto drop-shadow-md">
            India-specific navigation that understands real road conditions. Get routes that are not just shortest, 
            but also safest, cheapest, greener, and culturally richer.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2 bg-white/20 text-white backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              Real Road Data
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 bg-white/20 text-white backdrop-blur-sm">
              <MapPin className="w-4 h-4 mr-2" />
              Indian Context
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 bg-white/20 text-white backdrop-blur-sm">
              <NavigationIcon className="w-4 h-4 mr-2" />
              6 Route Types
            </Badge>
          </div>
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
          />
        </div>
      </section>

      {/* Route Options */}
      {(fromLocation || toLocation) && (
        <section 
          className="py-16 px-4 sm:px-6 lg:px-8 relative"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${routeOptionsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Choose Your Perfect Route</h2>
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
      )}

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  Ground Reality Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We measure actual travel times, potholes, road roughness, and safety features for more accurate ETAs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Indian Context Awareness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our model includes encroachments, street vendors, broken drains, and unsafe alleys for safer route suggestions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <NavigationIcon className="w-5 h-5 text-secondary" />
                  Multiple Meaningful Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose from fastest, safest, eco-friendly, cheapest, scenic, or most popular routes based on your needs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ML Model Demo */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <MLModelDemo />
        </div>
      </section>


      {/* Data Insights */}
      <DataInsights />

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Naksha</h3>
          <p className="text-secondary-foreground/80">
            Smart Indian Navigation • Built with Real Road Data • Powered by ML
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;