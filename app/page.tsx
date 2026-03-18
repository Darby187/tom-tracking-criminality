"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./page.module.css";

const STORAGE_KEY = "criminal_last_date";
const CRIMINAL_NAME_KEY = "criminal_name";

function getDaysSince(dateStr: string): number {
  const past = new Date(dateStr);
  past.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = now.getTime() - past.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function Home() {
  const [days, setDays] = useState<number | null>(null);
  const [lastDate, setLastDate] = useState<string | null>(null);
  const [criminalName, setCriminalName] = useState("him");
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [shaking, setShaking] = useState(false);
  const [justReset, setJustReset] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const storedDate = localStorage.getItem(STORAGE_KEY);
    const storedName = localStorage.getItem(CRIMINAL_NAME_KEY);
    if (storedName) setCriminalName(storedName);
    if (storedDate) {
      setLastDate(storedDate);
      setDays(getDaysSince(storedDate));
    } else {
      const today = getTodayString();
      localStorage.setItem(STORAGE_KEY, today);
      setLastDate(today);
      setDays(0);
    }
  }, []);

  const handleReset = useCallback(() => {
    setShowConfirm(false);
    const today = getTodayString();
    localStorage.setItem(STORAGE_KEY, today);
    setLastDate(today);
    setDays(0);
    setJustReset(true);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
    setTimeout(() => setJustReset(false), 4000);
  }, []);

  const handleNameSave = () => {
    const trimmed = nameInput.trim();
    if (trimmed) {
      setCriminalName(trimmed);
      localStorage.setItem(CRIMINAL_NAME_KEY, trimmed);
    }
    setEditingName(false);
  };

  const getMilestoneLabel = (d: number) => {
    if (d >= 365) return { text: "LEGENDARY", color: "#f5c518" };
    if (d >= 100) return { text: "CENTURY", color: "#4fc3f7" };
    if (d >= 30) return { text: "CLEAN MONTH", color: "#81c784" };
    if (d >= 7) return { text: "ONE WEEK", color: "#ce93d8" };
    return null;
  };

  const milestone = days !== null ? getMilestoneLabel(days) : null;

  if (!mounted) return null;

  return (
    <main className={styles.main}>
      {/* Scanline effect */}
      <div className={styles.scanline} />

      {/* Crime tape top */}
      <div className={styles.crimeTapeTop}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.tapeText}>CRIMINAL&nbsp;&nbsp;&nbsp;</span>
        ))}
      </div>

      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badgeRow}>
            <span className={styles.badge}>INCIDENT TRACKER</span>
            <span className={styles.badgeDot} />
            <span className={styles.badge}>ACTIVE</span>
          </div>
          <h1 className={styles.title}>DAYS WITHOUT</h1>
          <h2 className={styles.subtitle}>
            <span className={styles.rankWord}>CRIMINAL</span> RANK
          </h2>
          <p className={styles.subjectLine}>
            SUBJECT:{" "}
            {editingName ? (
              <span className={styles.nameEditRow}>
                <input
                  autoFocus
                  className={styles.nameInput}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
                  maxLength={20}
                  placeholder="Enter name..."
                />
                <button className={styles.saveBtn} onClick={handleNameSave}>OK</button>
              </span>
            ) : (
              <button
                className={styles.nameBtn}
                onClick={() => { setNameInput(criminalName); setEditingName(true); }}
              >
                {criminalName.toUpperCase()} ✎
              </button>
            )}
          </p>
        </div>

        {/* Counter */}
        <div
          ref={counterRef}
          className={`${styles.counterBox} ${shaking ? styles.shaking : ""}`}
          style={{ animation: shaking ? undefined : "flicker 8s infinite" }}
        >
          <div className={styles.counterLabel}>CURRENT STREAK</div>
          <div
            key={days}
            className={styles.counterNumber}
          >
            {days !== null ? days : "--"}
          </div>
          <div className={styles.counterUnit}>DAYS CLEAN</div>

          {milestone && (
            <div className={styles.milestone} style={{ color: milestone.color, borderColor: milestone.color }}>
              ★ {milestone.text} ★
            </div>
          )}

          {/* Corner decorations */}
          <div className={`${styles.corner} ${styles.cornerTL}`} />
          <div className={`${styles.corner} ${styles.cornerTR}`} />
          <div className={`${styles.corner} ${styles.cornerBL}`} />
          <div className={`${styles.corner} ${styles.cornerBR}`} />
        </div>

        {/* Last incident */}
        <div className={styles.infoRow}>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>LAST INCIDENT</span>
            <span className={styles.infoValue}>
              {lastDate ? formatDate(lastDate) : "—"}
            </span>
          </div>
        </div>

        {/* Reset area */}
        {!showConfirm ? (
          <button
            className={styles.resetBtn}
            onClick={() => setShowConfirm(true)}
          >
            ⚠ THEY DID IT AGAIN
          </button>
        ) : (
          <div className={styles.confirmBox}>
            <p className={styles.confirmText}>Reset the streak to zero?</p>
            <div className={styles.confirmBtns}>
              <button className={styles.confirmYes} onClick={handleReset}>RESET</button>
              <button className={styles.confirmNo} onClick={() => setShowConfirm(false)}>CANCEL</button>
            </div>
          </div>
        )}

        {/* Shame stamp on reset */}
        {justReset && (
          <div className={styles.shameBanner}>
            THEY FELL OFF. STREAK RESET.
          </div>
        )}

      </div>

      {/* Crime tape bottom */}
      <div className={styles.crimeTapeBottom}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.tapeText}>CRIMINAL&nbsp;&nbsp;&nbsp;</span>
        ))}
      </div>
    </main>
  );
}
