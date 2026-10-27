import React, { useEffect, useState } from 'react';
import { Compass, Satellite, Navigation as NavIcon, Zap, CheckCircle2 } from 'lucide-react';

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
        standalone ? 'relative min-h-[420px] rounded-3xl overflow-hidden' : 'fixed inset-0 z-[9999]'
      } bg-zinc-950 flex flex-col items-center justify-center select-none transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambience: Glowing Orange Radar Radial Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-b from-orange-600/20 via-amber-500/10 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-orange-500/25 rounded-full blur-[80px]" />
      </div>

      {/* Cyber Road Perspective Lines (Simulating High-Speed Motion) */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] overflow-hidden pointer-events-none opacity-40">
        <div 
          className="w-full h-full animate-grid-travel"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(249, 115, 22, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(249, 115, 22, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            transform: 'perspective(500px) rotateX(68deg) scale(2.2)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
          }}
        />
        {/* Road Center Line Streaming Forward */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gradient-to-t from-orange-500 via-amber-400 to-transparent opacity-80 blur-[1px]" />
      </div>

      {/* Skip button in corner */}
      {!standalone && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-20 text-[11px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 backdrop-blur-md"
        >
          <span>Skip</span>
          <span>→</span>
        </button>
      )}

      {/* Center Stage: Radar Beacon + Auto Vehicle Silhouette */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        
        {/* Radar Scanning Ring Container */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-6">
          
          {/* Concentric Expanding Sonar Rings */}
          <div className="absolute inset-0 rounded-full border border-orange-500/40 animate-pulse-ring-1" />
          <div className="absolute inset-2 rounded-full border border-orange-500/30 animate-pulse-ring-2" />
          <div className="absolute inset-4 rounded-full border border-amber-500/20 animate-pulse-ring-3" />

          {/* Calibrated Compass Reticle Ring */}
          <div className="absolute inset-6 rounded-full border border-dashed border-zinc-700/80" />
          <div className="absolute inset-10 rounded-full border border-orange-500/30" />

          {/* Sweeping Radar Beam */}
          <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-none">
            <div 
              className="w-full h-full animate-radar-sweep origin-center"
              style={{
                background: 'conic-gradient(from 0deg, rgba(249, 115, 22, 0.45) 0deg, rgba(249, 115, 22, 0.05) 60deg, transparent 90deg, transparent 360deg)'
              }}
            />
          </div>

          {/* Central Navigation Beacon Core */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-950/90 border border-orange-500/40 shadow-[0_0_40px_rgba(249,115,22,0.35)] flex items-center justify-center backdrop-blur-xl animate-auto-hum">
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/50">
              <NavIcon className="w-6 h-6 text-white fill-current transform rotate-[-45deg]" />
            </div>
          </div>

          {/* Orbiting Satellite Marker */}
          <div className="absolute -top-1 right-4 p-1.5 rounded-full bg-zinc-900 border border-orange-500/50 shadow-lg text-orange-400">
            <Satellite className="w-3.5 h-3.5 animate-pulse" />
          </div>

          {/* GPS Coordinates Tag */}
          <div className="absolute -bottom-2 bg-zinc-900/90 border border-zinc-800 text-[9px] font-mono text-zinc-400 px-2 py-0.5 rounded-full backdrop-blur-md">
            28.6139° N, 77.2090° E · NavIC Active
          </div>
        </div>

        {/* Brand Header */}
        <div className="space-y-1.5 mb-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-orange-500 font-black text-2xl tracking-tight">नक्शा</span>
            <span className="text-white font-bold text-2xl tracking-tight">Naksha</span>
          </div>
          <div className="text-xs text-orange-400/90 font-medium tracking-wide">
            Smart India Navigation · Built for India
          </div>
        </div>

        {/* Telemetry Status Message */}
        <div className="w-full bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-3.5 mb-6 backdrop-blur-md transition-all duration-300">
          <div className="flex items-center justify-between text-left gap-2">
            <div className="flex items-center gap-2">
              {progress >= 100 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-bounce" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping flex-shrink-0" />
              )}
              <div className="text-xs font-semibold text-white">
                {telemetrySteps[stepIndex].label}
              </div>
            </div>
            <span className="text-[10px] font-mono text-orange-400 font-bold flex-shrink-0">
              [{stepIndex + 1}/4]
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 text-left mt-1 pl-4">
            {telemetrySteps[stepIndex].sub}
          </p>
        </div>

        {/* High-Precision Progress Bar */}
        <div className="w-full space-y-2">
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative">
            <div
              className="h-full bg-gradient-to-r from-orange-600 via-amber-400 to-orange-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(249,115,22,0.8)] relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing leading spark */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full blur-[2px] opacity-90 shadow-[0_0_8px_#fff]" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1 text-zinc-400">
              <Zap className="w-3 h-3 text-orange-400" />
              <span>Route Optimization Engine</span>
            </span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

/**
 * Compact inline loader for when routes are calculating on /dashboard or /routes
 */
export const RouteCalculationLoader: React.FC<{ message?: string }> = ({
  message = 'Calculating Indian road routes...'
}) => {
  return (
    <div className="relative overflow-hidden bg-zinc-900/90 border border-orange-500/30 rounded-3xl p-8 text-center space-y-4 shadow-xl backdrop-blur-xl">
      {/* Background Pulse Glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Mini Radar Center */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        {/* Pulsing Sonar Ring */}
        <div className="absolute inset-0 rounded-full border border-orange-500/40 animate-pulse-ring-1" />
        <div className="absolute inset-3 rounded-full border border-amber-500/30 animate-pulse-ring-2" />
        
        {/* Sweeping Radar Needle */}
        <div className="absolute inset-1 rounded-full overflow-hidden pointer-events-none">
          <div 
            className="w-full h-full animate-radar-sweep origin-center"
            style={{
              background: 'conic-gradient(from 0deg, rgba(249, 115, 22, 0.5) 0deg, transparent 75deg, transparent 360deg)'
            }}
          />
        </div>

        {/* Center Navigation Beacon */}
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-zinc-950 border border-orange-500/40 shadow-lg flex items-center justify-center">
          <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center shadow-md shadow-orange-600/40">
            <NavIcon className="w-4 h-4 text-white fill-current transform rotate-[-45deg]" />
          </div>
        </div>
      </div>

      {/* Status Details */}
      <div className="space-y-1 relative z-10">
        <div className="text-sm font-bold text-white flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span>{message}</span>
        </div>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          Comparing signal-free flyovers, night streetlighting index, and commuter pothole detours.
        </p>
      </div>

      {/* Mini Progress Pulse Bar */}
      <div className="w-48 mx-auto h-1 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
        <div className="h-full bg-gradient-to-r from-orange-600 via-amber-400 to-orange-400 animate-pulse rounded-full w-full" />
      </div>
    </div>
  );
};

export default NakshaLoader;
