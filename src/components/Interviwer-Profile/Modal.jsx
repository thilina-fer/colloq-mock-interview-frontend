import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "max-w-lg",
}) {
  const overlayRef = useRef();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadein"
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl border border-[#E2E8F0] w-full ${size} mx-2 relative animate-slideup`}
      >
        <button
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-[#F8FAFC] transition"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#64748B]" />
        </button>
        {title && (
          <div className="text-lg font-bold text-[#0F172A] px-6 pt-6 pb-2">
            {title}
          </div>
        )}
        <div className="px-6 pb-6 pt-2">{children}</div>
      </div>
    </div>
  );
}
