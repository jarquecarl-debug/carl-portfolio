import React, { useEffect, useRef } from "react";

interface ContextMenuItem {
  label: string;
  icon?: string;
  action?: () => void;
  disabled?: boolean;
  separator?: boolean;
  submenu?: string;
}

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function ContextMenu({ x, y, onClose, onRefresh }: ContextMenuProps) {
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

  const menuW = 220;
  const menuH = 300;
  const adjX = x + menuW > window.innerWidth ? x - menuW : x;
  const adjY = y + menuH > window.innerHeight - 48 ? y - menuH : y;

  const items: ContextMenuItem[] = [
    { label: "View", icon: "👁", submenu: "▶" },
    { label: "Sort by", icon: "⬆", submenu: "▶" },
    { label: "Refresh", icon: "🔄", action: () => { onRefresh?.(); onClose(); } },
    { separator: true, label: "" },
    { label: "New", icon: "✨", submenu: "▶" },
    { separator: true, label: "" },
    { label: "Display settings", icon: "🖥️", disabled: true },
    { label: "Personalize", icon: "🎨", disabled: true },
    { separator: true, label: "" },
    { label: "Open in Terminal", icon: "⬛", disabled: true },
    { separator: true, label: "" },
    { label: "About this Portfolio", icon: "ℹ️", action: () => { alert("Windows 11 Portfolio\nBuilt by Carl Christian Jarque"); onClose(); } },
  ];

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ left: adjX, top: adjY }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item, i) => {
        if (item.separator) return <div key={i} className="context-menu-sep" />;
        return (
          <div
            key={i}
            className={`context-menu-item${item.disabled ? " disabled" : ""}`}
            onClick={() => { if (!item.disabled && item.action) { item.action(); } else if (!item.disabled && !item.action) { onClose(); } }}
          >
            <span className="context-menu-icon">{item.icon || ""}</span>
            <span className="context-menu-label">{item.label}</span>
            {item.submenu && <span className="context-menu-arrow">{item.submenu}</span>}
          </div>
        );
      })}
    </div>
  );
}
