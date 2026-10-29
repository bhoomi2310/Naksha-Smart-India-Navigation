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
    <div className="min-h-screen bg-[#F6EFE3] text-[#14121F] flex flex-col relative selection:bg-[#F2A31B] selection:text-[#14121F] paper-grain">
      <AmbientBackground variant="subtle" />
      <Navigation />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* UNAUTHENTICATED GUEST VIEW */}
        {!loggedIn && (
          <div className="space-y-8 py-4">
            {/* Header Banner */}
            <div className="ink-card rounded-3xl p-8 sm:p-10 text-left relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF5EC] border-[1.2px] border-[#14121F] text-[#D8472B] text-xs font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Guest Mode · Sign in to save journeys</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-black text-[#14121F] font-display tracking-tight">
                  Commuter Profile &amp; Trip Log
                </h1>
                
                <p className="text-sm sm:text-base text-[#524C61] leading-relaxed">
                  You are currently browsing Naksha as a guest. Create a free account or sign in to permanently save your routes, track fuel &amp; time savings, and record live hazard reports across India.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="ink-btn-primary text-xs h-10 px-6 rounded-xl"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthMode('register');
                      setIsAuthModalOpen(true);
                    }}
                    variant="outline"
                    className="ink-btn-secondary text-xs h-10 px-6 rounded-xl"
                  >
                    Create Free Account
                  </Button>
                  <Link to="/dashboard">
                    <Button
                      variant="ghost"
                      className="text-[#524C61] hover:text-[#14121F] text-xs h-10 px-4 rounded-xl flex items-center gap-1.5"
                    >
                      <Compass className="w-4 h-4 text-[#D8472B]" />
                      Explore Navigation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Why Create an Account Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#14121F]">
                  What you get with a free Naksha account
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FDF0ED] text-[#D8472B] border-[1.2px] border-[#14121F] flex items-center justify-center">
                    <RouteIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#14121F]">Trip History &amp; Stats</h3>
                  <p className="text-xs text-[#524C61] leading-relaxed">
                    Automatically log every trip taken, total kilometers navigated, and minutes saved through smart traffic avoidance.
                  </p>
                </div>

                <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF4F3] text-[#1F6F6B] border-[1.2px] border-[#14121F] flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#14121F]">Eco Yatri Score</h3>
                  <p className="text-xs text-[#524C61] leading-relaxed">
                    Monitor your carbon reduction score and fuel economy based on low-congestion corridor selection and transit use.
                  </p>
                </div>

                <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FEF8EA] text-[#C98109] border-[1.2px] border-[#14121F] flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#14121F]">Verified Citizen Hazard Reports</h3>
                  <p className="text-xs text-[#524C61] leading-relaxed">
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
            <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[4px_4px_0_#14121F] rounded-2xl p-6 sm:p-7 text-[#14121F]">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-[#FDF0ED] border-[1.5px] border-[#14121F] shadow-[2px_2px_0_#14121F] flex items-center justify-center text-xl font-bold text-[#D8472B]">
                    {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'}
                  </div>

                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2.5">
                      <h1 className="text-xl font-bold text-[#14121F]">{name}</h1>
                      <Badge className="bg-[#EAF4F3] text-[#1F6F6B] border-[1.2px] border-[#1F6F6B] text-[10px] font-semibold">
                        Active Commuter
                      </Badge>
                    </div>
                    <p className="text-xs text-[#524C61] mt-1">{profile.email}</p>
                    <p className="text-xs text-[#524C61] mt-0.5">
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
                        className="ink-btn-secondary text-xs h-9"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="ink-btn-primary text-xs h-9"
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
                      className="ink-btn-secondary text-xs h-9 flex items-center"
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                      Edit Profile
                    </Button>
                  )}

                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="text-[#524C61] hover:text-[#D8472B] hover:bg-[#FDF0ED] rounded-xl text-xs h-9 border-[1.2px] border-transparent hover:border-[#D8472B]/30"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1.5" />
                    Sign Out
                  </Button>
                </div>
              </div>

              {isEditing && (
                <div className="mt-5 pt-5 border-t border-[#14121F]/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold text-[#14121F]">Full Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="mt-1 bg-[#FFFDF9] border-[1.5px] border-[#14121F] text-[#14121F] rounded-xl text-xs h-10 shadow-[2px_2px_0_#14121F]"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-[#14121F]">Phone Number</Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1 bg-[#FFFDF9] border-[1.5px] border-[#14121F] text-[#14121F] rounded-xl text-xs h-10 shadow-[2px_2px_0_#14121F]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Real Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] p-4 rounded-2xl text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#524C61]">Routes Taken</div>
                <div className="text-2xl font-black text-[#14121F] mt-1">{profile.stats.routesTaken}</div>
                <div className="text-[10px] text-[#524C61] mt-0.5">Trips logged</div>
              </div>

              <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] p-4 rounded-2xl text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#524C61]">Distance</div>
                <div className="text-2xl font-black text-[#1F6F6B] mt-1">
                  {profile.stats.distanceTraveled} km
                </div>
                <div className="text-[10px] text-[#524C61] mt-0.5">Total traveled</div>
              </div>

              <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] p-4 rounded-2xl text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#524C61]">Time Saved</div>
                <div className="text-2xl font-black text-[#1F6F6B] mt-1">
                  {profile.stats.timeSaved >= 60 
                    ? `${(profile.stats.timeSaved / 60).toFixed(1)} hrs` 
                    : `${profile.stats.timeSaved} mins`}
                </div>
                <div className="text-[10px] text-[#524C61] mt-0.5">Traffic bypasses</div>
              </div>

              <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] p-4 rounded-2xl text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#524C61]">Eco Yatri Score</div>
                <div className="text-2xl font-black text-[#D8472B] mt-1">
                  {profile.stats.ecoScore}%
                </div>
                <div className="text-[10px] text-[#524C61] mt-0.5">Fuel &amp; emissions</div>
              </div>
            </div>

            {/* Recent Trips Log */}
            <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[4px_4px_0_#14121F] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#14121F]/15">
                <div>
                  <h2 className="text-sm font-bold text-[#14121F] flex items-center gap-2">
                    <RouteIcon className="w-4 h-4 text-[#D8472B]" />
                    Recorded Journeys &amp; Commute History
                  </h2>
                  <p className="text-xs text-[#524C61] mt-0.5">
                    Live routes calculated and traveled from the Navigation Console
                  </p>
                </div>
                <Link to="/dashboard">
                  <Button
                    size="sm"
                    className="ink-btn-primary text-xs font-semibold rounded-xl h-8 px-3"
                  >
                    Start New Trip
                  </Button>
                </Link>
              </div>

              {profile.recentTrips.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF5EC] border-[1.2px] border-[#14121F] text-[#14121F] flex items-center justify-center mx-auto shadow-[2px_2px_0_#14121F]">
                    <Compass className="w-6 h-6 text-[#D8472B]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#14121F]">No journeys recorded yet</h3>
                    <p className="text-xs text-[#524C61] max-w-sm mx-auto mt-1">
                      Choose an origin and destination on the Navigation Console and start navigation to log your first journey.
                    </p>
                  </div>
                  <Link to="/dashboard" className="inline-block pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="ink-btn-secondary text-xs rounded-xl"
                    >
                      Plan Route Now
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-[#14121F]/15">
                  {profile.recentTrips.map((trip, idx) => (
                    <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#14121F]">{trip.from}</span>
                          <ArrowRight className="w-3 h-3 text-[#524C61] flex-shrink-0" />
                          <span className="font-bold text-[#14121F]">{trip.to}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#524C61] text-[11px]">
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
                          <div className="font-bold text-[#14121F]">{trip.duration}</div>
                          {trip.saved && (
                            <div className="text-[10px] font-bold text-[#1F6F6B]">Saved {trip.saved}</div>
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
