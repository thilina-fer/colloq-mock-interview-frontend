import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import AdminStats from "./AdminStats";

const QUICK_NAV = [
  {
    key: "interviewers",
    label: "Interviewers",
    description: "Review and manage interviewer applications",
    icon: Briefcase,
  },
  {
    key: "candidates",
    label: "Candidates",
    description: "View candidate progress and session scores",
    icon: Users,
  },
  {
    key: "payments",
    label: "Payments",
    description: "Track transactions and platform revenue",
    icon: CreditCard,
  },
];

export default function DashboardHome({ onNav, pendingCount }) {
  return (
    <div className="space-y-8">
      {/* Stats row */}
      <AdminStats />

      {/* Quick nav */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_NAV.map((item) => {
            const Icon = item.icon;
            const hasBadge = item.key === "interviewers" && pendingCount > 0;

            return (
              <button
                key={item.key}
                onClick={() => onNav(item.key)}
                className="group bg-white border border-gray-200 rounded-2xl p-5 text-left flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-900 transition-colors duration-200">
                  <Icon
                    size={18}
                    className="text-gray-600 group-hover:text-white transition-colors duration-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.label}
                    </p>
                    {hasBadge && (
                      <span className="text-[10px] font-semibold bg-amber-500 text-white rounded-full px-1.5 py-0.5 leading-none">
                        {pendingCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <ChevronRight
                  size={15}
                  className="text-gray-300 shrink-0 group-hover:text-gray-600 transition-colors mt-0.5"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">
          Platform Overview
        </h2>
        <p className="text-xs text-gray-400 mb-5">At a glance — March 2026</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Pending Reviews",
              value: pendingCount,
              accent: "text-amber-600",
            },
            { label: "Active Sessions", value: "23", accent: "text-gray-900" },
            { label: "Avg. Score", value: "72%", accent: "text-gray-900" },
            { label: "Success Rate", value: "88%", accent: "text-emerald-600" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <p className={`text-2xl font-bold ${m.accent}`}>{m.value}</p>
              <p className="text-xs text-gray-400">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
