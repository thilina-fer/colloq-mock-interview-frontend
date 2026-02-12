// src/pages/CandidateProfile.jsx
import React from "react";
import {
  CheckCircle,
  Clock,
  LayoutDashboard,
  Gift,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Sidebar from "../components/Candidate-Profile/Sidebar";
import StatsCard from "../components/Candidate-Profile/StatsCard";
import SessionCard from "../components/Candidate-Profile/SessionCard";
// import { upcomingSessions, completedSessions } from "../data/sessionData";
import { upcomingSessions, completedSessions } from "../data/sessionData";

const CandidateProfile = () => {
  const userData = {
    name: "Matthew Loganoretti",
    email: "matthew.l@email.com",
    location: "San Francisco, CA",
    joinedDate: "January 2024",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Aspiring product manager seeking to break into tech. Currently preparing for PM interviews and building my network. Passionate about innovation and problem-solving.",
    interests: [
      "Product Management",
      "Strategy",
      "System Design",
      "Leadership",
      "Tech Startups",
    ],
  };

  const stats = [
    {
      label: "Completed",
      value: completedSessions.length,
      icon: <CheckCircle className="w-5 h-5 text-yellow-500" />,
    },
    {
      label: "Pending",
      value: upcomingSessions.length,
      icon: <Clock className="w-5 h-5 text-gray-400" />,
    },
    {
      label: "Total Sessions",
      value: upcomingSessions.length + completedSessions.length,
      icon: <LayoutDashboard className="w-5 h-5 text-black" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans pb-12">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          👋 Hello Matthew, this is your dashboard!
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium">
          <Gift className="w-4 h-4 text-yellow-500" /> Refer & Earn
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Sidebar userProfile={userData} />

        <section className="lg:col-span-9 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <StatsCard key={i} {...stat} />
            ))}
          </div>

          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/30 backdrop-blur-md rounded-2xl">
                <Calendar className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  Book your next mock interview
                </h3>
                <p className="text-sm opacity-80 text-black">
                  Choose an interviewer and schedule a session to boost your
                  skills.
                </p>
              </div>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold mt-4 md:mt-0 flex items-center gap-2 hover:bg-gray-800 transition-colors">
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Upcoming Sessions Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Upcoming Sessions</h3>
            <div className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    type="upcoming"
                    session={session}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm p-4 bg-white rounded-xl border border-gray-100">
                  No upcoming sessions found. Book one now!
                </p>
              )}
            </div>
          </div>

          {/* Completed Sessions Section */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Completed Sessions</h3>
            <div className="space-y-4">
              {completedSessions.length > 0 ? (
                completedSessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    type="completed"
                    session={session}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm p-4 bg-white rounded-xl border border-gray-100">
                  No completed sessions yet. Get started with your first
                  interview!
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CandidateProfile;
