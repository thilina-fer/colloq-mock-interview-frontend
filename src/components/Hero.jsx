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

          {/* Right Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            animate={{ y: [0, -12, 0] }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(253, 230, 138, 0.3)" }}
            className="relative cursor-pointer"
          >
            <img
              src="https://i.pinimg.com/736x/b2/b7/b3/b2b7b3a7943f5bf7d10f61a5b67c4e89.jpg"
              alt="ColloQ Interview Platform"
              className="w-full h-auto max-h-96 rounded-2xl shadow-xl border border-light-border object-cover transition-all duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
