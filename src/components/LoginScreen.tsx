import React, { useState, useEffect } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [time, setTime] = useState(new Date());
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

  const formatDate = (d: Date) =>
    d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(onLogin, 500);
  };

  return (
    <div
      className={`login-screen${visible ? " visible" : ""}${dismissed ? " dismissed" : ""}`}
      onClick={handleDismiss}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleDismiss(); }}
      tabIndex={0}
    >
      <div className="login-wallpaper" />

      <div className="login-content">
        <div className="login-time">{formatTime(time)}</div>
        <div className="login-date">{formatDate(time)}</div>

        <div className="login-user">
          <div className="login-avatar">
            <img src="/IMG_7009.jpg" alt="Carl Christian Jarque" className="login-avatar-img" />
          </div>
          <div className="login-name">Carl Christian Jarque</div>
          <div className="login-hint">
            <span className="login-hint-icon">↑</span>
            Click anywhere to sign in
          </div>
        </div>
      </div>

      <div className="login-bottom">
        <div className="login-bottom-icons">
          <span title="WiFi">🛜</span>
          <span title="Battery">🔋</span>
        </div>
      </div>
    </div>
  );
}