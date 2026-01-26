import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, MapPin, Clock, Route, Award, Settings } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';
import gatewayIndiaImage from '@/assets/gateway-india.png';

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

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const data = await authAPI.getProfile();
      setProfile(data);
      setName(data.fullName || '');
      setEmail(data.email || '');
      setPhone(data.phone || '');
    } catch (error: any) {
      console.error('Failed to load profile:', error);
      toast.error('Failed to load profile. Please login again.');
      setTimeout(() => navigate('/login'), 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          fullName: name,
          phone: phone
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }

      const updated = await response.json();
      setProfile(updated);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
      loadProfile(); // Reload to get latest data
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  // Format stats for display
  const formatStats = () => {
    if (!profile) return [];
    
    return [
      {
        icon: Route,
        label: 'Routes Taken',
        value: profile.stats?.routesTaken?.toString() || '0',
        description: 'Total journeys completed'
      },
      {
        icon: Clock,
        label: 'Time Saved',
        value: `${Math.round((profile.stats?.timeSaved || 0) / 60)} hrs`,
        description: 'Compared to traditional routes'
      },
      {
        icon: MapPin,
        label: 'Distance Traveled',
        value: `${(profile.stats?.distanceTraveled || 0).toFixed(0)} km`,
        description: 'Using Naksha navigation'
      },
      {
        icon: Award,
        label: 'Eco Score',
        value: `${profile.stats?.ecoScore || 0}%`,
        description: 'Environmental efficiency rating'
      }
    ];
  };

  // Get achievements based on stats
  const getAchievements = () => {
    if (!profile) return [];
    
    const achievements = [];
    const stats = profile.stats || { routesTaken: 0, timeSaved: 0, distanceTraveled: 0, ecoScore: 0 };

    if (stats.routesTaken >= 1) {
      achievements.push({
        title: 'First Journey',
        description: 'Completed your first route with Naksha',
        icon: '🚀'
      });
    }

    if (stats.routesTaken >= 10) {
      achievements.push({
        title: 'Explorer',
        description: 'Completed 10+ routes with Naksha',
        icon: '🗺️'
      });
    }

    if (stats.ecoScore >= 80) {
      achievements.push({
        title: 'Eco Warrior',
        description: 'Maintained high eco-friendly route usage',
        icon: '🌱'
      });
    }

    if (stats.timeSaved >= 60) {
      achievements.push({
        title: 'Time Saver',
        description: 'Saved 1+ hour using optimized routes',
        icon: '⏱️'
      });
    }

    if (stats.distanceTraveled >= 100) {
      achievements.push({
        title: 'Road Warrior',
        description: 'Traveled 100+ km with Naksha',
        icon: '🛣️'
      });
    }

    return achievements;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden relative">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-white text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden relative">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-white text-lg">Failed to load profile</p>
        </div>
      </div>
    );
  }

  const stats = formatStats();
  const recentTrips = profile.recentTrips || [];
  const achievements = getAchievements();

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden relative">
      {/* Full Page Background - Gateway of India (Image 4) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${gatewayIndiaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        {/* Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Avatar className="w-24 h-24 border-4 border-white/50 shadow-xl">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  {name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-extrabold mb-2 text-white drop-shadow-lg">{name || 'User'}</h1>
                <p className="text-xl text-white/90 mb-4 font-light">
                  Naksha Explorer since {new Date(profile.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <User className="w-5 h-5 text-orange-500" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Manage your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-900 dark:text-white">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900 dark:text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-900 dark:text-white">Phone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSave}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold"
                      >
                        Save
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setName(profile.fullName || '');
                          setPhone(profile.phone || '');
                        }}
                        className="border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label className="text-muted-foreground">Name</Label>
                      <p className="font-medium text-gray-900 dark:text-white">{name}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Email</Label>
                      <p className="font-medium text-gray-900 dark:text-white">{email}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Phone</Label>
                      <p className="font-medium text-gray-900 dark:text-white">{phone}</p>
                    </div>
                    <Button 
                      onClick={() => setIsEditing(true)} 
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold"
                    >
                      Edit Profile
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700" 
                  asChild
                >
                  <Link to="/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    App Settings
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Download Offline Maps
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Award className="w-4 h-4 mr-2" />
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-full">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{stat.label}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Trips */}
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Recent Trips</CardTitle>
                <CardDescription>Your latest navigation history</CardDescription>
              </CardHeader>
              <CardContent>
                {recentTrips.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">No trips yet. Start navigating to see your history here!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTrips.map((trip, index) => (
                      <div key={index}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-orange-500" />
                              <span className="font-semibold text-gray-900 dark:text-white">{trip.from}</span>
                              <span className="text-gray-500">→</span>
                              <span className="font-semibold text-gray-900 dark:text-white">{trip.to}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>{trip.date}</span>
                              <span>{trip.duration}</span>
                              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">{trip.type}</Badge>
                            </div>
                          </div>
                          {trip.saved && (
                            <div className="text-right">
                              <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                Saved {trip.saved}
                              </p>
                            </div>
                          )}
                        </div>
                        {index < recentTrips.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Achievements</CardTitle>
                <CardDescription>Your navigation milestones</CardDescription>
              </CardHeader>
              <CardContent>
                {achievements.length === 0 ? (
                  <div className="text-center py-8">
                    <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">Complete routes to unlock achievements!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{achievement.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
