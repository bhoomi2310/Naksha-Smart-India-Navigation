import React from 'react';

interface ScrollProgressBarProps {
  progress: number;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-orange-600 via-amber-400 to-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
