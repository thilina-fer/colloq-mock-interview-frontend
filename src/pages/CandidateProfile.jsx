import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Clock,
  LayoutDashboard,
  Gift,
  ArrowRight,
  Calendar,
  X,
} from "lucide-react";

// Components
import Sidebar from "../components/Candidate-Profile/Sidebar";
import StatsCard from "../components/Candidate-Profile/StatsCard";
import SessionCard from "../components/Candidate-Profile/SessionCard";
import EditProfileModal from "../components/Candidate-Profile/EditProfileModal";

// Data
import { upcomingSessions, completedSessions } from "../data/sessionData";

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
      "Tech Startups",
    ],
  });

  // --- Animation Settings (Slower & Smoother) ---
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.2 } }
  };

  const stats = [
    { label: "Completed", value: completedSessions.length, icon: <CheckCircle className="w-5 h-5 text-yellow-500" /> },
    { label: "Pending", value: upcomingSessions.length, icon: <Clock className="w-5 h-5 text-gray-400" /> },
    { label: "Total Sessions", value: upcomingSessions.length + completedSessions.length, icon: <LayoutDashboard className="w-5 h-5 text-black" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans pb-12 relative">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <h1 className="text-xl font-bold">👋 Hello {userData.name.split(' ')[0]}, this is your dashboard!</h1>
        <button className="flex items-center gap-2 px-4 py-2 border bg-white rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium transition-transform active:scale-95">
          <Gift className="w-4 h-4 text-yellow-500" /> Refer & Earn
        </button>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="lg:col-span-3">
          <Sidebar 
            userProfile={userData} 
            onEditClick={() => setIsEditModalOpen(true)} 
          />
        </motion.div>

        {/* Main Content */}
        <motion.section variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-9 space-y-8">
          
          {/* Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
          </motion.div>

          {/* Banner */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
            <div className="flex items-center gap-6 text-black">
              <div className="p-4 bg-white/30 backdrop-blur-md rounded-2xl"><Calendar className="w-8 h-8" /></div>
              <div>
                <h3 className="text-xl font-bold">Book your next mock interview</h3>
                <p className="text-sm opacity-80">Choose an interviewer and schedule a session.</p>
              </div>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold mt-4 md:mt-0 flex items-center gap-2 hover:bg-gray-800 transition-all hover:gap-3">
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Sessions List */}
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

      {/* --- Popups (Modals) --- */}
      <AnimatePresence>
        {/* Session Info Modal */}
        {selectedSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedSession(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative z-10">
              <button onClick={() => setSelectedSession(null)} className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Session Details</h2>
              <div className="space-y-3">
                <p><strong>Topic:</strong> {selectedSession.topic}</p>
                <p><strong>Date:</strong> {selectedSession.date}</p>
                <p><strong>Time:</strong> {selectedSession.time}</p>
                <button className="w-full bg-black text-white py-3 rounded-xl font-bold mt-4">Join Meeting</button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <EditProfileModal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CandidateProfile;