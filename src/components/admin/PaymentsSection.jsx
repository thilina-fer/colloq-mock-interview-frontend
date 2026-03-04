import React, { useState } from "react";
import {
  Search,
  IndianRupee,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { PAYMENTS } from "../../data/data";
import StatusBadge from "./StatusBadge";

const totalRevenue = PAYMENTS.filter((p) => p.status === "completed").reduce(
  (acc, p) => acc + p.amount,
  0,
);
const completedCount = PAYMENTS.filter((p) => p.status === "completed").length;
const pendingCount = PAYMENTS.filter((p) => p.status === "pending").length;
const failedCount = PAYMENTS.filter((p) => p.status === "failed").length;

const SUMMARY = [
  {
    label: "Total Revenue",
    value: `₹${totalRevenue.toLocaleString("en-IN")}`,
    icon: IndianRupee,
    dark: true,
  },
  {
    label: "Completed",
    value: completedCount,
    icon: CheckCircle2,
    dark: false,
  },
  {
    label: "Pending",
    value: pendingCount,
    icon: Clock,
    dark: false,
  },
  {
    label: "Failed",
    value: failedCount,
    icon: XCircle,
    dark: false,
  },
];

export default function PaymentsSection() {
  const [search, setSearch] = useState("");

  const filtered = PAYMENTS.filter((p) => {
    const q = search.toLowerCase();
    return (
      !q ||
      p.candidate.toLowerCase().includes(q) ||
      p.interviewer.toLowerCase().includes(q) ||
      p.txnId.toLowerCase().includes(q)
    );
  });

  return (
    <section className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`rounded-2xl border p-5 flex flex-col gap-2 ${
                s.dark
                  ? "bg-gray-900 border-gray-800 text-white"
                  : "bg-white border-gray-200"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  s.dark ? "bg-white/10" : "bg-gray-100"
                }`}
              >
                <Icon
                  size={16}
                  className={s.dark ? "text-white" : "text-gray-600"}
                />
              </div>
              <div>
                <p
                  className={`text-[10px] font-medium ${s.dark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {s.label}
                </p>
                <p
                  className={`text-xl font-bold leading-none mt-0.5 ${s.dark ? "text-white" : "text-gray-900"}`}
                >
                  {s.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-900">
              Transactions
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {filtered.length} of {PAYMENTS.length}
            </p>
          </div>
          <div className="relative max-w-xs w-full sm:w-auto">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by name or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {[
                  "Txn ID",
                  "Candidate",
                  "Interviewer",
                  "Amount",
                  "Date",
                  "Status",
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
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-gray-400"
                  >
                    No transactions match your search
                  </td>
                </tr>
              ) : (
                filtered.map((p, idx) => {
                  const formattedDate = new Date(p.date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  );
                  return (
                    <tr
                      key={p.id}
                      className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${
                        idx === filtered.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      {/* Txn ID */}
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-[11px] bg-gray-100 text-gray-600 rounded-lg px-2 py-1 whitespace-nowrap">
                          {p.txnId}
                        </span>
                      </td>

                      {/* Candidate */}
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-gray-800 font-medium whitespace-nowrap">
                          {p.candidate}
                        </span>
                      </td>

                      {/* Interviewer */}
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          {p.interviewer}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                          ₹{p.amount.toLocaleString("en-IN")}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {formattedDate}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
