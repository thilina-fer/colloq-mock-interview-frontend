import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Helper component for the count-up effect
const Counter = ({ target, duration = 2, decimals = 0, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1,
      );

      const currentCount = progress * target;
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-light-bg">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-light-text-primary leading-tight"
            >
              Ace Your Next Interview with Realistic Mock Sessions
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-light-text-muted max-w-xl"
            >
              Practice with real interviewers, get AI-powered feedback, and
              track your progress with detailed analytics.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button className="btn-primary group flex items-center justify-center sm:justify-start gap-3">
                Start Free
                <span className="p-2 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight size={18} className="text-black" />
                </span>
              </button>
              <button className="btn-ghost">View Plans</button>
            </motion.div>

            {/* Mini Stats with Count-up Effect */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-12 border-t border-light-border"
            >
              <div>
                <p className="text-3xl font-bold text-light-text-primary">
                  <Counter target={4.9} decimals={1} suffix="/5" />
                </p>
                <p className="text-sm text-light-text-muted">Avg Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-light-text-primary">
                  <Counter target={10} suffix="k+" />
                </p>
                <p className="text-sm text-light-text-muted">Sessions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-light-text-primary">
                  <Counter target={500} suffix="+" />
                </p>
                <p className="text-sm text-light-text-muted">Interviewers</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            animate={{ y: [0, -12, 0] }}
            className="relative"
          >
            <div className="absolute -left-8 -top-8 w-56 h-56 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 opacity-70 blur-3xl pointer-events-none"></div>
            <img
              src="https://i.pinimg.com/736x/b2/b7/b3/b2b7b3a7943f5bf7d10f61a5b67c4e89.jpg"
              alt="ColloQ Interview Platform"
              className="w-full h-auto max-h-96 rounded-2xl shadow-xl border border-light-border object-cover transition-all duration-300 relative"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
