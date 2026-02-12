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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light-text-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-light-text-muted max-w-2xl mx-auto mb-8">
            Choose the plan that works best for you. Always flexible to change
            or upgrade.
          </p>

          {/* Toggle - Themed Amber */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!isYearly ? "text-light-text-primary" : "text-light-text-muted"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                isYearly ? "bg-amber-500" : "bg-gray-200"
              }`}
            >
              <motion.div
                layout
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm ${
                  isYearly ? "left-7" : "left-1"
                }`}
              ></motion.div>
            </button>
            <span
              className={`text-sm font-medium ${isYearly ? "text-light-text-primary" : "text-light-text-muted"}`}
            >
              Yearly{" "}
              <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full ml-1">
                Save 17%
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
                  ? {
                      y: -12,
                      boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.2)",
                    }
                  : { y: -8, borderColor: "rgb(254, 243, 199)" }
              }
              className={`relative flex flex-col h-full p-8 rounded-2xl bg-white transition-all duration-300 border-2 ${
                plan.highlighted
                  ? "border-amber-400 lg:scale-105 shadow-xl shadow-amber-900/5 z-10"
                  : "border-amber-50 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-amber-500 text-white text-[10px] tracking-widest font-black px-4 py-1 rounded-full uppercase">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3
                className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-amber-600" : "text-light-text-primary"}`}
              >
                {plan.name}
              </h3>
              <p className="text-light-text-muted text-sm mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-5xl font-bold ${plan.highlighted ? "text-slate-900" : "text-light-text-primary"}`}
                  >
                    $
                    {plan.price === 0
                      ? "Free"
                      : isYearly
                        ? plan.yearlyPrice
                        : plan.price}
                  </span>
                  {plan.price !== 0 && (
                    <span className="text-light-text-muted font-medium">
                      /{isYearly ? "year" : "month"}
                    </span>
                  )}
                </div>
              </div>

              {/* CTA Button - Themed */}
              <button
                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 mb-8 shadow-sm ${
                  plan.highlighted
                    ? "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100"
                }`}
              >
                {plan.cta}
              </button>

              {/* Features List */}
              <div className="space-y-4 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-3 items-start">
                    <Check
                      size={18}
                      className={`flex-shrink-0 mt-1 ${plan.highlighted ? "text-amber-500" : "text-amber-400"}`}
                    />
                    <span className="text-slate-600 text-sm leading-tight">
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
