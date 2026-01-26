import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Map, Shield, Palette, Globe, Smartphone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import qutubMinarImage from '@/assets/qutub-minar.png';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoReroute, setAutoReroute] = useState(true);
  const [offlineMaps, setOfflineMaps] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [safetyAlerts, setSafetyAlerts] = useState(true);

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden relative">
      {/* Full Page Background - Qutub Minar (Image 3) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${qutubMinarImage})`,
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
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="heading-section text-white mb-6 drop-shadow-2xl font-extrabold">
              Settings
            </h1>
            <p className="text-xl text-white/95 max-w-3xl mx-auto font-light drop-shadow-lg">
              Customize your Naksha experience to suit your preferences.
            </p>
          </div>
        </section>

        {/* Settings Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Navigation Preferences */}
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Map className="w-5 h-5 text-orange-500" />
                  Navigation Preferences
                </CardTitle>
                <CardDescription>
                  Configure how routes are calculated and displayed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Default Route Type</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred route calculation</p>
                  </div>
                  <Select defaultValue="fastest">
                    <SelectTrigger className="w-48 bg-white dark:bg-gray-800">
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
                    <Label className="text-gray-900 dark:text-white">Auto Re-route</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automatically find better routes during navigation</p>
                  </div>
                  <Switch checked={autoReroute} onCheckedChange={setAutoReroute} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Voice Guidance</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enable turn-by-turn voice instructions</p>
                  </div>
                  <Switch checked={voiceGuidance} onCheckedChange={setVoiceGuidance} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Voice Language</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Choose navigation voice language</p>
                  </div>
                  <Select defaultValue="english">
                    <SelectTrigger className="w-48 bg-white dark:bg-gray-800">
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
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Shield className="w-5 h-5 text-orange-500" />
                  Safety & Alerts
                </CardTitle>
                <CardDescription>
                  Configure safety features and alert preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Safety Alerts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about road hazards and safety issues</p>
                  </div>
                  <Switch checked={safetyAlerts} onCheckedChange={setSafetyAlerts} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Speed Limit Warnings</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Alert when exceeding speed limits</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Pothole Alerts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Warning about upcoming potholes</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Night Mode Safety</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Prioritize well-lit routes after dark</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* App Preferences */}
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Smartphone className="w-5 h-5 text-orange-500" />
                  App Preferences
                </CardTitle>
                <CardDescription>
                  Customize the app interface and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Push Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive traffic updates and route alerts</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Dark Mode</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Switch to dark theme for better night visibility</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Offline Maps</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Download maps for offline navigation</p>
                  </div>
                  <Switch checked={offlineMaps} onCheckedChange={setOfflineMaps} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Map Style</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred map appearance</p>
                  </div>
                  <Select defaultValue="standard">
                    <SelectTrigger className="w-48 bg-white dark:bg-gray-800">
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
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Globe className="w-5 h-5 text-orange-500" />
                  Data & Privacy
                </CardTitle>
                <CardDescription>
                  Control how your data is used and stored
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Location History</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Save your travel history for better recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Anonymous Data Sharing</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Help improve routes by sharing anonymous usage data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Crash Reports</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automatically send crash reports to help fix issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline" 
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Reset to Defaults
              </Button>
              <Button className="px-8 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold shadow-lg">
                Save Changes
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
