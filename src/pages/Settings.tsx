import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Map, Shield, Palette, Globe, Smartphone } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoReroute, setAutoReroute] = useState(true);
  const [offlineMaps, setOfflineMaps] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [safetyAlerts, setSafetyAlerts] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Settings</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Customize your Naksha experience to suit your preferences.
          </p>
        </div>
      </section>

      {/* Settings Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Navigation Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-primary" />
                Navigation Preferences
              </CardTitle>
              <CardDescription>
                Configure how routes are calculated and displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Default Route Type</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred route calculation</p>
                </div>
                <Select defaultValue="fastest">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fastest">Fastest Route</SelectItem>
                    <SelectItem value="safest">Safest Route</SelectItem>
                    <SelectItem value="eco">Eco-Friendly</SelectItem>
                    <SelectItem value="cheapest">Cheapest Route</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Re-route</Label>
                  <p className="text-sm text-muted-foreground">Automatically find better routes during navigation</p>
                </div>
                <Switch checked={autoReroute} onCheckedChange={setAutoReroute} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Voice Guidance</Label>
                  <p className="text-sm text-muted-foreground">Enable turn-by-turn voice instructions</p>
                </div>
                <Switch checked={voiceGuidance} onCheckedChange={setVoiceGuidance} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Voice Language</Label>
                  <p className="text-sm text-muted-foreground">Choose navigation voice language</p>
                </div>
                <Select defaultValue="english">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="bengali">Bengali</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="marathi">Marathi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Safety & Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Safety & Alerts
              </CardTitle>
              <CardDescription>
                Configure safety features and alert preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Safety Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about road hazards and safety issues</p>
                </div>
                <Switch checked={safetyAlerts} onCheckedChange={setSafetyAlerts} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Speed Limit Warnings</Label>
                  <p className="text-sm text-muted-foreground">Alert when exceeding speed limits</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pothole Alerts</Label>
                  <p className="text-sm text-muted-foreground">Warning about upcoming potholes</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Night Mode Safety</Label>
                  <p className="text-sm text-muted-foreground">Prioritize well-lit routes after dark</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                App Preferences
              </CardTitle>
              <CardDescription>
                Customize the app interface and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive traffic updates and route alerts</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch to dark theme for better night visibility</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Offline Maps</Label>
                  <p className="text-sm text-muted-foreground">Download maps for offline navigation</p>
                </div>
                <Switch checked={offlineMaps} onCheckedChange={setOfflineMaps} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Map Style</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred map appearance</p>
                </div>
                <Select defaultValue="standard">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="satellite">Satellite</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Data & Privacy
              </CardTitle>
              <CardDescription>
                Control how your data is used and stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Location History</Label>
                  <p className="text-sm text-muted-foreground">Save your travel history for better recommendations</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anonymous Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Help improve routes by sharing anonymous usage data</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Crash Reports</Label>
                  <p className="text-sm text-muted-foreground">Automatically send crash reports to help fix issues</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button variant="outline">Reset to Defaults</Button>
            <Button className="px-8">Save Changes</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;