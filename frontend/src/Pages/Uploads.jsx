import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Upload,
  FileText,
  Image as ImageIcon,
  FileArchive,
  File,
  X,
  Eye,
  Download,
  Trash2,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ArrowRight,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

/* =========================================================
   CONSTANTS
========================================================= */

const DB_NAME = "astitva-files";
const DB_VERSION = 1;
const STORE_NAME = "proofs";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "text/plain",
  "text/csv",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "application/json",
  "application/javascript",
];

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".zip",
  ".rar",
  ".txt",
  ".csv",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".json",
  ".js",
];

/* =========================================================
   INDEXED DB
========================================================= */

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });

        store.createIndex("createdAt", "createdAt", {
          unique: false,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

const getAllProofs = async () => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readonly"
    );

    const store = transaction.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = () => {
      const results = request.result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      resolve(results);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

const saveProof = async (proof) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readwrite"
    );

    const store = transaction.objectStore(STORE_NAME);

    const request = store.put(proof);

    request.onsuccess = () => {
      resolve(proof);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

const deleteProof = async (id) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readwrite"
    );

    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

const clearProofs = async () => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readwrite"
    );

    const store = transaction.objectStore(STORE_NAME);

    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

/* =========================================================
   HELPERS
========================================================= */

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const getExtension = (name) => {
  const parts = name.split(".");

  if (parts.length <= 1) {
    return "";
  }

  return `.${parts.pop().toLowerCase()}`;
};

const isAllowedFile = (file) => {
  const extension = getExtension(file.name);

  return (
    ALLOWED_TYPES.includes(file.type) ||
    ALLOWED_EXTENSIONS.includes(extension)
  );
};

const getFileIcon = (fileName, fileType) => {
  const extension = getExtension(fileName);

  if (
    fileType?.startsWith("image/") ||
    [".png", ".jpg", ".jpeg", ".webp", ".svg"].includes(
      extension
    )
  ) {
    return ImageIcon;
  }

  if (
    [".zip", ".rar"].includes(extension) ||
    fileType?.includes("zip") ||
    fileType?.includes("rar")
  ) {
    return FileArchive;
  }

  if (
    extension === ".pdf" ||
    fileType === "application/pdf"
  ) {
    return FileText;
  }

  return File;
};

const isPreviewable = (file) => {
  if (!file) return false;

  if (file.type?.startsWith("image/")) {
    return true;
  }

  if (
    file.type === "application/pdf" ||
    getExtension(file.name) === ".pdf"
  ) {
    return true;
  }

  return false;
};

/* =========================================================
   COMPONENT
========================================================= */

function Uploads() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [history, setHistory] = useState([]);

  const [dragActive, setDragActive] =
    useState(false);

  const [previewFile, setPreviewFile] =
    useState(null);

  const [loadingHistory, setLoadingHistory] =
    useState(true);

  const [stamping, setStamping] =
    useState(false);

  const [message, setMessage] =
    useState(null);

  const [showClearConfirm, setShowClearConfirm] =
    useState(false);

  /* =======================================================
     LOAD HISTORY
  ======================================================= */

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoadingHistory(true);

      const proofs = await getAllProofs();

      setHistory(proofs);
    } catch (error) {
      console.error(
        "Could not load file history:",
        error
      );

      setMessage({
        type: "error",
        text: "Could not load your file history.",
      });
    } finally {
      setLoadingHistory(false);
    }
  };

  /* =======================================================
     SELECT FILE
  ======================================================= */

  const processFile = (file) => {
    if (!file) return;

    setMessage(null);

    if (!isAllowedFile(file)) {
      setMessage({
        type: "error",
        text:
          "This file type is not supported. Please choose a supported file.",
      });

      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setMessage({
        type: "error",
        text:
          "File is too large. Maximum allowed size is 100 MB.",
      });

      return;
    }

    setSelectedFile(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files?.[0];

    processFile(file);

    event.target.value = "";
  };

  /* =======================================================
     DRAG & DROP
  ======================================================= */

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    processFile(file);
  };

  /* =======================================================
     REMOVE SELECTED FILE
  ======================================================= */

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setMessage(null);
  };

  /* =======================================================
     PREVIEW
  ======================================================= */

  const openPreview = (file) => {
    if (!isPreviewable(file)) {
      setMessage({
        type: "error",
        text:
          "Preview is not available for this file type. You can download it instead.",
      });

      return;
    }

    setPreviewFile(file);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  /* =======================================================
     DOWNLOAD
  ======================================================= */

  const downloadFile = (proof) => {
    if (!proof?.fileBlob) {
      setMessage({
        type: "error",
        text: "The file is no longer available.",
      });

      return;
    }

    const url = URL.createObjectURL(
      proof.fileBlob
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = proof.name;

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async (proofId) => {
    const confirmed = window.confirm(
      "Delete this file from your Astitva history?"
    );

    if (!confirmed) return;

    try {
      await deleteProof(proofId);

      setHistory((current) =>
        current.filter(
          (item) => item.id !== proofId
        )
      );

      setMessage({
        type: "success",
        text: "File removed from your history.",
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text: "Could not delete this file.",
      });
    }
  };

  /* =======================================================
     CLEAR HISTORY
  ======================================================= */

  const handleClearHistory = async () => {
    try {
      await clearProofs();

      setHistory([]);

      setShowClearConfirm(false);

      setMessage({
        type: "success",
        text: "Your file history has been cleared.",
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text: "Could not clear your history.",
      });
    }
  };

  /* =======================================================
     STAMP FILE
  ======================================================= */

  const handleStamp = async () => {
    if (!selectedFile) {
      setMessage({
        type: "error",
        text: "Please select a file first.",
      });

      return;
    }

    const apiUrl =
      import.meta.env.VITE_STAMP_API_URL;

    if (!apiUrl) {
      setMessage({
        type: "error",
        text:
          "The stamping backend is not connected yet. Ask Anshul for the API endpoint.",
      });

      return;
    }

    setStamping(true);
    setMessage(null);

    try {
      const formData = new FormData();

      formData.append(
        "file",
        selectedFile
      );

      const response = await axios.post(
        apiUrl,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      const data = response.data;

      /*
        Expected backend response:

        {
          txHash: "...",
          timestamp: "...",
          fileHash: "...",
          fingerprint: "..."
        }
      */

      if (!data?.txHash) {
        throw new Error(
          "The backend did not return a transaction hash."
        );
      }

      const proof = {
        id: crypto.randomUUID(),

        name: selectedFile.name,

        size: selectedFile.size,

        type: selectedFile.type,

        fileBlob: selectedFile,

        createdAt: new Date().toISOString(),

        status: "Verified",

        txHash: data.txHash,

        timestamp:
          data.timestamp ||
          new Date().toISOString(),

        fileHash:
          data.fileHash || "",

        fingerprint:
          data.fingerprint || "",
      };

      await saveProof(proof);

      setHistory((current) => [
        proof,
        ...current,
      ]);

      /*
        Send REAL backend response to certificate.
      */

      navigate("/certificate", {
        state: {
          fileName: selectedFile.name,

          fingerprint:
            data.fingerprint || "",

          fileHash:
            data.fileHash || "",

          txHash: data.txHash,

          timestamp:
            data.timestamp ||
            new Date().toISOString(),
        },
      });

    } catch (error) {
      console.error(
        "Stamping error:",
        error
      );

      let errorMessage =
        "Something went wrong while stamping your file.";

      if (
        error.response?.data?.detail
      ) {
        errorMessage =
          error.response.data.detail;
      } else if (
        error.response?.data?.message
      ) {
        errorMessage =
          error.response.data.message;
      } else if (error.message) {
        errorMessage =
          error.message;
      }

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setStamping(false);
    }
  };

  /* =======================================================
     SAVE FOR LATER
  ======================================================= */

  const saveForLater = async () => {
    if (!selectedFile) {
      setMessage({
        type: "error",
        text: "Please select a file first.",
      });

      return;
    }

    try {
      const existing = history.find(
        (item) =>
          item.name === selectedFile.name &&
          item.size === selectedFile.size
      );

      if (existing) {
        setMessage({
          type: "error",
          text:
            "This file already exists in your history.",
        });

        return;
      }

      const proof = {
        id: crypto.randomUUID(),

        name: selectedFile.name,

        size: selectedFile.size,

        type: selectedFile.type,

        fileBlob: selectedFile,

        createdAt: new Date().toISOString(),

        status: "Not stamped",

        txHash: "",

        timestamp: "",

        fileHash: "",

        fingerprint: "",
      };

      await saveProof(proof);

      setHistory((current) => [
        proof,
        ...current,
      ]);

      setSelectedFile(null);

      setMessage({
        type: "success",
        text:
          "File saved to your local history.",
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          "Could not save this file.",
      });
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex min-h-screen bg-[#F7F3EB] text-[#17241F]">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar />


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="min-w-0 flex-1">

        {/* HEADER */}

        <header className="border-b border-[#DDD7CC] bg-[#FBF9F4] px-5 py-5 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-[1150px]">

            <p className="text-[9px] font-semibold tracking-[0.24em] text-[#9A7040]">
              PROOF OF CREATION
            </p>

            <h1 className="mt-2 font-serif text-[32px] tracking-[-0.035em] text-[#173C34] sm:text-[38px]">
              Upload your creation
            </h1>

            <p className="mt-2 max-w-[600px] text-[12px] leading-5 text-[#6B746F]">
              Upload your original work and create a
              permanent, verifiable record of your creation.
            </p>

          </div>

        </header>


        {/* CONTENT */}

        <div className="mx-auto max-w-[1150px] px-5 py-7 sm:px-8 lg:px-10">

          {/* =================================================
              MESSAGE
          ================================================= */}

          {message && (
            <div
              className={`mb-5 flex items-start gap-3 border px-4 py-3 ${
                message.type === "success"
                  ? "border-[#BBD0BF] bg-[#EDF5EE] text-[#3E654A]"
                  : "border-[#DCC8B7] bg-[#F7EEE8] text-[#79563E]"
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

              <p className="text-[11px] leading-5">
                {message.text}
              </p>

              <button
                onClick={() => setMessage(null)}
                className="ml-auto text-current opacity-60 hover:opacity-100"
              >
                <X size={14} />
              </button>

            </div>
          )}


          {/* =================================================
              UPLOAD + INFO
          ================================================= */}

          <div className="grid gap-5 lg:grid-cols-[1fr_310px]">

            {/* =================================================
                UPLOAD AREA
            ================================================= */}

            <section>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className={`relative flex min-h-[330px] cursor-pointer flex-col items-center justify-center border-2 border-dashed px-6 text-center transition ${
                  dragActive
                    ? "border-[#9A7040] bg-[#F2EBDE]"
                    : "border-[#D8D0C3] bg-[#FCFAF6] hover:border-[#BBA47E] hover:bg-[#FAF7F0]"
                }`}
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                  accept={ALLOWED_EXTENSIONS.join(",")}
                />


                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D8C7A8] bg-[#F4EEE3]">

                  <Upload
                    size={27}
                    strokeWidth={1.3}
                    className="text-[#9B7240]"
                  />

                </div>


                <h2 className="mt-6 font-serif text-[23px] text-[#243A33]">
                  Drop your file here
                </h2>

                <p className="mt-2 text-[11px] text-[#747C77]">
                  or click anywhere to browse from your device
                </p>


                <div className="mt-5 rounded-full border border-[#D9D1C5] bg-[#F8F5EE] px-4 py-2 text-[9px] text-[#747C77]">
                  Maximum file size: 100 MB
                </div>


                <p className="mt-5 max-w-[500px] text-[9px] leading-4 text-[#9A9E9A]">
                  Supported: PDF, DOC, DOCX, ZIP, RAR,
                  PNG, JPG, JPEG, WEBP, SVG, TXT, CSV,
                  JSON and JS
                </p>

              </div>


              {/* =================================================
                  SELECTED FILE
              ================================================= */}

              {selectedFile && (
                <div className="mt-4 border border-[#DCD5CA] bg-[#FCFAF6] p-4">

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F3E9DB] text-[#A37742]">

                      {(() => {
                        const Icon =
                          getFileIcon(
                            selectedFile.name,
                            selectedFile.type
                          );

                        return (
                          <Icon
                            size={20}
                            strokeWidth={1.4}
                          />
                        );
                      })()}

                    </div>


                    <div className="min-w-0 flex-1">

                      <p className="truncate text-[12px] font-medium text-[#263630]">
                        {selectedFile.name}
                      </p>

                      <p className="mt-1 text-[9px] text-[#858C87]">
                        {formatFileSize(
                          selectedFile.size
                        )}
                        {" · "}
                        Ready to stamp
                      </p>

                    </div>


                    {isPreviewable(selectedFile) && (
                      <button
                        onClick={(event) => {
                          event.stopPropagation();

                          openPreview({
                            id: "selected",
                            name: selectedFile.name,
                            type: selectedFile.type,
                            fileBlob: selectedFile,
                          });
                        }}
                        className="flex h-8 w-8 items-center justify-center text-[#737B76] hover:bg-[#F0ECE4] hover:text-[#173C34]"
                        title="Preview"
                      >
                        <Eye size={16} />
                      </button>
                    )}


                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        removeSelectedFile();
                      }}
                      className="flex h-8 w-8 items-center justify-center text-[#8B6A5A] hover:bg-[#F2E7DF]"
                      title="Remove"
                    >
                      <X size={17} />
                    </button>

                  </div>

                </div>
              )}


              {/* =================================================
                  ACTIONS
              ================================================= */}

              {selectedFile && (
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                  <button
                    onClick={handleStamp}
                    disabled={stamping}
                    className="group flex h-[52px] flex-1 items-center justify-center gap-3 bg-[#143F36] text-[12px] font-medium text-white transition hover:bg-[#1C5145] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {stamping ? (
                      <>
                        <LoaderCircle
                          size={17}
                          className="animate-spin"
                        />

                        Processing...
                      </>
                    ) : (
                      <>
                        <ShieldCheck
                          size={17}
                          strokeWidth={1.5}
                        />

                        Stamp It

                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}

                  </button>


                  <button
                    onClick={saveForLater}
                    disabled={stamping}
                    className="h-[52px] border border-[#CFC7BB] bg-[#FCFAF6] px-6 text-[11px] font-medium text-[#35423C] transition hover:border-[#AFA18C] hover:bg-[#F4F0E8] disabled:opacity-50"
                  >
                    Save for later
                  </button>

                </div>
              )}

            </section>


            {/* =================================================
                RIGHT INFORMATION
            ================================================= */}

            <aside className="border border-[#DED7CC] bg-[#FCFAF6] p-5">

              <p className="text-[9px] font-semibold tracking-[0.2em] text-[#9A7040]">
                HOW IT WORKS
              </p>


              <div className="mt-6 space-y-6">

                <div className="flex gap-4">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDE4D6] text-[10px] font-semibold text-[#80603B]">
                    01
                  </div>

                  <div>

                    <h3 className="text-[11px] font-semibold text-[#2E3B35]">
                      Upload
                    </h3>

                    <p className="mt-1 text-[9px] leading-4 text-[#777F7A]">
                      Select the original file you want to
                      protect.
                    </p>

                  </div>

                </div>


                <div className="flex gap-4">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDE4D6] text-[10px] font-semibold text-[#80603B]">
                    02
                  </div>

                  <div>

                    <h3 className="text-[11px] font-semibold text-[#2E3B35]">
                      Fingerprint
                    </h3>

                    <p className="mt-1 text-[9px] leading-4 text-[#777F7A]">
                      Your backend will create the semantic
                      fingerprint of your work.
                    </p>

                  </div>

                </div>


                <div className="flex gap-4">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDE4D6] text-[10px] font-semibold text-[#80603B]">
                    03
                  </div>

                  <div>

                    <h3 className="text-[11px] font-semibold text-[#2E3B35]">
                      Secure
                    </h3>

                    <p className="mt-1 text-[9px] leading-4 text-[#777F7A]">
                      The fingerprint is converted into a
                      secure SHA-256 hash.
                    </p>

                  </div>

                </div>


                <div className="flex gap-4">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDE4D6] text-[10px] font-semibold text-[#80603B]">
                    04
                  </div>

                  <div>

                    <h3 className="text-[11px] font-semibold text-[#2E3B35]">
                      Blockchain stamp
                    </h3>

                    <p className="mt-1 text-[9px] leading-4 text-[#777F7A]">
                      The final proof is recorded on the
                      blockchain with a timestamp.
                    </p>

                  </div>

                </div>

              </div>


              <div className="mt-7 border-t border-[#E5DED3] pt-5">

                <div className="flex gap-2">

                  <Clock3
                    size={14}
                    strokeWidth={1.4}
                    className="mt-0.5 shrink-0 text-[#9A7040]"
                  />

                  <p className="text-[9px] leading-4 text-[#7D847F]">
                    Your original file stays in your browser
                    until you choose to send it to the
                    stamping service.
                  </p>

                </div>

              </div>

            </aside>

          </div>


          {/* =================================================
              HISTORY
          ================================================= */}

          <section className="mt-8">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-[9px] font-semibold tracking-[0.2em] text-[#9A7040]">
                  YOUR WORK
                </p>

                <h2 className="mt-2 font-serif text-[25px] text-[#243A33]">
                  File history
                </h2>

              </div>


              {history.length > 0 && (
                <button
                  onClick={() =>
                    setShowClearConfirm(true)
                  }
                  className="text-[9px] font-medium text-[#8A6654] transition hover:text-[#173C34]"
                >
                  Clear history
                </button>
              )}

            </div>


            <div className="mt-4 border border-[#DED7CC] bg-[#FCFAF6]">

              {loadingHistory ? (
                <div className="flex min-h-[150px] items-center justify-center">

                  <LoaderCircle
                    size={22}
                    className="animate-spin text-[#9A7040]"
                  />

                </div>
              ) : history.length === 0 ? (

                <div className="flex min-h-[190px] flex-col items-center justify-center px-5 text-center">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1EADF]">

                    <FileText
                      size={20}
                      strokeWidth={1.3}
                      className="text-[#A37A45]"
                    />

                  </div>

                  <h3 className="mt-4 text-[12px] font-medium text-[#39443E]">
                    No files yet
                  </h3>

                  <p className="mt-1 max-w-[320px] text-[9px] leading-4 text-[#858C87]">
                    Files you save or successfully stamp will
                    appear here.
                  </p>

                </div>

              ) : (

                <div>

                  {history.map((proof, index) => {

                    const Icon = getFileIcon(
                      proof.name,
                      proof.type
                    );

                    return (
                      <div
                        key={proof.id}
                        className={`group flex items-center gap-3 px-4 py-4 transition hover:bg-[#F8F4EC] ${
                          index !== history.length - 1
                            ? "border-b border-[#E8E1D7]"
                            : ""
                        }`}
                      >

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F3E9DB] text-[#A37742]">

                          <Icon
                            size={18}
                            strokeWidth={1.4}
                          />

                        </div>


                        <div className="min-w-0 flex-1">

                          <p className="truncate text-[11px] font-medium text-[#293630]">
                            {proof.name}
                          </p>

                          <p className="mt-1 text-[8px] text-[#8A918C]">
                            {formatFileSize(
                              proof.size
                            )}
                            {" · "}
                            {formatDate(
                              proof.createdAt
                            )}
                          </p>

                        </div>


                        <div className="hidden w-[120px] lg:block">

                          <p className="text-[8px] text-[#8A918C]">
                            {proof.status ===
                            "Verified"
                              ? "SHA-256"
                              : "Status"}
                          </p>

                          <p className="mt-1 truncate font-mono text-[8px] text-[#59625D]">
                            {proof.status ===
                            "Verified"
                              ? proof.fileHash ||
                                "Available after stamp"
                              : "Not stamped"}
                          </p>

                        </div>


                        <div className="hidden w-[90px] sm:block">

                          {proof.status ===
                          "Verified" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F0E8] px-2 py-1 text-[8px] font-medium text-[#447052]">

                              <CheckCircle2
                                size={10}
                              />

                              Verified

                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#F1ECE3] px-2 py-1 text-[8px] font-medium text-[#7A6B55]">

                              <Clock3
                                size={10}
                              />

                              Saved

                            </span>
                          )}

                        </div>


                        <div className="flex items-center gap-1">

                          <button
                            onClick={() =>
                              openPreview(proof)
                            }
                            className="flex h-8 w-8 items-center justify-center text-[#707974] transition hover:bg-[#EDE8DF] hover:text-[#173C34]"
                            title="Preview"
                          >
                            <Eye size={15} />
                          </button>


                          <button
                            onClick={() =>
                              downloadFile(proof)
                            }
                            className="flex h-8 w-8 items-center justify-center text-[#707974] transition hover:bg-[#EDE8DF] hover:text-[#173C34]"
                            title="Download"
                          >
                            <Download size={15} />
                          </button>


                          <button
                            onClick={() =>
                              handleDelete(
                                proof.id
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-[#907264] transition hover:bg-[#F2E7DF] hover:text-[#8A4F3A]"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>

                        </div>

                      </div>
                    );
                  })}

                </div>

              )}

            </div>

          </section>


          {/* =================================================
              SECURITY FOOTER
          ================================================= */}

          <div className="mt-7 flex items-center justify-center gap-2 text-[9px] text-[#8A918C]">

            <CheckCircle2
              size={12}
              strokeWidth={1.4}
            />

            Your files remain under your control.

          </div>

        </div>

      </main>


      {/* =====================================================
          PREVIEW MODAL
      ===================================================== */}

      {previewFile && (
        <PreviewModal
          file={previewFile}
          onClose={closePreview}
        />
      )}


      {/* =====================================================
          CLEAR HISTORY MODAL
      ===================================================== */}

      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102B25]/40 px-5 backdrop-blur-[2px]">

          <div className="w-full max-w-[390px] border border-[#D8D0C4] bg-[#FCFAF6] p-6 shadow-xl">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E6DC]">

              <Trash2
                size={18}
                className="text-[#8A5D48]"
              />

            </div>

            <h2 className="mt-5 font-serif text-[22px] text-[#293A34]">
              Clear file history?
            </h2>

            <p className="mt-2 text-[10px] leading-5 text-[#737C76]">
              This will permanently remove the files stored
              in this browser from your Astitva history.
              This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() =>
                  setShowClearConfirm(false)
                }
                className="h-10 flex-1 border border-[#D2C9BC] text-[10px] font-medium text-[#455049] hover:bg-[#F1ECE4]"
              >
                Cancel
              </button>

              <button
                onClick={handleClearHistory}
                className="h-10 flex-1 bg-[#7E4D3B] text-[10px] font-medium text-white hover:bg-[#6C4031]"
              >
                Clear history
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   PREVIEW MODAL
========================================================= */

function PreviewModal({ file, onClose }) {
  const [previewUrl, setPreviewUrl] =
    useState(null);

  useEffect(() => {
    if (!file?.fileBlob) return;

    const url = URL.createObjectURL(
      file.fileBlob
    );

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);


  if (!previewUrl) return null;

  const isImage =
    file.type?.startsWith("image/");

  const isPdf =
    file.type === "application/pdf" ||
    getExtension(file.name) === ".pdf";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102B25]/60 p-4 backdrop-blur-sm">

      <div className="flex max-h-[92vh] w-full max-w-[1000px] flex-col overflow-hidden border border-[#D6CEC1] bg-[#FCFAF6] shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#E0D9CE] px-5 py-4">

          <div className="min-w-0">

            <p className="truncate text-[12px] font-medium text-[#293630]">
              {file.name}
            </p>

            <p className="mt-1 text-[8px] text-[#858C87]">
              File preview
            </p>

          </div>


          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-[#68726C] hover:bg-[#EFEAE2]"
          >
            <X size={18} />
          </button>

        </div>


        {/* CONTENT */}

        <div className="flex min-h-[400px] flex-1 items-center justify-center overflow-auto bg-[#F1EEE7] p-5">

          {isImage && (
            <img
              src={previewUrl}
              alt={file.name}
              className="max-h-[70vh] max-w-full object-contain shadow-lg"
            />
          )}


          {isPdf && (
            <iframe
              src={previewUrl}
              title={file.name}
              className="h-[70vh] w-full bg-white"
            />
          )}


          {!isImage && !isPdf && (
            <div className="text-center">

              <FileText
                size={40}
                strokeWidth={1.2}
                className="mx-auto text-[#9A7040]"
              />

              <p className="mt-4 text-[12px] text-[#5E6862]">
                Preview is not available for this
                file type.
              </p>

              <p className="mt-1 text-[9px] text-[#8A918C]">
                Download the file to open it on your
                device.
              </p>

            </div>
          )}

        </div>


        {/* FOOTER */}

        <div className="flex items-center justify-between border-t border-[#E0D9CE] px-5 py-3">

          <span className="text-[9px] text-[#818984]">
            {formatFileSize(
              file.fileBlob?.size
            )}
          </span>


          <button
            onClick={() => {
              const url =
                URL.createObjectURL(
                  file.fileBlob
                );

              const link =
                document.createElement("a");

              link.href = url;

              link.download =
                file.name;

              document.body.appendChild(link);

              link.click();

              link.remove();

              setTimeout(() => {
                URL.revokeObjectURL(url);
              }, 100);
            }}
            className="flex items-center gap-2 bg-[#143F36] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#1C5145]"
          >

            <Download size={13} />

            Download

          </button>

        </div>

      </div>

    </div>
  );
}

export default Uploads;