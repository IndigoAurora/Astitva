import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  ChevronDown,
  FileText,
  ShieldCheck,
  Clock3,
  Cuboid,
  MoreVertical,
  Upload,
  CheckCircle2,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const CURRENT_USER_KEY = "astitvaCurrentUser";

function Dashboard() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [proofMenuOpen, setProofMenuOpen] = useState(false);

  /*
  =========================================================
  USER
  =========================================================
  */

  const [user, setUser] = useState({
    name: "User",
    email: "",
  });

  /*
  =========================================================
  LOAD CURRENT LOGGED-IN USER
  =========================================================
  */

  useEffect(() => {
    const savedUser =
      localStorage.getItem(CURRENT_USER_KEY);

    if (!savedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);

      if (parsedUser?.name) {
        setUser({
          name: parsedUser.name,
          email: parsedUser.email || "",
        });
      }
    } catch (error) {
      console.error(
        "Could not read logged-in user:",
        error
      );
    }
  }, []);

  /*
  =========================================================
  USER DISPLAY HELPERS
  =========================================================
  */

  const displayName =
    user.name?.trim() || "User";

  const firstName =
    displayName.split(" ")[0] || displayName;

  const userInitial =
    displayName.charAt(0).toUpperCase();

  /*
  =========================================================
  TEMPORARY SINGLE PROOF

  This is only here until Anshul's backend is connected.
  Later this data will come from the API.
  =========================================================
  */

  const proof = {
    name: "portfolio.pdf",
    size: "2.4 MB",
    hash: "8f2c...91ad",
    status: "Verified",
    date: "21 Aug 2026",
    time: "10:30 AM",
  };

  /*
  =========================================================
  NAVIGATION
  =========================================================
  */

  const handleLogout = () => {
    /*
      Remove the currently logged-in user.
    */

    localStorage.removeItem(
      CURRENT_USER_KEY
    );

    setProfileOpen(false);

    navigate("/login");
  };

  const handleStampWork = () => {
    navigate("/uploads");
  };

  const handleProofClick = () => {
    navigate("/certificate");
  };

  const handleProfile = () => {
    setProfileOpen((prev) => !prev);
    setProofMenuOpen(false);
  };

  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  return (
    <div className="flex min-h-screen bg-[#F7F3EB] text-[#17241F]">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />


      {/* =====================================================
          MAIN DASHBOARD AREA
      ===================================================== */}

      <div className="min-w-0 flex-1">

        {/* ===================================================
            TOP HEADER
        =================================================== */}

        <header className="flex h-[92px] items-center justify-between border-b border-[#DDD7CC] bg-[#FBF9F4] px-8 sm:px-10 lg:px-12">

          {/* =================================================
              HEADER LOGO
          ================================================= */}

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-5"
          >

            {/* Logo Mark */}

            <div
              className="
                flex
                h-[48px]
                w-[40px]
                shrink-0
                items-center
                justify-center
                border
                border-[#B58A4D]
                [clip-path:polygon(50%_0%,92%_22%,92%_76%,50%_100%,8%_76%,8%_22%)]
              "
            >
              <span className="font-serif text-[26px] text-[#B58A4D]">
                A
              </span>
            </div>


            {/* Brand */}

            <div className="text-left">

              <div className="text-[22px] font-medium tracking-[0.32em] text-[#173C34]">
                ASTITVA
              </div>

              <div className="mt-2 text-[8px] tracking-[0.32em] text-[#B58A4D]">
                PROOF OF CREATION
              </div>

            </div>

          </button>


          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <div className="hidden text-[17px] font-medium text-[#303A36] md:block">
            Dashboard
          </div>


          {/* =================================================
              PROFILE
          ================================================= */}

          <div className="relative">

            <button
              onClick={handleProfile}
              className="flex items-center gap-4"
            >

              {/* Welcome */}

              <span className="hidden text-[14px] text-[#68716C] sm:block">
                Welcome, {firstName}
              </span>


              {/* Profile Circle */}

              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B99152] font-serif text-[18px] text-white">
                {userInitial}
              </span>


              {/* Arrow */}

              <ChevronDown
                size={17}
                strokeWidth={1.5}
                className={`hidden text-[#68716C] transition-transform sm:block ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>


            {/* =================================================
                PROFILE DROPDOWN
            ================================================= */}

            {profileOpen && (
              <div className="absolute right-0 top-14 z-30 w-56 border border-[#DCD5CA] bg-[#FBF9F4] p-2 shadow-lg">

                {/* USER INFO */}

                <div className="border-b border-[#E3DDD3] px-4 py-3">

                  <p className="truncate text-[12px] font-medium text-[#263630]">
                    {displayName}
                  </p>

                  {user.email && (
                    <p className="mt-1 truncate text-[9px] text-[#8A918C]">
                      {user.email}
                    </p>
                  )}

                </div>


                {/* Dashboard */}

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/dashboard");
                  }}
                  className="w-full px-4 py-3 text-left text-[12px] text-[#34403A] transition hover:bg-[#F0ECE4]"
                >
                  Dashboard
                </button>


                {/* Account Settings */}

                <button
                  onClick={handleSettings}
                  className="w-full px-4 py-3 text-left text-[12px] text-[#34403A] transition hover:bg-[#F0ECE4]"
                >
                  Account settings
                </button>


                <div className="my-1 border-t border-[#E3DDD3]" />


                {/* Logout */}

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-[12px] text-[#8B5C3A] transition hover:bg-[#F0ECE4]"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </header>


        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <main className="mx-auto max-w-[1500px] px-8 py-11 sm:px-10 lg:px-14">

          {/* =================================================
              WELCOME SECTION
          ================================================= */}

          <section className="relative flex items-start justify-between gap-10">

            <div>

              {/* Small Label */}

              <p className="text-[11px] font-semibold tracking-[0.25em] text-[#9A7040]">
                YOUR WORKSPACE
              </p>


              {/* Main Heading */}

              <h1 className="mt-4 font-serif text-[44px] leading-[1.05] tracking-[-0.035em] text-[#173C34] sm:text-[50px] lg:text-[56px]">
                Welcome, {displayName}
              </h1>


              {/* Description */}

              <p className="mt-5 text-[15px] text-[#66706B]">
                Protect what you've created.
              </p>

            </div>


            {/* =================================================
                OWNERSHIP CARD
            ================================================= */}

            <div className="hidden h-[125px] w-[195px] border border-[#D7C5A9] bg-[#FBF8F0] sm:flex sm:flex-col sm:items-center sm:justify-center">

              <p className="text-[9px] tracking-[0.2em] text-[#9A7040]">
                YOUR CREATIONS
              </p>

              <p className="mt-2 font-serif text-[19px] text-[#A77A3F]">
                Your Proof
              </p>

              <p className="font-serif text-[16px] italic text-[#A77A3F]">
                Your Ownership
              </p>

            </div>

          </section>


          {/* =================================================
              STAMP NEW CREATION
          ================================================= */}

          <button
            onClick={handleStampWork}
            className="
              group
              mt-11
              flex
              w-full
              items-center
              justify-between
              border
              border-[#DDD6CA]
              bg-[#FCFAF6]
              px-7
              py-6
              text-left
              transition
              hover:border-[#BBA47E]
              hover:bg-[#F9F5EC]
            "
          >

            <div className="flex items-center gap-5">

              {/* Upload Icon */}

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[5px] bg-[#123E35] text-white transition group-hover:bg-[#1C5146]">

                <Upload
                  size={25}
                  strokeWidth={1.5}
                />

              </div>


              {/* Text */}

              <div>

                <p className="text-[16px] font-medium text-[#25332E]">
                  Stamp a new creation
                </p>

                <p className="mt-2 text-[12px] text-[#737A76]">
                  Upload your file and create a verifiable proof on the blockchain.
                </p>

              </div>

            </div>


            {/* Arrow */}

            <ArrowRight
              size={23}
              strokeWidth={1.5}
              className="text-[#A47B43] transition-transform group-hover:translate-x-1"
            />

          </button>


          {/* =================================================
              STATISTICS
          ================================================= */}

          <section className="mt-7 grid grid-cols-2 gap-5 lg:grid-cols-4">

            {/* TOTAL PROOFS */}

            <button
              onClick={handleProofClick}
              className="
                border
                border-[#E0DAD0]
                bg-[#FCFAF6]
                px-6
                py-6
                text-left
                transition
                hover:border-[#C8B895]
                hover:bg-[#FAF7F1]
              "
            >

              <div className="flex items-center justify-between">

                <FileText
                  size={24}
                  strokeWidth={1.4}
                  className="text-[#B08347]"
                />

                <span className="font-serif text-[26px] text-[#24352F]">
                  01
                </span>

              </div>

              <p className="mt-4 text-[12px] text-[#707873]">
                Total Proofs
              </p>

            </button>


            {/* VERIFIED */}

            <button
              onClick={handleProofClick}
              className="
                border
                border-[#E0DAD0]
                bg-[#FCFAF6]
                px-6
                py-6
                text-left
                transition
                hover:border-[#C8B895]
                hover:bg-[#FAF7F1]
              "
            >

              <div className="flex items-center justify-between">

                <ShieldCheck
                  size={24}
                  strokeWidth={1.4}
                  className="text-[#B08347]"
                />

                <span className="font-serif text-[26px] text-[#24352F]">
                  01
                </span>

              </div>

              <p className="mt-4 text-[12px] text-[#707873]">
                Verified
              </p>

            </button>


            {/* RECENT */}

            <button
              onClick={handleProofClick}
              className="
                border
                border-[#E0DAD0]
                bg-[#FCFAF6]
                px-6
                py-6
                text-left
                transition
                hover:border-[#C8B895]
                hover:bg-[#FAF7F1]
              "
            >

              <div className="flex items-center justify-between">

                <Clock3
                  size={24}
                  strokeWidth={1.4}
                  className="text-[#B08347]"
                />

                <span className="font-serif text-[26px] text-[#24352F]">
                  01
                </span>

              </div>

              <p className="mt-4 text-[12px] text-[#707873]">
                Recent
              </p>

            </button>


            {/* BLOCKCHAIN */}

            <button
              onClick={handleProofClick}
              className="
                border
                border-[#E0DAD0]
                bg-[#FCFAF6]
                px-6
                py-6
                text-left
                transition
                hover:border-[#C8B895]
                hover:bg-[#FAF7F1]
              "
            >

              <div className="flex items-center justify-between">

                <Cuboid
                  size={24}
                  strokeWidth={1.4}
                  className="text-[#B08347]"
                />

                <span className="font-serif text-[26px] text-[#24352F]">
                  01
                </span>

              </div>

              <p className="mt-4 text-[12px] text-[#707873]">
                On blockchain
              </p>

            </button>

          </section>


          {/* =================================================
              RECENT PROOFS
          ================================================= */}

          <section className="mt-8 border border-[#E0DAD0] bg-[#FCFAF6]">

            {/* RECENT PROOFS HEADER */}

            <div className="flex items-center justify-between border-b border-[#E5DFD5] px-6 py-5">

              <div>

                <h2 className="text-[16px] font-semibold text-[#293631]">
                  Recent Proofs
                </h2>

                <p className="mt-1 text-[11px] text-[#8A908C]">
                  Your latest proof of creation
                </p>

              </div>


              <button
                onClick={handleStampWork}
                className="text-[12px] font-medium text-[#9A7040] transition hover:text-[#173C34]"
              >
                Stamp new
              </button>

            </div>


            {/* SINGLE PROOF */}

            <div className="relative px-6 py-6">

              <button
                onClick={handleProofClick}
                className="
                  flex
                  w-full
                  items-center
                  gap-5
                  pr-12
                  text-left
                  transition
                  hover:bg-[#F7F3EB]
                "
              >

                {/* FILE ICON */}

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#F7E9E5] text-[#D34F3F]">

                  <FileText
                    size={22}
                    strokeWidth={1.5}
                  />

                </div>


                {/* FILE NAME */}

                <div className="min-w-0 flex-1">

                  <p className="truncate text-[14px] font-medium text-[#28352F]">
                    {proof.name}
                  </p>

                  <p className="mt-1.5 text-[11px] text-[#858B87]">
                    PDF · {proof.size}
                  </p>

                </div>


                {/* HASH */}

                <div className="hidden w-[170px] sm:block">

                  <p className="text-[10px] text-[#8A908C]">
                    SHA-256
                  </p>

                  <p className="mt-1.5 font-mono text-[11px] text-[#4D5752]">
                    {proof.hash}
                  </p>

                </div>


                {/* STATUS */}

                <div className="hidden w-[100px] sm:block">

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F0E8] px-3 py-1.5 text-[10px] font-medium text-[#447052]">

                    <CheckCircle2
                      size={12}
                      strokeWidth={1.7}
                    />

                    {proof.status}

                  </span>

                </div>


                {/* DATE */}

                <div className="hidden w-[110px] text-right md:block">

                  <p className="text-[11px] text-[#5F6863]">
                    {proof.date}
                  </p>

                  <p className="mt-1 text-[10px] text-[#8A908C]">
                    {proof.time}
                  </p>

                </div>

              </button>


              {/* =================================================
                  THREE DOT MENU
              ================================================= */}

              <div className="absolute right-5 top-1/2 -translate-y-1/2">

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setProofMenuOpen(
                      (prev) => !prev
                    );
                  }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    text-[#747D77]
                    transition
                    hover:bg-[#EFEAE1]
                  "
                >

                  <MoreVertical
                    size={19}
                    strokeWidth={1.5}
                  />

                </button>


                {/* MENU */}

                {proofMenuOpen && (
                  <div className="absolute right-0 top-11 z-20 w-40 border border-[#DCD5CA] bg-[#FBF9F4] p-1.5 shadow-lg">

                    <button
                      onClick={() => {
                        setProofMenuOpen(false);
                        handleProofClick();
                      }}
                      className="w-full px-3 py-3 text-left text-[12px] text-[#39433E] transition hover:bg-[#F0ECE4]"
                    >
                      View proof
                    </button>


                    <button
                      onClick={() => {
                        setProofMenuOpen(false);
                        handleStampWork();
                      }}
                      className="w-full px-3 py-3 text-left text-[12px] text-[#39433E] transition hover:bg-[#F0ECE4]"
                    >
                      Stamp another
                    </button>

                  </div>
                )}

              </div>

            </div>

          </section>


          {/* =================================================
              FOOTER NOTE
          ================================================= */}

          <div className="mt-9 flex items-center justify-center gap-2 text-[11px] text-[#8A918C]">

            <ShieldCheck
              size={14}
              strokeWidth={1.4}
            />

            Your creations. Your proof. Your ownership.

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;