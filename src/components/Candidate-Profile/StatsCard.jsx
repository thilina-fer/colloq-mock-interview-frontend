import React from "react";

const StatsCard = ({ icon, value, label }) => (
  <div className="bg-white p-5 rounded-2xl shadow border border-[#E2E8F0] flex items-center gap-4 hover:shadow-lg transition">
    <div className="p-3 bg-[#F8FAFC] rounded-xl">{icon}</div>
    <div>
      <div className="text-2xl font-bold text-[#0F172A]">{value}</div>
      <div className="text-sm text-[#64748B] font-medium">{label}</div>
    </div>
  </div>
);

export default StatsCard;
