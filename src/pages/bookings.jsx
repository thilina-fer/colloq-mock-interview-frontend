import React, { useMemo, useState } from "react";
// import BookingNavbar from "../components/Booking/BookingNavbar";
import BookingHero from "../components/Booking/BookingHero";
import BookingSearch from "../components/Booking/BookingSearch";
import BookingFilters from "../components/Booking/BookingFilters";
import InterviewerGrid from "../components/Booking/InterviewerGrid";
import BookingFooter from "../components/Booking/BookingFooter";
// import { allInterviewers, levels, types } from "../components/Booking/mockData";
import { allInterviewers, levels, types } from "../data/mockData";
import BookingNavbar from "../components/Booking/BookingNavbar";

export default function Bookings() {
  const [selectedLevel, setSelectedLevel] = useState("Intern");
  const [selectedType, setSelectedType] = useState("Frontend");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInterviewers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allInterviewers.filter((person) => {
      const matchLevel = person.level === selectedLevel;
      const matchType = person.type === selectedType;

      const matchSearch =
        q.length === 0
          ? true
          : person.name.toLowerCase().includes(q) ||
            person.tags.some((t) => t.toLowerCase().includes(q));

      return matchLevel && matchType && matchSearch;
    });
  }, [selectedLevel, selectedType, searchQuery]);

  const handleBook = (person) => {
    console.log("Book session with:", person);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <BookingNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="space-y-10 sm:space-y-12">
          <div className="space-y-5 sm:space-y-6">
            <BookingHero />
            <BookingSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <BookingFilters
            levels={levels}
            types={types}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />

          <InterviewerGrid items={filteredInterviewers} onBook={handleBook} />
        </div>
      </main>

      <BookingFooter />
    </div>
  );
}
