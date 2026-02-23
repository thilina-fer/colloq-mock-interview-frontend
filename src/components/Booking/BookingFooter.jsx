// src/components/Booking/BookingFooter.jsx
import React from "react";

export default function BookingFooter() {
  return (
    <footer className="py-10 sm:py-12 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
        <span>© 2024 ColloQ Platform</span>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          <a href="#" className="hover:text-gray-600">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-600">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-600">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
