import { useEffect } from "react";
import Navbar from "../components/LandinPage/Navbar";
import Hero from "../components/LandinPage/Hero";
import AboutInterviewer from "../components/LandinPage/AboutInterviewer";
import AboutCandidate from "../components/LandinPage/AboutCandidate";
import Reviews from "../components/LandinPage/Reviews";
import Pricing from "../components/LandinPage/Pricing";
import SystemOverview from "../components/LandinPage/SystemOverview";
import Footer from "../components/LandinPage/Footer";
import { Feather } from "lucide-react";

export default function LandingPage() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-light-bg">
      <Navbar />
      <Hero />
      <Feather />
      <AboutInterviewer />
      <AboutCandidate />
      <Reviews />
      <Pricing />
      <SystemOverview />
      <Footer />
    </div>
  );
}
