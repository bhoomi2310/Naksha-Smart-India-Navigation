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
      className={`cursor-pointer transition-all border-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md ${
        isSelected 
          ? 'ring-2 ring-orange-500 shadow-xl border-orange-400 dark:border-orange-600 scale-105' 
          : 'hover:shadow-lg border-orange-200 dark:border-gray-700 hover:scale-[1.02]'
      } ${route.color}`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            <CardTitle className="text-base font-bold text-gray-900 dark:text-white">{route.type}</CardTitle>
          </div>
          {isSelected && (
            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <CardDescription className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {route.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white">
            <Clock className="w-4 h-4" />
            {route.duration}
          </div>
          <div className="flex items-center gap-1.5 font-medium text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            {route.distance}
          </div>
        </div>
        
        <Button 
          variant={isSelected ? "default" : "outline"} 
          className={`w-full font-semibold ${
            isSelected 
              ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500' 
              : 'border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? 'Selected' : 'Select Route'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RouteCard;