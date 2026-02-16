import React, { useState, useEffect } from "react";
import RequestCard from "./RequestCard";
import { Loader } from "lucide-react";

const dummyRequests = [
  {
    id: 1,
    name: "Amit Verma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Frontend Developer",
    date: "2026-02-15 10:00",
    tags: ["React", "UI"],
    message: "Looking for help with React interview prep.",
    price: 800,
    status: "pending",
  },
  {
    id: 2,
    name: "Sara Lee",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Backend Developer",
    date: "2026-02-16 14:30",
    tags: ["Node.js", "API"],
    message: "Need a mock interview for Node.js.",
    price: 1000,
    status: "pending",
  },
  {
    id: 3,
    name: "Rohit Singh",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    role: "Fullstack Engineer",
    date: "2026-02-17 09:00",
    tags: ["System Design"],
    message: "Practice system design interview.",
    price: 1200,
    status: "approved",
  },
  {
    id: 4,
    name: "Meera Patel",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    role: "SDE 1",
    date: "2026-02-18 11:00",
    tags: ["DSA"],
    message: "DSA round practice needed.",
    price: 700,
    status: "declined",
  },
];

export default function CandidateRequests({ setToast }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRequests(dummyRequests);
      setLoading(false);
    }, 1200);
  }, []);

  const handleApprove = (id) => {
    setActionLoading(id);
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)),
      );
      setActionLoading(null);
      setToast({ type: "success", message: "Request approved." });
    }, 900);
  };

  const handleDecline = (id) => {
    setActionLoading(id);
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "declined" } : r)),
      );
      setActionLoading(null);
      setToast({ type: "error", message: "Request declined." });
    }, 900);
  };

  return (
    <section>
      <div className="font-semibold text-lg text-[#0F172A] mb-2">
        Candidate Requests
      </div>
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-2xl shadow p-4 border border-[#E2E8F0] h-28"
            />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 border border-[#E2E8F0] text-center text-[#64748B]">
          No requests at the moment.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              loading={actionLoading === req.id}
              onApprove={() => handleApprove(req.id)}
              onDecline={() => handleDecline(req.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
