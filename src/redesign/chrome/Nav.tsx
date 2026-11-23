"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, person } from "../site";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Nav.module.css";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <Link className={styles.brand} href="/"><i />{person.name}</Link>
      <nav className={styles.links} aria-label="Main">
        {navLinks.map(({ label, href }) => {
          const on = pathname === href || pathname.startsWith(`${href}/`);
          return <Link key={href} href={href} className={on ? styles.on : undefined} aria-current={on ? "page" : undefined}>{label}</Link>;
        })}
      </nav>
      <ThemeToggle />
    </header>
  );
}
