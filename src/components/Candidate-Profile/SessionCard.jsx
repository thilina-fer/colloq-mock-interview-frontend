import React from "react";
import { Calendar, Clock, Star, MessageSquare } from "lucide-react";

const SessionCard = ({ session, type }) => {
  const isUpcoming = type === "upcoming";

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-6">
      <div className="flex gap-4">
        <img
          src={session.img}
          alt={session.name}
          className="w-14 h-14 rounded-full object-cover grayscale"
        />
        <div>
          <h4 className="font-bold">{session.name}</h4>
          <p className="text-xs text-gray-500 mb-2">{session.role}</p>
          <div className="flex flex-wrap gap-3 text-[11px] text-gray-400 mb-3">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3 h-3" /> {session.date}
            </span>
            {isUpcoming && (
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3" /> {session.time}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-2 py-0.5">
            {session.category.toUpperCase()}
          </span>
          {!isUpcoming && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(session.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                />
              ))}
              <span className="text-xs font-bold ml-1">{session.rating}</span>
            </div>
          )}
        </div>
      </div>

      {isUpcoming ? (
        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-2 rounded-lg text-xs font-bold ${session.status === "Confirmed" ? "bg-yellow-50 text-yellow-600 border border-yellow-100" : "bg-gray-100 text-gray-500 border border-gray-200"}`}
          >
            {session.status}
          </span>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50">
            View Details
          </button>
        </div>
      ) : (
        <div className="flex-1 max-w-lg flex flex-col items-end">
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex gap-3 w-full mb-3">
            <MessageSquare className="w-4 h-4 text-gray-400 shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">
              {session.feedback}
            </p>
          </div>
          <button className="bg-black text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-gray-900 transition-colors">
            View Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionCard;
