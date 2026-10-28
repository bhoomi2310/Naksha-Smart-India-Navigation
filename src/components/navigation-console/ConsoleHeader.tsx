import React from 'react';
import { AlertTriangle, Share2, Radio, Activity, Sparkles, Navigation } from 'lucide-react';
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
    toast.success('Navigation link copied to clipboard');
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-zinc-800/90 shadow-xl transition-all duration-300 hover:border-zinc-700/80 relative overflow-hidden group">
      {/* Subtle Top Saffron Accent Glow Bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent group-hover:via-orange-500 transition-all duration-500" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Branding & Status */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              NavIC Active
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Radio className="w-3 h-3 text-orange-400" />
              Indian Road Conditions V2
            </span>

            {activeRoutesCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                <Activity className="w-3 h-3 text-orange-400" />
                {activeRoutesCount} Models Computed
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Navigation Console</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm uppercase tracking-wider">
              Live
            </span>
          </h1>

          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Multi-profile Indian routing with real-time road condition scoring, night illumination indices, transit fares, and crowdsourced commuter alerts.
          </p>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Button
            onClick={onOpenHazardReport}
            variant="outline"
            size="sm"
            className="rounded-xl text-xs font-semibold h-9 px-3.5 border-zinc-700/80 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white hover:border-amber-500/50 transition-all duration-200 shadow-sm group/btn"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-400 group-hover/btn:animate-bounce" />
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
