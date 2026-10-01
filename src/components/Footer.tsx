import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <span className="text-orange-500 font-black">नक्शा</span> Naksha
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">Built for India</p>
        </div>
        <div className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Naksha. Built for India.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
