import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Check } from 'lucide-react';

interface RouteCardProps {
  route: {
    id: string;
    type: string;
    icon: React.ElementType;
    duration: string;
    distance: string;
    description: string;
    features: string[];
    eta: string;
    color: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, isSelected, onSelect }) => {
  const Icon = route.icon;

  return (
    <Card 
      className={`hover-lift cursor-pointer transition-all ${
        isSelected 
          ? 'ring-2 ring-primary shadow-lg' 
          : 'hover:shadow-md'
      } ${route.color} border-2`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            <CardTitle className="text-lg">{route.type}</CardTitle>
          </div>
          {isSelected && (
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>
        <CardDescription className="text-sm">
          {route.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Duration and Distance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm font-medium">
                <Clock className="w-4 h-4" />
                {route.duration}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                {route.distance}
              </div>
            </div>
          </div>
          
          {/* ETA */}
          <div className="text-sm text-muted-foreground">
            {route.eta}
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {route.features.map((feature, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-1"
              >
                {feature}
              </Badge>
            ))}
          </div>
          
          {/* Select Button */}
          <Button 
            variant={isSelected ? "default" : "outline"} 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {isSelected ? 'Selected' : 'Select Route'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteCard;