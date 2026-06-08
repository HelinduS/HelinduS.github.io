"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Monitor, Layers, Cpu, Server } from "lucide-react";

interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  barColor: string;
  glowColor: string;
  skills: Skill[];
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: <Code2 size={22} style={{ color: "var(--accent-purple)" }} />,
      barColor: "#9d00ff",
      glowColor: "rgba(157, 0, 255, 0.4)",
      skills: [
        { name: "Java", level: 85 },
        { name: "Kotlin", level: 80 },
        { name: "TypeScript / JavaScript", level: 88 },
        { name: "C#", level: 75 },
        { name: "C / C++", level: 65 },
        { name: "SQL", level: 78 },
      ],
    },
    {
      title: "Frontend Engineering",
      icon: <Monitor size={22} style={{ color: "var(--accent-cyan)" }} />,
      barColor: "#00ffff",
      glowColor: "rgba(0, 255, 255, 0.4)",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "HTML5 & CSS3", level: 92 },
        { name: "Responsive Design", level: 88 },
        { name: "CSS Grid / Flexbox", level: 90 },
      ],
    },
    {
      title: "Backend & Databases",
      icon: <Server size={22} style={{ color: "#6366f1" }} />,
      barColor: "#6366f1",
      glowColor: "rgba(99, 102, 241, 0.4)",
      skills: [
        { name: "Node.js / Express", level: 80 },
        { name: ".NET Web API", level: 75 },
        { name: "PostgreSQL", level: 78 },
        { name: "SQLite", level: 82 },
        { name: "RESTful APIs", level: 85 },
      ],
    },
    {
      title: "Platforms & Tools",
      icon: <Cpu size={22} style={{ color: "var(--accent-pink)" }} />,
      barColor: "#ff00ff",
      glowColor: "rgba(255, 0, 255, 0.4)",
      skills: [
        { name: "Unity 3D / VR Dev", level: 78 },
        { name: "Git & GitHub", level: 88 },
        { name: "Docker", level: 65 },
        { name: "Linux Terminal", level: 80 },
        { name: "ShaderLab", level: 60 },
      ],
    },
  ];

  // Trigger bar animations on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: "6rem 0",
        position: "relative",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          className="reveal"
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
            }}
          >
            &gt; skills.load()
          </div>
          <h2 style={{ fontSize: "2.2rem", fontFamily: "var(--font-display)" }}>
            Tech <span className="text-gradient">Arsenal</span>
          </h2>
          <p>
            Proficiency levels across programming languages, frameworks, and engineering tools
            measured by project experience and depth of knowledge.
          </p>
        </div>

        {/* 2-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
            gap: "2.5rem",
          }}
          className="skills-grid"
        >
          {skillCategories.map((category, cidx) => (
            <div
              key={cidx}
              className={`glass-card reveal reveal-delay-${(cidx % 4) + 1}`}
              style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div
                  style={{
                    padding: "0.6rem",
                    border: `1px solid ${category.barColor}40`,
                    background: `${category.barColor}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {category.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#fff",
                  }}
                >
                  {category.title}
                </h3>
              </div>

              {/* Skills list with progress bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {category.skills.map((skill, sidx) => (
                  <div key={sidx}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.35rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontFamily: "var(--font-mono)",
                          color: "#d0d0d0",
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontFamily: "var(--font-mono)",
                          color: category.barColor,
                          fontWeight: 700,
                          opacity: animated ? 1 : 0,
                          transition: "opacity 0.5s ease",
                          transitionDelay: `${0.3 + sidx * 0.1}s`,
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar-container">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: animated ? `${skill.level}%` : "0%",
                          background: `linear-gradient(90deg, ${category.barColor}88, ${category.barColor})`,
                          boxShadow: animated
                            ? `0 0 10px ${category.glowColor}, 0 0 20px ${category.glowColor}`
                            : "none",
                          transitionDelay: `${0.1 + sidx * 0.08}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
