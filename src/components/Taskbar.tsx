import React, { useState, useEffect, useRef } from "react";

interface TaskbarWindow {
  id: string;
  title: string;
  icon: string;
  minimized: boolean;
}

interface TaskbarProps {
  openWindows: TaskbarWindow[];
  focusedId: string | null;
  onAppClick: (id: string) => void;
  onStartClick: () => void;
  onNotifClick: () => void;
  onSearch: (query: string) => void;
}

export default function Taskbar({
  openWindows,
  focusedId,
  onAppClick,
  onStartClick,
  onNotifClick,
  onSearch,
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    onSearch(searchVal);
  }, [searchVal, onSearch]);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

  const formatDate = (d: Date) =>
    d.toLocaleDateString([], { month: "numeric", day: "numeric", year: "numeric" });

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchVal("");
      setSearchOpen(false);
    }
  };

  return (
    <div className="taskbar">
      {/* Start button */}
      <button className="taskbar-start" onClick={onStartClick} title="Start">
        ⊞
      </button>

      {/* Search bar */}
      <div
        className={`taskbar-search${searchOpen ? " open" : ""}`}
        onClick={() => setSearchOpen(true)}
      >
        <span className="taskbar-search-icon">🔍</span>
        {searchOpen ? (
          <input
            ref={searchRef}
            className="taskbar-search-input"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={handleSearchKey}
            onBlur={() => { if (!searchVal) { setSearchOpen(false); } }}
            placeholder="Search..."
          />
        ) : (
          <span className="taskbar-search-label">Search</span>
        )}
      </div>

      {/* Center — open app buttons */}
      <div className="taskbar-center">
        {openWindows.map((w) => (
          <div
            key={w.id}
            className={[
              "taskbar-app-btn",
              focusedId === w.id && !w.minimized ? "active" : "",
              w.minimized ? "minimized" : "",
            ].filter(Boolean).join(" ")}
            onClick={() => onAppClick(w.id)}
            title={w.title}
          >
            <span style={{ fontSize: 18 }}>{w.icon}</span>
          </div>
        ))}
      </div>

      {/* Right — system tray */}
      <div className="taskbar-right">
        <div
          className="taskbar-system-icons"
          onClick={onNotifClick}
          title="Quick Settings"
        >
          <span>🛜</span>
          <span>🔋</span>
        </div>
        <div
          className="taskbar-clock"
          onClick={onNotifClick}
          title="Notification center"
        >
          <span className="time">{formatTime(time)}</span>
          <span className="date">{formatDate(time)}</span>
        </div>
      </div>
    </div>
  );
}
