import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CandidateProfile from "../pages/CandidateProfile";
import InterviwerProfile from "../pages/InterviwerProfile";
import Login from "../pages/Login";
import AuthPage from "../pages/Auth ";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
        <Route path="/interviewer-profile" element={<InterviwerProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
