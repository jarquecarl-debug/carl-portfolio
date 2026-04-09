import React from "react";

interface MobileSheetProps {
  icon: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MobileSheet({ icon, title, onClose, children }: MobileSheetProps) {
  return (
    <>
      <div className="mobile-sheet-overlay" onClick={onClose} />
      <div className="mobile-sheet">
        <div className="mobile-sheet-handle" />
        <div className="mobile-sheet-titlebar">
          <div className="mobile-sheet-title">
            <span>{icon}</span>
            <span>{title}</span>
          </div>
          <button className="mobile-sheet-close" onClick={onClose}>✕</button>
        </div>
        <div className="mobile-sheet-content">
          {children}
        </div>
      </div>
    </>
  );
}
