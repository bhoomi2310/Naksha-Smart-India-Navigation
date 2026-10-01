import React, { useState, useEffect, useRef } from 'react';
import { RouteOptionData, TurnStep } from '@/lib/routingService';
import { voiceGuidance } from '@/lib/voiceGuidance';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Navigation as NavIcon, 
  ChevronRight, 
  ArrowUp, 
  ArrowUpRight, 
  ArrowUpLeft, 
  CornerUpRight, 
  CornerUpLeft, 
  CheckCircle2,
  Gauge,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface TurnByTurnNavigatorProps {
  route: RouteOptionData;
  onVehiclePositionChange?: (pos: [number, number] | null, heading: number) => void;
  onClose?: () => void;
}

export const TurnByTurnNavigator: React.FC<TurnByTurnNavigatorProps> = ({
  route,
  onVehiclePositionChange,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentCoordIndex, setCurrentCoordIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(voiceGuidance.getMuted());
  const [currentSpeed, setCurrentSpeed] = useState(38); // km/h
  const [isArrived, setIsArrived] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const steps = route.steps || [];
  const coords = route.coordinates || [];

  // Toggle voice mute
  const handleToggleMute = () => {
    const newMuteState = voiceGuidance.toggleMute();
    setIsMuted(newMuteState);
    toast(newMuteState ? 'Voice guidance muted' : 'Voice guidance enabled (Indian Voice)');
  };

  // Start / Pause Simulation
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      setIsArrived(false);
      if (currentCoordIndex === 0 && steps.length > 0) {
        voiceGuidance.speak(`Starting navigation. ${steps[0]?.instruction || 'Head towards destination.'}`, true);
      }
    }
  };

  // Reset Simulation
  const handleReset = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentStepIndex(0);
    setCurrentCoordIndex(0);
    setIsArrived(false);
    if (coords[0]) {
      onVehiclePositionChange?.(coords[0], 0);
    }
    voiceGuidance.stop();
  };

  // Simulation Loop
  useEffect(() => {
    if (isPlaying && coords.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentCoordIndex((prevIdx) => {
          const nextIdx = prevIdx + 1;
          if (nextIdx >= coords.length) {
            // Reached destination!
            setIsPlaying(false);
            setIsArrived(true);
            voiceGuidance.speak('You have arrived at your destination. Thank you for navigating with Naksha.', true);
            toast.success('🎉 You have reached your destination!');
            if (timerRef.current) clearInterval(timerRef.current);
            return prevIdx;
          }

          const currentPoint = coords[nextIdx];
          const prevPoint = coords[prevIdx];

          // Calculate heading
          const dy = currentPoint[0] - prevPoint[0];
          const dx = currentPoint[1] - prevPoint[1];
          const heading = (Math.atan2(dx, dy) * 180) / Math.PI;

          // Random realistic speed variation around 35-50 km/h
          setCurrentSpeed(Math.floor(36 + Math.sin(nextIdx) * 12));

          onVehiclePositionChange?.(currentPoint, heading);

          // Update step indicator proportionally
          const stepRatio = nextIdx / coords.length;
          const targetStep = Math.min(steps.length - 1, Math.floor(stepRatio * steps.length));
          
          if (targetStep !== currentStepIndex) {
            setCurrentStepIndex(targetStep);
            const stepInstruction = steps[targetStep]?.instruction;
            if (stepInstruction) {
              voiceGuidance.speak(stepInstruction);
            }
          }

          return nextIdx;
        });
      }, 600); // 600ms tick for smooth driving animation
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, coords, steps, currentStepIndex, onVehiclePositionChange]);

  // Maneuver Icon Picker
  const getManeuverIcon = (type: string, modifier?: string) => {
    const mod = modifier?.toLowerCase() || '';
    if (type === 'arrive') return <CheckCircle2 className="w-8 h-8 text-emerald-400" />;
    if (mod.includes('left')) return <CornerUpLeft className="w-8 h-8 text-orange-400" />;
    if (mod.includes('right')) return <CornerUpRight className="w-8 h-8 text-orange-400" />;
    if (mod.includes('slight left')) return <ArrowUpLeft className="w-8 h-8 text-amber-400" />;
    if (mod.includes('slight right')) return <ArrowUpRight className="w-8 h-8 text-amber-400" />;
    return <ArrowUp className="w-8 h-8 text-cyan-400" />;
  };

  const currentStep = steps[currentStepIndex] || {
    instruction: 'Continue on main arterial road',
    distance: 450,
    type: 'continue',
    name: 'Main Road'
  };

  const nextStep = steps[currentStepIndex + 1];

  return (
    <div className="bg-gradient-to-br from-zinc-900/95 via-black/90 to-zinc-950/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-2xl text-white">
      {/* Top Banner: Current Instruction */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shadow-inner flex-shrink-0">
            {getManeuverIcon(currentStep.type, currentStep.modifier)}
          </div>
          <div>
            <div className="text-xs uppercase font-semibold tracking-wider text-orange-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              In {currentStep.distance > 1000 ? `${(currentStep.distance / 1000).toFixed(1)} km` : `${currentStep.distance} m`}
            </div>
            <h3 className="text-lg font-bold text-white leading-tight mt-0.5">
              {currentStep.instruction}
            </h3>
            {nextStep && (
              <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                <span>Then:</span>
                <span className="text-zinc-300 font-medium">{nextStep.instruction}</span>
              </div>
            )}
          </div>
        </div>

        {/* Voice Guidance Button */}
        <button
          onClick={handleToggleMute}
          className={`p-3 rounded-2xl border transition-all ${
            isMuted 
              ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30' 
              : 'bg-orange-500/20 text-orange-400 border-orange-500/40 hover:bg-orange-500/30'
          }`}
          title={isMuted ? 'Unmute Audio Voice' : 'Mute Audio Voice'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Middle Telemetry Strip: Speed, ETA, Progress */}
      <div className="grid grid-cols-3 gap-3 py-4 border-b border-white/10">
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
          <div className="text-[10px] uppercase font-semibold text-zinc-400 flex items-center justify-center gap-1">
            <Gauge className="w-3 h-3 text-cyan-400" />
            Live Speed
          </div>
          <div className="text-xl font-black text-white mt-1">
            {isPlaying ? currentSpeed : 0} <span className="text-xs font-normal text-zinc-400">km/h</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
          <div className="text-[10px] uppercase font-semibold text-zinc-400 flex items-center justify-center gap-1">
            <Compass className="w-3 h-3 text-orange-400" />
            Estimated ETA
          </div>
          <div className="text-xl font-black text-orange-400 mt-1">
            {route.eta}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
          <div className="text-[10px] uppercase font-semibold text-zinc-400 flex items-center justify-center gap-1">
            <NavIcon className="w-3 h-3 text-emerald-400" />
            Remaining
          </div>
          <div className="text-xl font-black text-emerald-400 mt-1">
            {route.distanceStr}
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="pt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={togglePlay}
            className={`font-semibold px-6 py-5 rounded-2xl shadow-lg transition-all ${
              isPlaying 
                ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/30' 
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Simulation
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {currentCoordIndex > 0 ? 'Resume Trip' : 'Start Live GPS Drive'}
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleReset}
            className="border-white/20 text-zinc-300 hover:text-white hover:bg-white/10 py-5 rounded-2xl"
            title="Reset to Start"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Step Counter Indicator */}
        <div className="text-xs text-zinc-400 font-medium">
          Step <span className="text-white font-bold">{currentStepIndex + 1}</span> of {steps.length}
        </div>
      </div>
    </div>
  );
};
