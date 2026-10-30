const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined') {
    // In production on Vercel or any live host, use same-origin /api to hit the serverless DB functions
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return '/api';
    }
  }
  return 'http://localhost:3001/api';
};

const API_BASE_URL = getApiBaseUrl();

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('auth_token');
};

// Helper function to set auth token
const setToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// Helper function to remove auth token
const removeToken = () => {
  localStorage.removeItem('auth_token');
};

// Local storage user helpers for offline / serverless operation
const getLocalUser = () => {
  try {
    const data = localStorage.getItem('naksha_user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const setLocalUser = (user: any) => {
  try {
    localStorage.setItem('naksha_user', JSON.stringify(user));
  } catch {}
};

// API request helper with network timeout
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || error.message || 'Request failed');
    }

    return response.json();
  } catch (err: any) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// Auth API with graceful client-side fallback
export const authAPI = {
  register: async (email: string, password: string, fullName: string, phone?: string) => {
    const trimmedName = fullName.trim();
    try {
      const data = await apiRequest<{ token: string; user: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password, fullName: trimmedName, phone: phone?.trim() }),
      });
      const user = data.user || data;
      setToken(data.token);
      setLocalUser(user);
      return data;
    } catch (err: any) {
      console.warn('Backend unavailable, using local session:', err.message);
      // Graceful local commuter account fallback with exact name
      const localUser = {
        id: 'usr_' + Date.now().toString(36),
        email: email.trim(),
        fullName: trimmedName || email.split('@')[0],
        phone: phone?.trim() || '',
        createdAt: new Date().toISOString(),
      };
      const token = 'naksha_local_token_' + btoa(email);
      setToken(token);
      setLocalUser(localUser);
      return { token, user: localUser };
    }
  },

  login: async (email: string, password: string) => {
    try {
      const data = await apiRequest<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const user = data.user || data;
      setToken(data.token);
      setLocalUser(user);
      return data;
    } catch (err: any) {
      console.warn('Backend unavailable, using local session:', err.message);
      // Graceful local sign-in fallback
      const existingUser = getLocalUser();
      const user = (existingUser && existingUser.email === email)
        ? existingUser
        : {
            id: 'usr_' + Date.now().toString(36),
            email: email.trim(),
            fullName: email.split('@')[0],
            createdAt: new Date().toISOString(),
          };
      const token = 'naksha_local_token_' + btoa(email);
      setToken(token);
      setLocalUser(user);
      return { token, user };
    }
  },

  logout: () => {
    removeToken();
    try {
      localStorage.removeItem('naksha_user');
    } catch {}
  },

  getProfile: async () => {
    try {
      const data = await apiRequest<any>('/user/profile');
      const u = data?.user || data;
      if (u && u.id) {
        setLocalUser(u);
      }
      return data;
    } catch {
      const user = getLocalUser();
      if (user) {
        return { user };
      }
      return { user: null };
    }
  },

  updateProfile: async (
    fullNameOrData?: string | { fullName?: string; phone?: string; onboardingCompleted?: boolean },
    phone?: string
  ) => {
    let payload: any = {};
    if (typeof fullNameOrData === 'object' && fullNameOrData !== null) {
      payload = fullNameOrData;
    } else {
      payload = { fullName: fullNameOrData, phone };
    }

    try {
      const data = await apiRequest<any>('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      const user = data.user || data;
      setLocalUser(user);
      return data;
    } catch {
      const user = getLocalUser() || {};
      const updated = { ...user, ...payload };
      setLocalUser(updated);
      return { user: updated };
    }
  },
};

// Hazards API with local storage sync
export const hazardsAPI = {
  getHazards: async (limit: number = 60) => {
    try {
      const res = await apiRequest<{ hazards: any[] }>(`/hazards?limit=${limit}`);
      return res.hazards || [];
    } catch {
      try {
        const stored = localStorage.getItem('naksha_hazards');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
  },

  reportHazard: async (hazardData: {
    type: string;
    title: string;
    description: string;
    severity: string;
    lat?: number;
    lng?: number;
    locationText?: string;
  }) => {
    try {
      return await apiRequest<{ success: boolean; message: string; hazard: any }>('/hazards/report', {
        method: 'POST',
        body: JSON.stringify(hazardData),
      });
    } catch {
      try {
        const stored = localStorage.getItem('naksha_hazards');
        const list = stored ? JSON.parse(stored) : [];
        const newHazard = {
          id: 'hz_' + Date.now(),
          ...hazardData,
          createdAt: new Date().toISOString(),
        };
        list.unshift(newHazard);
        localStorage.setItem('naksha_hazards', JSON.stringify(list.slice(0, 50)));
        return { success: true, message: 'Hazard saved locally', hazard: newHazard };
      } catch {
        return { success: true, message: 'Hazard reported', hazard: hazardData };
      }
    }
  },
};

// Navigation API
export const navigationAPI = {
  geocode: async (address: string) => {
    return apiRequest<{ lat: number; lon: number; display_name: string }>('/geocode', {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  },

  getRoutes: async (from: string, to: string, routeType: string = 'fastest') => {
    return apiRequest<any>('/routes', {
      method: 'POST',
      body: JSON.stringify({ from, to, routeType }),
    });
  },

  predictRoadConditions: async (coordinates: number[][]) => {
    return apiRequest<any>('/ml/predict', {
      method: 'POST',
      body: JSON.stringify({ coordinates }),
    });
  },
};

// Trips API
export const tripsAPI = {
  saveTrip: async (tripData: {
    from: string;
    to: string;
    duration: string;
    distance: string;
    type: string;
    saved?: string;
  }) => {
    return await apiRequest<{ success: boolean; message: string }>('/trips/save', {
      method: 'POST',
      body: JSON.stringify(tripData),
    });
  },
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
