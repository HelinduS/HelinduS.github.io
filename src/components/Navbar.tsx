"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const navLinks = [
    { name: "./about", href: "#about" },
    { name: "./skills", href: "#skills" },
    { name: "./projects", href: "#projects" },
    { name: "./contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: isScrolled
            ? "rgba(5, 5, 5, 0.9)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(0, 255, 255, 0.12)"
            : "1px solid transparent",
          padding: isScrolled ? "0.75rem 0" : "1.25rem 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo + Clock */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.1rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ color: "var(--accent-cyan)" }}>~/</span>helindu
            </a>
            {clock && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent-green)",
                  background: "rgba(0, 255, 0, 0.06)",
                  border: "1px solid rgba(0, 255, 0, 0.15)",
                  padding: "0.2rem 0.6rem",
                  letterSpacing: "0.05em",
                }}
              >
                {clock}
              </span>
            )}
          </div>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
            }}
            className="desktop-menu"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-muted)",
                  textTransform: "lowercase",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "var(--accent-cyan)";
                  (e.target as HTMLAnchorElement).style.textShadow = "0 0 8px rgba(0, 255, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "var(--text-muted)";
                  (e.target as HTMLAnchorElement).style.textShadow = "none";
                }}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="cyber-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}>
              [ CONNECT ]
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              padding: "0.25rem",
            }}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 40,
          background: "rgba(3, 0, 20, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: isMobileMenuOpen ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.5rem",
          transition: "opacity 0.3s ease",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = "#ffffff"}
            onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = "var(--text-secondary)"}
          >
            {link.name}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            padding: "0.8rem 2rem",
            borderRadius: "9999px",
            fontSize: "1.1rem",
            fontWeight: 600,
            background: "linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-indigo) 100%)",
            color: "#ffffff",
            boxShadow: "0 4px 15px rgba(168, 85, 247, 0.3)",
          }}
        >
          Get In Touch
        </a>
      </div>

      {/* Styling for Responsive Layouts in JS-CSS */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
