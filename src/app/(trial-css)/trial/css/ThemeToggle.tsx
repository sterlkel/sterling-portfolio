"use client";

export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("sk-theme", root.dataset.theme); } catch {}
  };
  return <button className={className} onClick={toggle} aria-label="Toggle theme" />;
}
