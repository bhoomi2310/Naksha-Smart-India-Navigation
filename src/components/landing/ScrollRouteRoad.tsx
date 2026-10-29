import React, { useEffect, useRef, useState } from 'react';

/**
 * Renders a scroll-driven dashed road SVG that spans the full landing page.
 * A flat SVG auto-rickshaw sprite travels along it as the user scrolls.
 * Small marigold waypoint dots glow as the sprite passes, with no text labels.
 *
 * On prefers-reduced-motion: hidden entirely.
 * On mobile (<768px): simplified vertical path.
 */
export const ScrollRouteRoad: React.FC = () => {
  const roadPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spritePos, setSpritePos] = useState<{ x: number; y: number; angle: number }>({
    x: 140,
    y: 440,
    angle: 0,
  });
  const [activeStage, setActiveStage] = useState<0 | 1 | 2>(0);
  const [pathLength, setPathLength] = useState(0);
  const [drawnLength, setDrawnLength] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handleMQ = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.('change', handleMQ);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mq.removeEventListener?.('change', handleMQ);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (roadPathRef.current) {
      setPathLength(roadPathRef.current.getTotalLength());
    }
  }, [isMobile]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const updateSprite = () => {
      if (!roadPathRef.current || !containerRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const scrollY = -rect.top;
      let progress = totalScrollable > 0 ? scrollY / totalScrollable : 0;
      progress = Math.max(0, Math.min(1, progress));

      const path = roadPathRef.current;
      const totalLen = path.getTotalLength();
      const currentDist = progress * totalLen;
      setDrawnLength(currentDist);

      const pt = path.getPointAtLength(currentDist);
      const delta = 4;
      const p1 = path.getPointAtLength(Math.max(0, currentDist - delta));
      const p2 = path.getPointAtLength(Math.min(totalLen, currentDist + delta));
      const angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

      setSpritePos({ x: pt.x, y: pt.y, angle: angleDeg });

      const stage: 0 | 1 | 2 = progress < 0.35 ? 0 : progress < 0.72 ? 1 : 2;
      setActiveStage(stage);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateSprite);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateSprite();
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  const desktopRoadD =
    'M 140 440 C 300 500, 480 540, 680 520 C 920 490, 1060 720, 1060 1000 C 1060 1260, 820 1480, 580 1640 C 320 1820, 160 2020, 240 2280 C 320 2540, 540 2740, 700 3050';
  const mobileRoadD =
    'M 80 420 C 160 520, 60 720, 80 920 C 100 1200, 280 1450, 300 1700 C 320 1950, 100 2200, 120 2500 C 140 2750, 160 2900, 140 3100';

  const roadD = isMobile ? mobileRoadD : desktopRoadD;
  const vbW = isMobile ? 400 : 1200;

  // Three waypoints along the path — dots only, no labels
  const waypoints = isMobile
    ? [
        { x: 80, y: 420 },
        { x: 300, y: 1700 },
        { x: 140, y: 2500 },
      ]
    : [
        { x: 140, y: 440 },
        { x: 1060, y: 1000 },
        { x: 700, y: 3050 },
      ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={`0 0 ${vbW} 3200`}
        preserveAspectRatio="xMidYMin slice"
      >
        {/* Road underlay ribbon */}
        <path
          d={roadD}
          fill="none"
          stroke="#E8DECD"
          strokeWidth={isMobile ? 10 : 16}
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* Dashed guide lines */}
        <path
          d={roadD}
          fill="none"
          stroke="#14121F"
          strokeWidth="1.5"
          strokeDasharray="7 7"
          opacity="0.2"
        />
        {/* Traveled vermilion path — grows as user scrolls */}
        <path
          ref={roadPathRef}
          d={roadD}
          fill="none"
          stroke="#D8472B"
          strokeWidth={isMobile ? 3 : 4}
          strokeLinecap="round"
          strokeDasharray={pathLength ? `${pathLength} ${pathLength}` : undefined}
          strokeDashoffset={pathLength ? Math.max(0, pathLength - drawnLength) : undefined}
          opacity="0.85"
        />

        {/* Waypoint dots — glow in marigold when reached, no labels */}
        {waypoints.map((wp, i) => {
          const isPassed = i <= activeStage;
          const isCurrent = i === activeStage;

          return (
            <g key={i}>
              {isCurrent && (
                <circle cx={wp.x} cy={wp.y} r="14" fill="#F2A31B" fillOpacity="0.22" className="animate-ping" />
              )}
              <circle
                cx={wp.x}
                cy={wp.y}
                r="7"
                fill={isPassed ? '#F2A31B' : '#FFFDF9'}
                stroke="#14121F"
                strokeWidth="2"
              />
              <circle cx={wp.x} cy={wp.y} r="3" fill={isPassed ? '#D8472B' : '#14121F'} />
            </g>
          );
        })}

        {/* Flat SVG auto-rickshaw sprite */}
        <g
          transform={`translate(${spritePos.x}, ${spritePos.y}) rotate(${spritePos.angle}) translate(-24, -15)`}
          className="transition-transform duration-75 ease-out"
        >
          {/* Shadow */}
          <ellipse cx="28" cy="36" rx="20" ry="2.5" fill="#14121F" fillOpacity="0.18" />
          {/* Chassis */}
          <rect x="8" y="27" width="40" height="8" rx="2" fill="#14121F" />
          {/* Body: marigold */}
          <path
            d="M 10 20 L 14 13 H 36 L 46 22 L 48 28 H 8 Z"
            fill="#F2A31B"
            stroke="#14121F"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Roof: teal */}
          <path
            d="M 14 13 C 16 8, 30 6, 42 9 L 46 13 H 14 Z"
            fill="#1F6F6B"
            stroke="#14121F"
            strokeWidth="1.4"
          />
          {/* Windshield */}
          <path d="M 42 12 L 47 20 H 40 L 36 12 Z" fill="#EAF4F3" fillOpacity="0.9" stroke="#14121F" strokeWidth="1" />
          {/* Passenger window */}
          <rect x="18" y="15" width="16" height="12" rx="2" fill="#FFFDF9" fillOpacity="0.8" stroke="#14121F" strokeWidth="1" />
          {/* Vermilion stripe */}
          <rect x="8" y="23" width="40" height="2.5" fill="#D8472B" />
          {/* Headlight */}
          <circle cx="49" cy="22" r="2.2" fill="#FFFDF9" stroke="#D8472B" strokeWidth="1" />
          {/* Rear wheel */}
          <circle cx="16" cy="32" r="5.5" fill="#14121F" />
          <circle cx="16" cy="32" r="2.5" fill="#FFFDF9" />
          {/* Front wheel */}
          <circle cx="42" cy="33" r="4.5" fill="#14121F" />
          <circle cx="42" cy="33" r="2" fill="#FFFDF9" />
        </g>
      </svg>
    </div>
  );
};

export default ScrollRouteRoad;
