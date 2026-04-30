import React, { useState } from "react";

const BASE_URL = "https://jarquecarl-debug.github.io/CPE302-Activities";

interface Activity {
  id: string;
  folder: string;
  label: string;
  desc: string;
  icon: string;
  tag: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: "1.1",
    folder: "Activity 1.1",
    label: "Activity 1.1",
    desc: "Embedded Systems 2 — Unit 1",
    icon: "📄",
    tag: "Unit 1",
  },
  {
    id: "1.2",
    folder: "Activity 1.2",
    label: "Activity 1.2",
    desc: "Embedded Systems 2 — Unit 1",
    icon: "📄",
    tag: "Unit 1",
  },
  {
    id: "2.1",
    folder: "Activity 2.1",
    label: "Activity 2.1",
    desc: "Embedded Systems 2 — Unit 2",
    icon: "📄",
    tag: "Unit 2",
  },
  {
    id: "2.2",
    folder: "Activity 2.2",
    label: "Activity 2.2",
    desc: "Embedded Systems 2 — Unit 2",
    icon: "📄",
    tag: "Unit 2",
  },
  {
    id: "2.3",
    folder: "Activity 2.3",
    label: "Activity 2.3",
    desc: "Embedded Systems 2 — Unit 2",
    icon: "📄",
    tag: "Unit 2",
  },
  {
    id: "3.1",
    folder: "Activity 3.1",
    label: "Activity 3.1",
    desc: "Embedded Systems 2 — Unit 3",
    icon: "📄",
    tag: "Unit 3",
  },
  {
    id: "3.2",
    folder: "Activity 3.2",
    label: "Activity 3.2",
    desc: "Embedded Systems 2 — Unit 3",
    icon: "📄",
    tag: "Unit 3",
  },
  {
    id: "3.3",
    folder: "Activity 3.3",
    label: "Activity 3.3",
    desc: "Embedded Systems 2 — Unit 3",
    icon: "📄",
    tag: "Unit 3",
  },
];

const UNIT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  "Unit 1": {
    bg: "rgba(0,120,212,0.12)",
    border: "rgba(0,120,212,0.25)",
    text: "rgba(96,165,250,0.9)",
  },
  "Unit 2": {
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.25)",
    text: "rgba(52,211,153,0.9)",
  },
  "Unit 3": {
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
    text: "rgba(251,191,36,0.9)",
  },
};

function ActivityItem({ activity, index }: { activity: Activity; index: number }) {
  const [hovered, setHovered] = useState(false);
  const colors = UNIT_COLORS[activity.tag];

  const handleOpen = () => {
    const url = `${BASE_URL}/${encodeURIComponent(activity.folder)}/`;
    window.open(url, "_blank");
  };

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={handleOpen}
      onClick={handleOpen}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "9px 14px",
        background: hovered ? colors.bg : "rgba(255,255,255,0.02)",
        border: "1px solid",
        borderColor: hovered ? colors.border : "rgba(255,255,255,0.05)",
        borderRadius: 6,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.15s ease",
        transform: hovered ? "translateX(2px)" : "translateX(0)",
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Folder icon */}
      <div style={{
        width: 36,
        height: 36,
        background: hovered ? colors.bg : "rgba(255,255,255,0.05)",
        borderRadius: 7,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        flexShrink: 0,
        border: "1px solid",
        borderColor: hovered ? colors.border : "rgba(255,255,255,0.06)",
        transition: "all 0.15s ease",
      }}>
        📁
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13,
          fontWeight: 500,
          color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          transition: "color 0.15s ease",
          marginBottom: 2,
        }}>
          {activity.label}
        </div>
        <div style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.35)",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}>
          {activity.desc}
        </div>
      </div>

      {/* Unit tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{
          fontSize: 10,
          color: hovered ? colors.text : "rgba(255,255,255,0.25)",
          background: hovered ? colors.bg : "transparent",
          border: "1px solid",
          borderColor: hovered ? colors.border : "rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "2px 8px",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          transition: "all 0.15s ease",
        }}>
          {activity.tag}
        </span>
        {/* Chevron */}
        <svg
          width="12" height="12" viewBox="0 0 12 12"
          style={{
            opacity: hovered ? 0.6 : 0.2,
            transform: hovered ? "translateX(2px)" : "translateX(0)",
            transition: "all 0.15s ease",
            flexShrink: 0,
          }}
        >
          <path d="M4 2L8 6L4 10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </button>
  );
}

export function AcademicWorksContent() {
  const units = ["Unit 1", "Unit 2", "Unit 3"];

  return (
    <div>
      {/* Explorer toolbar */}
      <div className="explorer-toolbar">
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>→</span>
        <span className="explorer-breadcrumb">
          This PC &gt; Portfolio &gt; Academic Works &gt; CPE302 — Embedded Systems 2
        </span>
        <button
          onClick={() => window.open("https://github.com/jarquecarl-debug/CPE302-Activities", "_blank")}
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 5,
            color: "rgba(255,255,255,0.55)",
            fontSize: 11,
            padding: "3px 10px",
            cursor: "pointer",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.09)";
            e.currentTarget.style.color = "rgba(255,255,255,0.85)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.55)";
          }}
        >
          <span>🐙</span> View Repo
        </button>
      </div>

      {/* Overview link */}
      <div style={{ padding: "10px 14px 4px" }}>
        <button
          onClick={() => window.open(BASE_URL, "_blank")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: "10px 14px",
            background: "rgba(0,120,212,0.08)",
            border: "1px solid rgba(0,120,212,0.2)",
            borderRadius: 8,
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(0,120,212,0.15)";
            e.currentTarget.style.borderColor = "rgba(0,120,212,0.35)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,120,212,0.08)";
            e.currentTarget.style.borderColor = "rgba(0,120,212,0.2)";
          }}
        >
          <span style={{ fontSize: 20 }}>🌐</span>
          <div>
            <div style={{
              fontSize: 12, fontWeight: 600,
              color: "rgba(96,165,250,0.95)",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
              marginBottom: 2,
            }}>
              CPE302 — Embedded Systems 2
            </div>
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.35)",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}>
              Open live overview · jarquecarl-debug.github.io/CPE302-Activities
            </div>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: "auto", opacity: 0.4, flexShrink: 0 }}>
            <path d="M4 2L8 6L4 10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3"
              strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
      </div>

      {/* Activities grouped by unit */}
      <div style={{ padding: "8px 14px", display: "flex", flexDirection: "column", gap: 16 }}>
        {units.map(unit => {
          const unitActivities = ACTIVITIES.filter(a => a.tag === unit);
          const colors = UNIT_COLORS[unit];
          return (
            <div key={unit}>
              {/* Unit header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}>
                <div style={{
                  width: 3, height: 14,
                  background: colors.text,
                  borderRadius: 2,
                  opacity: 0.7,
                }} />
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: colors.text,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}>
                  {unit}
                </span>
                <div style={{
                  flex: 1, height: 1,
                  background: colors.border,
                  opacity: 0.5,
                }} />
                <span style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}>
                  {unitActivities.length} activities
                </span>
              </div>

              {/* Activity list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {unitActivities.map((activity, i) => (
                  <ActivityItem key={activity.id} activity={activity} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}