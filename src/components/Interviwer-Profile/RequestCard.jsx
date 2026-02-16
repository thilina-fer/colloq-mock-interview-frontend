import React from "react";
import { User, BadgeCheck, BadgeX, IndianRupee } from "lucide-react";

export default function RequestCard({
  request,
  onApprove,
  onDecline,
  loading,
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow p-4 border border-[#E2E8F0] flex flex-col sm:flex-row gap-4 items-center sm:items-start transition ${loading ? "opacity-60" : ""}`}
    >
      <img
        src={request.avatar}
        alt={request.name}
        className="w-14 h-14 rounded-full object-cover border-2 border-[#FACC15]"
      />
      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <div className="font-semibold text-[#0F172A] text-lg">
            {request.name}
          </div>
          <div className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded px-2 py-0.5 mt-1 sm:mt-0">
            {request.role}
          </div>
          <div className="text-xs text-[#64748B] ml-auto">{request.date}</div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {request.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#FEF9C3] text-[#FACC15] px-2 py-0.5 rounded-full text-xs font-medium border border-[#FACC15]/30"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-[#64748B] mt-2">{request.message}</div>
        <div className="flex items-center gap-2 mt-3">
          <span className="flex items-center gap-1 text-[#0F172A] font-bold text-lg">
            <IndianRupee className="w-4 h-4" /> {request.price}
          </span>
          {request.status === "pending" && (
            <>
              <button
                onClick={onApprove}
                disabled={loading}
                className="inline-flex items-center gap-1 bg-[#22C55E] text-white px-3 py-1 rounded-lg font-medium hover:scale-105 transition disabled:opacity-60"
              >
                <BadgeCheck className="w-4 h-4" /> Approve
              </button>
              <button
                onClick={onDecline}
                disabled={loading}
                className="inline-flex items-center gap-1 bg-[#F87171] text-white px-3 py-1 rounded-lg font-medium hover:scale-105 transition disabled:opacity-60"
              >
                <BadgeX className="w-4 h-4" /> Decline
              </button>
            </>
          )}
          {request.status === "approved" && (
            <span className="text-xs bg-[#DCFCE7] text-[#22C55E] px-2 py-0.5 rounded font-semibold ml-2">
              Approved
            </span>
          )}
          {request.status === "declined" && (
            <span className="text-xs bg-[#FEE2E2] text-[#F87171] px-2 py-0.5 rounded font-semibold ml-2">
              Declined
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
