import React from "react";
import { motion } from "framer-motion";
import { X, Calendar, Clock, Video, User, Info } from "lucide-react";

const SessionDetailsModal = ({ isOpen, onClose, session }) => {
  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden"
      >
        {/* Header with Color Strip */}
        <div className="h-2 bg-yellow-400 w-full" />

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md mb-2 inline-block">
                Mock Interview
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                {session.topic || "System Design Interview"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Session Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-2xl flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Calendar className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Date
                  </p>
                  <p className="text-sm font-semibold">{session.date}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Clock className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Time
                  </p>
                  <p className="text-sm font-semibold">{session.time}</p>
                </div>
              </div>
            </div>

            {/* Interviewer Details */}
            <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Interviewer
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {session.interviewer || "Senior Software Engineer"}
                  </p>
                </div>
              </div>
            </div>

            {/* Note Section */}
            <div className="flex gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <Info className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Please ensure your camera and microphone are working. You can
                join the link 5 minutes before the scheduled time.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full mt-6 bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-black/10 active:scale-[0.98]">
            <Video className="w-5 h-5" />
            Join Interview Room
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SessionDetailsModal;
