import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import DashboardHome from "../components/admin/DashboardHome";
import InterviewersSection from "../components/admin/InterviewersSection";
import CandidatesTable from "../components/admin/CandidatesTable";
import PaymentsSection from "../components/admin/PaymentsSection";
import { INTERVIEWERS } from "../data/data";
import { CheckCircle2, XCircle } from "lucide-react";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  interviewers: "Interviewers",
  candidates: "Candidates",
  payments: "Payments",
};

function Toast({ toast }) {
  if (!toast) return null;
  const isSuccess = toast.type === "success";
  return (
    <div
      className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-medium animate-fade-in-up transition-all ${
        isSuccess
          ? "bg-white border-emerald-200 text-emerald-700"
          : "bg-white border-red-200 text-red-600"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
      ) : (
        <XCircle size={16} className="text-red-400 shrink-0" />
      )}
      {toast.message}
    </div>
  );
}

export default function Admin() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [interviewers, setInterviewers] = useState(INTERVIEWERS);
  const [toast, setToast] = useState(null);

  const pendingCount = interviewers.filter(
    (iv) => iv.status === "pending",
  ).length;

  const fireToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleAccept = (id) => {
    setInterviewers((prev) =>
      prev.map((iv) => (iv.id === id ? { ...iv, status: "accepted" } : iv)),
    );
    fireToast("Interviewer accepted successfully!", "success");
  };

  const handleReject = (id) => {
    setInterviewers((prev) =>
      prev.map((iv) => (iv.id === id ? { ...iv, status: "rejected" } : iv)),
    );
    fireToast("Interviewer rejected.", "error");
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {/* Sidebar */}
      <AdminSidebar
        activeNav={activeNav}
        onNav={setActiveNav}
        pendingCount={pendingCount}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="pl-10 lg:pl-0">
            <h1 className="text-base font-bold text-gray-900">
              {PAGE_TITLES[activeNav]}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            {pendingCount > 0 && (
              <button
                onClick={() => setActiveNav("interviewers")}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-xl px-3 py-1.5 hover:bg-amber-100 transition-colors"
              >
                <span className="w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {pendingCount}
                </span>
                Pending Reviews
              </button>
            )}
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeNav === "dashboard" && (
            <DashboardHome onNav={setActiveNav} pendingCount={pendingCount} />
          )}
          {activeNav === "interviewers" && (
            <InterviewersSection
              interviewers={interviewers}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          )}
          {activeNav === "candidates" && <CandidatesTable />}
          {activeNav === "payments" && <PaymentsSection />}
        </main>
      </div>

      {/* Toast */}
      <Toast toast={toast} />
    </div>
  );
}
