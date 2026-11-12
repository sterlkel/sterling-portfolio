"use client";

import { useEffect, useRef } from "react";

// A thin bar across the top of the page that fills as the reader scrolls.
export function ReadingProgress({ className }: { className?: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div ref={bar} className={className} aria-hidden="true" />;
}
