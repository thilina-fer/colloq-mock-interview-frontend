import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: 0,
      yearlyPrice: 0,
      description: "Perfect for exploring the platform",
      features: [
        "Access to practice questions",
        "Candidate community forum",
        "Limited mock interview sessions",
        "Basic feedback report",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: 29,
      yearlyPrice: 290,
      description: "Most popular for serious candidates",
      features: [
        "Unlimited mock sessions",
        "Real interviewer sessions (5/month)",
        "AI-powered feedback & scoring",
        "Session recordings & transcripts",
        "Personalized improvement plan",
        "Priority interviewer matching",
      ],
      cta: "Choose Plan",
      highlighted: true,
    },
    {
      name: "Premium",
      price: 79,
      yearlyPrice: 790,
      description: "For those serious about success",
      features: [
        "Everything in Pro",
        "Unlimited real interviewer sessions",
        "Dedicated success coach (1:1)",
        "Custom question bank",
        "Interview preparation bootcamp",
        "24/7 priority support",
      ],
      cta: "Choose Plan",
      highlighted: false,
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
    <section id="pricing" className="py-20 md:py-28 bg-light-surface">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light-text-primary mb-4 heading-accent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-light-text-muted max-w-2xl mx-auto mb-8">
            Choose the plan that works best for you. Always flexible to change
            or upgrade.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!isYearly ? "text-light-text-primary" : "text-light-text-muted"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                isYearly ? "bg-light-text-primary shadow-lg shadow-[#FDE68A]/30" : "bg-light-gray-200"
              }`}
            >
              <motion.div
                layout
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                  isYearly ? "left-7" : "left-1"
                }`}
              ></motion.div>
            </button>
            <span
              className={`text-sm font-medium ${isYearly ? "text-light-text-primary" : "text-light-text-muted"}`}
            >
              Yearly{" "}
              <span className="text-xs text-light-text-muted font-normal">
                (Save 17%)
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={
                plan.highlighted
                  ? { y: -12, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }
                  : { y: -8 }
              }
              className={`card-base relative flex flex-col h-full ${
                plan.highlighted
                  ? "lg:scale-105 lg:shadow-xl border-2 border-[#FDE68A]/40 shadow-xl shadow-[#FDE68A]/20"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-light-text-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-[#FDE68A]/30 border border-[#FDE68A]/40">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-light-text-primary mb-2">
                {plan.name}
              </h3>
              <p className="text-light-text-muted text-sm mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-light-text-primary">
                    $
                    {plan.price === 0
                      ? "Free"
                      : isYearly
                        ? plan.yearlyPrice
                        : plan.price}
                  </span>
                  {plan.price !== 0 && (
                    <span className="text-light-text-muted">
                      /{isYearly ? "year" : "month"}
                    </span>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 mb-8 ${
                  plan.highlighted ? "btn-primary" : "btn-ghost"
                }`}
              >
                {plan.cta}
              </button>

              {/* Features List */}
              <div className="space-y-4 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-3 items-start">
                    <Check
                      size={20}
                      className="text-light-text-primary flex-shrink-0 mt-0.5"
                    />
                    <span className="text-light-text-muted text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
