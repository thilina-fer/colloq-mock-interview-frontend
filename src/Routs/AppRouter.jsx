import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CandidateProfile from "../pages/CandidateProfile";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter; 
