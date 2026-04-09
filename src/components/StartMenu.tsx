import React, { useEffect, useRef } from "react";

type WindowId = "projects" | "skills" | "about" | "experience" | "certifications" | "contact";

interface StartMenuProps {
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
}

const PINNED_APPS: { id: WindowId; icon: string; label: string }[] = [
  { id: "about", icon: "🖥️", label: "About Me" },
  { id: "projects", icon: "📁", label: "Projects" },
  { id: "skills", icon: "⚙️", label: "Skills" },
  { id: "experience", icon: "💼", label: "Experience" },
  { id: "certifications", icon: "🎓", label: "Certifications" },
  { id: "contact", icon: "📩", label: "Contact" },
];

export default function StartMenu({ onClose, onOpenWindow }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key === "Escape") { onClose(); return; }
      } else {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
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

  const handleAppClick = (id: WindowId) => {
    onOpenWindow(id);
    onClose();
  };

  return (
    <div className="start-menu" ref={menuRef}>
      <div className="start-menu-search">
        <span className="start-menu-search-icon">🔍</span>
        <input
          className="start-menu-search-input"
          placeholder="Search for apps, files, settings..."
          autoFocus
          readOnly
        />
      </div>

      <div className="start-menu-section-label">Pinned</div>

      <div className="start-menu-pinned">
        {PINNED_APPS.map((app) => (
          <button
            key={app.id}
            className="start-menu-app"
            onClick={() => handleAppClick(app.id)}
          >
            <span className="start-menu-app-icon">{app.icon}</span>
            <span className="start-menu-app-label">{app.label}</span>
          </button>
        ))}
      </div>

      <div className="start-menu-recommended-label">Recommended</div>
      <div className="start-menu-recommended">
        <div className="start-menu-rec-item">
          <span style={{ fontSize: 20 }}>📄</span>
          <div>
            <div className="start-menu-rec-name">Resume.pdf</div>
            <div className="start-menu-rec-time">Download to view</div>
          </div>
        </div>
        <div className="start-menu-rec-item">
          <span style={{ fontSize: 20 }}>🐙</span>
          <div>
            <div className="start-menu-rec-name">GitHub Profile</div>
            <div className="start-menu-rec-time">github.com/jarquecarl-debug</div>
          </div>
        </div>
        <div className="start-menu-rec-item">
          <span style={{ fontSize: 20 }}>💼</span>
          <div>
            <div className="start-menu-rec-name">LinkedIn Profile</div>
            <div className="start-menu-rec-time">linkedin.com/in/carl-jarque</div>
          </div>
        </div>
      </div>

      <div className="start-menu-footer">
        <div className="start-menu-user">
          <div className="start-menu-user-avatar">
            <img src="/IMG_7009.jpg" alt="CCJ" className="start-menu-user-avatar-img" />
          </div>
          <span className="start-menu-user-name">Carl Christian Jarque</span>
        </div>
        <button className="start-menu-power" title="Power">⏻</button>
      </div>
    </div>
  );
}