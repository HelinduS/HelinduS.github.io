"use client";

import { Briefcase, GraduationCap, Calendar, Compass } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "Rysera Innovations",
      period: "2026 April - Present",
      description: "Developing and deploying enterprise-grade software solutions, full-stack modules, and clean cloud integrations. Focusing on optimizing service latency, refining database schemas, and maintaining high code standards.",
      tags: ["React", "Next.js", "TypeScript", "Node.js", "API Integrations", "Software Architecture"],
    },
    {
      role: "Part-time Software Engineering Intern",
      company: "Sports Data Analytics (PVT) LTD",
      period: "2025 July - 2026 January",
      description: "Contributed to the design and development of web and mobile data analytics dashboards. Gained hands-on development experience in frontend and backend integrations, UI responsiveness, and data serialization.",
      tags: ["React", "React Native", "JavaScript", "HTML/CSS", "API Integration"],
    },
    {
      role: "Freelance Photographer",
      company: "Self-Employed (Helindu Senadheera Photography)",
      period: "2020 - Present",
      description: "Covered high-profile events, engagements, and sports tournaments. Named official photographer for Sri Lanka Scrabble Federation tournaments and provided event coverage for the Russian House of Colombo. Managed end-to-end shoot workflows: pre-planning, lighting setups, photography, and post-processing in Lightroom and Photoshop.",
      tags: ["Lightroom", "Photoshop", "Event Management", "Sports Photography", "Client Relations"],
    },
    {
      role: "Event & Sports Photographer",
      company: "S. Thomas’ College, Mount Lavinia",
      period: "2019 - 2023",
      description: "Documented school concerts, academic meets, and high-intensity sports events (rugby, cricket, swimming, hockey). Supplied visual media for official school publications and digital channels.",
      tags: ["Creative Direction", "Action Capturing", "Social Media Content"],
    },
  ];

  const educations = [
    {
      degree: "B.Sc. in Computer Science with Honours",
      school: "Sri Lanka Institute of Information Technology (SLIIT)",
      period: "2023 - Present",
      details: "Third-year undergraduate student. Coursework covers software engineering patterns, distributed replication models, database systems, and mobile architectures.",
      logo: "/images/sliit-logo.png",
    },
    {
      degree: "Diploma in Information Technology",
      school: "ESOFT Metro Campus",
      period: "2020",
      details: "Earned foundational IT concepts, introductory programming structures, and software principles.",
    },
    {
      degree: "G.C.E. Advanced Level (Physical Science Stream)",
      school: "S. Thomas’ College, Mount Lavinia",
      period: "2022",
      details: "Studied Combined Mathematics, Physics, and Chemistry.",
    },
  ];

  return (
    <section
      id="experience"
      style={{
        padding: "6rem 0",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto 4.5rem auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--accent-cyan)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Compass size={12} /> timeline.check()
          </div>
          <h2 style={{ fontSize: "2.2rem", fontFamily: "var(--font-display)" }}>
            Experience &amp; <span className="text-gradient">Education</span>
          </h2>
        </div>

        {/* Timeline Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="timeline-grid"
        >
          {/* Column 1: Experience */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Briefcase size={20} style={{ color: "var(--accent-cyan)" }} />
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700 }}>
                Professional Experience
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", position: "relative" }}>
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    paddingLeft: "1.5rem",
                    borderLeft: "2px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* Timeline bullet */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-7px",
                      top: "4px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "var(--bg-primary)",
                      border: "2px solid var(--accent-cyan)",
                    }}
                  />

                  {/* Header */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "0.75rem" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {exp.period}
                    </div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
                      {exp.role}
                    </h4>
                    <span style={{ fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: 500 }}>
                      {exp.company}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.925rem", marginBottom: "1rem", color: "#c0c0c0" }}>
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {exp.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tech-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Education */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "1rem",
                marginBottom: "1rem",
              }}
            >
              <GraduationCap size={20} style={{ color: "var(--accent-purple)" }} />
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700 }}>
                Academic Background
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {educations.map((edu, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    paddingLeft: "1.5rem",
                    borderLeft: "2px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* Timeline bullet */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-7px",
                      top: "4px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "var(--bg-primary)",
                      border: "2px solid var(--accent-purple)",
                    }}
                  />

                  {/* SLIIT Crest Image integration */}
                  {edu.logo && (
                    <div
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "0",
                        width: "48px",
                        height: "48px",
                        opacity: 0.85,
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "6px",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="edu-logo-container"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={edu.logo}
                        alt="SLIIT Crest"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}

                  {/* Header */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "0.75rem", paddingRight: edu.logo ? "60px" : "0" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {edu.period}
                    </div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
                      {edu.degree}
                    </h4>
                    <span style={{ fontSize: "0.9rem", color: "var(--accent-purple)", fontWeight: 500 }}>
                      {edu.school}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.925rem", color: "#c0c0c0" }}>
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .timeline-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
          .edu-logo-container {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
