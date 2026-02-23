// src/pages/auth.jsx
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// import { ROLE, SPECIALIZATION_OPTIONS } from "../constants/auth";
import { ROLE, SPECIALIZATION_OPTIONS } from "../data/Auth ";
import RoleSwitcher from "../components/Auth/Roleswitcher";
import AuthCard from "../components/Auth/AuthCard";
import StepOneBasic from "../components/Auth/StepOneBasic";
import StepTwoProfessional from "../components/Auth/StepTwoProfessional.jsx";
import ColloQLogo from "../components/ColloQLogo.jsx";

const fadeSlide = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
  transition: { duration: 0.35, ease: "easeOut" },
};

export default function AuthPage() {
  const [role, setRole] = useState(ROLE.CANDIDATE);

  // Auth state
  const [auth, setAuth] = useState({ email: "", password: "" });
  const [isAuthed, setIsAuthed] = useState(false);

  // Interviewer multi-step
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
    setAuth({ email: "", password: "" });
  }

  function handleRoleChange(nextRole) {
    setRole(nextRole);
    if (nextRole !== ROLE.INTERVIEWER) resetInterviewerFlow();
  }

  function mockAuthenticate() {
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
        {/* ── BRANDING PANEL ── */}
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
          {/* Decorative circles */}
          <div className="absolute inset-0 opacity-[0.22]">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white" />
            <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white" />
          </div>

          {/* ✅ FULL HORIZONTAL + TEXT CENTER */}
          <div className="relative flex h-full min-h-0 flex-col justify-center items-center text-center px-8 py-10 lg:px-14">
            <div className="flex flex-col items-center text-center w-full max-w-xl">
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
                className="mt-4 w-full max-w-xl mx-auto text-base text-black/80 lg:text-lg"
              >
                {brandingCopy.subtitle}
              </motion.p>

              <div className="mt-8 space-y-4 w-full mx-auto">
                {brandingCopy.bullets.map((b) => (
                  <div
                    key={b}
                    className="flex items-start justify-center gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-black" />
                    <div className="text-base text-black/90 lg:text-lg text-center">
                      {b}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── FORM PANEL ── */}
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
                  <div className="leading-tight text-center">
                    <div>
                      <ColloQLogo />
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
                {/* Progress bar (Interviewer only) */}
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

            {/* Form body */}
            <div className="min-h-0 flex-1 overflow-hidden px-8 py-8 lg:px-14">
              <div className="h-full min-h-0">
                <AnimatePresence mode="wait">
                  {/* Candidate auth */}
                  {!isInterviewer && (
                    <motion.div
                      key="candidate-auth"
                      {...fadeSlide}
                      className="flex h-full w-full flex-col justify-center items-center min-h-0 text-center"
                    >
                      <AuthCard
                        roleLabel="Candidate"
                        auth={auth}
                        setAuth={setAuth}
                        onGoogle={mockAuthenticate}
                        onEmail={mockAuthenticate}
                        showSuccess={false}
                      />
                    </motion.div>
                  )}

                  {/* Interviewer auth */}
                  {isInterviewer && !isAuthed && (
                    <motion.div
                      key="interviewer-auth"
                      {...fadeSlide}
                      className="flex h-full w-full flex-col justify-center items-center min-h-0 text-center"
                    >
                      <AuthCard
                        roleLabel="Interviewer"
                        auth={auth}
                        setAuth={setAuth}
                        onGoogle={mockAuthenticate}
                        onEmail={mockAuthenticate}
                        showSuccess={false}
                      />
                    </motion.div>
                  )}

                  {/* Interviewer steps */}
                  {isInterviewer && isAuthed && (
                    <motion.div
                      key="interviewer-steps"
                      {...fadeSlide}
                      className="flex h-full w-full flex-col min-h-0 text-center items-center justify-center"
                    >
                      <div className="min-h-0 flex-1 overflow-hidden w-full">
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
                                specializationOptions={SPECIALIZATION_OPTIONS}
                                toggleSpecialization={toggleSpecialization}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Footer actions */}
                      <div className="mt-6 w-full shrink-0 border-t border-black/5 pt-5 flex items-center justify-between gap-3">
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
