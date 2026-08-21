import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Activity as ActivityIcon,
  CheckCircle2,
  Clock3,
  FileText,
  ShieldCheck,
  Trash2,
  Upload,
  ArrowRight,
  LoaderCircle,
  AlertCircle,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

/* =========================================================
   INDEXED DB
========================================================= */

const DB_NAME = "astitva-files";
const DB_VERSION = 1;
const STORE_NAME = "proofs";

/* =========================================================
   OPEN DATABASE
========================================================= */

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(
      DB_NAME,
      DB_VERSION
    );

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (
        !db.objectStoreNames.contains(
          STORE_NAME
        )
      ) {
        const store = db.createObjectStore(
          STORE_NAME,
          {
            keyPath: "id",
          }
        );

        store.createIndex(
          "createdAt",
          "createdAt",
          {
            unique: false,
          }
        );
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

/* =========================================================
   GET ALL FILES
========================================================= */

const getAllProofs = async () => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readonly"
    );

    const store =
      transaction.objectStore(
        STORE_NAME
      );

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

/* =========================================================
   DELETE ALL FILES
========================================================= */

const clearProofs = async () => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readwrite"
    );

    const store =
      transaction.objectStore(
        STORE_NAME
      );

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

const formatDateTime = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(date));
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
};

/* =========================================================
   ACTIVITY CREATOR
========================================================= */

const createActivities = (proofs) => {
  const activities = [];

  proofs.forEach((proof) => {
    /*
      Every saved file represents an upload/save
      activity.
    */

    activities.push({
      id: `${proof.id}-uploaded`,

      type:
        proof.status === "Verified"
          ? "stamped"
          : "saved",

      title:
        proof.status === "Verified"
          ? "Work stamped"
          : "File saved",

      description:
        proof.status === "Verified"
          ? "Your creation was successfully recorded."
          : "Your file was saved to your Astitva history.",

      fileName: proof.name,

      fileSize: proof.size,

      createdAt:
        proof.timestamp ||
        proof.createdAt,

      proofId: proof.id,

      txHash:
        proof.txHash || "",

      status:
        proof.status,
    });
  });

  return activities.sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );
};

/* =========================================================
   ACTIVITY PAGE
========================================================= */

function Activity() {
  const navigate = useNavigate();

  const [activities, setActivities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  const [message, setMessage] =
    useState(null);

  const [showClearConfirm, setShowClearConfirm] =
    useState(false);

  /* =======================================================
     LOAD ACTIVITY
  ======================================================= */

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      setLoading(true);

      const proofs =
        await getAllProofs();

      const activityData =
        createActivities(proofs);

      setActivities(activityData);
    } catch (error) {
      console.error(
        "Could not load activity:",
        error
      );

      setMessage({
        type: "error",
        text:
          "Could not load your activity.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredActivities =
    activities.filter((item) => {
      if (filter === "all") {
        return true;
      }

      if (filter === "stamped") {
        return item.type === "stamped";
      }

      if (filter === "saved") {
        return item.type === "saved";
      }

      return true;
    });

  /* =======================================================
     CLEAR ACTIVITY
  ======================================================= */

  const handleClearActivity = async () => {
    try {
      await clearProofs();

      setActivities([]);

      setShowClearConfirm(false);

      setMessage({
        type: "success",
        text:
          "Your activity history has been cleared.",
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          "Could not clear your activity.",
      });
    }
  };

  /* =======================================================
     ACTIVITY ICON
  ======================================================= */

  const getActivityIcon = (type) => {
    if (type === "stamped") {
      return ShieldCheck;
    }

    return Upload;
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

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="border-b border-[#DDD7CC] bg-[#FBF9F4] px-5 py-6 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-[1100px]">

            <p className="text-[9px] font-semibold tracking-[0.24em] text-[#9A7040]">
              YOUR RECORD
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <h1 className="font-serif text-[32px] tracking-[-0.035em] text-[#173C34] sm:text-[38px]">
                  Activity
                </h1>

                <p className="mt-2 max-w-[550px] text-[11px] leading-5 text-[#6B746F]">
                  A record of the work you have
                  saved and stamped through ASTITVA.
                </p>

              </div>


              {activities.length > 0 && (
                <button
                  onClick={() =>
                    setShowClearConfirm(
                      true
                    )
                  }
                  className="flex h-9 items-center justify-center gap-2 self-start border border-[#D2C9BC] px-4 text-[9px] font-medium text-[#7D6658] transition hover:bg-[#F1ECE4] sm:self-auto"
                >

                  <Trash2 size={13} />

                  Clear activity

                </button>
              )}

            </div>

          </div>

        </header>


        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="mx-auto max-w-[1100px] px-5 py-7 sm:px-8 lg:px-10">

          {/* =================================================
              MESSAGE
          ================================================= */}

          {message && (
            <div
              className={`mb-5 flex items-start gap-3 border px-4 py-3 ${
                message.type ===
                "success"
                  ? "border-[#BBD0BF] bg-[#EDF5EE] text-[#3E654A]"
                  : "border-[#DCC8B7] bg-[#F7EEE8] text-[#79563E]"
              }`}
            >

              {message.type ===
              "success" ? (
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
                onClick={() =>
                  setMessage(null)
                }
                className="ml-auto opacity-60 hover:opacity-100"
              >
                <X size={14} />
              </button>

            </div>
          )}


          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="grid gap-4 sm:grid-cols-3">

            {/* TOTAL */}

            <div className="border border-[#DED7CC] bg-[#FCFAF6] p-5">

              <div className="flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center bg-[#F1EADF]">

                  <ActivityIcon
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#9A7040]"
                  />

                </div>

                <span className="text-[8px] font-medium tracking-[0.15em] text-[#969D98]">
                  TOTAL
                </span>

              </div>

              <p className="mt-5 font-serif text-[28px] text-[#263B34]">
                {activities.length}
              </p>

              <p className="mt-1 text-[9px] text-[#858C87]">
                Recorded activities
              </p>

            </div>


            {/* STAMPED */}

            <div className="border border-[#DED7CC] bg-[#FCFAF6] p-5">

              <div className="flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center bg-[#E8F0E8]">

                  <ShieldCheck
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#4C7458]"
                  />

                </div>

                <span className="text-[8px] font-medium tracking-[0.15em] text-[#969D98]">
                  STAMPED
                </span>

              </div>

              <p className="mt-5 font-serif text-[28px] text-[#263B34]">
                {
                  activities.filter(
                    (item) =>
                      item.type ===
                      "stamped"
                  ).length
                }
              </p>

              <p className="mt-1 text-[9px] text-[#858C87]">
                Blockchain records
              </p>

            </div>


            {/* SAVED */}

            <div className="border border-[#DED7CC] bg-[#FCFAF6] p-5">

              <div className="flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center bg-[#F1ECE3]">

                  <Clock3
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#8B7458]"
                  />

                </div>

                <span className="text-[8px] font-medium tracking-[0.15em] text-[#969D98]">
                  SAVED
                </span>

              </div>

              <p className="mt-5 font-serif text-[28px] text-[#263B34]">
                {
                  activities.filter(
                    (item) =>
                      item.type ===
                      "saved"
                  ).length
                }
              </p>

              <p className="mt-1 text-[9px] text-[#858C87]">
                Files saved locally
              </p>

            </div>

          </div>


          {/* =================================================
              FILTER
          ================================================= */}

          <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="text-[9px] font-semibold tracking-[0.2em] text-[#9A7040]">
                TIMELINE
              </p>

              <h2 className="mt-2 font-serif text-[25px] text-[#243A33]">
                Recent activity
              </h2>

            </div>


            <div className="flex border border-[#D7D0C5] bg-[#FCFAF6]">

              <button
                onClick={() =>
                  setFilter("all")
                }
                className={`h-9 px-4 text-[9px] font-medium transition ${
                  filter === "all"
                    ? "bg-[#173F36] text-white"
                    : "text-[#6F7772] hover:bg-[#F1ECE4]"
                }`}
              >
                All
              </button>

              <button
                onClick={() =>
                  setFilter("stamped")
                }
                className={`h-9 px-4 text-[9px] font-medium transition ${
                  filter === "stamped"
                    ? "bg-[#173F36] text-white"
                    : "text-[#6F7772] hover:bg-[#F1ECE4]"
                }`}
              >
                Stamped
              </button>

              <button
                onClick={() =>
                  setFilter("saved")
                }
                className={`h-9 px-4 text-[9px] font-medium transition ${
                  filter === "saved"
                    ? "bg-[#173F36] text-white"
                    : "text-[#6F7772] hover:bg-[#F1ECE4]"
                }`}
              >
                Saved
              </button>

            </div>

          </div>


          {/* =================================================
              ACTIVITY LIST
          ================================================= */}

          <section className="mt-4 border border-[#DED7CC] bg-[#FCFAF6]">

            {loading ? (

              <div className="flex min-h-[250px] items-center justify-center">

                <LoaderCircle
                  size={22}
                  className="animate-spin text-[#9A7040]"
                />

              </div>

            ) : filteredActivities.length ===
              0 ? (

              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F1EADF]">

                  <ActivityIcon
                    size={23}
                    strokeWidth={1.3}
                    className="text-[#A37742]"
                  />

                </div>

                <h3 className="mt-5 font-serif text-[22px] text-[#293A34]">
                  No activity yet
                </h3>

                <p className="mt-2 max-w-[340px] text-[10px] leading-5 text-[#858C87]">

                  {filter === "all"
                    ? "Your uploads and blockchain stamps will appear here as you use ASTITVA."
                    : `There are no ${filter} activities yet.`}

                </p>


                {filter === "all" && (
                  <button
                    onClick={() =>
                      navigate(
                        "/uploads"
                      )
                    }
                    className="group mt-6 flex h-10 items-center gap-2 bg-[#143F36] px-5 text-[10px] font-medium text-white hover:bg-[#1C5145]"
                  >

                    Upload your work

                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </button>
                )}

              </div>

            ) : (

              /* =================================================
                 ACTIVITY ITEMS
              ================================================= */

              <div>

                {filteredActivities.map(
                  (
                    activity,
                    index
                  ) => {

                    const Icon =
                      getActivityIcon(
                        activity.type
                      );

                    const isStamped =
                      activity.type ===
                      "stamped";

                    return (
                      <div
                        key={
                          activity.id
                        }
                        className={`relative flex gap-4 px-5 py-5 transition hover:bg-[#F9F6F0] sm:px-6 ${
                          index !==
                          filteredActivities.length -
                            1
                            ? "border-b border-[#E8E1D7]"
                            : ""
                        }`}
                      >

                        {/* TIMELINE */}

                        <div className="relative flex shrink-0 flex-col items-center">

                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              isStamped
                                ? "bg-[#E7F0E8]"
                                : "bg-[#F1ECE3]"
                            }`}
                          >

                            <Icon
                              size={17}
                              strokeWidth={
                                1.4
                              }
                              className={
                                isStamped
                                  ? "text-[#4B7458]"
                                  : "text-[#92724D]"
                              }
                            />

                          </div>

                          {index !==
                            filteredActivities.length -
                              1 && (
                            <div className="absolute top-10 h-[calc(100%+1px)] w-px bg-[#DDD6CA]" />
                          )}

                        </div>


                        {/* CONTENT */}

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">

                            <div>

                              <div className="flex flex-wrap items-center gap-2">

                                <h3 className="text-[12px] font-semibold text-[#293831]">
                                  {
                                    activity.title
                                  }
                                </h3>

                                {isStamped && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F0E8] px-2 py-1 text-[7px] font-medium text-[#4A7257]">

                                    <CheckCircle2
                                      size={
                                        9
                                      }
                                    />

                                    VERIFIED

                                  </span>
                                )}

                              </div>

                              <p className="mt-1 text-[9px] leading-4 text-[#7B837E]">
                                {
                                  activity.description
                                }
                              </p>

                            </div>


                            <span className="shrink-0 text-[8px] text-[#969D98]">
                              {formatDateTime(
                                activity.createdAt
                              )}
                            </span>

                          </div>


                          {/* FILE CARD */}

                          <div className="mt-4 flex items-center gap-3 border border-[#E2DCD2] bg-[#FAF7F1] px-3 py-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#F0E7DA]">

                              <FileText
                                size={
                                  15
                                }
                                strokeWidth={
                                  1.3
                                }
                                className="text-[#A37742]"
                              />

                            </div>


                            <div className="min-w-0 flex-1">

                              <p className="truncate text-[10px] font-medium text-[#39443E]">
                                {
                                  activity.fileName
                                }
                              </p>

                              <p className="mt-1 text-[8px] text-[#8A918C]">
                                {formatFileSize(
                                  activity.fileSize
                                )}

                                {isStamped &&
                                  " · Blockchain proof created"}
                              </p>

                            </div>


                            {isStamped && (
                              <button
                                onClick={() => {
                                  const proof =
                                    activities.find(
                                      (
                                        item
                                      ) =>
                                        item.proofId ===
                                        activity.proofId
                                    );

                                  if (
                                    proof
                                  ) {
                                    navigate(
                                      "/certificate",
                                      {
                                        state:
                                          {
                                            fileName:
                                              proof.name,

                                            fingerprint:
                                              proof.fingerprint ||
                                              "",

                                            fileHash:
                                              proof.fileHash ||
                                              "",

                                            txHash:
                                              proof.txHash ||
                                              "",

                                            timestamp:
                                              proof.timestamp ||
                                              proof.createdAt,
                                          },
                                      }
                                    );
                                  }
                                }}
                                className="group flex shrink-0 items-center gap-1 text-[8px] font-medium text-[#80603B] hover:text-[#173C34]"
                              >

                                View proof

                                <ArrowRight
                                  size={
                                    11
                                  }
                                  className="transition-transform group-hover:translate-x-0.5"
                                />

                              </button>
                            )}

                          </div>


                          {/* TRANSACTION */}

                          {isStamped &&
                            activity.txHash && (
                              <div className="mt-3 flex items-center gap-2">

                                <ShieldCheck
                                  size={
                                    11
                                  }
                                  className="shrink-0 text-[#7B947F]"
                                />

                                <span className="text-[7px] font-medium tracking-[0.12em] text-[#8A918C]">
                                  TX
                                </span>

                                <span className="min-w-0 truncate font-mono text-[8px] text-[#68716C]">
                                  {
                                    activity.txHash
                                  }
                                </span>

                              </div>
                            )}

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </section>


          {/* =================================================
              FOOTER NOTE
          ================================================= */}

          {activities.length >
            0 && (
            <div className="mt-6 flex items-center justify-center gap-2 text-[8px] text-[#8A918C]">

              <CheckCircle2
                size={11}
                strokeWidth={1.3}
              />

              Activity is stored locally in
              this browser.

            </div>
          )}

        </div>

      </main>


      {/* =====================================================
          CLEAR CONFIRMATION
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
              Clear activity?
            </h2>

            <p className="mt-2 text-[10px] leading-5 text-[#737C76]">

              This will also remove your saved files
              and proof records from this browser.

              <br />

              This action cannot be undone.

            </p>


            <div className="mt-6 flex gap-3">

              <button
                onClick={() =>
                  setShowClearConfirm(
                    false
                  )
                }
                className="h-10 flex-1 border border-[#D2C9BC] text-[10px] font-medium text-[#455049] hover:bg-[#F1ECE4]"
              >
                Cancel
              </button>


              <button
                onClick={
                  handleClearActivity
                }
                className="h-10 flex-1 bg-[#7E4D3B] text-[10px] font-medium text-white hover:bg-[#6C4031]"
              >
                Clear everything
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Activity;