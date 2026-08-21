import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Moon,
  Sun,
  CheckCircle2,
  ArrowLeft,
  LogOut,
  Trash2,
  ShieldCheck,
  Save,
  AlertCircle,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeProvider";


function Settings() {

  const navigate = useNavigate();

  const {
    dimMode,
    toggleDimMode,
  } = useTheme();


  /* =========================================================
     PROFILE
  ========================================================= */

  const [name, setName] = useState(() => {
    return (
      localStorage.getItem("astitva-user-name") ||
      "Kajal"
    );
  });


  const [email, setEmail] = useState(() => {
    return (
      localStorage.getItem("astitva-user-email") ||
      ""
    );
  });


  const [profileSaved, setProfileSaved] =
    useState(false);


  /* =========================================================
     PASSWORD
  ========================================================= */

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");


  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [passwordMessage, setPasswordMessage] =
    useState(null);


  /* =========================================================
     GENERAL MESSAGE
  ========================================================= */

  const [message, setMessage] = useState(null);


  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSaveProfile = () => {

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();


    if (!trimmedName) {

      setMessage({
        type: "error",
        text: "Please enter your name.",
      });

      return;
    }


    if (
      trimmedEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        trimmedEmail
      )
    ) {

      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });

      return;
    }


    localStorage.setItem(
      "astitva-user-name",
      trimmedName
    );


    localStorage.setItem(
      "astitva-user-email",
      trimmedEmail
    );


    setName(trimmedName);
    setEmail(trimmedEmail);

    setProfileSaved(true);

    setMessage({
      type: "success",
      text: "Your profile has been saved on this device.",
    });


    setTimeout(() => {
      setProfileSaved(false);
    }, 2500);
  };


  /* =========================================================
     CHANGE PASSWORD
  ========================================================= */

  const handleChangePassword = (event) => {

    event.preventDefault();

    setPasswordMessage(null);


    if (!currentPassword) {

      setPasswordMessage({
        type: "error",
        text: "Enter your current password.",
      });

      return;
    }


    if (!newPassword) {

      setPasswordMessage({
        type: "error",
        text: "Enter a new password.",
      });

      return;
    }


    if (newPassword.length < 8) {

      setPasswordMessage({
        type: "error",
        text:
          "Your new password must contain at least 8 characters.",
      });

      return;
    }


    if (newPassword !== confirmPassword) {

      setPasswordMessage({
        type: "error",
        text: "New passwords do not match.",
      });

      return;
    }


    /*
      IMPORTANT:

      We are NOT pretending that the password
      has been changed on the server.

      Until the backend authentication API is
      connected, this only validates the form.
    */

    setPasswordMessage({
      type: "success",
      text:
        "Password details are valid. Password change will be completed when authentication is connected.",
    });


    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {

    localStorage.removeItem("astitva-auth-token");

    navigate("/login");
  };


  /* =========================================================
     DELETE ACCOUNT
  ========================================================= */

  const handleDeleteAccount = () => {

    setMessage({
      type: "error",
      text:
        "Account deletion will be available after the backend account system is connected.",
    });
  };


  /* =========================================================
     CLEAR MESSAGE WHEN PAGE CHANGES
  ========================================================= */

  useEffect(() => {

    return () => {
      setMessage(null);
      setPasswordMessage(null);
    };

  }, []);


  return (

    <div className="flex min-h-screen bg-[#F7F3EB] text-[#17241F]">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="min-w-0 flex-1">


        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="border-b border-[#DDD7CC] bg-[#FBF9F4] px-5 py-6 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-[1000px]">

            <p className="text-[9px] font-semibold tracking-[0.24em] text-[#9A7040]">
              ACCOUNT
            </p>


            <h1 className="mt-2 font-serif text-[32px] tracking-[-0.035em] text-[#173C34] sm:text-[38px]">
              Settings
            </h1>


            <p className="mt-2 max-w-[600px] text-[11px] leading-5 text-[#6B746F]">
              Manage your profile, security and
              workspace preferences.
            </p>

          </div>

        </header>


        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="mx-auto max-w-[1000px] px-5 py-8 sm:px-8 lg:px-10">


          {/* =================================================
              GENERAL MESSAGE
          ================================================= */}

          {message && (

            <div
              className={`mb-6 flex items-start gap-3 border px-4 py-3 ${
                message.type === "success"
                  ? "border-[#BDD0C0] bg-[#EDF5EE] text-[#41694D]"
                  : "border-[#D9C2B3] bg-[#F7ECE6] text-[#7B513E]"
              }`}
            >

              {message.type === "success" ? (

                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0"
                />

              ) : (

                <AlertCircle
                  size={16}
                  className="mt-0.5 shrink-0"
                />

              )}


              <p className="text-[10px] leading-5">
                {message.text}
              </p>


              <button
                onClick={() => setMessage(null)}
                className="ml-auto opacity-60 hover:opacity-100"
              >
                ×
              </button>

            </div>

          )}


          {/* =================================================
              PROFILE
          ================================================= */}

          <section>

            <div className="mb-4">

              <p className="text-[9px] font-semibold tracking-[0.2em] text-[#9A7040]">
                PROFILE
              </p>


              <h2 className="mt-2 font-serif text-[25px] text-[#243A33]">
                Your information
              </h2>


              <p className="mt-1 text-[10px] leading-5 text-[#858C87]">
                Update the information associated with
                your ASTITVA workspace.
              </p>

            </div>


            <div className="border border-[#DED7CC] bg-[#FCFAF6] p-6">


              {/* PROFILE ICON */}

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B99152] font-serif text-[22px] text-white">

                  {name
                    ? name.charAt(0).toUpperCase()
                    : "K"}

                </div>


                <div>

                  <p className="text-[13px] font-medium text-[#293831]">
                    {name || "Your name"}
                  </p>

                  <p className="mt-1 text-[9px] text-[#858C87]">
                    ASTITVA account
                  </p>

                </div>

              </div>


              {/* INPUTS */}

              <div className="mt-7 grid gap-5 md:grid-cols-2">


                {/* NAME */}

                <div>

                  <label className="mb-2 block text-[9px] font-semibold tracking-[0.12em] text-[#59645E]">
                    FULL NAME
                  </label>


                  <div className="relative">

                    <User
                      size={15}
                      strokeWidth={1.4}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A7040]"
                    />


                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Your name"
                      className="
                        h-[48px]
                        w-full
                        border
                        border-[#D8D0C4]
                        bg-[#FBF9F4]
                        pl-11
                        pr-4
                        text-[11px]
                        text-[#293831]
                        outline-none
                        transition
                        focus:border-[#9A7040]
                      "
                    />

                  </div>

                </div>


                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-[9px] font-semibold tracking-[0.12em] text-[#59645E]">
                    EMAIL ADDRESS
                  </label>


                  <div className="relative">

                    <Mail
                      size={15}
                      strokeWidth={1.4}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A7040]"
                    />


                    <input
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@example.com"
                      className="
                        h-[48px]
                        w-full
                        border
                        border-[#D8D0C4]
                        bg-[#FBF9F4]
                        pl-11
                        pr-4
                        text-[11px]
                        text-[#293831]
                        outline-none
                        transition
                        focus:border-[#9A7040]
                      "
                    />

                  </div>

                </div>

              </div>


              {/* SAVE */}

              <div className="mt-6 flex items-center justify-between gap-4">

                <p className="text-[9px] text-[#858C87]">
                  Profile information is currently
                  saved locally on this device.
                </p>


                <button
                  onClick={handleSaveProfile}
                  className="
                    flex
                    h-[42px]
                    items-center
                    gap-2
                    bg-[#143F36]
                    px-5
                    text-[10px]
                    font-medium
                    text-white
                    transition
                    hover:bg-[#1C5145]
                  "
                >

                  {profileSaved ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Save size={14} />
                  )}

                  {profileSaved
                    ? "Saved"
                    : "Save changes"}

                </button>

              </div>

            </div>

          </section>


          {/* =================================================
              SECURITY
          ================================================= */}

          <section className="mt-10">

            <div className="mb-4">

              <p className="text-[9px] font-semibold tracking-[0.2em] text-[#9A7040]">
                SECURITY
              </p>


              <h2 className="mt-2 font-serif text-[25px] text-[#243A33]">
                Change password
              </h2>


              <p className="mt-1 text-[10px] leading-5 text-[#858C87]">
                Keep your ASTITVA account protected with
                a strong password.
              </p>

            </div>


            <div className="border border-[#DED7CC] bg-[#FCFAF6] p-6">


              <form
                onSubmit={handleChangePassword}
                className="space-y-5"
              >


                {/* CURRENT PASSWORD */}

                <PasswordInput
                  label="CURRENT PASSWORD"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  visible={showCurrentPassword}
                  setVisible={setShowCurrentPassword}
                />


                {/* NEW PASSWORD */}

                <PasswordInput
                  label="NEW PASSWORD"
                  value={newPassword}
                  onChange={setNewPassword}
                  visible={showNewPassword}
                  setVisible={setShowNewPassword}
                />


                {/* CONFIRM PASSWORD */}

                <PasswordInput
                  label="CONFIRM NEW PASSWORD"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  visible={showConfirmPassword}
                  setVisible={setShowConfirmPassword}
                />


                {/* PASSWORD MESSAGE */}

                {passwordMessage && (

                  <div
                    className={`flex items-start gap-2 border px-4 py-3 ${
                      passwordMessage.type === "success"
                        ? "border-[#BDD0C0] bg-[#EDF5EE] text-[#41694D]"
                        : "border-[#D9C2B3] bg-[#F7ECE6] text-[#7B513E]"
                    }`}
                  >

                    {passwordMessage.type === "success" ? (

                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0"
                      />

                    ) : (

                      <AlertCircle
                        size={14}
                        className="mt-0.5 shrink-0"
                      />

                    )}

                    <p className="text-[9px] leading-4">
                      {passwordMessage.text}
                    </p>

                  </div>

                )}


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="
                    flex
                    h-[44px]
                    items-center
                    gap-2
                    bg-[#143F36]
                    px-6
                    text-[10px]
                    font-medium
                    text-white
                    transition
                    hover:bg-[#1C5145]
                  "
                >

                  <LockKeyhole size={14} />

                  Update password

                </button>

              </form>

            </div>

          </section>


          {/* =================================================
              APPEARANCE
          ================================================= */}

          <section className="mt-10">

            <div className="mb-4">

              <p className="text-[9px] font-semibold tracking-[0.2em] text-[#9A7040]">
                APPEARANCE
              </p>


              <h2 className="mt-2 font-serif text-[25px] text-[#243A33]">
                Interface appearance
              </h2>


              <p className="mt-1 text-[10px] leading-5 text-[#858C87]">
                Choose how bright you want your ASTITVA
                workspace to appear.
              </p>

            </div>


            <div className="space-y-3">


              {/* DEFAULT */}

              <button
                onClick={() => {
                  if (dimMode) {
                    toggleDimMode();
                  }
                }}
                className={`flex w-full items-center gap-4 border p-5 text-left transition ${
                  !dimMode
                    ? "border-[#B9A47F] bg-[#FCFAF6]"
                    : "border-[#DED7CC] bg-[#FCFAF6] hover:bg-[#F8F4EC]"
                }`}
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F1EADF]">

                  <Sun
                    size={19}
                    strokeWidth={1.4}
                    className="text-[#9A7040]"
                  />

                </div>


                <div className="flex-1">

                  <h3 className="text-[12px] font-medium text-[#293831]">
                    Default appearance
                  </h3>

                  <p className="mt-1 text-[9px] leading-4 text-[#858C87]">
                    Use the normal ASTITVA brightness
                    and colours.
                  </p>

                </div>


                {!dimMode && (

                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-[#4D7358]"
                  />

                )}

              </button>


              {/* DIM MODE */}

              <button
                onClick={() => {
                  if (!dimMode) {
                    toggleDimMode();
                  }
                }}
                className={`flex w-full items-center gap-4 border p-5 text-left transition ${
                  dimMode
                    ? "border-[#8D988F] bg-[#F0EEE8]"
                    : "border-[#DED7CC] bg-[#FCFAF6] hover:bg-[#F8F4EC]"
                }`}
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#E6E3DC]">

                  <Moon
                    size={18}
                    strokeWidth={1.4}
                    className="text-[#5F6963]"
                  />

                </div>


                <div className="flex-1">

                  <h3 className="text-[12px] font-medium text-[#293831]">
                    Dim interface
                  </h3>

                  <p className="mt-1 text-[9px] leading-4 text-[#858C87]">
                    Reduce overall brightness for a
                    softer viewing experience.
                  </p>

                </div>


                {dimMode && (

                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-[#4D7358]"
                  />

                )}

              </button>

            </div>


            {/* ACTIVE NOTICE */}

            {dimMode && (

              <div className="mt-3 flex items-center gap-2 border border-[#D7D4CB] bg-[#EEECE6] px-4 py-3 text-[9px] text-[#59645E]">

                <Eye
                  size={13}
                  strokeWidth={1.4}
                />

                Dim mode is active across ASTITVA.

              </div>

            )}

          </section>


          {/* =================================================
              ACCOUNT ACTIONS
          ================================================= */}

          <section className="mt-10">

            <div className="mb-4">

              <p className="text-[9px] font-semibold tracking-[0.2em] text-[#9A7040]">
                ACCOUNT
              </p>


              <h2 className="mt-2 font-serif text-[25px] text-[#243A33]">
                Account actions
              </h2>

            </div>


            <div className="border border-[#DED7CC] bg-[#FCFAF6]">


              {/* LOGOUT */}

              <div className="flex items-center gap-4 p-5">

                <div className="flex h-10 w-10 items-center justify-center bg-[#F1EADF]">

                  <LogOut
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#8A6745]"
                  />

                </div>


                <div className="flex-1">

                  <h3 className="text-[11px] font-medium text-[#35423C]">
                    Sign out
                  </h3>

                  <p className="mt-1 text-[9px] text-[#858C87]">
                    Sign out of your current ASTITVA session.
                  </p>

                </div>


                <button
                  onClick={handleLogout}
                  className="
                    border
                    border-[#D0C7BB]
                    px-5
                    py-2.5
                    text-[9px]
                    font-medium
                    text-[#59635E]
                    transition
                    hover:border-[#9F907A]
                    hover:bg-[#F3EFE7]
                  "
                >
                  Logout
                </button>

              </div>


              <div className="border-t border-[#E4DED4]" />


              {/* DELETE ACCOUNT */}

              <div className="flex items-center gap-4 p-5">

                <div className="flex h-10 w-10 items-center justify-center bg-[#F3E6DF]">

                  <Trash2
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#8A5D48]"
                  />

                </div>


                <div className="flex-1">

                  <h3 className="text-[11px] font-medium text-[#493A34]">
                    Delete account
                  </h3>

                  <p className="mt-1 max-w-[520px] text-[9px] leading-4 text-[#858C87]">
                    Account deletion will become available
                    once the backend account system is connected.
                  </p>

                </div>


                <button
                  onClick={handleDeleteAccount}
                  className="
                    cursor-not-allowed
                    border
                    border-[#DCCFC6]
                    px-5
                    py-2.5
                    text-[9px]
                    font-medium
                    text-[#9A8275]
                    opacity-70
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          </section>


          {/* =================================================
              SECURITY NOTE
          ================================================= */}

          <div className="mt-8 border border-[#D8D2C7] bg-[#F3F0E9] p-5">

            <div className="flex items-start gap-3">

              <ShieldCheck
                size={17}
                strokeWidth={1.4}
                className="mt-0.5 shrink-0 text-[#9A7040]"
              />

              <div>

                <p className="text-[10px] font-medium text-[#4A554F]">
                  Your proof remains under your control.
                </p>

                <p className="mt-1 text-[9px] leading-4 text-[#858C87]">
                  ASTITVA will use your uploaded work only
                  through the stamping process you choose to start.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              BACK TO DASHBOARD
          ================================================= */}

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-7 flex items-center gap-2 text-[9px] font-medium text-[#69746E] transition hover:text-[#173C34]"
          >

            <ArrowLeft size={13} />

            Back to dashboard

          </button>


        </div>

      </main>

    </div>
  );
}


/* =========================================================
   PASSWORD INPUT COMPONENT
========================================================= */

function PasswordInput({
  label,
  value,
  onChange,
  visible,
  setVisible,
}) {

  return (

    <div>

      <label className="mb-2 block text-[9px] font-semibold tracking-[0.12em] text-[#59645E]">
        {label}
      </label>


      <div className="relative">

        <LockKeyhole
          size={15}
          strokeWidth={1.4}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A7040]"
        />


        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="
            h-[48px]
            w-full
            border
            border-[#D8D0C4]
            bg-[#FBF9F4]
            pl-11
            pr-12
            text-[11px]
            text-[#293831]
            outline-none
            transition
            focus:border-[#9A7040]
          "
        />


        <button
          type="button"
          onClick={() =>
            setVisible((current) => !current)
          }
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-[#7A837E] hover:text-[#173C34]"
        >

          {visible ? (
            <EyeOff size={15} />
          ) : (
            <Eye size={15} />
          )}

        </button>

      </div>

    </div>

  );
}


export default Settings;