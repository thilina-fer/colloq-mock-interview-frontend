import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ColloQLogo from "./ColloQLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          ? "bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm py-2"
          : "bg-white py-3 md:py-4"
      }`}
    >
      <div className="section-container grid grid-cols-2 lg:grid-cols-3 items-center">
        {/* 1. Logo with Scroll-Shrink effect */}
        <div className="flex justify-start items-center">
          <motion.div
            animate={{ scale: scrolled ? 0.8 : 0.95 }} // Desktop eke scroll weddi thawa podi wenawa
            transition={{ duration: 0.3 }}
            className="origin-left scale-[0.85] md:scale-100" // Mobile ekedi default ekatath wada podi kala
          >
            <ColloQLogo />
          </motion.div>
        </div>

        {/* 2. Middle: Links (Hidden on mobile) */}
        <div className="hidden lg:flex justify-center gap-6 xl:gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-slate-600 hover:text-amber-600 font-medium text-xs xl:text-sm transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* 3. Right: Buttons & Mobile Toggle */}
        <div className="flex gap-2 md:gap-3 items-center justify-end">
          {/* Desktop view buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="text-slate-600 hover:text-amber-600 text-xs xl:text-sm font-medium px-3 py-2 transition-colors">
              Sign In
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 xl:px-5 py-2 rounded-full text-xs xl:text-sm font-bold shadow-md shadow-amber-200 transition-all transform active:scale-95">
              Start Free
            </button>
          </div>

          {/* Mobile Menu Button - Responsive size */}
          <button
            className="lg:hidden p-1.5 text-slate-600 hover:text-amber-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={22} className="md:size-6" />
            ) : (
              <Menu size={22} className="md:size-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-amber-100 overflow-hidden"
          >
            <div className="flex flex-col p-5 space-y-3">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-slate-600 hover:text-amber-600 font-medium text-sm md:text-base py-2" // Mobile letters size
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}

              <div className="pt-3 flex flex-col gap-2">
                <button className="w-full text-center py-2.5 text-slate-600 font-medium border border-slate-100 rounded-lg text-sm">
                  Sign In
                </button>
                <button className="w-full bg-amber-500 text-white py-3.5 rounded-lg font-bold text-sm shadow-md">
                  Start Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
