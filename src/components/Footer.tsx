import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/80 py-8 px-4 sm:px-6 lg:px-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="text-lg font-bold text-zinc-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <span className="text-orange-500 font-black">नक्शा</span> Naksha
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Built for India</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('replay-naksha-loader'))}
            className="text-zinc-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
          >
            Replay Loader Animation
          </button>
          <span>•</span>
          <span>© {new Date().getFullYear()} Naksha. Built for India.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
