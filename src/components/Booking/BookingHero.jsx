// src/components/Booking/BookingHero.jsx
import React from "react";

export default function BookingHero() {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
        Book Your Interviewer
      </h1>
      <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
        Pick your level and engineering area, then book a session with a
        matching expert.
      </p>
    </div>
  );
}
