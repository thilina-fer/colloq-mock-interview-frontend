import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ColloQLogo from "./ColloQLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Fixed: Changed to useEffect for scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    "Features",
    "Interviewers",
    "Candidates",
    "Pricing",
    "Reviews",
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm"
          : "bg-white"
      }`}
    >
      {/* The "grid grid-cols-3" approach ensures the middle div is 
        mathematically centered regardless of the logo or button widths.
      */}
      <div className="section-container py-4 grid grid-cols-2 lg:grid-cols-3 items-center">
        {/* 1. Left: Logo */}
        <div className="flex justify-start">
          <ColloQLogo />
        </div>

        {/* 2. Middle: Links (Hidden on mobile) */}
        <div className="hidden lg:flex justify-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-slate-600 hover:text-amber-600 font-medium text-sm transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* 3. Right: Buttons */}
        <div className="flex gap-3 items-center justify-end">
          <button className="text-slate-600 hover:text-amber-600 text-sm font-medium hidden sm:block px-4 py-2 transition-colors">
            Sign In
          </button>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md shadow-amber-200 transition-all transform active:scale-95">
            Start Free
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
