import React from "react";
import { Star, CheckCircle2, ChevronRight } from "lucide-react";

const InterviewerCard = ({ person, onBook }) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="flex items-start gap-3 mb-4">
        <div className="relative shrink-0">
          <img
            src={person.image}
            className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm transition-transform"
            alt={person.name}
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
        </div>
        <div>
          <h4 className="text-md font-bold text-gray-900 group-hover:text-[#E8960A] transition-colors">
            {person.name}
          </h4>
          <p className="text-gray-500 text-[10px] font-medium uppercase tracking-tight">
            {person.role} • {person.company}
          </p>
          <div className="flex items-center gap-1 mt-1 bg-gray-50 w-fit px-1.5 py-0.5 rounded-md border border-gray-100">
            <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-bold text-gray-700">
              {person.rating}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
        "{person.description}"
      </p>

      <div className="flex flex-wrap gap-1.5 mb-auto">
        {person.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-bold uppercase tracking-wider text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px]">
        <div className="flex flex-col">
          <span className="text-gray-400 font-bold uppercase tracking-tighter">
            Exp
          </span>
          <span className="font-bold text-gray-700">{person.experience}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-gray-400 font-bold uppercase tracking-tighter">
            Status
          </span>
          <span className="font-bold text-green-600 flex items-center gap-1">
            <CheckCircle2 className="h-2.5 w-2.5" /> {person.available}
          </span>
        </div>
      </div>

      <button
        onClick={() => onBook(person)}
        className="w-full mt-5 bg-gray-900 text-white hover:bg-[#FFD000] hover:text-black py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-sm"
      >
        Book Session <ChevronRight className="h-3 w-3 inline ml-1" />
      </button>
    </div>
  );
};

export default InterviewerCard;
