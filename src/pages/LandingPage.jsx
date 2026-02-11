import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AboutInterviewer from "../components/AboutInterviewer";
import AboutCandidate from "../components/AboutCandidate";
import Reviews from "../components/Reviews";
import Pricing from "../components/Pricing";
import SystemOverview from "../components/SystemOverview";
import Footer from "../components/Footer";

export default function LandingPage() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-steel-bg">
      <Navbar />
      <Hero />
      <Features />
      <AboutInterviewer />
      <AboutCandidate />
      <Reviews />
      <Pricing />
      <SystemOverview />
      <Footer />
    </div>
  );
}
