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
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-[#FFFDF9] hover:bg-[#D8472B] text-[#14121F] hover:text-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] transition-all duration-200 active:translate-y-0.5 active:shadow-[1px_1px_0_#14121F] ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default ScrollToTop;
