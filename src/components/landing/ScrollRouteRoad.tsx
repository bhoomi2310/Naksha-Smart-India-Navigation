import React, { useEffect, useRef, useState } from 'react';

/**
 * Renders a scroll-driven dashed road SVG that spans the full landing page.
 * Small marigold waypoint dots glow as the user scrolls through sections.
 * No auto-rickshaw sprite — only the animated road line.
 *
 * On prefers-reduced-motion: hidden entirely.
 */
export const ScrollRouteRoad: React.FC = () => {
  const roadPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

    const update = () => {
      if (!roadPathRef.current || !containerRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      let progress = totalScrollable > 0 ? scrolled / totalScrollable : 0;
      progress = Math.max(0, Math.min(1, progress));

      const totalLen = roadPathRef.current.getTotalLength();
      setDrawnLength(progress * totalLen);

      const stage: 0 | 1 | 2 = progress < 0.35 ? 0 : progress < 0.72 ? 1 : 2;
      setActiveStage(stage);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  const desktopRoadD =
    'M 140 440 C 300 500, 480 540, 680 520 C 920 490, 1060 720, 1060 1000 C 1060 1260, 820 1480, 580 1640 C 320 1820, 160 2020, 240 2280 C 320 2540, 540 2740, 700 3050';
  const mobileRoadD =
    'M 80 420 C 160 520, 60 720, 80 920 C 100 1200, 280 1450, 300 1700 C 320 1950, 100 2200, 120 2500 C 140 2750, 160 2900, 140 3100';

  const roadD = isMobile ? mobileRoadD : desktopRoadD;
  const vbW = isMobile ? 400 : 1200;

  const waypoints = isMobile
    ? [{ x: 80, y: 420 }, { x: 300, y: 1700 }, { x: 140, y: 2500 }]
    : [{ x: 140, y: 440 }, { x: 1060, y: 1000 }, { x: 700, y: 3050 }];

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
              <circle cx={wp.x} cy={wp.y} r="7" fill={isPassed ? '#F2A31B' : '#FFFDF9'} stroke="#14121F" strokeWidth="2" />
              <circle cx={wp.x} cy={wp.y} r="3" fill={isPassed ? '#D8472B' : '#14121F'} />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ScrollRouteRoad;
