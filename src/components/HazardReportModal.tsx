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
import { AlertTriangle, Droplets, Moon, Construction, ShieldAlert, Check } from 'lucide-react';

interface HazardReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocationName?: string;
  onReportSubmitted?: (hazardData: any) => void;
}

export const HazardReportModal: React.FC<HazardReportModalProps> = ({
  isOpen,
  onClose,
  currentLocationName = 'Current Location',
  onReportSubmitted
}) => {
  const [hazardType, setHazardType] = useState<'pothole' | 'waterlogging' | 'dark_stretch' | 'construction' | 'police_check'>('pothole');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [locationText, setLocationText] = useState(currentLocationName);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hazardOptions = [
    {
      id: 'pothole' as const,
      label: 'Pothole / Crater',
      icon: AlertTriangle,
      color: 'text-orange-400 border-orange-500/40 bg-orange-500/10',
      desc: 'Deep road potholes causing vehicle damage or slowdown.'
    },
    {
      id: 'waterlogging' as const,
      label: 'Monsoon Waterlogging',
      icon: Droplets,
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
      desc: 'Flooded underpass or lane submerged under water.'
    },
    {
      id: 'dark_stretch' as const,
      label: 'Broken Streetlight / Unlit Road',
      icon: Moon,
      color: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
      desc: 'No illumination, high danger at night.'
    },
    {
      id: 'construction' as const,
      label: 'Roadwork / Metro Barricade',
      icon: Construction,
      color: 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10',
      desc: 'Heavy machinery blocking lanes.'
    },
    {
      id: 'police_check' as const,
      label: 'Police Barricade / Checking',
      icon: ShieldAlert,
      color: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
      desc: 'Traffic police vehicle inspection barricade.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newHazard = {
      id: `reported-${Date.now()}`,
      type: hazardType,
      title: hazardOptions.find(h => h.id === hazardType)?.label || 'Road Hazard',
      description: description || 'Reported by local commuter on Naksha network.',
      severity,
      locationText,
      reportedAt: 'Just now',
      verifiedCount: 1
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onReportSubmitted?.(newHazard);
      toast.success('🙏 Hazard reported! Helping fellow Indian commuters navigate safely.');
      onClose();
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-zinc-950 border border-white/15 text-white p-6 rounded-3xl shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <DialogTitle className="text-xl font-bold text-white">
              Report Indian Road Hazard
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400 text-sm">
            Crowdsource live hazards for fellow commuters in real-time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Hazard Type Selector */}
          <div>
            <Label className="text-xs uppercase font-semibold text-zinc-300">Select Hazard Type</Label>
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
                        ? `${opt.color} ring-2 ring-orange-500 shadow-md`
                        : 'bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-semibold leading-tight">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Severity Selector */}
          <div>
            <Label className="text-xs uppercase font-semibold text-zinc-300">Hazard Severity</Label>
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
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'
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
            <Label className="text-xs uppercase font-semibold text-zinc-300">Location / Landmark</Label>
            <Input
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              placeholder="e.g. Near Flyover descent, Outer Ring Road"
              className="mt-1.5 bg-zinc-900 border-white/15 text-white rounded-xl text-sm"
              required
            />
          </div>

          {/* Additional details */}
          <div>
            <Label className="text-xs uppercase font-semibold text-zinc-300">Specific Description (Optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Left lane has 2 deep craters, drive under 20km/h"
              className="mt-1.5 bg-zinc-900 border-white/15 text-white rounded-xl text-sm resize-none"
              rows={2}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/15 text-zinc-300 hover:bg-zinc-800 rounded-xl"
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
