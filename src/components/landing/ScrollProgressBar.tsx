import React from 'react';

interface ScrollProgressBarProps {
  progress: number;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#E6DCCB]/40 z-[100] pointer-events-none">
      <div
        className="h-full bg-[#D8472B] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
