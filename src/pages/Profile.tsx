import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Clock, 
  Route as RouteIcon, 
  Leaf, 
  Compass, 
  ArrowRight,
  Lock,
  LogOut,
  Edit2,
  Check,
  ShieldCheck,
  Navigation as NavIcon,
  AlertTriangle
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { authAPI, isAuthenticated } from '@/lib/api';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt?: string;
  stats: {
    routesTaken: number;
    timeSaved: number;
    distanceTraveled: number;
    ecoScore: number;
  };
  recentTrips: Array<{
    from: string;
    to: string;
    date: string;
    duration: string;
    type: string;
    saved?: string;
    distance?: string;
  }>;
}

const Profile = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const isAuthed = isAuthenticated();
    setLoggedIn(isAuthed);
    if (isAuthed) {
      loadProfile();
    }
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const data = await authAPI.getProfile();
      if (data) {
        const userObj: UserProfile = {
          id: data.id || '',
          fullName: data.fullName || data.full_name || 'Commuter',
          email: data.email || '',
          phone: data.phone || '',
          createdAt: data.createdAt,
          stats: {
            routesTaken: data.stats?.routesTaken ?? 0,
            timeSaved: data.stats?.timeSaved ?? 0,
            distanceTraveled: data.stats?.distanceTraveled ?? 0,
            ecoScore: data.stats?.ecoScore ?? 80,
          },
          recentTrips: Array.isArray(data.recentTrips) ? data.recentTrips : []
        };
        setProfile(userObj);
        setName(userObj.fullName);
        setPhone(userObj.phone);
      }
    } catch (err: any) {
      console.warn('Profile load error:', err);
      // If token expired or invalid, clear and prompt login
      authAPI.logout();
      setLoggedIn(false);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      await authAPI.updateProfile(name.trim(), phone.trim());
      setProfile(prev => prev ? ({
        ...prev,
        fullName: name.trim(),
        phone: phone.trim()
      }) : null);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (e: any) {
      toast.error(e.message || 'Failed to update profile');
    }
  };

  const handleSignOut = () => {
    authAPI.logout();
    setLoggedIn(false);
    setProfile(null);
    toast.success('Signed out successfully');
    navigate('/');
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setLoggedIn(true);
    loadProfile();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative selection:bg-orange-500 selection:text-white">
      <AmbientBackground variant="subtle" />
      <Navigation />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* UNAUTHENTICATED GUEST VIEW */}
        {!loggedIn && (
          <div className="space-y-8 py-4">
            {/* Header Banner */}
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Guest Mode • Sign in to save journeys</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Commuter Profile & Trip Log
                </h1>
                
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  You are currently browsing Naksha as a guest. Create a free account or sign in to permanently save your routes, track fuel & time savings, and record live hazard reports across India.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs h-10 px-6 rounded-xl shadow-lg shadow-orange-600/20"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthMode('register');
                      setIsAuthModalOpen(true);
                    }}
                    variant="outline"
                    className="border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold h-10 px-6 rounded-xl"
                  >
                    Create Free Account
                  </Button>
                  <Link to="/dashboard">
                    <Button
                      variant="ghost"
                      className="text-zinc-400 hover:text-white text-xs h-10 px-4 rounded-xl flex items-center gap-1.5"
                    >
                      <Compass className="w-4 h-4" />
                      Explore Navigation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Why Create an Account Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                  What you get with a free Naksha account
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-600/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
                    <RouteIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Trip History & Stats</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Automatically log every trip taken, total kilometers navigated, and minutes saved through smart traffic avoidance.
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Eco Yatri Score</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Monitor your carbon reduction score and fuel economy based on low-congestion corridor selection and transit use.
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-600/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Verified Citizen Hazard Reports</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Submit verified pothole, waterlogging, and broken streetlight warnings to alert fellow Indian commuters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AUTHENTICATED USER VIEW */}
        {loggedIn && profile && (
          <div className="space-y-6">
            {/* Profile Overview Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-xl font-bold text-orange-400 shadow-inner">
                    {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'}
                  </div>

                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2.5">
                      <h1 className="text-xl font-bold text-white">{name}</h1>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] font-semibold">
                        Active Commuter
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">{profile.email}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {phone ? `${phone} • ` : ''}India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setName(profile.fullName);
                          setPhone(profile.phone);
                          setIsEditing(false);
                        }}
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 text-zinc-300 rounded-xl text-xs h-9"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs h-9"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:text-white rounded-xl text-xs h-9"
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                      Edit Profile
                    </Button>
                  )}

                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs h-9"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1.5" />
                    Sign Out
                  </Button>
                </div>
              </div>

              {isEditing && (
                <div className="mt-5 pt-5 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-zinc-300">Full Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="mt-1 bg-zinc-950 border-zinc-700 text-white rounded-xl text-xs h-10"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-zinc-300">Phone Number</Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1 bg-zinc-950 border-zinc-700 text-white rounded-xl text-xs h-10"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Real Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Routes Taken</div>
                <div className="text-2xl font-black text-white mt-1">{profile.stats.routesTaken}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Trips logged</div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Distance</div>
                <div className="text-2xl font-black text-cyan-300 mt-1">
                  {profile.stats.distanceTraveled} km
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Total traveled</div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Time Saved</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {profile.stats.timeSaved >= 60 
                    ? `${(profile.stats.timeSaved / 60).toFixed(1)} hrs` 
                    : `${profile.stats.timeSaved} mins`}
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Traffic bypasses</div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Eco Yatri Score</div>
                <div className="text-2xl font-black text-lime-400 mt-1">
                  {profile.stats.ecoScore}%
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Fuel & emissions</div>
              </div>
            </div>

            {/* Recent Trips Log */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <RouteIcon className="w-4 h-4 text-orange-400" />
                    Recorded Journeys & Commute History
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Live routes calculated and traveled from the Navigation Console
                  </p>
                </div>
                <Link to="/dashboard">
                  <Button
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl h-8 px-3"
                  >
                    Start New Trip
                  </Button>
                </Link>
              </div>

              {profile.recentTrips.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-300">No journeys recorded yet</h3>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                      Choose an origin and destination on the Navigation Console and start navigation to log your first journey.
                    </p>
                  </div>
                  <Link to="/dashboard" className="inline-block pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-zinc-700 text-zinc-300 text-xs rounded-xl"
                    >
                      Plan Route Now
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-zinc-800/80">
                  {profile.recentTrips.map((trip, idx) => (
                    <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{trip.from}</span>
                          <ArrowRight className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                          <span className="font-semibold text-white">{trip.to}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                          <span>{trip.date}</span>
                          <span>•</span>
                          <span className="capitalize">{trip.type} route</span>
                          {trip.distance && (
                            <>
                              <span>•</span>
                              <span>{trip.distance}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold text-white">{trip.duration}</div>
                          {trip.saved && (
                            <div className="text-[10px] text-emerald-400">Saved {trip.saved}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
      />
    </div>
  );
};

export default Profile;
