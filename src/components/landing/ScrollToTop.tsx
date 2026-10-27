import React from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  scrollY: number;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ scrollY }) => {
  const visible = scrollY > 400;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-zinc-900/80 hover:bg-orange-600 text-zinc-300 hover:text-white border border-zinc-800 hover:border-orange-500/50 backdrop-blur-xl shadow-2xl transition-all duration-300 transform active:scale-90 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default ScrollToTop;
