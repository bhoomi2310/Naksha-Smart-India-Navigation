import React from 'react';
import { Search, Navigation as NavigationIcon, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface SearchInterfaceProps {
  fromLocation: string;
  toLocation: string;
  setFromLocation: (value: string) => void;
  setToLocation: (value: string) => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({
  fromLocation,
  toLocation,
  setFromLocation,
  setToLocation
}) => {
  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = () => {
    // This would trigger the route search
    console.log('Searching routes from', fromLocation, 'to', toLocation);
  };

  return (
    <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-4 w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <Input
                placeholder="From: Current location"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="pl-12 h-14 text-base rounded-xl border-2 focus:border-primary transition-colors"
              />
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={swapLocations}
              className="p-3 h-14 w-14 rounded-xl hover:bg-accent hover:rotate-180 transition-all duration-300"
            >
              <ArrowUpDown className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 relative">
              <div className="absolute left-4 top-4 w-2 h-2 rounded-full bg-destructive animate-pulse"></div>
              <Input
                placeholder="To: Destination"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="pl-12 h-14 text-base rounded-xl border-2 focus:border-primary transition-colors"
              />
            </div>
          </div>
          <div className="flex justify-center pt-2">
            <Button 
              onClick={handleSearch}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              disabled={!fromLocation || !toLocation}
              size="lg"
            >
              <NavigationIcon className="w-5 h-5" />
              Find Smart Routes
            </Button>
          </div>
          
          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setFromLocation('Dwarka Sector 21 Metro');
                setToLocation('Connaught Place');
              }}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Dwarka → CP
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setFromLocation('IGI Airport Terminal 3');
                setToLocation('Dwarka Sector 12');
              }}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Airport → Dwarka
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setFromLocation('Dwarka City Center');
                setToLocation('India Gate');
              }}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              City Center → India Gate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchInterface;