import React from "react";
import { Users, Briefcase, CalendarCheck, IndianRupee } from "lucide-react";
import { STATS } from "./data";

const ICON_COMPONENTS = {
  Users,
  Briefcase,
  CalendarCheck,
  IndianRupee,
};

export default function AdminStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat) => {
        const Icon = ICON_COMPONENTS[stat.icon] ?? Users;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
              <Icon size={18} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                {stat.label}
              </p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-900 leading-none">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 leading-none mb-0.5">
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
