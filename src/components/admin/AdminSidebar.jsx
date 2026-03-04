import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { NAV_ITEMS } from "./data";

const ICON_MAP = {
  dashboard: LayoutDashboard,
  interviewers: Briefcase,
  candidates: Users,
  payments: CreditCard,
};

function NavItem({ item, active, onClick, pendingCount }) {
  const Icon = ICON_MAP[item.key] ?? LayoutDashboard;
  const isActive = active === item.key;

  return (
    <button
      onClick={() => onClick(item.key)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <Icon size={17} className="shrink-0" />
      <span className="flex-1 text-left">{item.label}</span>
      {item.key === "interviewers" && pendingCount > 0 && (
        <span className="text-[10px] font-semibold bg-amber-500 text-white rounded-full px-1.5 py-0.5 leading-none">
          {pendingCount}
        </span>
      )}
    </button>
  );
}

export default function AdminSidebar({ activeNav, onNav, pendingCount }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNav = (key) => {
    onNav(key);
    setDrawerOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100">
        <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">CQ</span>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-none">ColloQ</p>
          <p className="text-[10px] text-gray-400 font-medium">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.key}
            item={item}
            active={activeNav}
            onClick={handleNav}
            pendingCount={pendingCount}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
            A
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">
              Admin
            </p>
            <p className="text-[10px] text-gray-400 truncate">
              admin@colloq.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm"
        aria-label="Open menu"
      >
        <Menu size={18} className="text-gray-700" />
      </button>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-56 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-200 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-4 right-3 w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center"
          aria-label="Close menu"
        >
          <X size={14} className="text-gray-600" />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
        <SidebarContent />
      </aside>
    </>
  );
}
