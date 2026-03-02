import React from "react";
import { Calendar, Clock, Check, X } from "lucide-react";

const RequestCard = ({ request, onAccept, onDecline }) => {
  const {
    candidateName = "Guest User",
    role = "Software Engineer",
    date = "2024-05-20",
    time = "10:30 AM",
    image = "https://via.placeholder.com/150",
  } = request || {};

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <img
            src={image}
            alt={candidateName}
            className="w-12 h-12 rounded-full object-cover border border-slate-200"
          />

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold text-slate-900 leading-tight">
              {candidateName}
            </h3>
            <p className="text-[13px] text-slate-500 mt-0.5">{role}</p>

            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-[13px] text-slate-600">
                <Calendar size={16} className="text-indigo-500" />
                <span>{date}</span>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-slate-600">
                <Clock size={16} className="text-indigo-500" />
                <span>{time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="flex-1 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium
                       inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Check size={18} />
            Accept
          </button>

          <button
            type="button"
            onClick={onDecline}
            className="flex-1 h-10 rounded-xl bg-white text-slate-700 text-sm font-medium
                       border border-slate-200 hover:bg-slate-50
                       inline-flex items-center justify-center gap-2 transition-colors"
          >
            <X size={18} />
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
