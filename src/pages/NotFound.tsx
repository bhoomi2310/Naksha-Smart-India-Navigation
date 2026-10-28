import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import NakshaLogo from "@/components/NakshaLogo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route accessed:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F6EFE3] text-[#14121F] p-4 paper-grain select-none">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[5px_5px_0_#14121F] text-center space-y-6">
        
        {/* Brand Header */}
        <div className="flex justify-center">
          <NakshaLogo size="lg" />
        </div>

        {/* Jaali divider */}
        <div className="jaali-border-divider opacity-60" aria-hidden="true" />

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-md bg-[#FDF0ED] border-[1.2px] border-[#D8472B] text-xs font-bold text-[#D8472B] shadow-[2px_2px_0_#14121F]">
            Route Not Found · 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#14121F] font-display pt-2">
            Wrong Turn Taken
          </h1>
          <p className="text-xs sm:text-sm text-[#524C61] leading-relaxed">
            The page or navigation corridor you requested does not exist or has moved. Let us get you back on track.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="ink-btn-primary w-full sm:w-auto text-xs px-6 py-2.5 rounded-lg flex items-center justify-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="ink-btn-secondary w-full sm:w-auto text-xs px-6 py-2.5 rounded-lg flex items-center justify-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D8472B]" />
              Open Live Map
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
