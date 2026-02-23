// src/components/auth/AuthCard.jsx
import React from "react";
import { ArrowRight, CheckCircle2, Mail, Lock } from "lucide-react";
import Field from "./Field";

export default function AuthCard({
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
