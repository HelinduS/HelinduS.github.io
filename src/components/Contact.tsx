"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

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

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
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
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("submitting");

    // Simulate sending email
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socials = [
    {
      name: "GitHub",
      icon: <GithubIcon size={20} />,
      url: "https://github.com/HelinduS",
      color: "#ffffff",
      handle: "@HelinduS",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon size={20} />,
      url: "https://linkedin.com/in/helindu-senadheera",
      color: "#0077b5",
      handle: "Helindu Senadheera",
    },
    {
      name: "Twitter / X",
      icon: <TwitterIcon size={20} />,
      url: "https://twitter.com/HelinduSenadhe1",
      color: "#1da1f2",
      handle: "@HelinduSenadhe1",
    },
    {
      name: "Email",
      icon: <Mail size={20} />,
      url: "mailto:helindusenadheera@gmail.com",
      color: "var(--accent-cyan)",
      handle: "helindusenadheera@gmail.com",
    },
  ];

  return (
    <section id="contact" style={{ padding: "6rem 0 8rem 0", position: "relative" }}>
      {/* Decorative Glow */}
      <div
        className="ambient-glow"
        style={{
          background: "var(--accent-purple)",
          bottom: "10%",
          left: "50%",
          opacity: 0.08,
        }}
      />

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
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--accent-purple)",
            }}
          >
            Connection
          </div>
          <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)" }}>
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p>
            Have a project in mind, an opportunity, or just want to chat? 
            Drop me a message below or connect with me via my socials!
          </p>
        </div>

        {/* Contact Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Form Side */}
          <div className="glass-card" style={{ padding: "2.5rem", position: "relative" }}>
            {status === "success" && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(3, 0, 20, 0.9)",
                  backdropFilter: "blur(8px)",
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  borderRadius: "16px",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                <CheckCircle2 size={56} style={{ color: "var(--accent-emerald)" }} />
                <h3 style={{ fontSize: "1.5rem" }}>Message Sent Successfully!</h3>
                <p style={{ maxWidth: "300px" }}>
                  Thank you for reaching out, Helindu. I'll get back to you as soon as possible!
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Helindu, I would love to discuss a project..."
                  rows={5}
                  required
                  style={{ resize: "vertical" }}
                />
              </div>

              {status === "error" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171", fontSize: "0.9rem" }}>
                  <AlertCircle size={16} />
                  Please fill in all the form fields.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="cyber-btn"
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {status === "submitting" ? (
                  <>
                    <svg
                      className="animate-spin"
                      style={{ width: "20px", height: "20px", color: "black" }}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        style={{ opacity: 0.75 }}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Socials Side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
              Let's connect socially
            </h3>
            <p style={{ marginBottom: "1rem" }}>
              If you prefer direct communication, check out my social handles. 
              I am highly responsive on LinkedIn and Email.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card"
                  style={{
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1.5rem",
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget as HTMLAnchorElement;
                    card.style.borderColor = social.color + "50";
                    card.style.boxShadow = `0 4px 20px 0 ${social.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget as HTMLAnchorElement;
                    card.style.borderColor = "var(--border-color)";
                    card.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                      style={{
                        padding: "0.6rem",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: social.color === "#ffffff" ? "#ffffff" : social.color,
                      }}
                    >
                      {social.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>
                        {social.name}
                      </div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#ffffff" }}>
                        {social.handle}
                      </div>
                    </div>
                  </div>
                  
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "6px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Open
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
