import React, { useEffect, useRef, useState } from 'react';
import AutoRickshawSprite from './AutoRickshawSprite';

/**
 * Renders a scroll-driven dashed road SVG with the traveling Auto-Rickshaw sprite.
 *
 * Pattern:
 * - Hugs the outer website edges in a clean zig-zag pattern:
 *   Right edge -> Diagonal cross to Left edge -> Left edge -> Diagonal cross to Right edge -> Right edge -> Diagonal cross to Left edge -> exits beneath baseline.
 * - Always sits beneath cards and text (z-0, pointer-events-none).
 * - No endpoint dots or pin circles.
 * - Auto-rickshaw banks/rotates along the zig-zag curves and disappears before reaching the bottom footer.
 * - On prefers-reduced-motion: hidden entirely.
 */
export const ScrollRouteRoad: React.FC = () => {
  const roadPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spritePos, setSpritePos] = useState<{ x: number; y: number; angle: number }>({
    x: 1140,
    y: 700,
    angle: 90,
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

      // Tangent angle and coordinates for auto-rickshaw sprite
      const pt = path.getPointAtLength(currentDist);
      const delta = 4;
      const p1 = path.getPointAtLength(Math.max(0, currentDist - delta));
      const p2 = path.getPointAtLength(Math.min(totalLen, currentDist + delta));
      const angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

      setSpritePos({ x: pt.x, y: pt.y, angle: angleDeg });

      // Auto is visible while traveling along the route, smoothly disappears before the footer
      const visible = progress > 0.015 && progress < 0.88;
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

  // Desktop Zig-Zag Path (viewBox 0 0 1200 3600):
  // 1. Starts below hero on Right edge (x: 1140, y: 700)
  // 2. Runs down Right edge
  // 3. Diagonal zig-zag cross to Left edge (x: 60, y: 1450)
  // 4. Runs down Left edge
  // 5. Diagonal zig-zag cross to Right edge (x: 1140, y: 2250)
  // 6. Runs down Right edge
  // 7. Diagonal zig-zag cross to Left edge (x: 60, y: 3050)
  // 8. Runs down Left edge beneath baseline (y: 3600)
  const desktopRoadD =
    'M 1140 700 L 1140 1020 C 1140 1240, 60 1220, 60 1460 L 60 1850 C 60 2060, 1140 2040, 1140 2260 L 1140 2650 C 1140 2860, 60 2840, 60 3060 L 60 3600';

  // Mobile Zig-Zag Path (viewBox 0 0 400 3600):
  // Alternates between right edge (x: 375) and left edge (x: 25)
  const mobileRoadD =
    'M 375 600 L 375 880 C 375 1080, 25 1060, 25 1280 L 25 1680 C 25 1880, 375 1860, 375 2080 L 375 2480 C 375 2680, 25 2660, 25 2880 L 25 3600';

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
        viewBox={`0 0 ${vbW} 3600`}
        preserveAspectRatio="xMidYMin slice"
      >
        {/* Subtle road underlay ribbon */}
        <path
          d={roadD}
          fill="none"
          stroke="#E8DECD"
          strokeWidth={isMobile ? 8 : 12}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.38"
        />

        {/* Dashed outer guide line */}
        <path
          d={roadD}
          fill="none"
          stroke="#14121F"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.14"
        />

        {/* Traveled vermilion path — dynamically draws as user scrolls */}
        <path
          ref={roadPathRef}
          d={roadD}
          fill="none"
          stroke="#D8472B"
          strokeWidth={isMobile ? 2.5 : 3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength ? `${pathLength} ${pathLength}` : undefined}
          strokeDashoffset={pathLength ? Math.max(0, pathLength - drawnLength) : undefined}
          opacity="0.75"
        />

        {/* 
          Auto-Rickshaw sprite traveling along the zig-zag path:
          - Follows the curve tangent angle continuously.
          - Smoothly disappears as it approaches the end of the content.
        */}
        <g
          transform={`translate(${spritePos.x}, ${spritePos.y}) rotate(${spritePos.angle})`}
          style={{
            opacity: isAutoVisible ? 1 : 0,
            transition: 'opacity 0.25s ease-out',
          }}
          className="transition-transform duration-75 ease-out"
        >
          {/* Centering offset so pivot point is centered on auto body */}
          <g transform="translate(-24, -17)">
            <AutoRickshawSprite size={48} isMoving={true} />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ScrollRouteRoad;
