// src/components/Booking/InterviewerCard.jsx
import React from "react";
import { Star, CheckCircle2, ChevronRight } from "lucide-react";

export default function InterviewerCard({ person, onBook }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-[2.25rem] p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col">
      <div className="flex items-start gap-4 mb-5">
        <div className="relative shrink-0">
          <img
            src={person.image}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
            alt={person.name}
            loading="lazy"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-sm" />
        </div>

        <div className="min-w-0">
          <h4 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#E8960A] transition-colors truncate">
            {person.name}
          </h4>
          <p className="text-gray-500 text-[11px] sm:text-xs font-medium uppercase tracking-tighter">
            {person.role} • {person.company}
          </p>

          <div className="flex items-center gap-1 mt-2 bg-gray-50 w-fit px-2 py-1 rounded-lg border border-gray-100">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-gray-700">
              {person.rating}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              ({person.reviews})
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
        "{person.description}"
      </p>

      <div className="flex flex-wrap gap-2 mb-auto">
        {person.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="text-gray-400 font-bold uppercase tracking-tighter">
            Exp
          </span>
          <span className="font-bold text-gray-700">{person.experience}</span>
        </div>
        <div className="flex flex-col gap-0.5 items-end">
          <span className="text-gray-400 font-bold uppercase tracking-tighter">
            Status
          </span>
          <span className="font-bold text-green-600 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> {person.available}
          </span>
        </div>
      </div>

      <button
        onClick={() => onBook?.(person)}
        className="w-full mt-6 bg-gray-900 text-white hover:bg-[#FFD000] hover:text-black py-3.5 sm:py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95 shadow-lg shadow-gray-200"
      >
        Book Session{" "}
        <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
