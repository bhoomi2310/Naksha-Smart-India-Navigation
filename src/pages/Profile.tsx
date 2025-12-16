import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, MapPin, Clock, Route, Award, Settings } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Bhoomi Gupta');
  const [email, setEmail] = useState('bhoomi.gupta@email.com');
  const [phone, setPhone] = useState('+91 98765 12345');

  const stats = [
    {
      icon: Route,
      label: 'Routes Taken',
      value: '147',
      description: 'Total journeys completed'
    },
    {
      icon: Clock,
      label: 'Time Saved',
      value: '24 hrs',
      description: 'Compared to traditional routes'
    },
    {
      icon: MapPin,
      label: 'Distance Traveled',
      value: '2,340 km',
      description: 'Using Naksha navigation'
    },
    {
      icon: Award,
      label: 'Eco Score',
      value: '85%',
      description: 'Environmental efficiency rating'
    }
  ];

  const recentTrips = [
    {
      from: 'Connaught Place',
      to: 'Dwarka Sector 12',
      date: '2024-01-15',
      duration: '45 mins',
      type: 'Fastest Route',
      saved: '12 mins'
    },
    {
      from: 'Karol Bagh',
      to: 'Gurgaon Cyber City',
      date: '2024-01-14',
      duration: '1h 20mins',
      type: 'Eco-Friendly',
      saved: '8 mins'
    },
    {
      from: 'Delhi Airport',
      to: 'India Gate',
      date: '2024-01-13',
      duration: '35 mins',
      type: 'Safest Route',
      saved: '15 mins'
    }
  ];

  const achievements = [
    {
      title: 'Early Adopter',
      description: 'One of the first 100 Naksha users',
      icon: '🚀'
    },
    {
      title: 'Eco Warrior',
      description: 'Saved 50+ kg CO2 with eco routes',
      icon: '🌱'
    },
    {
      title: 'Night Navigator',
      description: 'Completed 25 safe night journeys',
      icon: '🌙'
    },
    {
      title: 'Explorer',
      description: 'Used all 6 route types',
      icon: '🗺️'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl">BG</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{name}</h1>
              <p className="text-xl text-muted-foreground mb-4">Naksha Explorer since January 2024</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-primary/10 text-primary">Premium Member</Badge>
                <Badge className="bg-success/10 text-success">Verified</Badge>
                <Badge className="bg-secondary/10 text-secondary">Beta Tester</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
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
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(false)} className="flex-1">
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">{name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{phone}</p>
                  </div>
                  <Button onClick={() => setIsEditing(true)} className="w-full">
                    Edit Profile
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  App Settings
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                Download Offline Maps
              </Button>
              <Button variant="outline" className="w-full justify-start">
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
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="font-medium">{stat.label}</p>
                        <p className="text-sm text-muted-foreground">{stat.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Trips */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
              <CardDescription>Your latest navigation history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrips.map((trip, index) => (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{trip.from}</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="font-medium">{trip.to}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{trip.date}</span>
                          <span>{trip.duration}</span>
                          <Badge variant="secondary" className="text-xs">{trip.type}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-success">
                          Saved {trip.saved}
                        </p>
                      </div>
                    </div>
                    {index < recentTrips.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your navigation milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;