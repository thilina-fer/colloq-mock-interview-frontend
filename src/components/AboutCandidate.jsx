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
      <div className="section-container">
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
              <div key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="card-base h-full"
                >
                  {/* Step Number */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-light-gray-200 border-2 border-light-text-primary flex items-center justify-center">
                      <span className="text-lg font-bold text-light-text-primary">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <Icon size={32} className="text-light-text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-light-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-light-text-muted text-sm">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block h-1 bg-light-gray-200 mt-6 -mx-6"></div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
