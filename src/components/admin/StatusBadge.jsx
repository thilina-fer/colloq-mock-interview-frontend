import React from "react";

const STATUS_STYLES = {
  // Interviewer statuses
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  rejected: "bg-red-50 text-red-600 border border-red-200",
  // Candidate statuses
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Inactive: "bg-gray-100 text-gray-500 border border-gray-200",
  // Payment statuses
  completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  failed: "bg-red-50 text-red-600 border border-red-200",
};

const STATUS_LABELS = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  Active: "Active",
  Inactive: "Inactive",
  completed: "Completed",
  failed: "Failed",
};

export default function StatusBadge({ status, className = "" }) {
  const styles =
    STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500 border border-gray-200";
  const label = STATUS_LABELS[status] ?? status;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles} ${className}`}
    >
      {label}
    </span>
  );
}
