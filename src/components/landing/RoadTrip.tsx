import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface RoadTripConfig {
  spriteSizeDesktop: number;
  spriteSizeTablet: number;
  edgeOffsetDesktop: number;
  edgeOffsetTablet: number;
  cornerRadius: number;
  anchorHeightFraction: number;
  laneScrollLength: number;
}

const DEFAULT_CONFIG: RoadTripConfig = {
  spriteSizeDesktop: 40,
  spriteSizeTablet: 28,
  edgeOffsetDesktop: 24,
  edgeOffsetTablet: 12,
  cornerRadius: 40,
  anchorHeightFraction: 0.55,
  laneScrollLength: 300,
};

interface PiecewiseSegment {
  sStart: number;
  sEnd: number;
  dStart: number;
  dEnd: number;
}

interface Waypoint {
  x: number;
  y: number;
}

interface MeasuredLayout {
  width: number;
  height: number;
  xR: number;
  xL: number;
  yStart: number;
  yDiv1: number;
  yDiv2: number;
  yDiv3: number;
  yPark: number;
  radius: number;
  pathD: string;
  segments: PiecewiseSegment[];
  waypoints: Waypoint[];
  totalLength: number;
}

interface RoadTripProps {
  config?: Partial<RoadTripConfig>;
  className?: string;
}

export const RoadTrip: React.FC<RoadTripProps> = ({ config: userConfig, className = '' }) => {
  const cfg = useMemo(() => ({ ...DEFAULT_CONFIG, ...userConfig }), [userConfig]);
  const location = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  const [screenMode, setScreenMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [layout, setLayout] = useState<MeasuredLayout | null>(null);

  const [isParked, setIsParked] = useState(false);
  const [isRoadRevealed, setIsRoadRevealed] = useState(false);

  // Animation and physics state kept in refs for zero layout trashing in scroll/RAF
  const currentDistRef = useRef(0);
  const targetDistRef = useRef(0);
  const currentAngleRef = useRef(90); // start pointing down
  const rafIdRef = useRef<number | null>(null);
  const isHiddenRef = useRef(false);

  // 1. Detect screen mode and motion preference
  useEffect(() => {
    const updateScreenMode = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setScreenMode('mobile');
      } else if (w < 1100) {
        setScreenMode('tablet');
      } else {
        setScreenMode('desktop');
      }
    };

    updateScreenMode();
    window.addEventListener('resize', updateScreenMode);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener?.('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', updateScreenMode);
      motionQuery.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  // 2. Measure layout and build SVG path & piecewise linear scroll table
  const measureAndBuildLayout = () => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 768) {
      setLayout(null);
      return;
    }

    const isDesk = w >= 1100;
    const edgeOffset = isDesk ? cfg.edgeOffsetDesktop : cfg.edgeOffsetTablet;
    const radius = Math.min(cfg.cornerRadius, isDesk ? 40 : 28);
    const vh = window.innerHeight;
    const anchorLine = vh * cfg.anchorHeightFraction;
    const halfLane = cfg.laneScrollLength / 2;

    const xR = w - edgeOffset;
    const xL = edgeOffset;

    // Find landmarks on the landing page
    const heroEl = document.getElementById('hero-section');
    const div1El = document.querySelector('[data-roadtrip-divider="1"]') as HTMLElement | null;
    const div2El = document.querySelector('[data-roadtrip-divider="2"]') as HTMLElement | null;
    const div3El = document.querySelector('[data-roadtrip-divider="3"]') as HTMLElement | null;
    const parkEl = (document.querySelector('[data-roadtrip-park="true"]') ||
      document.getElementById('landing-footer')) as HTMLElement | null;

    const getDocTop = (el: HTMLElement | null, fallback: number): number => {
      if (!el) return fallback;
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY;
    };

    const getDocCenter = (el: HTMLElement | null, fallback: number): number => {
      if (!el) return fallback;
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY + rect.height / 2;
    };

    const heroBottom = heroEl
      ? heroEl.getBoundingClientRect().bottom + window.scrollY
      : 640;

    const yStart = heroBottom + 16;
    const yDiv1 = getDocCenter(div1El, yStart + 600);
    const yDiv2 = getDocCenter(div2El, yDiv1 + 650);
    const yDiv3 = getDocCenter(div3El, yDiv2 + 650);
    const yPark = getDocTop(parkEl, yDiv3 + 450) - 48;

    const fullDocHeight = Math.max(
      document.documentElement.scrollHeight,
      yPark + 120
    );

    // Build SVG path string with quarter-circle arcs (C1 continuous)
    // Run 1: Down Right edge
    // Turn 1: Right edge down -> Leftward horizontal
    // Lane 1: Crossing Divider 1 to Left edge
    // Turn 2: Leftward horizontal -> Down Left edge
    // Run 2: Down Left edge
    // Turn 3: Down Left edge -> Rightward horizontal
    // Lane 2: Crossing Divider 2 to Right edge
    // Turn 4: Rightward horizontal -> Down Right edge
    // Run 3: Down Right edge
    // Turn 5: Down Right edge -> Leftward horizontal
    // Lane 3: Crossing Divider 3 to Left edge
    // Turn 6: Leftward horizontal -> Down Left edge
    // Run 4: Down Left edge to Parking spot
    const pathD = [
      `M ${xR} ${yStart}`,
      `L ${xR} ${yDiv1 - radius}`,
      `A ${radius} ${radius} 0 0 1 ${xR - radius} ${yDiv1}`,
      `L ${xL + radius} ${yDiv1}`,
      `A ${radius} ${radius} 0 0 0 ${xL} ${yDiv1 + radius}`,
      `L ${xL} ${yDiv2 - radius}`,
      `A ${radius} ${radius} 0 0 0 ${xL + radius} ${yDiv2}`,
      `L ${xR - radius} ${yDiv2}`,
      `A ${radius} ${radius} 0 0 1 ${xR} ${yDiv2 + radius}`,
      `L ${xR} ${yDiv3 - radius}`,
      `A ${radius} ${radius} 0 0 1 ${xR - radius} ${yDiv3}`,
      `L ${xL + radius} ${yDiv3}`,
      `A ${radius} ${radius} 0 0 0 ${xL} ${yDiv3 + radius}`,
      `L ${xL} ${yPark}`,
    ].join(' ');

    // Precise segment distance table
    const arcLen = (Math.PI / 2) * radius;
    const crossSpan = Math.max(0, xR - xL - 2 * radius);
    const laneTotalDist = 2 * arcLen + crossSpan;

    const d0 = 0;
    const dRun1 = Math.max(0, yDiv1 - radius - yStart);
    const dTurn1End = dRun1 + laneTotalDist;

    const dRun2 = Math.max(0, yDiv2 - radius - (yDiv1 + radius));
    const dTurn2End = dTurn1End + dRun2 + laneTotalDist;

    const dRun3 = Math.max(0, yDiv3 - radius - (yDiv2 + radius));
    const dTurn3End = dTurn2End + dRun3 + laneTotalDist;

    const dRun4 = Math.max(0, yPark - (yDiv3 + radius));
    const dTotal = dTurn3End + dRun4;

    // Piecewise scroll ranges:
    // Vertical runs map scroll directly to y position.
    // Each horizontal crossing gets exactly cfg.laneScrollLength (300px),
    // centered where the divider hits the anchor line in the viewport.
    const sStart = Math.max(0, yStart - anchorLine);
    const sDiv1 = yDiv1 - anchorLine;
    const sDiv2 = yDiv2 - anchorLine;
    const sDiv3 = yDiv3 - anchorLine;

    const sLane1Start = sDiv1 - halfLane;
    const sLane1End = sDiv1 + halfLane;

    const sLane2Start = sDiv2 - halfLane;
    const sLane2End = sDiv2 + halfLane;

    const sLane3Start = sDiv3 - halfLane;
    const sLane3End = sDiv3 + halfLane;

    const maxScroll = Math.max(1, fullDocHeight - vh);
    // Ensure sPark is comfortably reachable before or at the bottom of the page
    const sPark = Math.min(sLane3End + dRun4, Math.max(sLane3End + 120, maxScroll - 60));

    const segments: PiecewiseSegment[] = [
      { sStart: 0, sEnd: sStart, dStart: 0, dEnd: 0 },
      { sStart: sStart, sEnd: sLane1Start, dStart: 0, dEnd: dRun1 },
      { sStart: sLane1Start, sEnd: sLane1End, dStart: dRun1, dEnd: dTurn1End },
      { sStart: sLane1End, sEnd: sLane2Start, dStart: dTurn1End, dEnd: dTurn1End + dRun2 },
      { sStart: sLane2Start, sEnd: sLane2End, dStart: dTurn1End + dRun2, dEnd: dTurn2End },
      { sStart: sLane2End, sEnd: sLane3Start, dStart: dTurn2End, dEnd: dTurn2End + dRun3 },
      { sStart: sLane3Start, sEnd: sLane3End, dStart: dTurn2End + dRun3, dEnd: dTurn3End },
      { sStart: sLane3End, sEnd: sPark, dStart: dTurn3End, dEnd: dTotal },
    ];

    const waypoints: Waypoint[] = [
      { x: xR, y: yStart },
      { x: xR, y: yDiv1 },
      { x: xL, y: yDiv1 },
      { x: xL, y: yDiv2 },
      { x: xR, y: yDiv2 },
      { x: xR, y: yDiv3 },
      { x: xL, y: yDiv3 },
      { x: xL, y: yPark },
    ];

    setLayout({
      width: w,
      height: fullDocHeight,
      xR,
      xL,
      yStart,
      yDiv1,
      yDiv2,
      yDiv3,
      yPark,
      radius,
      pathD,
      segments,
      waypoints,
      totalLength: dTotal,
    });
  };

  // 3. Rebuild measurements on layout lifecycle triggers
  useEffect(() => {
    measureAndBuildLayout();

    const handleResize = () => {
      measureAndBuildLayout();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(measureAndBuildLayout);
    }

    const ro = new ResizeObserver(() => {
      measureAndBuildLayout();
    });
    ro.observe(document.body);

    const timer = setTimeout(measureAndBuildLayout, 450);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      ro.disconnect();
      clearTimeout(timer);
    };
  }, [location.pathname, screenMode]);

  // 4. Track visibility state for 60fps performance pause when tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      isHiddenRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // 5. Piecewise scroll mapping calculation from scrollY to distance along path
  const mapScrollToDistance = (scrollY: number, segs: PiecewiseSegment[], maxDist: number): number => {
    if (scrollY <= segs[0].sEnd) return 0;
    const last = segs[segs.length - 1];
    if (scrollY >= last.sEnd) return maxDist;

    for (let i = 1; i < segs.length; i++) {
      const seg = segs[i];
      if (scrollY <= seg.sEnd) {
        const span = seg.sEnd - seg.sStart;
        if (span <= 0) return seg.dStart;
        const ratio = (scrollY - seg.sStart) / span;
        return seg.dStart + ratio * (seg.dEnd - seg.dStart);
      }
    }
    return maxDist;
  };

  // 6. Active RAF Scrub and transform animation engine
  useEffect(() => {
    if (screenMode === 'mobile' || prefersReducedMotion || !layout) return;

    const path = pathRef.current;
    const sprite = spriteRef.current;
    if (!path || !sprite) return;

    const actualTotalLen = path.getTotalLength() || layout.totalLength;

    const onScroll = () => {
      const sy = window.scrollY;
      const target = mapScrollToDistance(sy, layout.segments, actualTotalLen);
      targetDistRef.current = target;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      if (!isHiddenRef.current && path && sprite) {
        const target = targetDistRef.current;
        const current = currentDistRef.current;

        // Scrub smoothing factor (~0.12 gives natural weight)
        const diff = target - current;
        if (Math.abs(diff) < 0.2) {
          currentDistRef.current = target;
        } else {
          currentDistRef.current += diff * 0.12;
        }

        const dist = Math.max(0, Math.min(actualTotalLen, currentDistRef.current));

        // Sample nearby lengths for smooth tangent angle
        const sampleDelta = 3;
        const p1 = path.getPointAtLength(Math.max(0, dist - sampleDelta));
        const p2 = path.getPointAtLength(Math.min(actualTotalLen, dist + sampleDelta));
        const pt = path.getPointAtLength(dist);

        const targetAngle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

        // Smooth angle to prevent wrapping glitches
        let angleDiff = ((targetAngle - currentAngleRef.current + 540) % 360) - 180;
        currentAngleRef.current += angleDiff * 0.18;

        sprite.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) rotate(${currentAngleRef.current.toFixed(1)}deg)`;

        // Update mask path strokeDashoffset dynamically so road draws right behind the auto
        if (maskPathRef.current) {
          const remain = Math.max(0, actualTotalLen - dist);
          maskPathRef.current.style.strokeDashoffset = `${remain}px`;
        }

        // Check if parked at end: when target is near total length or page reached bottom
        const maxScrollDoc = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const isAtBottom = maxScrollDoc > 0 && window.scrollY >= maxScrollDoc - 90;
        const reachedEnd = target >= actualTotalLen - 3 || isAtBottom;
        if (reachedEnd && !isParked) {
          setIsParked(true);
          setIsRoadRevealed(true);
        } else if (!reachedEnd && isParked) {
          setIsParked(false);
          setIsRoadRevealed(false);
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, [screenMode, prefersReducedMotion, layout, isParked]);

  // Completely disabled on mobile (< 768px)
  if (screenMode === 'mobile') return null;

  const isDesktop = screenMode === 'desktop';
  const spriteSize = isDesktop ? cfg.spriteSizeDesktop : cfg.spriteSizeTablet;
  const spriteH = (spriteSize * 24) / 40;

  // Reduced motion: static layout with road fully rendered and auto parked at end
  if (prefersReducedMotion && layout) {
    return (
      <div
        className={`absolute inset-x-0 top-0 pointer-events-none select-none z-[5] overflow-hidden ${className}`}
        style={{ height: layout.height }}
        aria-hidden="true"
      >
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${layout.width} ${layout.height}`}>
          {/* Static asphalt */}
          <path
            d={layout.pathD}
            fill="none"
            stroke="#14121F"
            strokeWidth={isDesktop ? 18 : 14}
            strokeOpacity="0.10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dashed marigold center line */}
          <path
            d={layout.pathD}
            fill="none"
            stroke="#F2A31B"
            strokeWidth="2.5"
            strokeDasharray="10 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Waypoint dots */}
          {layout.waypoints.map((wp, i) => (
            <g key={i}>
              <circle cx={wp.x} cy={wp.y} r={isDesktop ? 5 : 4} fill="#14121F" stroke="#14121F" strokeWidth="1" />
              <circle cx={wp.x} cy={wp.y} r={isDesktop ? 2.5 : 2} fill="#FFFDF9" />
            </g>
          ))}
          {/* Parked Auto */}
          <g transform={`translate(${layout.xL}, ${layout.yPark}) rotate(90)`}>
            <g transform={`translate(${-spriteSize / 2}, ${-spriteH / 2})`}>
              <TopDownAutoSprite size={spriteSize} isBobbing={false} isParked={true} />
            </g>
          </g>
          {/* Destination Pin */}
          <DestinationPin x={layout.xL} y={layout.yPark} isAnimated={false} />
        </svg>
      </div>
    );
  }

  if (!layout) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-x-0 top-0 pointer-events-none select-none z-[5] overflow-hidden ${className}`}
      style={{ height: layout.height }}
      aria-hidden="true"
    >
      <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${layout.width} ${layout.height}`}>
        <defs>
          {/* Progressive stroke-dashoffset reveal mask tracking the auto */}
          <mask id="roadtrip-reveal-mask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={layout.width} height={layout.height} fill="#000000" />
            <path
              ref={maskPathRef}
              d={layout.pathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth={isDesktop ? 36 : 28}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: `${layout.totalLength} ${layout.totalLength + 60}`,
                strokeDashoffset: `${layout.totalLength}px`,
              }}
            />
          </mask>
        </defs>

        {/* Hidden measurement path */}
        <path ref={pathRef} d={layout.pathD} fill="none" stroke="transparent" strokeWidth="1" />

        {/* Faint planned guide ribbon visible ahead of the auto */}
        <path
          d={layout.pathD}
          fill="none"
          stroke="#E8DECD"
          strokeWidth={isDesktop ? 14 : 10}
          strokeOpacity="0.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={layout.pathD}
          fill="none"
          stroke="#14121F"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          strokeOpacity="0.14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Traveled Road: masked dynamically to draw right behind the auto */}
        <g mask="url(#roadtrip-reveal-mask)">
          {/* Soft ink asphalt stroke at 10% opacity */}
          <path
            d={layout.pathD}
            fill="none"
            stroke="#14121F"
            strokeWidth={isDesktop ? 18 : 14}
            strokeOpacity="0.10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dashed marigold center line (10 12 dash with 2px round caps) */}
          <path
            d={layout.pathD}
            fill="none"
            stroke="#F2A31B"
            strokeWidth="2.5"
            strokeDasharray="10 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Waypoint dots at turns and start */}
          {layout.waypoints.map((wp, i) => (
            <g key={i}>
              <circle cx={wp.x} cy={wp.y} r={isDesktop ? 5 : 4} fill="#14121F" stroke="#14121F" strokeWidth="1" />
              <circle cx={wp.x} cy={wp.y} r={isDesktop ? 2.5 : 2} fill="#FFFDF9" />
            </g>
          ))}
        </g>

        {/* Destination Pin dropped at the parking spot */}
        {isParked && <DestinationPin x={layout.xL + 26} y={layout.yPark} isAnimated={true} />}
      </svg>

      {/* Auto-rickshaw sprite container updated via GPU transform */}
      <div
        ref={spriteRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          width: spriteSize,
          height: spriteH,
          marginLeft: -spriteSize / 2,
          marginTop: -spriteH / 2,
        }}
      >
        <TopDownAutoSprite size={spriteSize} isBobbing={!isParked} isParked={isParked} />
      </div>
    </div>
  );
};

/**
 * Clean Top-Down Auto-Rickshaw SVG
 * Facing right (+x) by default.
 * Authentically proportioned with marigold chassis, teal canopy, ink wheels, and headlights.
 */
interface TopDownAutoSpriteProps {
  size: number;
  isBobbing: boolean;
  isParked: boolean;
}

const TopDownAutoSprite: React.FC<TopDownAutoSpriteProps> = ({ size, isBobbing, isParked }) => {
  const height = (size * 24) / 40;

  return (
    <div
      className={`w-full h-full select-none pointer-events-none ${
        isParked ? 'animate-[settle-bounce_0.5s_ease-out]' : ''
      }`}
      style={{ width: size, height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Soft ink shadow under auto */}
        <ellipse cx="19" cy="12" rx="19" ry="11" fill="#14121F" fillOpacity="0.22" />

        {/* Inner vibrating engine bob group */}
        <g className={isBobbing ? 'animate-[auto-vibe_0.35s_ease-in-out_infinite]' : ''}>
          {/* Rear Wheels on sides */}
          <rect x="6" y="0.5" width="9" height="3.2" rx="1" fill="#14121F" stroke="#14121F" strokeWidth="0.8" />
          <rect x="6" y="20.3" width="9" height="3.2" rx="1" fill="#14121F" stroke="#14121F" strokeWidth="0.8" />

          {/* Front Wheel */}
          <rect x="33.5" y="10.5" width="5.5" height="3" rx="1" fill="#14121F" stroke="#14121F" strokeWidth="0.8" />

          {/* Marigold Body Chassis */}
          <path
            d="M 3 4 C 3 3, 5 3, 7 3 L 24 3 C 27 3, 33 7.8, 37 10 C 38.5 10.8, 38.5 13.2, 37 14 C 33 16.2, 27 21, 24 21 L 7 21 C 5 21, 3 21, 3 20 Z"
            fill="#F2A31B"
            stroke="#14121F"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Open Front Driver Cabin */}
          <path
            d="M 22 5.5 L 32.5 10.2 C 33.5 10.7, 33.5 13.3, 32.5 13.8 L 22 18.5 Z"
            fill="#FAF5EC"
            stroke="#14121F"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* Handlebars */}
          <line x1="28.5" y1="8" x2="28.5" y2="16" stroke="#14121F" strokeWidth="1.4" strokeLinecap="round" />

          {/* Driver Seat */}
          <rect x="21" y="9" width="3.5" height="6" rx="1" fill="#14121F" />

          {/* Teal Canopy Roof */}
          <path
            d="M 4 4 C 4 3, 6 3, 7 3 L 20 3 C 21.8 3, 22.8 4, 22.8 6 L 22.8 18 C 22.8 20, 21.8 21, 20 21 L 7 21 C 6 21, 4 21, 4 20 Z"
            fill="#1F6F6B"
            stroke="#14121F"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Canopy Canvas Seam Ribs */}
          <line x1="9" y1="4" x2="9" y2="20" stroke="#14121F" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="14" y1="4" x2="14" y2="20" stroke="#14121F" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="19" y1="4" x2="19" y2="20" stroke="#14121F" strokeWidth="0.8" strokeOpacity="0.4" />

          {/* Front Center Headlight */}
          <circle cx="38.5" cy="12" r="1.5" fill="#FFFDF9" stroke="#14121F" strokeWidth="0.8" />

          {/* Rear Taillights */}
          <circle cx="3.8" cy="5" r="0.9" fill="#D8472B" />
          <circle cx="3.8" cy="19" r="0.9" fill="#D8472B" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Vermilion Destination Pin dropping at parking spot with pulse ring
 */
interface DestinationPinProps {
  x: number;
  y: number;
  isAnimated: boolean;
}

const DestinationPin: React.FC<DestinationPinProps> = ({ x, y, isAnimated }) => {
  return (
    <g className={isAnimated ? 'animate-[pin-drop_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]' : ''}>
      {/* Short pulse ring at base */}
      <circle
        cx={x}
        cy={y}
        r="9"
        fill="none"
        stroke="#D8472B"
        strokeWidth="1.5"
        className={isAnimated ? 'animate-ping' : ''}
      />
      {/* Truck-art style vermilion destination pin */}
      <g transform={`translate(${x - 12}, ${y - 30})`}>
        <path
          d="M12 0 C5.37 0 0 5.37 0 12 C0 21 12 30 12 30 C12 30 24 21 24 12 C24 5.37 18.63 0 12 0 Z"
          fill="#D8472B"
          stroke="#14121F"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="4.5" fill="#FFFDF9" stroke="#14121F" strokeWidth="1.2" />
      </g>
    </g>
  );
};

export default RoadTrip;
