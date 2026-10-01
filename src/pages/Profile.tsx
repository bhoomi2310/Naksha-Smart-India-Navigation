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
  Award, 
  Leaf, 
  Compass, 
  ArrowRight,
  Lock,
  LogOut
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { authAPI, isAuthenticated } from '@/lib/api';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
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
  }>;
  achievements: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr-demo-01',
  fullName: 'Rohan Sharma',
  email: 'rohan.sharma@naksha.app',
  phone: '+91 98765 43210',
  stats: {
    routesTaken: 28,
    timeSaved: 380,
    distanceTraveled: 342,
    ecoScore: 92
  },
  recentTrips: [
    {
      from: 'Connaught Place, Delhi',
      to: 'Cyber City, Gurgaon',
      date: 'Today, 8:45 AM',
      duration: '38 mins',
      type: 'Fastest (Flyover Bypass)',
      saved: '14 mins'
    },
    {
      from: 'BKC, Mumbai',
      to: 'Marine Drive, Mumbai',
      date: 'Yesterday, 6:15 PM',
      duration: '26 mins',
      type: 'Safest (Sea Link Night Corridor)',
      saved: '8 mins'
    },
    {
      from: 'Koramangala, Bangalore',
      to: 'Electronic City, Bangalore',
      date: '3 days ago',
      duration: '32 mins',
      type: 'Metro + AC Feeder Bus',
      saved: '₹175 fare'
    }
  ],
  achievements: [
    { title: 'Eco Pathfinder', description: 'Reached an Eco Yatri Score above 85 — consistently choosing low-emission routes over private vehicles', icon: '🌿' },
    { title: 'Road Guardian', description: 'Reported 12 road hazards (potholes, waterlogging, broken dividers) verified by the Naksha community', icon: '🛡️' },
    { title: 'Green Commuter', description: 'Accumulated over 50 km of Metro or bus transit — reducing approximately 4.2 kg of CO₂ emissions', icon: '🌱' },
    { title: 'Safety Sentinel', description: 'Contributed night-safety ratings on 8 corridors — helping other commuters navigate after dark', icon: '🔦' }
  ]
};

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [name, setName] = useState(DEFAULT_PROFILE.fullName);
  const [phone, setPhone] = useState(DEFAULT_PROFILE.phone);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const loggedIn = isAuthenticated();

  useEffect(() => {
    if (loggedIn) {
      loadProfile();
    }
  }, [loggedIn]);

  const loadProfile = async () => {
    try {
      const data = await authAPI.getProfile();
      if (data && data.fullName) {
        setProfile({
          ...DEFAULT_PROFILE,
          ...data,
          stats: data.stats || DEFAULT_PROFILE.stats,
          recentTrips: data.recentTrips?.length ? data.recentTrips : DEFAULT_PROFILE.recentTrips,
          achievements: data.achievements?.length ? data.achievements : DEFAULT_PROFILE.achievements
        });
        setName(data.fullName);
        setPhone(data.phone || DEFAULT_PROFILE.phone);
      }
    } catch {
      setProfile(DEFAULT_PROFILE);
    }
  };

  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      fullName: name,
      phone
    }));
    setIsEditing(false);
    toast.success('Profile updated');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {!loggedIn && (
          <div className="bg-zinc-900/80 border border-orange-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Lock className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>You are viewing a preview profile. Sign in to save real commute logs and verified hazard reports.</span>
            </div>
            <Button
              size="sm"
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold h-8 rounded-lg"
            >
              Sign In to Sync
            </Button>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl font-bold text-orange-400">
                {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl font-bold text-white">{name}</h1>
                  <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 text-[10px]">
                    {loggedIn ? 'Active Member' : 'Demo Account'}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">{profile.email}</p>
                <p className="text-xs text-zinc-500">{phone} • India</p>
              </div>
            </div>

            <div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-300 rounded-lg text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-4 pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-zinc-400">Full Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 bg-zinc-950 border-zinc-700 text-white rounded-lg text-xs"
                />
              </div>
              <div>
                <Label className="text-xs text-zinc-400">Phone</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 bg-zinc-950 border-zinc-700 text-white rounded-lg text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl text-center">
            <div className="text-[10px] uppercase text-zinc-400">Routes Taken</div>
            <div className="text-2xl font-bold text-white mt-1">{profile.stats.routesTaken}</div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl text-center">
            <div className="text-[10px] uppercase text-zinc-400">Time Saved</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {Math.round(profile.stats.timeSaved / 60)} hrs
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl text-center">
            <div className="text-[10px] uppercase text-zinc-400">Distance</div>
            <div className="text-2xl font-bold text-cyan-300 mt-1">
              {profile.stats.distanceTraveled} km
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl text-center">
            <div className="text-[10px] uppercase text-zinc-400">Eco Yatri Score</div>
            <div className="text-2xl font-bold text-lime-400 mt-1">
              {profile.stats.ecoScore}%
            </div>
          </div>
        </div>

        {/* Recent Trips & Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Trips Log */}
          <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
              <h3 className="font-semibold text-sm text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-orange-400" />
                Recent Journeys
              </h3>
              <Link to="/dashboard" className="text-xs text-orange-400 hover:underline flex items-center gap-1">
                New Route <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              {profile.recentTrips.map((trip, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-medium text-white">
                      {trip.from} ➔ {trip.to}
                    </div>
                    <div className="text-zinc-400 text-[11px] mt-0.5">
                      {trip.date} • <span className="text-zinc-300">{trip.type}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-white">{trip.duration}</div>
                    {trip.saved && (
                      <div className="text-[10px] text-emerald-400">{trip.saved}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eco & Contribution Panel */}
          <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
              <h3 className="font-semibold text-sm text-white flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-lime-400" />
                Contributions
              </h3>
              <span className="text-xs text-zinc-400">{profile.achievements.length} badges earned</span>
            </div>

            {/* Eco Score Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Eco Yatri Score</span>
                <span className="font-bold text-lime-400">{profile.stats.ecoScore}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-lime-600 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${profile.stats.ecoScore}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-500">Based on % of trips using Metro, bus, or fuel-efficient routes</p>
            </div>

            {/* Contribution Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                <div className="text-lg font-bold text-orange-400">12</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Hazards Reported</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                <div className="text-lg font-bold text-cyan-400">4.2<span className="text-xs font-normal">kg</span></div>
                <div className="text-[10px] text-zinc-400 mt-0.5">CO₂ Saved</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5">
                <div className="text-lg font-bold text-purple-400">8</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Corridors Rated</div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode="login"
        onSwitchMode={() => {}}
      />
    </div>
  );
};

export default Profile;
