import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Search, 
  ArrowRightLeft, 
  MapPin, 
  Compass, 
  Train, 
  Plane, 
  Landmark, 
  Navigation as NavIcon, 
  X, 
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  searchLocations, 
  fetchLiveLocationSuggestions, 
  LocationSuggestion 
} from '@/data/indianCities';
import { POPULAR_INDIAN_CORRIDORS, reverseGeocode } from '@/lib/routingService';
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
  const [fromSuggestions, setFromSuggestions] = useState<LocationSuggestion[]>([]);
  const [toSuggestions, setToSuggestions] = useState<LocationSuggestion[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [isFetchingFromLive, setIsFetchingFromLive] = useState(false);
  const [isFetchingToLive, setIsFetchingToLive] = useState(false);
  const [fromActiveIndex, setFromActiveIndex] = useState(-1);
  const [toActiveIndex, setToActiveIndex] = useState(-1);

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);
  const fromAbortRef = useRef<AbortController | null>(null);
  const toAbortRef = useRef<AbortController | null>(null);
  const fromDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const toDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (fromDebounceRef.current) clearTimeout(fromDebounceRef.current);
      if (toDebounceRef.current) clearTimeout(toDebounceRef.current);
    };
  }, []);

  // Helper to merge local instant suggestions with live geocoder suggestions
  const mergeSuggestions = (local: LocationSuggestion[], live: LocationSuggestion[]): LocationSuggestion[] => {
    const seen = new Set<string>();
    const merged: LocationSuggestion[] = [];

    // Add local first (instant & reliable)
    for (const item of local) {
      const key = item.value.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(item);
      }
    }

    // Add live results
    for (const item of live) {
      const key = item.value.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(item);
      }
      if (merged.length >= 8) break;
    }

    return merged.slice(0, 8);
  };

  // Instant typing handler for Origin (From)
  const handleFromChange = (value: string) => {
    setFromLocation(value);
    setFromActiveIndex(-1);

    if (fromAbortRef.current) {
      fromAbortRef.current.abort();
    }
    if (fromDebounceRef.current) {
      clearTimeout(fromDebounceRef.current);
    }

    if (value.trim().length > 0) {
      // 1. Instant 0ms local match
      const localResults = searchLocations(value);
      setFromSuggestions(localResults);
      setShowFromSuggestions(true);

      // 2. Debounced live Indian geocoder lookup (140ms)
      if (value.trim().length >= 2) {
        setIsFetchingFromLive(true);
        const controller = new AbortController();
        fromAbortRef.current = controller;

        fromDebounceRef.current = setTimeout(async () => {
          try {
            const liveResults = await fetchLiveLocationSuggestions(value, controller.signal);
            if (!controller.signal.aborted) {
              setFromSuggestions(prev => mergeSuggestions(prev, liveResults));
            }
          } finally {
            if (!controller.signal.aborted) {
              setIsFetchingFromLive(false);
            }
          }
        }, 140);
      } else {
        setIsFetchingFromLive(false);
      }
    } else {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
      setIsFetchingFromLive(false);
    }
  };

  // Instant typing handler for Destination (To)
  const handleToChange = (value: string) => {
    setToLocation(value);
    setToActiveIndex(-1);

    if (toAbortRef.current) {
      toAbortRef.current.abort();
    }
    if (toDebounceRef.current) {
      clearTimeout(toDebounceRef.current);
    }

    if (value.trim().length > 0) {
      // 1. Instant 0ms local match
      const localResults = searchLocations(value);
      setToSuggestions(localResults);
      setShowToSuggestions(true);

      // 2. Debounced live Indian geocoder lookup (140ms)
      if (value.trim().length >= 2) {
        setIsFetchingToLive(true);
        const controller = new AbortController();
        toAbortRef.current = controller;

        toDebounceRef.current = setTimeout(async () => {
          try {
            const liveResults = await fetchLiveLocationSuggestions(value, controller.signal);
            if (!controller.signal.aborted) {
              setToSuggestions(prev => mergeSuggestions(prev, liveResults));
            }
          } finally {
            if (!controller.signal.aborted) {
              setIsFetchingToLive(false);
            }
          }
        }, 140);
      } else {
        setIsFetchingToLive(false);
      }
    } else {
      setToSuggestions([]);
      setShowToSuggestions(false);
      setIsFetchingToLive(false);
    }
  };

  const selectFromLocation = (item: LocationSuggestion | string) => {
    const val = typeof item === 'string' ? item : item.value;
    setFromLocation(val);
    setShowFromSuggestions(false);
    setFromActiveIndex(-1);
    if (!toLocation) {
      toInputRef.current?.focus();
    }
  };

  const selectToLocation = (item: LocationSuggestion | string) => {
    const val = typeof item === 'string' ? item : item.value;
    setToLocation(val);
    setShowToSuggestions(false);
    setToActiveIndex(-1);
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
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const friendlyName = await reverseGeocode(lat, lng);
          setFromLocation(friendlyName || `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          toast.success('Current location detected');
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
    setShowFromSuggestions(false);
    setShowToSuggestions(false);
    setTimeout(() => {
      onSearch?.();
    }, 100);
  };

  // Keyboard navigation for From input
  const handleFromKeyDown = (e: React.KeyboardEvent) => {
    if (!showFromSuggestions || fromSuggestions.length === 0) {
      if (e.key === 'Enter' && fromLocation && toLocation) {
        onSearch?.();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFromActiveIndex(prev => (prev < fromSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFromActiveIndex(prev => (prev > 0 ? prev - 1 : fromSuggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (fromActiveIndex >= 0 && fromActiveIndex < fromSuggestions.length) {
        selectFromLocation(fromSuggestions[fromActiveIndex]);
      } else if (fromLocation && toLocation) {
        setShowFromSuggestions(false);
        onSearch?.();
      }
    } else if (e.key === 'Escape') {
      setShowFromSuggestions(false);
    }
  };

  // Keyboard navigation for To input
  const handleToKeyDown = (e: React.KeyboardEvent) => {
    if (!showToSuggestions || toSuggestions.length === 0) {
      if (e.key === 'Enter' && fromLocation && toLocation) {
        onSearch?.();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setToActiveIndex(prev => (prev < toSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setToActiveIndex(prev => (prev > 0 ? prev - 1 : toSuggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (toActiveIndex >= 0 && toActiveIndex < toSuggestions.length) {
        selectToLocation(toSuggestions[toActiveIndex]);
      } else if (fromLocation && toLocation) {
        setShowToSuggestions(false);
        onSearch?.();
      }
    } else if (e.key === 'Escape') {
      setShowToSuggestions(false);
    }
  };

  // Helper for suggestion icon
  const getSuggestionIcon = (type?: string) => {
    switch (type) {
      case 'station':
      case 'transit':
        return <Train className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />;
      case 'airport':
        return <Plane className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />;
      case 'landmark':
        return <Landmark className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />;
      case 'highway':
        return <NavIcon className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[4px_4px_0_#14121F] rounded-2xl p-5 space-y-4 text-[#14121F]">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#FDF0ED] text-[#D8472B] border-[1.2px] border-[#14121F]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#14121F]">Smart Route Planner</h3>
            <p className="text-xs text-[#524C61]">Road quality, lighting index, and transit fares</p>
          </div>
        </div>

        <button
          onClick={handleUseCurrentLocation}
          type="button"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF5EC] hover:bg-[#EAF4F3] text-xs font-bold text-[#1F6F6B] border-[1.2px] border-[#14121F] shadow-[1px_1px_0_#14121F] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#1F6F6B]"></span>
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
            placeholder="Starting Point (e.g. Connaught Place, Dwarka, Bandra)"
            value={fromLocation}
            onChange={(e) => handleFromChange(e.target.value)}
            onFocus={() => {
              if (fromLocation.trim().length > 0) {
                setShowFromSuggestions(true);
              }
            }}
            onKeyDown={handleFromKeyDown}
            autoComplete="off"
            className="pl-9 pr-9 h-12 text-sm rounded-xl border-[1.5px] border-[#14121F] bg-[#FFFDF9] text-[#14121F] placeholder:text-[#524C61]/70 focus:bg-[#FFFDF9] focus:border-[#D8472B] shadow-[2px_2px_0_#14121F]"
          />

          {fromLocation && (
            <button
              type="button"
              onClick={() => {
                setFromLocation('');
                setFromSuggestions([]);
                setShowFromSuggestions(false);
                fromInputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#524C61] hover:text-[#14121F] rounded-full transition-colors z-10"
              title="Clear origin"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Suggestions Dropdown for Origin */}
          {showFromSuggestions && (fromSuggestions.length > 0 || isFetchingFromLive) && (
            <div className="absolute z-50 left-0 right-0 mt-1.5 bg-[#FFFDF9] border-[1.5px] border-[#14121F] rounded-xl shadow-[4px_4px_0_#14121F] max-h-64 overflow-y-auto divide-y divide-[#14121F]/10">
              <div className="px-3 py-1.5 bg-[#FAF5EC] flex items-center justify-between text-[11px] font-bold text-[#524C61]">
                <span>Location suggestions</span>
                {isFetchingFromLive && (
                  <span className="flex items-center gap-1 text-[#D8472B]">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Searching...
                  </span>
                )}
              </div>

              {fromSuggestions.map((item, index) => {
                const isSelected = index === fromActiveIndex;
                return (
                  <button
                    key={`${item.value}-${index}`}
                    type="button"
                    onClick={() => selectFromLocation(item)}
                    onMouseEnter={() => setFromActiveIndex(index)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 transition-colors ${
                      isSelected
                        ? 'bg-[#FEF8EA] text-[#14121F]'
                        : 'hover:bg-[#FAF5EC] text-[#14121F]'
                    }`}
                  >
                    <div className="mt-0.5">{getSuggestionIcon(item.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs truncate text-[#14121F]">
                          {item.title}
                        </span>
                        {item.type && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-[#FAF5EC] border-[1px] border-[#14121F]/20 text-[#524C61]">
                            {item.type}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#524C61] truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
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
            className="h-10 w-10 rounded-xl bg-[#FAF5EC] hover:bg-[#F6EFE3] text-[#14121F] border-[1.5px] border-[#14121F] shadow-[2px_2px_0_#14121F]"
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
            placeholder="Destination (e.g. Cyber City, Airport, HSR Layout)"
            value={toLocation}
            onChange={(e) => handleToChange(e.target.value)}
            onFocus={() => {
              if (toLocation.trim().length > 0) {
                setShowToSuggestions(true);
              }
            }}
            onKeyDown={handleToKeyDown}
            autoComplete="off"
            className="pl-9 pr-9 h-12 text-sm rounded-xl border-[1.5px] border-[#14121F] bg-[#FFFDF9] text-[#14121F] placeholder:text-[#524C61]/70 focus:bg-[#FFFDF9] focus:border-[#D8472B] shadow-[2px_2px_0_#14121F]"
          />

          {toLocation && (
            <button
              type="button"
              onClick={() => {
                setToLocation('');
                setToSuggestions([]);
                setShowToSuggestions(false);
                toInputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#524C61] hover:text-[#14121F] rounded-full transition-colors z-10"
              title="Clear destination"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Suggestions Dropdown for Destination */}
          {showToSuggestions && (toSuggestions.length > 0 || isFetchingToLive) && (
            <div className="absolute z-50 left-0 right-0 mt-1.5 bg-[#FFFDF9] border-[1.5px] border-[#14121F] rounded-xl shadow-[4px_4px_0_#14121F] max-h-64 overflow-y-auto divide-y divide-[#14121F]/10">
              <div className="px-3 py-1.5 bg-[#FAF5EC] flex items-center justify-between text-[11px] font-bold text-[#524C61]">
                <span>Location suggestions</span>
                {isFetchingToLive && (
                  <span className="flex items-center gap-1 text-[#D8472B]">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Searching...
                  </span>
                )}
              </div>

              {toSuggestions.map((item, index) => {
                const isSelected = index === toActiveIndex;
                return (
                  <button
                    key={`${item.value}-${index}`}
                    type="button"
                    onClick={() => selectToLocation(item)}
                    onMouseEnter={() => setToActiveIndex(index)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 transition-colors ${
                      isSelected
                        ? 'bg-[#FEF8EA] text-[#14121F]'
                        : 'hover:bg-[#FAF5EC] text-[#14121F]'
                    }`}
                  >
                    <div className="mt-0.5">{getSuggestionIcon(item.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs truncate text-[#14121F]">
                          {item.title}
                        </span>
                        {item.type && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-[#FAF5EC] border-[1px] border-[#14121F]/20 text-[#524C61]">
                            {item.type}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#524C61] truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Search Action Button */}
      <Button
        type="button"
        disabled={isLoading || !fromLocation || !toLocation}
        onClick={onSearch}
        className="ink-btn-primary w-full h-12 text-sm rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div className="pt-2.5 border-t border-[#14121F]/15">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#524C61] mb-2">
          Popular Corridors:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_INDIAN_CORRIDORS.map((corridor, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectCorridor(corridor.from, corridor.to)}
              className="px-2.5 py-1 rounded-lg bg-[#FAF5EC] hover:bg-[#F2A31B]/20 border-[1.2px] border-[#14121F] shadow-[1.5px_1.5px_0_#14121F] text-xs font-semibold text-[#14121F] transition-all active:scale-95"
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