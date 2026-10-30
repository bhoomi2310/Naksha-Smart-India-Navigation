import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Compass,
  Milestone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface TurnByTurnNavigatorProps {
  route: RouteOptionData;
  onVehiclePositionChange?: (pos: [number, number] | null, heading: number) => void;
  onClose?: () => void;
}

// Calculate distance in meters along polyline between two indices using Haversine formula
function calculatePolylineDistance(polyline: [number, number][], fromIdx: number, toIdx: number): number {
  if (!polyline || polyline.length === 0 || fromIdx >= toIdx) return 0;
  let totalMeters = 0;
  const maxIdx = Math.min(toIdx, polyline.length - 1);
  for (let i = fromIdx; i < maxIdx; i++) {
    const p1 = polyline[i];
    const p2 = polyline[i + 1];
    const R = 6371000; // Earth radius in meters
    const dLat = (p2[0] - p1[0]) * Math.PI / 180;
    const dLon = (p2[1] - p1[1]) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(p1[0] * Math.PI / 180) * Math.cos(p2[0] * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    totalMeters += R * c;
  }
  return Math.round(totalMeters);
}

// Find current step index corresponding to vehicle coordinate index
function getStepIndexForCoordinate(idx: number, stepList: TurnStep[], totalCoords: number): number {
  if (!stepList || stepList.length === 0) return 0;
  for (let i = 0; i < stepList.length; i++) {
    const s = stepList[i];
    const sStart = s.coordStartIndex ?? 0;
    const nextStart = i < stepList.length - 1 
      ? (stepList[i + 1].coordStartIndex ?? totalCoords) 
      : totalCoords;
    if (idx >= sStart && idx < nextStart) {
      return i;
    }
  }
  return Math.max(0, stepList.length - 1);
}

export const TurnByTurnNavigator: React.FC<TurnByTurnNavigatorProps> = ({
  route,
  onVehiclePositionChange,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentCoordIndex, setCurrentCoordIndex] = useState(0);
  const [remainingStepDistance, setRemainingStepDistance] = useState(0);
  const [isMuted, setIsMuted] = useState(voiceGuidance.getMuted());
  const [currentSpeed, setCurrentSpeed] = useState(38); // km/h
  const [isArrived, setIsArrived] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Track voice milestones per step so alerts are spoken once as vehicle moves forward
  const voiceMilestonesRef = useRef<Record<number, { spokeStart?: boolean; spokeAdvance?: boolean; spokeImmediate?: boolean }>>({});

  const steps = useMemo(() => route.steps || [], [route.steps]);
  const coords = useMemo(() => route.coordinates || [], [route.coordinates]);

  // Initial step setup
  useEffect(() => {
    if (steps.length > 0 && coords.length > 0) {
      const initialStep = steps[0];
      const endIdx = initialStep.coordEndIndex ?? (steps[1]?.coordStartIndex ?? coords.length - 1);
      setRemainingStepDistance(calculatePolylineDistance(coords, 0, endIdx));
    }
  }, [steps, coords]);

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
        const firstStep = steps[0];
        voiceMilestonesRef.current[0] = { spokeStart: true };
        voiceGuidance.speak(firstStep.spokenInstruction || `Starting navigation. ${firstStep.instruction}`, true);
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
    voiceMilestonesRef.current = {};
    if (coords[0]) {
      onVehiclePositionChange?.(coords[0], 0);
    }
    if (steps.length > 0 && coords.length > 0) {
      const endIdx = steps[0].coordEndIndex ?? (steps[1]?.coordStartIndex ?? coords.length - 1);
      setRemainingStepDistance(calculatePolylineDistance(coords, 0, endIdx));
    }
    voiceGuidance.stop();
  };

  // Simulation Loop: moves forward coordinate-by-coordinate
  useEffect(() => {
    if (isPlaying && coords.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentCoordIndex((prevIdx) => {
          const nextIdx = prevIdx + 1;
          if (nextIdx >= coords.length) {
            // Reached destination
            setIsPlaying(false);
            setIsArrived(true);
            setRemainingStepDistance(0);
            setCurrentStepIndex(Math.max(0, steps.length - 1));
            voiceGuidance.speak('You have arrived at your destination. Thank you for navigating with Naksha.', true);
            toast.success('You have reached your destination!');
            if (timerRef.current) clearInterval(timerRef.current);
            return prevIdx;
          }

          const currentPoint = coords[nextIdx];
          const prevPoint = coords[prevIdx];

          // Calculate vehicle heading
          const dy = currentPoint[0] - prevPoint[0];
          const dx = currentPoint[1] - prevPoint[1];
          const heading = (Math.atan2(dx, dy) * 180) / Math.PI;

          // Determine step strictly based on vehicle coordinate progression
          const activeStepIdx = getStepIndexForCoordinate(nextIdx, steps, coords.length);
          const activeStep = steps[activeStepIdx];
          const stepEndIdx = activeStep?.coordEndIndex ?? (steps[activeStepIdx + 1]?.coordStartIndex ?? coords.length - 1);
          const remainingMeters = calculatePolylineDistance(coords, nextIdx, stepEndIdx);

          setRemainingStepDistance(remainingMeters);

          // Realistic vehicle speed based on corridor and turn proximity
          let liveSpeed = 42;
          if (remainingMeters <= 40) {
            liveSpeed = 22; // Slowing down for turn
          } else if (activeStep?.roadRef?.includes('NH') || activeStep?.name?.toLowerCase().includes('expressway')) {
            liveSpeed = 68; // Cruising on highway
          } else {
            liveSpeed = 38 + Math.floor(Math.sin(nextIdx) * 8);
          }
          setCurrentSpeed(liveSpeed);

          onVehiclePositionChange?.(currentPoint, heading);

          // Step transition: only advance when the vehicle physically crosses into the next step
          if (activeStepIdx !== currentStepIndex) {
            setCurrentStepIndex(activeStepIdx);
            
            // Announce newly entered step
            if (!voiceMilestonesRef.current[activeStepIdx]?.spokeStart) {
              voiceMilestonesRef.current[activeStepIdx] = { 
                ...voiceMilestonesRef.current[activeStepIdx], 
                spokeStart: true 
              };
              if (activeStep?.spokenInstruction) {
                voiceGuidance.speak(activeStep.spokenInstruction);
              }
            }
          }

          // Advance turn warning (approx 150m - 250m before maneuver)
          if (remainingMeters <= 250 && remainingMeters > 60) {
            if (!voiceMilestonesRef.current[activeStepIdx]?.spokeAdvance) {
              voiceMilestonesRef.current[activeStepIdx] = {
                ...voiceMilestonesRef.current[activeStepIdx],
                spokeAdvance: true
              };
              const nextStepObj = steps[activeStepIdx + 1];
              if (nextStepObj) {
                const roundedMeters = Math.round(remainingMeters / 50) * 50;
                const turnModifier = nextStepObj.modifier ? `turn ${nextStepObj.modifier}` : 'continue';
                voiceGuidance.speak(`In ${roundedMeters} meters, ${turnModifier} onto ${nextStepObj.name}.`);
              }
            }
          }

          // Immediate turn cue (approx 30m before maneuver)
          if (remainingMeters <= 35 && remainingMeters > 5) {
            if (!voiceMilestonesRef.current[activeStepIdx]?.spokeImmediate) {
              voiceMilestonesRef.current[activeStepIdx] = {
                ...voiceMilestonesRef.current[activeStepIdx],
                spokeImmediate: true
              };
              const nextStepObj = steps[activeStepIdx + 1];
              if (nextStepObj) {
                const turnAction = nextStepObj.modifier ? `Turn ${nextStepObj.modifier} now` : 'Proceed straight';
                voiceGuidance.speak(`${turnAction} onto ${nextStepObj.name}.`);
              }
            }
          }

          return nextIdx;
        });
      }, 550); // 550ms tick for responsive driving animation
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, coords, steps, currentStepIndex, onVehiclePositionChange]);

  // Maneuver Icon Picker
  const getManeuverIcon = (type: string, modifier?: string) => {
    const mod = modifier?.toLowerCase() || '';
    if (type === 'arrive') return <CheckCircle2 className="w-8 h-8 text-emerald-600" />;
    if (type === 'depart') return <NavIcon className="w-8 h-8 text-[#1F6F6B]" />;
    if (type === 'roundabout' || type === 'rotary' || type === 'exit rotary') {
      return <Compass className="w-8 h-8 text-[#C98109]" />;
    }
    if (mod.includes('sharp left')) return <CornerUpLeft className="w-8 h-8 text-[#D8472B]" />;
    if (mod.includes('sharp right')) return <CornerUpRight className="w-8 h-8 text-[#D8472B]" />;
    if (mod.includes('left')) return <CornerUpLeft className="w-8 h-8 text-[#D8472B]" />;
    if (mod.includes('right')) return <CornerUpRight className="w-8 h-8 text-[#D8472B]" />;
    if (mod.includes('slight left')) return <ArrowUpLeft className="w-8 h-8 text-[#C98109]" />;
    if (mod.includes('slight right')) return <ArrowUpRight className="w-8 h-8 text-[#C98109]" />;
    return <ArrowUp className="w-8 h-8 text-[#1F6F6B]" />;
  };

  const currentStep = steps[currentStepIndex] || {
    instruction: 'Continue on main arterial road',
    distance: 450,
    type: 'continue',
    name: 'Main Road'
  };

  const nextStep = steps[currentStepIndex + 1];

  const formatDistanceDisplay = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${Math.max(0, Math.round(meters))} m`;
  };

  return (
    <div className="bg-[#FFFDF9] border-2 border-[#14121F] shadow-[6px_6px_0_#14121F] rounded-2xl p-5 text-[#14121F]">
      {/* Top Banner: Current Instruction & Live Distance Countdown */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#14121F]/15">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF5EC] border-[1.5px] border-[#14121F] flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_#14121F]">
            {getManeuverIcon(currentStep.type, currentStep.modifier)}
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase font-black tracking-wider text-[#D8472B] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D8472B] animate-pulse"></span>
              <span>
                {isArrived 
                  ? 'Arrived at Destination' 
                  : remainingStepDistance <= 30 
                    ? 'Turn Now' 
                    : `In ${formatDistanceDisplay(remainingStepDistance)}`}
              </span>
              {currentStep.roadRef && (
                <span className="bg-[#1F6F6B]/15 text-[#1F6F6B] border border-[#1F6F6B]/30 px-2 py-0.5 rounded text-[10px] font-bold">
                  {currentStep.roadRef}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-[#14121F] font-sans leading-tight mt-1 truncate">
              {currentStep.instruction}
            </h3>
            {nextStep && !isArrived && (
              <div className="text-xs text-[#524C61] mt-1.5 flex items-center gap-1.5 truncate">
                <span className="font-bold text-[#1F6F6B]">Then:</span>
                <span className="text-[#14121F] font-semibold truncate">{nextStep.instruction}</span>
              </div>
            )}
          </div>
        </div>

        {/* Voice Guidance Button */}
        <button
          onClick={handleToggleMute}
          className={`p-3 rounded-xl border-[1.2px] border-[#14121F] transition-all flex-shrink-0 shadow-[2px_2px_0_#14121F] ${
            isMuted 
              ? 'bg-[#FDF0ED] text-[#D8472B]' 
              : 'bg-[#FAF5EC] text-[#14121F] hover:bg-[#FEF8EA]'
          }`}
          title={isMuted ? 'Unmute Audio Voice Guidance' : 'Mute Audio Voice Guidance'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Middle Telemetry Strip: Speed, ETA, Progress */}
      <div className="grid grid-cols-3 gap-3 py-4 border-b border-[#14121F]/15">
        <div className="bg-[#FAF5EC] rounded-xl p-3 border border-[#14121F]/20 text-center">
          <div className="text-[10px] uppercase font-bold text-[#524C61] flex items-center justify-center gap-1">
            <Gauge className="w-3 h-3 text-[#1F6F6B]" />
            Live Speed
          </div>
          <div className="text-xl font-black text-[#14121F] mt-1">
            {isPlaying ? currentSpeed : 0} <span className="text-xs font-normal text-[#524C61]">km/h</span>
          </div>
        </div>

        <div className="bg-[#FAF5EC] rounded-xl p-3 border border-[#14121F]/20 text-center">
          <div className="text-[10px] uppercase font-bold text-[#524C61] flex items-center justify-center gap-1">
            <Compass className="w-3 h-3 text-[#D8472B]" />
            Estimated ETA
          </div>
          <div className="text-xl font-black text-[#D8472B] mt-1">
            {route.eta}
          </div>
        </div>

        <div className="bg-[#FAF5EC] rounded-xl p-3 border border-[#14121F]/20 text-center">
          <div className="text-[10px] uppercase font-bold text-[#524C61] flex items-center justify-center gap-1">
            <NavIcon className="w-3 h-3 text-[#1F6F6B]" />
            Remaining
          </div>
          <div className="text-xl font-black text-[#1F6F6B] mt-1">
            {route.distanceStr}
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="pt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={togglePlay}
            className={`font-bold px-6 py-5 rounded-xl shadow-[3px_3px_0_#14121F] border-[1.5px] border-[#14121F] transition-all ${
              isPlaying 
                ? 'bg-[#F2A31B] hover:bg-[#C98109] text-[#14121F]' 
                : 'ink-btn-primary'
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
            className="ink-btn-secondary py-5 rounded-xl"
            title="Reset to Start"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Step Counter Indicator */}
        <div className="text-xs text-[#524C61] font-semibold flex items-center gap-1">
          <Milestone className="w-3.5 h-3.5 text-[#1F6F6B]" />
          <span>Step</span>
          <span className="text-[#14121F] font-bold">{currentStepIndex + 1}</span>
          <span>of {steps.length}</span>
        </div>
      </div>
    </div>
  );
};
