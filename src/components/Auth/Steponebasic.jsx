// src/components/auth/StepOneBasic.jsx
import React from "react";
import { Building2, Briefcase, User2 } from "lucide-react";
import Field from "./Field";
import Textarea from "./Textarea ";

export default function StepOneBasic({ profile, setProfile }) {
  return (
    <div className="h-full">
      <div className="mb-4">
        <div className="text-lg font-bold text-black">Step 1 Basic Info</div>
        <div className="text-sm text-black/60">
          Add a short bio and your professional basics.
        </div>
      </div>

      <div className="grid gap-3">
        <Textarea
          icon={<User2 className="h-4 w-4" />}
          placeholder="Bio (e.g., 6+ years in backend engineering, love mentoring...)"
          value={profile.bio}
          onChange={(v) => setProfile((p) => ({ ...p, bio: v }))}
          rows={4}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            icon={<Building2 className="h-4 w-4" />}
            placeholder="Company"
            value={profile.company}
            onChange={(v) => setProfile((p) => ({ ...p, company: v }))}
          />
          <Field
            icon={<Briefcase className="h-4 w-4" />}
            placeholder="Designation"
            value={profile.designation}
            onChange={(v) => setProfile((p) => ({ ...p, designation: v }))}
          />
        </div>

        <Field
          icon={<Briefcase className="h-4 w-4" />}
          placeholder="Experience (Years)"
          value={profile.experienceYears}
          onChange={(v) => setProfile((p) => ({ ...p, experienceYears: v }))}
        />
      </div>
    </div>
  );
}
