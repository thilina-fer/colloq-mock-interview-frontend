import React, { useState } from "react";
import { User, Users, ChevronDown, Loader } from "lucide-react";

const topics = ["System Design", "DSA", "React", "Node.js", "Behavioral"];
const durations = [30, 45, 60];
const difficulties = ["Easy", "Medium", "Hard"];

export default function JoinAsCandidateCard() {
  const [mode, setMode] = useState("interviewer");
  const [topic, setTopic] = useState(topics[0]);
  const [duration, setDuration] = useState(durations[0]);
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const [matching, setMatching] = useState(false);
  const [matched, setMatched] = useState(false);

  const handleFind = () => {
    setMatching(true);
    setMatched(false);
    setTimeout(() => {
      setMatching(false);
      setMatched(true);
    }, 1800);
  };

  const handleReset = () => {
    setMatching(false);
    setMatched(false);
  };

  return (
    <section className="bg-white rounded-2xl shadow p-6 border border-[#E2E8F0] flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="font-semibold text-lg text-[#0F172A] flex-1">
          Practice Mode
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition ${mode === "interviewer" ? "bg-[#FACC15] text-[#0F172A]" : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"}`}
            onClick={() => setMode("interviewer")}
          >
            <User className="w-4 h-4" /> Interviewer
          </button>
          <button
            className={`flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition ${mode === "candidate" ? "bg-[#FACC15] text-[#0F172A]" : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"}`}
            onClick={() => setMode("candidate")}
          >
            <Users className="w-4 h-4" /> Candidate
          </button>
        </div>
      </div>
      {mode === "candidate" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-xs text-[#64748B] font-medium">
                Topic
              </label>
              <select
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 mt-1"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-[#64748B] font-medium">
                Duration
              </label>
              <select
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 mt-1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                {durations.map((d) => (
                  <option key={d} value={d}>
                    {d} min
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-[#64748B] font-medium">
                Difficulty
              </label>
              <select
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 mt-1"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            {!matching && !matched && (
              <button
                onClick={handleFind}
                className="flex-1 bg-[#FACC15] text-[#0F172A] font-semibold px-4 py-2 rounded-xl shadow hover:scale-105 transition"
              >
                Find a Mock Interview
              </button>
            )}
            {matching && (
              <button
                disabled
                className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] font-semibold px-4 py-2 rounded-xl shadow flex items-center justify-center gap-2"
              >
                <span className="w-4 h-4 border-2 border-[#FACC15] border-t-[#E2E8F0] rounded-full animate-spin inline-block" />
                Searching for a match...
              </button>
            )}
            {matched && (
              <>
                <button className="flex-1 bg-[#22C55E] text-white font-semibold px-4 py-2 rounded-xl shadow hover:scale-105 transition">
                  Join Now
                </button>
                <button
                  className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] font-semibold px-4 py-2 rounded-xl shadow hover:scale-105 transition"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {mode === "interviewer" && (
        <div className="text-[#64748B] text-sm mt-2">
          Switch to Candidate Mode to practice as a candidate and get matched
          for a mock interview.
        </div>
      )}
    </section>
  );
}
