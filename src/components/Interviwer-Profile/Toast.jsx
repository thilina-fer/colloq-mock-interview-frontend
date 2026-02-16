import React, { useEffect } from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

export default function Toast({ toast, setToast }) {
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg bg-white border border-[#E2E8F0] animate-toastin min-w-[200px]`}
      >
        {icons[toast.type] || icons.info}
        <span className="text-[#0F172A] text-sm font-medium">
          {toast.message}
        </span>
      </div>
    </div>
  );
}
