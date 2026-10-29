import React, { useEffect, useRef, useState } from 'react';
import AutoRickshawSprite from './AutoRickshawSprite';

/**
 * Renders a scroll-driven dashed road SVG with the traveling Auto-Rickshaw sprite.
 *
 * Rules:
 * - Starts below the hero section.
 * - Runs in the outer margins/gutters away from text.
 * - Always sits beneath text and cards (z-0, pointer-events-none).
 * - No waypoint circles or end-point dots visible.
 * - Extends down beneath the bottom baseline.
 * - When the end is reached (progress >= 0.85), the auto smoothly disappears.
 * - On prefers-reduced-motion: hidden entirely.
 */
export const ScrollRouteRoad: React.FC = () => {
  const roadPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spritePos, setSpritePos] = useState<{ x: number; y: number; angle: number }>({
    x: 1120,
    y: 720,
    angle: 0,
  });
  const [isAutoVisible, setIsAutoVisible] = useState(false);
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

      const path = roadPathRef.current;
      const totalLen = path.getTotalLength();
      const currentDist = progress * totalLen;
      setDrawnLength(currentDist);

      // Tangent & position for auto sprite
      const pt = path.getPointAtLength(currentDist);
      const delta = 4;
      const p1 = path.getPointAtLength(Math.max(0, currentDist - delta));
      const p2 = path.getPointAtLength(Math.min(totalLen, currentDist + delta));
      const angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

      setSpritePos({ x: pt.x, y: pt.y, angle: angleDeg });

      // Auto disappears once approaching the end (before footer), and hidden at absolute top
      const visible = progress > 0.02 && progress < 0.86;
      setIsAutoVisible(visible);

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

  // Path starts below the hero (~y=720) in the right gutter,
  // hugs outer margins away from text, and exits beneath the baseline (~y=3450).
  const desktopRoadD =
    'M 1120 720 C 1150 950, 1100 1250, 1050 1450 C 950 1700, 280 1740, 75 1950 C 50 2150, 60 2500, 70 2800 C 80 3050, 95 3280, 110 3450';

  // Mobile path along the outer side margins, exiting beneath baseline
  const mobileRoadD =
    'M 370 600 C 385 850, 360 1150, 345 1400 C 320 1650, 60 1750, 30 1950 C 15 2200, 20 2550, 25 2850 C 30 3100, 35 3300, 40 3450';

  const roadD = isMobile ? mobileRoadD : desktopRoadD;
  const vbW = isMobile ? 400 : 1200;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={`0 0 ${vbW} 3450`}
        preserveAspectRatio="xMidYMin slice"
      >
        {/* Subtle road underlay ribbon */}
        <path
          d={roadD}
          fill="none"
          stroke="#E8DECD"
          strokeWidth={isMobile ? 8 : 12}
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Dashed guide lines */}
        <path
          d={roadD}
          fill="none"
          stroke="#14121F"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          opacity="0.12"
        />

        {/* Traveled vermilion path — draws as user scrolls */}
        <path
          ref={roadPathRef}
          d={roadD}
          fill="none"
          stroke="#D8472B"
          strokeWidth={isMobile ? 2.5 : 3.5}
          strokeLinecap="round"
          strokeDasharray={pathLength ? `${pathLength} ${pathLength}` : undefined}
          strokeDashoffset={pathLength ? Math.max(0, pathLength - drawnLength) : undefined}
          opacity="0.7"
        />

        {/* 
          Auto-Rickshaw sprite traveling along the path:
          - Rotates along the tangent curve.
          - Disappears when the end is reached (progress >= 0.86).
          - Sits beneath cards and text.
        */}
        <g
          transform={`translate(${spritePos.x}, ${spritePos.y}) rotate(${spritePos.angle})`}
          style={{
            opacity: isAutoVisible ? 1 : 0,
            transition: 'opacity 0.25s ease-out',
          }}
          className="transition-transform duration-75 ease-out"
        >
          {/* Centering offset */}
          <g transform="translate(-24, -17)">
            <AutoRickshawSprite size={48} isMoving={true} />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ScrollRouteRoad;
