import { motion } from "framer-motion";
import { Zap, Calendar, Wifi, BarChart3 } from "lucide-react";

export default function SystemOverview() {
  const components = [
    {
      icon: Zap,
      title: "Matching Engine",
      description:
        "Intelligent algorithm connects candidates with the perfect interviewer match.",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Real-time availability syncing for seamless booking across time zones.",
    },
    {
      icon: Wifi,
      title: "Mock Session Room",
      description:
        "Premium video platform with screen sharing, recording, and latency-free calls.",
    },
    {
      icon: BarChart3,
      title: "Feedback & Analytics",
      description:
        "Comprehensive performance analytics with AI-generated insights and improvements.",
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
    <section className="py-20 md:py-28 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light-text-primary mb-4">
            How ColloQ Works
          </h2>
          <p className="text-lg text-light-text-muted max-w-2xl mx-auto">
            A seamless platform built on cutting-edge technology to deliver the
            best interview experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {components.map((component, index) => {
            const Icon = component.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  borderColor: "rgb(251, 191, 36)", // amber-400
                  boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.15)"
                }}
                // Themed card base
                className="bg-white border-2 border-amber-50 p-8 rounded-2xl text-center transition-all duration-300 shadow-sm"
              >
                <div className="flex justify-center mb-6">
                  {/* Icon Container with Amber Theme */}
                  <div className="p-4 bg-amber-50 rounded-2xl">
                    <Icon size={32} className="text-amber-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-light-text-primary mb-3">
                  {component.title}
                </h3>
                <p className="text-sm text-light-text-muted leading-relaxed">
                  {component.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}