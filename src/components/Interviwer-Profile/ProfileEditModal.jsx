import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Camera,
  Save,
  Github,
  Linkedin,
  FileText,
  Upload,
} from "lucide-react";

const ProfileEditModal = ({ open, onClose, setToast }) => {
  const fileInputRef = useRef(null);
  const cvInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    location: "Colombo, Western Province",
    bio: "Senior Software Engineer passionate about system design, DSA, and mentoring aspiring candidates.",
    skills: "System Design, DSA, React, Node.js, Leadership",
    github: "https://github.com/priyasharma",
    linkedin: "https://linkedin.com/in/priyasharma",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    cvName: "My_Resume.pdf",
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (setToast) {
      setToast({ message: "Profile updated successfully!", type: "success" });
    }
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Static Header */}
          <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              Edit Expert Profile
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div className="overflow-y-auto custom-scrollbar">
            <form onSubmit={handleSave} className="p-8 space-y-6">
              {/* Photo Section */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <img
                    src={formData.avatar}
                    className="w-28 h-28 rounded-[2rem] object-cover border-4 border-white shadow-lg transition group-hover:brightness-75"
                    alt="Profile"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Change Profile Photo
                </p>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#FACC15] outline-none text-sm transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#FACC15] outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Bio
                </label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#FACC15] outline-none text-sm transition-all resize-none font-medium"
                />
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Github className="w-3 h-3" /> GitHub URL
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#FACC15] outline-none text-sm transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Linkedin className="w-3 h-3" /> LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#FACC15] outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* CV Upload */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Curriculum Vitae (CV)
                </label>
                <div
                  onClick={() => cvInputRef.current.click()}
                  className="w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl hover:border-yellow-400 bg-gray-50/50 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">
                        {formData.cvName}
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                        Click to replace PDF
                      </p>
                    </div>
                  </div>
                  <Upload className="w-5 h-5 text-gray-400" />
                  <input
                    type="file"
                    ref={cvInputRef}
                    className="hidden"
                    accept=".pdf"
                  />
                </div>
              </div>

              {/* Action Buttons - Moved Inside the Scroll Container */}
              <div className="flex gap-4 pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 text-sm font-bold text-gray-500 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 text-sm font-bold text-black bg-[#FACC15] rounded-2xl shadow-lg shadow-yellow-100 hover:bg-[#EAB308] transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Save className="w-4 h-4" /> Save All Changes
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileEditModal;
