"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Search, Sparkles } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
}

export default function GithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  // 5 Featured Projects
  const featuredProjects = [
    {
      name: "Boarding-Bee",
      title: "Boarding-Bee",
      description: "A specialized web accommodation marketplace for students and professionals in Sri Lanka to discover, review, and schedule bookings for annexes and boarding rooms.",
      tech: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "CSS Grid"],
      githubUrl: "https://github.com/HelinduS/Boarding-Bee",
      color: "var(--accent-purple)",
      githubRepoName: "Boarding-Bee",
    },
    {
      name: "Northstar",
      title: "Northstar Finance",
      description: "A comprehensive Personal Finance Management System designed for Android. Helps users track expenses, establish budgets, and analyze spending patterns with interactive visual charts.",
      tech: ["Kotlin", "Android SDK", "Room DB", "MPAndroidChart"],
      githubUrl: "https://github.com/HelinduS/Northstar",
      color: "var(--accent-cyan)",
      githubRepoName: "Northstar",
    },
    {
      name: "school-app",
      title: "ScholarFlow",
      description: "An enterprise-grade, role-based school management portal streamlining timetables, marks, teacher profiles, administrative setups, and academic workflows.",
      tech: ["TypeScript", "Next.js", "React", "PostgreSQL", "Prisma"],
      githubUrl: "https://github.com/HelinduS/school-app",
      color: "var(--accent-indigo)",
      githubRepoName: "school-app",
    },
    {
      name: "BusWise",
      title: "BusWise Smart Transit",
      description: "Developed a smart public transportation solution integrating Arduino-based GPS tracking, passenger web portals, accident detection, and anti-speeding features.",
      tech: ["C++", "Arduino", "GPS Module", "Node.js", "React"],
      githubUrl: "https://github.com/HelinduS",
      color: "var(--accent-emerald)",
      githubRepoName: "BusWise",
    },
    {
      name: "Japanese-Village-VR",
      title: "Japanese Village VR",
      description: "An immersive virtual reality environment simulating a traditional Japanese village. Features custom ambient shaders, high-fidelity 3D modeling, and interactive exploration paths.",
      tech: ["ShaderLab", "Unity 3D", "C#", "VR Interaction SDK"],
      githubUrl: "https://github.com/geethsenaviratne/Japanese-Village-VR",
      color: "var(--accent-pink)",
      githubRepoName: "Japanese-Village-VR",
    },
  ];

  useEffect(() => {
    const fetchRepos = async () => {
      const cacheKey = "github_repos_cache";
      const cacheTimeKey = "github_repos_cache_time";
      const oneHour = 60 * 60 * 1000;

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimeKey);
      const now = Date.now();

      if (cachedData && cachedTime && now - Number(cachedTime) < oneHour) {
        setRepos(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://api.github.com/users/HelinduS/repos?sort=updated&per_page=100");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(cacheTimeKey, String(now));
        
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const excludedNames = ["HelinduS", "school-app", "Northstar", "Boarding-Bee", "Japanese-Village-VR", "BusWise"];
  
  const otherRepos = repos.filter(
    (repo) => 
      !excludedNames.includes(repo.name) && 
      repo.name.toLowerCase() !== "git-session" &&
      repo.name.toLowerCase() !== "git-session2" &&
      !repo.fork
  );

  const languages = ["All", ...Array.from(new Set(otherRepos.map((r) => r.language).filter(Boolean))) as string[]];

  const filteredRepos = otherRepos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLanguage = selectedLanguage === "All" || repo.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <section id="projects" style={{ padding: "6rem 0", borderBottom: "1px solid var(--border-color)" }}>
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
            <Sparkles size={12} /> project.verify()
          </div>
          <h2 style={{ fontSize: "2.2rem", fontFamily: "var(--font-display)" }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p>
            A curated list of my top engineering achievements, spanning mobile platforms, 
            enterprise-grade web systems, and interactive Unity VR simulations.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "5rem",
          }}
          className="featured-grid"
        >
          {featuredProjects.map((project, idx) => {
            const liveRepo = repos.find((r) => r.name === project.githubRepoName);
            const stars = liveRepo ? liveRepo.stargazers_count : (project.name === "Boarding-Bee" ? 1 : 0);
            const forks = liveRepo ? liveRepo.forks_count : 0;

            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLDivElement;
                  card.style.borderColor = project.color + "40";
                  card.style.boxShadow = `0 12px 35px -10px ${project.color}15, 0 0 15px 0 ${project.color}05`;
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLDivElement;
                  card.style.borderColor = "var(--border-color)";
                  card.style.boxShadow = "none";
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <h3 style={{ fontSize: "1.35rem", fontWeight: 700 }}>
                      {project.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", fontSize: "0.8rem", color: "#a0a0a0" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                        <Star size={12} style={{ color: "#fbbf24" }} />
                        {stars}
                      </span>
                      {forks > 0 && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                          <GitFork size={12} />
                          {forks}
                        </span>
                      )}
                    </div>
                  </div>

                  <p style={{ marginBottom: "1.25rem", fontSize: "0.925rem", color: "#c0c0c0" }}>
                    {project.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    marginTop: "0.5rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                    paddingTop: "1rem",
                  }}
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    Source Code
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--border-color)",
            margin: "4rem 0",
          }}
        />

        {/* More Repositories Header */}
        <div
          style={{
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)" }}>
              More GitHub Repositories
            </h3>
            <p style={{ fontSize: "0.9rem", marginTop: "0.25rem", color: "var(--text-secondary)" }}>
              Explore other open-source projects, tools, and configurations.
            </p>
          </div>

          {/* Filters */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
            className="filters-row"
          >
            <div style={{ position: "relative", minWidth: "200px" }}>
              <input
                type="text"
                placeholder="Filter repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  paddingLeft: "2.25rem",
                  fontSize: "0.85rem",
                }}
              />
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                background: "rgba(255, 255, 255, 0.02)",
                padding: "0.2rem",
                borderRadius: "6px",
                border: "1px solid var(--border-color)",
              }}
            >
              {languages.slice(0, 4).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  style={{
                    padding: "0.35rem 0.7rem",
                    borderRadius: "4px",
                    border: "none",
                    background: selectedLanguage === lang ? "rgba(255, 255, 255, 0.05)" : "transparent",
                    color: selectedLanguage === lang ? "#ffffff" : "var(--text-secondary)",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Repositories grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="glass-card"
                style={{
                  padding: "1.5rem",
                  height: "160px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div
                    style={{
                      height: "18px",
                      width: "60%",
                      borderRadius: "3px",
                      background: "rgba(255,255,255,0.04)",
                    }}
                    className="shimmer"
                  />
                  <div
                    style={{
                      height: "14px",
                      width: "80%",
                      borderRadius: "3px",
                      background: "rgba(255,255,255,0.02)",
                    }}
                    className="shimmer"
                  />
                </div>
                <div style={{ height: "14px", width: "40%", borderRadius: "3px", background: "rgba(255,255,255,0.04)" }} className="shimmer" />
              </div>
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 0",
              color: "var(--text-secondary)",
              border: "1px dashed var(--border-color)",
              borderRadius: "12px",
              fontSize: "0.9rem",
            }}
          >
            No matching repositories found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filteredRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="glass-card repo-card"
                style={{
                  padding: "1.5rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      className="repo-title-hover"
                    >
                      {repo.name.replace(/-/g, " ")}
                    </h4>
                    <ExternalLink size={12} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  </div>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minHeight: "3.6rem",
                    }}
                  >
                    {repo.description || "View repository source code on GitHub."}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                    paddingTop: "0.65rem",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {repo.language ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background:
                            repo.language === "TypeScript"
                              ? "#3178c6"
                              : repo.language === "JavaScript"
                              ? "#f1e05a"
                              : repo.language === "Java"
                              ? "#b07219"
                              : repo.language === "Kotlin"
                              ? "#a97bff"
                              : repo.language === "C"
                              ? "#555555"
                              : repo.language === "C#"
                              ? "#178600"
                              : "#858585",
                        }}
                      />
                      {repo.language}
                    </span>
                  ) : (
                    <span>General</span>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.15rem" }}>
                      <Star size={10} />
                      {repo.stargazers_count}
                    </span>
                    {repo.forks_count > 0 && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.15rem" }}>
                        <GitFork size={10} />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.02) 25%,
            rgba(255, 255, 255, 0.06) 50%,
            rgba(255, 255, 255, 0.02) 75%
          );
          background-size: 200% 100%;
          animation: shimmer-anim 1.5s infinite;
        }
        @keyframes shimmer-anim {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .repo-card {
          transition: all 0.2s ease;
        }
        .repo-card:hover {
          border-color: rgba(255, 255, 255, 0.2) !important;
          background: var(--bg-secondary) !important;
        }
        .repo-card:hover .repo-title-hover {
          color: var(--accent-cyan) !important;
        }
        @media (max-width: 992px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .filters-row {
            width: 100%;
            flex-direction: column;
            align-items: stretch !important;
          }
          .filters-row > div {
            width: 100%;
          }
          .filters-row > div button {
            flex: 1;
          }
        }
      `}</style>
    </section>
  );
}
