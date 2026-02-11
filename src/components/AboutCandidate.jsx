import { motion } from "framer-motion";
import { Search, Calendar, Zap, TrendingUp } from "lucide-react";

export default function AboutCandidate() {
  const steps = [
    {
      icon: Search,
      title: "Pick Your Role",
      description:
        "Select the position and experience level you want to practice for.",
    },
    {
      icon: Calendar,
      title: "Book a Mock",
      description:
        "Schedule a session with an available interviewer at your preferred time.",
    },
    {
      icon: Zap,
      title: "Get Feedback",
      description:
        "Receive AI-powered feedback and detailed rubric scoring on your performance.",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description:
        "Monitor improvements over time with analytics and personalized insights.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="candidates" className="py-20 md:py-28 bg-light-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light-text-primary mb-4">
            Your Candidate Journey
          </h2>
          <p className="text-lg text-light-text-muted max-w-2xl mx-auto">
            Four simple steps to ace your next interview.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8,
                    borderColor: "rgb(251, 191, 36)", // amber-400
                    boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.1)"
                  }}
                  // Yellow themed card base
                  className="bg-white border-2 border-amber-50 p-8 rounded-2xl h-full transition-all duration-300 shadow-sm"
                >
                  {/* Step Number - Yellow Theme */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-400 flex items-center justify-center">
                      <span className="text-lg font-bold text-amber-600">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Icon - Yellow Theme */}
                  <div className="mb-4">
                    <Icon size={32} className="text-amber-500" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-light-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-light-text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connector Line - Amber Tint */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-amber-100 z-0"></div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}