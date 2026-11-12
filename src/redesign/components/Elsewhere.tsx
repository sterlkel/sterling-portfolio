import Link from "next/link";
import styles from "./Elsewhere.module.css";

// One line of links to the rest of the site: "Elsewhere: about, résumé, contact."
export function Elsewhere({ links, className = "" }: { links: readonly { label: string; href: string }[]; className?: string }) {
  return (
    <p className={`${styles.line} ${className}`}>
      Elsewhere: {links.map(({ label, href }, i) => (
        <span key={label}><Link href={href}>{label}</Link>{i < links.length - 1 ? ", " : "."}</span>
      ))}
    </p>
  );
}
