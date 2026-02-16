import React from "react";
import { Wallet, Pencil, User } from "lucide-react";

export default function NavbarTop({ onWallet, onEdit }) {
  return (
    <header className="w-full bg-white border-b border-[#E2E8F0] px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div>
        <div className="text-xs text-[#64748B] font-medium">Welcome back,</div>
        <div className="text-lg md:text-2xl font-bold text-[#0F172A] tracking-tight">
          Interviewer Dashboard
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onWallet}
          className="group relative p-2 rounded-full hover:bg-[#FACC15]/20 transition duration-150"
          aria-label="My Wallet"
        >
          <Wallet className="w-5 h-5 text-[#0F172A] group-hover:text-[#FACC15] transition" />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-[#0F172A] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition">
            My Wallet
          </span>
        </button>
        <button
          onClick={onEdit}
          className="group relative p-2 rounded-full hover:bg-[#FACC15]/20 transition duration-150"
          aria-label="Edit Profile"
        >
          <Pencil className="w-5 h-5 text-[#0F172A] group-hover:text-[#FACC15] transition" />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-[#0F172A] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition">
            Edit Profile
          </span>
        </button>
      </div>
    </header>
  );
}
