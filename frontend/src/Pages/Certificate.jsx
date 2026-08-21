import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  ShieldCheck,
  Download,
  Clock3,
  Hash,
} from "lucide-react";

function Certificate() {
  const navigate = useNavigate();
  const location = useLocation();

  const [copied, setCopied] = useState("");

  /*
    Certificate data will come from:

    Uploads.jsx
        ↓
    Anshul's backend
        ↓
    txHash
    timestamp
    fileHash
        ↓
    Certificate.jsx
  */

  const certificate = location.state || null;

  /* =====================================================
     COPY
  ===================================================== */

  const copyToClipboard = async (value, type) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  /* =====================================================
     BLOCKCHAIN LINK
  ===================================================== */

  const getExplorerUrl = () => {
    if (!certificate?.txHash) {
      return null;
    }

    /*
      IMPORTANT:

      Keep this as the Polygon network that your
      smart contract is actually deployed on.

      If your team moves to another Polygon network,
      change this URL accordingly.
    */

    return `https://amoy.polygonscan.com/tx/${certificate.txHash}`;
  };

  /* =====================================================
     DOWNLOAD CERTIFICATE
  ===================================================== */

  const downloadCertificate = () => {
    if (!certificate) return;

    const certificateText = `
ASTITVA
PROOF OF CREATION

File: ${certificate.fileName || "Unknown"}

Timestamp:
${certificate.timestamp || "Not available"}

Digital Fingerprint:
${certificate.fingerprint || "Not available"}

SHA-256:
${certificate.fileHash || "Not available"}

Transaction Hash:
${certificate.txHash || "Not available"}

Network:
Polygon

This certificate represents the proof returned by the
ASTITVA stamping service.
`;

    const blob = new Blob(
      [certificateText],
      { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${
      certificate.fileName || "astitva-proof"
    }-certificate.txt`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  };

  /* =====================================================
     NO CERTIFICATE DATA
  ===================================================== */

  if (!certificate) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F3EB] px-5">

        <div className="w-full max-w-[460px] border border-[#DDD6CA] bg-[#FCFAF6] p-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1EADF]">

            <FileText
              size={24}
              strokeWidth={1.3}
              className="text-[#9A7040]"
            />

          </div>

          <h1 className="mt-5 font-serif text-[26px] text-[#173C34]">
            No proof selected
          </h1>

          <p className="mx-auto mt-3 max-w-[340px] text-[11px] leading-5 text-[#747C77]">
            Open a stamped proof from your dashboard or
            upload and stamp a new creation first.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={() => navigate("/dashboard")}
              className="flex h-11 flex-1 items-center justify-center gap-2 bg-[#143F36] text-[11px] font-medium text-white hover:bg-[#1C5145]"
            >
              <ArrowLeft size={15} />
              Dashboard
            </button>

            <button
              onClick={() => navigate("/uploads")}
              className="flex h-11 flex-1 items-center justify-center gap-2 border border-[#CFC7BB] text-[11px] font-medium text-[#35423C] hover:bg-[#F0ECE4]"
            >
              Stamp a creation
            </button>

          </div>

        </div>

      </div>
    );
  }

  const explorerUrl = getExplorerUrl();

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#17241F]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-[#DDD7CC] bg-[#FBF9F4]">

        <div className="mx-auto flex h-[78px] max-w-[1000px] items-center justify-between px-5 sm:px-8">

          {/* LOGO */}

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >

            <div className="flex h-[42px] w-[34px] items-center justify-center border border-[#B58A4D] [clip-path:polygon(50%_0%,92%_22%,92%_76%,50%_100%,8%_76%,8%_22%)]">

              <span className="font-serif text-[20px] text-[#B58A4D]">
                A
              </span>

            </div>

            <div className="text-left">

              <div className="text-[16px] tracking-[0.28em] text-[#173C34]">
                ASTITVA
              </div>

              <div className="mt-1 text-[6px] tracking-[0.28em] text-[#B58A4D]">
                PROOF OF CREATION
              </div>

            </div>

          </button>


          {/* BACK */}

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-[10px] text-[#68716C] transition hover:text-[#173C34]"
          >

            <ArrowLeft size={14} />

            Back to dashboard

          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="px-5 py-10 sm:px-8">

        <div className="mx-auto max-w-[820px]">


          {/* =================================================
              TOP STATUS
          ================================================= */}

          <div className="text-center">

            <div className="mx-auto flex h-[66px] w-[66px] items-center justify-center rounded-full border border-[#AFC6B4] bg-[#EAF2EB]">

              <CheckCircle2
                size={32}
                strokeWidth={1.3}
                className="text-[#4E795B]"
              />

            </div>


            <p className="mt-5 text-[9px] font-semibold tracking-[0.28em] text-[#9A7040]">
              PROOF OF CREATION
            </p>


            <h1 className="mt-3 font-serif text-[38px] tracking-[-0.035em] text-[#173C34] sm:text-[46px]">
              Creation Verified
            </h1>


            <p className="mx-auto mt-3 max-w-[480px] text-[11px] leading-5 text-[#747C77]">
              Your creation has been recorded through the
              ASTITVA proof system.
            </p>

          </div>


          {/* =================================================
              CERTIFICATE
          ================================================= */}

          <section className="relative mt-10 overflow-hidden border border-[#D7CFC2] bg-[#FCFAF6] shadow-[0_18px_50px_rgba(42,51,45,0.06)]">

            {/* Decorative top line */}

            <div className="h-[4px] bg-[#173F36]" />


            <div className="p-6 sm:p-10 lg:p-12">


              {/* CERTIFICATE HEADER */}

              <div className="flex flex-col justify-between gap-6 border-b border-[#E2DCD2] pb-7 sm:flex-row sm:items-start">

                <div>

                  <p className="text-[8px] font-semibold tracking-[0.25em] text-[#9A7040]">
                    ASTITVA
                  </p>

                  <h2 className="mt-2 font-serif text-[28px] text-[#233A33]">
                    Proof Certificate
                  </h2>

                  <p className="mt-1 text-[9px] text-[#818984]">
                    Digital record of creation
                  </p>

                </div>


                {/* VERIFIED */}

                <div className="flex items-center gap-2 self-start rounded-full bg-[#E8F0E8] px-3 py-2">

                  <ShieldCheck
                    size={14}
                    strokeWidth={1.5}
                    className="text-[#4B7458]"
                  />

                  <span className="text-[8px] font-semibold tracking-[0.12em] text-[#4B7458]">
                    VERIFIED
                  </span>

                </div>

              </div>


              {/* =================================================
                  FILE
              ================================================= */}

              <div className="py-8">

                <p className="text-[8px] font-semibold tracking-[0.2em] text-[#9A7040]">
                  FILE
                </p>


                <div className="mt-3 flex items-center gap-4">

                  <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center bg-[#F3E9DB]">

                    <FileText
                      size={23}
                      strokeWidth={1.3}
                      className="text-[#A37742]"
                    />

                  </div>


                  <div className="min-w-0">

                    <p className="truncate text-[15px] font-medium text-[#293831]">
                      {certificate.fileName ||
                        "Unnamed file"}
                    </p>

                    <p className="mt-1 text-[9px] text-[#858C87]">
                      Original creation
                    </p>

                  </div>

                </div>

              </div>


              {/* =================================================
                  DETAILS GRID
              ================================================= */}

              <div className="grid border-t border-[#E2DCD2] sm:grid-cols-2">

                {/* TIMESTAMP */}

                <div className="border-b border-[#E2DCD2] py-6 sm:border-r sm:pr-8">

                  <div className="flex items-center gap-2">

                    <Clock3
                      size={14}
                      strokeWidth={1.4}
                      className="text-[#A37742]"
                    />

                    <p className="text-[8px] font-semibold tracking-[0.16em] text-[#818984]">
                      TIMESTAMP
                    </p>

                  </div>


                  <p className="mt-3 text-[11px] leading-5 text-[#34423B]">
                    {certificate.timestamp ||
                      "Not available"}
                  </p>

                </div>


                {/* NETWORK */}

                <div className="border-b border-[#E2DCD2] py-6 sm:pl-8">

                  <div className="flex items-center gap-2">

                    <ShieldCheck
                      size={14}
                      strokeWidth={1.4}
                      className="text-[#A37742]"
                    />

                    <p className="text-[8px] font-semibold tracking-[0.16em] text-[#818984]">
                      NETWORK
                    </p>

                  </div>


                  <p className="mt-3 text-[11px] text-[#34423B]">
                    Polygon
                  </p>

                </div>


                {/* FINGERPRINT */}

                <div className="border-b border-[#E2DCD2] py-6 sm:border-r sm:pr-8">

                  <div className="flex items-center gap-2">

                    <Hash
                      size={14}
                      strokeWidth={1.4}
                      className="text-[#A37742]"
                    />

                    <p className="text-[8px] font-semibold tracking-[0.16em] text-[#818984]">
                      DIGITAL FINGERPRINT
                    </p>

                  </div>


                  <div className="mt-3 flex items-center gap-2">

                    <p className="min-w-0 break-all font-mono text-[9px] leading-4 text-[#4A5650]">
                      {certificate.fingerprint ||
                        "Not available"}
                    </p>

                    {certificate.fingerprint && (
                      <button
                        onClick={() =>
                          copyToClipboard(
                            certificate.fingerprint,
                            "fingerprint"
                          )
                        }
                        className="shrink-0 text-[#747D77] hover:text-[#173C34]"
                        title="Copy fingerprint"
                      >

                        {copied ===
                        "fingerprint" ? (
                          <CheckCircle2
                            size={14}
                          />
                        ) : (
                          <Copy size={14} />
                        )}

                      </button>
                    )}

                  </div>

                </div>


                {/* SHA */}

                <div className="border-b border-[#E2DCD2] py-6 sm:pl-8">

                  <div className="flex items-center gap-2">

                    <Hash
                      size={14}
                      strokeWidth={1.4}
                      className="text-[#A37742]"
                    />

                    <p className="text-[8px] font-semibold tracking-[0.16em] text-[#818984]">
                      SHA-256 HASH
                    </p>

                  </div>


                  <div className="mt-3 flex items-start gap-2">

                    <p className="min-w-0 break-all font-mono text-[9px] leading-4 text-[#4A5650]">
                      {certificate.fileHash ||
                        "Not available"}
                    </p>

                    {certificate.fileHash && (
                      <button
                        onClick={() =>
                          copyToClipboard(
                            certificate.fileHash,
                            "fileHash"
                          )
                        }
                        className="shrink-0 text-[#747D77] hover:text-[#173C34]"
                        title="Copy hash"
                      >

                        {copied ===
                        "fileHash" ? (
                          <CheckCircle2
                            size={14}
                          />
                        ) : (
                          <Copy size={14} />
                        )}

                      </button>
                    )}

                  </div>

                </div>

              </div>


              {/* =================================================
                  TRANSACTION HASH
              ================================================= */}

              <div className="border-b border-[#E2DCD2] py-7">

                <div className="flex items-center gap-2">

                  <ShieldCheck
                    size={14}
                    strokeWidth={1.4}
                    className="text-[#A37742]"
                  />

                  <p className="text-[8px] font-semibold tracking-[0.18em] text-[#818984]">
                    BLOCKCHAIN TRANSACTION
                  </p>

                </div>


                <div className="mt-3 flex items-start gap-3">

                  <p className="min-w-0 flex-1 break-all font-mono text-[9px] leading-5 text-[#46524C]">

                    {certificate.txHash ||
                      "Not available"}

                  </p>


                  {certificate.txHash && (
                    <button
                      onClick={() =>
                        copyToClipboard(
                          certificate.txHash,
                          "txHash"
                        )
                      }
                      className="shrink-0 text-[#747D77] hover:text-[#173C34]"
                      title="Copy transaction hash"
                    >

                      {copied === "txHash" ? (
                        <CheckCircle2
                          size={15}
                        />
                      ) : (
                        <Copy size={15} />
                      )}

                    </button>
                  )}

                </div>

              </div>


              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="flex flex-col gap-3 pt-7 sm:flex-row">

                {/* VERIFY */}

                {explorerUrl ? (
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-[50px] flex-1 items-center justify-center gap-3 bg-[#143F36] text-[11px] font-medium text-white transition hover:bg-[#1C5145]"
                  >

                    <ExternalLink
                      size={15}
                      strokeWidth={1.5}
                    />

                    Verify on Blockchain

                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </a>
                ) : (
                  <button
                    disabled
                    className="flex h-[50px] flex-1 cursor-not-allowed items-center justify-center gap-2 bg-[#D8D4CD] text-[11px] font-medium text-[#8A8E89]"
                  >

                    <ExternalLink size={15} />

                    Blockchain verification unavailable

                  </button>
                )}


                {/* DOWNLOAD */}

                <button
                  onClick={downloadCertificate}
                  className="flex h-[50px] items-center justify-center gap-2 border border-[#CFC7BB] bg-[#FCFAF6] px-6 text-[11px] font-medium text-[#35423C] transition hover:bg-[#F0ECE4]"
                >

                  <Download
                    size={15}
                    strokeWidth={1.5}
                  />

                  Download Proof

                </button>

              </div>

            </div>

          </section>


          {/* =================================================
              FOOTNOTE
          ================================================= */}

          <div className="mt-7 text-center">

            <p className="text-[9px] leading-5 text-[#858C87]">
              This proof contains the information returned by
              the ASTITVA stamping service.
            </p>

            <p className="mt-1 text-[9px] text-[#9A7040]">
              Your creation. Your proof. Forever yours.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Certificate;