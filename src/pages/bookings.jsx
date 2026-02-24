import React, { useState, useMemo } from "react";
import { Search, Filter, Briefcase, SearchX } from "lucide-react";
import InterviewerCard from "../components/Bookings/InterviewerCard";
import BookingModal from "../components/Bookings/BookingModal";
import ColloQLogo from "../components/ColloQLogo";

const Bookings = () => {
  // Levels & Types
  const levels = [
    "Intern",
    "Trainee",
    "Associate",
    "Junior",
    "Mid-level",
    "Senior",
    "Lead",
  ];
  const types = [
    "Frontend",
    "Backend",
    "FullStack",
    "QA",
    "DevOps",
    "Mobile",
    "UI/UX",
  ];

  const [selectedLevel, setSelectedLevel] = useState("Intern");
  const [selectedType, setSelectedType] = useState("Frontend");
  const [searchQuery, setSearchQuery] = useState("");

  // Booking Modal States
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);

  // Interviewers Data
  const allInterviewers = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Senior SE",
      company: "Epic Lanka Technologies",
      rating: 4.9,
      reviews: 124,
      experience: "8 years",
      level: "Senior",
      type: "Frontend",
      description:
        "Expert in helping candidates with system design and frontend architecture interviews.",
      tags: ["React", "System Design", "Tailwind"],
      available: "Available Now",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Arjun Perera",
      role: "Lead Developer",
      company: "Sysco LABS",
      rating: 4.8,
      reviews: 89,
      experience: "10 years",
      level: "Lead",
      type: "Backend",
      description:
        "Backend specialist focusing on microservices and cloud infrastructure logic.",
      tags: ["Java", "AWS", "Go"],
      available: "Tomorrow",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Sanduni Silva",
      role: "QA Architect",
      company: "WSO2",
      rating: 5.0,
      reviews: 56,
      experience: "6 years",
      level: "Mid-level",
      type: "QA",
      description:
        "Focused on automation testing and quality assurance processes for enterprises.",
      tags: ["Selenium", "Cypress", "Appium"],
      available: "Available Now",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Dilshan Silva",
      role: "Intern Developer",
      company: "99x",
      rating: 4.5,
      reviews: 12,
      experience: "1 year",
      level: "Intern",
      type: "Frontend",
      description:
        "Passionate about React and modern CSS. Helping juniors get started with basic UI.",
      tags: ["React", "HTML", "CSS"],
      available: "Available Now",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Chamari Atapattu",
      role: "Associate Developer",
      company: "IFS",
      rating: 4.7,
      reviews: 34,
      experience: "2 years",
      level: "Associate",
      type: "FullStack",
      description:
        "Fullstack developer with a focus on Node.js and React.js. Let's build your stack.",
      tags: ["Node.js", "MongoDB", "React"],
      available: "Available Now",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    },
  ];

  const filteredInterviewers = useMemo(() => {
    return allInterviewers.filter((person) => {
      const matchLevel = person.level === selectedLevel;
      const matchType = person.type === selectedType;
      const matchSearch =
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchLevel && matchType && matchSearch;
    });
  }, [selectedLevel, selectedType, searchQuery]);

  const closeModal = () => {
    setSelectedInterviewer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-[#FFD000] rounded-lg flex items-center justify-center shadow-md shadow-yellow-500/10">
              <span className="text-black font-black text-lg">C</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Collo<span className="text-[#E8960A]">Q</span>
            </span> */}
            <ColloQLogo />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                Candidate:
              </span>
              <span className="text-xs font-semibold">Kasun Kalhara</span>
            </div>
            <div className="w-8 h-8 rounded-lg border-2 border-[#FFD000] p-0.5 overflow-hidden shadow-sm">
              <img
                src="https://i.pravatar.cc/100"
                className="w-full h-full rounded-md object-cover"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-10">
          {/* Hero Section & Search */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Book Your Interviewer
            </h1>
            <div className="relative max-w-2xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-[#E8960A] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or technology..."
                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD000]/30 focus:border-[#FFD000] transition-all placeholder:text-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Selection Rows */}
          <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                <Filter className="h-3 w-3" /> Select Level
              </h3>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border ${
                      selectedLevel === level
                        ? "bg-[#FFD000] text-black border-[#FFD000] shadow-sm"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                <Briefcase className="h-3 w-3" /> Engineering Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border ${
                      selectedType === type
                        ? "bg-[#FFD000] text-black border-[#FFD000] shadow-sm"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Interviewers Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Available Experts
                <span className="bg-yellow-100 text-[#E8960A] text-[10px] px-2 py-0.5 rounded-md">
                  {filteredInterviewers.length} Found
                </span>
              </h2>
            </div>

            {filteredInterviewers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInterviewers.map((person) => (
                  <InterviewerCard
                    key={person.id}
                    person={person}
                    onBook={setSelectedInterviewer}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-200 rounded-xl">
                <SearchX className="h-10 w-10 text-gray-200 mb-3" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  No Experts Found
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal
        selectedInterviewer={selectedInterviewer}
        onClose={closeModal}
      />

      <footer className="py-8 border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em]">
          <span>© 2024 ColloQ Platform</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-600">
              Terms
            </a>
            <a href="#" className="hover:text-gray-600">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Bookings;
