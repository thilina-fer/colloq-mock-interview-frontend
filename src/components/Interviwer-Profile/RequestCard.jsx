import React from "react";
import {
  Calendar,
  Clock,
  MessageSquare,
  CheckCircle,
  XCircle,
} from "lucide-react";

const RequestCard = () => {
  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex">
        {/* Accent Bar */}
        <div className="w-1.5 bg-amber-400" />

        <div className="w-full p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                alt="Sarah Williams"
                className="h-12 w-12 rounded-xl object-cover ring-1 ring-slate-200"
              />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-sm sm:text-base font-semibold text-slate-800">
                    Sarah Williams
                  </h2>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    Pending
                  </span>
                </div>
                <p className="text-xs text-slate-500">Product Manager</p>

                {/* Chips */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                    <Calendar size={13} />
                    Feb 8, 2026
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                    <Clock size={13} />
                    2:00 PM - 3:00 PM
                  </span>

                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                    1 Session
                  </span>

                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">
                    Product Strategy
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-start">
              <span className="text-lg font-bold text-slate-900">$150</span>
              <span className="text-[11px] text-slate-400 sm:mt-1">
                Total fee
              </span>
            </div>
          </div>

          {/* Message Bubble */}
          <div className="mt-4 flex gap-2">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">
              <MessageSquare size={16} className="text-slate-500" />
            </div>

            <div className="relative w-full rounded-2xl border border-slate-100 bg-slate-50 p-3">
              {/* little tail */}
              <div className="absolute left-[-6px] top-4 h-3 w-3 rotate-45 border-l border-b border-slate-100 bg-slate-50" />
              <p className="text-sm text-slate-600 leading-relaxed">
                Hi Alex! I'm very interested in learning about your approach to
                product roadmapping. Looking forward to our discussion!
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              <XCircle size={16} className="text-red-500" />
              Decline
            </button>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a669] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#008f5a] sm:w-auto"
            >
              <CheckCircle size={16} />
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
  