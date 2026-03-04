import React from "react";
import { CANDIDATES } from "./data";
import StatusBadge from "./StatusBadge";

function ScoreBar({ score }) {
  const color =
    score >= 80
      ? "text-emerald-600"
      : score >= 60
        ? "text-amber-600"
        : "text-red-500";

  return (
    <div className="flex items-center gap-2.5 min-w-[120px]">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-700 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-semibold tabular-nums ${color}`}>
        {score}%
      </span>
    </div>
  );
}

export default function CandidatesTable() {
  return (
    <section>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              All Candidates
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {CANDIDATES.length} registered
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {[
                  "Candidate",
                  "Sessions",
                  "Score",
                  "Target Role",
                  "Status",
                  "Joined",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-5 py-3 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CANDIDATES.map((c, idx) => {
                const formattedDate = new Date(c.joinedAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                );
                return (
                  <tr
                    key={c.id}
                    className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${
                      idx === CANDIDATES.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    {/* Candidate */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                          {c.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {c.name}
                          </p>
                          <p className="text-[10px] text-gray-400 truncate">
                            {c.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Sessions */}
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-medium text-gray-700">
                        {c.sessions}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="px-5 py-3.5">
                      <ScoreBar score={c.score} />
                    </td>

                    {/* Target */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-medium bg-gray-100 text-gray-600 rounded-lg px-2.5 py-1 whitespace-nowrap">
                        {c.target}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <StatusBadge status={c.status} />
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formattedDate}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
