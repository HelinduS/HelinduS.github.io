"use client";

import { User, MapPin, GraduationCap, Calendar, Briefcase, Mail } from "lucide-react";

export default function About() {
  const infoItems = [
    {
      icon: <Briefcase size={16} style={{ color: "var(--accent-cyan)" }} />,
      label: "Current Role",
      value: "Software Engineering Intern @ Rysera Innovations",
    },
    {
      icon: <GraduationCap size={16} style={{ color: "var(--accent-purple)" }} />,
      label: "Education",
      value: "B.Sc. (Hons) in Computer Science @ SLIIT (3rd Year)",
    },
    {
      icon: <MapPin size={16} style={{ color: "var(--accent-indigo)" }} />,
      label: "Location",
      value: "Bandaragama, Sri Lanka",
    },
  ];

  return (
    <section
      id="about"
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
            margin: "0 auto 4rem auto",
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
            <User size={12} /> profile.read()
          </div>
          <h2 style={{ fontSize: "2.2rem", fontFamily: "var(--font-display)" }}>
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        {/* Content Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Avatar frame */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="reveal-left"
          >
            <div
              className="glass-card"
              style={{
                padding: "0.85rem",
                width: "100%",
                maxWidth: "280px",
                borderRadius: "8px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  aspectRatio: "1/1",
                  background: "var(--bg-tertiary)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/u/136826228?v=4"
                  alt="Helindu Senadheera"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "0.85rem",
                  textAlign: "center",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-secondary)",
                }}
              >
                helindu_senadheera.png
              </div>
            </div>
          </div>

          {/* Bio details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
            className="reveal-right"
          >
            <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", fontWeight: 600 }}>
              Third-Year Computer Science Undergraduate &amp; Software Engineering Intern
            </h3>

            <p style={{ fontSize: "0.975rem", color: "#c0c0c0" }}>
              I am a motivated and dedicated 3rd year Computer Science undergraduate at the 
              Sri Lanka Institute of Information Technology (SLIIT) with a growing interest in 
              web and mobile development. 
            </p>

            <p style={{ fontSize: "0.975rem", color: "#c0c0c0" }}>
              Through coursework and personal projects, I have built a strong foundation in 
              frontend and backend architectures, and I have gained exposure to areas such as 
              distributed systems, database modeling, and embedded hardware integrations (Arduino).
            </p>

            {/* Quick Info Grid */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "0.5rem",
                borderTop: "1px solid var(--border-color)",
                paddingTop: "1.25rem",
              }}
            >
              {infoItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                  }}
                >
                  <div
                    style={{
                      padding: "0.4rem",
                      borderRadius: "6px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.925rem", fontWeight: 600, color: "#e8e8e8" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
