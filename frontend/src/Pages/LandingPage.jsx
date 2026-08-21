import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  CloudUpload,
  Fingerprint,
  GraduationCap,
  Infinity,
  Link2,
  LockKeyhole,
  PlayCircle,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import heroCertificate from "../assets/hero-certificate.png";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#171918]">

      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="border-b border-[#ded7cc] bg-[#f5f1ea]">
        <div className="mx-auto grid min-h-[560px] max-w-[1440px] lg:grid-cols-2">

          {/* LEFT */}
          <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-[70px] lg:py-24">

            <div className="astitva-reveal mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-[#234844]" />

              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#234844]">
                Your creation. Your proof. Forever yours.
              </span>
            </div>

            <h1 className="astitva-heading astitva-reveal-delay max-w-[650px] text-[52px] leading-[0.98] sm:text-[64px] lg:text-[68px]">
              You made it.
              <br />

              Now prove it{" "}
              <span className="relative inline-block text-[#234844]">
                first.
                <span className="absolute -bottom-2 left-0 h-[3px] w-full rotate-[-1deg] bg-[#234844]" />
              </span>
            </h1>

            <p className="astitva-reveal-delay-2 mt-7 max-w-[550px] text-[17px] leading-[1.65] text-[#4c4d4a]">
              Astitva creates a permanent and tamper-proof record of your
              original work using AI semantic fingerprinting and blockchain
              timestamping.
            </p>

            <p className="mt-1 text-[17px] leading-[1.65] text-[#4c4d4a]">
              Your idea. Your identity. Forever protected.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <a
                href="/stamp-my-work"
                className="group flex h-[52px] items-center justify-center gap-3 bg-[#173633] px-7 text-[15px] font-medium text-white transition hover:bg-[#214640]"
              >
                <CloudUpload size={19} strokeWidth={1.5} />

                Stamp My Work

                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#how-it-works"
                className="flex h-[52px] items-center justify-center gap-3 border border-[#8c8b87] bg-transparent px-7 text-[15px] font-medium text-[#202321] transition hover:border-[#173633] hover:bg-white/40"
              >
                <PlayCircle size={20} strokeWidth={1.5} />

                See how it works
              </a>

            </div>
          </div>

          {/* RIGHT HERO IMAGE */}
          <div className="astitva-hero-frame relative min-h-[430px] lg:min-h-[560px]">

            <img
              src={heroCertificate}
              alt="Astitva proof of creation certificate"
              className="astitva-hero-image"
            />

            {/* subtle overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f5f1ea]/10 via-transparent to-[#173633]/5" />

          </div>
        </div>
      </section>


      {/* =========================================================
          TRUST FEATURES
      ========================================================= */}

      <section className="border-b border-[#ded7cc] bg-[#f7f3ed]">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-4">

          <Feature
            icon={<ShieldCheck size={26} strokeWidth={1.5} />}
            title="Tamper Proof"
            description="Immutable records"
          />

          <Feature
            icon={<Fingerprint size={27} strokeWidth={1.5} />}
            title="AI-Powered"
            description="Semantic fingerprinting"
          />

          <Feature
            icon={<Link2 size={26} strokeWidth={1.5} />}
            title="Blockchain Secured"
            description="Backed by Polygon"
          />

          <Feature
            icon={<Clock3 size={26} strokeWidth={1.5} />}
            title="Timestamped"
            description="For eternity"
          />

        </div>
      </section>


      {/* =========================================================
          IMPACT STRIP
      ========================================================= */}

      <section className="bg-[#173633] text-[#f4efe7]">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-4">

          <Impact
            icon={<GraduationCap size={30} strokeWidth={1.3} />}
            number="40M+"
            text={
              <>
                Engineering students in India
                <br />
                with zero IP protection
              </>
            }
          />

          <Impact
            icon={<IndianRupee size={30} strokeWidth={1.3} />}
            number="₹0"
            text={
              <>
                Cost to protect
                <br />
                your work
              </>
            }
          />

          <Impact
            icon={<Clock3 size={30} strokeWidth={1.3} />}
            number="30s"
            text={
              <>
                Time to generate
                <br />
                tamper-proof proof
              </>
            }
          />

          <Impact
            icon={<Infinity size={34} strokeWidth={1.2} />}
            number="∞"
            text={
              <>
                How long the record
                <br />
                survives
              </>
            }
          />

        </div>
      </section>


      {/* =========================================================
          HOW IT WORKS + CERTIFICATE
      ========================================================= */}

      <section
        id="how-it-works"
        className="border-b border-[#ded7cc] bg-[#f5f1ea]"
      >
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-[70px] lg:py-20">

          {/* LEFT */}
          <div>

            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#234844]" />

              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#234844]">
                How it works
              </span>
            </div>

            <h2 className="astitva-heading mt-5 max-w-[540px] text-[40px] leading-[1.05] sm:text-[48px]">
              Three simple steps
              <br />
              to{" "}
              <span className="text-[#234844]">
                protect your work.
              </span>
            </h2>


            {/* STEPS */}
            <div className="mt-10 grid gap-5 sm:grid-cols-3">

              <Step
                number="01"
                icon={<CloudUpload size={36} strokeWidth={1.3} />}
                title="Upload"
                description="Upload any file — code, design, document or anything you create."
              />

              <Step
                number="02"
                icon={<Fingerprint size={36} strokeWidth={1.3} />}
                title="Fingerprint"
                description="Our AI creates a unique semantic fingerprint of your work."
              />

              <Step
                number="03"
                icon={<ShieldCheck size={36} strokeWidth={1.3} />}
                title="Stamp"
                description="The fingerprint is hashed and permanently recorded on blockchain."
              />

            </div>


            {/* BOTTOM INFO */}
            <div className="mt-7 flex items-center gap-4 border border-[#d8d0c4] bg-[#f8f4ed] px-5 py-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ebe3d6]">
                <LockKeyhole
                  size={19}
                  strokeWidth={1.5}
                  className="text-[#173633]"
                />
              </div>

              <p className="flex-1 text-[13px] leading-6 text-[#3f4140]">
                Once stamped, your record is permanent, verifiable,
                and yours — forever.
              </p>

              <a
                href="#why-astitva"
                className="hidden items-center gap-2 text-[13px] font-medium text-[#173633] sm:flex"
              >
                Learn more about security
                <ArrowRight size={16} />
              </a>

            </div>

          </div>


          {/* CERTIFICATE */}
          <div
            id="proof"
            className="relative overflow-hidden border border-[#ded6ca] bg-[#f9f6f0] p-7 shadow-[0_12px_40px_rgba(35,31,24,0.08)] sm:p-8"
          >

            {/* Decorative lines */}
            <div className="pointer-events-none absolute right-[-50px] top-[-30px] h-[300px] w-[300px] rounded-full border border-[#ded5c7] opacity-60" />
            <div className="pointer-events-none absolute right-[-90px] top-[-60px] h-[350px] w-[350px] rounded-full border border-[#ded5c7] opacity-40" />

            <div className="relative">

              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#234844]">
                See your proof
              </div>

              <div className="mt-3 flex items-center gap-4 border-b border-[#ddd5c9] pb-5">

                <span className="text-[18px] tracking-[0.35em] text-[#1c2725]">
                  A S T I T V A
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#59615e]">
                  Certificate
                </span>

              </div>


              <div className="mt-5 space-y-4">

                <CertificateRow
                  icon={<FileIcon />}
                  label="FILE NAME"
                  value="project.zip"
                />

                <CertificateRow
                  icon={<Clock3 size={17} strokeWidth={1.4} />}
                  label="TIMESTAMP"
                  value="21 Aug 2026, 11:42 AM UTC"
                />

                <CertificateRow
                  icon={<Link2 size={17} strokeWidth={1.4} />}
                  label="SHA-256 HASH"
                  value="3f7a9c2b18a6e3f2...91bd84e1"
                />

                <CertificateRow
                  icon={<Link2 size={17} strokeWidth={1.4} />}
                  label="TRANSACTION HASH"
                  value="0x8f2d7c1a...4a91"
                />

                <CertificateRow
                  icon={<ShieldCheck size={17} strokeWidth={1.4} />}
                  label="NETWORK"
                  value="Polygon Mumbai"
                />

              </div>


              {/* VERIFIED SEAL */}
              <div className="absolute right-2 top-[118px] hidden flex-col items-center sm:flex">

                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-[3px] border-[#234844] bg-[#173633] shadow-inner">
                  <Check
                    size={34}
                    strokeWidth={1.5}
                    className="text-[#eee8dc]"
                  />
                </div>

                <div className="mt-2 text-center text-[12px] font-medium tracking-[0.12em] text-[#172c29]">
                  VERIFIED
                </div>

                <div className="text-[9px] tracking-[0.14em] text-[#59615e]">
                  ON BLOCKCHAIN
                </div>

              </div>


              {/* VERIFY BUTTON */}
              <button
                type="button"
                className="mt-6 flex h-[48px] w-full items-center justify-center gap-3 bg-[#173633] text-[14px] font-medium text-white transition hover:bg-[#214640]"
              >
                Verify on Polygon Explorer
                <ArrowUpRight size={17} strokeWidth={1.5} />
              </button>

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
          WHY ASTITVA
      ========================================================= */}

      <section
        id="why-astitva"
        className="border-b border-[#ded7cc] bg-[#ebe5da]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-[70px]">

          <div className="max-w-[700px]">

            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#234844]" />

              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#234844]">
                Why Astitva
              </span>
            </div>

            <h2 className="astitva-heading mt-5 text-[40px] leading-[1.05] sm:text-[50px]">
              Because creating something
              <br />
              should leave{" "}
              <span className="text-[#234844]">
                evidence.
              </span>
            </h2>

            <p className="mt-7 max-w-[620px] text-[16px] leading-8 text-[#555651]">
              Astitva gives students and creators a simple way to establish
              when their original work existed. Instead of relying only on
              files, emails or screenshots, your creation gets a
              cryptographically secured record.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-3">

            <WhyCard
              number="01"
              title="Built for creators"
              text="Designed for students, developers, designers, researchers and anyone creating original work."
            />

            <WhyCard
              number="02"
              title="Simple by design"
              text="Upload your work, stamp it, and receive a certificate containing your proof."
            />

            <WhyCard
              number="03"
              title="Verifiable evidence"
              text="Your transaction can be independently checked against the blockchain record."
            />

          </div>

        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section
        id="about"
        className="bg-[#173633] px-6 py-24 text-[#f5f1ea] sm:px-10 lg:px-[70px]"
      >
        <div className="mx-auto max-w-[1440px] text-center">

          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#caa66f]">
            Your work deserves a record
          </p>

          <h2 className="astitva-heading mx-auto mt-5 max-w-[850px] text-[46px] leading-[1.05] sm:text-[62px]">
            You created it.
            <br />
            <span className="text-[#d6c7b0]">
              Make it provable.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[600px] text-[16px] leading-7 text-[#c9d1cd]">
            Create a permanent record of your original work before someone
            else claims it.
          </p>

          <a
           href="/stamp-my-work"
            className="group mt-9 inline-flex items-center gap-4 bg-[#f3eee5] px-7 py-4 text-[15px] font-medium text-[#173633] transition hover:bg-white"
          >
            Stamp My Work

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>

        </div>
      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#102a27] text-[#c8cfcc]">

        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 border-t border-white/10 px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-[70px]">

          <div>
            <div className="text-[15px] tracking-[0.35em] text-white">
              A S T I T V A
            </div>

            <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#c59b5e]">
              Proof of Creation
            </div>
          </div>

          <div className="text-[12px] text-[#9da8a4]">
            Your creation. Your proof. Forever yours.
          </div>

          <div className="text-[12px] text-[#9da8a4]">
            CodeFusion 2K26
          </div>

        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function Feature({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4 border-b border-[#ded7cc] px-7 py-5 md:border-b-0 md:border-r md:last:border-r-0">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee7dc] text-[#173633]">
        {icon}
      </div>

      <div>
        <h3 className="text-[14px] font-semibold text-[#191b1a]">
          {title}
        </h3>

        <p className="mt-1 text-[12px] text-[#696b67]">
          {description}
        </p>
      </div>

    </div>
  );
}


function Impact({ icon, number, text }) {
  return (
    <div className="flex items-center gap-5 border-b border-white/10 px-8 py-6 md:border-b-0 md:border-r md:last:border-r-0">

      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#80928c]/40 text-[#d8c8ad]">
        {icon}
      </div>

      <div>
        <div className="text-[23px] font-light">
          {number}
        </div>

        <div className="mt-1 text-[12px] leading-5 text-[#d1d8d5]">
          {text}
        </div>
      </div>

    </div>
  );
}


function Step({ number, icon, title, description }) {
  return (
    <div className="relative">

      <div className="flex h-[74px] w-[74px] items-center justify-center border border-[#d9d0c3] bg-[#eee7dc] text-[#234844]">
        {icon}
      </div>

      <div className="mt-4 flex items-center gap-3">

        <span className="font-mono text-[11px] text-[#234844]">
          {number}
        </span>

        <h3 className="text-[15px] font-semibold">
          {title}
        </h3>

      </div>

      <p className="mt-2 text-[12px] leading-5 text-[#666762]">
        {description}
      </p>

    </div>
  );
}


function CertificateRow({ icon, label, value }) {
  return (
    <div className="grid grid-cols-[24px_105px_1fr] items-center gap-2 border-b border-[#e4ddd2] pb-3">

      <div className="text-[#233f3b]">
        {icon}
      </div>

      <div className="text-[9px] font-semibold tracking-[0.08em] text-[#555b58]">
        {label}
      </div>

      <div className="truncate text-[11px] text-[#282c2a]">
        {value}
      </div>

    </div>
  );
}


function WhyCard({ number, title, text }) {
  return (
    <div className="border border-[#d4ccbf] bg-[#f5f1e9] p-7">

      <div className="font-mono text-[11px] text-[#b17c3f]">
        {number}
      </div>

      <h3 className="mt-12 text-[19px] font-medium">
        {title}
      </h3>

      <p className="mt-3 text-[13px] leading-6 text-[#686963]">
        {text}
      </p>

    </div>
  );
}


function FileIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export default LandingPage;