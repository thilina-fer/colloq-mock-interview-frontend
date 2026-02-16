import React from "react";
import {
  Mail,
  MapPin,
  Calendar,
  Edit2,
  Linkedin,
  Github,
  Download,
} from "lucide-react";

const profile = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  location: "Colombo, Sri Lanka",
  joinedDate: "October 2025",
  bio: "Senior Software Engineer passionate about system design, DSA, and mentoring aspiring candidates.",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  skills: ["System Design", "DSA", "React", "Node.js", "Leadership"],
  linkedin: "https://linkedin.com/in/priyasharma",
  github: "https://github.com/priyasharma",
  cv: "#",
};

export default function SidebarProfileCard({ onEdit }) {
  return (
    <aside className="w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
        {/* Profile Image & Status Indicator */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <img
            src={profile.avatar}
            alt="Profile"
            className="rounded-full object-cover w-full h-full border-4 border-white shadow-md"
          />
          <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
        </div>

        {/* Edit Button & Name Area */}
        <div className="text-center mb-6">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors mb-3"
          >
            <Edit2 className="w-3 h-3" /> Edit Profile
          </button>
          <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-xs text-yellow-600 font-bold uppercase tracking-wider mt-1">
            Expert Interviewer
          </p>
        </div>

        {/* Professional Details List */}
        <div className="space-y-4 text-sm text-gray-600 mb-6 border-t pt-6">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="truncate">{profile.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Joined {profile.joinedDate}</span>
          </div>
        </div>

        {/* Social & Resume Actions */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex gap-2 justify-center">
            <a
              href={profile.linkedin}
              target="_blank"
              className="p-2 bg-gray-50 rounded-lg hover:text-blue-600 transition-colors border border-gray-100"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              className="p-2 bg-gray-50 rounded-lg hover:text-black transition-colors border border-gray-100"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
          <a
            href={profile.cv}
            className="inline-flex items-center justify-center gap-2 bg-[#FACC15] text-[#0F172A] font-bold px-4 py-2.5 rounded-xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition"
            download
          >
            <Download className="w-4 h-4" /> Download CV
          </a>
        </div>

        {/* Bio Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
          <p className="text-xs leading-relaxed text-gray-600 italic">
            "{profile.bio}"
          </p>
        </div>

        {/* Expertise Tags */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">
            Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-md text-[10px] font-bold border border-yellow-200 uppercase"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
