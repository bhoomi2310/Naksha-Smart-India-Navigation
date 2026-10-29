import React, { useEffect, useRef, useState } from 'react';

/**
 * Renders a subtle scroll-driven dashed road SVG that spans the landing page BELOW the hero.
 * Does not cover any hero content or interactive text.
 * No pulsating / jumping balls.
 *
 * On prefers-reduced-motion: hidden entirely.
 */
export const ScrollRouteRoad: React.FC = () => {
  const roadPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Road starts strictly BELOW the hero section (~y=680) so hero text and auto image remain 100% clean.
  // The path weaves gracefully through page gutters behind sections.
  const desktopRoadD =
    'M 1080 680 C 1120 900, 920 1180, 640 1400 C 340 1620, 60 1880, 80 2180 C 100 2480, 360 2720, 620 2950 C 780 3080, 900 3160, 920 3200';
  const mobileRoadD =
    'M 360 580 C 380 800, 280 1100, 180 1400 C 80 1700, 40 2000, 60 2300 C 80 2600, 240 2850, 260 3100';

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
        viewBox={`0 0 ${vbW} 3200`}
        preserveAspectRatio="xMidYMin slice"
      >
        {/* Subtle road underlay ribbon */}
        <path
          d={roadD}
          fill="none"
          stroke="#E8DECD"
          strokeWidth={isMobile ? 8 : 12}
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Dashed guide lines */}
        <path
          d={roadD}
          fill="none"
          stroke="#14121F"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          opacity="0.15"
        />
        {/* Traveled vermilion path — grows quietly as user scrolls */}
        <path
          ref={roadPathRef}
          d={roadD}
          fill="none"
          stroke="#D8472B"
          strokeWidth={isMobile ? 2.5 : 3.5}
          strokeLinecap="round"
          strokeDasharray={pathLength ? `${pathLength} ${pathLength}` : undefined}
          strokeDashoffset={pathLength ? Math.max(0, pathLength - drawnLength) : undefined}
          opacity="0.75"
        />
      </svg>
    </div>
  );
};

export default ScrollRouteRoad;
