import React, { useEffect, useState } from 'react';
import { Compass, Satellite, Navigation as NavIcon, Zap, CheckCircle2 } from 'lucide-react';
import NakshaLogo from '@/components/NakshaLogo';

interface NakshaLoaderProps {
  onFinish?: () => void;
  duration?: number;
  standalone?: boolean;
}

export const NakshaLoader: React.FC<NakshaLoaderProps> = ({
  onFinish,
  duration = 2000,
  standalone = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const telemetrySteps = [
    { label: 'Initializing NavIC & GPS Constellation', sub: 'Calibrating dual-frequency satellite lock' },
    { label: 'Synthesizing 6 Indian Route Models', sub: 'Fastest, Safest, Scenic, Eco, Transit & Flood-Free' },
    { label: 'Scanning Potholes & Live Waterlogging', sub: 'Crowdsourced commuter hazard grid synced' },
    { label: 'Naksha Navigation Engine Ready', sub: 'Built for India · Starting your journey' },
  ];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 30) {
        setStepIndex(0);
      } else if (pct < 65) {
        setStepIndex(1);
      } else if (pct < 90) {
        setStepIndex(2);
      } else {
        setStepIndex(3);
      }

      if (pct >= 100) {
        clearInterval(interval);
        setIsExiting(true);
        setTimeout(() => {
          onFinish?.();
        }, 500);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, onFinish]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onFinish?.();
    }, 250);
  };

  return (
    <div
      className={`${
        standalone ? 'relative min-h-[420px] rounded-2xl overflow-hidden' : 'fixed inset-0 z-[9999]'
      } bg-[#14121F] flex flex-col items-center justify-center select-none transition-all duration-500 paper-grain ${
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Skip button in corner */}
      {!standalone && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-20 text-[11px] font-bold text-[#FAF5EC] hover:text-[#F2A31B] bg-[#231F33] hover:bg-[#342F4A] border-[1.5px] border-[#3E3856] px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-[2px_2px_0_#000]"
        >
          <span>Skip Intro</span>
          <span className="text-[#F2A31B]">&rarr;</span>
        </button>
      )}

      {/* Main Printed Telemetry Card */}
      <div className="relative z-10 w-full max-w-md px-6 text-center space-y-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#D8472B] border-2 border-[#FAF5EC] shadow-[4px_4px_0_#000] inline-flex items-center justify-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="50,14 36.5,50 30.5,33.5 14,27.5"
                fill="#FFFDF9"
                stroke="#14121F"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <div className="leading-tight">
            <div className="flex items-baseline justify-center gap-2">
              <span lang="hi" className="text-[#F2A31B] font-bold text-3xl font-devanagari">
                नक्शा
              </span>
              <span className="text-[#FAF5EC] font-black text-3xl tracking-tight font-display">
                Naksha
              </span>
            </div>
            <p className="text-xs text-[#EDE4D5]/80 font-semibold tracking-wider mt-1">
              Indian Navigation System
            </p>
          </div>
        </div>

        {/* Jaali separator */}
        <div className="jaali-border-divider opacity-40 max-w-xs mx-auto" aria-hidden="true" />

        {/* Dynamic Telemetry Step Card */}
        <div className="p-5 rounded-xl bg-[#FAF5EC] text-[#14121F] border-[2px] border-[#FAF5EC] shadow-[5px_5px_0_#000] text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D8472B] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D8472B] animate-ping" />
              Engine Step {stepIndex + 1} of 4
            </span>
            <span className="text-xs font-black text-[#14121F]">
              {progress}%
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-[#14121F] font-sans">
              {telemetrySteps[stepIndex].label}
            </div>
            <div className="text-xs text-[#524C61]">
              {telemetrySteps[stepIndex].sub}
            </div>
          </div>

          {/* Hard ink progress bar */}
          <div className="w-full h-3 rounded-md bg-[#EDE4D5] border-[1.5px] border-[#14121F] overflow-hidden p-0.5">
            <div
              className="h-full bg-[#D8472B] rounded-sm transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Satellite and NavIC Status Badges */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <div className="px-2.5 py-1 rounded-md bg-[#231F33] border border-[#3E3856] text-[10px] font-semibold text-[#EDE4D5] flex items-center gap-1.5">
            <Satellite className="w-3 h-3 text-[#F2A31B]" />
            <span>NavIC L5 / S Dual-Band</span>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-[#231F33] border border-[#3E3856] text-[10px] font-semibold text-[#EDE4D5] flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-[#2E8B86]" />
            <span>Multi-Modal Routing</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export const RouteCalculationLoader: React.FC<{ message?: string }> = ({
  message = 'Calculating Indian road routes...'
}) => {
  return (
    <div className="p-8 rounded-2xl bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[4px_4px_0_#14121F] text-center space-y-4">
      <div className="w-12 h-12 mx-auto rounded-xl bg-[#D8472B] border-[1.5px] border-[#14121F] shadow-[2px_2px_0_#14121F] flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <polygon
            points="50,14 36.5,50 30.5,33.5 14,27.5"
            fill="#FFFDF9"
            stroke="#14121F"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="space-y-1">
        <div className="text-sm font-bold text-[#14121F]">
          {message}
        </div>
        <p className="text-xs text-[#524C61] max-w-sm mx-auto">
          Checking signal-free flyovers, night streetlighting index, and commuter hazard alerts.
        </p>
      </div>

      <div className="w-48 mx-auto h-2 rounded-full bg-[#EDE4D5] border-[1.2px] border-[#14121F] overflow-hidden p-0.5">
        <div className="h-full bg-[#D8472B] rounded-full animate-pulse w-full" />
      </div>
    </div>
  );
};

export default NakshaLoader;
