import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { AlertTriangle, Droplets, Moon, Construction, ShieldAlert, AlertCircle } from 'lucide-react';
import { hazardsAPI } from '@/lib/api';

interface HazardReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocationName?: string;
  coordinates?: [number, number];
  onReportSubmitted?: (hazardData: any) => void;
}

export const HazardReportModal: React.FC<HazardReportModalProps> = ({
  isOpen,
  onClose,
  currentLocationName = 'Current Location',
  coordinates,
  onReportSubmitted
}) => {
  const [hazardType, setHazardType] = useState<'pothole' | 'waterlogging' | 'dark_stretch' | 'construction' | 'police_check' | 'other'>('pothole');
  const [customHazardTitle, setCustomHazardTitle] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [locationText, setLocationText] = useState(currentLocationName);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hazardOptions = [
    {
      id: 'pothole' as const,
      label: 'Pothole / Crater',
      icon: AlertTriangle,
      color: 'text-orange-500 dark:text-orange-400 border-orange-500/40 bg-orange-500/10',
      desc: 'Deep road potholes causing vehicle damage or slowdown.'
    },
    {
      id: 'waterlogging' as const,
      label: 'Monsoon Waterlogging',
      icon: Droplets,
      color: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
      desc: 'Flooded underpass or lane submerged under water.'
    },
    {
      id: 'dark_stretch' as const,
      label: 'Broken Streetlight / Unlit Road',
      icon: Moon,
      color: 'text-purple-600 dark:text-purple-400 border-purple-500/40 bg-purple-500/10',
      desc: 'No illumination, high danger at night.'
    },
    {
      id: 'construction' as const,
      label: 'Roadwork / Metro Barricade',
      icon: Construction,
      color: 'text-yellow-600 dark:text-yellow-400 border-yellow-500/40 bg-yellow-500/10',
      desc: 'Heavy machinery blocking lanes.'
    },
    {
      id: 'police_check' as const,
      label: 'Police Barricade / Checking',
      icon: ShieldAlert,
      color: 'text-blue-600 dark:text-blue-400 border-blue-500/40 bg-blue-500/10',
      desc: 'Traffic police vehicle inspection barricade.'
    },
    {
      id: 'other' as const,
      label: 'Other Hazard / Obstacle',
      icon: AlertCircle,
      color: 'text-rose-600 dark:text-rose-400 border-rose-500/40 bg-rose-500/10',
      desc: 'Fallen tree, cattle, accident, oil spill, or road debris.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedLabel = hazardOptions.find(h => h.id === hazardType)?.label || 'Road Hazard';
    const finalTitle = hazardType === 'other'
      ? (customHazardTitle.trim() || 'Other Road Hazard')
      : selectedLabel;

    const coords: [number, number] = coordinates && Array.isArray(coordinates) && coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])
      ? coordinates
      : [28.6139 + (Math.random() - 0.5) * 0.02, 77.2090 + (Math.random() - 0.5) * 0.02];

    const newHazard = {
      id: `reported-${Date.now()}`,
      type: hazardType,
      title: finalTitle,
      description: description || (hazardType === 'other' && customHazardTitle ? customHazardTitle : 'Reported by local commuter on Naksha network.'),
      severity,
      locationText,
      coordinates: coords,
      reportedAt: 'Just now',
      verifiedCount: 1
    };

    try {
      await hazardsAPI.reportHazard({
        type: hazardType,
        title: newHazard.title,
        description: newHazard.description,
        severity,
        lat: coords[0],
        lng: coords[1],
        locationText
      });
    } catch (err) {
      console.warn('Backend hazard report warning (using local):', err);
    } finally {
      setIsSubmitting(false);
      onReportSubmitted?.(newHazard);
      toast.success('Hazard reported to Naksha network.');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white p-6 rounded-3xl shadow-2xl transition-colors">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <DialogTitle className="text-xl font-black text-zinc-900 dark:text-white">
              Report Indian Road Hazard
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400 text-sm">
            Crowdsource live hazards for fellow commuters in real-time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Hazard Type Selector */}
          <div>
            <Label className="text-xs uppercase font-semibold text-zinc-700 dark:text-zinc-300">Select Hazard Type</Label>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              {hazardOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = hazardType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setHazardType(opt.id)}
                    className={`flex items-center gap-2 p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? `${opt.color} ring-2 ring-orange-500 shadow-md font-bold`
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700 dark:bg-zinc-900 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-semibold leading-tight">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Hazard Specification Input when 'Other' is selected */}
          {hazardType === 'other' && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1.5 animate-fadeIn">
              <Label className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase">
                Specify Hazard / Obstacle
              </Label>
              <Input
                value={customHazardTitle}
                onChange={(e) => setCustomHazardTitle(e.target.value)}
                placeholder="e.g. Fallen tree, stray cattle, oil spill, road debris"
                className="bg-white dark:bg-zinc-900 border-rose-300 dark:border-rose-500/40 text-zinc-900 dark:text-white rounded-xl text-sm"
                required
                autoFocus
              />
            </div>
          )}

          {/* Severity Selector */}
          <div>
            <Label className="text-xs uppercase font-semibold text-zinc-700 dark:text-zinc-300">Hazard Severity</Label>
            <div className="flex gap-2 mt-1.5">
              {(['low', 'medium', 'high', 'critical'] as const).map((sev) => {
                const isSelected = severity === sev;
                return (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverity(sev)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all border ${
                      isSelected
                        ? sev === 'critical'
                          ? 'bg-red-500 text-white border-red-400 shadow-md'
                          : sev === 'high'
                          ? 'bg-amber-500 text-white border-amber-400 shadow-md'
                          : 'bg-orange-500 text-white border-orange-400 shadow-md'
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {sev}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location details */}
          <div>
            <Label className="text-xs uppercase font-semibold text-zinc-700 dark:text-zinc-300">Location / Landmark</Label>
            <Input
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              placeholder="e.g. Near Flyover descent, Outer Ring Road"
              className="mt-1.5 bg-zinc-50 dark:bg-zinc-900 border-zinc-300 dark:border-white/15 text-zinc-900 dark:text-white rounded-xl text-sm"
              required
            />
          </div>

          {/* Additional details */}
          <div>
            <Label className="text-xs uppercase font-semibold text-zinc-700 dark:text-zinc-300">Specific Description (Optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Left lane has 2 deep craters, drive under 20km/h"
              className="mt-1.5 bg-zinc-50 dark:bg-zinc-900 border-zinc-300 dark:border-white/15 text-zinc-900 dark:text-white rounded-xl text-sm resize-none"
              rows={2}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-zinc-200 dark:border-white/15 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30"
            >
              {isSubmitting ? 'Publishing Alert...' : 'Submit Road Report'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
