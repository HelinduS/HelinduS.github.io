import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import GithubRepos from "@/components/GithubRepos";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Achievements />
        <GithubRepos />
        <Contact />
      </main>

      <footer
        style={{
          borderTop: "1px dashed var(--border-color)",
          background: "var(--bg-secondary)",
          padding: "2.5rem 0",
          textAlign: "center",
          fontSize: "0.8rem",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
        }}
      >
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div>
            &copy; {new Date().getFullYear()} helindu_senadheera.all_rights_reserved
          </div>
          <div style={{ color: "var(--accent-cyan)", opacity: 0.5, fontSize: "0.75rem" }}>
            stack: nextjs.16 + typescript + vanilla_css
          </div>
        </div>
      </footer>
    </>
  );
}
