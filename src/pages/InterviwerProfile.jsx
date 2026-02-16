import React, { useState } from "react";
import NavbarTop from "../components/Interviwer-Profile/NavbarTop";
import SidebarProfileCard from "../components/Interviwer-Profile/SidebarProfileCard";
import StatsRow from "../components/Interviwer-Profile/StatsRow";
import JoinAsCandidateCard from "../components/Interviwer-Profile/JoinAsCandidateCard";
import CandidateRequests from "../components/Interviwer-Profile/CandidateRequests";
import UpcomingInterviews from "../components/Interviwer-Profile/UpcomingInterviews";
import MyWalletPanel from "../components/Interviwer-Profile/MyWalletPanel";
import ProfileEditModal from "../components/Interviwer-Profile/ProfileEditModal";
import Toast from "../components/Interviwer-Profile/Toast";

const pageBg = "bg-[#F8FAFC] min-h-screen";

export default function InterviwerProfile() {
  const [openWallet, setOpenWallet] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className={pageBg + " flex flex-col min-h-screen"}>
      <NavbarTop
        onWallet={() => setOpenWallet(true)}
        onEdit={() => setOpenEdit(true)}
      />
      <div className="flex-1 flex flex-col md:flex-row gap-6 max-w-7xl w-full mx-auto px-2 md:px-6 py-4 md:py-8">
        {/* Sidebar */}
        <aside className="md:w-1/4 w-full mb-4 md:mb-0">
          <SidebarProfileCard />
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          <StatsRow />
          <JoinAsCandidateCard />
          <CandidateRequests setToast={setToast} />
          <UpcomingInterviews />
        </main>
      </div>
      {/* Wallet Modal Popup */}
      <MyWalletPanel
        open={openWallet}
        onClose={() => setOpenWallet(false)}
        setToast={setToast}
        modal
      />
      <ProfileEditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        setToast={setToast}
      />
      <Toast toast={toast} setToast={setToast} />
    </div>
  );
}
