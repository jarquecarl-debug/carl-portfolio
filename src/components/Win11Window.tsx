import React, { useRef, useEffect, useCallback, useState } from "react";

interface WindowState {
  id: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

interface Win11WindowProps {
  win: WindowState;
  isFocused: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onSnap: (layout: SnapLayout) => void;
  onUpdate: (updates: Partial<WindowState>) => void;
  children: React.ReactNode;
}

export type SnapLayout =
  | "full"
  | "left-half"
  | "right-half"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const SNAP_LAYOUTS: { id: SnapLayout; label: string; preview: React.ReactNode }[] = [
  {
    id: "full",
    label: "Full screen",
    preview: (
      <div style={{ width: "100%", height: "100%", background: "rgba(0,120,215,0.6)", borderRadius: 2 }} />
    ),
  },
  {
    id: "left-half",
    label: "Left half",
    preview: (
      <>
        <div style={{ width: "50%", height: "100%", background: "rgba(0,120,215,0.6)", borderRadius: 2 }} />
        <div style={{ width: "50%", height: "100%", background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
      </>
    ),
  },
  {
    id: "right-half",
    label: "Right half",
    preview: (
      <>
        <div style={{ width: "50%", height: "100%", background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        <div style={{ width: "50%", height: "100%", background: "rgba(0,120,215,0.6)", borderRadius: 2 }} />
      </>
    ),
  },
  {
    id: "top-left",
    label: "Top left",
    preview: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2, width: "100%", height: "100%" }}>
        <div style={{ background: "rgba(0,120,215,0.6)", borderRadius: 2 }} />
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
      </div>
    ),
  },
  {
    id: "top-right",
    label: "Top right",
    preview: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2, width: "100%", height: "100%" }}>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        <div style={{ background: "rgba(0,120,215,0.6)", borderRadius: 2 }} />
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
      </div>
    ),
  },
  {
    id: "bottom-left",
    label: "Bottom left",
    preview: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2, width: "100%", height: "100%" }}>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        <div style={{ background: "rgba(0,120,215,0.6)", borderRadius: 2 }} />
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
      </div>
    ),
  },
];

export function applySnapLayout(
  layout: SnapLayout,
): { x: number; y: number; width: number; height: number; maximized: boolean } {
  const W = window.innerWidth;
  const H = window.innerHeight - 48;
  switch (layout) {
    case "full":
      return { x: 0, y: 0, width: W, height: H, maximized: true };
    case "left-half":
      return { x: 0, y: 0, width: Math.floor(W / 2), height: H, maximized: false };
    case "right-half":
      return { x: Math.floor(W / 2), y: 0, width: Math.floor(W / 2), height: H, maximized: false };
    case "top-left":
      return { x: 0, y: 0, width: Math.floor(W / 2), height: Math.floor(H / 2), maximized: false };
    case "top-right":
      return { x: Math.floor(W / 2), y: 0, width: Math.floor(W / 2), height: Math.floor(H / 2), maximized: false };
    case "bottom-left":
      return { x: 0, y: Math.floor(H / 2), width: Math.floor(W / 2), height: Math.floor(H / 2), maximized: false };
    case "bottom-right":
      return { x: Math.floor(W / 2), y: Math.floor(H / 2), width: Math.floor(W / 2), height: Math.floor(H / 2), maximized: false };
  }
}

function SnapPopup({ onSnap }: { onSnap: (l: SnapLayout) => void }) {
  return (
    <div className="snap-popup">
      <div className="snap-popup-label">Snap layouts</div>
      <div className="snap-grid">
        {SNAP_LAYOUTS.map((layout) => (
          <button
            key={layout.id}
            className="snap-option"
            title={layout.label}
            onClick={(e) => { e.stopPropagation(); onSnap(layout.id); }}
          >
            <div style={{ display: "flex", gap: 2, width: "100%", height: "100%" }}>
              {layout.preview}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Win11Window({
  win,
  isFocused,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onSnap,
  onUpdate,
  children,
}: Win11WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isEntering, setIsEntering] = useState(true);
  const [showSnap, setShowSnap] = useState(false);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dragState = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  }>({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });

  const resizeState = useRef<{
    resizing: boolean;
    dir: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
  }>({ resizing: false, dir: "", startX: 0, startY: 0, origX: 0, origY: 0, origW: 0, origH: 0 });

  useEffect(() => {
    const t = setTimeout(() => setIsEntering(false), 300);
    return () => clearTimeout(t);
  }, []);

  const handleTitlebarMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".win-controls")) return;
    if (win.maximized) return;
    onFocus();
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
    };
    e.preventDefault();
  }, [win, onFocus]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragState.current.dragging) {
        const dx = e.clientX - dragState.current.startX;
        const dy = e.clientY - dragState.current.startY;
        const newX = Math.max(0, Math.min(window.innerWidth - win.width, dragState.current.origX + dx));
        const newY = Math.max(0, Math.min(window.innerHeight - 80 - 36, dragState.current.origY + dy));
        onUpdate({ x: newX, y: newY });
      }
      if (resizeState.current.resizing) {
        const { dir, startX, startY, origX, origY, origW, origH } = resizeState.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        let nx = origX, ny = origY, nw = origW, nh = origH;
        if (dir.includes("e")) nw = Math.max(320, origW + dx);
        if (dir.includes("s")) nh = Math.max(200, origH + dy);
        if (dir.includes("w")) { nw = Math.max(320, origW - dx); nx = origX + origW - nw; }
        if (dir.includes("n")) { nh = Math.max(200, origH - dy); ny = origY + origH - nh; }
        onUpdate({ x: nx, y: ny, width: nw, height: nh });
      }
    };
    const onMouseUp = () => {
      dragState.current.dragging = false;
      resizeState.current.resizing = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [win, onUpdate]);

  const handleResizeMouseDown = useCallback((dir: string) => (e: React.MouseEvent) => {
    onFocus();
    resizeState.current = {
      resizing: true,
      dir,
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
      origW: win.width,
      origH: win.height,
    };
    e.preventDefault();
    e.stopPropagation();
  }, [win, onFocus]);

  const handleMaximizeHoverIn = () => {
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    snapTimeoutRef.current = setTimeout(() => setShowSnap(true), 300);
  };

  const handleMaximizeHoverOut = () => {
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    snapTimeoutRef.current = setTimeout(() => setShowSnap(false), 200);
  };

  const handleSnapClick = (layout: SnapLayout) => {
    setShowSnap(false);
    onSnap(layout);
  };

  const style: React.CSSProperties = win.maximized
    ? {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "calc(100% - 48px)",
        zIndex: win.zIndex,
        borderRadius: 0,
      }
    : {
        position: "absolute",
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={[
        "win-window",
        isFocused ? "focused" : "",
        win.minimized ? "minimized" : "",
        isEntering ? "entering" : "",
        win.maximized ? "maximized" : "",
      ].filter(Boolean).join(" ")}
      style={style}
      onMouseDown={onFocus}
    >
      {/* Resize handles */}
      {!win.maximized && (
        <>
          <div className="win-resize-n" onMouseDown={handleResizeMouseDown("n")} />
          <div className="win-resize-s" onMouseDown={handleResizeMouseDown("s")} />
          <div className="win-resize-e" onMouseDown={handleResizeMouseDown("e")} />
          <div className="win-resize-w" onMouseDown={handleResizeMouseDown("w")} />
          <div className="win-resize-ne" onMouseDown={handleResizeMouseDown("ne")} />
          <div className="win-resize-nw" onMouseDown={handleResizeMouseDown("nw")} />
          <div className="win-resize-se" onMouseDown={handleResizeMouseDown("se")} />
          <div className="win-resize-sw" onMouseDown={handleResizeMouseDown("sw")} />
        </>
      )}

      {/* Title bar */}
      <div
        className="win-titlebar"
        onMouseDown={handleTitlebarMouseDown}
        onDoubleClick={onMaximize}
      >
        <span className="win-titlebar-icon">{win.icon}</span>
        <span className="win-titlebar-title">{win.title}</span>
        <div className="win-controls">
          <button
            className="win-control-btn minimize"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            title="Minimize"
          >
            ─
          </button>

          {/* Maximize with snap popup */}
          <div
            className="win-control-maximize-wrap"
            onMouseEnter={handleMaximizeHoverIn}
            onMouseLeave={handleMaximizeHoverOut}
          >
            <button
              className="win-control-btn maximize"
              onClick={(e) => { e.stopPropagation(); onMaximize(); }}
              title={win.maximized ? "Restore" : "Maximize"}
            >
              {win.maximized ? "⧉" : "□"}
            </button>
            {showSnap && !win.maximized && (
              <div
                onMouseEnter={() => { if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current); }}
                onMouseLeave={handleMaximizeHoverOut}
              >
                <SnapPopup onSnap={handleSnapClick} />
              </div>
            )}
          </div>

          <button
            className="win-control-btn close"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="win-content">{children}</div>
    </div>
  );
}
