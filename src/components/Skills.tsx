"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Code2, Monitor, Layers, Cpu, Server,
  Coffee, Binary, Database, Hash, FileJson,
  Atom, Smartphone, Grid, Network, HardDrive, 
  Terminal, Box, GitBranch, Boxes, Sparkles
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
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
        { name: "Java", icon: Coffee },
        { name: "Kotlin", icon: Code2 },
        { name: "TypeScript / JS", icon: FileJson },
        { name: "C#", icon: Hash },
        { name: "C / C++", icon: Binary },
        { name: "SQL", icon: Database },
      ],
    },
    {
      title: "Frontend Engineering",
      icon: <Monitor size={22} style={{ color: "var(--accent-cyan)" }} />,
      barColor: "#00ffff",
      glowColor: "rgba(0, 255, 255, 0.4)",
      skills: [
        { name: "React", icon: Atom },
        { name: "Next.js", icon: Layers },
        { name: "HTML5 & CSS3", icon: Monitor },
        { name: "Responsive Design", icon: Smartphone },
        { name: "CSS Grid / Flexbox", icon: Grid },
      ],
    },
    {
      title: "Backend & Databases",
      icon: <Server size={22} style={{ color: "#6366f1" }} />,
      barColor: "#6366f1",
      glowColor: "rgba(99, 102, 241, 0.4)",
      skills: [
        { name: "Node.js / Express", icon: Server },
        { name: ".NET Web API", icon: Network },
        { name: "PostgreSQL", icon: Database },
        { name: "SQLite", icon: HardDrive },
        { name: "RESTful APIs", icon: Terminal },
      ],
    },
    {
      title: "Platforms & Tools",
      icon: <Cpu size={22} style={{ color: "var(--accent-pink)" }} />,
      barColor: "#ff00ff",
      glowColor: "rgba(255, 0, 255, 0.4)",
      skills: [
        { name: "Unity 3D / VR Dev", icon: Box },
        { name: "Git & GitHub", icon: GitBranch },
        { name: "Docker", icon: Boxes },
        { name: "Linux Terminal", icon: Terminal },
        { name: "ShaderLab", icon: Sparkles },
      ],
    },
  ];

  // Trigger tag stagger animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
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
            Core toolkit and technologies utilized in building cloud systems, 
            mobile applications, and virtual simulations.
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

              {/* Skills grid of tags */}
              <div className="skills-list-grid">
                {category.skills.map((skill, sidx) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={sidx}
                      className="skill-tag"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        padding: "0.75rem 1rem",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                        opacity: animated ? 1 : 0,
                        transform: animated ? "translateY(0)" : "translateY(12px)",
                        transitionDelay: `${0.05 + sidx * 0.04}s`,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = category.barColor;
                        el.style.background = `${category.barColor}08`;
                        el.style.boxShadow = `0 0 15px -3px ${category.glowColor}`;
                        el.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = "rgba(255, 255, 255, 0.05)";
                        el.style.background = "rgba(255, 255, 255, 0.02)";
                        el.style.boxShadow = "none";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      <span
                        style={{
                          color: "var(--accent-green)",
                          fontSize: "0.8rem",
                          opacity: 0.6,
                          userSelect: "none",
                        }}
                      >
                        $
                      </span>
                      <Icon size={16} style={{ color: category.barColor, flexShrink: 0 }} />
                      <span style={{ color: "#d0d0d0", fontWeight: 500 }}>
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
