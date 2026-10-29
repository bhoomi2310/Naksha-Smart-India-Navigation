import React from 'react';
import { Link } from 'react-router-dom';
import NakshaLogo from '@/components/NakshaLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FAF5EC] border-t-[1.5px] border-[#14121F] text-[#14121F] mt-auto overflow-hidden">

      {/* Rangoli / Jaali divider on top of footer */}
      <div className="jaali-border-divider opacity-70" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="inline-block" aria-label="Naksha Home">
              <NakshaLogo size="md" />
            </Link>
            <p className="text-xs sm:text-sm text-[#524C61] max-w-sm leading-relaxed">
              India-first navigation engine comparing real-time elevated flyovers, streetlighting coverage, safe night corridors, and multi-modal transit fares.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#14121F]">
              Explore
            </div>
            <ul className="space-y-2 text-xs text-[#524C61]">
              <li>
                <Link to="/dashboard" className="hover:text-[#D8472B] transition-colors">
                  Live Navigation
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#D8472B] transition-colors">
                  Saved Trips
                </Link>
              </li>
            </ul>
          </div>

          {/* Map Attribution & Legal */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#14121F]">
              Data Attribution
            </div>
            <p className="text-xs text-[#524C61] leading-relaxed">
              Map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline hover:text-[#D8472B]">OpenStreetMap</a> contributors. Routing powered by <a href="http://project-osrm.org/" target="_blank" rel="noreferrer" className="underline hover:text-[#D8472B]">OSRM</a> and local crowdsourced road telemetry.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t-[1.5px] border-[#14121F]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#524C61]">
          <div>
            &copy; {new Date().getFullYear()} Naksha. Built for India.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/settings" className="hover:text-[#D8472B] transition-colors">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
