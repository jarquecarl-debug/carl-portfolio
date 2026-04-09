import React, { useState, useCallback, useEffect, useRef } from "react";
import Win11Window, { applySnapLayout, SnapLayout } from "@/components/Win11Window";
import Taskbar from "@/components/Taskbar";
import MobileSheet from "@/components/MobileSheet";
import LoginScreen from "@/components/LoginScreen";
import StartMenu from "@/components/StartMenu";
import ContextMenu from "@/components/ContextMenu";
import NotificationCenter from "@/components/NotificationCenter";
import {
  ProjectsContent,
  SkillsContent,
  AboutContent,
  ExperienceContent,
  CertificationsContent,
  ContactContent,
} from "@/components/WindowContent";

type WindowId = "projects" | "skills" | "about" | "experience" | "certifications" | "contact";

interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  open: boolean;
}

const DESKTOP_ICONS: { id: WindowId; icon: string; label: string }[] = [
  { id: "projects", icon: "📁", label: "Projects" },
  { id: "skills", icon: "⚙️", label: "Skills" },
  { id: "about", icon: "🖥️", label: "About" },
  { id: "experience", icon: "💼", label: "Experience" },
  { id: "certifications", icon: "🎓", label: "Certifications" },
  { id: "contact", icon: "📩", label: "Contact" },
];

const WINDOW_CONFIG: Record<WindowId, { title: string; icon: string; width: number; height: number }> = {
  projects: { title: "Projects — File Explorer", icon: "📁", width: 680, height: 480 },
  skills: { title: "Settings — Skills", icon: "⚙️", width: 480, height: 420 },
  about: { title: "About Me", icon: "🖥️", width: 440, height: 500 },
  experience: { title: "Experience", icon: "💼", width: 480, height: 420 },
  certifications: { title: "Certifications", icon: "🎓", width: 520, height: 400 },
  contact: { title: "Contact", icon: "📩", width: 420, height: 440 },
};

function getWindowContent(id: WindowId) {
  switch (id) {
    case "projects": return <ProjectsContent />;
    case "skills": return <SkillsContent />;
    case "about": return <AboutContent />;
    case "experience": return <ExperienceContent />;
    case "certifications": return <CertificationsContent />;
    case "contact": return <ContactContent />;
  }
}

function getInitialPosition(id: WindowId, index: number): { x: number; y: number } {
  const desktopW = window.innerWidth;
  const desktopH = window.innerHeight - 48;
  const cfg = WINDOW_CONFIG[id];
  const baseX = Math.max(120, (desktopW - cfg.width) / 2 + index * 28);
  const baseY = Math.max(20, (desktopH - cfg.height) / 2 + index * 28);
  return {
    x: Math.min(baseX, desktopW - cfg.width - 20),
    y: Math.min(baseY, desktopH - cfg.height - 20),
  };
}

let zCounter = 100;

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<WindowId | null>(null);
  const [mobileSheet, setMobileSheet] = useState<WindowId | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(85);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show hint after login
  useEffect(() => {
    if (loggedIn && !isMobile) {
      const t = setTimeout(() => {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 3500);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [loggedIn, isMobile]);

  const openWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: false, zIndex: ++zCounter } : w
        );
      }
      const openCount = prev.filter((w) => w.open).length;
      const pos = getInitialPosition(id, openCount);
      const cfg = WINDOW_CONFIG[id];
      return [
        ...prev,
        {
          id,
          title: cfg.title,
          icon: cfg.icon,
          x: pos.x,
          y: pos.y,
          width: cfg.width,
          height: cfg.height,
          minimized: false,
          maximized: false,
          zIndex: ++zCounter,
          open: true,
        },
      ];
    });
    setFocusedId(id);
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
  }, []);

  const snapWindow = useCallback((id: WindowId, layout: SnapLayout) => {
    const snapped = applySnapLayout(layout);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, ...snapped, minimized: false, zIndex: ++zCounter } : w
      )
    );
    setFocusedId(id);
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: ++zCounter } : w))
    );
    setFocusedId(id);
  }, []);

  const updateWindow = useCallback((id: WindowId, updates: Partial<WindowState>) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w))
    );
  }, []);

  const handleTaskbarClick = useCallback((id: string) => {
    const wid = id as WindowId;
    const win = windows.find((w) => w.id === wid);
    if (!win) return;
    if (win.minimized) {
      setWindows((prev) =>
        prev.map((w) => (w.id === wid ? { ...w, minimized: false, zIndex: ++zCounter } : w))
      );
      setFocusedId(wid);
    } else if (focusedId === wid) {
      minimizeWindow(wid);
    } else {
      focusWindow(wid);
    }
  }, [windows, focusedId, minimizeWindow, focusWindow]);

  const handleIconClick = useCallback((id: WindowId) => {
    if (isMobile) {
      setMobileSheet(id);
      return;
    }
    setSelectedIcon(id);
  }, [isMobile]);

  const handleIconDoubleClick = useCallback((id: WindowId) => {
    if (!isMobile) {
      openWindow(id);
      setSelectedIcon(null);
    }
  }, [isMobile, openWindow]);

  const handleDesktopRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setShowStartMenu(false);
    setShowNotif(false);
  }, []);

  const handleDesktopClick = useCallback(() => {
    setSelectedIcon(null);
    setShowStartMenu(false);
    setContextMenu(null);
  }, []);

  const filteredIcons = searchQuery
    ? DESKTOP_ICONS.filter((ic) => ic.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : DESKTOP_ICONS;

  const openWindows = windows.filter((w) => w.open);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div
      className={`app-root${darkMode ? " theme-dark" : " theme-light"}`}
      style={{ width: "100%", height: "100%", position: "fixed", inset: 0, overflow: "hidden" }}
      onContextMenu={handleDesktopRightClick}
    >
      {/* Wallpaper */}
      <div className="wallpaper" />

      {/* Brightness overlay */}
      <div
        className="brightness-overlay"
        style={{ opacity: 1 - brightness / 100 }}
      />

      {/* Desktop area */}
      <div
        className="desktop"
        onClick={handleDesktopClick}
      >
        {/* Desktop Icons */}
        <div className="desktop-icons">
          {(searchQuery ? filteredIcons : DESKTOP_ICONS).map(({ id, icon, label }) => (
            <div
              key={id}
              className={`desktop-icon${selectedIcon === id ? " selected" : ""}${searchQuery && !filteredIcons.find((i) => i.id === id) ? " icon-hidden" : ""}`}
              onClick={(e) => { e.stopPropagation(); handleIconClick(id); }}
              onDoubleClick={(e) => { e.stopPropagation(); handleIconDoubleClick(id); }}
              onTouchEnd={(e) => {
                e.preventDefault();
                if (isMobile) setMobileSheet(id);
                else handleIconDoubleClick(id);
              }}
            >
              <span className="icon-emoji">{icon}</span>
              <span className="icon-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Hint tooltip */}
        {showHint && (
          <div className="desktop-hint">
            Double-click icons to open
          </div>
        )}

        {/* Desktop Windows — desktop only */}
        {!isMobile &&
          openWindows.map((win) => (
            <Win11Window
              key={win.id}
              win={win}
              isFocused={focusedId === win.id}
              onFocus={() => focusWindow(win.id)}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => maximizeWindow(win.id)}
              onSnap={(layout) => snapWindow(win.id, layout)}
              onUpdate={(updates) => updateWindow(win.id as WindowId, updates as Partial<WindowState>)}
            >
              {getWindowContent(win.id)}
            </Win11Window>
          ))}
      </div>

      {/* Mobile bottom sheet */}
      {isMobile && mobileSheet && (
        <MobileSheet
          icon={WINDOW_CONFIG[mobileSheet].icon}
          title={WINDOW_CONFIG[mobileSheet].title}
          onClose={() => setMobileSheet(null)}
        >
          {getWindowContent(mobileSheet)}
        </MobileSheet>
      )}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onClose={() => setShowStartMenu(false)}
          onOpenWindow={(id) => { openWindow(id); }}
        />
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onRefresh={() => window.location.reload()}
        />
      )}

      {/* Notification Center */}
      {showNotif && (
        <NotificationCenter
          onClose={() => setShowNotif(false)}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((v) => !v)}
          brightness={brightness}
          onBrightnessChange={setBrightness}
          onOpenContact={() => { openWindow("contact"); setShowNotif(false); }}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows.map((w) => ({
          id: w.id,
          title: w.title,
          icon: w.icon,
          minimized: w.minimized,
        }))}
        focusedId={focusedId}
        onAppClick={handleTaskbarClick}
        onStartClick={() => { setShowStartMenu((v) => !v); setShowNotif(false); setContextMenu(null); }}
        onNotifClick={() => { setShowNotif((v) => !v); setShowStartMenu(false); setContextMenu(null); }}
        onSearch={setSearchQuery}
      />
    </div>
  );
}
