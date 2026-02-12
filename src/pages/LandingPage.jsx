import { useEffect, useState } from "react"; // useState එකතු කළා
import { AnimatePresence } from "framer-motion"; // AnimatePresence එකතු කළා
import Navbar from "../components/LandinPage/Navbar";
import Hero from "../components/LandinPage/Hero";
import AboutInterviewer from "../components/LandinPage/AboutInterviewer";
import AboutCandidate from "../components/LandinPage/AboutCandidate";
import Reviews from "../components/LandinPage/Reviews";
import Pricing from "../components/LandinPage/Pricing";
import SystemOverview from "../components/LandinPage/SystemOverview";
import Footer from "../components/LandinPage/Footer";
import LoadingScreen from "../components/LoadingScreen"; // LoadingScreen import කළා
import { Feather } from "lucide-react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true); // Loading state එක

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";

    // තත්පර 1.5 කට පසු Loading screen එක ඉවත් කිරීමට
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* --- ColloQ Landing Loading Screen --- */
          <LoadingScreen key="loader" message="Welcome to ColloQ..." />
        ) : (
          /* --- Landing Page Content --- */
          <div key="content" className="min-h-screen bg-light-bg">
            <Navbar />
            <Hero />
            <div className="flex justify-center py-8 opacity-20">
              <Feather className="w-8 h-8 rotate-45" />
            </div>
            <AboutInterviewer />
            <AboutCandidate />
            <Reviews />
            <Pricing />
            <SystemOverview />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
