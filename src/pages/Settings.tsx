import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Map, 
  Volume2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Settings = () => {
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [voiceLanguage, setVoiceLanguage] = useState('en-IN');
  const [potholeSensitivity, setPotholeSensitivity] = useState('high');
  const [monsoonAlerts, setMonsoonAlerts] = useState(true);
  const [nightSafetyFilter, setNightSafetyFilter] = useState(true);

  const handleSavePreferences = () => {
    toast.success('Navigation preferences saved');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Navigation Preferences
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Configure routing sensitivity, voice accent, and safety algorithms.
          </p>
        </div>

        {/* Indian Road Condition Settings */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <div className="p-1.5 rounded-lg bg-orange-600/10 text-orange-400 border border-orange-500/20">
              <Map className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Road & Routing Preferences</h3>
              <p className="text-xs text-zinc-400">Control how Naksha evaluates potholes, signals, and hazards</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white text-xs font-medium">Night Safety & Streetlight Filter</Label>
                <p className="text-[11px] text-zinc-400">Prioritize paths with over 90% operational streetlights after dark</p>
              </div>
              <Switch checked={nightSafetyFilter} onCheckedChange={setNightSafetyFilter} />
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white text-xs font-medium">Monsoon Waterlogging Warnings</Label>
                <p className="text-[11px] text-zinc-400">Alerts when rain exceeds 2mm on planned underpasses</p>
              </div>
              <Switch checked={monsoonAlerts} onCheckedChange={setMonsoonAlerts} />
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white text-xs font-medium">Pothole Reroute Sensitivity</Label>
                <p className="text-[11px] text-zinc-400">Reroute when road segment contains frequent craters</p>
              </div>
              <Select value={potholeSensitivity} onValueChange={setPotholeSensitivity}>
                <SelectTrigger className="w-40 bg-zinc-950 border-zinc-700 text-white rounded-lg text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white text-xs">
                  <SelectItem value="high">High (Avoid all)</SelectItem>
                  <SelectItem value="medium">Medium (Major only)</SelectItem>
                  <SelectItem value="low">Low (Standard)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Audio & Voice Guidance */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <div className="p-1.5 rounded-lg bg-purple-600/10 text-purple-400 border border-purple-500/20">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Audio Guidance</h3>
              <p className="text-xs text-zinc-400">Spoken navigation prompts during live drive simulation</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white text-xs font-medium">Spoken Turn Prompts</Label>
                <p className="text-[11px] text-zinc-400">Speak directions as you approach turns and flyovers</p>
              </div>
              <Switch checked={voiceGuidance} onCheckedChange={setVoiceGuidance} />
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white text-xs font-medium">Voice Language Accent</Label>
                <p className="text-[11px] text-zinc-400">Speech synthesis voice profile</p>
              </div>
              <Select value={voiceLanguage} onValueChange={setVoiceLanguage}>
                <SelectTrigger className="w-44 bg-zinc-950 border-zinc-700 text-white rounded-lg text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white text-xs">
                  <SelectItem value="en-IN">Indian English (en-IN)</SelectItem>
                  <SelectItem value="hi-IN">Hindi Voice (hi-IN)</SelectItem>
                  <SelectItem value="en-GB">Standard English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSavePreferences}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs px-6 py-4 rounded-xl"
          >
            Save Preferences
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
