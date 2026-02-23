// src/components/auth/RoleSwitcher.jsx
import React from "react";
import { motion } from "framer-motion";
// import { ROLE } from "../../data/Auth";
import { ROLE } from "../../data/Auth ";

export default function RoleSwitcher({ role, onChange }) {
  return (
    <div className="rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/10">
      <div className="relative flex">
        <button
          onClick={() => onChange(ROLE.CANDIDATE)}
          className={`relative z-10 rounded-2xl px-4 py-2 text-sm font-medium transition ${
            role === ROLE.CANDIDATE
              ? "text-black"
              : "text-black/60 hover:text-black"
          }`}
        >
          Candidate
        </button>
        <button
          onClick={() => onChange(ROLE.INTERVIEWER)}
          className={`relative z-10 rounded-2xl px-4 py-2 text-sm font-medium transition ${
            role === ROLE.INTERVIEWER
              ? "text-black"
              : "text-black/60 hover:text-black"
          }`}
        >
          Interviewer
        </button>

        <motion.div
          className="absolute inset-y-1 w-1/2 rounded-xl"
          style={{
            background: "linear-gradient(90deg, #FFD000cc, #E8960Acc)",
          }}
          animate={{ x: role === ROLE.CANDIDATE ? 0 : "100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
