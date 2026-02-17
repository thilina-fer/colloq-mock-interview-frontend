import React, { useState } from "react";
import { User, Users, CalendarDays, ArrowRight } from "lucide-react";

export default function JoinAsCandidateCard() {
  const [mode, setMode] = useState("interviewer");

  return (
    <section className="bg-white rounded-[2rem] shadow-sm p-6 border border-[#E2E8F0] flex flex-col gap-4">
      {/* Toggle Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="font-bold text-lg text-[#0F172A] flex-1 tracking-tight">
          Platform Mode
        </div>
        <div className="flex items-center bg-[#F8FAFC] p-1 rounded-2xl border border-[#E2E8F0]">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              mode === "interviewer"
                ? "bg-white text-[#0F172A] shadow-sm"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
            onClick={() => setMode("interviewer")}
          >
            <User className="w-4 h-4" /> Expert
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
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
      {mode === "candidate" ? (
        <div className="bg-[#F8FAFC] rounded-[1.5rem] p-6 border border-dashed border-[#E2E8F0] flex flex-col items-center text-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-2xl text-yellow-600">
            <CalendarDays className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-[#0F172A] mb-1">
              Practice as a Candidate
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-[280px] mx-auto">
              Boost your confidence by booking a real-time mock interview with
              industry experts.
            </p>
          </div>

          <button className="w-full mt-2 bg-black text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group active:scale-95">
            Book a mock interview session
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
          <p className="text-[#64748B] text-sm leading-relaxed">
            You are currently in{" "}
            <span className="font-bold text-[#0F172A]">Expert Mode</span>. You
            will receive requests from candidates for mock interviews based on
            your expertise.
          </p>
        </div>
      )}
    </section>
  );
}
