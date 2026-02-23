// src/components/auth/Textarea.jsx
import React from "react";

export default function Textarea({
  icon,
  placeholder,
  value,
  onChange,
  rows = 4,
}) {
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
    