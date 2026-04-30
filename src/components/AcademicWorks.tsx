import React, { useState } from "react";

const BASE_URL = "https://jarquecarl-debug.github.io/CPE302-Activities";

interface FileLink {
  name: string;
  url: string;
}

interface Activity {
  id: string;
  label: string;
  files: FileLink[];
  tag: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: "1.1",
    label: "Activity 1.1",
    files: [
      { name: "1st HTML", url: `${BASE_URL}/Activity%201.1/1st%20HTML.html` },
    ],
    tag: "Unit 1",
  },
  {
    id: "1.2",
    label: "Activity 1.2",
    files: [
      { name: "Activity 1.2", url: `${BASE_URL}/Activity%201.2/Activity%201.2.html` },
    ],
    tag: "Unit 1",
  },
  {
    id: "2.1",
    label: "Activity 2.1",
    files: [
      { name: "Resume", url: `${BASE_URL}/Activity%202.1/resume.html` },
    ],
    tag: "Unit 2",
  },
  {
    id: "2.2",
    label: "Activity 2.2",
    files: [
      { name: "Schedule", url: `${BASE_URL}/Activity%202.2/schedule.html` },
    ],
    tag: "Unit 2",
  },
  {
    id: "2.3",
    label: "Activity 2.3",
    files: [
      { name: "Web Presentation", url: `${BASE_URL}/Activity%202.3/web%20presentation.html` },
    ],
    tag: "Unit 2",
  },
  {
    id: "3.1",
    label: "Activity 3.1",
    files: [
      { name: "CSS Prac 1",   url: `${BASE_URL}/Activity%203.1/CSSPRAC1.html` },
      { name: "CSS Prac 1.1", url: `${BASE_URL}/Activity%203.1/CSSPRAC11.html` },
      { name: "CSS Prac 2",   url: `${BASE_URL}/Activity%203.1/CSSPRAC2.html` },
      { name: "CSS Prac 2.2", url: `${BASE_URL}/Activity%203.1/CSSPRAC22.html` },
    ],
    tag: "Unit 3",
  },
  {
    id: "3.2",
    label: "Activity 3.2",
    files: [
      { name: "CSS Prac 1 — Embedded", url: `${BASE_URL}/Activity%203.2/CSSPRAC1_Embedded.html` },
      { name: "CSS Prac 1 — Inline",   url: `${BASE_URL}/Activity%203.2/CSSPRAC1_Inline.html` },
      { name: "CSS Prac 2 — Embedded", url: `${BASE_URL}/Activity%203.2/CSSPRAC2_Embedded.html` },
      { name: "CSS Prac 2 — Inline",   url: `${BASE_URL}/Activity%203.2/CSSPRAC2_Inline.html` },
    ],
    tag: "Unit 3",
  },
  {
    id: "3.3",
    label: "Activity 3.3",
    files: [
      { name: "Triangle Classifier", url: `${BASE_URL}/Activity%203.3/triangle%20classifier.html` },
    ],
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

// ─── Single file chip button ──────────────────────────────────────────────────

function FileButton({ file, colors }: { file: FileLink; colors: { bg: string; border: string; text: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => window.open(file.url, "_blank")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "5px 10px",
        background: hovered ? colors.bg : "rgba(255,255,255,0.03)",
        border: "1px solid",
        borderColor: hovered ? colors.border : "rgba(255,255,255,0.07)",
        borderRadius: 5,
        cursor: "pointer",
        transition: "all 0.13s ease",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 12 }}>📄</span>
      <span style={{
        fontSize: 11,
        color: hovered ? colors.text : "rgba(255,255,255,0.55)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        whiteSpace: "nowrap",
        transition: "color 0.13s ease",
      }}>
        {file.name}
      </span>
      <svg width="9" height="9" viewBox="0 0 10 10" style={{ opacity: hovered ? 0.7 : 0.2, flexShrink: 0 }}>
        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </button>
  );
}

// ─── Activity row ─────────────────────────────────────────────────────────────

function ActivityItem({ activity }: { activity: Activity }) {
  const [hovered, setHovered] = useState(false);
  const colors = UNIT_COLORS[activity.tag];
  const hasManyFiles = activity.files.length > 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", gap: 7,
        padding: "10px 12px",
        background: hovered ? "rgba(255,255,255,0.03)" : "transparent",
        border: "1px solid",
        borderColor: hovered ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
        borderRadius: 7,
        transition: "all 0.15s ease",
      }}
    >
      {/* Row header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32,
          background: hovered ? colors.bg : "rgba(255,255,255,0.05)",
          borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, flexShrink: 0,
          border: "1px solid",
          borderColor: hovered ? colors.border : "rgba(255,255,255,0.06)",
          transition: "all 0.15s ease",
        }}>
          📁
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 500,
            color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            transition: "color 0.15s ease",
          }}>
            {activity.label}
          </div>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.28)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}>
            {activity.files.length} file{activity.files.length > 1 ? "s" : ""}
          </div>
        </div>

        <span style={{
          fontSize: 10,
          color: hovered ? colors.text : "rgba(255,255,255,0.22)",
          background: hovered ? colors.bg : "transparent",
          border: "1px solid",
          borderColor: hovered ? colors.border : "rgba(255,255,255,0.07)",
          borderRadius: 20, padding: "2px 8px",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          transition: "all 0.15s ease", flexShrink: 0,
        }}>
          {activity.tag}
        </span>

        {/* Single file — inline open button */}
        {!hasManyFiles && (
          <button
            onClick={() => window.open(activity.files[0].url, "_blank")}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "4px 10px",
              background: hovered ? colors.bg : "rgba(255,255,255,0.04)",
              border: "1px solid",
              borderColor: hovered ? colors.border : "rgba(255,255,255,0.08)",
              borderRadius: 5,
              color: hovered ? colors.text : "rgba(255,255,255,0.45)",
              fontSize: 11, cursor: "pointer",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
              transition: "all 0.13s ease", flexShrink: 0,
            }}
          >
            Open
            <svg width="9" height="9" viewBox="0 0 10 10" style={{ opacity: 0.7 }}>
              <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        )}
      </div>

      {/* Multiple files — chip row */}
      {hasManyFiles && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, paddingLeft: 42 }}>
          {activity.files.map(file => (
            <FileButton key={file.name} file={file} colors={colors} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function AcademicWorksContent() {
  const units = ["Unit 1", "Unit 2", "Unit 3"];

  return (
    <div>
      {/* Explorer toolbar */}
      <div className="explorer-toolbar">
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>→</span>
        <span className="explorer-breadcrumb">
          This PC &gt; Portfolio &gt; Academic Works
        </span>
        <button
          onClick={() => window.open("https://github.com/jarquecarl-debug/CPE302-Activities", "_blank")}
          style={{
            marginLeft: "auto",
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 5,
            color: "rgba(255,255,255,0.55)",
            fontSize: 11, padding: "3px 10px",
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

      {/* Overview banner */}
      <div style={{ padding: "10px 14px 4px" }}>
        <button
          onClick={() => window.open(BASE_URL, "_blank")}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            width: "100%", padding: "10px 14px",
            background: "rgba(0,120,212,0.08)",
            border: "1px solid rgba(0,120,212,0.2)",
            borderRadius: 8, cursor: "pointer", textAlign: "left",
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
              Personal Portfolio (v1)
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

      {/* Activities by unit */}
      <div style={{ padding: "8px 14px", display: "flex", flexDirection: "column", gap: 16 }}>
        {units.map(unit => {
          const unitActivities = ACTIVITIES.filter(a => a.tag === unit);
          const colors = UNIT_COLORS[unit];
          return (
            <div key={unit}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 3, height: 14, background: colors.text, borderRadius: 2, opacity: 0.7 }} />
                <span style={{
                  fontSize: 10, fontWeight: 600, color: colors.text,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}>
                  {unit}
                </span>
                <div style={{ flex: 1, height: 1, background: colors.border, opacity: 0.5 }} />
                <span style={{
                  fontSize: 10, color: "rgba(255,255,255,0.2)",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}>
                  {unitActivities.length} activities
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {unitActivities.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}