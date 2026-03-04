import React from "react";
import { Building2, CalendarDays, ArrowRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

function Initials({ name, color }) {
  const parts = name.trim().split(" ");
  const letters =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2);
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
      style={{ backgroundColor: color || "#6B7280" }}
    >
      {letters.toUpperCase()}
    </div>
  );
}

export default function InterviewerCard({ interviewer, onViewProfile }) {
  const {
    name,
    role,
    company,
    experience,
    skills,
    status,
    joinedAt,
    avatarColor,
  } = interviewer;

  const visibleSkills = skills.slice(0, 2);
  const remaining = skills.length - 2;

  const formattedDate = new Date(joinedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Initials name={name} color={avatarColor} />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{role}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Company + experience */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Building2 size={12} className="text-gray-400 shrink-0" />
          <span className="truncate">{company}</span>
          <span className="text-gray-300">·</span>
          <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0">
            {experience}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <CalendarDays size={12} className="shrink-0" />
          <span>Joined {formattedDate}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {visibleSkills.map((skill) => (
          <span
            key={skill}
            className="text-[10px] font-medium bg-gray-100 text-gray-600 rounded-lg px-2 py-0.5"
          >
            {skill}
          </span>
        ))}
        {remaining > 0 && (
          <span className="text-[10px] font-medium bg-gray-100 text-gray-500 rounded-lg px-2 py-0.5">
            +{remaining} more
          </span>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={() => onViewProfile(interviewer)}
        className="mt-auto w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-900 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-150"
      >
        View Full Profile
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
