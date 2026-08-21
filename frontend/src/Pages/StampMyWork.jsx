import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  CloudUpload,
  FileText,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  Link2,
  Clock3,
  Infinity,
  EyeOff,
  Check,
  GraduationCap,
  Upload,
  Cuboid,
} from "lucide-react";

const StampMyWork = () => {
  const processSteps = [
    {
      number: "01",
      icon: CloudUpload,
      title: "UPLOAD",
      description: "Upload your original file or project.",
    },
    {
      number: "02",
      icon: Fingerprint,
      title: "FINGERPRINT",
      description: "Our AI creates a unique semantic fingerprint.",
    },
    {
      number: "03",
      icon: LockKeyhole,
      title: "SECURE",
      description: "We generate a SHA-256 hash of your fingerprint.",
    },
    {
      number: "04",
      icon: Cuboid,
      title: "STAMP",
      description: "The hash is recorded on blockchain with timestamp.",
    },
  ];

  const recordSteps = [
    {
      icon: Upload,
      label: "STEP 01",
      title: "Your Work",
      description: "Original file",
    },
    {
      icon: Fingerprint,
      label: "STEP 02",
      title: "AI Fingerprint",
      description: "Semantic signature",
    },
    {
      icon: LockKeyhole,
      label: "STEP 03",
      title: "SHA-256",
      description: "Secure cryptographic hash",
    },
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: "TAMPER PROOF",
      description: "Immutable record on blockchain.",
    },
    {
      icon: EyeOff,
      title: "PRIVACY FIRST",
      description: "Your file stays protected.",
    },
    {
      icon: Clock3,
      title: "INSTANT PROOF",
      description: "Get your proof in seconds.",
    },
    {
      icon: Infinity,
      title: "BUILT TO LAST",
      description: "Designed for permanence.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f1e8] text-[#15241f] font-sans">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="sticky top-0 z-50 flex h-[82px] items-center justify-between border-b border-[#ded7ca] bg-[rgba(250,247,241,0.96)] px-[5%] backdrop-blur-[14px]">

        {/* Logo */}
        <div className="flex cursor-pointer items-center gap-[14px]">

          <div
            className="
              flex h-[52px] w-[44px]
              items-center justify-center
              border-2 border-[#c79c57]
              text-[22px] text-[#b5843d]
              font-serif
            "
            style={{
              clipPath:
                "polygon(50% 0%, 92% 22%, 92% 76%, 50% 100%, 8% 76%, 8% 22%)",
            }}
          >
            A
          </div>

          <div className="text-[21px] font-medium tracking-[8px]">
            ASTITVA

            <span className="mt-[3px] block text-[9px] tracking-[4px] text-[#b5843d]">
              PROOF OF CREATION
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="ml-auto mr-[55px] hidden items-center gap-[42px] lg:flex">
          <a
            href="#how-it-works"
            className="text-[14px] text-[#202823] transition hover:text-[#b5843d]"
          >
            How it works
          </a>

          <a
            href="#process"
            className="text-[14px] text-[#202823] transition hover:text-[#b5843d]"
          >
            Process
          </a>

          <a
            href="#proof"
            className="text-[14px] text-[#202823] transition hover:text-[#b5843d]"
          >
            Your proof
          </a>

          <a
            href="#security"
            className="text-[14px] text-[#202823] transition hover:text-[#b5843d]"
          >
            Security
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-[26px]">

          <button className="hidden cursor-pointer border-none bg-transparent text-[14px] text-[#17241f] sm:block">
            Login
          </button>

          <button
            className="
              flex items-center gap-[18px]
              rounded-[6px]
              bg-[#183d35]
              px-[22px] py-[14px]
              text-[14px] text-white
              transition
              hover:-translate-y-[1px]
              hover:bg-[#24564a]
            "
          >
            Stamp My Work
            <ArrowRight size={17} />
          </button>

        </div>
      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          grid min-h-[680px]
          grid-cols-1 items-center gap-[50px]
          px-[5%] py-[75px]
          lg:grid-cols-[0.82fr_1.18fr]
          lg:py-[80px]
        "
        style={{
          background:
            "radial-gradient(circle at 82% 45%, rgba(211,190,153,0.28), transparent 35%), #f6f1e8",
        }}
      >

        {/* Hero text */}
        <div className="max-w-[590px]">

          <div className="flex items-center gap-[11px] text-[11px] font-semibold tracking-[2px] text-[#214c42]">
            <span className="h-px w-[28px] bg-[#b5843d]" />
            PROTECT WHAT YOU CREATED
          </div>

          <h1 className="mt-7 mb-7 font-serif text-[52px] font-medium leading-[1.04] text-[#171b19] sm:text-[64px] lg:text-[82px]">
            Stamp your work.
            <br />
            <em className="not-italic text-[#24594d]">
              Keep the proof.
            </em>
          </h1>

          <p className="max-w-[525px] text-[15px] leading-[1.75] text-[#59615d] sm:text-[17px]">
            Turn your original work into a permanent digital record.
            Astitva creates an AI-powered semantic fingerprint, secures it
            with SHA-256, and records the proof on blockchain.
          </p>

          {/* Buttons */}
          <div className="mt-[35px] flex flex-wrap items-center gap-6">

            <button
              className="
                inline-flex items-center gap-[14px]
                rounded-[6px]
                bg-[#183d35]
                px-[23px] py-4
                text-[14px] font-semibold text-white
                transition
                hover:-translate-y-0.5
                hover:bg-[#24564a]
              "
            >
              <Upload size={18} />
              Stamp My Work
            </button>

            <button className="cursor-pointer border-none bg-transparent text-[13px] text-[#4f5a55]">
              See how it works
              <span className="ml-[6px] font-bold text-[#183d35]">
                →
              </span>
            </button>

          </div>

          <div className="mt-7 flex items-center gap-2 text-[12px] text-[#68706c]">
            <ShieldCheck size={15} />
            Your original work stays protected.
          </div>

        </div>


        {/* =================================================
            HERO VISUAL
        ================================================= */}

        <div
          className="
            relative flex h-[500px]
            items-center justify-center
            overflow-hidden rounded-2xl
            bg-[#e9dfcf]
            sm:h-[560px]
          "
        >

          {/* Background circle */}
          <div
            className="
              absolute h-[360px] w-[360px]
              rounded-full
              border border-[rgba(181,132,61,0.24)]
              bg-[rgba(255,250,240,0.2)]
              sm:h-[510px] sm:w-[510px]
            "
          />


          {/* =================================================
              FILE CARD
          ================================================= */}

          <div
            className="
              absolute left-[3%] top-[21%]
              z-10 flex
              h-[165px] w-[120px]
              -rotate-[4deg]
              flex-col items-center justify-center
              rounded-lg
              border border-[#d8c8aa]
              bg-[#f8f0df]
              shadow-[0_20px_35px_rgba(55,40,20,0.14)]
              sm:left-[7%] sm:h-[190px] sm:w-[145px]
            "
          >

            {/* Fold */}
            <div
              className="absolute right-0 top-0 h-8 w-8 bg-[#e7dac2]"
              style={{
                clipPath: "polygon(0 0, 100% 100%, 0 100%)",
              }}
            />

            <FileText
              size={38}
              strokeWidth={1.6}
              className="mb-3 text-[#19463b]"
            />

            <div className="text-[13px] font-semibold sm:text-[15px]">
              project.zip
            </div>

            <div className="mt-1 text-[10px] text-[#77736c] sm:text-[11px]">
              14.8 MB
            </div>

            <div className="mt-[15px] rounded-[3px] bg-[#183d35] px-2 py-[7px] text-[7px] tracking-[0.5px] text-white">
              YOUR ORIGINAL WORK
            </div>
          </div>


          {/* =================================================
              PROCESS DOTS
          ================================================= */}

          <div className="absolute left-[20%] top-[49%] flex items-center">

            <span className="h-[7px] w-[7px] rounded-full bg-[#a88145]" />

            <span
              className="mx-1 h-px w-[45px] sm:w-[85px]"
              style={{
                background:
                  "repeating-linear-gradient(to right,#a88145 0,#a88145 4px,transparent 4px,transparent 9px)",
              }}
            />

            <span className="h-[7px] w-[7px] rounded-full bg-[#a88145]" />

          </div>


          {/* =================================================
              FINGERPRINT
          ================================================= */}

          <div className="absolute left-[29%] top-[25%] z-20 -translate-x-1/2 text-center sm:left-[31%]">

            <div
              className="
                mx-auto mb-3
                flex h-[68px] w-[68px]
                items-center justify-center
                rounded-full
                border border-white/80
                bg-[rgba(247,240,227,0.65)]
                text-[#16473b]
                sm:h-[88px] sm:w-[88px]
              "
            >
              <Fingerprint
                size={38}
                strokeWidth={1.5}
                className="sm:h-[48px] sm:w-[48px]"
              />
            </div>

            <h3 className="text-[8px] tracking-[1px] text-[#183d35] sm:text-[11px]">
              AI FINGERPRINT
            </h3>

            <p className="mt-[7px] text-[7px] leading-[1.5] text-[#706d67] sm:text-[9px]">
              Semantic signature
            </p>

          </div>


          {/* Arrow */}
          <ArrowRight
            size={22}
            className="absolute left-[46%] top-[45%] z-30 text-[#a88145]"
          />


          {/* =================================================
              HASH
          ================================================= */}

          <div className="absolute left-[50%] top-[25%] z-20 -translate-x-1/2 text-center">

            <div
              className="
                mx-auto mb-3
                flex h-[68px] w-[68px]
                items-center justify-center
                rounded-full
                border border-white/80
                bg-[rgba(247,240,227,0.65)]
                text-[#16473b]
                sm:h-[88px] sm:w-[88px]
              "
            >
              <LockKeyhole
                size={35}
                strokeWidth={1.5}
                className="sm:h-[45px] sm:w-[45px]"
              />
            </div>

            <h3 className="text-[8px] tracking-[1px] text-[#183d35] sm:text-[11px]">
              SECURE HASH
            </h3>

            <p className="mt-[7px] text-[7px] leading-[1.5] text-[#706d67] sm:text-[9px]">
              SHA-256
            </p>

          </div>


          {/* Arrow */}
          <ArrowRight
            size={22}
            className="absolute left-[65%] top-[45%] z-30 text-[#a88145]"
          />


          {/* =================================================
              BLOCKCHAIN
          ================================================= */}

          <div className="absolute left-[71%] top-[25%] z-20 -translate-x-1/2 text-center sm:left-[68%]">

            <div
              className="
                mx-auto mb-3
                flex h-[68px] w-[68px]
                items-center justify-center
                rounded-full
                border border-white/80
                bg-[rgba(247,240,227,0.65)]
                text-[#16473b]
                sm:h-[88px] sm:w-[88px]
              "
            >
              <Cuboid
                size={37}
                strokeWidth={1.5}
                className="sm:h-[48px] sm:w-[48px]"
              />
            </div>

            <h3 className="text-[8px] tracking-[1px] text-[#183d35] sm:text-[11px]">
              BLOCKCHAIN
            </h3>

            <p className="mt-[7px] text-[7px] leading-[1.5] text-[#706d67] sm:text-[9px]">
              Permanent record
            </p>

          </div>


          {/* =================================================
              PROOF CARD
          ================================================= */}

          <div
            className="
              absolute bottom-[7%] right-[4%]
              z-30
              h-[210px] w-[150px]
              rotate-[3deg]
              rounded-[5px]
              border border-[#c9b99d]
              bg-[rgba(255,252,246,0.94)]
              p-[17px]
              text-center
              shadow-[0_22px_45px_rgba(43,32,18,0.20)]
              sm:bottom-[12%] sm:right-[7%]
              sm:h-[245px] sm:w-[180px]
              sm:p-[22px_17px]
            "
          >

            <div className="flex items-center justify-center gap-[7px] text-[10px] tracking-[4px] sm:text-[12px]">
              <span
                className="flex h-[20px] w-[18px] items-center justify-center border border-[#bd914d] text-[#b5843d]"
              >
                A
              </span>
              ASTITVA
            </div>

            <div className="mt-[9px] text-[6px] tracking-[2px] text-[#b5843d] sm:text-[7px]">
              PROOF OF CREATION
            </div>

            <div className="mx-auto mt-5 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#183d35] text-white sm:mt-[22px] sm:h-[52px] sm:w-[52px]">
              <Check size={27} />
            </div>

            <div className="text-[7px] font-semibold tracking-[1px] sm:text-[8px]">
              VERIFIED
            </div>

            <div className="mt-2 text-[7px] tracking-[1px] text-[#b5843d] sm:text-[8px]">
              ON BLOCKCHAIN
            </div>

            <div className="mt-4 text-[6px] leading-[1.7] text-[#555] sm:mt-[18px] sm:text-[7px]">
              PERMANENT RECORD
              <br />
              <span className="text-[7px] font-semibold text-[#183d35] sm:text-[8px]">
                POLYGON NETWORK
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PROCESS SECTION
      ===================================================== */}

      <section
        id="process"
        className="bg-[#f9f6f0] px-[5%] py-[75px] lg:py-[100px]"
      >

        <div className="max-w-[650px]">

          <div className="flex items-center gap-[11px] text-[11px] font-semibold tracking-[2px] text-[#214c42]">
            <span className="h-px w-[28px] bg-[#b5843d]" />
            HOW IT WORKS
          </div>

          <h2 className="mt-[22px] mb-[22px] font-serif text-[42px] font-medium leading-[1.04] text-[#171b19] sm:text-[52px] lg:text-[61px]">
            Four steps.
            <br />
            <em className="not-italic text-[#24594d]">
              One permanent proof.
            </em>
          </h2>

          <p className="max-w-[590px] text-[15px] leading-[1.7] text-[#686e69]">
            Astitva transforms your original work into a verifiable
            blockchain record without making the process complicated.
          </p>

        </div>


        {/* Cards */}
        <div className="mt-[55px] grid grid-cols-1 gap-[13px] sm:grid-cols-2 lg:grid-cols-4">

          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="
                  group relative min-h-[285px]
                  rounded-[10px]
                  border border-[#e3dacb]
                  bg-[#f4ede1]
                  p-[32px_27px]
                  transition
                  hover:-translate-y-[5px]
                "
              >

                <div className="mb-[35px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#183d35] text-[11px] text-white">
                  {step.number}
                </div>

                <Icon
                  size={36}
                  strokeWidth={1.5}
                  className="mb-5 text-[#1d4c41]"
                />

                <h3 className="text-[13px] font-semibold tracking-[1.5px]">
                  {step.title}
                </h3>

                <p className="mt-2 max-w-[230px] text-[13px] leading-[1.7] text-[#666c67]">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          RECORD FLOW
      ===================================================== */}

      <section
        id="how-it-works"
        className="bg-[#eee4d4] px-[5%] py-[75px] lg:py-[110px]"
      >

        <div className="mb-[50px] max-w-[760px] lg:mb-[60px]">

          <div className="flex items-center gap-[11px] text-[11px] font-semibold tracking-[2px] text-[#214c42]">
            <span className="h-px w-[28px] bg-[#b5843d]" />
            YOUR DIGITAL RECORD
          </div>

          <h2 className="mt-[22px] mb-[22px] font-serif text-[42px] font-medium leading-[1.04] text-[#171b19] sm:text-[52px] lg:text-[61px]">
            From your file
            <br />
            to an <em className="not-italic text-[#24594d]">unbreakable record.</em>
          </h2>

          <p className="max-w-[650px] text-[15px] leading-[1.7] text-[#626965]">
            Each layer adds another level of protection until your creation
            becomes a permanent, independently verifiable record.
          </p>

        </div>


        {/* Record flow */}
        <div className="grid grid-cols-1 items-center gap-[18px] lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">

          {recordSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <React.Fragment key={step.label}>

                <div className="flex min-h-[205px] flex-col justify-center rounded-[10px] border border-[#ded4c4] bg-[#faf7f1] p-[27px] shadow-[0_8px_22px_rgba(45,34,20,0.05)]">

                  <div className="mb-5 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#eee4d4] text-[#183d35]">
                    <Icon size={25} strokeWidth={1.5} />
                  </div>

                  <div className="mb-2 text-[9px] tracking-[1.6px] text-[#a0783f]">
                    {step.label}
                  </div>

                  <strong className="text-[18px] text-[#183d35]">
                    {step.title}
                  </strong>

                  <small className="mt-[7px] text-[11px] text-[#77736d]">
                    {step.description}
                  </small>

                </div>

                {index < recordSteps.length - 1 && (
                  <div className="hidden text-[#9b7945] lg:block">
                    <ChevronRight size={22} />
                  </div>
                )}

              </React.Fragment>
            );
          })}


          {/* Final blockchain */}
          <div className="flex min-h-[205px] flex-col justify-center rounded-[10px] border border-[#183d35] bg-[#183d35] p-[27px] text-white shadow-[0_8px_22px_rgba(45,34,20,0.05)]">

            <div className="mb-5 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#315c50] text-white">
              <Link2 size={25} strokeWidth={1.5} />
            </div>

            <div className="mb-2 text-[9px] tracking-[1.6px] text-white">
              FINAL STEP
            </div>

            <strong className="text-[18px]">
              Blockchain Stamp
            </strong>

            <small className="mt-[7px] text-[11px] text-white/80">
              Permanent proof of creation
            </small>

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section
        id="security"
        className="
          grid grid-cols-1
          items-center
          gap-0
          bg-[#183d35]
          px-[5%] py-[45px]
          text-white
          md:grid-cols-2
          lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]
        "
      >

        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <React.Fragment key={benefit.title}>

              <div className="flex items-center gap-[18px] px-[25px] py-[15px] lg:py-0">

                <div className="flex h-[58px] min-w-[58px] items-center justify-center rounded-full border border-[rgba(220,198,161,0.55)] text-[#e3c48d]">
                  <Icon size={26} strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="mb-2 text-[11px] font-semibold tracking-[1.3px]">
                    {benefit.title}
                  </h3>

                  <p className="text-[11px] leading-[1.5] text-[#c8d0cc]">
                    {benefit.description}
                  </p>
                </div>

              </div>

              {index < benefits.length - 1 && (
                <div className="hidden h-[65px] w-px bg-white/15 lg:block" />
              )}

            </React.Fragment>
          );
        })}

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        id="proof"
        className="bg-[#f8f4ed] px-5 py-[85px] text-center lg:px-[5%] lg:py-[130px]"
      >

        <div className="mx-auto max-w-[760px]">

          <div className="flex items-center justify-center gap-[11px] text-[11px] font-semibold tracking-[2px] text-[#214c42]">
            <span className="h-px w-[28px] bg-[#b5843d]" />
            YOUR CREATION DESERVES PROOF
            <span className="h-px w-[28px] bg-[#b5843d]" />
          </div>

          <h2 className="mt-[25px] mb-[25px] font-serif text-[45px] font-medium leading-[1.04] text-[#171b19] sm:text-[58px] lg:text-[68px]">
            You created it.
            <br />
            <em className="not-italic text-[#24594d]">
              Now make it provable.
            </em>
          </h2>

          <p className="mb-8 text-[16px] leading-[1.7] text-[#666d68]">
            Protect your original work with a permanent digital record
            that can be verified whenever you need it.
          </p>

          <button
            className="
              mx-auto
              inline-flex items-center gap-[14px]
              rounded-[6px]
              bg-[#183d35]
              px-[26px] py-[16px]
              text-[14px] font-semibold text-white
              transition
              hover:-translate-y-0.5
              hover:bg-[#24564a]
            "
          >
            Stamp My Work
            <ArrowRight size={18} />
          </button>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="grid grid-cols-1 items-center gap-6 bg-[#112d27] px-[5%] py-[42px] text-white md:grid-cols-3 md:gap-0">

        {/* Brand */}
        <div className="flex items-center justify-center gap-3 md:justify-start">

          <div
            className="
              flex h-[42px] w-[36px]
              items-center justify-center
              border border-[#c79c57]
              text-[18px] text-[#b5843d]
              font-serif
            "
            style={{
              clipPath:
                "polygon(50% 0%, 92% 22%, 92% 76%, 50% 100%, 8% 76%, 8% 22%)",
            }}
          >
            A
          </div>

          <div>
            <strong className="block text-[15px] tracking-[5px]">
              ASTITVA
            </strong>

            <span className="mt-1 block text-[7px] tracking-[2px] text-[#c29a5b]">
              PROOF OF CREATION
            </span>
          </div>

        </div>


        {/* Center */}
        <p className="text-center text-[12px] text-[#bfc8c3]">
          Your creation. Your proof. Forever yours.
        </p>


        {/* Copyright */}
        <div className="text-center text-[11px] text-[#899790] md:text-right">
          © 2026 Astitva
        </div>

      </footer>

    </div>
  );
};

export default StampMyWork;