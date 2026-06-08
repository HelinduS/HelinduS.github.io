"use client";

import { Award, ShieldCheck, Cpu, Code2, Brain, Trophy, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface AchievementItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  glow: string;
  images?: string[];
  accentColor?: string;
}

// Inline image slider component for individual cards
function CardImageSlider({
  images,
  accentColor,
  onClick,
}: {
  images: string[];
  accentColor: string;
  onClick: (idx: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // cycle slides every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div
      onClick={() => onClick(currentIndex)}
      style={{
        position: "relative",
        width: "100%",
        height: "240px",
        borderRadius: "0px",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        cursor: "pointer",
        marginTop: "0.25rem",
        marginBottom: "0.25rem",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        const wrapper = e.currentTarget as HTMLDivElement;
        wrapper.style.borderColor = accentColor;
        wrapper.style.boxShadow = `0 8px 20px -5px ${accentColor.replace(")", ", 0.2)")}`;
        const overlay = wrapper.querySelector(".slider-zoom-overlay") as HTMLDivElement;
        if (overlay) overlay.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const wrapper = e.currentTarget as HTMLDivElement;
        wrapper.style.borderColor = "rgba(255, 255, 255, 0.08)";
        wrapper.style.boxShadow = "none";
        const overlay = wrapper.querySelector(".slider-zoom-overlay") as HTMLDivElement;
        if (overlay) overlay.style.opacity = "0";
      }}
    >
      {/* Slides */}
      {images.map((img, idx) => (
        <div
          key={img}
          style={{
            position: "absolute",
            inset: 0,
            opacity: idx === currentIndex ? 1 : 0,
            transform: `scale(${idx === currentIndex ? 1 : 1.05})`,
            transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
          }}
        >
          <img
            src={img}
            alt="Achievement view"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}

      {/* Hover Zoom Icon & Lightbox Prompt */}
      <div
        className="slider-zoom-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(2, 2, 5, 0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            background: "rgba(10, 10, 18, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "0.45rem 0.9rem",
            borderRadius: "0px",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          }}
        >
          Click to expand
        </span>
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            zIndex: 5,
            background: "rgba(10, 10, 18, 0.75)",
            padding: "6px 12px",
            borderRadius: "0px",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: idx === currentIndex ? accentColor : "rgba(255, 255, 255, 0.4)",
                boxShadow: idx === currentIndex ? `0 0 8px ${accentColor}` : "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Achievements() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, lightboxImages]);

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  const items: AchievementItem[] = [
    {
      title: "Winner – SLIIT MiniHackathon 2025",
      issuer: "MS Club & IFESC in SLIIT",
      date: "2025",
      description: "Won 1st Place at the SLIIT MiniHackathon 2025 as part of Team 'The Kade'. Designed and developed an innovative, technically robust full-stack solution during a time-bound challenge, demonstrating strong team collaboration, problem-solving, and software engineering capabilities under pressure.",
      icon: <Trophy size={20} style={{ color: "var(--accent-purple)" }} />,
      glow: "rgba(168, 85, 247, 0.12)",
      accentColor: "var(--accent-purple)",
      images: [
        "/images/mini-hackathon.jpg"
      ]
    },
    {
      title: "2nd Runner Up – IntelliCon’25",
      issuer: "AIESEC in SLIIT",
      date: "2025",
      description: "Achieved 2nd Runner-Up position at IntelliCon’25, Sri Lanka’s premier Artificial Intelligence & Innovation convention and hackathon. Recognized for exceptional innovation, creativity, and teamwork in developing a technically sound and highly impactful AI solution.",
      icon: <Brain size={20} style={{ color: "var(--accent-cyan)" }} />,
      glow: "rgba(34, 211, 238, 0.12)",
      accentColor: "var(--accent-cyan)",
      images: [
        "/images/intellicon-cert.jpg"
      ]
    },
    {
      title: "Finalist - Algothon Contest, CODEFEST 2025",
      issuer: "SLIIT Faculty of Computing",
      date: "2025 Aug",
      description: "Achieved finalist status in the tertiary division of the Algothon Contest during CODEFEST 2025, representing Sri Lanka Institute of Information Technology. Collaborated with teammates to solve algorithmic and coding challenges under tight limits.",
      icon: <Code2 size={20} style={{ color: "var(--accent-pink)" }} />,
      glow: "rgba(236, 72, 153, 0.12)",
      accentColor: "var(--accent-pink)",
      images: [
        "/images/algothon-1.jpg",
        "/images/algothon-2.jpg",
        "/images/algothon-3.jpg"
      ]
    },
    {
      title: "SDG Youth Challenge – Finalist",
      issuer: "UN-aligned",
      date: "2024",
      description: "Finalist in the global SDG Youth Challenge for HandyMatch, an AI-driven platform promoting inclusive employment for individuals with disabilities. Co-led user-focused UX design research, accessibility planning, and pitch presentations.",
      icon: <Award size={20} style={{ color: "var(--accent-emerald)" }} />,
      glow: "rgba(52, 211, 153, 0.1)",
      accentColor: "var(--accent-emerald)",
    },
    {
      title: "Python 101 for Data Science",
      issuer: "Cognitive Class (IBM Developer Skills Network)",
      date: "2024",
      description: "Completed course training covering Python scripting basics, lists, dictionaries, logic structures, and data analysis packages like Pandas and Numpy.",
      icon: <ShieldCheck size={20} style={{ color: "var(--accent-indigo)" }} />,
      glow: "rgba(99, 102, 241, 0.1)",
      accentColor: "var(--accent-indigo)",
    },
    {
      title: "Python for Beginners",
      issuer: "University of Moratuwa (UoM)",
      date: "2023",
      description: "Gained core foundations in programming: algorithmic thinking, condition trees, repetition loops, functions, and object-oriented concepts.",
      icon: <Cpu size={20} style={{ color: "var(--accent-purple)" }} />,
      glow: "rgba(168, 85, 247, 0.1)",
      accentColor: "var(--accent-purple)",
    },
  ];

  return (
    <section
      id="achievements"
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
            <ShieldCheck size={12} /> achievements.verify()
          </div>
          <h2 style={{ fontSize: "2.2rem", fontFamily: "var(--font-display)" }}>
            Honors &amp; <span className="text-gradient">Certifications</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
          className="achievements-grid"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget as HTMLDivElement;
                card.style.borderColor = "rgba(255, 255, 255, 0.12)";
                card.style.boxShadow = `0 10px 30px -10px ${item.glow}`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget as HTMLDivElement;
                card.style.borderColor = "var(--border-color)";
                card.style.boxShadow = "none";
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    padding: "0.6rem",
                    borderRadius: "8px",
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
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {item.issuer}
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginTop: "0.15rem", lineHeight: 1.35 }}>
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: "0.9rem", color: "#c0c0c0", flexGrow: 1, lineHeight: 1.65 }}>
                {item.description}
              </p>

              {/* Card Image Slideshow / Preview (Auto-scrolling) */}
              {item.images && (
                <CardImageSlider
                  images={item.images}
                  accentColor={item.accentColor || "var(--accent-pink)"}
                  onClick={(imgIdx) => {
                    setLightboxImages(item.images || []);
                    setCurrentImageIndex(imgIdx);
                    setActiveImage(item.images ? item.images[imgIdx] : null);
                  }}
                />
              )}

              {/* Card Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                  paddingTop: "0.85rem",
                  fontSize: "0.775rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-muted)",
                }}
              >
                <span>Status: Verified</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeImage && lightboxImages.length > 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(2, 2, 5, 0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setActiveImage(null)}
        >
          {/* Lightbox Container */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "85vw",
              maxHeight: "80vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Active Image */}
            <img
              src={lightboxImages[currentImageIndex]}
              alt="Enlarged achievement view"
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
              }}
            />

            {/* Caption/Description */}
            <div
              style={{
                marginTop: "1.25rem",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
              }}
            >
              <span>
                {currentImageIndex + 1} / {lightboxImages.length}
              </span>
            </div>
          </div>

          {/* Navigation - Left Arrow (Outer level) */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(
                  (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
                );
              }}
              style={{
                position: "fixed",
                left: "2rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(10, 10, 18, 0.65)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                width: "52px",
                height: "52px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#ffffff",
                zIndex: 100000,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.background = "rgba(10, 10, 18, 0.85)";
                btn.style.borderColor = "var(--accent-pink)";
                btn.style.transform = "translateY(-50%) scale(1.08)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.background = "rgba(10, 10, 18, 0.65)";
                btn.style.borderColor = "rgba(255, 255, 255, 0.1)";
                btn.style.transform = "translateY(-50%) scale(1)";
              }}
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Navigation - Right Arrow (Outer level) */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
              }}
              style={{
                position: "fixed",
                right: "2rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(10, 10, 18, 0.65)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                width: "52px",
                height: "52px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#ffffff",
                zIndex: 100000,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.background = "rgba(10, 10, 18, 0.85)";
                btn.style.borderColor = "var(--accent-pink)";
                btn.style.transform = "translateY(-50%) scale(1.08)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.background = "rgba(10, 10, 18, 0.65)";
                btn.style.borderColor = "rgba(255, 255, 255, 0.1)";
                btn.style.transform = "translateY(-50%) scale(1)";
              }}
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Close Button (Outer level) */}
          <button
            onClick={() => setActiveImage(null)}
            style={{
              position: "fixed",
              top: "2rem",
              right: "2rem",
              background: "rgba(10, 10, 18, 0.65)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ffffff",
              zIndex: 100000,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "rgba(10, 10, 18, 0.85)";
              btn.style.borderColor = "var(--accent-pink)";
              btn.style.transform = "scale(1.08) rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "rgba(10, 10, 18, 0.65)";
              btn.style.borderColor = "rgba(255, 255, 255, 0.1)";
              btn.style.transform = "scale(1) rotate(0deg)";
            }}
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
