// src/pages/Login.jsx
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Lock,
  Github,
  Linkedin,
  UploadCloud,
  Building2,
  Briefcase,
  User2,
} from "lucide-react";

/**
 * FULL SCREEN LOGIN (No Navbar)
 * - Full bleed split screen (yellow gradient + white)
 * - No outer padding / no rounded wrapper
 * - No scrolling (100% fit)
 * - Role switcher is inside the form panel (top-right)
 */

const ROLE = {
  CANDIDATE: "candidate",
  INTERVIEWER: "interviewer",
};

const specializationOptions = [
  "React",
  "Java",
  "Spring Boot",
  "Node.js",
  "System Design",
  "Data Structures",
  "SQL",
  "DevOps",
  "UI/UX",
];

const fadeSlide = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
  transition: { duration: 0.35, ease: "easeOut" },
};

export default function Login() {
  const [role, setRole] = useState(ROLE.CANDIDATE);

  // Auth (mock)
  const [authMethod, setAuthMethod] = useState("email");
  const [auth, setAuth] = useState({ email: "", password: "" });

  // Interviewer steps after auth
  const [isAuthed, setIsAuthed] = useState(false);
  const [step, setStep] = useState(1);

  const [profile, setProfile] = useState({
    bio: "",
    company: "",
    designation: "",
    experienceYears: "",
    specializations: [],
    githubUrl: "",
    linkedinUrl: "",
    cvFile: null,
  });

  const isInterviewer = role === ROLE.INTERVIEWER;

  const progress = useMemo(() => {
    if (!isInterviewer || !isAuthed) return 0;
    return step === 1 ? 50 : 100;
  }, [isInterviewer, isAuthed, step]);

  const brandingCopy = useMemo(() => {
    if (role === ROLE.CANDIDATE) {
      return {
        title: "Practice. Improve. Get Hired.",
        subtitle:
          "Join mock interviews tailored to your level — get structured feedback and build confidence.",
        bullets: [
          "Realistic interview sessions",
          "Skill-based matching",
          "Actionable feedback",
        ],
      };
    }
    return {
      title: "Interview Smarter with Colloq",
      subtitle:
        "Sign in as an Interviewer, set your expertise, and start helping candidates grow — on your schedule.",
      bullets: [
        "Showcase your expertise",
        "Flexible time slots",
        "Build your professional brand",
      ],
    };
  }, [role]);

  function resetInterviewerFlow() {
    setIsAuthed(false);
    setStep(1);
    setAuthMethod("email");
    setAuth({ email: "", password: "" });
  }

  function handleRoleChange(nextRole) {
    setRole(nextRole);
    // reset interviewer-only flow when leaving interviewer
    if (nextRole !== ROLE.INTERVIEWER) resetInterviewerFlow();
  }

  function mockAuthenticate(method) {
    setAuthMethod(method);
    setIsAuthed(true);
  }

  function toggleSpecialization(tag) {
    setProfile((prev) => {
      const exists = prev.specializations.includes(tag);
      const next = exists
        ? prev.specializations.filter((t) => t !== tag)
        : [...prev.specializations, tag];
      return { ...prev, specializations: next };
    });
  }

  return (
    <div className="h-dvh w-full overflow-hidden bg-white">
      <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-2">
        {/* BRANDING (Yellow gradient) */}
        <motion.section
          className={[
            "relative h-full min-h-0 overflow-hidden text-black",
            role === ROLE.CANDIDATE ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
          style={{
            background:
              "linear-gradient(145deg, #FFD000 0%, #F2B300 50%, #E8960A 100%)",
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          layout
        >
          <div className="absolute inset-0 opacity-[0.22]">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white" />
            <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white" />
          </div>

          <div className="relative flex h-full min-h-0 flex-col justify-between px-8 py-10 lg:px-14">
            <div>
              <motion.h1
                key={brandingCopy.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="text-4xl font-bold tracking-tight lg:text-6xl"
              >
                {brandingCopy.title}
              </motion.h1>

              <motion.p
                key={brandingCopy.subtitle}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="mt-4 max-w-xl text-base text-black/80 lg:text-lg"
              >
                {brandingCopy.subtitle}
              </motion.p>

              <div className="mt-8 space-y-4">
                {brandingCopy.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-black" />
                    <div className="text-base text-black/90 lg:text-lg">
                      {b}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 text-xs text-black/70">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-black/70" />
                <span>Fixed height layout — no scrolling</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FORM (White) */}
        <motion.section
          className={[
            "h-full min-h-0 overflow-hidden bg-white",
            role === ROLE.CANDIDATE ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          layout
        >
          <div className="flex h-full min-h-0 flex-col">
            {/* Top row: Brand + Role switcher */}
            <div className="shrink-0 px-8 pt-8 lg:px-14">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-black font-bold text-white">
                    C
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-black">
                      Colloq
                    </div>
                    <div className="text-xs text-black/60">
                      Mock Interview Platform
                    </div>
                  </div>
                </div>

                <RoleSwitcher role={role} onChange={handleRoleChange} />
              </div>
            </div>

            {/* Form header */}
            <div className="shrink-0 px-8 pt-6 lg:px-14">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-black">
                    {isInterviewer && isAuthed
                      ? "Professional Profile"
                      : "Sign in / Sign up"}
                  </div>
                  <div className="text-xs text-black/60">
                    {isInterviewer
                      ? isAuthed
                        ? "Complete your interviewer details"
                        : "Authenticate to continue"
                      : "Access your mock interviews"}
                  </div>
                </div>

                {isInterviewer && isAuthed && (
                  <div className="w-44">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-black/60">
                      <span>Step {step}/2</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #FFD000, #E8960A)",
                        }}
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form body (centered) */}
            <div className="min-h-0 flex-1 overflow-hidden px-8 py-8 lg:px-14">
              <div className="h-full min-h-0">
                <AnimatePresence mode="wait">
                  {/* Candidate auth */}
                  {!isInterviewer && (
                    <motion.div
                      key="candidate-auth"
                      {...fadeSlide}
                      className="h-full min-h-0 flex flex-col justify-center"
                    >
                      <AuthCard
                        roleLabel="Candidate"
                        auth={auth}
                        setAuth={setAuth}
                        onGoogle={() => mockAuthenticate("google")}
                        onEmail={() => mockAuthenticate("email")}
                        showSuccess={false}
                      />
                    </motion.div>
                  )}

                  {/* Interviewer auth */}
                  {isInterviewer && !isAuthed && (
                    <motion.div
                      key="interviewer-auth"
                      {...fadeSlide}
                      className="h-full min-h-0 flex flex-col justify-center"
                    >
                      <AuthCard
                        roleLabel="Interviewer"
                        auth={auth}
                        setAuth={setAuth}
                        onGoogle={() => mockAuthenticate("google")}
                        onEmail={() => mockAuthenticate("email")}
                        showSuccess={false}
                      />
                    </motion.div>
                  )}

                  {/* Interviewer steps */}
                  {isInterviewer && isAuthed && (
                    <motion.div
                      key="interviewer-steps"
                      {...fadeSlide}
                      className="h-full min-h-0 flex flex-col"
                    >
                      <div className="min-h-0 flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                          {step === 1 && (
                            <motion.div
                              key="step-1"
                              {...fadeSlide}
                              className="h-full"
                            >
                              <StepOneBasic
                                profile={profile}
                                setProfile={setProfile}
                              />
                            </motion.div>
                          )}

                          {step === 2 && (
                            <motion.div
                              key="step-2"
                              {...fadeSlide}
                              className="h-full"
                            >
                              <StepTwoProfessional
                                profile={profile}
                                setProfile={setProfile}
                                specializationOptions={specializationOptions}
                                toggleSpecialization={toggleSpecialization}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Footer actions */}
                      <div className="mt-6 shrink-0 border-t border-black/5 pt-5 flex items-center justify-between gap-3">
                        <button
                          onClick={resetInterviewerFlow}
                          className="text-sm font-medium text-black/60 transition hover:text-black"
                        >
                          Back to Auth
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            disabled={step === 1}
                            onClick={() => setStep((s) => Math.max(1, s - 1))}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold ring-1 transition ${
                              step === 1
                                ? "cursor-not-allowed bg-black/5 text-black/30 ring-black/5"
                                : "bg-white text-black ring-black/10 hover:bg-black/5"
                            }`}
                          >
                            Back
                          </button>

                          {step < 2 ? (
                            <button
                              onClick={() => setStep(2)}
                              className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/85"
                            >
                              Continue <ArrowRight className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => alert("Profile submitted (mock).")}
                              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                              style={{
                                background:
                                  "linear-gradient(90deg, #FFD000, #E8960A)",
                              }}
                            >
                              Submit Profile{" "}
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

/* ----------------------------- Small UI ----------------------------- */

function RoleSwitcher({ role, onChange }) {
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

/* ----------------------------- Sub Components ----------------------------- */

function AuthCard({
  roleLabel,
  auth,
  setAuth,
  onGoogle,
  onEmail,
  showSuccess,
}) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <div className="text-xl font-bold text-black">
            {roleLabel} Authentication
          </div>
          <div className="text-sm text-black/60">
            Sign in using Google or email credentials.
          </div>
        </div>

        <button
          onClick={onGoogle}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
        >
          <span className="grid h-5 w-5 place-items-center rounded bg-white text-xs font-bold text-black">
            G
          </span>
          Continue with Google
        </button>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/10" />
          <div className="text-xs text-black/50">or</div>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <div className="space-y-3">
          <Field
            icon={<Mail className="h-4 w-4" />}
            placeholder="Email"
            value={auth.email}
            onChange={(v) => setAuth((p) => ({ ...p, email: v }))}
          />
          <Field
            icon={<Lock className="h-4 w-4" />}
            placeholder="Password"
            type="password"
            value={auth.password}
            onChange={(v) => setAuth((p) => ({ ...p, password: v }))}
          />
        </div>

        <button
          onClick={onEmail}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          style={{
            background: "linear-gradient(90deg, #FFD000, #E8960A)",
          }}
        >
          Continue <ArrowRight className="h-4 w-4" />
        </button>

        {showSuccess && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-900">
            <CheckCircle2 className="h-4 w-4" />
            Authenticated successfully
          </div>
        )}
      </div>
    </div>
  );
}

function StepOneBasic({ profile, setProfile }) {
  return (
    <div className="h-full">
      <div className="mb-4">
        <div className="text-lg font-bold text-black">Step 1 — Basic Info</div>
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

function StepTwoProfessional({
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

function Field({ icon, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-black/[0.03] px-3 py-2.5 ring-1 ring-black/5 transition focus-within:ring-black/15">
      <div className="text-black/60">{icon}</div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40"
      />
    </div>
  );
}

function Textarea({ icon, placeholder, value, onChange, rows = 4 }) {
  return (
    <div className="flex items-start gap-2 rounded-2xl bg-black/[0.03] px-3 py-2.5 ring-1 ring-black/5 transition focus-within:ring-black/15">
      <div className="mt-1 text-black/60">{icon}</div>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none bg-transparent text-sm text-black outline-none placeholder:text-black/40"
      />
    </div>
  );
}
