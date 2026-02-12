import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Plus, Globe, Linkedin, Github } from "lucide-react";

const EditProfileModal = ({ isOpen, onClose, userData, setUserData }) => {
  const [formData, setFormData] = useState(userData);
  const [newInterest, setNewInterest] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    onClose();
  };

  // අලුත් Interest එකක් add කරන function එක
  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  // Interest එකක් අයින් කරන function එක
  const removeInterest = (interestToRemove) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interestToRemove),
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-20 rounded-t-2xl">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative group">
              <img
                src={formData.img}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                alt="Profile"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Camera className="text-white w-6 h-6" />
              </div>
            </div>
            <button
              type="button"
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Change Profile Photo
            </button>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Professional Bio
            </label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition-all"
            />
          </div>

          {/* Interests Tags Section */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Interests & Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addInterest())
                }
                placeholder="Add interest (e.g. React)"
                className="flex-1 p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              />
              <button
                type="button"
                onClick={addInterest}
                className="p-2.5 bg-yellow-400 rounded-xl hover:bg-yellow-500 transition-colors"
              >
                <Plus className="w-5 h-5 text-black" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                  >
                    <X className="w-3 h-3 hover:text-red-500" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Professional Links
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                </div>
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  className="bg-transparent flex-1 text-sm outline-none px-2"
                />
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Github className="w-4 h-4 text-gray-800" />
                </div>
                <input
                  type="text"
                  placeholder="GitHub URL"
                  className="bg-transparent flex-1 text-sm outline-none px-2"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 shadow-lg shadow-black/10 transition-all active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
