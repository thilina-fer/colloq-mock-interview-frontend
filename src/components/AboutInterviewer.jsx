import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle2 } from "lucide-react";

export default function AboutInterviewer() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn by Helping Candidates",
      description:
        "Make competitive rates while mentoring the next generation of professionals.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description:
        "Set your own hours and interview when it works best for you.",
    },
    {
      icon: CheckCircle2,
      title: "Verified Profiles",
      description:
        "Build your professional reputation with verified credentials and reviews.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="interviewers" className="py-20 md:py-28 bg-light-bg">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light-text-primary mb-4 heading-accent">
            For Experienced Interviewers
          </h2>
          <p className="text-lg text-light-text-muted max-w-2xl mx-auto">
            Turn your interviewing experience into a rewarding opportunity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Benefits Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="card-base"
                >
                  <div className="mb-4">
                    <Icon size={32} className="text-[#F59E0B]" />
                  </div>
                  <h3 className="text-xl font-semibold text-light-text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-light-text-muted text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Profile Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="card-base h-full"
          >
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-light-gray-200 border-4 border-light-border flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-light-gray-400"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-light-text-primary mb-1">
                Sarah Johnson
              </h4>
              <p className="text-sm text-light-text-muted mb-2">
                Senior Engineer at TechCorp
              </p>
              <div className="flex justify-center gap-2 mb-4">
                <span className="text-xs bg-light-gray-100 text-light-text-primary px-2 py-1 rounded">
                  React
                </span>
                <span className="text-xs bg-light-gray-100 text-light-text-primary px-2 py-1 rounded">
                  Node.js
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 border-t border-light-border pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-light-text-muted">Response Rate</span>
                <span className="font-semibold text-light-text-primary">
                  98%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-light-text-muted">Rating</span>
                <span className="font-semibold text-light-text-primary">
                  4.9/5
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-light-text-muted">Sessions Done</span>
                <span className="font-semibold text-light-text-primary">
                  342
                </span>
              </div>
            </div>

            <button className="btn-primary w-full mt-6">
              View Availability
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
