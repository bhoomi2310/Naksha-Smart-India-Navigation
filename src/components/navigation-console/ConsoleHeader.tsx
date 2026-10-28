import React from 'react';
import { AlertTriangle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ConsoleHeaderProps {
  onOpenHazardReport: () => void;
  activeRoutesCount?: number;
}

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  onOpenHazardReport,
  activeRoutesCount = 0,
}) => {
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-zinc-800/80 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Clean Title & Subtitle */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-zinc-400">Live Traffic & Road Conditions</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Navigation Console
          </h1>

          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Compare route options with pavement quality scores, street illumination, and public transit fares.
          </p>
        </div>

        {/* Right: Clean Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Button
            onClick={onOpenHazardReport}
            variant="outline"
            size="sm"
            className="rounded-xl text-xs font-medium h-9 px-3.5 border-zinc-700 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            Report Hazard
          </Button>

          <Button
            onClick={handleShare}
            variant="ghost"
            size="sm"
            className="rounded-xl text-xs font-medium h-9 px-3 text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 mr-1.5" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsoleHeader;
