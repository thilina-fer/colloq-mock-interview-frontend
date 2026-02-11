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
          <h2 className="text-4xl md:text-5xl font-bold text-light-text-primary mb-4">
            For Experienced Interviewers
          </h2>
          <p className="text-lg text-light-text-muted max-w-2xl mx-auto">
            Turn your interviewing experience into a rewarding opportunity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Benefits Cards - Yellow Themed */}
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
                  whileHover={{ y: -8, borderColor: "#f59e0b" }}
                  className="bg-white border-2 border-amber-100 p-8 rounded-2xl shadow-sm transition-colors duration-300"
                >
                  <div className="mb-4 bg-amber-50 w-12 h-12 flex items-center justify-center rounded-xl">
                    <Icon size={24} className="text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-light-text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-light-text-muted text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Profile Preview Card - Gold/Yellow Theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-amber-200 rounded-3xl p-8 h-full shadow-lg shadow-amber-900/5 relative overflow-hidden"
          >
            {/* Subtle Yellow Glow in background */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

            {/* Avatar */}
            <div className="flex justify-center mb-6 relative">
              <div className="w-24 h-24 rounded-full bg-amber-50 border-4 border-amber-100 flex items-center justify-center overflow-hidden">
                <div className="w-20 h-20 rounded-full bg-amber-200"></div>
              </div>
              <div className="absolute bottom-0 right-[35%] bg-amber-500 text-white rounded-full p-1 border-2 border-white">
                <CheckCircle2 size={14} />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center mb-6">
              <h4 className="text-xl font-bold text-light-text-primary mb-1">
                Sarah Johnson
              </h4>
              <p className="text-sm text-amber-700 font-medium mb-2">
                Senior Engineer at TechCorp
              </p>
              <div className="flex justify-center gap-2 mb-4">
                <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2 py-1 rounded-md font-medium">
                  React
                </span>
                <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2 py-1 rounded-md font-medium">
                  Node.js
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 border-t border-amber-50 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-light-text-muted font-medium">
                  Response Rate
                </span>
                <span className="font-bold text-amber-600">98%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-light-text-muted font-medium">
                  Rating
                </span>
                <span className="font-bold text-amber-600">4.9/5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-light-text-muted font-medium">
                  Sessions Done
                </span>
                <span className="font-bold text-amber-600">342</span>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-md shadow-amber-200">
              View Availability
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
  