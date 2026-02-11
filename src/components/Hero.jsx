import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
              className="text-5xl md:text-6xl font-bold text-light-text-primary leading-tight heading-accent"
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
              <button className="btn-primary group flex items-center justify-center sm:justify-start gap-2 bg-light-text-primary hover:bg-[#0B1220] hover:shadow-lg hover:shadow-[#FDE68A]/20 hover:scale-105">
                Start Free{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="btn-ghost hover:bg-[#FDE68A]/10 hover:border-[#FDE68A]/60 hover:text-light-text-primary">
                View Plans
              </button>
            </motion.div>

            {/* Mini Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-12 border-t-2 border-[#FDE68A]/30"
            >
              <div>
                <p className="text-3xl font-bold text-light-text-primary">
                  4.9/5
                </p>
                <p className="text-sm text-light-text-muted">Avg Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-light-text-primary">
                  10k+
                </p>
                <p className="text-sm text-light-text-muted">Sessions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-light-text-primary">
                  500+
                </p>
                <p className="text-sm text-light-text-muted">Interviewers</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-light-surface border border-light-border rounded-2xl p-6 shadow-xl">
              {/* Mock Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-light-gray-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-light-gray-400"></div>
                  <div className="w-3 h-3 rounded-full bg-light-gray-400"></div>
                  <div className="w-3 h-3 rounded-full bg-light-gray-400"></div>
                </div>
                <span className="text-xs font-medium text-light-text-muted">
                  ColloQ Dashboard
                </span>
              </div>

              {/* Mock Content Grid */}
              <div className="space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-light-bg rounded-lg p-3 border border-light-gray-200">
                    <p className="text-xs text-light-text-muted mb-1">
                      Interviews Completed
                    </p>
                    <p className="text-2xl font-bold text-light-text-primary">
                      12
                    </p>
                  </div>
                  <div className="bg-light-bg rounded-lg p-3 border border-light-gray-200">
                    <p className="text-xs text-light-text-muted mb-1">
                      Avg Score
                    </p>
                    <p className="text-2xl font-bold text-light-text-primary">
                      87%
                    </p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-light-bg rounded-lg p-4 border border-light-gray-200 h-32 flex flex-col justify-end">
                  <div className="flex items-end gap-1 h-16">
                    {[40, 60, 55, 75, 85, 70, 80].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-light-gray-400 rounded-t opacity-40 hover:opacity-60 transition-opacity"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Session Info */}
                <div className="bg-light-bg rounded-lg p-3 border border-light-gray-200">
                  <p className="text-xs text-light-text-muted mb-2">
                    Recent Session
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-light-text-primary">
                        React Interview
                      </p>
                      <p className="text-xs text-light-text-muted">
                        with John Smith
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-light-text-primary bg-light-gray-100 px-2 py-1 rounded">
                      90%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-light-surface border-2 border-[#FDE68A]/40 rounded-lg p-4 shadow-lg shadow-[#FDE68A]/20 max-w-xs hidden md:block"
            >
              <p className="text-xs text-light-text-muted mb-2">
                Next Scheduled
              </p>
              <p className="text-sm font-semibold text-light-text-primary">
                Systems Design
              </p>
              <p className="text-xs text-light-text-muted">Today at 3:00 PM</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
