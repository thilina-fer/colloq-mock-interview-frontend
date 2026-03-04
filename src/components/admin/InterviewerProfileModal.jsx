import React, { useEffect, useCallback } from "react";
import {
  X,
  Mail,
  Phone,
  Linkedin,
  GraduationCap,
  Briefcase,
  CalendarDays,
  Star,
} from "lucide-react";
import StatusBadge from "./StatusBadge";

function Initials({ name, color }) {
  const parts = name.trim().split(" ");
  const letters =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2);
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0"
      style={{ backgroundColor: color || "#6B7280" }}
    >
      {letters.toUpperCase()}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
          {label}
        </p>
        <p
          className={`text-sm text-gray-900 font-medium break-all ${mono ? "font-mono" : ""}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function InterviewerProfileModal({
  interviewer,
  onClose,
  onAccept,
  onReject,
}) {
  // Escape key + body scroll lock
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!interviewer) return null;

  const {
    name,
    role,
    company,
    experience,
    skills,
    status,
    email,
    phone,
    linkedin,
    education,
    joinedAt,
    expertise,
    bio,
    avatarColor,
    sessionsCompleted,
    rating,
  } = interviewer;

  const formattedDate = new Date(joinedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const isPending = status === "pending";
  const isAccepted = status === "accepted";
  const isRejected = status === "rejected";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0,0,0,0.35)",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <Initials name={name} color={avatarColor} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-gray-900">{name}</h2>
                <StatusBadge status={status} />
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{role}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {company} · {experience}
              </p>
              {sessionsCompleted > 0 && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-600 font-medium">
                    {rating} · {sessionsCompleted} sessions
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={15} className="text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Bio */}
          {bio && (
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                About
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
            </div>
          )}

          {/* Contact info */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Contact
            </p>
            <div className="space-y-3">
              <InfoRow icon={Mail} label="Email" value={email} />
              <InfoRow icon={Phone} label="Phone" value={phone} />
              <InfoRow icon={Linkedin} label="LinkedIn" value={linkedin} />
            </div>
          </div>

          {/* Background */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Background
            </p>
            <div className="space-y-3">
              <InfoRow
                icon={GraduationCap}
                label="Education"
                value={education}
              />
              <InfoRow icon={Briefcase} label="Experience" value={experience} />
              <InfoRow
                icon={CalendarDays}
                label="Joined"
                value={formattedDate}
              />
            </div>
          </div>

          {/* Expertise */}
          {expertise?.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Expertise
              </p>
              <div className="flex flex-wrap gap-1.5">
                {expertise.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-gray-100 text-gray-700 rounded-lg px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium bg-gray-100 text-gray-700 rounded-lg px-2.5 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-3 p-6 border-t border-gray-100">
          {/* Reject */}
          <button
            onClick={() => !isRejected && onReject(interviewer.id)}
            disabled={isRejected}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 ${
              isRejected
                ? "bg-red-50 text-red-500 border-red-200 cursor-not-allowed"
                : "bg-white text-red-600 border-red-300 hover:bg-red-50"
            }`}
          >
            {isRejected ? "Rejected" : "Reject"}
          </button>

          {/* Accept */}
          <button
            onClick={() => !isAccepted && onAccept(interviewer.id)}
            disabled={isAccepted}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
              isAccepted
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {isAccepted ? "Accepted ✓" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
