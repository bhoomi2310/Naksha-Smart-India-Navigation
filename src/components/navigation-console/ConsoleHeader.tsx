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
    <div className="ink-card rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Clean Title & Subtitle */}
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1F6F6B]" />
            <span className="text-xs font-bold text-[#524C61]">Live Road Conditions &amp; Telemetry</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-[#14121F] font-display tracking-tight">
            Navigation Console
          </h1>

          <p className="text-xs text-[#524C61] max-w-2xl leading-relaxed">
            Compare route options with pavement quality scores, street illumination, and public transit fares.
          </p>
        </div>

        {/* Right: Clean Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Button
            onClick={onOpenHazardReport}
            variant="outline"
            size="sm"
            className="ink-btn-secondary rounded-lg text-xs font-semibold h-9 px-3.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-[#D8472B]" />
            Report Hazard
          </Button>

          <Button
            onClick={handleShare}
            variant="ghost"
            size="sm"
            className="rounded-lg text-xs font-semibold h-9 px-3 border border-[#14121F]/20 text-[#14121F] hover:bg-[#FAF5EC]"
            title="Share route link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsoleHeader;
