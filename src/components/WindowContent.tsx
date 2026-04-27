  import React from "react";

  export function ProjectsContent() {
    const projects = [
      {
      title: "PhiNex",
      subtitle: "Thesis Project",
      desc: "PhiNex is a phishing detection security gateway built on the PYNQ-Z2 ARM-FPGA development board.",
      tags: ["Python", "FPGA", "Security", "Networking"],
      status: "Actively Improving",
      github: "https://github.com/02rnfp-6815/PhiNex/tree/main",
    },
      {
      title: "MRF Digitalization",
      subtitle: "Internship Project",
      desc: "A web application built during internship to digitalize MRF (Modification Request Form) processes, replacing manual record-keeping with a streamlined digital workflow.",
      tags: ["React", "Tailwind", "JSX", "Vite"],
      status: "Actively Improving",
      github: "https://github.com/jarquecarl-debug/Digital-MRF",
    },
      {
        title: "Fundo",
        subtitle: "Personal Project",
        desc: "A personal expense tracking app that categorizes and summarizes recent purchases, giving users a clear picture of their spending habits.",
        tags: ["JSX", "JavaScript", "Vite", "Tailwind"],
        status: "Actively Improving",
        liveUrl: "https://fundo-expense-tracking-app.netlify.app",
        github: "https://github.com/jarquecarl-debug/fundo-expense-tracking-app",
      },
    ];

    return (
      <div>
        <div className="explorer-toolbar">
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>→</span>
          <span className="explorer-breadcrumb">This PC &gt; Portfolio &gt; Projects</span>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.title}>
              <div className="project-card-header">
                <div className="project-card-header-left">
                  <div className="project-title">{p.title}</div>
                  <div className="project-subtitle">{p.subtitle}</div>
                </div>
                <div className="project-buttons">
                  <button className="btn-outline" onClick={() => p.liveUrl && window.open(p.liveUrl, "_blank")}>View Project</button>
                  <button className="btn-outline" onClick={() => p.github && window.open(p.github, "_blank")}>GitHub</button>
                </div>
              </div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-footer">
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="status-badge">{p.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export function SkillsContent() {
    const sections = [
      {
        icon: "💬",
        title: "Languages",
        skills: ["C++", "Python", "Java", "JavaScript"],
      },
      {
        icon: "🎨",
        title: "Frontend",
        skills: ["React", "JSX", "TSX", "Tailwind CSS", "HTML", "CSS"],
      },
      {
        icon: "🔧",
        title: "Tools & Dev",
        skills: ["VS Code", "Git", "GitHub", "npm", "pnpm", "Vite"],
      },
      {
        icon: "🚀",
        title: "Deployment",
        skills: ["Netlify"],
      },
      {
        icon: "🎭",
        title: "Design",
        skills: ["Canva"],
      },
      {
        icon: "⚡",
        title: "Hardware",
        skills: ["Arduino IDE"],
      },
    ];

    return (
      <div className="settings-container">
        {sections.map((s) => (
          <div className="settings-section" key={s.title}>
            <div className="settings-section-header">
              <span className="settings-section-icon">{s.icon}</span>
              <span className="settings-section-title">{s.title}</span>
            </div>
            <div className="settings-skills">
              {s.skills.map((skill) => (
                <span className="skill-pill" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  export function AboutContent() {
  return (
    <div className="about-container">
      <div className="about-avatar-wrap">
        <img
          src="/formal_img.png"
          alt="Carl Christian Jarque"
          className="about-avatar-img"
        />
      </div>
      <div className="about-header">
        <div className="about-name">Carl Christian Jarque</div>
        <div className="about-title">Frontend Engineer · Computer Engineering Graduate</div>
      </div>
      <div className="about-oneliner">
        "CE by degree. Frontend by passion. Builder by nature."
      </div>
      <div className="about-bio">
        A Computer Engineering graduate with a passion for building modern digital solutions.
        During my studies, I developed PhiNex — a phishing detection gateway on FPGA hardware.
        My internship involved digitizing internal workflows through a React-based web app.
        I'm driven by the intersection of engineering precision and elegant design.
      </div>
      <div className="about-buttons">
        <a
          href="/Carl_Christian_Jarque_CV.pdf"
          download="Carl_Christian_Jarque_CV.pdf"
          className="btn-primary"
        >
              ⬇ Download Resume
        </a>
        <button className="btn-secondary" onClick={() => window.open("https://github.com/jarquecarl-debug", "_blank")}>🐙 View GitHub</button>
      </div>
    </div>
  );
}
  export function ExperienceContent() {
    const entries = [
      {
        company: "HS Technologies (Phils.) Inc.",
        role: "Frontend Developer Intern",
        duration: "240 hours · Ongoing",
        responsibilities: [
          "Built the MRF Digitalization web app, replacing manual Modification Request Form processes with a streamlined digital workflow using React, Tailwind CSS, and Vite.",
          "Designed and developed responsive UI components and layouts, ensuring cross-device compatibility and consistent user experience.",
          "Collaborated with the internal team to gather requirements and iteratively improve application features based on feedback.",
          "Developed personal projects independently during downtime — including Fundo (expense tracker) and a Maze Game — demonstrating self-driven learning and initiative.",
        ],
      },
    ];

    return (
      <div className="experience-container">
        {entries.map((e, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot" />
            <div className="timeline-company">{e.company}</div>
            <div className="timeline-role">{e.role}</div>
            <div className="timeline-duration">{e.duration}</div>
            <ul className="timeline-responsibilities">
              {e.responsibilities.map((r, j) => (
                <li key={j}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  export function CertificationsContent() {
    const certs = [
      {
        icon: "🤖",
        accent: "rgba(139,92,246,0.15)",
        accentBorder: "rgba(139,92,246,0.28)",
        accentText: "rgba(196,181,253,0.9)",
        name: "AI Learning Modules Completion (12 hours) — AIClassASEAN.org",
        issuer: "ASEAN Foundation",
        date: "November 2025",
      },
      {
        icon: "🌐",
        accent: "rgba(0,120,215,0.15)",
        accentBorder: "rgba(0,120,215,0.28)",
        accentText: "rgba(96,165,250,0.9)",
        name: "AI Ready ASEAN Seminar — Hello, AI World: From Basics to Big Impact",
        issuer: "AI Ready ASEAN / ASEAN Foundation",
        date: "October 2025",
      },
      {
        icon: "💡",
        accent: "rgba(234,179,8,0.12)",
        accentBorder: "rgba(234,179,8,0.22)",
        accentText: "rgba(253,224,71,0.85)",
        name: "4-Hour Hour of Code Webinar",
        issuer: "DICT Region 2 Nueva Vizcaya",
        date: "October 2025",
      },
      {
        icon: "🖥️",
        accent: "rgba(20,184,166,0.14)",
        accentBorder: "rgba(20,184,166,0.26)",
        accentText: "rgba(94,234,212,0.9)",
        name: "Hour of Code — AI for Oceans",
        issuer: "Code.org",
        date: "October 2025",
      },
      {
        icon: "🔗",
        accent: "rgba(234,179,8,0.12)",
        accentBorder: "rgba(234,179,8,0.22)",
        accentText: "rgba(253,224,71,0.85)",
        name: "Hour of Code — AI Ready ASEAN Programme",
        issuer: "Break the Fake Movement / ASEAN Foundation",
        date: "September 2025",
      },
      {
        icon: "⚙️",
        accent: "rgba(239,68,68,0.15)",
        accentBorder: "rgba(239,68,68,0.25)",
        accentText: "rgba(252,165,165,0.9)",
        name: "International Experts Sharing Meeting — Automation and Intelligent Control in Equipment Manufacturing",
        issuer: "Go Study Global Education / SEAMEO TED",
        date: "March 2026",
      },
      {
        icon: "☀️",
        accent: "rgba(251,146,60,0.14)",
        accentBorder: "rgba(251,146,60,0.26)",
        accentText: "rgba(253,186,116,0.9)",
        name: "International Perspectives Series Webinar — Stable and Efficient Modular Solar Chimney Dryer",
        issuer: "Go Study Global Education",
        date: "April 2026",
      },
    ];

    return (
      <div className="cert-list">
        {certs.map((c, i) => (
          <div
            className="cert-card"
            key={i}
            style={{
              background: c.accent,
              borderColor: c.accentBorder,
            }}
          >
            <div className="cert-icon-wrap" style={{ background: c.accentBorder }}>
              <span className="cert-icon">{c.icon}</span>
            </div>
            <div className="cert-body">
              <div className="cert-name">{c.name}</div>
              <div className="cert-issuer">{c.issuer}</div>
            </div>
            <div className="cert-date" style={{ color: c.accentText }}>{c.date}</div>
          </div>
        ))}
      </div>
    );
  }

  export function ContactContent() {
    const items = [
      { icon: "📧", label: "Email", value: "jarquecarl@gmail.com", href: "mailto:jarquecarl@gmail.com" },
      { icon: "📞", label: "Phone", value: "+63 956 895 5133", href: "tel:+639568955133" },
      { icon: "🐙", label: "GitHub", value: "github.com/jarquecarl-debug", href: "https://github.com/jarquecarl-debug" },
      { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/carl-jarque", href: "https://www.linkedin.com/in/carl-jarque-6b65b63bb/" },
    ];

    return (
      <div className="contact-container">
        <div className="contact-header-msg">
          Open to opportunities. Feel free to reach out!
        </div>
        {items.map((item) => (
          <a
            href={item.href}
            className="contact-item"
            key={item.label}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            <div className="contact-icon">{item.icon}</div>
            <div className="contact-info">
              <div className="contact-label">{item.label}</div>
              <div className="contact-value">{item.value}</div>
            </div>
          </a>
        ))}
      </div>
    );
  }