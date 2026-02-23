// src/components/Booking/BookingFilters.jsx
import React from "react";
import { Filter, Briefcase } from "lucide-react";

export default function BookingFilters({
  levels,
  types,
  selectedLevel,
  setSelectedLevel,
  selectedType,
  setSelectedType,
}) {
  return (
    <div className="space-y-8 bg-white p-5 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
      {/* Level Selector */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4" /> Select Level
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 border ${
                selectedLevel === level
                  ? "bg-[#FFD000] text-black border-[#FFD000] shadow-md shadow-yellow-500/20"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      {/* Type Selector */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
          <Briefcase className="h-4 w-4" /> Engineering Type
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 border ${
                selectedType === type
                  ? "bg-[#FFD000] text-black border-[#FFD000] shadow-md shadow-yellow-500/20"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
