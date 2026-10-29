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
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { toast } from 'sonner';

const Settings = () => {
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [voiceLanguage, setVoiceLanguage] = useState('en-IN');
  const [potholeSensitivity, setPotholeSensitivity] = useState('high');
  const [monsoonAlerts, setMonsoonAlerts] = useState(true);
  const [nightSafetyFilter, setNightSafetyFilter] = useState(true);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('naksha_nav_preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.voiceGuidance !== undefined) setVoiceGuidance(parsed.voiceGuidance);
        if (parsed.voiceLanguage !== undefined) setVoiceLanguage(parsed.voiceLanguage);
        if (parsed.potholeSensitivity !== undefined) setPotholeSensitivity(parsed.potholeSensitivity);
        if (parsed.monsoonAlerts !== undefined) setMonsoonAlerts(parsed.monsoonAlerts);
        if (parsed.nightSafetyFilter !== undefined) setNightSafetyFilter(parsed.nightSafetyFilter);
      }
    } catch {}
  }, []);

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('naksha_nav_preferences', JSON.stringify({
        voiceGuidance,
        voiceLanguage,
        potholeSensitivity,
        monsoonAlerts,
        nightSafetyFilter
      }));
      toast.success('Navigation preferences saved successfully');
    } catch {
      toast.error('Failed to save preferences');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EFE3] text-[#14121F] flex flex-col relative selection:bg-[#F2A31B] selection:text-[#14121F] paper-grain">
      <AmbientBackground variant="subtle" />
      <Navigation />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="ink-card p-5 rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-bold text-[#14121F] font-display tracking-tight">
            Navigation Preferences
          </h1>
          <p className="text-xs text-[#524C61] mt-0.5">
            Configure routing sensitivity, voice accent, and safety algorithms.
          </p>
        </div>

        {/* Indian Road Condition Settings */}
        <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] rounded-2xl p-5 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#14121F]/15">
            <div className="p-1.5 rounded-lg bg-[#FDF0ED] text-[#D8472B] border-[1.2px] border-[#14121F]">
              <Map className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#14121F]">Road &amp; Routing Preferences</h3>
              <p className="text-xs text-[#524C61]">Control how Naksha evaluates potholes, signals, and hazards</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[#14121F] text-xs font-bold">Night Safety &amp; Streetlight Filter</Label>
                <p className="text-[11px] text-[#524C61]">Prioritize paths with over 90% operational streetlights after dark</p>
              </div>
              <Switch checked={nightSafetyFilter} onCheckedChange={setNightSafetyFilter} />
            </div>

            <Separator className="bg-[#14121F]/15" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[#14121F] text-xs font-bold">Monsoon Waterlogging Warnings</Label>
                <p className="text-[11px] text-[#524C61]">Alerts when rain exceeds 2mm on planned underpasses</p>
              </div>
              <Switch checked={monsoonAlerts} onCheckedChange={setMonsoonAlerts} />
            </div>

            <Separator className="bg-[#14121F]/15" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[#14121F] text-xs font-bold">Pothole Reroute Sensitivity</Label>
                <p className="text-[11px] text-[#524C61]">Reroute when road segment contains frequent craters</p>
              </div>
              <Select value={potholeSensitivity} onValueChange={setPotholeSensitivity}>
                <SelectTrigger className="w-40 bg-[#FAF5EC] border-[1.2px] border-[#14121F] text-[#14121F] rounded-lg text-xs h-8 shadow-[1px_1px_0_#14121F]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] text-[#14121F] text-xs shadow-[3px_3px_0_#14121F]">
                  <SelectItem value="high">High (Avoid all)</SelectItem>
                  <SelectItem value="medium">Medium (Major only)</SelectItem>
                  <SelectItem value="low">Low (Standard)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Audio & Voice Guidance */}
        <div className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] rounded-2xl p-5 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#14121F]/15">
            <div className="p-1.5 rounded-lg bg-[#EAF4F3] text-[#1F6F6B] border-[1.2px] border-[#14121F]">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#14121F]">Audio Guidance</h3>
              <p className="text-xs text-[#524C61]">Spoken navigation prompts during live drive simulation</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[#14121F] text-xs font-bold">Spoken Turn Prompts</Label>
                <p className="text-[11px] text-[#524C61]">Speak directions as you approach turns and flyovers</p>
              </div>
              <Switch checked={voiceGuidance} onCheckedChange={setVoiceGuidance} />
            </div>

            <Separator className="bg-[#14121F]/15" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[#14121F] text-xs font-bold">Voice Language Accent</Label>
                <p className="text-[11px] text-[#524C61]">Speech synthesis voice profile</p>
              </div>
              <Select value={voiceLanguage} onValueChange={setVoiceLanguage}>
                <SelectTrigger className="w-44 bg-[#FAF5EC] border-[1.2px] border-[#14121F] text-[#14121F] rounded-lg text-xs h-8 shadow-[1px_1px_0_#14121F]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] text-[#14121F] text-xs shadow-[3px_3px_0_#14121F]">
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
            className="ink-btn-primary px-6 h-10 rounded-xl text-xs font-bold"
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
