"use client";

import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      // Ring trails behind with lerp
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      animId = requestAnimationFrame(animate);
    };

    const onMouseDown = () => {
      ring.style.transform += " scale(0.7)";
      ring.style.borderColor = "var(--accent-pink)";
      dot.style.background = "var(--accent-pink)";
    };

    const onMouseUp = () => {
      ring.style.borderColor = "var(--accent-cyan)";
      dot.style.background = "var(--accent-cyan)";
    };

    const onHoverLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role=button], input, textarea, select, label");
      if (isClickable) {
        ring.style.width = "50px";
        ring.style.height = "50px";
        ring.style.borderColor = "var(--accent-yellow)";
        ring.style.opacity = "0.8";
        dot.style.opacity = "0";
      } else {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "var(--accent-cyan)";
        ring.style.opacity = "0.6";
        dot.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", onHoverLink);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onHoverLink);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          background: "var(--accent-cyan)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          boxShadow: "0 0 8px var(--accent-cyan), 0 0 16px var(--accent-cyan)",
          transition: "opacity 0.2s, background 0.2s",
        }}
      />
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: "1.5px solid var(--accent-cyan)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0.6,
          transition: "width 0.2s, height 0.2s, border-color 0.2s, opacity 0.2s",
        }}
      />
    </>
  );
}
