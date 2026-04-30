import React, { useState, useRef, useEffect, useCallback } from "react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string; // path in /public folder e.g. "/certs/ai-learning.jpg"
  icon: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: "ai-learning-completion",
    title: "AI Learning Modules Completion (12 hours)",
    issuer: "ASEAN Foundation / AIClassASEAN.org",
    date: "November 2025",
    image: "/certs/certificate.png",
    icon: "🤖",
  },
  {
    id: "ai-ready-seminar",
    title: "AI Ready ASEAN Seminar — Hello, AI World: From Basics to Big Impact",
    issuer: "AI Ready ASEAN / ASEAN Foundation",
    date: "October 2025",
    image: "/certs/AI_Ready_ASEAN_Seminar.PNG",
    icon: "🌐",
  },
  {
    id: "hour-of-code-4hr",
    title: "4-Hour Hour of Code Webinar",
    issuer: "DICT Region 2 Nueva Vizcaya / ILCDB",
    date: "October 2025",
    image: "/certs/4-hour_Hour_of_Code.PNG",
    icon: "💡",
  },
  {
    id: "ai-for-oceans",
    title: "Hour of Code — AI for Oceans",
    issuer: "Code.org",
    date: "October 2025",
    image: "/certs/Hour_of_Code.PNG",
    icon: "🌊",
  },
  {
    id: "btfm-ai-ready-programme",
    title: "Hour of Code — AI Ready ASEAN Programme",
    issuer: "Break The Fake Movement / ASEAN Foundation",
    date: "September 2025",
    image: "/certs/BTFM_x_AI_Ready_ASEAN_Programme_Certificate.png",
    icon: "🎓",
  },
  {
    id: "hello-ai-world",
    title: "Hello, AI World: From Basics to Big Impact",
    issuer: "San Sebastian College – Computer Group of AcTive Engineering Students",
    date: "October 2025",
    image: "/certs/Hello__AI_World.PNG",
    icon: "🧠",
  },
  {
    id: "intl-experts-meeting",
    title: "International Experts Sharing Meeting — Automation and Intelligent Control",
    issuer: "Go Study / PASITA Foundation / SEAMEO TED",
    date: "March 2026",
    image: "/certs/International_Experts_Sharing_Meeting.PNG",
    icon: "🏭",
  },
  {
    id: "intl-perspectives-webinar",
    title: "International Perspectives Series Webinar — Solar Chimney Dryer",
    issuer: "Go Study Global Education",
    date: "April 2026",
    image: "/certs/International_Perspective_Series_Webinar.PNG",
    icon: "☀️",
  },
  {
    id: "computer-architecture",
    title: "BSCpE IV Seminar — Computer Architecture",
    issuer: "Southern Philippines Institute of Science and Technology",
    date: "May 2023",
    image: "/certs/Computer_Architecture.PNG",
    icon: "🖥️",
  },
];

// ─── Photos Viewer ────────────────────────────────────────────────────────────

interface PhotosViewerProps {
  cert: Certification;
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

function PhotosViewer({ cert, onClose, initialPosition }: PhotosViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 820, height: 560 });
  const [zoom, setZoom] = useState(1);
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });
  const [isDraggingWindow, setIsDraggingWindow] = useState(false);
  const [isDraggingImg, setIsDraggingImg] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isEntering, setIsEntering] = useState(true);

  const dragStart = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });
  const imgDragStart = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsEntering(false), 300);
    return () => clearTimeout(t);
  }, []);

  // Auto-hide controls in fullscreen
  useEffect(() => {
    if (!isFullscreen) { setShowControls(true); return; }
    const reset = () => {
      setShowControls(true);
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
      controlsTimer.current = setTimeout(() => setShowControls(false), 2500);
    };
    reset();
    window.addEventListener("mousemove", reset);
    return () => {
      window.removeEventListener("mousemove", reset);
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
    };
  }, [isFullscreen]);

  // Window dragging
  const onTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isFullscreen) return;
    e.preventDefault();
    setIsDraggingWindow(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, wx: position.x, wy: position.y };
  };

  useEffect(() => {
    if (!isDraggingWindow) return;
    const onMove = (e: MouseEvent) => {
      setPosition({
        x: dragStart.current.wx + e.clientX - dragStart.current.mx,
        y: dragStart.current.wy + e.clientY - dragStart.current.my,
      });
    };
    const onUp = () => setIsDraggingWindow(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [isDraggingWindow]);

  // Image panning when zoomed
  const onImgMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDraggingImg(true);
    imgDragStart.current = { mx: e.clientX, my: e.clientY, ox: imgOffset.x, oy: imgOffset.y };
  };

  useEffect(() => {
    if (!isDraggingImg) return;
    const onMove = (e: MouseEvent) => {
      setImgOffset({
        x: imgDragStart.current.ox + e.clientX - imgDragStart.current.mx,
        y: imgDragStart.current.oy + e.clientY - imgDragStart.current.my,
      });
    };
    const onUp = () => setIsDraggingImg(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [isDraggingImg]);

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.25, 4));
  const handleZoomOut = () => {
    setZoom(z => {
      const next = Math.max(z - 0.25, 0.5);
      if (next <= 1) setImgOffset({ x: 0, y: 0 });
      return next;
    });
  };
  const handleZoomReset = () => { setZoom(1); setImgOffset({ x: 0, y: 0 }); };

  const handleToggleFullscreen = () => {
    setIsFullscreen(f => !f);
    setIsMaximized(false);
    setZoom(1);
    setImgOffset({ x: 0, y: 0 });
  };

  const handleToggleMaximize = () => {
    setIsMaximized(m => !m);
    setIsFullscreen(false);
    setZoom(1);
    setImgOffset({ x: 0, y: 0 });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) { setIsFullscreen(false); return; }
        onClose();
      }
      if (e.key === "f" || e.key === "F") handleToggleFullscreen();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleZoomReset();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFullscreen, onClose]);

  const windowStyle: React.CSSProperties = isFullscreen
    ? { position: "fixed", inset: 0, width: "100vw", height: "100vh", borderRadius: 0, zIndex: 9999 }
    : isMaximized
    ? { position: "fixed", top: 0, left: 0, width: "100vw", height: "calc(100vh - 48px)", borderRadius: 0, zIndex: 9999 }
    : {
        position: "fixed",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: 9999,
        borderRadius: 10,
      };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: isFullscreen ? "#000" : "rgba(0,0,0,0.55)",
          backdropFilter: isFullscreen ? "none" : "blur(6px)",
        }}
        onClick={isFullscreen ? undefined : onClose}
      />

      {/* Photos Window */}
      <div
        ref={viewerRef}
        style={{
          ...windowStyle,
          background: "#1a1a1a",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: isFullscreen ? "none" : "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
          transform: isEntering ? "scale(0.96)" : "scale(1)",
          opacity: isEntering ? 0 : 1,
          transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease",
          userSelect: "none",
        }}
      >
        {/* Title Bar */}
        <div
          onMouseDown={onTitleMouseDown}
          style={{
            height: 40,
            background: "rgba(30,30,30,0.98)",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 8,
            cursor: isDraggingWindow ? "grabbing" : isMaximized || isFullscreen ? "default" : "grab",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
            opacity: isFullscreen && !showControls ? 0 : 1,
            transition: "opacity 0.3s ease",
            position: isFullscreen ? "absolute" : "relative",
            top: 0, left: 0, right: 0,
            zIndex: 10,
          }}
        >
          {/* App icon */}
          <span style={{ fontSize: 16, marginRight: 4 }}>🖼️</span>
          <span style={{
            flex: 1, fontSize: 12, color: "rgba(255,255,255,0.7)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}>
            Photos — {cert.title}
          </span>

          {/* Window controls */}
          <div style={{ display: "flex", gap: 0, marginLeft: "auto" }}>
            {/* Minimize (decorative) */}
            <button onClick={() => {}} style={winBtnStyle("#fff")}>
              <svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="currentColor"/></svg>
            </button>
            {/* Maximize / Restore */}
            <button onClick={handleToggleMaximize} style={winBtnStyle("#fff")}>
              {isMaximized
                ? <svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 0H10V7H7V10H0V3H3V0ZM3 3H1V9H6V7H3V3ZM4 1V6H9V1H4Z" fill="currentColor"/></svg>
                : <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" rx="0" fill="none" stroke="currentColor" strokeWidth="1"/></svg>
              }
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              style={winBtnStyle("#fff")}
              onMouseEnter={e => (e.currentTarget.style.background = "#c42b1c")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          height: 44,
          background: "rgba(24,24,24,0.97)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 4,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          flexShrink: 0,
          opacity: isFullscreen && !showControls ? 0 : 1,
          transition: "opacity 0.3s ease",
          position: isFullscreen ? "absolute" : "relative",
          top: isFullscreen ? 40 : "auto",
          left: 0, right: 0,
          zIndex: 10,
        }}>
          {/* Zoom controls */}
          <ToolbarBtn onClick={handleZoomOut} title="Zoom out (-)">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4 6H8M10 10L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </ToolbarBtn>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", minWidth: 36, textAlign: "center", fontFamily: "'Segoe UI', system-ui", cursor: "pointer" }}
            onClick={handleZoomReset}>
            {Math.round(zoom * 100)}%
          </span>
          <ToolbarBtn onClick={handleZoomIn} title="Zoom in (+)">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M6 4V8M4 6H8M10 10L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </ToolbarBtn>

          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />

          {/* Fullscreen toggle */}
          <ToolbarBtn onClick={handleToggleFullscreen} title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}>
            {isFullscreen
              ? <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 1H1V5M9 1H13V5M5 13H1V9M9 13H13V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
          </ToolbarBtn>

          {/* Info pill */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20, padding: "2px 10px", fontSize: 11,
              color: "rgba(255,255,255,0.5)", fontFamily: "'Segoe UI', system-ui",
            }}>
              {cert.date}
            </span>
          </div>
        </div>

        {/* Image Viewport */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
            background: "radial-gradient(ellipse at center, #1e1e1e 0%, #0d0d0d 100%)",
            cursor: zoom > 1 ? (isDraggingImg ? "grabbing" : "grab") : "default",
          }}
          onMouseDown={onImgMouseDown}
        >
          {/* Subtle grid pattern */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }} />

          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src={cert.image}
              alt={cert.title}
              draggable={false}
              style={{
                maxWidth: zoom === 1 ? "90%" : "none",
                maxHeight: zoom === 1 ? "90%" : "none",
                width: zoom !== 1 ? `${zoom * 100}%` : "auto",
                objectFit: zoom === 1 ? "contain" : "none",
                transform: `translate(${imgOffset.x}px, ${imgOffset.y}px)`,
                transition: isDraggingImg ? "none" : "transform 0.1s ease",
                borderRadius: 4,
                boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
                pointerEvents: "none",
              }}
              onError={e => {
                const t = e.currentTarget;
                t.style.display = "none";
                const parent = t.parentElement;
                if (parent && !parent.querySelector(".img-placeholder")) {
                  const placeholder = document.createElement("div");
                  placeholder.className = "img-placeholder";
                  placeholder.style.cssText = `
                    display:flex;flex-direction:column;align-items:center;justify-content:center;
                    gap:12px;color:rgba(255,255,255,0.25);font-family:'Segoe UI',system-ui;
                  `;
                  placeholder.innerHTML = `
                    <div style="font-size:48px">🖼️</div>
                    <div style="font-size:13px">Certificate image not found</div>
                    <div style="font-size:11px;opacity:0.6">Place image at: ${cert.image}</div>
                  `;
                  parent.appendChild(placeholder);
                }
              }}
            />
          </div>

          {/* Bottom info bar (fullscreen) */}
          {isFullscreen && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
              padding: "40px 24px 20px",
              opacity: showControls ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 500, fontFamily: "'Segoe UI', system-ui", marginBottom: 4 }}>
                {cert.title}
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: "'Segoe UI', system-ui" }}>
                {cert.issuer} · {cert.date}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Info Bar (windowed) */}
        {!isFullscreen && (
          <div style={{
            height: 52,
            background: "rgba(22,22,22,0.98)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 10,
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 20 }}>{cert.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                fontFamily: "'Segoe UI', system-ui",
              }}>{cert.title}</div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.4)",
                fontFamily: "'Segoe UI', system-ui",
              }}>{cert.issuer}</div>
            </div>
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.35)",
              fontFamily: "'Segoe UI', system-ui", whiteSpace: "nowrap",
            }}>Press F for fullscreen · Scroll to zoom</div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────

function ToolbarBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 30, height: 30,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "rgba(255,255,255,0.1)" : "transparent",
        border: "none",
        borderRadius: 4,
        color: "rgba(255,255,255,0.7)",
        cursor: "pointer",
        transition: "background 0.15s ease",
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}

// ─── Window control button style ─────────────────────────────────────────────

function winBtnStyle(color: string): React.CSSProperties {
  return {
    width: 46, height: 40,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "transparent",
    border: "none",
    color,
    cursor: "pointer",
    transition: "background 0.12s ease",
    padding: 0,
    flexShrink: 0,
  };
}

// ─── Certifications Window ────────────────────────────────────────────────────

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [viewerOrigin, setViewerOrigin] = useState({ x: 0, y: 0 });

  const handleCertClick = (cert: Certification, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Open viewer centered, slightly offset from click
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setViewerOrigin({
      x: Math.max(40, Math.min(vw - 860, vw / 2 - 410)),
      y: Math.max(40, Math.min(vh - 600, vh / 2 - 280)),
    });
    setSelectedCert(cert);
  };

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "8px 0",
      }}>
        {CERTIFICATIONS.map((cert, i) => (
          <CertificationItem
            key={cert.id}
            cert={cert}
            index={i}
            onClick={(e) => handleCertClick(cert, e)}
          />
        ))}
      </div>

      {selectedCert && (
        <PhotosViewer
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
          initialPosition={viewerOrigin}
        />
      )}
    </>
  );
}

// ─── Certification List Item ──────────────────────────────────────────────────

function CertificationItem({
  cert, index, onClick
}: {
  cert: Certification;
  index: number;
  onClick: (e: React.MouseEvent) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        background: hovered
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.02)",
        border: "1px solid",
        borderColor: hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
        borderRadius: 6,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.15s ease",
        transform: hovered ? "translateX(2px)" : "translateX(0)",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Icon */}
      <div style={{
        width: 38, height: 38,
        background: hovered ? "rgba(0,120,212,0.25)" : "rgba(255,255,255,0.06)",
        borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
        transition: "background 0.15s ease",
        border: "1px solid",
        borderColor: hovered ? "rgba(0,120,212,0.4)" : "rgba(255,255,255,0.06)",
      }}>
        {cert.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 500,
          color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          transition: "color 0.15s ease",
          marginBottom: 2,
        }}>
          {cert.title}
        </div>
        <div style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.4)",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}>
          {cert.issuer}
        </div>
      </div>

      {/* Date + chevron */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{
          fontSize: 11,
          color: hovered ? "rgba(0,150,255,0.9)" : "rgba(255,255,255,0.3)",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          transition: "color 0.15s ease",
        }}>
          {cert.date}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 12 12"
          style={{
            opacity: hovered ? 0.7 : 0.25,
            transform: hovered ? "translateX(2px)" : "translateX(0)",
            transition: "all 0.15s ease",
          }}
        >
          <path d="M4 2L8 6L4 10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
    </button>
  );
}