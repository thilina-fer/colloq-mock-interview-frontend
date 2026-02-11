import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useState(() => {
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
          ? "bg-steel-surface/95 backdrop-blur-md border-b border-steel-border shadow-sm"
          : "bg-steel-surface"
      }`}
    >
      <div className="section-container py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-steel-text-primary">
          <span className="bg-gradient-to-r from-steel-text-primary to-steel-soft-6 bg-clip-text text-transparent">
            ColloQ
          </span>
        </div>

        {/* Middle Links */}
        <div className="hidden lg:flex gap-8 ml-12">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-steel-text-muted hover:text-steel-text-primary font-medium text-sm transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="flex gap-3 items-center ml-auto">
          <button className="btn-ghost text-sm hidden sm:block">Sign In</button>
          <button className="btn-primary text-sm">Start Free</button>
        </div>
      </div>
    </motion.nav>
  );
}
