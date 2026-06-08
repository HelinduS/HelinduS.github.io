"use client";

import { useEffect, useState, useRef } from "react";
import { GitBranch, GitCommit, GitPullRequest, Calendar, Terminal, RefreshCw, Star, Users } from "lucide-react";

interface GitEvent {
  id: string;
  type: string;
  repo: string;
  date: string;
  details: string;
  commits?: string[];
}

export default function GitConsole() {
  const [events, setEvents] = useState<GitEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const fetchGithubActivity = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("https://api.github.com/users/HelinduS/events/public");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      
      const parsed = data.slice(0, 6).map((event: any) => {
        let details = "";
        const repoName = event.repo.name.replace("HelinduS/", "");
        
        if (event.type === "PushEvent") {
          const branch = event.payload.ref?.replace("refs/heads/", "") || "main";
          details = `pushed updates to [${branch}] branch in [${repoName}]`;
        } else if (event.type === "CreateEvent") {
          const refType = event.payload.ref_type || "repository";
          const refName = event.payload.ref ? ` [${event.payload.ref}]` : "";
          details = `created new ${refType}${refName} in [${repoName}]`;
        } else if (event.type === "PullRequestEvent") {
          details = `${event.payload.action} pull request: "${event.payload.pull_request?.title}" in [${repoName}]`;
        } else if (event.type === "IssuesEvent") {
          details = `${event.payload.action} issue: "${event.payload.issue?.title}" in [${repoName}]`;
        } else {
          details = `triggered ${event.type.replace("Event", "")} event on [${repoName}]`;
        }
        
        return {
          id: event.id,
          type: event.type,
          repo: repoName,
          date: new Date(event.created_at).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          details,
        };
      });

      setEvents(parsed);

      // Populate terminal log text lines
      const logs = [
        `SYSTEM: initializing git monitor console...`,
        `SYSTEM: fetching HelinduS raw event stream...`,
        `SUCCESS: connected to api.github.com`,
      ];
      
      parsed.forEach((evt: GitEvent) => {
        logs.push(`[${evt.date}] github.${evt.type.toLowerCase().replace("event", "")} -> ${evt.details}`);
      });
      
      setTerminalOutput(logs);
    } catch (err) {
      console.error(err);
      setTerminalOutput([
        `SYSTEM: failed to link github stream.`,
        `ERROR: rate limits may apply or connection is down.`
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGithubActivity();
  }, []);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalOutput]);

  return (
    <section
      id="console"
      style={{
        padding: "6rem 0",
        borderBottom: "1px solid var(--border-color)",
        position: "relative",
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
              color: "var(--accent-green)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Terminal size={12} /> monitor.git()
          </div>
          <h2 style={{ fontSize: "2.2rem", fontFamily: "var(--font-display)" }}>
            GitHub <span className="text-gradient">Console</span>
          </h2>
          <p>
            Real-time developer console tracking live commits, push events, 
            and code contributions.
          </p>
        </div>

        {/* Console Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2.5rem",
            alignItems: "stretch",
          }}
          className="console-grid"
        >
          {/* Panel 1: Live Terminal Log */}
          <div
            className="glass-card"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "440px",
              padding: "0",
              border: "1px solid var(--border-color)",
              background: "rgba(3, 0, 10, 0.85)",
              overflow: "hidden",
            }}
          >
            {/* Terminal Window Header Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1.25rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                    marginLeft: "0.85rem",
                  }}
                >
                  git-activity-monitor.sh
                </span>
              </div>

              <button
                onClick={fetchGithubActivity}
                disabled={refreshing}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                className="refresh-btn"
              >
                <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              </button>
            </div>

            {/* Terminal Body */}
            <div
              style={{
                flexGrow: 1,
                padding: "1.25rem",
                overflowY: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                lineHeight: "1.6",
                color: "var(--text-primary)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
              className="custom-scrollbar"
            >
              {loading ? (
                <div style={{ color: "var(--text-muted)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span className="cursor-blink">&gt;</span> Initializing secure stream connection...
                </div>
              ) : (
                <>
                  {terminalOutput.map((line, idx) => {
                    let color = "var(--text-secondary)";
                    if (line.includes("SYSTEM:")) color = "var(--accent-cyan)";
                    if (line.includes("SUCCESS:")) color = "var(--accent-green)";
                    if (line.includes("ERROR:")) color = "var(--accent-red)";
                    if (line.includes("└ commit:")) color = "rgba(0, 255, 255, 0.7)";
                    
                    return (
                      <div key={idx} style={{ color, whiteSpace: "pre-wrap" }}>
                        {line.startsWith("SYSTEM:") || line.startsWith("SUCCESS:") || line.startsWith("ERROR:") ? "" : "> "}
                        {line}
                      </div>
                    );
                  })}
                  <div style={{ color: "var(--accent-green)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span>&gt;</span>
                    <span className="cursor-blink">█</span>
                  </div>
                  <div ref={terminalEndRef} />
                </>
              )}
            </div>
          </div>

          {/* Panel 2: Stats & Calendar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Calendar Card */}
            <div
              className="glass-card"
              style={{
                padding: "1.75rem",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Calendar size={18} style={{ color: "var(--accent-cyan)" }} />
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontFamily: "var(--font-mono)",
                    color: "#fff",
                  }}
                >
                  Contributions Calendar
                </h3>
              </div>

              {/* Rshah dynamic SVG calendar widget with glowing overlay */}
              <div
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.3)",
                  padding: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://ghchart.rshah.org/00ffff/HelinduS"
                  alt="Helindu's GitHub Contributions"
                  style={{
                    width: "100%",
                    height: "auto",
                    filter: "drop-shadow(0 0 4px rgba(0, 255, 255, 0.25)) brightness(1.1)",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  textAlign: "center",
                }}
              >
                live contribution stream (helindus.github.io)
              </div>
            </div>

            {/* Quick stats Widget */}
            <div
              className="glass-card"
              style={{
                padding: "1.75rem",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <GitBranch size={18} style={{ color: "var(--accent-purple)" }} />
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontFamily: "var(--font-mono)",
                    color: "#fff",
                  }}
                >
                  Repository Stats
                </h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.03)",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--accent-purple)", fontFamily: "var(--font-mono)" }}>
                    17+
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    PUBLIC REPOS
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.03)",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>
                    ACTIVE
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    PROD STATUS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .console-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
