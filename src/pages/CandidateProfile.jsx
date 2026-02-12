import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Clock,
  LayoutDashboard,
  Gift,
  ArrowRight,
  Calendar,
} from "lucide-react";

// Components
import Sidebar from "../components/Candidate-Profile/Sidebar";
import StatsCard from "../components/Candidate-Profile/StatsCard";
import SessionCard from "../components/Candidate-Profile/SessionCard";
import EditProfileModal from "../components/Candidate-Profile/EditProfileModal";
import SessionDetailsModal from "../components/Candidate-Profile/SessionDetailsModal";

// Data
import { upcomingSessions, completedSessions } from "../data/sessionData";
import ColloQLogo from "../components/ColloQLogo";

const CandidateProfile = () => {
  // --- States ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [userData, setUserData] = useState({
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
    ],
  });

  // --- Animation Settings (Smooth & Slower) ---
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.2 } },
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
    <div className="min-h-screen bg-gray-50 text-black font-sans pb-12 relative">
      {/* 1. Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <h1 className="text-xl font-bold flex items-center gap-2">
          👋 Hello {userData.name.split(" ")[0]}, this is your dashboard!
        </h1>
        {/* <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium transition-transform active:scale-95">
          <Gift className="w-4 h-4 text-yellow-500" /> Refer & Earn
        </button> */}
        <ColloQLogo />
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. Sidebar Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-3"
        >
          <Sidebar
            userProfile={userData}
            onEditClick={() => setIsEditModalOpen(true)}
          />
        </motion.div>

        {/* 3. Main Content Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="lg:col-span-9 space-y-8"
        >
          {/* Stats Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {stats.map((stat, i) => (
              <StatsCard key={i} {...stat} />
            ))}
          </motion.div>

          {/* Hero Banner */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.005 }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg cursor-default"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/30 backdrop-blur-md rounded-2xl">
                <Calendar className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  Book your next mock interview
                </h3>
                <p className="text-sm opacity-80 text-black">
                  Choose an interviewer and schedule a session on ColloQ.
                </p>
              </div>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold mt-4 md:mt-0 flex items-center gap-2 hover:bg-gray-800 transition-all hover:gap-3 shadow-md active:scale-95">
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Upcoming Sessions List */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-4">Upcoming Sessions</h3>
            <div className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className="cursor-pointer transition-transform active:scale-[0.99]"
                  >
                    <SessionCard type="upcoming" session={session} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm p-4 bg-white rounded-xl border border-gray-100">
                  No upcoming sessions found.
                </p>
              )}
            </div>
          </motion.div>

          {/* Completed Sessions List */}
          <motion.div variants={fadeInUp} className="mt-8">
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
                  No completed sessions yet.
                </p>
              )}
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* --- Popups / Modals --- */}
      <AnimatePresence>
        {/* A. Edit Profile Modal */}
        {isEditModalOpen && (
          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            userData={userData}
            setUserData={setUserData}
          />
        )}

        {/* B. Session Details Modal */}
        {selectedSession && (
          <SessionDetailsModal
            isOpen={!!selectedSession}
            onClose={() => setSelectedSession(null)}
            session={selectedSession}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CandidateProfile;
