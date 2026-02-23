// src/components/Booking/InterviewerGrid.jsx
import React from "react";
import { SearchX } from "lucide-react";
import InterviewerCard from "./InterviewerCard";

export default function InterviewerGrid({ items, onBook }) {
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
          Available Experts
          <span className="bg-yellow-100 text-[#E8960A] text-xs px-2 py-1 rounded-lg">
            {items.length} Found
          </span>
        </h2>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {items.map((person) => (
            <InterviewerCard key={person.id} person={person} onBook={onBook} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white border border-dashed border-gray-200 rounded-[2.5rem]">
          <SearchX className="h-12 w-12 text-gray-200 mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            No Experts Found
          </p>
          <p className="text-gray-400 text-sm mt-1 text-center px-4">
            Try changing your Level or Engineering Type filters.
          </p>
        </div>
      )}
    </section>
  );
}
