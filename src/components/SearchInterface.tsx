import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRightLeft, MapPin, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchLocations } from '@/data/indianCities';
import { POPULAR_INDIAN_CORRIDORS } from '@/lib/routingService';
import { toast } from 'sonner';

interface SearchInterfaceProps {
  fromLocation: string;
  toLocation: string;
  setFromLocation: (value: string) => void;
  setToLocation: (value: string) => void;
  onSearch?: () => void;
  isLoading?: boolean;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({
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

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      toast.info('Fetching GPS coordinates...');
      navigator.geolocation.getCurrentPosition(
        () => {
          setFromLocation('Current GPS Location, India');
          toast.success('Live GPS coordinates set');
        },
        () => {
          toast.error('Unable to fetch live location. Please enter manually.');
        }
      );
    }
  };

  const handleSelectCorridor = (from: string, to: string) => {
    setFromLocation(from);
    setToLocation(to);
    setTimeout(() => {
      onSearch?.();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && fromLocation && toLocation) {
      onSearch?.();
    }
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 text-white">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-600/10 text-orange-400 border border-orange-500/20">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white">Smart Route Planner</h3>
            <p className="text-xs text-zinc-400">Road quality, lighting index, and transit fares</p>
          </div>
        </div>

        <button
          onClick={handleUseCurrentLocation}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-emerald-400 border border-zinc-700 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Use Current Location
        </button>
      </div>

      {/* Origin & Destination Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-2.5">
        {/* Origin Field */}
        <div className="relative" ref={fromDropdownRef}>
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 z-10"></div>
          <Input
            ref={fromInputRef}
            placeholder="Starting Point (e.g. Connaught Place, Delhi)"
            value={fromLocation}
            onChange={(e) => handleFromChange(e.target.value)}
            onFocus={() => fromLocation.length > 0 && setShowFromSuggestions(true)}
            onKeyDown={handleKeyPress}
            className="pl-9 pr-3 h-12 text-sm rounded-xl border-zinc-700/80 bg-zinc-950 text-white placeholder:text-zinc-500"
          />
          {showFromSuggestions && fromSuggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl max-h-56 overflow-y-auto divide-y divide-zinc-800/60">
              {fromSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectFromLocation(suggestion)}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-zinc-800 flex items-center gap-2 text-xs text-zinc-200 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={swapLocations}
            className="h-10 w-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
            title="Swap Origin & Destination"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Destination Field */}
        <div className="relative" ref={toDropdownRef}>
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-500 z-10"></div>
          <Input
            ref={toInputRef}
            placeholder="Destination (e.g. Cyber City, Gurgaon)"
            value={toLocation}
            onChange={(e) => handleToChange(e.target.value)}
            onFocus={() => toLocation.length > 0 && setShowToSuggestions(true)}
            onKeyDown={handleKeyPress}
            className="pl-9 pr-3 h-12 text-sm rounded-xl border-zinc-700/80 bg-zinc-950 text-white placeholder:text-zinc-500"
          />
          {showToSuggestions && toSuggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl max-h-56 overflow-y-auto divide-y divide-zinc-800/60">
              {toSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectToLocation(suggestion)}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-zinc-800 flex items-center gap-2 text-xs text-zinc-200 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Search Action Button */}
      <Button
        type="button"
        disabled={isLoading || !fromLocation || !toLocation}
        onClick={onSearch}
        className="w-full h-12 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm rounded-xl transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Evaluating Indian Road Conditions...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Find Routes
          </span>
        )}
      </Button>

      {/* Popular Quick Corridor Chips */}
      <div className="pt-2 border-t border-zinc-800">
        <div className="text-[11px] font-medium text-zinc-400 mb-2">
          Popular Corridors:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_INDIAN_CORRIDORS.map((corridor, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectCorridor(corridor.from, corridor.to)}
              className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-colors"
            >
              {corridor.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchInterface;