// src/components/auth/Field.jsx
import React from "react";

export default function Field({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
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
