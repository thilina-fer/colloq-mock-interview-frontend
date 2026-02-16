import React from "react";
import { Linkedin, Github, Download } from "lucide-react";

const profile = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  bio: "Senior Software Engineer passionate about system design, DSA, and mentoring aspiring candidates.",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  skills: ["System Design", "DSA", "React", "Node.js", "Leadership"],
  linkedin: "https://linkedin.com/in/priyasharma",
  github: "https://github.com/priyasharma",
  cv: "#",
};

export default function SidebarProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4 border border-[#E2E8F0]">
      <img
        src={profile.avatar}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-4 border-[#FACC15] shadow"
      />
      <div className="text-xl font-bold text-[#0F172A]">{profile.name}</div>
      <div className="text-sm text-[#64748B]">{profile.email}</div>
      <div className="text-center text-[#64748B] text-sm mt-2">
        {profile.bio}
      </div>
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] px-3 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex gap-3 mt-2">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#FACC15] transition"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#FACC15] transition"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
      <a
        href={profile.cv}
        className="mt-3 inline-flex items-center gap-2 bg-[#FACC15] text-[#0F172A] font-semibold px-4 py-2 rounded-xl shadow hover:scale-105 transition"
        download
      >
        <Download className="w-4 h-4" /> Download CV
      </a>
    </div>
  );
}
