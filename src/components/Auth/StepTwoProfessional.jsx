// src/components/auth/StepTwoProfessional.jsx
import React from "react";
import { Github, Linkedin, UploadCloud } from "lucide-react";
import Field from "./Field";

export default function StepTwoProfessional({
  profile,
  setProfile,
  specializationOptions,
  toggleSpecialization,
}) {
  return (
    <div className="h-full">
      <div className="mb-4">
        <div className="text-lg font-bold text-black">
          Step 2 — Professional Links
        </div>
        <div className="text-sm text-black/60">
          Choose specializations, add links, and upload your CV.
        </div>
      </div>

      <div className="grid gap-4">
        {/* Specializations */}
        <div>
          <div className="mb-2 text-sm font-semibold text-black">
            Specializations
          </div>
          <div className="flex flex-wrap gap-2">
            {specializationOptions.map((opt) => {
              const active = profile.specializations.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleSpecialization(opt)}
                  className={`rounded-full px-3 py-1 text-sm font-medium ring-1 transition ${
                    active
                      ? "text-black ring-[#F2B300]"
                      : "bg-white text-black/70 ring-black/10 hover:bg-black/5"
                  }`}
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(90deg, #FFD000, #E8960A)",
                        }
                      : {}
                  }
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Social links */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            icon={<Github className="h-4 w-4" />}
            placeholder="GitHub URL"
            value={profile.githubUrl}
            onChange={(v) => setProfile((p) => ({ ...p, githubUrl: v }))}
          />
          <Field
            icon={<Linkedin className="h-4 w-4" />}
            placeholder="LinkedIn URL"
            value={profile.linkedinUrl}
            onChange={(v) => setProfile((p) => ({ ...p, linkedinUrl: v }))}
          />
        </div>

        {/* CV Upload */}
        <label className="cursor-pointer rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-4 transition hover:bg-black/[0.04]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white ring-1 ring-black/10">
              <UploadCloud className="h-5 w-5 text-black/70" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-black">Upload CV</div>
              <div className="text-xs text-black/60">
                PDF recommended.{" "}
                {profile.cvFile
                  ? `Selected: ${profile.cvFile.name}`
                  : "No file chosen"}
              </div>
            </div>
            <div className="text-xs font-semibold text-black">Choose</div>
          </div>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) =>
              setProfile((p) => ({ ...p, cvFile: e.target.files?.[0] || null }))
            }
          />
        </label>
      </div>
    </div>
  );
}
