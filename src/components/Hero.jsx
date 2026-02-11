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
    <section className="py-20 md:py-28 bg-steel-bg">
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
              className="text-5xl md:text-6xl font-bold text-steel-text-primary leading-tight"
            >
              Ace Your Next Interview with Realistic Mock Sessions
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-steel-text-muted max-w-xl"
            >
              Practice with real interviewers, get AI-powered feedback, and
              track your progress with detailed analytics.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button className="btn-primary group flex items-center justify-center sm:justify-start gap-2">
                Start Free{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="btn-ghost">View Plans</button>
            </motion.div>

            {/* Mini Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-12 border-t border-steel-border"
            >
              <div>
                <p className="text-3xl font-bold text-steel-text-primary">
                  4.9/5
                </p>
                <p className="text-sm text-steel-text-muted">Avg Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-steel-text-primary">
                  10k+
                </p>
                <p className="text-sm text-steel-text-muted">Sessions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-steel-text-primary">
                  500+
                </p>
                <p className="text-sm text-steel-text-muted">Interviewers</p>
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
            <div className="bg-steel-surface border border-steel-border rounded-2xl p-6 shadow-xl">
              {/* Mock Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-steel-soft-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-steel-soft-4"></div>
                  <div className="w-3 h-3 rounded-full bg-steel-soft-4"></div>
                  <div className="w-3 h-3 rounded-full bg-steel-soft-4"></div>
                </div>
                <span className="text-xs font-medium text-steel-text-muted">
                  ColloQ Dashboard
                </span>
              </div>

              {/* Mock Content Grid */}
              <div className="space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-steel-bg rounded-lg p-3 border border-steel-soft-2">
                    <p className="text-xs text-steel-text-muted mb-1">
                      Interviews Completed
                    </p>
                    <p className="text-2xl font-bold text-steel-text-primary">
                      12
                    </p>
                  </div>
                  <div className="bg-steel-bg rounded-lg p-3 border border-steel-soft-2">
                    <p className="text-xs text-steel-text-muted mb-1">
                      Avg Score
                    </p>
                    <p className="text-2xl font-bold text-steel-text-primary">
                      87%
                    </p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-steel-bg rounded-lg p-4 border border-steel-soft-2 h-32 flex flex-col justify-end">
                  <div className="flex items-end gap-1 h-16">
                    {[40, 60, 55, 75, 85, 70, 80].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-steel-soft-4 rounded-t opacity-40 hover:opacity-60 transition-opacity"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Session Info */}
                <div className="bg-steel-bg rounded-lg p-3 border border-steel-soft-2">
                  <p className="text-xs text-steel-text-muted mb-2">
                    Recent Session
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-steel-text-primary">
                        React Interview
                      </p>
                      <p className="text-xs text-steel-text-muted">
                        with John Smith
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-steel-soft-6 bg-steel-soft-1 px-2 py-1 rounded">
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
              className="absolute -bottom-6 -left-6 bg-steel-surface border border-steel-border rounded-lg p-4 shadow-lg max-w-xs hidden md:block"
            >
              <p className="text-xs text-steel-text-muted mb-2">
                Next Scheduled
              </p>
              <p className="text-sm font-semibold text-steel-text-primary">
                Systems Design
              </p>
              <p className="text-xs text-steel-text-muted">Today at 3:00 PM</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
