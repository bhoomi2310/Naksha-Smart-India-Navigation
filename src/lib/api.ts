const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

// API request helper
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

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Auth API
export const authAPI = {
  register: async (email: string, password: string, fullName: string) => {
    const data = await apiRequest<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });
    setToken(data.token);
    return data;
  },

  login: async (email: string, password: string) => {
    const data = await apiRequest<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  },

  logout: () => {
    removeToken();
  },

  getProfile: async () => {
    return apiRequest<any>('/user/profile');
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

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
