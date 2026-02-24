// src/components/Booking/BookingNavbar.jsx
import React from "react";
import ColloQLogo from "../ColloQLogo";

export default function BookingNavbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ColloQLogo />        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              Candidate:
            </span>
            <span className="text-sm font-semibold">Kasun Kalhara</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#FFD000] p-0.5 shadow-sm">
            <img
              src="https://i.pravatar.cc/100"
              className="w-full h-full rounded-full object-cover"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
