import React from "react";
import { BadgeCheck, BadgeX, Clock, Video, Calendar } from "lucide-react";

export default function RequestCard({
  request,
  onApprove,
  onDecline,
  loading,
}) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-sm p-5 border border-[#E2E8F0] flex flex-col sm:flex-row gap-5 items-center sm:items-start transition-all hover:shadow-md ${
        loading ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      {/* Profile Image */}
      <div className="relative shrink-0">
        <img
          src={request.avatar}
          alt={request.name}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      <div className="flex-1 w-full">
        {/* Top Info: Name, Role & Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-[#0F172A] text-lg leading-tight">
              {request.name}
            </h3>
            <p className="text-xs text-[#64748B] font-medium">{request.role}</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-3 py-1 rounded-lg">
            <Calendar className="w-3 h-3" /> {request.date}
          </div>
        </div>

        {/* Interview Details: Type and Time */}
        <div className="flex flex-wrap gap-4 mt-4 py-3 border-y border-gray-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                Type
              </p>
              <p className="text-sm font-bold text-gray-700">
                {request.interviewType}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                Schedule
              </p>
              <p className="text-sm font-bold text-gray-700">{request.time}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons & Status */}
        <div className="flex items-center justify-end gap-3 mt-4">
          {request.status === "pending" ? (
            <>
              <button
                onClick={onDecline}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 disabled:opacity-50"
              >
                <BadgeX className="w-4 h-4" /> Decline
              </button>
              <button
                onClick={onApprove}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-[#FACC15] text-black px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-yellow-100 hover:bg-[#EAB308] transition-all active:scale-95 disabled:opacity-50"
              >
                <BadgeCheck className="w-4 h-4" /> Approve
              </button>
            </>
          ) : (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${
                request.status === "approved"
                  ? "bg-green-50 text-green-600 border border-green-100"
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}
            >
              {request.status === "approved" ? (
                <>
                  <BadgeCheck className="w-4 h-4" /> Approved
                </>
              ) : (
                <>
                  <BadgeX className="w-4 h-4" /> Declined
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
