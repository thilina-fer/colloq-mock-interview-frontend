import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CandidateProfile from "../pages/CandidateProfile";
import InterviwerProfile from "../pages/InterviwerProfile";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
        <Route path="/interviewer-profile" element={<InterviwerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
