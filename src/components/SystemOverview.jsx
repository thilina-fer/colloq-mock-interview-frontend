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
      <div className="section-container">
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
                whileHover={{ y: -8 }}
                className="card-base text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-light-gray-100 rounded-lg">
                    <Icon size={32} className="text-light-text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-light-text-primary mb-2">
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
