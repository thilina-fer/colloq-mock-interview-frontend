import React from "react";
import { Clock, CheckCircle, DollarSign } from "lucide-react";

const stats = [
  {
    label: "Pending Requests",
    value: 4,
    icon: <Clock className="w-5 h-5 text-[#FACC15]" />,
    color: "bg-[#FEF9C3]",
  },
  {
    label: "Approved Sessions",
    value: 12,
    icon: <CheckCircle className="w-5 h-5 text-[#22C55E]" />,
    color: "bg-[#DCFCE7]",
  },
  {
    label: "Total Earnings",
    value: "₹ 18,500",
    icon: <DollarSign className="w-5 h-5 text-[#0EA5E9]" />,
    color: "bg-[#E0F2FE]",
  },
];

export default function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 bg-white rounded-2xl shadow p-5 border border-[#E2E8F0] hover:shadow-lg transition"
        >
          <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
          <div>
            <div className="text-2xl font-bold text-[#0F172A]">
              {stat.value}
            </div>
            <div className="text-sm text-[#64748B] font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
