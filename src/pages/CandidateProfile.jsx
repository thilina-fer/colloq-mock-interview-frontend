import React, { useState } from "react"; // useState එකතු කළා
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence එකතු කළා
import {
  CheckCircle,
  Clock,
  LayoutDashboard,
  Gift,
  ArrowRight,
  Calendar,
  X, // Modal එක close කරන්න icon එකක්
} from "lucide-react";
import Sidebar from "../components/Candidate-Profile/Sidebar";
import StatsCard from "../components/Candidate-Profile/StatsCard";
import SessionCard from "../components/Candidate-Profile/SessionCard";
import { upcomingSessions, completedSessions } from "../data/sessionData";

const CandidateProfile = () => {
  // Modal එක පාලනය කිරීමට State එකක්
  const [selectedSession, setSelectedSession] = useState(null);

  const userData = {
    name: "Matthew Loganoretti",
    email: "matthew.l@email.com",
    location: "San Francisco, CA",
    joinedDate: "January 2024",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Aspiring product manager seeking to break into tech...",
    interests: ["Product Management", "Strategy", "System Design"],
  };

  const stats = [
    { label: "Completed", value: completedSessions.length, icon: <CheckCircle className="w-5 h-5 text-yellow-500" /> },
    { label: "Pending", value: upcomingSessions.length, icon: <Clock className="w-5 h-5 text-gray-400" /> },
    { label: "Total Sessions", value: upcomingSessions.length + completedSessions.length, icon: <LayoutDashboard className="w-5 h-5 text-black" /> },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans pb-12 relative">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <h1 className="text-xl font-bold">👋 Hello Matthew, this is your dashboard!</h1>
        <button className="flex items-center gap-2 px-4 py-2 border bg-white rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium transition-transform active:scale-95">
          <Gift className="w-4 h-4 text-yellow-500" /> Refer & Earn
        </button>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="lg:col-span-3">
          <Sidebar userProfile={userData} />
        </motion.div>

        <motion.section initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.2 } } }} className="lg:col-span-9 space-y-8">
          
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/30 backdrop-blur-md rounded-2xl"><Calendar className="w-8 h-8 text-black" /></div>
              <div>
                <h3 className="text-xl font-bold">Book your next mock interview</h3>
                <p className="text-sm opacity-80">Choose an interviewer and schedule a session.</p>
              </div>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Upcoming Sessions Section */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-4">Upcoming Sessions</h3>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} onClick={() => setSelectedSession(session)} className="cursor-pointer">
                  <SessionCard type="upcoming" session={session} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* Details Modal - Popup එක */}
      <AnimatePresence>
        {selectedSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSession(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative z-10"
            >
              <button 
                onClick={() => setSelectedSession(null)}
                className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <h2 className="text-xl font-bold mb-4">Session Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Topic:</span>
                  <span className="font-semibold">{selectedSession.topic || "System Design"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-semibold">{selectedSession.date}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-semibold">{selectedSession.time}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Interviewer:</span>
                  <span className="font-semibold">{selectedSession.interviewer || "Senior PM"}</span>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                  ⚠️ Make sure to join the meeting 5 minutes early.
                </div>
                <button className="w-full bg-black text-white py-3 rounded-xl font-bold mt-4">
                  Join Meeting
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CandidateProfile;