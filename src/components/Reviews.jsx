import { motion } from "framer-motion";
import StarRating from "./StarRating";
import { Lock, UserCheck, XCircle } from "lucide-react";

export default function Reviews() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Candidate - Software Engineer",
      rating: 5,
      comment:
        "ColloQ helped me get my dream job at Google. The feedback was incredibly detailed!",
    },
    {
      name: "Maria Lopez",
      role: "Interviewer - Tech Lead",
      rating: 5,
      comment:
        "Great platform for sharing my knowledge. The scheduling is super flexible.",
    },
    {
      name: "James Wilson",
      role: "Candidate - Product Manager",
      rating: 5,
      comment:
        "Practice sessions felt so real. The transcripts helped me review my mistakes.",
    },
    {
      name: "Priya Patel",
      role: "Candidate - Full Stack Dev",
      rating: 5,
      comment:
        "Improved my technical communication significantly. Worth every penny!",
    },
    {
      name: "David Kim",
      role: "Interviewer - Engineering Manager",
      rating: 5,
      comment:
        "Professional platform with excellent candidate quality. Highly recommend.",
    },
    {
      name: "Sophie Laurent",
      role: "Candidate - Data Scientist",
      rating: 5,
      comment:
        "AI feedback was spot-on. Tracked my progress clearly with detailed analytics.",
    },
  ];

  const trustItems = [
    { icon: Lock, label: "Secure Payments" },
    { icon: UserCheck, label: "Verified Interviewers" },
    { icon: XCircle, label: "Cancel Anytime" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <section id="reviews" className="py-20 md:py-28 bg-steel-bg">
      <div className="section-container">
        {/* Header with Overall Rating */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-steel-text-primary mb-4">
              Loved by Candidates and Interviewers
            </h2>
            <p className="text-lg text-steel-text-muted mb-6">
              Real reviews from real users who have transformed their interview
              journey on ColloQ.
            </p>
          </motion.div>

          {/* Overall Rating Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="card-base text-center hidden lg:block"
          >
            <p className="text-6xl font-bold text-steel-text-primary mb-3">
              4.9
            </p>
            <p className="text-steel-text-muted mb-4">out of 5 stars</p>
            <div className="flex justify-center mb-4">
              <StarRating rating={5} size={24} />
            </div>
            <p className="text-sm text-steel-text-muted">
              Based on 2,847 reviews
            </p>
          </motion.div>
        </div>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
              className="card-base flex flex-col"
            >
              {/* Stars */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} size={16} />
              </div>

              {/* Comment */}
              <p className="text-steel-text-primary font-medium mb-6 flex-grow">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="border-t border-steel-border pt-4">
                <p className="font-semibold text-steel-text-primary text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-steel-text-muted">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-steel-surface border border-steel-border rounded-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Icon size={32} className="text-steel-text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-steel-text-primary">
                      {item.label}
                    </p>
                    <p className="text-sm text-steel-text-muted">
                      {item.label === "Secure Payments" &&
                        "Industry-standard encryption"}
                      {item.label === "Verified Interviewers" &&
                        "All backgrounds verified"}
                      {item.label === "Cancel Anytime" &&
                        "No long-term commitment"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
