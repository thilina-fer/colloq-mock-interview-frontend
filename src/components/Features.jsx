import { motion } from "framer-motion";
import {
  Brain,
  Users,
  BarChart3,
  Video,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI Feedback & Rubric Scoring",
      description:
        "Get instant AI-powered feedback with detailed rubric scoring on every mock session.",
    },
    {
      icon: Users,
      title: "Real Interviewer Sessions",
      description:
        "Practice with experienced interviewers from top tech companies worldwide.",
    },
    {
      icon: BarChart3,
      title: "Candidate Dashboard",
      description:
        "Track your progress, view detailed analytics, and identify areas for improvement.",
    },
    {
      icon: Video,
      title: "Recording & Transcripts",
      description:
        "Review your session recordings with AI-generated transcripts and timestamps.",
    },
    {
      icon: BookOpen,
      title: "Role-Based Question Banks",
      description:
        "Access curated question banks for different roles and experience levels.",
    },
    {
      icon: TrendingUp,
      title: "Personalized Improvement Plan",
      description:
        "Get targeting recommendations based on your performance across sessions.",
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
    <section id="features" className="py-20 md:py-28 bg-light-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light-text-primary mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-light-text-muted max-w-2xl mx-auto">
            Comprehensive tools designed to help candidates and interviewers
            thrive in mock interview sessions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                // Mouse hover animations
                whileHover={{
                  y: -10,
                  borderColor: "rgb(245, 158, 11)", // amber-500
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group bg-white border-2 border-amber-50 p-8 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 cursor-default"
              >
                <div className="mb-6 relative">
                  {/* Icon container with hover animation */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-amber-50 p-4 rounded-2xl inline-flex items-center justify-center transition-colors group-hover:bg-amber-100"
                  >
                    <Icon 
                      size={28} 
                      className="text-slate-400 group-hover:text-amber-600 transition-colors duration-300" 
                    />
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold text-light-text-primary mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Optional: Simple yellow bar that grows on hover */}
                <div className="mt-6 h-1 w-0 bg-amber-500 rounded-full transition-all duration-500 group-hover:w-12"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}