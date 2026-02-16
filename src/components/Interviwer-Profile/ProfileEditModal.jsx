import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Toast from "./Toast";
import { Linkedin, Github, X } from "lucide-react";

const defaultProfile = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  bio: "Senior Software Engineer passionate about system design, DSA, and mentoring aspiring candidates.",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  skills: ["System Design", "DSA", "React", "Node.js", "Leadership"],
  linkedin: "https://linkedin.com/in/priyasharma",
  github: "https://github.com/priyasharma",
};

export default function ProfileEditModal({ open, onClose, setToast }) {
  const [form, setForm] = useState(defaultProfile);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (open) {
      setForm(defaultProfile);
      setSkillInput("");
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setToast({ type: "error", message: "Name and Email are required." });
      return;
    }
    setToast({ type: "success", message: "Saved (Demo Only)" });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center gap-2">
          <img
            src={form.avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#FACC15]"
          />
          <input
            type="url"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            className="w-full border border-[#E2E8F0] rounded-lg px-3 py-1 text-sm"
            placeholder="Profile Image URL"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0F172A]">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0F172A]">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0F172A]">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 min-h-[60px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0F172A]">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
                <button
                  type="button"
                  className="ml-1 text-[#F87171] hover:text-[#B91C1C]"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 border border-[#E2E8F0] rounded-lg px-3 py-1 text-sm"
              placeholder="Add skill"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-[#FACC15] text-[#0F172A] px-3 py-1 rounded-lg font-semibold hover:scale-105 transition"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0F172A]">
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0F172A]">
            GitHub URL
          </label>
          <input
            type="url"
            name="github"
            value={form.github}
            onChange={handleChange}
            className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-[#64748B] font-medium hover:bg-[#F8FAFC] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#FACC15] text-[#0F172A] font-semibold hover:scale-105 transition"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
