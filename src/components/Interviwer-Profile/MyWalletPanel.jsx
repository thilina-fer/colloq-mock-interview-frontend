import React, { useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import Toast from "./Toast";
import {
  Wallet,
  Banknote,
  ArrowDown,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const dummyBanks = [
  { id: 1, name: "HDFC Bank" },
  { id: 2, name: "ICICI Bank" },
];

const dummyTransactions = [
  {
    id: 1,
    date: "2026-02-10",
    type: "Earning",
    sessionId: "S1234",
    status: "Paid",
    amount: 1200,
  },
  {
    id: 2,
    date: "2026-02-12",
    type: "Withdraw",
    sessionId: "-",
    status: "Pending",
    amount: 2000,
  },
  {
    id: 3,
    date: "2026-02-14",
    type: "Earning",
    sessionId: "S1235",
    status: "Paid",
    amount: 1500,
  },
];

function StatusChip({ status }) {
  const s = String(status || "").toLowerCase();
  if (s === "paid") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#22C55E]">
        <CheckCircle className="w-4 h-4" /> Paid
      </span>
    );
  }
  if (s === "failed") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEE2E2] text-[#EF4444]">
        <XCircle className="w-4 h-4" /> Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEF9C3] text-[#A16207]">
      <Clock className="w-4 h-4" /> Pending
    </span>
  );
}

export default function MyWalletPanel({ open, onClose }) {
  const [toast, setToast] = useState(null);

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);

  const [transactions, setTransactions] = useState(dummyTransactions);
  const [banks, setBanks] = useState(dummyBanks);

  // Withdraw form state
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawBank, setWithdrawBank] = useState(dummyBanks[0]?.id || "");
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  // Add bank form state
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [addBankLoading, setAddBankLoading] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // compute balances from transactions (demo)
  const { balance, pending, withdrawable } = useMemo(() => {
    const paidEarnings = transactions
      .filter((t) => t.type === "Earning" && t.status === "Paid")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const paidWithdraws = transactions
      .filter((t) => t.type === "Withdraw" && t.status === "Paid")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const pendingTotal = transactions
      .filter((t) => String(t.status).toLowerCase() === "pending")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const totalBalance = Math.max(0, paidEarnings - paidWithdraws);
    const canWithdraw = Math.max(0, totalBalance - pendingTotal);

    return {
      balance: totalBalance,
      pending: pendingTotal,
      withdrawable: canWithdraw,
    };
  }, [transactions]);

  const modalSize = "max-w-2xl sm:max-w-xl";

  const closeToast = () => setToast(null);

  const openWithdrawModal = () => {
    setWithdrawAmount("");
    setWithdrawBank(banks[0]?.id || "");
    setShowWithdraw(true);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();

    const amt = Number(withdrawAmount);
    if (!withdrawAmount || Number.isNaN(amt) || amt <= 0) {
      setToast({ type: "error", message: "Enter a valid amount" });
      return;
    }
    if (!withdrawBank) {
      setToast({ type: "error", message: "Select a bank account" });
      return;
    }
    if (amt > withdrawable) {
      setToast({
        type: "error",
        message: "Amount exceeds withdrawable balance",
      });
      return;
    }

    setWithdrawLoading(true);

    timerRef.current = setTimeout(() => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const date = `${yyyy}-${mm}-${dd}`;

      setTransactions((prev) => [
        {
          id: Date.now(),
          date,
          type: "Withdraw",
          sessionId: "-",
          status: "Paid",
          amount: amt,
        },
        ...prev,
      ]);

      setWithdrawLoading(false);
      setShowWithdraw(false);
      setToast({ type: "success", message: "Withdraw success (Demo)" });
    }, 900);
  };

  const handleAddBank = (e) => {
    e.preventDefault();

    if (!bankName.trim() || !holderName.trim() || !accountNumber.trim()) {
      setToast({ type: "error", message: "Fill all bank details" });
      return;
    }

    setAddBankLoading(true);

    timerRef.current = setTimeout(() => {
      const newBank = {
        id: Date.now(),
        name: bankName.trim(),
        holder: holderName.trim(),
        accountNumber: accountNumber.trim(),
      };

      setBanks((prev) => [newBank, ...prev]);
      setWithdrawBank(newBank.id);

      setBankName("");
      setHolderName("");
      setAccountNumber("");

      setAddBankLoading(false);
      setShowAddBank(false);
      setToast({ type: "success", message: "Bank added (Demo)" });
    }, 700);
  };

  return (
    <>
      {/* Main Wallet Modal */}
      <Modal
        open={open}
        onClose={onClose}
        title={
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-[#FACC15]" />
            <span>My Wallet</span>
          </div>
        }
        size={modalSize}
      >
        <div className="flex flex-col gap-2 border-b border-[#E2E8F0] pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="text-xs text-[#64748B]">Total Balance</div>
              <div className="text-2xl font-bold text-[#0F172A]">
                ₹ {balance}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-[#64748B]">Withdrawable</div>
              <div className="text-lg font-semibold text-[#0F172A]">
                ₹ {withdrawable}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-[#64748B]">Pending</div>
              <div className="text-lg font-semibold text-[#FACC15]">
                ₹ {pending}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <button
              type="button"
              onClick={openWithdrawModal}
              className="flex-1 bg-[#FACC15] text-[#0F172A] font-semibold px-4 py-2 rounded-xl shadow hover:scale-[1.02] transition"
            >
              <ArrowDown className="w-4 h-4 inline mr-1" /> Withdraw
            </button>

            <button
              type="button"
              onClick={() => setShowAddBank(true)}
              className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-semibold px-4 py-2 rounded-xl shadow hover:scale-[1.02] transition"
            >
              <Banknote className="w-4 h-4 inline mr-1" /> Add Bank Account
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="max-h-[60vh] overflow-y-auto px-0 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-[#0F172A]">Transactions</div>
            <button
              type="button"
              className="text-xs text-[#64748B] hover:text-[#FACC15] transition"
              onClick={() =>
                setToast({ type: "info", message: "Showing latest (Demo)" })
              }
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-[#64748B] border-b border-[#E2E8F0]">
                  <th className="py-2 px-2 text-left">Date</th>
                  <th className="py-2 px-2 text-left">Type</th>
                  <th className="py-2 px-2 text-left">Session</th>
                  <th className="py-2 px-2 text-left">Status</th>
                  <th className="py-2 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-[#F8FAFC]">
                    <td className="py-2 px-2">{tx.date}</td>
                    <td className="py-2 px-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          tx.type === "Earning"
                            ? "bg-[#DCFCE7] text-[#22C55E]"
                            : "bg-[#E0F2FE] text-[#0EA5E9]"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-2 px-2">{tx.sessionId}</td>
                    <td className="py-2 px-2">
                      <StatusChip status={tx.status} />
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-[#0F172A]">
                      ₹ {tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {transactions.length === 0 && (
              <div className="text-center text-[#64748B] py-8">
                No transactions yet.
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Withdraw Modal (separate, NOT nested) */}
      <Modal
        open={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        title="Withdraw Funds"
      >
        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#0F172A]">Amount</label>
            <input
              type="number"
              min="1"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 mt-1 bg-[#F8FAFC] focus:outline-none"
              placeholder="Enter amount"
            />
            <p className="text-xs text-[#64748B] mt-1">
              Withdrawable: ₹ {withdrawable}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-[#0F172A]">
              Bank Account
            </label>
            <select
              value={withdrawBank}
              onChange={(e) => setWithdrawBank(Number(e.target.value))}
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 mt-1 bg-[#F8FAFC] focus:outline-none"
            >
              {banks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              onClick={() => setShowWithdraw(false)}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-[#64748B] font-medium hover:bg-[#F8FAFC] transition"
              disabled={withdrawLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#FACC15] text-[#0F172A] font-semibold hover:scale-[1.02] transition flex items-center gap-2"
              disabled={withdrawLoading}
            >
              {withdrawLoading && (
                <span className="w-4 h-4 border-2 border-[#E2E8F0] border-t-transparent rounded-full animate-spin inline-block" />
              )}
              Confirm
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Bank Modal (separate, NOT nested) */}
      <Modal
        open={showAddBank}
        onClose={() => setShowAddBank(false)}
        title="Add Bank Account"
      >
        <form onSubmit={handleAddBank} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#0F172A]">
              Bank Name
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 mt-1 bg-[#F8FAFC] focus:outline-none"
              placeholder="Bank Name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#0F172A]">
              Account Holder Name
            </label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 mt-1 bg-[#F8FAFC] focus:outline-none"
              placeholder="Holder Name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#0F172A]">
              Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 mt-1 bg-[#F8FAFC] focus:outline-none"
              placeholder="Account Number"
            />
          </div>

          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              onClick={() => setShowAddBank(false)}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-[#64748B] font-medium hover:bg-[#F8FAFC] transition"
              disabled={addBankLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#FACC15] text-[#0F172A] font-semibold hover:scale-[1.02] transition flex items-center gap-2"
              disabled={addBankLoading}
            >
              {addBankLoading && (
                <span className="w-4 h-4 border-2 border-[#E2E8F0] border-t-transparent rounded-full animate-spin inline-block" />
              )}
              Save
            </button>
          </div>
        </form>
      </Modal>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
    </>
  );
}
