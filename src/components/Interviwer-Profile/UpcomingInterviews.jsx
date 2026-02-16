import React, { useState, useEffect } from "react";
import { Video, Loader } from "lucide-react";

const dummyInterviews = [
  {
    id: 1,
    topic: "System Design",
    date: "2026-02-20 16:00",
    status: "Scheduled",
  },
  {
    id: 2,
    topic: "React & JS",
    date: "2026-02-22 11:30",
    status: "Scheduled",
  },
];

export default function UpcomingInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setInterviews(dummyInterviews);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <section>
      <div className="font-semibold text-lg text-[#0F172A] mb-2">
        Upcoming Interviews
      </div>
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-2xl shadow p-4 border border-[#E2E8F0] h-20"
            />
          ))}
        </div>
      ) : interviews.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 border border-[#E2E8F0] text-center text-[#64748B]">
          No upcoming interviews.
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((iv) => (
            <div
              key={iv.id}
              className="bg-white rounded-2xl shadow p-4 border border-[#E2E8F0] flex flex-col sm:flex-row items-center gap-4"
            >
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm bg-[#FEF9C3] text-[#FACC15] px-3 py-1 rounded-full font-medium border border-[#FACC15]/30">
                  {iv.topic}
                </span>
                <span className="text-xs text-[#64748B] ml-0 sm:ml-3">
                  {iv.date}
                </span>
                <span className="text-xs bg-[#DCFCE7] text-[#22C55E] px-2 py-0.5 rounded font-semibold ml-0 sm:ml-3">
                  {iv.status}
                </span>
              </div>
              <button className="flex items-center gap-1 bg-[#FACC15] text-[#0F172A] font-semibold px-4 py-2 rounded-xl shadow hover:scale-105 transition">
                <Video className="w-4 h-4" /> Join Call
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
