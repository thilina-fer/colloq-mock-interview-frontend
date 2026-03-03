import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Clock,
  LayoutDashboard,
  Gift,
  ArrowRight,
  Calendar,
} from "lucide-react";

// Components Import
import Sidebar from "../components/Candidate-Profile/Sidebar";
import StatsCard from "../components/Candidate-Profile/StatsCard";
import SessionCard from "../components/Candidate-Profile/SessionCard";
import EditProfileModal from "../components/Candidate-Profile/EditProfileModal";
import SessionDetailsModal from "../components/Candidate-Profile/SessionDetailsModal";
import LoadingScreen from "../components/LoadingScreen"; // අලුතින් හැදූ Loading Component එක

// Mock Data
import { upcomingSessions, completedSessions } from "../data/sessionData";

const CandidateProfile = () => {
  // --- States ---
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // User Data State - ColloQ Platform
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

  // Page එක load වීමේදී පෙන්වන Loading Timer එක (තත්පර 2)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animation Settings
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
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* 1. Loading Animation Screen (Reusable Component) */
          <LoadingScreen key="loader" message="Loading ColloQ Dashboard..." />
        ) : (
          /* 2. Main Dashboard Content */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-[#F8FAFC] min-h-screen flex flex-col"
          >
            {/* Sticky Header Bar — matches Interviewer NavbarTop */}
            <header className="w-full bg-white border-b border-[#E2E8F0] px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
              <div>
                <div className="text-xs text-[#64748B] font-medium">
                  Welcome back,
                </div>
                <div className="text-lg md:text-2xl font-bold text-[#0F172A] tracking-tight">
                  👋 Hello {userData.name.split(" ")[0]}, your dashboard!
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] bg-white rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium transition-transform active:scale-95 text-[#0F172A]">
                <Gift className="w-4 h-4 text-yellow-500" /> Refer & Earn
              </button>
            </header>

            {/* Page Body — same structure as Interviewer dashboard */}
            <div className="flex-1 flex flex-col md:flex-row gap-6 max-w-7xl w-full mx-auto px-4 md:px-6 py-6">
              {/* Sidebar — fixed width md:w-72, same as Interviewer sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                className="md:w-72 w-full shrink-0 mb-4 md:mb-0"
              >
                <Sidebar
                  userProfile={userData}
                  onEditClick={() => setIsEditModalOpen(true)}
                />
              </motion.aside>

              {/* Main Content Area */}
              <motion.main
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex-1 flex flex-col gap-6"
              >
                {/* Statistics Grid */}
                <motion.div
                  variants={fadeInUp}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {stats.map((stat, i) => (
                    <StatsCard key={i} {...stat} />
                  ))}
                </motion.div>

                {/* Promotional Hero Banner */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.005 }}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-lg cursor-default border border-yellow-400"
                >
                  <div className="flex items-center gap-6 text-black">
                    <div className="p-4 bg-white/30 backdrop-blur-md rounded-2xl">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        Book your next mock interview
                      </h3>
                      <p className="text-sm opacity-80 font-medium">
                        Schedule a session with industry experts on ColloQ.
                      </p>
                    </div>
                  </div>
                  <button className="bg-black text-white px-6 py-3 rounded-xl font-bold mt-4 md:mt-0 flex items-center gap-2 hover:bg-gray-800 transition-all hover:gap-3 shadow-md active:scale-95">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>

                {/* Upcoming Sessions List */}
                <motion.div variants={fadeInUp}>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                    Upcoming Sessions
                  </h3>
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
                <motion.div variants={fadeInUp}>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                    Completed Sessions
                  </h3>
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
              </motion.main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Popups / Modals Area --- */}
      <AnimatePresence>
        {/* Edit Profile Logic */}
        {isEditModalOpen && (
          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            userData={userData}
            setUserData={setUserData}
          />
        )}

        {/* Detailed Session View */}
        {selectedSession && (
          <SessionDetailsModal
            isOpen={!!selectedSession}
            onClose={() => setSelectedSession(null)}
            session={selectedSession}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CandidateProfile;
