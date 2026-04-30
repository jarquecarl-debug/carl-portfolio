  import React from "react";
  import Certifications from "./Certifications";
  // top — add with other imports
import { AcademicWorksContent } from "./AcademicWorks";

// bottom — re-export it so App.tsx can use it
export { AcademicWorksContent };

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

        {
      title: "Maze Runner",
      subtitle: "Personal Project",
      desc: "A first-person 3D maze game built with React Three Fiber. Navigate procedurally-structured mazes, collect items, avoid a glowing ghost enemy with BFS pathfinding, and find the exit.",
      tags: ["React", "Three.js", "TypeScript", "Vite", "R3F"],
      status: "Actively Improving",
      liveUrl: "https://maze-game-3d.netlify.app", // replace later
      github: "https://github.com/jarquecarl-debug/maze-game",
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
  return <Certifications />;
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