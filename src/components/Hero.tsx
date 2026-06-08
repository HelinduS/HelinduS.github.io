"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, ArrowRight } from "lucide-react";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ repos: 16, followers: 7 });
  const [typewriterText, setTypewriterText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    "Software Engineer",
    "Software Eng. Intern",
    "CS Undergraduate @ SLIIT",
    "VR / AR Explorer",
  ];

  // Fetch live GitHub stats
  useEffect(() => {
    fetch("https://api.github.com/users/HelinduS")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("API Limit");
      })
      .then((data) => {
        setStats({
          repos: data.public_repos || 16,
          followers: data.followers || 7,
        });
      })
      .catch(() => {});
  }, []);

  // Typewriter Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = titles[titleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypewriterText((prev) => prev.slice(0, -1));
      }, 35);
    } else {
      timer = setTimeout(() => {
        setTypewriterText((prev) => currentFullText.slice(0, prev.length + 1));
      }, 70);
    }

    if (!isDeleting && typewriterText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typewriterText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, titleIndex]);

  // Matrix rain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const chars = "01アイウエオカキクケコ$#@!%^&*()[]{}|;:,.<>?/~ABCDEFGHIJKLMNOP";

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 255, 0, 0.15)";
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderBottom: "1px dashed rgba(0,255,255,0.2)",
        paddingTop: "60px",
      }}
    >
      {/* Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />

      {/* Dark gradient overlay to keep text readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.95) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        className="container hero-grid"
        style={{
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          alignItems: "center",
          gap: "4rem",
          width: "100%",
        }}
      >
        {/* Left Info Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Status Badge */}
          <div
            style={{
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(0, 255, 0, 0.05)",
              border: "1px solid rgba(0, 255, 0, 0.3)",
              padding: "0.35rem 0.85rem",
              fontSize: "0.75rem",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
              color: "var(--accent-green)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                background: "var(--accent-green)",
                boxShadow: "0 0 8px var(--accent-green)",
                display: "inline-block",
              }}
            />
            internship.active = true
          </div>

          <h1
            style={{
              fontSize: "3.4rem",
              lineHeight: 1.05,
              fontFamily: "var(--font-display)",
              fontWeight: 800,
            }}
            className="hero-title glitch"
            data-text="Helindu Senadheera"
          >
            Helindu Senadheera
          </h1>

          {/* Typewriter */}
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              fontFamily: "var(--font-mono)",
            }}
            className="hero-subtitle"
          >
            &gt;{" "}
            <span
              style={{
                marginLeft: "0.5rem",
                color: "var(--accent-cyan)",
                textShadow: "0 0 8px rgba(0, 255, 255, 0.4)",
              }}
            >
              {typewriterText}
            </span>
            <span className="cursor-blink">_</span>
          </h3>

          <p
            style={{
              fontSize: "1rem",
              maxWidth: "560px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            Third-year Computer Science undergraduate and Software Engineering
            Intern @ Rysera Innovations. Developing full-stack cloud systems,
            native applications, and virtual reality Unity simulations with a
            sleek and balanced engineering design methodology.
          </p>

          {/* Action links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              marginTop: "0.5rem",
            }}
            className="hero-actions"
          >
            <a href="#projects" className="cyber-btn">
              [ RUN: VERIFY_PROJECTS ]
            </a>
            <a href="#contact" className="cyber-btn-outline">
              [ CONNECT ]
            </a>
          </div>
        </div>

        {/* Right Stats Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
          className="hero-stats-container"
        >
          {/* Card 1: Internship */}
          <div
            className="glass-card"
            style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}
          >
            <div
              style={{
                padding: "0.75rem",
                border: "1px solid var(--accent-cyan)",
                color: "var(--accent-cyan)",
              }}
            >
              <Terminal size={22} />
            </div>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                Software Eng. Intern
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.15rem" }}>
                Rysera Innovations
              </div>
            </div>
          </div>

          {/* Card 2: GitHub Repos */}
          <div
            className="glass-card"
            style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}
          >
            <div
              style={{
                padding: "0.75rem",
                border: "1px solid var(--accent-purple)",
                color: "var(--accent-purple)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GithubIcon size={22} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {stats.repos}+
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                Public Repositories
              </div>
            </div>
          </div>

          {/* Card 3: SDG Finalist */}
          <div
            className="glass-card"
            style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}
          >
            <div
              style={{
                padding: "0.75rem",
                border: "1px solid var(--accent-green)",
                color: "var(--accent-green)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                SDG Challenge Finalist
              </div>
              <div
                style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.15rem" }}
              >
                HandyMatch AI Platform
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .cursor-blink {
          animation: blink 0.9s step-end infinite;
          color: var(--accent-cyan);
        }
        @keyframes blink {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center;
          }
          .hero-title {
            font-size: 2.6rem !important;
          }
          .hero-subtitle {
            font-size: 1.3rem !important;
            justify-content: center !important;
          }
          .hero-stats-container {
            width: 100%;
          }
        }
        @media (max-width: 576px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions > a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
