// Major Indian cities and comprehensive location database with fast autocomplete & geocoding support
export interface LocationSuggestion {
  title: string;
  subtitle: string;
  value: string;
  type?: 'station' | 'locality' | 'landmark' | 'city' | 'transit' | 'airport' | 'highway';
}

export const indianCities = [
  // Delhi NCR
  {
    city: 'Delhi',
    state: 'Delhi',
    locations: [
      { name: 'Connaught Place', type: 'landmark' },
      { name: 'Rajiv Chowk', type: 'station' },
      { name: 'Dwarka Mor', type: 'station' },
      { name: 'Dwarka Sector 21', type: 'station' },
      { name: 'Dwarka Sector 10', type: 'locality' },
      { name: 'India Gate', type: 'landmark' },
      { name: 'Red Fort', type: 'landmark' },
      { name: 'Hauz Khas Village', type: 'locality' },
      { name: 'Hauz Khas Metro', type: 'station' },
      { name: 'Saket', type: 'locality' },
      { name: 'Select Citywalk Saket', type: 'landmark' },
      { name: 'Vasant Kunj', type: 'locality' },
      { name: 'Karol Bagh', type: 'locality' },
      { name: 'Lajpat Nagar', type: 'locality' },
      { name: 'Chandni Chowk', type: 'locality' },
      { name: 'New Delhi Railway Station (NDLS)', type: 'transit' },
      { name: 'Hazrat Nizamuddin Station', type: 'transit' },
      { name: 'Anand Vihar ISBT', type: 'transit' },
      { name: 'Kashmere Gate ISBT', type: 'transit' },
      { name: 'IGI Airport Terminal 3', type: 'airport' },
      { name: 'IGI Airport Terminal 1', type: 'airport' },
      { name: 'Rohini Sector 18', type: 'locality' },
      { name: 'Pitampura', type: 'locality' },
      { name: 'Netaji Subhash Place', type: 'station' },
      { name: 'Janakpuri West', type: 'station' },
      { name: 'Nehru Place', type: 'locality' },
      { name: 'Akshardham Temple', type: 'landmark' },
      { name: 'Lotus Temple', type: 'landmark' },
      { name: 'Qutub Minar', type: 'landmark' },
      { name: 'Aerocity', type: 'locality' }
    ]
  },
  {
    city: 'Gurgaon',
    state: 'Haryana',
    locations: [
      { name: 'Cyber City', type: 'locality' },
      { name: 'DLF CyberHub', type: 'landmark' },
      { name: 'DLF Phase 1', type: 'locality' },
      { name: 'DLF Phase 2', type: 'locality' },
      { name: 'DLF Phase 3', type: 'locality' },
      { name: 'DLF Phase 5', type: 'locality' },
      { name: 'Golf Course Road', type: 'highway' },
      { name: 'Golf Course Extension Road', type: 'highway' },
      { name: 'Sector 29', type: 'locality' },
      { name: 'Sector 43', type: 'locality' },
      { name: 'Sector 54 Chowk', type: 'station' },
      { name: 'Sector 56', type: 'locality' },
      { name: 'Sohna Road', type: 'highway' },
      { name: 'MG Road Metro', type: 'station' },
      { name: 'Ambience Mall', type: 'landmark' },
      { name: 'Galleria Market', type: 'landmark' },
      { name: 'IFFCO Chowk', type: 'station' },
      { name: 'Huda City Centre (Millennium City Centre)', type: 'station' },
      { name: 'Manesar', type: 'locality' }
    ]
  },
  {
    city: 'Noida',
    state: 'Uttar Pradesh',
    locations: [
      { name: 'Sector 18 (Atta Market)', type: 'locality' },
      { name: 'Sector 62', type: 'locality' },
      { name: 'Sector 137', type: 'locality' },
      { name: 'Botanical Garden', type: 'station' },
      { name: 'Noida City Centre', type: 'station' },
      { name: 'Noida Electronic City', type: 'station' },
      { name: 'Film City', type: 'locality' },
      { name: 'DLF Mall of India', type: 'landmark' },
      { name: 'Great India Place', type: 'landmark' },
      { name: 'Greater Noida Pari Chowk', type: 'locality' },
      { name: 'Noida Expressway', type: 'highway' }
    ]
  },
  {
    city: 'Faridabad',
    state: 'Haryana',
    locations: [
      { name: 'Neelam Chowk', type: 'locality' },
      { name: 'Sector 15', type: 'locality' },
      { name: 'Sector 21', type: 'locality' },
      { name: 'Bata Chowk', type: 'station' },
      { name: 'Ballabhgarh', type: 'locality' }
    ]
  },
  
  // Mumbai MMR
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    locations: [
      { name: 'BKC (Bandra Kurla Complex)', type: 'locality' },
      { name: 'Marine Drive', type: 'landmark' },
      { name: 'Gateway of India', type: 'landmark' },
      { name: 'Nariman Point', type: 'locality' },
      { name: 'Colaba Causeway', type: 'locality' },
      { name: 'Bandra West (Linking Road)', type: 'locality' },
      { name: 'Bandra Terminus', type: 'transit' },
      { name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)', type: 'transit' },
      { name: 'Mumbai Airport Terminal 2 (CSMIA)', type: 'airport' },
      { name: 'Mumbai Airport Terminal 1', type: 'airport' },
      { name: 'Andheri West', type: 'locality' },
      { name: 'Andheri East', type: 'locality' },
      { name: 'Powai (Hiranandani)', type: 'locality' },
      { name: 'Juhu Beach', type: 'landmark' },
      { name: 'Dadar Western / Central', type: 'transit' },
      { name: 'Lower Parel (High Street Phoenix)', type: 'locality' },
      { name: 'Worli Sea Face', type: 'landmark' },
      { name: 'Borivali West', type: 'locality' },
      { name: 'Goregaon East (Film City)', type: 'locality' },
      { name: 'Malad West', type: 'locality' },
      { name: 'Kurla West', type: 'locality' },
      { name: 'Chembur', type: 'locality' },
      { name: 'Versova', type: 'locality' }
    ]
  },
  {
    city: 'Thane',
    state: 'Maharashtra',
    locations: [
      { name: 'Thane Railway Station', type: 'transit' },
      { name: 'Hiranandani Estate', type: 'locality' },
      { name: 'Ghodbunder Road', type: 'highway' },
      { name: 'Viviana Mall', type: 'landmark' },
      { name: 'Wagle Industrial Estate', type: 'locality' },
      { name: 'Kopri', type: 'locality' }
    ]
  },
  {
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    locations: [
      { name: 'Vashi Station', type: 'transit' },
      { name: 'Nerul', type: 'locality' },
      { name: 'Belapur CBD', type: 'locality' },
      { name: 'Kharghar', type: 'locality' },
      { name: 'Panvel Junction', type: 'transit' },
      { name: 'Navi Mumbai International Airport', type: 'airport' }
    ]
  },

  // Bengaluru
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    locations: [
      { name: 'MG Road', type: 'locality' },
      { name: 'Indiranagar 100ft Road', type: 'locality' },
      { name: 'Koramangala 5th Block', type: 'locality' },
      { name: 'Koramangala Sony World Signal', type: 'landmark' },
      { name: 'Whitefield ITPL', type: 'locality' },
      { name: 'Electronic City Phase 1', type: 'locality' },
      { name: 'Electronic City Phase 2', type: 'locality' },
      { name: 'HSR Layout Sector 1', type: 'locality' },
      { name: 'BTM Layout', type: 'locality' },
      { name: 'Bellandur EcoSpace', type: 'locality' },
      { name: 'Marathahalli Bridge', type: 'locality' },
      { name: 'Hebbal Flyover', type: 'landmark' },
      { name: 'Manyata Tech Park', type: 'locality' },
      { name: 'Jayanagar 4th Block', type: 'locality' },
      { name: 'JP Nagar', type: 'locality' },
      { name: 'Kempegowda International Airport (BLR)', type: 'airport' },
      { name: 'Majestic (KSR Bengaluru Station)', type: 'transit' },
      { name: 'Malleshwaram', type: 'locality' },
      { name: 'Sarjapur Road', type: 'highway' },
      { name: 'Outer Ring Road (ORR)', type: 'highway' }
    ]
  },

  // Hyderabad
  {
    city: 'Hyderabad',
    state: 'Telangana',
    locations: [
      { name: 'Hitec City Cyber Towers', type: 'landmark' },
      { name: 'Gachibowli Stadium', type: 'locality' },
      { name: 'Madhapur', type: 'locality' },
      { name: 'Kondapur', type: 'locality' },
      { name: 'Financial District', type: 'locality' },
      { name: 'Jubilee Hills Check Post', type: 'locality' },
      { name: 'Banjara Hills Road No 12', type: 'locality' },
      { name: 'Charminar', type: 'landmark' },
      { name: 'Secunderabad Railway Station', type: 'transit' },
      { name: 'Rajiv Gandhi International Airport (RGIA)', type: 'airport' },
      { name: 'Kukatpally KPHB', type: 'locality' },
      { name: 'Ameerpet Metro', type: 'station' },
      { name: 'Begumpet', type: 'locality' }
    ]
  },

  // Pune
  {
    city: 'Pune',
    state: 'Maharashtra',
    locations: [
      { name: 'Hinjawadi Phase 1', type: 'locality' },
      { name: 'Hinjawadi Phase 2', type: 'locality' },
      { name: 'Hinjawadi Phase 3', type: 'locality' },
      { name: 'Koregaon Park North Main Road', type: 'locality' },
      { name: 'Viman Nagar', type: 'locality' },
      { name: 'Baner Balewadi', type: 'locality' },
      { name: 'Aundh', type: 'locality' },
      { name: 'Kothrud', type: 'locality' },
      { name: 'Magarpatta Cybercity', type: 'locality' },
      { name: 'Hadapsar', type: 'locality' },
      { name: 'Pune Railway Station', type: 'transit' },
      { name: 'Pune Airport (Lohegaon)', type: 'airport' },
      { name: 'Shivajinagar', type: 'locality' },
      { name: 'Wakad', type: 'locality' }
    ]
  },

  // Chennai
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    locations: [
      { name: 'T Nagar (Ranganathan Street)', type: 'locality' },
      { name: 'Anna Nagar Roundtana', type: 'locality' },
      { name: 'Velachery', type: 'locality' },
      { name: 'OMR (Old Mahabalipuram Road)', type: 'highway' },
      { name: 'Guindy Kathipara Junction', type: 'landmark' },
      { name: 'Adyar', type: 'locality' },
      { name: 'Besant Nagar Elliot Beach', type: 'landmark' },
      { name: 'Marina Beach', type: 'landmark' },
      { name: 'Chennai Central Station (MGR)', type: 'transit' },
      { name: 'Chennai International Airport (MAA)', type: 'airport' },
      { name: 'Tambaram', type: 'locality' },
      { name: 'Thoraipakkam', type: 'locality' },
      { name: 'Sholinganallur', type: 'locality' }
    ]
  },

  // Kolkata
  {
    city: 'Kolkata',
    state: 'West Bengal',
    locations: [
      { name: 'Park Street', type: 'locality' },
      { name: 'Salt Lake Sector V', type: 'locality' },
      { name: 'New Town Eco Park', type: 'landmark' },
      { name: 'Howrah Railway Station', type: 'transit' },
      { name: 'Sealdah Railway Station', type: 'transit' },
      { name: 'Netaji Subhash Chandra Bose Airport (CCU)', type: 'airport' },
      { name: 'Victoria Memorial', type: 'landmark' },
      { name: 'Dakshineswar Kali Temple', type: 'landmark' },
      { name: 'Ballygunge', type: 'locality' },
      { name: 'Alipore', type: 'locality' },
      { name: 'Dum Dum Junction', type: 'transit' },
      { name: 'Gariahat', type: 'locality' }
    ]
  },

  // Ahmedabad
  {
    city: 'Ahmedabad',
    state: 'Gujarat',
    locations: [
      { name: 'SG Highway', type: 'highway' },
      { name: 'Navrangpura', type: 'locality' },
      { name: 'Satellite', type: 'locality' },
      { name: 'Vastrapur Lake', type: 'landmark' },
      { name: 'Bopal', type: 'locality' },
      { name: 'Maninagar', type: 'locality' },
      { name: 'Sabarmati Ashram', type: 'landmark' },
      { name: 'Ahmedabad Airport (AMD)', type: 'airport' },
      { name: 'Gandhinagar GIFT City', type: 'locality' }
    ]
  },

  // Jaipur
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    locations: [
      { name: 'Malviya Nagar', type: 'locality' },
      { name: 'Vaishali Nagar', type: 'locality' },
      { name: 'Raja Park', type: 'locality' },
      { name: 'C Scheme', type: 'locality' },
      { name: 'Hawa Mahal', type: 'landmark' },
      { name: 'Amer Fort', type: 'landmark' },
      { name: 'Jaipur Airport (JAI)', type: 'airport' },
      { name: 'Mansarovar', type: 'locality' }
    ]
  },

  // Lucknow
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    locations: [
      { name: 'Gomti Nagar', type: 'locality' },
      { name: 'Hazratganj', type: 'locality' },
      { name: 'Alambagh Bus Stand', type: 'transit' },
      { name: 'Indira Nagar', type: 'locality' },
      { name: 'Charbagh Railway Station', type: 'transit' },
      { name: 'Chaudhary Charan Singh Airport (LKO)', type: 'airport' }
    ]
  },

  // Chandigarh
  {
    city: 'Chandigarh',
    state: 'Punjab/Haryana',
    locations: [
      { name: 'Sector 17 Plaza', type: 'locality' },
      { name: 'Sector 35', type: 'locality' },
      { name: 'Sector 22', type: 'locality' },
      { name: 'Elante Mall', type: 'landmark' },
      { name: 'Sukhna Lake', type: 'landmark' },
      { name: 'Chandigarh Airport (IXC)', type: 'airport' },
      { name: 'Mohali Sector 62', type: 'locality' }
    ]
  },

  // Kochi
  {
    city: 'Kochi',
    state: 'Kerala',
    locations: [
      { name: 'Marine Drive Kochi', type: 'landmark' },
      { name: 'Fort Kochi', type: 'landmark' },
      { name: 'MG Road Ernakulam', type: 'locality' },
      { name: 'Kakkanad Infopark', type: 'locality' },
      { name: 'Edapally Lulu Mall', type: 'landmark' },
      { name: 'Cochin International Airport (COK)', type: 'airport' }
    ]
  },

  // Indore
  {
    city: 'Indore',
    state: 'Madhya Pradesh',
    locations: [
      { name: 'Vijay Nagar', type: 'locality' },
      { name: '56 Dukan', type: 'landmark' },
      { name: 'New Palasia', type: 'locality' },
      { name: 'Rajwada Palace', type: 'landmark' },
      { name: 'Indore Airport (IDR)', type: 'airport' }
    ]
  }
];

// Flattened list with pre-calculated searchable string
export const allLocations: LocationSuggestion[] = indianCities.flatMap(city =>
  city.locations.map(loc => ({
    title: loc.name,
    subtitle: `${city.city}, ${city.state}`,
    value: `${loc.name}, ${city.city}`,
    type: loc.type as any
  }))
);

// Get locations for a specific city
export const getLocationsByCity = (cityName: string): string[] => {
  const city = indianCities.find(c => c.city.toLowerCase() === cityName.toLowerCase());
  return city ? city.locations.map(loc => `${loc.name}, ${city.city}`) : [];
};

// Zero-latency instant local search (triggers on 1st character)
export const searchLocations = (query: string): LocationSuggestion[] => {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();

  // Priority 1: Exact prefix matches on title or city
  const prefixMatches: LocationSuggestion[] = [];
  // Priority 2: Substring matches
  const substringMatches: LocationSuggestion[] = [];

  for (const item of allLocations) {
    const titleLower = item.title.toLowerCase();
    const cityLower = item.subtitle.toLowerCase();

    if (titleLower.startsWith(q) || cityLower.startsWith(q)) {
      prefixMatches.push(item);
    } else if (titleLower.includes(q) || cityLower.includes(q) || item.value.toLowerCase().includes(q)) {
      substringMatches.push(item);
    }

    if (prefixMatches.length >= 8) break;
  }

  const combined = [...prefixMatches, ...substringMatches];
  // Deduplicate by value
  const seen = new Set<string>();
  const results: LocationSuggestion[] = [];

  for (const item of combined) {
    const key = item.value.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      results.push(item);
    }
    if (results.length >= 8) break;
  }

  return results;
};

// Live Indian Geocoding using Photon bounded to India coordinates [68.1, 6.5, 97.4, 35.5]
export const fetchLiveLocationSuggestions = async (
  query: string,
  signal?: AbortSignal
): Promise<LocationSuggestion[]> => {
  if (!query || query.trim().length < 2) return [];
  const cleanQuery = query.trim();

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&bbox=68.1,6.5,97.4,35.5&limit=8`;
    const res = await fetch(url, { signal });
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.features || !Array.isArray(data.features)) return [];

    const suggestions: LocationSuggestion[] = [];
    const seen = new Set<string>();

    for (const f of data.features) {
      const p = f.properties;
      if (!p || !p.name) continue;

      // Extract Indian address hierarchy
      const locality = p.suburb || p.district || p.city || p.county || '';
      const state = p.state || '';
      
      const subParts = [locality, state].filter(Boolean);
      const subtitle = subParts.length > 0 ? subParts.join(', ') : 'India';
      
      // Determine value to put in the input box
      const value = locality && !p.name.toLowerCase().includes(locality.toLowerCase())
        ? `${p.name}, ${locality}`
        : state && !p.name.toLowerCase().includes(state.toLowerCase())
          ? `${p.name}, ${state}`
          : p.name;

      const dedupeKey = value.toLowerCase();
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      let type: LocationSuggestion['type'] = 'locality';
      const osmVal = p.osm_value?.toLowerCase() || '';
      if (osmVal.includes('station') || osmVal.includes('subway') || osmVal.includes('halt') || osmVal.includes('stop')) {
        type = 'station';
      } else if (osmVal.includes('airport') || osmVal.includes('aerodrome')) {
        type = 'airport';
      } else if (osmVal.includes('motorway') || osmVal.includes('trunk') || osmVal.includes('primary')) {
        type = 'highway';
      } else if (osmVal.includes('place_of_worship') || osmVal.includes('monument') || osmVal.includes('attraction')) {
        type = 'landmark';
      }

      suggestions.push({
        title: p.name,
        subtitle,
        value,
        type
      });

      if (suggestions.length >= 8) break;
    }

    return suggestions;
  } catch (err: any) {
    if (err.name === 'AbortError') return [];
    console.warn('Live location suggestion lookup error:', err);
    return [];
  }
};
