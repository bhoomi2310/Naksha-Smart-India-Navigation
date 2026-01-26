import React, { useState, useRef, useEffect } from 'react';
import { Search, Navigation as NavigationIcon, ArrowUpDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { searchLocations } from '@/data/indianCities';

interface SearchInterfaceProps {
  fromLocation: string;
  toLocation: string;
  setFromLocation: (value: string) => void;
  setToLocation: (value: string) => void;
  onSearch?: () => void;
  isLoading?: boolean;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({
  fromLocation,
  toLocation,
  setFromLocation,
  setToLocation,
  onSearch,
  isLoading = false
}) => {
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFromChange = (value: string) => {
    setFromLocation(value);
    if (value.length > 0) {
      const results = searchLocations(value);
      setFromSuggestions(results.map(r => r.value));
      setShowFromSuggestions(true);
    } else {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = (value: string) => {
    setToLocation(value);
    if (value.length > 0) {
      const results = searchLocations(value);
      setToSuggestions(results.map(r => r.value));
      setShowToSuggestions(true);
    } else {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }
  };

  const selectFromLocation = (location: string) => {
    setFromLocation(location);
    setShowFromSuggestions(false);
    fromInputRef.current?.blur();
  };

  const selectToLocation = (location: string) => {
    setToLocation(location);
    setShowToSuggestions(false);
    toInputRef.current?.blur();
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = async () => {
    if (onSearch) {
      onSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && fromLocation && toLocation) {
      handleSearch();
    }
  };

  return (
    <Card className="shadow-2xl border-2 border-orange-200 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative" ref={fromDropdownRef}>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 z-10"></div>
              <Input
                ref={fromInputRef}
                placeholder="From (e.g., Connaught Place, Delhi)"
                value={fromLocation}
                onChange={(e) => handleFromChange(e.target.value)}
                onFocus={() => fromLocation.length > 0 && setShowFromSuggestions(true)}
                onKeyPress={handleKeyPress}
                className="pl-8 h-12 text-base rounded-lg border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {fromSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectFromLocation(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-orange-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-900 dark:text-white"
                    >
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={swapLocations}
              className="p-2 h-12 w-12 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <ArrowUpDown className="w-4 h-4 text-orange-600" />
            </Button>
            
            <div className="flex-1 relative" ref={toDropdownRef}>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500 z-10"></div>
              <Input
                ref={toInputRef}
                placeholder="To (e.g., India Gate, Delhi)"
                value={toLocation}
                onChange={(e) => handleToChange(e.target.value)}
                onFocus={() => toLocation.length > 0 && setShowToSuggestions(true)}
                onKeyPress={handleKeyPress}
                className="pl-8 h-12 text-base rounded-lg border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {toSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectToLocation(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-orange-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-900 dark:text-white"
                    >
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Button 
            onClick={handleSearch}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            disabled={!fromLocation || !toLocation || isLoading}
          >
            <NavigationIcon className="w-4 h-4 mr-2" />
            {isLoading ? 'Searching...' : 'Find Routes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchInterface;