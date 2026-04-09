import React, { useState, useEffect, useRef } from "react";

interface NotificationCenterProps {
  onClose: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  brightness: number;
  onBrightnessChange: (v: number) => void;
  onOpenContact: () => void;
}

export default function NotificationCenter({
  onClose,
  darkMode,
  onToggleDark,
  brightness,
  onBrightnessChange,
  onOpenContact,
}: NotificationCenterProps) {
  const [time, setTime] = useState(new Date());
  const [wifi, setWifi] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key === "Escape") { onClose(); return; }
      } else {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
          onClose();
        }
      }
    };
    const t = setTimeout(() => {
      document.addEventListener("mousedown", handle);
      document.addEventListener("keydown", handle);
    }, 50);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handle);
    };
  }, [onClose]);

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  const formatDate = (d: Date) => d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const handleWifiClick = () => {
    setWifi((v) => !v);
    if (!wifi) onOpenContact();
    else onOpenContact();
  };

  return (
    <>
      <div className="notif-overlay" onClick={onClose} />
      <div ref={panelRef} className="notif-panel">
        <div className="notif-datetime">
          <div className="notif-time">{formatTime(time)}</div>
          <div className="notif-date">{formatDate(time)}</div>
        </div>

        <div className="notif-toggles">
          <button
            className={`notif-toggle${wifi ? " active" : ""}`}
            onClick={handleWifiClick}
            title="Open Contact"
          >
            <span className="notif-toggle-icon">📶</span>
            <span className="notif-toggle-label">Connect</span>
          </button>
          <button
            className={`notif-toggle${darkMode ? " active" : ""}`}
            onClick={onToggleDark}
          >
            <span className="notif-toggle-icon">{darkMode ? "🌙" : "☀️"}</span>
            <span className="notif-toggle-label">{darkMode ? "Dark mode" : "Light mode"}</span>
          </button>
        </div>

        <div className="notif-sliders">
          <div className="notif-slider-row">
            <span className="notif-slider-icon">☀️</span>
            <input
              type="range"
              className="notif-slider"
              min={20} max={100}
              value={brightness}
              onChange={(e) => onBrightnessChange(Number(e.target.value))}
            />
            <span className="notif-slider-val">{brightness}</span>
          </div>
        </div>

        <div className="notif-section-label">Notifications</div>
        <div className="notif-empty">
          <div style={{ fontSize: 28 }}>🔔</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>No new notifications</div>
        </div>
      </div>
    </>
  );
}