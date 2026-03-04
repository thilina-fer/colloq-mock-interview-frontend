import React, { useState } from "react";
import { Search, UserX } from "lucide-react";
import InterviewerCard from "./InterviewerCard";
import InterviewerProfileModal from "./InterviewerProfileModal";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
];

export default function InterviewersSection({
  interviewers,
  onAccept,
  onReject,
}) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIv, setSelectedIv] = useState(null);

  const filtered = interviewers.filter((iv) => {
    const matchStatus = filterStatus === "all" || iv.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      iv.name.toLowerCase().includes(q) ||
      iv.role.toLowerCase().includes(q) ||
      iv.company.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  // Keep modal in sync with live interviewer state
  const liveSelected = selectedIv
    ? (interviewers.find((iv) => iv.id === selectedIv.id) ?? null)
    : null;

  return (
    <section>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search interviewers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterStatus(f.key)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-xl border transition-all duration-150 ${
                filterStatus === f.key
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-gray-400 mb-4">
        Showing {filtered.length} interviewer{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
            <UserX size={22} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-600">
            No interviewers found
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((iv) => (
            <InterviewerCard
              key={iv.id}
              interviewer={iv}
              onViewProfile={setSelectedIv}
            />
          ))}
        </div>
      )}

      {/* Profile Modal */}
      {liveSelected && (
        <InterviewerProfileModal
          interviewer={liveSelected}
          onClose={() => setSelectedIv(null)}
          onAccept={onAccept}
          onReject={onReject}
        />
      )}
    </section>
  );
}
