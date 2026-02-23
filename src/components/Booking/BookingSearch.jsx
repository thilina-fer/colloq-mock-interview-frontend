// src/components/Booking/BookingSearch.jsx
import React from "react";
import { Search } from "lucide-react";

export default function BookingSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full max-w-2xl group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-[#E8960A] transition-colors" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name or technology (e.g. React)..."
        className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD000]/50 focus:border-[#FFD000] transition-all placeholder:text-gray-400"
      />
    </div>
  );
}