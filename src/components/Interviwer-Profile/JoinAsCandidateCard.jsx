import React, { useState } from "react";
import { User, Users, Calendar, ArrowRight } from "lucide-react";

export default function JoinAsCandidateCard() {
  const [mode, setMode] = useState("interviewer");

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 border border-[#E2E8F0] flex flex-col gap-4">
      {/* Header with Mode Toggles */}
      <div className="flex items-center gap-3 mb-2">
        <div className="font-semibold text-lg text-[#0F172A] flex-1">
          Practice Mode
        </div>
        <div className="flex items-center gap-2 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
          <button
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-sm transition-all ${
              mode === "interviewer"
                ? "bg-[#FACC15] text-[#0F172A] shadow-sm"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
            onClick={() => setMode("interviewer")}
          >
            <User className="w-4 h-4" /> Interviewer
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-sm transition-all ${
              mode === "candidate"
                ? "bg-[#FACC15] text-[#0F172A] shadow-sm"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
            onClick={() => setMode("candidate")}
          >
            <Users className="w-4 h-4" /> Candidate
          </button>
        </div>
      </div>

      {/* Conditional Content */}
      <div className="min-h-[120px] flex flex-col justify-center">
        {mode === "candidate" ? (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-start gap-3 bg-[#FEFCE8] p-4 rounded-xl border border-[#FEF08A]">
              <div className="bg-[#FACC15] p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-[#0F172A]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A] text-sm">
                  Improve your skills
                </h4>
                <p className="text-xs text-[#71717A] mt-0.5 leading-relaxed">
                  Book a personalized mock interview session with industry
                  experts to get real-time feedback and sharpen your interview
                  performance.
                </p>
              </div>
            </div>

            <button
              className="w-full bg-[#0F172A] text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              onClick={() => console.log("Navigate to Booking Page")}
            >
              Book a mock interview session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="text-[#64748B] text-sm leading-relaxed p-4 bg-[#F8FAFC] rounded-xl border border-dashed border-[#E2E8F0]">
            You are currently in{" "}
            <span className="font-bold text-[#0F172A]">Interviewer Mode</span>.
            Switch to Candidate Mode if you want to practice as a candidate and
            schedule mock sessions.
          </div>
        )}
      </div>
    </section>
  );
}
