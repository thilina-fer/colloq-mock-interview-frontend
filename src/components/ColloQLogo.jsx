import React from "react";

const ColloQLogo = ({ size = "text-4xl", className = "" }) => {
  return (
    <div
      className={`flex items-center font-bold tracking-tight ${size} ${className}`}
    >
      {/* "Collo" part with Orange/Yellow Gradient */}
      <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
        Collo
      </span>

      {/* "Q" part with Icon integration */}
      <div className="relative flex items-center justify-center ml-1">
        {/* The Black 'Q' base */}
        <span className="text-black dark:text-gray-800">Q</span>

        {/* Minimalist Sound/Wave Icon inside or next to Q */}
        <div className="absolute -right-1 bottom-1 flex gap-[2px] items-end">
          <div className="w-[3px] h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-[3px] h-4 bg-orange-500 rounded-full animate-pulse delay-75"></div>
          <div className="w-[3px] h-3 bg-gray-600 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default ColloQLogo;
