import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  /* =====================================================
     FORM HANDLING
  ===================================================== */

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setMessage("");
  };

  const switchMode = (newMode) => {
    setMode(newMode);

    setMessage("");

    setShowPassword(false);
    setShowConfirmPassword(false);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please enter your email and password.");
      return;
    }

    /*
      BACKEND CONNECTION WILL GO HERE

      Example later:

      const response = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });
    */

    console.log("Login:", {
      email: formData.email,
      password: formData.password,
    });

    // Temporary navigation
    navigate("/dashboard");
  };

  /* =====================================================
     SIGNUP
  ===================================================== */

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    /*
      BACKEND SIGNUP WILL GO HERE
    */

    console.log("Signup:", formData);

    // Temporary navigation
    navigate("/dashboard");
  };

  /* =====================================================
     FORGOT PASSWORD
  ===================================================== */

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    /*
      BACKEND PASSWORD RESET WILL GO HERE
    */

    console.log("Reset password:", {
      email: formData.email,
      newPassword: formData.password,
    });

    setMessage("Password updated successfully.");

    setTimeout(() => {
      switchMode("login");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#18231F]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="flex h-[88px] items-center justify-between border-b border-[#DED8CE] bg-[#FAF8F3] px-7 sm:px-10 lg:px-12 xl:px-16">

        {/* ASTITVA LOGO */}

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-5"
        >

          {/* Logo Mark */}

          <div className="flex h-[62px] w-[50px] shrink-0 items-center justify-center border-[1.5px] border-[#B8894A] [clip-path:polygon(50%_0%,92%_22%,92%_76%,50%_100%,8%_76%,8%_22%)]">

            <span className="font-serif text-[29px] leading-none text-[#B8894A]">
              A
            </span>

          </div>

          {/* Wordmark */}

          <div className="text-left">

            <div className="text-[24px] font-medium leading-none tracking-[0.36em] text-[#132E28]">
              ASTITVA
            </div>

            <div className="mt-2 text-[8px] font-medium tracking-[0.38em] text-[#B8894A]">
              PROOF OF CREATION
            </div>

          </div>

        </button>


        {/* BACK HOME */}

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-[13px] text-[#4F5B56] transition hover:text-[#183D35]"
        >

          <ArrowLeft
            size={16}
            strokeWidth={1.5}
          />

          Back to home

        </button>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="grid min-h-[calc(100vh-88px)] grid-cols-1 lg:grid-cols-[38%_62%]">


        {/* =====================================================
            LEFT BRAND SECTION
        ===================================================== */}

        <section className="relative hidden overflow-hidden bg-[#123C34] lg:flex">

          {/* subtle background texture */}

          <div className="absolute inset-0 opacity-[0.045]">

            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #ffffff 1px, transparent 1px), linear-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "52px 52px",
              }}
            />

          </div>


          {/* subtle decorative curve */}

          <div className="absolute -bottom-[190px] -right-[190px] h-[430px] w-[430px] rounded-full border border-[#C69C5C]/20" />

          <div className="absolute -bottom-[235px] -right-[235px] h-[520px] w-[520px] rounded-full border border-[#C69C5C]/10" />


          {/* CONTENT */}

          <div className="relative z-10 flex w-full flex-col justify-between px-10 py-14 xl:px-14">

            {/* INTRO */}

            <div>

              <div className="flex items-center gap-3 text-[9px] font-semibold tracking-[0.23em] text-[#D0A965]">

                <span className="h-px w-8 bg-[#D0A965]" />

                A DIGITAL PROOF OF CREATION

              </div>


              <h1 className="mt-8 max-w-[450px] font-serif text-[48px] leading-[0.99] tracking-[-0.045em] text-[#F7F2E9] xl:text-[55px]">

                What you create
                <br />

                should remain
                <br />

                <span className="italic text-[#D4AE70]">
                  yours.
                </span>

              </h1>


              <p className="mt-7 max-w-[390px] text-[14px] leading-6 text-[#C6D1CC]">

                Astitva gives your original work a permanent,
                verifiable record — from the moment you create it.

              </p>

            </div>


            {/* =================================================
                FINGERPRINT CARD
            ================================================= */}

            <div className="mt-12 max-w-[430px] border border-[#C5A16A]/35 bg-[#0D3029]/40 p-6">

              {/* Card top */}

              <div className="flex items-center justify-between border-b border-white/10 pb-5">

                <div>

                  <p className="text-[9px] font-semibold tracking-[0.2em] text-[#D2AC6C]">
                    ASTITVA
                  </p>

                  <p className="mt-1 text-[8px] tracking-[0.16em] text-[#7F928B]">
                    PROOF OF CREATION
                  </p>

                </div>


                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C69C5C]/40 text-[#D4AE70]">

                  <ShieldCheck
                    size={18}
                    strokeWidth={1.4}
                  />

                </div>

              </div>


              {/* Fingerprint */}

              <div className="flex items-center gap-6 py-6">

                <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full border border-[#C69C5C]/40">

                  <Fingerprint
                    size={42}
                    strokeWidth={1.15}
                    className="text-[#D3AC6C]"
                  />

                </div>


                <div>

                  <p className="text-[8px] font-medium tracking-[0.2em] text-[#899B94]">
                    DIGITAL FINGERPRINT
                  </p>

                  <p className="mt-2 font-mono text-[12px] text-[#EEE7DA]">
                    8f2c...91ad
                  </p>


                  <div className="mt-3 flex items-center gap-2">

                    <span className="h-1.5 w-1.5 rounded-full bg-[#86B99C]" />

                    <span className="text-[9px] text-[#A7B5AF]">
                      Ready to verify
                    </span>

                  </div>

                </div>

              </div>


              {/* Security */}

              <div className="grid grid-cols-2 border-t border-white/10 pt-5">

                <div>

                  <p className="text-[8px] tracking-[0.16em] text-[#7F928B]">
                    SECURITY
                  </p>

                  <p className="mt-1 text-[12px] text-[#ECE5D8]">
                    SHA-256
                  </p>

                </div>


                <div>

                  <p className="text-[8px] tracking-[0.16em] text-[#7F928B]">
                    NETWORK
                  </p>

                  <p className="mt-1 text-[12px] text-[#ECE5D8]">
                    Polygon
                  </p>

                </div>

              </div>

            </div>


            {/* Bottom */}

            <div className="mt-8 flex items-center gap-2 text-[9px] text-[#A1B0AA]">

              <LockKeyhole
                size={12}
                strokeWidth={1.4}
              />

              Your proof remains under your control.

            </div>

          </div>

        </section>


        {/* =====================================================
            RIGHT AUTH SECTION
        ===================================================== */}

        <section className="flex items-center justify-center px-7 py-14 sm:px-12 lg:px-16 xl:px-24">

          <div className="w-full max-w-[590px]">


            {/* =================================================
                LOGIN
            ================================================= */}

            {mode === "login" && (
              <div>

                {/* Heading */}

                <div className="mb-10">

                  <p className="text-[9px] font-semibold tracking-[0.25em] text-[#A97B42]">
                    WELCOME BACK
                  </p>


                  <h2 className="mt-4 font-serif text-[48px] leading-none tracking-[-0.04em] text-[#153D35] sm:text-[54px]">
                    Sign in.
                  </h2>


                  <p className="mt-5 max-w-[470px] text-[14px] leading-6 text-[#69716C]">

                    Access your workspace and continue creating
                    proof for the work that belongs to you.

                  </p>

                </div>


                {/* FORM */}

                <form
                  onSubmit={handleLogin}
                  className="space-y-7"
                >

                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="login-email"
                      className="mb-2.5 block text-[11px] font-medium text-[#303935]"
                    >
                      Email address
                    </label>


                    <div className="relative">

                      <Mail
                        size={18}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B827D]"
                      />


                      <input
                        id="login-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-[58px] w-full rounded-[3px] border border-[#D6D0C6] bg-[#FBFAF7] pl-12 pr-4 text-[14px] text-[#17231F] outline-none transition placeholder:text-[#A4A49F] focus:border-[#183D35] focus:ring-1 focus:ring-[#183D35]/10"
                      />

                    </div>

                  </div>


                  {/* PASSWORD */}

                  <div>

                    <div className="mb-2.5 flex items-center justify-between">

                      <label
                        htmlFor="login-password"
                        className="text-[11px] font-medium text-[#303935]"
                      >
                        Password
                      </label>


                      <button
                        type="button"
                        onClick={() => switchMode("forgot")}
                        className="text-[11px] font-medium text-[#9A7040] transition hover:text-[#183D35]"
                      >
                        Forgot password?
                      </button>

                    </div>


                    <div className="relative">

                      <LockKeyhole
                        size={18}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B827D]"
                      />


                      <input
                        id="login-password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="h-[58px] w-full rounded-[3px] border border-[#D6D0C6] bg-[#FBFAF7] pl-12 pr-12 text-[14px] text-[#17231F] outline-none transition placeholder:text-[#A4A49F] focus:border-[#183D35] focus:ring-1 focus:ring-[#183D35]/10"
                      />


                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A827D] transition hover:text-[#183D35]"
                      >

                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* MESSAGE */}

                  {message && (
                    <div className="border-l-2 border-[#A7793D] bg-[#EEE5D7] px-4 py-3 text-xs text-[#66543C]">
                      {message}
                    </div>
                  )}


                  {/* CONTINUE */}

                  <button
                    type="submit"
                    className="group flex h-[58px] w-full items-center justify-center gap-4 rounded-[2px] bg-[#143F36] text-[14px] font-medium text-white transition hover:bg-[#1C5145]"
                  >

                    Continue

                    <ArrowRight
                      size={19}
                      strokeWidth={1.5}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </button>

                </form>


                {/* OR / SIGNUP */}

                <div className="mt-9 border-t border-[#DDD7CD] pt-7">

                  <div className="flex items-center justify-between">

                    <span className="text-[12px] text-[#727A75]">
                      New to Astitva?
                    </span>


                    <button
                      onClick={() => switchMode("signup")}
                      className="group flex items-center gap-2 text-[12px] font-semibold text-[#183D35] transition hover:text-[#A7793D]"
                    >

                      Create an account

                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />

                    </button>

                  </div>

                </div>

              </div>
            )}


            {/* =================================================
                SIGNUP
            ================================================= */}

            {mode === "signup" && (
              <div>

                <button
                  onClick={() => switchMode("login")}
                  className="mb-9 flex items-center gap-2 text-[11px] text-[#68716C] transition hover:text-[#183D35]"
                >

                  <ArrowLeft size={14} />

                  Back to login

                </button>


                <div className="mb-9">

                  <p className="text-[9px] font-semibold tracking-[0.25em] text-[#A97B42]">
                    CREATE YOUR ACCOUNT
                  </p>


                  <h2 className="mt-4 font-serif text-[46px] leading-[1.02] tracking-[-0.04em] text-[#153D35]">
                    Create your
                    <br />
                    account.
                  </h2>


                  <p className="mt-5 max-w-[470px] text-[14px] leading-6 text-[#69716C]">
                    Create your workspace and start building
                    verifiable records for your original work.
                  </p>

                </div>


                <form
                  onSubmit={handleSignup}
                  className="space-y-5"
                >

                  {/* NAME */}

                  <div>

                    <label className="mb-2 block text-[11px] font-medium text-[#303935]">
                      Full name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className="h-[54px] w-full rounded-[3px] border border-[#D6D0C6] bg-[#FBFAF7] px-4 text-[14px] outline-none transition placeholder:text-[#A4A49F] focus:border-[#183D35]"
                    />

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label className="mb-2 block text-[11px] font-medium text-[#303935]">
                      Email address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-[54px] w-full rounded-[3px] border border-[#D6D0C6] bg-[#FBFAF7] px-4 text-[14px] outline-none transition placeholder:text-[#A4A49F] focus:border-[#183D35]"
                    />

                  </div>


                  {/* PASSWORD */}

                  <div>

                    <label className="mb-2 block text-[11px] font-medium text-[#303935]">
                      Password
                    </label>

                    <div className="relative">

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        autoComplete="new-password"
                        className="h-[54px] w-full rounded-[3px] border border-[#D6D0C6] bg-[#FBFAF7] px-4 pr-12 text-[14px] outline-none transition placeholder:text-[#A4A49F] focus:border-[#183D35]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A827D]"
                      >

                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* CONFIRM */}

                  <div>

                    <label className="mb-2 block text-[11px] font-medium text-[#303935]">
                      Confirm password
                    </label>

                    <div className="relative">

                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        className="h-[54px] w-full rounded-[3px] border border-[#D6D0C6] bg-[#FBFAF7] px-4 pr-12 text-[14px] outline-none transition placeholder:text-[#A4A49F] focus:border-[#183D35]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A827D]"
                      >

                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>


                  {message && (
                    <div className="border-l-2 border-[#A7793D] bg-[#EEE5D7] px-4 py-3 text-xs text-[#66543C]">
                      {message}
                    </div>
                  )}


                  <button
                    type="submit"
                    className="group flex h-[58px] w-full items-center justify-center gap-4 bg-[#143F36] text-[14px] font-medium text-white transition hover:bg-[#1C5145]"
                  >

                    Create Account

                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </button>

                </form>


                <div className="mt-8 text-center">

                  <span className="text-[11px] text-[#737B76]">
                    Already have an account?
                  </span>

                  <button
                    onClick={() => switchMode("login")}
                    className="ml-2 text-[11px] font-semibold text-[#183D35] hover:text-[#A7793D]"
                  >
                    Login
                  </button>

                </div>

              </div>
            )}


            {/* =================================================
                FORGOT PASSWORD
            ================================================= */}

            {mode === "forgot" && (
              <div>

                <button
                  onClick={() => switchMode("login")}
                  className="mb-9 flex items-center gap-2 text-[11px] text-[#68716C] transition hover:text-[#183D35]"
                >

                  <ArrowLeft size={14} />

                  Back to login

                </button>


                <div className="mb-10">

                  <p className="text-[9px] font-semibold tracking-[0.25em] text-[#A97B42]">
                    PASSWORD RECOVERY
                  </p>


                  <h2 className="mt-4 font-serif text-[46px] leading-[1.02] tracking-[-0.04em] text-[#153D35]">
                    Reset your
                    <br />
                    password.
                  </h2>


                  <p className="mt-5 max-w-[470px] text-[14px] leading-6 text-[#69716C]">
                    Enter the email you used for your Astitva
                    account, then choose a new password.
                  </p>

                </div>


                <form
                  onSubmit={handleForgotPassword}
                  className="space-y-6"
                >

                  {/* EMAIL */}

                  <div>

                    <label className="mb-2.5 block text-[11px] font-medium text-[#303935]">
                      Account email
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B827D]"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-[58px] w-full rounded-[3px] border border-[#D6D0C6] bg-[#FBFAF7] pl-12 pr-4 text-[14px] outline-none placeholder:text-[#A4A49F] focus:border-[#183D35]"
                      />

                    </div>

                  </div>


                  {/* NEW PASSWORD */}

                  <div>

                    <label className="mb-2.5 block text-[11px] font-medium text-[#303935]">
                      New password
                    </label>

                    <div className="relative">

                      <LockKeyhole
                        size={18}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B827D]"
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="h-[58px] w-full rounded-[3px] border border-[#D6D0C6] bg-[#FBFAF7] pl-12 pr-12 text-[14px] outline-none placeholder:text-[#A4A49F] focus:border-[#183D35]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A827D]"
                      >

                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* CONFIRM PASSWORD */}

                  <div>

                    <label className="mb-2.5 block text-[11px] font-medium text-[#303935]">
                      Confirm new password
                    </label>

                    <div className="relative">

                      <LockKeyhole
                        size={18}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B827D]"
                      />

                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className="h-[58px] w-full rounded-[3px] border border-[#D6D0C6] bg-[#FBFAF7] pl-12 pr-12 text-[14px] outline-none placeholder:text-[#A4A49F] focus:border-[#183D35]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A827D]"
                      >

                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* MESSAGE */}

                  {message && (
                    <div
                      className={`border-l-2 px-4 py-3 text-xs ${
                        message.includes("successfully")
                          ? "border-[#5C8068] bg-[#E8F0E9] text-[#315A47]"
                          : "border-[#A7793D] bg-[#EEE5D7] text-[#66543C]"
                      }`}
                    >
                      {message}
                    </div>
                  )}


                  {/* RESET */}

                  <button
                    type="submit"
                    className="group flex h-[58px] w-full items-center justify-center gap-4 bg-[#143F36] text-[14px] font-medium text-white transition hover:bg-[#1C5145]"
                  >

                    Reset Password

                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </button>

                </form>

              </div>
            )}


            {/* =================================================
                SECURITY NOTE
            ================================================= */}

            <div className="mt-12 flex items-center justify-center gap-2 text-[10px] text-[#858C87]">

              <LockKeyhole
                size={12}
                strokeWidth={1.4}
              />

              Your account keeps your proofs under your control.

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Login;